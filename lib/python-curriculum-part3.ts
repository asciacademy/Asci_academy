import type { Part } from "./python-course-data"

/* ═══════════════════════════════════════════════════════════════════════════
   ASCI PYTHON CURRICULUM — PART III: HARD / PRODUCTION ENGINEERING (CHAPTERS 17 - 24)
   ═══════════════════════════════════════════════════════════════════════════ */

export const pythonCurriculumPart3: Part = {
  id: "part-3",
  partNumber: 3,
  title: "Part III: Advanced Systems, Concurrency & CPython Internals",
  description: "Deep dive into OS process scheduling, vision/audio pipelines, PyAutoGUI human-interface emulation, CPython memory architecture, the GIL, and Asyncio reactor microservices.",
  level: "Hard",
  chapters: [
    {
      id: "ch-17",
      title: "Chapter 17 — Process Scheduling, Time Systems & Subprocess Management",
      description: "High-precision clocks, timezone-aware datetime manipulation, subprocess.Popen IPC pipes, and background cron scheduling.",
      level: "Hard",
      concepts: [
        {
          id: "py-17-1",
          title: "High-Precision Clocks, Timezones (ZoneInfo) & Cron Task Scheduling",
          slug: "time-timezones-cron-scheduling",
          level: "Hard",
          description: "Measuring sub-millisecond execution times with time.perf_counter(), handling daylight saving and timezone math with Python 3.9+ zoneinfo, and scheduling periodic jobs.",
          tldr: "Never use time.time() for benchmarking; use time.perf_counter() which queries monotonic hardware clocks. Always use timezone-aware datetime with ZoneInfo.",
          code: `import time
from datetime import datetime
from zoneinfo import ZoneInfo

# High-precision hardware monotonic clock benchmark
t0 = time.perf_counter()
sum(i * i for i in range(500_000))
elapsed_ms = (time.perf_counter() - t0) * 1000
print(f"Hardware Monotonic Duration: {elapsed_ms:.2f}ms")

# Timezone-aware timestamping (PEP 615)
utc_now = datetime.now(ZoneInfo("UTC"))
tokyo_now = utc_now.astimezone(ZoneInfo("Asia/Tokyo"))
ny_now = utc_now.astimezone(ZoneInfo("America/New_York"))

print(f"UTC Time   : {utc_now.strftime('%Y-%m-%d %H:%M:%S %Z')}")
print(f"Tokyo Time : {tokyo_now.strftime('%Y-%m-%d %H:%M:%S %Z')}")
print(f"New York   : {ny_now.strftime('%Y-%m-%d %H:%M:%S %Z')}")`,
          expectedOutput: `Hardware Monotonic Duration: 35.12ms
UTC Time   : 2026-09-12 00:00:00 UTC
Tokyo Time : 2026-09-12 09:00:00 JST
New York   : 2026-09-11 20:00:00 EDT`,
          exercisePrompt: "Compute the difference in hours between two timezone-aware datetimes across different continents.",
          solutionCode: `from datetime import datetime\nfrom zoneinfo import ZoneInfo\nt1 = datetime.now(ZoneInfo('UTC'))\nt2 = datetime.now(ZoneInfo('Asia/Kolkata'))\nprint((t2.utcoffset() - t1.utcoffset()).total_seconds() / 3600)`,
          quiz: {
            question: "Why is 'time.perf_counter()' preferred over 'time.time()' for measuring code performance?",
            options: [
              "perf_counter runs on the GPU",
              "perf_counter is a monotonic clock immune to system clock updates, leap seconds, and NTP adjustments",
              "time.time() returns strings instead of floats",
              "perf_counter bypasses the Python interpreter"
            ],
            correctIndex: 1,
            explanation: "time.perf_counter() guarantees monotonic progression based on CPU hardware cycles, whereas time.time() can jump backward or forward if system time is synchronized."
          }
        },
        {
          id: "py-17-2",
          title: "IPC Process Control with subprocess.Popen & Data Pipes",
          slug: "ipc-subprocess-popen-pipes",
          level: "Hard",
          description: "Execute OS binaries, manage standard input/output/error pipes without deadlocking, stream real-time command output, and handle process timeouts.",
          tldr: "Use subprocess.run(..., check=True, capture_output=True) for simple commands. For streaming interactive I/O, use subprocess.Popen with non-blocking pipes.",
          code: `import subprocess
import sys

# Executing OS subprocess safely with explicit arguments (no shell=True)
process = subprocess.run(
    [sys.executable, "-c", "import sys; print(f'Python Runtime: {sys.version.split()[0]}')"],
    capture_output=True,
    text=True,
    check=True,
    timeout=5.0
)

print("Subprocess Exit Code:", process.returncode)
print("Subprocess STDOUT   :", process.stdout.strip())`,
          expectedOutput: `Subprocess Exit Code: 0
Subprocess STDOUT   : Python Runtime: 3.12.2`,
          exercisePrompt: "Explain why 'shell=True' in subprocess.run() is a major security hazard when accepting user input.",
          solutionCode: `# shell=True launches the system command shell (/bin/sh or cmd.exe), allowing attackers to chain commands with ';' or '&&' (shell injection).`,
          quiz: {
            question: "What is the primary danger of setting 'shell=True' in subprocess functions?",
            options: [
              "It doubles memory usage",
              "It exposes the system to command injection attacks if any part of the command string is user-controlled",
              "It disables standard error output",
              "It makes the process run as root"
            ],
            correctIndex: 1,
            explanation: "shell=True passes the raw string to the OS shell, enabling attackers to inject arbitrary shell commands via delimiters like ';' or '&'."
          }
        }
      ]
    },
    {
      id: "ch-18",
      title: "Chapter 18 — Enterprise Notification Pipelines, SMTP & Telemetry",
      description: "Secure email automation via smtplib with TLS/STARTTLS, MIME multi-part formatting, and webhook telemetry integrations.",
      level: "Hard",
      concepts: [
        {
          id: "py-18-1",
          title: "Secure Email Dispatch via smtplib, TLS & MIME Multi-Part",
          slug: "smtp-mime-email-dispatch",
          level: "Hard",
          description: "Constructing MIME multipart messages with HTML and plain-text fallback bodies, attaching documents, and transmitting securely over TLS/STARTTLS ports.",
          tldr: "Always send dual plain-text and HTML MIME alternatives. Never hardcode credentials; load SMTP passwords from environment variables via os.environ.",
          code: `from email.message import EmailMessage
import io

def compose_incident_report(incident_id: str, severity: str) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = f"[{severity.upper()}] P1 Outage Incident #{incident_id}"
    msg["From"] = "telemetry@asci.internal"
    msg["To"] = "oncall-team@asci.internal"
    
    # Plain text fallback
    msg.set_content(f"Incident {incident_id} detected. Severity: {severity}. Log into console immediately.")
    
    # HTML alternative payload
    msg.add_alternative(f"""\\
<!DOCTYPE html>
<html>
    <body style="font-family: sans-serif; background: #111827; color: #f8fafc; padding: 20px;">
        <h2 style="color: #2563eb;">Incident Alert: #{incident_id}</h2>
        <p>Severity Level: <strong>{severity}</strong></p>
        <p>Automated telemetry trigger dispatched from ASCI Health Engine.</p>
    </body>
</html>
""", subtype="html")
    return msg

email = compose_incident_report("INC-9021", "Critical")
print("Constructed MIME Message Headers:")
print(f"  To     : {email['To']}")
print(f"  Subject: {email['Subject']}")
print(f"  Payload: {email.is_multipart()} (Multipart: Plain + HTML)")`,
          expectedOutput: `Constructed MIME Message Headers:
  To     : oncall-team@asci.internal
  Subject: [CRITICAL] P1 Outage Incident #INC-9021
  Payload: True (Multipart: Plain + HTML)`,
          exercisePrompt: "Write code to attach a CSV file as an attachment to an EmailMessage object using msg.add_attachment().",
          solutionCode: `msg.add_attachment(b'id,name\\n1,alice', filename='report.csv', maintype='text', subtype='csv')`,
          quiz: {
            question: "What is the standard port used for modern secure SMTP with STARTTLS?",
            options: ["25", "587", "465", "8080"],
            correctIndex: 1,
            explanation: "Port 587 is the standard IANA submission port for sending client email with explicit TLS/STARTTLS negotiation."
          }
        },
        {
          id: "py-18-2",
          title: "Webhook Telemetry & Multi-Channel Alert Systems",
          slug: "webhook-telemetry-alert-systems",
          level: "Hard",
          description: "Sending structured HTTP POST webhooks to Slack, Discord, and PagerDuty, with payload signing via HMAC-SHA256.",
          tldr: "Webhooks allow real-time event broadcasting over HTTP. Always sign outgoing webhook payloads with HMAC-SHA256 so consumers can verify authenticity.",
          code: `import hmac
import hashlib
import json
import time

def generate_signed_webhook(secret_key: bytes, event_type: str, data: dict):
    payload = {
        "event": event_type,
        "timestamp": int(time.time()),
        "data": data
    }
    encoded_body = json.dumps(payload, sort_keys=True).encode("utf-8")
    
    # Compute cryptographic HMAC signature
    signature = hmac.new(secret_key, encoded_body, hashlib.sha256).hexdigest()
    
    headers = {
        "Content-Type": "application/json",
        "X-ASCI-Signature": f"sha256={signature}"
    }
    return headers, encoded_body

headers, body = generate_signed_webhook(b"super_secret_signing_key", "order.filled", {"order_id": "ORD-123"})
print("Webhook Headers:", headers)
print("Signed Payload :", body.decode()[:60] + "...")`,
          expectedOutput: `Webhook Headers: {'Content-Type': 'application/json', 'X-ASCI-Signature': 'sha256=a1b2c3d4e5...'}
Signed Payload : {"data": {"order_id": "ORD-123"}, "event": "order.filled", ...`,
          exercisePrompt: "Verify an incoming HMAC signature using hmac.compare_digest() to prevent timing attacks.",
          solutionCode: `import hmac\nis_valid = hmac.compare_digest(expected_sig, incoming_sig)`,
          quiz: {
            question: "Why should you use 'hmac.compare_digest()' instead of '==' when comparing cryptographic signatures?",
            options: [
              "It runs in constant time, preventing side-channel timing attacks that infer characters",
              "It converts the strings to integers first",
              "It handles NULL bytes in strings",
              "It automatically decrypts the hash"
            ],
            correctIndex: 0,
            explanation: "hmac.compare_digest() executes in constant time regardless of where mismatches occur, eliminating timing attack vulnerabilities."
          }
        }
      ]
    },
    {
      id: "ch-19",
      title: "Chapter 19 — Computer Vision Pipelines & Image Processing",
      description: "Pixel buffer manipulation with Pillow, RGBA channels, matrix affine transforms, and optical character recognition (OCR) with pytesseract.",
      level: "Hard",
      concepts: [
        {
          id: "py-19-1",
          title: "Pixel Buffer Manipulation with Pillow (RGBA Arrays, Blends, Transforms)",
          slug: "pillow-image-processing",
          level: "Hard",
          description: "Understanding bitmap raster graphics, 4-channel RGBA memory buffers, affine matrix transformations, and batch image pipelines using Pillow.",
          tldr: "Pillow models images as raw byte buffers. RGBA uses 8 bits (0-255) per channel: Red, Green, Blue, Alpha (transparency).",
          flowchart: `[Raw Image File (PNG/JPEG)]
                │
        (Image.open())
                ▼
       [Pillow Image Object]
                ├── .size (width, height)
                ├── .mode ('RGBA' 4 bytes per pixel)
                └── .tobytes() -> Raw memory buffer
                │
     (Transform: resize, crop, filter)
                ▼
       [Export / Stream Output]`,
          code: `from PIL import Image, ImageDraw, ImageColor
import io

# Create an in-memory 200x200 RGBA canvas
canvas = Image.new("RGBA", (200, 200), color=(6, 33, 18, 255)) # Emerald
draw = ImageDraw.Draw(canvas)

# Draw gold geometric badge
draw.ellipse((40, 40, 160, 160), outline=(212, 184, 114, 255), width=4) # Soft Gold
draw.text((65, 90), "ASCI 3.12", fill=(253, 251, 247, 255)) # Pearl White

# Extract image dimensions and mode
print(f"Canvas Mode       : {canvas.mode}")
print(f"Canvas Resolution : {canvas.size[0]} x {canvas.size[1]}")

# Pixel inspection
center_pixel = canvas.getpixel((100, 100))
print(f"Center Pixel RGBA : {center_pixel}")`,
          expectedOutput: `Canvas Mode       : RGBA
Canvas Resolution : 200 x 200
Center Pixel RGBA : (6, 33, 18, 255)`,
          exercisePrompt: "Resize an image to 50% of its dimensions while preserving aspect ratio using Image.Resampling.LANCZOS.",
          solutionCode: `w, h = img.size\nsmall = img.resize((w // 2, h // 2), resample=Image.Resampling.LANCZOS)`,
          quiz: {
            question: "What does an alpha value of 0 represent in an RGBA image?",
            options: ["Pure black", "Completely transparent", "Pure white", "Opaque gold"],
            correctIndex: 1,
            explanation: "In the RGBA color model, the alpha channel controls opacity: 0 is completely transparent, and 255 is fully opaque."
          }
        },
        {
          id: "py-19-2",
          title: "Optical Character Recognition (OCR) with pytesseract",
          slug: "optical-character-recognition-pytesseract",
          level: "Hard",
          description: "Extracting printed text from scanned receipts, PDFs, and screenshots using Google's Tesseract OCR engine, with image binarization and thresholding.",
          tldr: "OCR accuracy dramatically improves with preprocessing: convert to grayscale, apply Gaussian blur to remove noise, and binarize using Otsu's thresholding.",
          code: `# Demonstrating OCR Preprocessing Pipeline
from PIL import Image, ImageFilter

def preprocess_for_ocr(image: Image.Image) -> Image.Image:
    # 1. Convert to single 8-bit grayscale channel ('L')
    gray = image.convert("L")
    # 2. Apply slight blur to smooth digital artifacts
    smoothed = gray.filter(ImageFilter.SMOOTH_MORE)
    # 3. Apply point threshold binarization (Black/White)
    threshold = 128
    binarized = smoothed.point(lambda p: 255 if p > threshold else 0)
    return binarized

mock_scan = Image.new("L", (100, 50), color=200)
processed = preprocess_for_ocr(mock_scan)
print(f"Preprocessed OCR Canvas Mode: {processed.mode} | Resolution: {processed.size}")`,
          expectedOutput: `Preprocessed OCR Canvas Mode: L | Resolution: 100 x 50`,
          exercisePrompt: "Configure pytesseract to return bounding box coordinates for each recognized word using image_to_data().",
          solutionCode: `import pytesseract\n# data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)`,
          quiz: {
            question: "Which image preprocessing step typically yields the greatest improvement in OCR accuracy for scanned text?",
            options: [
              "Converting to high-contrast black-and-white binarized images",
              "Inverting colors so the background is red",
              "Doubling the saturation of color channels",
              "Compressing the image to low-quality JPEG"
            ],
            correctIndex: 0,
            explanation: "Converting images to grayscale and binarizing them (pure black text on pure white background) removes color noise and drastically improves OCR character segmentation."
          }
        }
      ]
    },
    {
      id: "ch-20",
      title: "Chapter 20 — OS Event Automation & Human-Interface Simulation",
      description: "Driving the OS desktop with PyAutoGUI, mouse coordinate planes, keyboard event dispatching, screenshot pixel verification, and safety failsafes.",
      level: "Hard",
      concepts: [
        {
          id: "py-20-1",
          title: "GUI Automation with PyAutoGUI (Mouse Coordinates & Key Injection)",
          slug: "pyautogui-mouse-keyboard-automation",
          level: "Hard",
          description: "Simulate human clicks, drags, scrolls, typing, and OS hotkeys across arbitrary desktop applications running on Windows, macOS, or Linux.",
          tldr: "PyAutoGUI uses (0,0) as the top-left corner origin. Always keep pyautogui.FAILSAFE = True so you can abort runaway automation by slamming the mouse into any corner.",
          flowchart: `Screen Resolution: 1920x1080
(0,0) Top-Left ──────────────> (1920, 0)
     │                               │
     │      Active Cursor (X, Y)     │
     ▼                               ▼
(0,1080) ────────────────────> (1920, 1080)`,
          code: `import pyautogui

# Query screen geometry
width, height = pyautogui.size()
print(f"Primary Display Resolution: {width}x{height}")

# Current cursor coordinate
pos = pyautogui.position()
print(f"Initial Cursor Position: X={pos.x}, Y={pos.y}")

# Configurable safety pause between instructions
pyautogui.PAUSE = 0.1  # 100ms pause after every action
print(f"Safety Failsafe State: {pyautogui.FAILSAFE} (Corner slam abort active)")`,
          expectedOutput: `Primary Display Resolution: 1920x1080
Initial Cursor Position: X=960, Y=540
Safety Failsafe State: True (Corner slam abort active)`,
          exercisePrompt: "Write a PyAutoGUI command to simulate pressing the Ctrl+S (or Cmd+S) hotkey combination.",
          solutionCode: `import pyautogui\npyautogui.hotkey('ctrl', 's')`,
          quiz: {
            question: "How do you immediately trigger an emergency abort in a running PyAutoGUI script when FAILSAFE is enabled?",
            options: [
              "Press Ctrl+Alt+Delete",
              "Move the mouse cursor into any of the four corners of the screen",
              "Unplug the keyboard",
              "Type the word 'STOP'"
            ],
            correctIndex: 1,
            explanation: "When pyautogui.FAILSAFE is True (the default), slamming the mouse into any corner (e.g. 0,0) instantly raises a FailSafeException."
          }
        },
        {
          id: "py-20-2",
          title: "Screen Framebuffer Pixel Matching & Emergency Fail-Safe Protocols",
          slug: "screen-pixel-matching-failsafes",
          level: "Hard",
          description: "Read pixel colors directly from the OS framebuffer, locate UI buttons visually using template image matching, and build resilient UI automation loops.",
          tldr: "pyautogui.pixelMatchesColor() verifies whether a coordinate matches an expected RGB tuple within a tolerance, allowing your script to confirm buttons loaded.",
          code: `import pyautogui

# Framebuffer pixel matching verification
target_x, target_y = 100, 200
expected_rgb = (6, 33, 18) # Emerald Green

# Check if screen matches expected color with tolerance
# is_ready = pyautogui.pixelMatchesColor(target_x, target_y, expected_rgb, tolerance=10)
# print(f"UI Element Rendered: {is_ready}")

print("Pixel matching allows scripts to dynamically wait for UI elements to render before clicking.")`,
          expectedOutput: `Pixel matching allows scripts to dynamically wait for UI elements to render before clicking.`,
          exercisePrompt: "Write a polling loop that checks every 0.25s whether a pixel at (500, 300) turns green, timing out after 5 seconds.",
          solutionCode: `import time\n# while time.time() - t0 < 5: if pyautogui.pixelMatchesColor(500, 300, (0, 255, 0)): break; time.sleep(0.25)`,
          quiz: {
            question: "What does 'pyautogui.pixelMatchesColor(x, y, (r, g, b), tolerance=10)' return?",
            options: [
              "The hex color code",
              "A boolean (True if the pixel's RGB values are within 10 of the target, else False)",
              "The coordinate of the nearest match",
              "A screenshot image"
            ],
            correctIndex: 1,
            explanation: "It returns True if the screen pixel at (x,y) matches the expected (r,g,b) color within the specified numerical tolerance per channel."
          }
        }
      ]
    },
    {
      id: "ch-21",
      title: "Chapter 21 — Audio Pipelines & Speech Signal Processing",
      description: "Offline text-to-speech (TTS) synthesis with pyttsx3, audio buffering, and microphone speech-to-text recognition with SpeechRecognition.",
      level: "Hard",
      concepts: [
        {
          id: "py-21-1",
          title: "Offline Text-to-Speech (TTS) Synthesis with pyttsx3",
          slug: "text-to-speech-synthesis-pyttsx3",
          level: "Hard",
          description: "Generate natural speech without internet access or third-party cloud API costs using pyttsx3, controlling speech rate, volume, and voice selection.",
          tldr: "pyttsx3 communicates with native OS speech engines (SAPI5 on Windows, NSSpeechSynthesizer on macOS, eSpeak on Linux), functioning completely offline.",
          code: `# Configuring Offline Speech Synthesis Pipeline
import pyttsx3

engine = pyttsx3.init()

# Configure speech rate and volume
engine.setProperty("rate", 180)    # Words per minute
engine.setProperty("volume", 0.9)  # Float between 0.0 and 1.0

# Query installed OS voice synthesizers
voices = engine.getProperty("voices")
print(f"Detected {len(voices)} installed OS speech voices:")
for idx, v in enumerate(voices[:2]):
    print(f"  [{idx}] {v.name} (Language: {v.languages})")

# Queue audio speech output
# engine.say("ASCI High Performance Python Curriculum Initialized.")
# engine.runAndWait()`,
          expectedOutput: `Detected 2 installed OS speech voices:
  [0] Microsoft David Desktop - English (United States)
  [1] Microsoft Zira Desktop - English (United States)`,
          exercisePrompt: "Save synthesized speech directly to an MP3 or WAV audio file using engine.save_to_file().",
          solutionCode: `import pyttsx3\ne = pyttsx3.init()\ne.save_to_file("Alert: Batch complete", "alert.wav")\ne.runAndWait()`,
          quiz: {
            question: "Why does pyttsx3 work without an internet connection?",
            options: [
              "It downloads gigabytes of AI models on startup",
              "It interfaces directly with the host operating system's built-in native speech synthesis engines (SAPI5/NSSpeech/eSpeak)",
              "It uses a local neural network on GPU",
              "It plays pre-recorded WAV samples"
            ],
            correctIndex: 1,
            explanation: "pyttsx3 is a cross-platform wrapper around the OS's native speech synthesis drivers, requiring zero network calls or cloud subscriptions."
          }
        },
        {
          id: "py-21-2",
          title: "Speech-to-Text Recognition & Acoustic Buffer Streaming",
          slug: "speech-to-text-audio-streaming",
          level: "Hard",
          description: "Capture microphone audio or WAV streams, calibrate for ambient background noise, and transcribe speech to text using speech_recognition.",
          tldr: "Always calibrate for ambient energy levels using recognizer.adjust_for_ambient_noise(source) before recording to avoid false triggers from air conditioning or fan hum.",
          code: `import speech_recognition as sr

recognizer = sr.Recognizer()
# Adjust energy threshold for microphone sensitivity
recognizer.energy_threshold = 300
recognizer.dynamic_energy_threshold = True

print(f"Audio Recognizer Initialized:")
print(f"  Energy Threshold: {recognizer.energy_threshold}")
print(f"  Dynamic Ambient Tracking: {recognizer.dynamic_energy_threshold}")`,
          expectedOutput: `Audio Recognizer Initialized:
  Energy Threshold: 300
  Dynamic Ambient Tracking: True`,
          exercisePrompt: "Handle UnknownValueError and RequestError when calling a speech recognizer.",
          solutionCode: `try:\n    text = r.recognize_google(audio)\nexcept sr.UnknownValueError:\n    print("Could not understand audio")\nexcept sr.RequestError as e:\n    print("Service error:", e)`,
          quiz: {
            question: "Why should 'adjust_for_ambient_noise()' be called before transcribing audio from a microphone?",
            options: [
              "It boosts recording volume to maximum",
              "It measures background room noise and sets an optimal energy threshold to distinguish speech from ambient static",
              "It compresses the audio format to MP3",
              "It enables multi-channel surround sound"
            ],
            correctIndex: 1,
            explanation: "It listens to ambient silence for ~1 second to calibrate the recognizer's energy threshold, preventing ambient noise from falsely triggering speech capture."
          }
        }
      ]
    },
    {
      id: "ch-22",
      title: "Chapter 22 — CPython Memory Architecture, Cyclic GC & Reference Counting",
      description: "PyObject layout, 64-bit reference counting, the 3-generation cyclic garbage collector (Gen 0/1/2), and memory profiling.",
      level: "Hard",
      concepts: [
        {
          id: "py-22-1",
          title: "Reference Counting & Generational Cyclic GC (Gen 0/1/2)",
          slug: "cpython-garbage-collection",
          level: "Hard",
          description: "How CPython tracks memory via ob_refcnt and uses a 3-generation linked list algorithm to find and deallocate cyclic references.",
          tldr: "Reference counting instantly deallocates objects when refcnt drops to 0. Generational cyclic GC runs periodically to collect circular reference graphs.",
          flowchart: `Object Reference Allocation: ob_refcnt = 1
                 │
  [Reference Removed: sys.getrefcount() -> 0]?
  ├── YES ──> Immediate Deallocation via PyObject_Free()
  └── NO  ──> Check Container Cyclic Linked List:
              ├── Gen 0 (Young Objects)  ── threshold exceeded ──> Sweep
              ├── Gen 1 (Surviving Gen 0)
              └── Gen 2 (Long-Lived Singletons & Modules)`,
          code: `# Demonstrating Reference Counting and Cyclic Garbage Collection
import sys
import gc

class Node:
    def __init__(self, name: str):
        self.name = name
        self.neighbor = None

# Reference counting demo
obj = Node("Standalone")
print(f"Ref count of obj: {sys.getrefcount(obj) - 1}")  # 1

# Cyclic Reference Creation
node_a = Node("A")
node_b = Node("B")
node_a.neighbor = node_b
node_b.neighbor = node_a

# Delete global references (cycle remains in memory!)
del node_a
del node_b

# Force full generational GC collection
unreachable = gc.collect()
print(f"Cyclic unreachable objects collected by GC: {unreachable}")`,
          expectedOutput: `Ref count of obj: 1
Cyclic unreachable objects collected by GC: 4`,
          exercisePrompt: "Inspect gc.get_threshold() to view the collection thresholds for Generation 0, 1, and 2 in your Python environment.",
          solutionCode: `import gc\nprint("GC Thresholds (Gen0, Gen1, Gen2):", gc.get_threshold())`,
          quiz: {
            question: "When does CPython reference counting fail to deallocate memory?",
            options: [
              "When integers exceed the small integer cache",
              "When objects participate in circular references (e.g. A references B, and B references A)",
              "When functions return None",
              "When strings exceed 4096 bytes"
            ],
            correctIndex: 1,
            explanation: "Reference counting cannot deallocate circular references because each object's refcount remains at least 1 even after outside references are deleted."
          }
        },
        {
          id: "py-22-2",
          title: "Memory Profiling (tracemalloc, sys.getsizeof) & Weak References",
          slug: "memory-profiling-weakref",
          level: "Hard",
          description: "Diagnosing memory leaks in long-running services with tracemalloc, breaking circular cycles using weakref.ref, and optimizing container footprints with __slots__.",
          tldr: "Use weakref.ref() to reference objects without incrementing ob_refcnt. Use __slots__ to eliminate per-instance __dict__ overhead, saving 40-60% RAM.",
          code: `import sys
import weakref

class StandardPoint:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

class SlottedPoint:
    __slots__ = ("x", "y")  # Eliminates instance __dict__
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

p_std = StandardPoint(1.0, 2.0)
p_slot = SlottedPoint(1.0, 2.0)

# In Python 64-bit, __slots__ saves significant memory
print("Has __dict__ (Standard):", hasattr(p_std, "__dict__"))
print("Has __dict__ (Slotted) :", hasattr(p_slot, "__dict__"))

# Weak references do NOT prevent garbage collection
class CacheTarget: pass
target = CacheTarget()
wref = weakref.ref(target)
print(f"Weakref before delete: {wref()}")
del target
print(f"Weakref after delete : {wref()} (Collected cleanly!)")`,
          expectedOutput: `Has __dict__ (Standard): True
Has __dict__ (Slotted) : False
Weakref before delete: <__main__.CacheTarget object at 0x7f...>
Weakref after delete : None (Collected cleanly!)`,
          exercisePrompt: "Demonstrate using tracemalloc to find the top 3 lines of code allocating memory in a script.",
          solutionCode: `import tracemalloc\ntracemalloc.start()\n# code...\nsnap = tracemalloc.take_snapshot()\nfor stat in snap.statistics('lineno')[:3]: print(stat)`,
          quiz: {
            question: "How does declaring '__slots__' in a Python class reduce memory usage?",
            options: [
              "It compiles the class into C binary instructions",
              "It prevents the dynamic creation of an instance '__dict__' hash table, storing attributes in fixed descriptor pointers",
              "It stores values directly on the CPU L1 cache",
              "It enables automatic garbage collection"
            ],
            correctIndex: 1,
            explanation: "By defining __slots__, CPython allocates a fixed array of descriptor pointers instead of allocating a dynamic 152+ byte PyDictObject for each instance."
          }
        }
      ]
    },
    {
      id: "ch-23",
      title: "Chapter 23 — The Global Interpreter Lock (GIL), Threading & Multiprocessing",
      description: "The GIL bottleneck, multi-threading vs multi-processing, CPU-bound vs I/O-bound workloads, and PEP 703 free-threaded Python.",
      level: "Hard",
      concepts: [
        {
          id: "py-23-1",
          title: "GIL Contention, I/O Concurrency & Free-Threaded Python (PEP 703)",
          slug: "global-interpreter-lock-and-concurrency",
          level: "Hard",
          description: "Why the GIL exists in CPython, why multi-threading excels for network I/O but stalls on CPU-bound math, and how PEP 703 makes the GIL optional.",
          tldr: "The GIL prevents race conditions in CPython's reference counting. For CPU-bound tasks, use multiprocessing. For I/O-bound tasks, use asyncio or threads.",
          flowchart: `CPU-Bound Multi-Threading with GIL:
[Thread 1] ───holds GIL───> [CPU Core 0] (Executing bytecode)
[Thread 2] ───waits GIL───> [BLOCKED] (100% Core 1 Idle!)
            (Check every 5ms sys.getswitchinterval())
[Thread 1] ───releases GIL─> [Thread 2 Acquires]`,
          code: `# Measuring CPU-bound Threading vs Multiprocessing
import time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def cpu_heavy_task(n: int) -> int:
    count = 0
    for i in range(n):
        count += (i * i)
    return count

ITERATIONS = 3_000_000

# Thread Pool (Stalled by GIL)
t0 = time.perf_counter()
with ThreadPoolExecutor(max_workers=2) as executor:
    list(executor.map(cpu_heavy_task, [ITERATIONS, ITERATIONS]))
t_threads = time.perf_counter() - t0

# Process Pool (Bypasses GIL via independent OS processes)
t0 = time.perf_counter()
with ProcessPoolExecutor(max_workers=2) as executor:
    list(executor.map(cpu_heavy_task, [ITERATIONS, ITERATIONS]))
t_processes = time.perf_counter() - t0

print(f"ThreadPool Duration: {t_threads:.3f}s")
print(f"ProcessPool Duration: {t_processes:.3f}s")`,
          expectedOutput: `ThreadPool Duration: 0.380s
ProcessPool Duration: 0.210s`,
          exercisePrompt: "Check your current Python switch interval using sys.getswitchinterval().",
          solutionCode: `import sys\nprint("GIL Switch Interval:", sys.getswitchinterval(), "seconds")`,
          quiz: {
            question: "Why does multi-threading fail to provide speedup for CPU-bound computations in standard CPython?",
            options: [
              "CPython does not support POSIX operating system threads",
              "The Global Interpreter Lock (GIL) serializes bytecode execution on a single core",
              "CPU registers cannot store dynamic types",
              "Python garbage collection halts all threads every millisecond"
            ],
            correctIndex: 1,
            explanation: "The GIL ensures only one native thread executes Python bytecode at a time, preventing multi-threaded CPU-bound speedups."
          }
        },
        {
          id: "py-23-2",
          title: "ProcessPoolExecutor Multi-Core Scaling & Shared Memory",
          slug: "multiprocessing-shared-memory",
          level: "Hard",
          description: "Scale CPU-intensive batch jobs across all available processor cores, using multiprocessing.shared_memory for zero-copy inter-process data exchange.",
          tldr: "Standard multiprocessing pickles objects across IPC pipes. SharedMemory (multiprocessing.shared_memory) maps contiguous RAM blocks across processes without serialization overhead.",
          code: `import os
from multiprocessing import shared_memory
from concurrent.futures import ProcessPoolExecutor

def worker_task(chunk_id: int) -> str:
    pid = os.getpid()
    return f"Chunk {chunk_id} processed by OS Worker PID {pid}"

# Parallel mapping over all CPU cores
with ProcessPoolExecutor(max_workers=2) as pool:
    results = list(pool.map(worker_task, [1, 2, 3, 4]))

print("Parallel Execution Output:")
for r in results:
    print(" ", r)`,
          expectedOutput: `Parallel Execution Output:
  Chunk 1 processed by OS Worker PID 12401
  Chunk 2 processed by OS Worker PID 12402
  Chunk 3 processed by OS Worker PID 12401
  Chunk 4 processed by OS Worker PID 12402`,
          exercisePrompt: "Use os.cpu_count() to dynamically size a ProcessPoolExecutor to match the host hardware core count.",
          solutionCode: `import os\nfrom concurrent.futures import ProcessPoolExecutor\nwith ProcessPoolExecutor(max_workers=os.cpu_count()) as p: pass`,
          quiz: {
            question: "What is the primary trade-off of multiprocessing over threading in Python?",
            options: [
              "Multiprocessing cannot execute in parallel",
              "Processes have isolated memory spaces, requiring IPC serialization (pickling) or shared memory to communicate",
              "Multiprocessing requires GPU acceleration",
              "Processes cannot catch exceptions"
            ],
            correctIndex: 1,
            explanation: "Because each process has its own virtual memory space and Python interpreter, passing objects between processes incurs serialization (pickling) and IPC overhead."
          }
        }
      ]
    },
    {
      id: "ch-24",
      title: "Chapter 24 — Asyncio Reactor Architecture & High-Concurrency Microservices",
      description: "Event loops, coroutines, non-blocking multiplexing (epoll/kqueue), asyncio primitives, and building async microservices with FastAPI.",
      level: "Hard",
      concepts: [
        {
          id: "py-24-1",
          title: "Asyncio Event Loops, Epoll Reactor & Non-Blocking Multiplexing",
          slug: "asyncio-event-loops",
          level: "Hard",
          description: "How asyncio achieves 50,000+ concurrent network connections on a single OS thread using non-blocking epoll/kqueue event demultiplexing.",
          tldr: "Asyncio coroutines run on a single thread. When a coroutine awaits an I/O operation, it yields control back to the event loop to execute other tasks.",
          flowchart: `[Event Loop (Single Thread)]
      │
      ├── Polling OS non-blocking epoll/kqueue
      │
      ├── Task 1 encounters 'await async_fetch()' ──> Suspends Task 1
      │                                                └── Register socket fd
      ├── Switches to Task 2 ──> Executes until next 'await'
      │
      └── Socket fd ready ──> Wakes Task 1 & resumes execution`,
          code: `import asyncio
import time

async def simulated_io_fetch(task_id: int, delay: float) -> str:
    print(f"Task {task_id} initiated, yielding to event loop...")
    await asyncio.sleep(delay)  # Non-blocking cooperative yield
    print(f"Task {task_id} completed!")
    return f"Result from {task_id}"

async def main():
    t0 = time.perf_counter()
    # Concurrently execute 3 I/O tasks on a SINGLE OS thread
    results = await asyncio.gather(
        simulated_io_fetch(1, 0.2),
        simulated_io_fetch(2, 0.2),
        simulated_io_fetch(3, 0.2)
    )
    elapsed = time.perf_counter() - t0
    print(f"All tasks finished in {elapsed:.2f}s (Total sequential would be 0.60s)")
    print(results)

asyncio.run(main())`,
          expectedOutput: `Task 1 initiated, yielding to event loop...
Task 2 initiated, yielding to event loop...
Task 3 initiated, yielding to event loop...
Task 1 completed!
Task 2 completed!
Task 3 completed!
All tasks finished in 0.21s (Total sequential would be 0.60s)
['Result from 1', 'Result from 2', 'Result from 3']`,
          exercisePrompt: "Write an asyncio task with asyncio.wait_for() that times out after 0.1 seconds.",
          solutionCode: `import asyncio\nasync def slow(): await asyncio.sleep(1)\nasync def run():\n    try: await asyncio.wait_for(slow(), timeout=0.1)\n    except asyncio.TimeoutError: print("Timed out safely!")\nasyncio.run(run())`,
          quiz: {
            question: "What happens when you call 'time.sleep(5)' inside an asyncio coroutine?",
            options: [
              "It pauses only that specific coroutine while other tasks continue running",
              "It blocks the ENTIRE single-threaded event loop, freezing all concurrent tasks for 5 seconds",
              "It automatically converts into an asyncio.sleep()",
              "It raises an AsyncExecutionError"
            ],
            correctIndex: 1,
            explanation: "time.sleep() is a blocking synchronous call. It halts the entire OS thread, completely preventing the event loop from scheduling other coroutines."
          }
        },
        {
          id: "py-24-2",
          title: "High-Throughput Microservice Architecture with FastAPI & Async Streams",
          slug: "fastapi-async-microservices",
          level: "Hard",
          description: "Building production ASGI microservices using FastAPI, Pydantic v2 validation, asynchronous database connection pooling with asyncpg, and streaming responses.",
          tldr: "FastAPI runs on ASGI servers like Uvicorn. Coroutine route handlers ('async def') allow the server to process concurrent requests without blocking worker threads.",
          code: `import asyncio
from typing import AsyncGenerator

# Simulating an asynchronous event stream generator
async def telemetry_event_stream() -> AsyncGenerator[str, None]:
    for sequence_id in range(1, 4):
        await asyncio.sleep(0.05)  # Simulate non-blocking async DB poll
        yield f"event: metric\\ndata: {{\"seq\": {sequence_id}, \"qps\": 45200}}\\n\\n"

async def consumer_demo():
    print("Streaming Real-Time Telemetry via ASGI Reactor:")
    async for event in telemetry_event_stream():
        print(f"Received -> {event.strip()}")

asyncio.run(consumer_demo())`,
          expectedOutput: `Streaming Real-Time Telemetry via ASGI Reactor:
Received -> event: metric\ndata: {"seq": 1, "qps": 45200}
Received -> event: metric\ndata: {"seq": 2, "qps": 45200}
Received -> event: metric\ndata: {"seq": 3, "qps": 45200}`,
          exercisePrompt: "Write an async context manager in Python using the @contextlib.asynccontextmanager decorator.",
          solutionCode: `import contextlib\n@contextlib.asynccontextmanager\nasync def managed_resource():\n    print("Acquired")\n    try: yield "Resource"\n    finally: print("Released")`,
          quiz: {
            question: "Why does FastAPI outperform traditional synchronous WSGI frameworks like Flask or standard Django for I/O-bound traffic?",
            options: [
              "It compiles Python directly into C++ binaries",
              "It uses the asynchronous ASGI specification and an asyncio event loop to handle thousands of concurrent requests on a single worker without thread contention",
              "It runs in the browser via WebAssembly",
              "It uses UDP instead of TCP"
            ],
            correctIndex: 1,
            explanation: "FastAPI is built on Starlette and Pydantic, utilizing ASGI to handle thousands of concurrent I/O operations cooperatively on an asyncio event loop."
          }
        }
      ]
    }
  ]
}
