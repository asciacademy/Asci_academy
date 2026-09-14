import type { Part } from "./python-course-data"

/* ═══════════════════════════════════════════════════════════════════════════
   ASCI PYTHON CURRICULUM — PART II: INTERMEDIATE SYSTEMS & AUTOMATION (CHAPTERS 9 - 16)
   ═══════════════════════════════════════════════════════════════════════════ */

export const pythonCurriculumPart2: Part = {
  id: "part-2",
  partNumber: 2,
  title: "Part II: Intermediate Systems & Automation Engineering",
  description: "Master practical systems engineering, regular expression automata, cross-platform file manipulation, CLI tools, SQLite transactions, web scrapers, and document pipelines.",
  level: "Intermediate",
  chapters: [
    {
      id: "ch-9",
      title: "Chapter 9 — Text Processing, Unicode & Regular Expression Automata",
      description: "CPython's internal regex engine, NFA state machines, greedy vs lazy quantifiers, lookaround assertions, and the re module.",
      level: "Intermediate",
      concepts: [
        {
          id: "py-9-1",
          title: "Regex Finite Automata, Groups & Quantifiers",
          slug: "regex-automata-groups-quantifiers",
          level: "Intermediate",
          description: "How Python compiles regular expressions into non-deterministic finite automata (NFA), using numbered capture groups, named groups (?P<name>), and quantifiers (+, *, ?, {m,n}).",
          tldr: "Always use raw strings r'' for regex patterns to prevent Python string escape collisions with regex escapes (like \\d or \\b).",
          flowchart: `[Pattern String: r'^(\\d{3})-(\\d{4})$']
                   │
           (re.compile())
                   ▼
      [Compiled SRE_Pattern Object]
                   │
         (Non-Deterministic FA)
                   ▼
       [Matching Stream Evaluation]
      ├── Match found ──> Returns SRE_Match object with .groups()
      └── No match    ──> Returns None`,
          code: `import re

# Compiling structured pattern with named capture groups
log_pattern = re.compile(
    r"^(?P<ip>\d{1,3}(?:\.\d{1,3}){3}) - - \[(?P<timestamp>[^\]]+)\] \"(?P<method>[A-Z]+) (?P<route>\S+) HTTP/\d\.\d\" (?P<status>\d{3})"
)

log_line = '192.168.1.42 - - [12/Sep/2026:14:32:05 +0000] "GET /api/v2/orders HTTP/1.1" 200'

match = log_pattern.match(log_line)
if match:
    data = match.groupdict()
    print("Parsed HTTP Telemetry:")
    for k, v in data.items():
        print(f"  {k:10}: {v}")`,
          expectedOutput: `Parsed HTTP Telemetry:
  ip        : 192.168.1.42
  timestamp : 12/Sep/2026:14:32:05 +0000
  method    : GET
  route     : /api/v2/orders
  status    : 200`,
          exercisePrompt: "Write a regex that matches a valid email address and extracts the username and domain into separate named groups.",
          solutionCode: `import re\np = re.compile(r'(?P<user>[\\w.-]+)@(?P<domain>[\\w.-]+\\.[a-z]{2,})')\nm = p.match('engineer@asci.io')\nprint(m.groupdict())`,
          programWorking: [
            {
              step: 1,
              line: 4,
              title: "Regex Pattern Compilation",
              explanation: "re.compile() parses the regex pattern string into a C-level bytecode representation (SRE_Pattern), avoiding recompilation on repeated evaluations."
            },
            {
              step: 2,
              line: 10,
              title: "Anchor Verification",
              explanation: "The '^' anchor binds matching strictly to the beginning of the input string, failing fast if the prefix is not an IP address."
            },
            {
              step: 3,
              line: 11,
              title: "Dictionary Extraction",
              explanation: "match.groupdict() generates a dictionary mapping named group identifiers ('ip', 'timestamp', etc.) directly to their matched substrings."
            }
          ],
          interviewQuestions: [
            {
              question: "What is catastrophic backtracking in regular expressions, and how can you avoid it in Python?",
              answer: "Catastrophic backtracking occurs when nested quantifiers (e.g. (a+)+) fail to match a string, causing the engine's backtracking algorithm to explore an exponential O(2^N) number of combinations. In Python, avoid nested quantifiers, use atomic grouping equivalents, or restrict character classes.",
              companyTags: ["Cloudflare", "Meta", "Google"]
            }
          ],
          quiz: {
            question: "What does the regular expression 'r'(\\d{3})-(\\d{3})-(\\d{4})'' return when evaluated with .findall() on a matching string?",
            options: [
              "A list of full matching strings: ['415-555-1234']",
              "A list of tuples containing the group captures: [('415', '555', '1234')]",
              "A single dictionary of groups",
              "A Match object"
            ],
            correctIndex: 1,
            explanation: "When a regex has multiple capturing groups, re.findall() returns a list of tuples, where each tuple represents the captured groups from a match."
          },
          resources: [
            { title: "Python re Module Official Documentation", url: "https://docs.python.org/3/library/re.html", type: "docs" }
          ]
        },
        {
          id: "py-9-2",
          title: "Greedy vs. Lazy Matching, Substitution & Verbose Mode",
          slug: "regex-greedy-lazy-sub-verbose",
          level: "Intermediate",
          description: "Resolve matching ambiguities between greedy (.*) and non-greedy (.*?) quantifiers, sanitize strings with re.sub(), and structure long patterns using re.VERBOSE.",
          tldr: "By default, quantifiers (*, +, {}) are greedy and consume the longest possible match. Adding '?' makes them lazy (non-greedy), matching the minimal span.",
          code: `import re

html_snippet = '<div class="card"><span>Header</span><span>Body</span></div>'

# Greedy matching eats across multiple tags
greedy = re.findall(r'<.*>', html_snippet)
print(f"Greedy Match ({len(greedy)}):", greedy[0])

# Non-greedy (lazy) matching stops at first delimiter
lazy = re.findall(r'<.*?>', html_snippet)
print(f"Non-Greedy Matches ({len(lazy)}):", lazy)

# Substitution to sanitize sensitive data with backreferences
phone_pattern = re.compile(r'(\d{3})-(\d{3})-(\d{4})')
redacted = phone_pattern.sub(r'\\g<1>-***-****', "Call client at 415-867-5309 immediately")
print("Sanitized String:", redacted)`,
          expectedOutput: `Greedy Match (1): <div class="card"><span>Header</span><span>Body</span></div>
Non-Greedy Matches (6): ['<div class="card">', '<span>', '</span>', '<span>', '</span>', '</div>']
Sanitized String: Call client at 415-***-**** immediately`,
          exercisePrompt: "Use re.sub() with a function argument to convert all uppercase words into lowercase in a sentence.",
          solutionCode: `import re\ntext = "HELLO World FOO Bar"\nres = re.sub(r'[A-Z]+', lambda m: m.group(0).lower(), text)\nprint(res)`,
          quiz: {
            question: "What flag allows multi-line regular expressions with whitespace and comments in Python?",
            options: ["re.MULTILINE", "re.VERBOSE (or re.X)", "re.DOTALL", "re.DEBUG"],
            correctIndex: 1,
            explanation: "re.VERBOSE (or re.X) allows you to format regular expressions across multiple lines and add '#' comments, ignoring extraneous whitespace."
          }
        }
      ]
    },
    {
      id: "ch-10",
      title: "Chapter 10 — Filesystem Architecture, Paths & Buffered I/O",
      description: "Pathlib object-oriented paths, POSIX vs Windows resolution, kernel file descriptors, buffered streams, and shelve persistence.",
      level: "Intermediate",
      concepts: [
        {
          id: "py-10-1",
          title: "Object-Oriented Paths with pathlib.Path & Cross-Platform I/O",
          slug: "pathlib-paths-cross-platform",
          level: "Intermediate",
          description: "Replace legacy os.path string manipulations with modern pathlib.Path objects, handling forward/backward slash normalization and path traversal.",
          tldr: "Pathlib represents filesystem paths as rich objects. Use the '/' operator to construct subpaths cleanly regardless of Windows backslashes or POSIX slashes.",
          flowchart: `Path('config') / 'prod' / 'settings.json'
                  │
        (OS Architecture Check)
        ├── On Windows ──> Resolves to 'config\\prod\\settings.json'
        └── On POSIX   ──> Resolves to 'config/prod/settings.json'`,
          code: `from pathlib import Path

# Constructing paths safely across Windows and Linux
base_dir = Path.cwd()
data_file = base_dir / "telemetry" / "metrics.log"

print(f"File Path: {data_file}")
print(f"Parent Directory: {data_file.parent}")
print(f"File Stem: {data_file.stem}")
print(f"File Suffix: {data_file.suffix}")

# Checking path characteristics
print(f"Is Absolute: {data_file.is_absolute()}")
resolved = data_file.resolve()
print(f"Canonical Normalized Path: {resolved}")`,
          expectedOutput: `File Path: /workspace/telemetry/metrics.log
Parent Directory: /workspace/telemetry
File Stem: metrics
File Suffix: .log
Is Absolute: True
Canonical Normalized Path: /workspace/telemetry/metrics.log`,
          exercisePrompt: "Write code using pathlib.Path to find all '.json' files in the current working directory non-recursively.",
          solutionCode: `from pathlib import Path\njson_files = list(Path.cwd().glob('*.json'))\nprint([f.name for f in json_files])`,
          quiz: {
            question: "Which pathlib method returns a new Path with the file extension changed?",
            options: ["with_name()", "with_suffix()", "replace_ext()", "set_extension()"],
            correctIndex: 1,
            explanation: "path.with_suffix('.new_ext') returns a new Path object with the extension replaced by the specified suffix."
          }
        },
        {
          id: "py-10-2",
          title: "Buffered Stream Processing, Context Managers & Shelve Persistence",
          slug: "buffered-io-context-managers-shelve",
          level: "Intermediate",
          description: "How file context managers (with open(...)) manage OS file descriptors, stream chunking for gigabyte files, and binary dictionary persistence with shelve.",
          tldr: "Always specify encoding='utf-8' when opening text files. For large files, iterate line by line or in 64KB binary chunks to avoid exhausting RAM.",
          code: `import shelve
import tempfile
from pathlib import Path

# Stream chunking for large datasets
temp_dir = Path(tempfile.mkdtemp())
sample_file = temp_dir / "large_stream.bin"
sample_file.write_bytes(b"ASCI_STREAM_CHUNK" * 1024)

total_bytes = 0
CHUNK_SIZE = 4096

with open(sample_file, "rb") as stream:
    while chunk := stream.read(CHUNK_SIZE):
        total_bytes += len(chunk)

print(f"Processed {total_bytes} bytes via chunked buffered stream")

# Binary key-value shelf storage
shelf_path = temp_dir / "cache.shelf"
with shelve.open(str(shelf_path)) as shelf:
    shelf["session_101"] = {"user": "admin", "tokens": 450}
    shelf["flags"] = [True, False, True]

with shelve.open(str(shelf_path)) as shelf:
    print("Retrieved from Shelf DB:", shelf["session_101"])`,
          expectedOutput: `Processed 17408 bytes via chunked buffered stream
Retrieved from Shelf DB: {'user': 'admin', 'tokens': 450}`,
          exercisePrompt: "Use a context manager to safely open and read a file line-by-line using a generator.",
          solutionCode: `def stream_lines(filepath):\n    with open(filepath, 'r', encoding='utf-8') as f:\n        for line in f:\n            yield line.strip()`,
          quiz: {
            question: "Why should you always use 'with open(...) as f:' instead of manual 'f.close()' calls?",
            options: [
              "Context managers execute file I/O on separate CPU cores",
              "Context managers guarantee file descriptors are closed even if uncaught exceptions occur",
              "Manual close() deletes the underlying file from disk",
              "The with statement doubles read throughput"
            ],
            correctIndex: 1,
            explanation: "The with statement invokes __enter__ and __exit__ on the stream, ensuring the OS file descriptor is reclaimed under all circumstances, including crashes."
          }
        }
      ]
    },
    {
      id: "ch-11",
      title: "Chapter 11 — File Automation, Directory Tree Traversal & Archiving",
      description: "High-level filesystem operations with shutil, non-destructive recycling with send2trash, directory walking with os.walk, and zipfile compression.",
      level: "Intermediate",
      concepts: [
        {
          id: "py-11-1",
          title: "File Automation with shutil & Safe Recycle Bin Deletion",
          slug: "shutil-file-automation-send2trash",
          level: "Intermediate",
          description: "Copying directory trees, atomic moves, and why destructive calls like shutil.rmtree() should be replaced with send2trash in production scripts.",
          tldr: "shutil.rmtree() permanently obliterates folders immediately. In user-facing automation scripts, use send2trash to send deleted items to the OS Trash/Recycle Bin.",
          code: `import shutil
import tempfile
from pathlib import Path

# Setup sandbox directories
temp_root = Path(tempfile.mkdtemp())
src_dir = temp_root / "source"
dst_dir = temp_root / "backup"

src_dir.mkdir()
(src_dir / "payload.txt").write_text("Mission critical backup data", encoding="utf-8")

# Copy entire directory tree
shutil.copytree(src_dir, dst_dir)
print(f"Tree copied successfully to: {dst_dir.name}")
print(f"Backup contents: {[p.name for p in dst_dir.iterdir()]}")

# Cleanup
shutil.rmtree(temp_root)`,
          expectedOutput: `Tree copied successfully to: backup
Backup contents: ['payload.txt']`,
          exercisePrompt: "Demonstrate moving and renaming a file in a single atomic operation using shutil.move().",
          solutionCode: `import shutil, tempfile, pathlib\n# shutil.move(src, dst) renames if destination is a new path filename`,
          quiz: {
            question: "What is the primary danger of using 'shutil.rmtree()' in automation scripts?",
            options: [
              "It corrupts hard drive sectors permanently",
              "It permanently deletes folders without sending them to the OS Recycle Bin/Trash, with no built-in undo",
              "It only works on empty folders",
              "It freezes the operating system kernel"
            ],
            correctIndex: 1,
            explanation: "shutil.rmtree() immediately and irreversibly deletes the entire folder and all nested contents without passing through the OS recycle bin."
          }
        },
        {
          id: "py-11-2",
          title: "Recursive Directory Traversal (os.walk) & ZipFile Compression",
          slug: "directory-walks-and-zipfile",
          level: "Intermediate",
          description: "Traversing arbitrary filesystem directory trees using os.walk() or Path.rglob(), and archiving files into compressed zip archives using zipfile.",
          tldr: "os.walk() yields a 3-tuple (dirpath, dirnames, filenames) for each folder. The zipfile module creates and inspects ZIP archives without external CLI tools.",
          code: `import zipfile
import tempfile
from pathlib import Path

temp_dir = Path(tempfile.mkdtemp())
archive_file = temp_dir / "project_release.zip"

# Create compressed ZIP archive
with zipfile.ZipFile(archive_file, "w", compression=zipfile.ZIP_DEFLATED) as zip_out:
    zip_out.writestr("manifest.json", '{"version": "3.12.0", "status": "RELEASE"}')
    zip_out.writestr("docs/README.md", "# ASCI Systems Architecture\\n\\nProduction release.")

# Inspect archive contents without extracting
with zipfile.ZipFile(archive_file, "r") as zip_in:
    print("Archive Manifest Listing:")
    for info in zip_in.infolist():
        print(f"  {info.filename:20} -> Compressed: {info.compress_size} bytes | Raw: {info.file_size} bytes")`,
          expectedOutput: `Archive Manifest Listing:
  manifest.json        -> Compressed: 45 bytes | Raw: 45 bytes
  docs/README.md       -> Compressed: 55 bytes | Raw: 55 bytes`,
          exercisePrompt: "Write a script that reads and prints the contents of a text file inside a ZIP archive without extracting it to disk.",
          solutionCode: `import zipfile\nwith zipfile.ZipFile('data.zip', 'r') as z:\n    print(z.read('manifest.json').decode('utf-8'))`,
          quiz: {
            question: "What does the 3-tuple yielded by 'os.walk(path)' contain at each iteration?",
            options: [
              "(path_object, file_count, directory_count)",
              "(current_folder_path, list_of_subfolders, list_of_filenames)",
              "(file_descriptor, inode, permissions)",
              "(root, size, hash)"
            ],
            correctIndex: 1,
            explanation: "os.walk yields (dirpath, dirnames, filenames) for every directory in the tree rooted at the specified top path."
          }
        }
      ]
    },
    {
      id: "ch-12",
      title: "Chapter 12 — Production CLI Engineering & Systems Tooling",
      description: "Argument parsing with argparse, subcommands, flags, POSIX exit codes, and packaging standalone CLI utilities.",
      level: "Intermediate",
      concepts: [
        {
          id: "py-12-1",
          title: "Argument Parsing with argparse, Flags & Subcommands",
          slug: "cli-argparse-subcommands",
          level: "Intermediate",
          description: "Build command-line interfaces conforming to POSIX conventions, utilizing argparse for typed arguments, boolean flags, choices, and nested subcommands (like git/docker).",
          tldr: "argparse auto-generates help screens (--help), validates types, handles default values, and provides subcommand multiplexing.",
          code: `import argparse

def build_cli_parser():
    parser = argparse.ArgumentParser(
        prog="asci-ctl",
        description="ASCI High-Performance Cluster Orchestrator CLI"
    )
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose diagnostic output")
    
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # Subcommand: deploy
    deploy_parser = subparsers.add_parser("deploy", help="Deploy service container")
    deploy_parser.add_argument("service", type=str, help="Target service name")
    deploy_parser.add_argument("--replicas", type=int, default=3, help="Replica count")
    deploy_parser.add_argument("--env", choices=["staging", "prod"], default="staging")
    
    return parser

parser = build_cli_parser()
# Simulating command line args: deploy orders-engine --replicas 5 --env prod
args = parser.parse_args(["deploy", "orders-engine", "--replicas", "5", "--env", "prod"])
print("Parsed CLI Arguments:")
print(f"  Command  : {args.command}")
print(f"  Service  : {args.service}")
print(f"  Replicas : {args.replicas}")
print(f"  Env      : {args.env}")`,
          expectedOutput: `Parsed CLI Arguments:
  Command  : deploy
  Service  : orders-engine
  Replicas : 5
  Env      : prod`,
          exercisePrompt: "Add an optional '--dry-run' boolean flag to an argparse parser that defaults to False.",
          solutionCode: `import argparse\np = argparse.ArgumentParser()\np.add_argument('--dry-run', action='store_true')`,
          quiz: {
            question: "What action should you specify in 'add_argument' to create a boolean switch flag that sets the variable to True when present?",
            options: ["action='store_bool'", "action='store_true'", "action='flag'", "action='append'"],
            correctIndex: 1,
            explanation: "action='store_true' assigns the argument a value of True when the flag is passed on the command line and False otherwise."
          }
        },
        {
          id: "py-12-2",
          title: "POSIX Exit Codes, Shebangs & Packaging Standalone CLI Utilities",
          slug: "posix-exit-codes-shebang-packaging",
          level: "Intermediate",
          description: "Conforming to POSIX process exit semantics (0 for success, non-zero for errors), configuring executable shebang lines, and packaging entrypoints via pyproject.toml.",
          tldr: "By convention in Unix/POSIX and Windows shells, exit code 0 signifies clean success. Any non-zero integer signals a specific error condition to calling scripts.",
          code: `import sys

def execute_system_task(config_loaded: bool) -> int:
    if not config_loaded:
        sys.stderr.write("FATAL: Missing mandatory cluster configuration!\\n")
        return 2  # POSIX error code: Invalid configuration
    print("Cluster sync complete.")
    return 0  # Clean success

exit_status = execute_system_task(config_loaded=True)
print(f"Process will terminate with exit code: {exit_status}")`,
          expectedOutput: `Cluster sync complete.
Process will terminate with exit code: 0`,
          exercisePrompt: "Write the standard portable shebang line used at the top of executable Python scripts in Unix systems.",
          solutionCode: `#!/usr/bin/env python3`,
          quiz: {
            question: "In POSIX and shell scripting, what exit code denotes that a program succeeded without errors?",
            options: ["1", "-1", "0", "200"],
            correctIndex: 2,
            explanation: "Exit code 0 is the universal standard across Unix and Windows shells indicating successful, error-free execution."
          }
        }
      ]
    },
    {
      id: "ch-13",
      title: "Chapter 13 — Structured Data Interchange: CSV, JSON & XML",
      description: "Processing comma-separated tabular data with csv.DictReader, zero-copy JSON parsing with orjson, and hierarchical XML processing with ElementTree.",
      level: "Intermediate",
      concepts: [
        {
          id: "py-13-1",
          title: "High-Performance CSV & Zero-Copy JSON Processing",
          slug: "csv-dictreader-json-orjson",
          level: "Intermediate",
          description: "Read and write tabular CSV datasets with header mapping via csv.DictReader/DictWriter, and serialize millions of JSON records with orjson.",
          tldr: "csv.DictReader maps each row to a dictionary based on the header line. For JSON APIs, orjson executes serialization in C/Rust up to 10x faster than standard json.",
          code: `import csv
import io
import json

# Processing CSV with DictReader
csv_raw = """sku,price,inventory,status
SKU-1001,49.99,150,ACTIVE
SKU-1002,12.50,0,OUT_OF_STOCK
SKU-1003,199.00,24,ACTIVE"""

stream = io.StringIO(csv_raw.strip())
reader = csv.DictReader(stream)

active_items = []
for row in reader:
    if row["status"] == "ACTIVE":
        active_items.append({
            "sku": row["sku"],
            "price": float(row["price"]),
            "stock": int(row["inventory"])
        })

print("Parsed CSV into Structured Records:")
print(json.dumps(active_items, indent=2))`,
          expectedOutput: `Parsed CSV into Structured Records:
[
  {
    "sku": "SKU-1001",
    "price": 49.99,
    "stock": 150
  },
  {
    "sku": "SKU-1003",
    "price": 199.0,
    "stock": 24
  }
]`,
          exercisePrompt: "Use json.dumps() with the 'sort_keys=True' and 'indent=2' parameters to format a dictionary consistently for API snapshots.",
          solutionCode: `import json\nd = {"b": 2, "a": 1}\nprint(json.dumps(d, sort_keys=True, indent=2))`,
          quiz: {
            question: "Why does csv.writer() require 'newline=\"\"' when opening the file in Python 3?",
            options: [
              "To enable UTF-8 character encoding",
              "To prevent blank lines from being inserted between rows on Windows due to carriage return translation",
              "To bypass file permission locks",
              "To increase write buffer memory"
            ],
            correctIndex: 1,
            explanation: "On Windows, text mode translates '\\n' to '\\r\\n'. If csv.writer also emits '\\r\\n', duplicate carriage returns produce blank rows unless newline='' is specified."
          }
        },
        {
          id: "py-13-2",
          title: "XML Document Tree Parsing with xml.etree.ElementTree",
          slug: "xml-elementtree-parsing",
          level: "Intermediate",
          description: "Parsing, searching, and manipulating hierarchical XML documents using XPath queries, element tag navigation, and attribute extraction.",
          tldr: "xml.etree.ElementTree represents XML as a hierarchical tree of Element nodes. Use find() for single elements and findall() for iterating child tags.",
          code: `import xml.etree.ElementTree as ET

xml_data = """<?xml version="1.0"?>
<catalog>
    <book id="bk101">
        <author>Ramalho, Luciano</author>
        <title>Fluent Python</title>
        <price>59.99</price>
    </book>
    <book id="bk102">
        <author>Sweigart, Al</author>
        <title>Automate the Boring Stuff</title>
        <price>39.95</price>
    </book>
</catalog>"""

root = ET.fromstring(xml_data)
print(f"Root XML Tag: {root.tag}")

for book in root.findall("book"):
    book_id = book.get("id")
    title = book.find("title").text
    author = book.find("author").text
    price = book.find("price").text
    print(f"[{book_id}] {title} by {author} (USD {price})")`,
          expectedOutput: `Root XML Tag: catalog
[bk101] Fluent Python by Ramalho, Luciano (USD 59.99)
[bk102] Automate the Boring Stuff by Sweigart, Al (USD 39.95)`,
          exercisePrompt: "Write an ElementTree query to find all sub-elements with the tag 'author'.",
          solutionCode: `authors = [elem.text for elem in root.findall('.//author')]\nprint(authors)`,
          quiz: {
            question: "What method extracts the value of an XML attribute (e.g. <item id='42'>) in ElementTree?",
            options: ["element.attr('id')", "element.get('id')", "element.attributes['id']", "element.text"],
            correctIndex: 1,
            explanation: "The get('attr_name') method retrieves the specified attribute's string value from an Element node."
          }
        }
      ]
    },
    {
      id: "ch-14",
      title: "Chapter 14 — Relational Persistence with SQLite3",
      description: "Embedded SQL engines, cursor execution, schema constraints, parameterized queries against SQL injection, B-Trees, and WAL transactions.",
      level: "Intermediate",
      concepts: [
        {
          id: "py-14-1",
          title: "Embedded Relational Storage, Cursors & ACID Transactions",
          slug: "sqlite-cursors-acid-transactions",
          level: "Intermediate",
          description: "Connect to in-memory and disk-based SQLite databases, execute DDL statements (CREATE TABLE), manage cursor iteration, and control atomic transaction commits.",
          tldr: "SQLite runs in-process without requiring a separate server daemon. Transactions are atomic: changes become visible only after calling conn.commit().",
          flowchart: `[sqlite3.connect('database.db')]
                │
         (Open Connection)
                ▼
       [cursor = conn.cursor()]
                │
     (cursor.execute(INSERT/UPDATE))
                │
                ├── Exception raised ──> conn.rollback() (Revert changes)
                └── Clean execution  ──> conn.commit() (Sync WAL to disk)`,
          code: `import sqlite3

# Connect to in-memory transactional database
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

# Enable foreign keys and create structured schema
cursor.execute("PRAGMA foreign_keys = ON;")
cursor.execute("""
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    holder_name TEXT NOT NULL,
    balance REAL NOT NULL CHECK(balance >= 0)
);
""")

# Atomic bank transfer simulation
cursor.execute("INSERT INTO accounts (holder_name, balance) VALUES ('Alice', 1000.0);")
cursor.execute("INSERT INTO accounts (holder_name, balance) VALUES ('Bob', 500.0);")
conn.commit()

def transfer_funds(sender_id: int, receiver_id: int, amount: float):
    try:
        cursor.execute("UPDATE accounts SET balance = balance - ? WHERE id = ?", (amount, sender_id))
        cursor.execute("UPDATE accounts SET balance = balance + ? WHERE id = ?", (amount, receiver_id))
        conn.commit()
        print(f"Transferred USD {amount:.2f} successfully.")
    except Exception as exc:
        conn.rollback()
        print(f"Transfer failed; transaction rolled back: {exc}")

transfer_funds(1, 2, 250.0)

cursor.execute("SELECT id, holder_name, balance FROM accounts")
for row in cursor.fetchall():
    print(f"Account {row[0]} ({row[1]}): USD {row[2]:.2f}")`,
          expectedOutput: `Transferred USD 250.00 successfully.
Account 1 (Alice): USD 750.00
Account 2 (Bob): USD 750.00`,
          exercisePrompt: "Write an INSERT statement with an ON CONFLICT DO UPDATE clause (upsert) in SQLite.",
          solutionCode: `cursor.execute("INSERT INTO accounts(id, holder_name, balance) VALUES(1, 'Alice', 800) ON CONFLICT(id) DO UPDATE SET balance=excluded.balance;")`,
          quiz: {
            question: "What happens if a Python script terminates unexpectedly during an active SQLite transaction before calling 'conn.commit()'?",
            options: [
              "Half of the inserted rows remain in the table permanently",
              "SQLite automatically rolls back the entire uncommitted transaction, preserving data integrity",
              "The database file becomes corrupted",
              "The changes are committed automatically upon process exit"
            ],
            correctIndex: 1,
            explanation: "SQLite guarantees Atomicity (from ACID). Any transaction not explicitly committed is automatically rolled back, leaving the database unmodified."
          }
        },
        {
          id: "py-14-2",
          title: "Parameterized Queries (Preventing SQLi), B-Trees & WAL Mode",
          slug: "sqlite-parameterized-queries-wal",
          level: "Intermediate",
          description: "Why formatting SQL strings with f-strings is a catastrophic vulnerability, how parameter placeholders (?) work, and how WAL mode enables concurrent readers and writers.",
          tldr: "Never concatenate user strings into SQL queries. Parameterized queries bind values as safe literals. WAL mode (PRAGMA journal_mode=WAL) boosts concurrency by 4x.",
          code: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, is_admin INTEGER);")
cursor.execute("INSERT INTO users (username, is_admin) VALUES ('admin', 1);")
cursor.execute("INSERT INTO users (username, is_admin) VALUES ('guest', 0);")
conn.commit()

# Attacker attempt: SQL Injection payload
malicious_user_input = "guest' OR 1=1 --"

# VULNERABLE APPROACH (DO NOT DO THIS):
# query = f"SELECT * FROM users WHERE username = '{malicious_user_input}'" -> Leaks all records!

# SECURE APPROACH: Parameterized Query using '?' placeholders
cursor.execute("SELECT id, username, is_admin FROM users WHERE username = ?", (malicious_user_input,))
results = cursor.fetchall()
print(f"Matching records for attack string: {len(results)} (Safely blocked!)")

# Legitimate lookup
cursor.execute("SELECT id, username, is_admin FROM users WHERE username = ?", ("admin",))
print("Legitimate Lookup:", cursor.fetchone())`,
          expectedOutput: `Matching records for attack string: 0 (Safely blocked!)
Legitimate Lookup: (1, 'admin', 1)`,
          exercisePrompt: "Enable Write-Ahead Logging (WAL) mode on an open SQLite database connection using a PRAGMA statement.",
          solutionCode: `cursor.execute("PRAGMA journal_mode = WAL;")\nprint(cursor.fetchone()[0])`,
          quiz: {
            question: "Why do parameterized queries ('?') eliminate SQL injection vulnerabilities?",
            options: [
              "They run regex sanitation on the string before sending it to the database",
              "They compile the query structure into bytecode first; input values are treated strictly as literal data, not executable code",
              "They escape apostrophes using POSIX shell quotes",
              "They only allow numeric parameters"
            ],
            correctIndex: 1,
            explanation: "Parameters are bound directly to the compiled VDBE opcode structure as typed data constants, making it impossible for user input to alter the query's syntax."
          }
        }
      ]
    },
    {
      id: "ch-15",
      title: "Chapter 15 — Network I/O, Web Scraping & Headless Automation",
      description: "HTTP client engineering with requests and httpx, status codes, session connection pooling, BeautifulSoup CSS selectors, and Playwright headless automation.",
      level: "Intermediate",
      concepts: [
        {
          id: "py-15-1",
          title: "HTTP Client Engineering (requests/httpx, Status Codes & Retries)",
          slug: "http-client-engineering-requests",
          level: "Intermediate",
          description: "Making production-grade HTTP requests, handling connection pooling via Session objects, raising exceptions for HTTP 4xx/5xx codes, and configuring retries.",
          tldr: "Always use requests.Session() to reuse TCP connections (keep-alive). Always set an explicit timeout (e.g. timeout=5.0) to prevent hung network sockets.",
          code: `# Demonstrating HTTP Client Patterns with requests
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()

# Configure exponential backoff retry strategy for transient 500/502/503 errors
retries = Retry(
    total=3,
    backoff_factor=0.5,
    status_forcelist=[500, 502, 503, 504]
)
session.mount("https://", HTTPAdapter(max_retries=retries))

# Mock demonstrating response handling
response = session.get("https://httpbin.org/json", timeout=5.0)
response.raise_for_status()  # Raises HTTPError if status is 4xx or 5xx

payload = response.json()
print("HTTP Status Code:", response.status_code)
print("Payload Keys:", list(payload.keys()))`,
          expectedOutput: `HTTP Status Code: 200
Payload Keys: ['slideshow']`,
          exercisePrompt: "Write a function that accepts a URL and returns True if the endpoint returns HTTP 200, or False if an HTTP error or timeout occurs.",
          solutionCode: `import requests\ndef check_url(url):\n    try:\n        r = requests.get(url, timeout=3.0)\n        return r.status_code == 200\n    except requests.RequestException:\n        return False`,
          quiz: {
            question: "What happens if a server hangs and never responds when you call 'requests.get(url)' without a 'timeout' argument?",
            options: [
              "It automatically times out after 10 seconds",
              "The Python process will block and wait indefinitely, freezing the thread",
              "It returns a 408 Request Timeout status object",
              "It raises an immediate ConnectionResetError"
            ],
            correctIndex: 1,
            explanation: "By default, requests has no timeout. Without an explicit timeout parameter, your program can hang indefinitely waiting for the socket to close."
          }
        },
        {
          id: "py-15-2",
          title: "HTML Parsing with BeautifulSoup CSS Selectors & Headless Playwright",
          slug: "web-scraping-bs4-playwright",
          level: "Intermediate",
          description: "Extracting structured data from raw HTML using BeautifulSoup CSS selectors (.select()), and when to escalate to Playwright for Single Page Apps (SPAs).",
          tldr: "Use BeautifulSoup for static server-rendered HTML. For JavaScript-heavy SPAs with hydration or dynamic client rendering, drive headless browsers via Playwright.",
          code: `from bs4 import BeautifulSoup

html_doc = """
<html>
    <head><title>ASCI Market Intelligence</title></head>
    <body>
        <div class="market-overview">
            <h2>Active High-Frequency Nodes</h2>
            <ul id="node-list">
                <li class="node active" data-id="us-east-1">US-East (Latency: 1.2ms)</li>
                <li class="node active" data-id="eu-west-1">EU-West (Latency: 2.4ms)</li>
                <li class="node offline" data-id="ap-south-1">AP-South (Offline)</li>
            </ul>
        </div>
    </body>
</html>
"""

soup = BeautifulSoup(html_doc, "html.parser")
print("Page Title:", soup.title.string)

# Select elements via CSS selectors
active_nodes = soup.select("#node-list li.active")
print(f"Found {len(active_nodes)} active nodes:")
for node in active_nodes:
    node_id = node.get("data-id")
    text = node.text.strip()
    print(f"  [{node_id}] {text}")`,
          expectedOutput: `Page Title: ASCI Market Intelligence
Found 2 active nodes:
  [us-east-1] US-East (Latency: 1.2ms)
  [eu-west-1] EU-West (Latency: 2.4ms)`,
          exercisePrompt: "Use BeautifulSoup's soup.find_all() to extract the href attribute from every link on a page.",
          solutionCode: `links = [a['href'] for a in soup.find_all('a', href=True)]`,
          quiz: {
            question: "In BeautifulSoup, what CSS selector syntax selects all elements with class 'price' inside an element with ID 'inventory'?",
            options: ["#inventory .price", "#inventory > price", ".inventory #price", "inventory.price"],
            correctIndex: 0,
            explanation: "The '#inventory .price' descendant selector matches any element with class 'price' nested inside the element with id 'inventory'."
          }
        }
      ]
    },
    {
      id: "ch-16",
      title: "Chapter 16 — Office Document Automation: Excel, Google Sheets, PDF & Word",
      description: "Automating enterprise spreadsheets with openpyxl, cloud sheets, PDF parsing with pypdf, and Word report synthesis with python-docx.",
      level: "Intermediate",
      concepts: [
        {
          id: "py-16-1",
          title: "Spreadsheet Automation with openpyxl (Workbooks, Formulas, Formatting)",
          slug: "excel-automation-openpyxl",
          level: "Intermediate",
          description: "Read, modify, and style Microsoft Excel (.xlsx) workbooks programmatically: writing cells by coordinate, injecting formulas (=SUM), and setting font styles.",
          tldr: "openpyxl uses 1-indexed row and column coordinates. Formulas like '=SUM(B2:B10)' are stored as literal string values that Excel evaluates upon opening.",
          code: `import openpyxl
from openpyxl.styles import Font, PatternFill
import tempfile
from pathlib import Path

# Create a new workbook in memory
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Financial Summary"

# Write headers with styling
headers = ["Department", "Q1 Budget", "Q2 Budget", "Total"]
ws.append(headers)

header_fill = PatternFill(start_color="062112", end_color="062112", fill_type="solid")
header_font = Font(color="FDFBF7", bold=True)

for col_idx in range(1, 5):
    cell = ws.cell(row=1, column=col_idx)
    cell.fill = header_fill
    cell.font = header_font

# Insert data rows
ws.append(["Engineering", 125000, 140000, "=SUM(B2:C2)"])
ws.append(["Operations", 45000, 48000, "=SUM(B3:C3)"])

# Save to temporary file
temp_file = Path(tempfile.mkdtemp()) / "summary.xlsx"
wb.save(str(temp_file))
print(f"Spreadsheet generated successfully: {temp_file.name}")
print(f"Sheet dimensions: {ws.dimensions}")`,
          expectedOutput: `Spreadsheet generated successfully: summary.xlsx
Sheet dimensions: A1:D3`,
          exercisePrompt: "Write an openpyxl script that accesses cell 'B2' and multiplies its value by 1.1.",
          solutionCode: `cell = ws['B2']\nif isinstance(cell.value, (int, float)): cell.value *= 1.1`,
          quiz: {
            question: "How does openpyxl index rows and columns in an Excel sheet?",
            options: [
              "0-indexed (Row 0, Column 0)",
              "1-indexed (Row 1, Column 1 corresponds to cell A1)",
              "Alphabetic only (A, B, C)",
              "Dictionary keys only"
            ],
            correctIndex: 1,
            explanation: "In openpyxl, row and column numbers are 1-indexed to match standard Excel notation (row 1, col 1 is cell A1)."
          }
        },
        {
          id: "py-16-2",
          title: "PDF Parsing with pypdf & Word Document Synthesis with python-docx",
          slug: "pdf-pypdf-word-docx-automation",
          level: "Intermediate",
          description: "Extracting raw text from multipage PDF files, merging documents, and generating automated Word (.docx) audit reports with headings and tables.",
          tldr: "pypdf extracts text streams and decrypts password-protected PDFs. python-docx constructs formatted Word reports with structured paragraphs, headings, and tables.",
          code: `from pypdf import PdfWriter, PdfReader
import io

# Create an in-memory PDF manipulation pipeline
writer = PdfWriter()
writer.add_blank_page(width=612, height=792)  # Standard Letter size

pdf_buffer = io.BytesIO()
writer.write(pdf_buffer)
pdf_buffer.seek(0)

reader = PdfReader(pdf_buffer)
print(f"Constructed PDF Page Count: {len(reader.pages)}")
page = reader.pages[0]
print(f"Page Geometry Dimensions: {page.mediabox.width} x {page.mediabox.height} points")`,
          expectedOutput: `Constructed PDF Page Count: 1
Page Geometry Dimensions: 612 x 792 points`,
          exercisePrompt: "Extract text from all pages of a PDF document using pypdf.",
          solutionCode: `full_text = "\\n".join([page.extract_text() or "" for page in reader.pages])`,
          quiz: {
            question: "Which Python package is the modern successor to the legacy PyPDF2 library?",
            options: ["pdfminer", "pypdf", "reportlab", "pdfkit"],
            correctIndex: 1,
            explanation: "pypdf (version 3+) is the modern, actively maintained successor that reunited and replaced the legacy PyPDF2 codebase."
          }
        }
      ]
    }
  ]
}
