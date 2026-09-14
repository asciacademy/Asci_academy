import { CurriculumCourse } from "../curriculum-data"

export const CYBERSECURITY_COURSES: CurriculumCourse[] = [
  // =========================================================================
  // COURSE 1: CS50 INTRODUCTION TO CYBERSECURITY (HARVARDX)
  // =========================================================================
  {
    id: "cs50-cybersecurity",
    slug: "cs50-cybersecurity",
    title: "CS50 Introduction to Cybersecurity (HarvardX)",
    description: "Harvard University's introduction to defending data, devices, and systems against digital threats, social engineering, cryptanalysis, and network exploits.",
    category: "Cybersecurity",
    level: "Beginner",
    weeks: "8 Weeks",
    duration_hours: 48,
    lessons: 28,
    projects: 3,
    certificate: "HarvardX Verified Certificate",
    is_premium: false,
    tools: ["Wireshark", "Cryptography (AES/RSA)", "Network Security", "Ethical Hacking", "Passkeys"],
    highlights: [
      "Securing Accounts: Passwords, Rainbow Tables, Salting & WebAuthn Passkeys",
      "Securing Data: Symmetric AES Ciphers, Asymmetric RSA & Digital Signatures",
      "Securing Systems: TCP/IP Handshakes, Packet Sniffing & Zero-Trust Firewalls",
      "Securing Software: SQL Injection (SQLi), Cross-Site Scripting (XSS) & Memory Flaws",
      "Preserving Privacy: Metadata Scrubbing, Tor, and Defense-in-Depth Tradeoffs"
    ],
    modules: [
      {
        id: "cs50-sec-mod-1",
        title: "Module 1: Securing Accounts — Authentication & Hashing",
        sequence_order: 1,
        description: "Explore cryptographic hashes, brute force mechanics, dictionary attacks, and passkeys.",
        lessons: [
          {
            id: "cs50-sec-1-1",
            title: "1.1 Encoding vs Hashing vs Encryption",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Differentiate one-way hash digests (SHA-256) from two-way ciphers (AES).",
            content: `### Cryptographic Fundamentals
* **Encoding (e.g. Base64):** Transforms data into alternate character sets for reliable network transport. It provides **zero confidentiality**.
* **Hashing (e.g. SHA-256, bcrypt):** A deterministic, one-way mathematical function. Given input $x$, it produces a fixed-length digest $H(x)$. It is computationally infeasible to invert $H(x)$ back to $x$.
* **Encryption (e.g. AES-256, RSA):** A two-way transformation that secures confidentiality using secret keys.

\`\`\`python
import hashlib
digest = hashlib.sha256(b"admin").hexdigest()
print(f"DIGEST_PREFIX:{digest[:8]}")
\`\`\``,
            challenge_data: {
              initialCode: `import hashlib\nh = hashlib.sha256(b"password").hexdigest()\nprint("HASH_COMPUTED")\n`,
              expectedOutput: "HASH_COMPUTED",
              instructions: "Compute the hash digest and print 'HASH_COMPUTED'."
            }
          },
          {
            id: "cs50-sec-1-2",
            title: "1.2 Salted Hashes & Rainbow Table Defense",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 75,
            description: "Prevent precomputed dictionary lookups by appending unique random cryptographic salts.",
            content: `### Defeating Rainbow Tables
If two users choose the same password ('hunter2'), their unsalted SHA-256 hashes will be identical. An attacker with a precomputed lookup table (rainbow table) can crack millions of passwords instantly.

**Salting** appends a unique random string (the salt) to each password before hashing:
$$H(\\text{password} + \\text{salt})$$
Even identical passwords produce completely different hash strings!`,
            challenge_data: {
              initialCode: `salt = "s@lt_99"\npwd = "mysecret"\ncombined = salt + pwd\nprint(f"SALTED_LENGTH:{len(combined)}")\n`,
              expectedOutput: "SALTED_LENGTH:15",
              instructions: "Combine the salt and password and print 'SALTED_LENGTH:15'."
            }
          }
        ]
      },
      {
        id: "cs50-sec-mod-2",
        title: "Module 2: Securing Data — Symmetric & Asymmetric Cryptography",
        sequence_order: 2,
        description: "Master AES secret keys, Diffie-Hellman key exchange, RSA public/private pairs, and PKI.",
        lessons: [
          {
            id: "cs50-sec-2-1",
            title: "2.1 Public-Key Cryptography (RSA Trapdoor Functions)",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Encrypt with the public key; decrypt only with the matched private key.",
            content: `### Asymmetric Cryptography
Alice encrypts messages using Bob's **public key**. Only Bob's **private key** can compute the mathematical inverse of the trapdoor function to recover plaintext.

\`\`\`python
# RSA modular exponentiation: c = (m ^ e) % n
def encrypt_rsa(m, e, n):
    return pow(m, e, n)
\`\`\``,
            challenge_data: {
              initialCode: `m = 7\ne = 3\nn = 33\ncipher = pow(m, e, n)\nprint("CIPHERTEXT:", cipher)\n`,
              expectedOutput: "CIPHERTEXT: 13",
              instructions: "Compute the RSA modular exponentiation and print 'CIPHERTEXT: 13'."
            }
          }
        ]
      },
      {
        id: "cs50-sec-mod-3",
        title: "Module 3: Securing Systems — TCP/IP & Network Defense",
        sequence_order: 3,
        description: "Analyze the TCP 3-way handshake, SYN flood DOS attacks, Wireshark packet capture, and firewalls.",
        lessons: [
          {
            id: "cs50-sec-3-1",
            title: "3.1 The TCP Three-Way Handshake",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Trace SYN, SYN-ACK, and ACK packet sequences establishing reliable connections.",
            content: `### The Handshake Mechanics
1. **Client $\\to$ Server:** \`SYN\` (Synchronize sequence number $x$).
2. **Server $\\to$ Client:** \`SYN-ACK\` (Acknowledge $x+1$, synchronize sequence number $y$).
3. **Client $\\to$ Server:** \`ACK\` (Acknowledge $y+1$). Connection is now ESTABLISHED.`,
            challenge_data: {
              initialCode: `steps = ["SYN", "SYN-ACK", "ACK"]\nprint("HANDSHAKE:", " -> ".join(steps))\n`,
              expectedOutput: "HANDSHAKE: SYN -> SYN-ACK -> ACK",
              instructions: "Output the TCP handshake sequence: 'HANDSHAKE: SYN -> SYN-ACK -> ACK'."
            }
          }
        ]
      },
      {
        id: "cs50-sec-mod-4",
        title: "Module 4: Securing Software — Injection & Web Vulnerabilities",
        sequence_order: 4,
        description: "Mitigate OWASP Top 10 exploits including SQL Injection (SQLi) and Cross-Site Scripting (XSS).",
        lessons: [
          {
            id: "cs50-sec-4-1",
            title: "4.1 SQL Injection Prevention with Parameterized Queries",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Eliminate string concatenation in SQL queries using prepared statement placeholders.",
            content: `### Vulnerable Concatenation vs Prepared Statements
* **Vulnerable:** \`"SELECT * FROM users WHERE name = '" + input + "'"\`
  Input \`' OR '1'='1\` bypasses authentication entirely.
* **Secure (Parameterized):** \`"SELECT * FROM users WHERE name = ?"\`
  The database engine treats the input strictly as literal string data, never as executable code.`,
            challenge_data: {
              initialCode: `def sanitize_input(val):\n    # Replace single quote with escaped quote to illustrate literal handling\n    return val.replace("'", "''")\n\nprint("SANITIZED:", sanitize_input("admin' OR '1'='1"))\n`,
              expectedOutput: "SANITIZED: admin'' OR ''1''=''1",
              instructions: "Sanitize SQL quotes and print 'SANITIZED: admin'' OR ''1''=''1'."
            }
          }
        ]
      },
      {
        id: "cs50-sec-mod-5",
        title: "Module 5: Preserving Privacy — Tor & Defense-in-Depth",
        sequence_order: 5,
        description: "Explore metadata tracking, multi-hop onion routing, and zero-trust perimeter defenses.",
        lessons: [
          {
            id: "cs50-sec-5-1",
            title: "5.1 Onion Routing & Layered Decryption",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 85,
            description: "Understand guard, middle, and exit relays in the Tor network.",
            content: `In onion routing, network packets are wrapped in multiple layers of encryption like an onion. Each relay strips off only its layer to discover the next hop, ensuring no single node knows both the origin IP and destination URL.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 2: ETHICAL HACKING & PENETRATION TESTING 2026
  // =========================================================================
  {
    id: "ethical-hacking-pentesting",
    slug: "ethical-hacking-pentesting",
    title: "Ethical Hacking & Penetration Testing 2026",
    description: "Master offensive security: reconnaissance, network port exploitation with Nmap, web app vulnerabilities (OWASP Top 10), Metasploit payloads, and defensive hardening.",
    category: "Cybersecurity",
    level: "Advanced",
    weeks: "14 Weeks",
    duration_hours: 70,
    lessons: 36,
    projects: 4,
    certificate: "Certified Ethical Security Specialist (CESS)",
    is_premium: true,
    tools: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "Wireshark", "John the Ripper", "Hydra"],
    highlights: [
      "Reconnaissance & Passive OSINT: Shodan, WHOIS, DNS Zone Transfers & Subdomain Enumeration",
      "Network Penetration: SYN Stealth Scans, Service Fingerprinting & CVE Exploitation",
      "Web Application Hacking: Burp Suite Proxy, CSRF, IDOR, SSRF & Cross-Site Scripting",
      "System Exploitation & Post-Exploitation: Metasploit Meterpreter & Privilege Escalation",
      "Professional Penetration Test Reporting & CVSS v3.1 Severity Scoring"
    ],
    modules: [
      {
        id: "pentest-mod-1",
        title: "Module 1: Passive OSINT & Active Network Reconnaissance",
        sequence_order: 1,
        description: "Map target infrastructure footprints using DNS enumeration, Shodan, and Nmap timing scans.",
        lessons: [
          {
            id: "pentest-1-1",
            title: "1.1 Nmap TCP SYN Stealth Scanning (-sS)",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Perform half-open TCP SYN scans that tear down connections with RST before completion.",
            content: `### Stealth Scanning Mechanics
A SYN stealth scan sends a \`SYN\` packet. If the target responds with \`SYN-ACK\`, the port is OPEN. The scanner immediately replies with \`RST\` (Reset), preventing the connection from logging in application-level logs.`,
            challenge_data: {
              initialCode: `def parse_nmap_response(flag):\n    if flag == "SYN-ACK": return "OPEN"\n    elif flag == "RST": return "CLOSED"\n    return "FILTERED"\n\nprint("PORT_STATUS:", parse_nmap_response("SYN-ACK"))\n`,
              expectedOutput: "PORT_STATUS: OPEN",
              instructions: "Parse the port response flag and output 'PORT_STATUS: OPEN'."
            }
          }
        ]
      },
      {
        id: "pentest-mod-2",
        title: "Module 2: Web App Exploitation (OWASP Top 10)",
        sequence_order: 2,
        description: "Identify and exploit Server-Side Request Forgery (SSRF) and Insecure Direct Object References (IDOR).",
        lessons: [
          {
            id: "pentest-2-1",
            title: "2.1 Insecure Direct Object References (IDOR)",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Enforce server-side authorization checks on resource IDs: current_user.id == resource.owner_id.",
            content: `### Preventing IDOR
Never trust client-supplied entity IDs in URLs (\`/api/documents/1049\`). Validate that the authenticated session owns the requested resource before returning sensitive data.`,
            challenge_data: {
              initialCode: `def check_access(user_id, doc_owner_id):\n    return "ALLOW" if user_id == doc_owner_id else "DENY_403"\n\nprint("ACCESS:", check_access(42, 99))\n`,
              expectedOutput: "ACCESS: DENY_403",
              instructions: "Validate IDOR prevention and output 'ACCESS: DENY_403'."
            }
          }
        ]
      },
      {
        id: "pentest-mod-3",
        title: "Module 3: Post-Exploitation & Privilege Escalation",
        sequence_order: 3,
        description: "Escalate from unprivileged service accounts to root/SYSTEM via SUID binaries and misconfigured cron jobs.",
        lessons: [
          {
            id: "pentest-3-1",
            title: "3.1 Linux SUID Binary Permission Auditing",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Detect SUID bits (4000) that execute with the permissions of the file owner (root).",
            content: `### SUID Privilege Escalation
Binaries with octal permission \`4755\` run as root. If an administrator leaves custom script binaries with SUID enabled, attackers can spawn interactive root shells.`,
            challenge_data: {
              initialCode: `perms = 0o4755\nis_suid = (perms & 0o4000) != 0\nprint("IS_SUID:", is_suid)\n`,
              expectedOutput: "IS_SUID: True",
              instructions: "Verify SUID permission bit masking and print 'IS_SUID: True'."
            }
          }
        ]
      },
      {
        id: "pentest-mod-4",
        title: "Module 4: Remediation & CVSS v3.1 Severity Scoring",
        sequence_order: 4,
        description: "Calculate Common Vulnerability Scoring System (CVSS) Base Metrics for executive security audits.",
        lessons: [
          {
            id: "pentest-4-1",
            title: "4.1 Calculating Qualitative CVSS Severity Ratings",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 95,
            description: "Map numerical base scores into Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), and Critical (9.0-10.0).",
            content: `### CVSS v3.1 Severity Bands
- **Critical:** 9.0 - 10.0 (e.g. Remote Code Execution without auth)
- **High:** 7.0 - 8.9
- **Medium:** 4.0 - 6.9
- **Low:** 0.1 - 3.9`,
            challenge_data: {
              initialCode: `def cvss_severity(score):\n    if score >= 9.0: return "CRITICAL"\n    elif score >= 7.0: return "HIGH"\n    elif score >= 4.0: return "MEDIUM"\n    return "LOW"\n\nprint("SEVERITY:", cvss_severity(9.8))\n`,
              expectedOutput: "SEVERITY: CRITICAL",
              instructions: "Categorize CVSS score 9.8 and print 'SEVERITY: CRITICAL'."
            }
          }
        ]
      }
    ]
  }
]

