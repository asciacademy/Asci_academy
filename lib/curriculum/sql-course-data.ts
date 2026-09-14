import { CoursePart } from "./c-course-data"

export const SQL_COURSE_PARTS: CoursePart[] = [
  {
    id: "sql-part-1",
    title: "Part 1: SQL Foundations & Basic Queries",
    badge: "Beginner",
    description: "Understand relational databases and write structured queries: SELECT, WHERE, ORDER BY, and CRUD mutations.",
    chapters: [
      {
        id: "sql-ch-1",
        title: "Relational Queries & CRUD",
        level: "Beginner",
        lessons: [
          {
            id: "sql-1-1",
            title: "SQL Introduction & Querying with SELECT and WHERE",
            slug: "sql-select-where",
            level: "Beginner",
            language: "sql",
            tldr: "SQL (Structured Query Language) is the universal standard language for storing, retrieving, and manipulating relational databases.",
            description: "Relational Database Management Systems (PostgreSQL, MySQL, SQLite) store data in structured tables containing rows (records) and columns (attributes). The SELECT statement specifies which columns to retrieve, FROM indicates the source table, and WHERE filters records matching strict criteria.",
            code: `-- Query high-performing students enrolled in Computer Science
SELECT 
    student_id,
    first_name,
    last_name,
    gpa,
    enrollment_year
FROM students
WHERE major = 'Computer Science' 
  AND gpa >= 3.8
ORDER BY gpa DESC
LIMIT 5;`,
            output: `student_id | first_name | last_name | gpa  | enrollment_year
-----------+------------+-----------+------+----------------
1042       | Alan       | Turing    | 4.00 | 2024
1019       | Ada        | Lovelace  | 3.98 | 2024
1088       | Grace      | Hopper    | 3.95 | 2025
(3 rows returned)`,
            visualDiagramTitle: "SQL Query Execution Filtering Pipeline",
            visualDiagram: `[Table: students (10,000 rows)] 
       │
       ▼ (FROM & WHERE Clause Filters)
[Filtered Subset: major = 'Computer Science' AND gpa >= 3.8]
       │
       ▼ (ORDER BY gpa DESC)
[Sorted Records descending by highest GPA]
       │
       ▼ (SELECT columns & LIMIT 5)
[Final Projected Result Table (Top 5 rows)]`,
            lineExplanations: [
              { line: "SELECT student_id, first_name ...", explanation: "Projects only the required column fields rather than expensive SELECT *." },
              { line: "WHERE major = 'CS' AND gpa >= 3.8", explanation: "Applies boolean predicate logic to filter rows." },
              { line: "ORDER BY gpa DESC LIMIT 5;", explanation: "Sorts highest first and caps payload to the top 5 records." }
            ],
            keyPoints: [
              "SQL keywords are case-insensitive, but capitalizing them (SELECT, FROM) is standard best practice.",
              "Always avoid SELECT * in production to reduce network transmission and memory pressure.",
              "Strings in SQL are enclosed in single quotes ('Computer Science')."
            ],
            quiz: {
              question: "Which SQL clause is used to filter records that satisfy a specific condition?",
              options: ["GROUP BY", "WHERE", "ORDER BY", "FILTER BY"],
              correctIndex: 1,
              explanation: "The WHERE clause filters rows based on logical conditions before aggregating or sorting."
            }
          },
          {
            id: "sql-1-2",
            title: "Database Mutations: INSERT, UPDATE & DELETE",
            slug: "sql-crud-mutations",
            level: "Beginner",
            language: "sql",
            tldr: "Use INSERT INTO to create records, UPDATE to modify existing rows, and DELETE to remove data.",
            description: "Modifying database tables requires precision. INSERT INTO appends new rows. UPDATE alters existing column values—always accompanied by a WHERE clause to avoid accidentally modifying every row in the entire table! DELETE removes rows matching criteria.",
            code: `-- 1. Insert a new learner record
INSERT INTO students (first_name, last_name, email, major, gpa)
VALUES ('Claude', 'Shannon', 'claude@mit.edu', 'Information Theory', 3.92);

-- 2. Update student GPA with mandatory WHERE filter guard
UPDATE students
SET gpa = 3.95,
    updated_at = CURRENT_TIMESTAMP
WHERE email = 'claude@mit.edu';

-- 3. Verify the updated record
SELECT first_name, gpa, updated_at 
FROM students 
WHERE email = 'claude@mit.edu';`,
            output: `INSERT 0 1
UPDATE 1
first_name | gpa  | updated_at
-----------+------+----------------------------
Claude     | 3.95 | 2026-09-12 04:30:00.1245+00`,
            visualDiagramTitle: "Database Record Mutation Lifecycle",
            visualDiagram: `[INSERT Statement] -> [Row buffer created] -> [Primary Key Assigned] -> [Table Append & Indexes Updated]
[UPDATE with WHERE] -> [Index Lookup] -> [Row Locked] -> [Column Updated] -> [WAL Log Flushed]`,
            lineExplanations: [
              { line: "INSERT INTO students (columns) VALUES (values);", explanation: "Inserts a new record matching column names to corresponding values." },
              { line: "UPDATE students SET gpa = 3.95 WHERE ...;", explanation: "Safely alters specific row; omission of WHERE alters ALL rows!" }
            ],
            keyPoints: [
              "Never run an UPDATE or DELETE without a WHERE clause unless you explicitly intend to modify the entire table.",
              "Auto-incrementing PRIMARY KEYs ensure each row is uniquely addressable.",
              "Mutations update corresponding table indexes automatically."
            ],
            quiz: {
              question: "What happens if you execute an UPDATE table SET active = true; statement without a WHERE clause?",
              options: ["An error is thrown automatically", "Only the first row updates", "Every single row in the entire table is updated to true", "Nothing happens"],
              correctIndex: 2,
              explanation: "Without a WHERE clause filter, UPDATE applies the change universally across all rows in the table."
            }
          }
        ]
      }
    ]
  },
  {
    id: "sql-part-2",
    title: "Part 2: Multi-Table JOINs, Aggregations & Grouping",
    badge: "Intermediate",
    description: "Combine multiple relational tables with INNER/LEFT JOINs and compute summary statistics with GROUP BY and HAVING.",
    chapters: [
      {
        id: "sql-ch-2",
        title: "Relational Joins & Aggregations",
        level: "Intermediate",
        lessons: [
          {
            id: "sql-2-1",
            title: "Multi-Table Relational JOINs (INNER, LEFT)",
            slug: "sql-joins",
            level: "Intermediate",
            language: "sql",
            tldr: "JOIN clauses combine rows from two or more tables based on a related column between them (Foreign Keys).",
            description: "Relational databases normalize data across separate tables to prevent duplication. An INNER JOIN returns only records where there is a match in both tables. A LEFT JOIN returns all rows from the left table, plus matched rows from the right table (filling with NULL if no match exists).",
            code: `-- Link users table with orders table using foreign key
SELECT 
    u.user_id,
    u.email,
    o.order_id,
    o.total_amount,
    o.order_status
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
WHERE o.order_status = 'COMPLETED'
ORDER BY o.total_amount DESC;`,
            output: `user_id | email           | order_id | total_amount | order_status
--------+-----------------+----------+--------------+--------------
42      | alex@corp.io    | 9901     | 1420.50      | COMPLETED
18      | sarah@cloud.com | 9904     | 890.00       | COMPLETED
(2 rows returned)`,
            visualDiagramTitle: "Relational Venn Diagram of JOIN Operations",
            visualDiagram: `[Table A: Users] ∩ [Table B: Orders]
      ├── INNER JOIN: Intersection only (Users with active orders)
      ├── LEFT JOIN: All Users + matching Orders (NULL for users without orders)
      └── FULL JOIN: Union of all records from both tables`,
            lineExplanations: [
              { line: "FROM users u", explanation: "Aliases users table as 'u' for cleaner dot-notation qualification." },
              { line: "INNER JOIN orders o ON u.user_id = o.user_id", explanation: "Matches rows where primary key user_id equals foreign key user_id." }
            ],
            keyPoints: [
              "Foreign Keys maintain referential integrity between parent and child tables.",
              "Ensure foreign key columns are indexed to avoid slow nested-loop table scans during JOINs.",
              "Use LEFT JOIN when you want to include entities that may have zero associated records."
            ],
            quiz: {
              question: "Which JOIN type returns all records from the left table, even if there are no matches in the right table?",
              options: ["INNER JOIN", "CROSS JOIN", "LEFT JOIN", "NATURAL JOIN"],
              correctIndex: 2,
              explanation: "LEFT JOIN preserves all rows from the left table, populating right-table columns with NULL if no match exists."
            }
          },
          {
            id: "sql-2-2",
            title: "Aggregations, GROUP BY & HAVING",
            slug: "sql-aggregations-group-by",
            level: "Intermediate",
            language: "sql",
            tldr: "Aggregate functions (COUNT, SUM, AVG) collapse rows into groups, and HAVING filters aggregated groups.",
            description: "Aggregate functions compute a single summary value from multiple rows. GROUP BY clusters rows sharing the same value. To filter aggregated results (e.g. only departments with more than 5 employees), use HAVING rather than WHERE, because WHERE filters individual rows before aggregation occurs.",
            code: `-- Calculate revenue metrics grouped by product category
SELECT 
    category,
    COUNT(product_id) AS total_products,
    ROUND(AVG(price), 2) AS average_price,
    SUM(units_sold * price) AS total_revenue
FROM products
WHERE is_active = TRUE
GROUP BY category
HAVING SUM(units_sold * price) > 50000
ORDER BY total_revenue DESC;`,
            output: `category    | total_products | average_price | total_revenue
------------+----------------+---------------+--------------
Electronics | 48             | 249.99        | 184500.00
Cloud Tools | 12             | 89.50         | 78900.00
(2 rows returned)`,
            visualDiagramTitle: "Aggregation & Grouping Pipeline Sequence",
            visualDiagram: `[All Rows] ──WHERE is_active = true──> [Filtered Rows] ──GROUP BY category──> [Bucketed Groups] ──HAVING revenue > 50k──> [Final Summary Table]`,
            lineExplanations: [
              { line: "GROUP BY category", explanation: "Aggregates matching rows into distinct category groups." },
              { line: "HAVING SUM(...) > 50000", explanation: "Filters groups after aggregation calculation (WHERE cannot evaluate SUM)." }
            ],
            keyPoints: [
              "WHERE filters individual rows before grouping; HAVING filters groups after aggregation.",
              "Common aggregates: COUNT(*), SUM(col), AVG(col), MIN(col), MAX(col).",
              "Any non-aggregate column in SELECT must appear in the GROUP BY clause."
            ],
            quiz: {
              question: "Why can't you use WHERE to filter by the result of an aggregate function like WHERE SUM(sales) > 1000?",
              options: ["SQL syntax forbids numbers in WHERE", "WHERE executes before rows are grouped and aggregated; use HAVING instead", "SUM only works in frontend code", "WHERE requires JOINs"],
              correctIndex: 1,
              explanation: "WHERE filters raw rows prior to aggregation; HAVING is specifically designed to filter calculated aggregate groups."
            }
          }
        ]
      }
    ]
  },
  {
    id: "sql-part-3",
    title: "Part 3: Advanced Database Architecture, Indexing & ACID",
    badge: "Advanced",
    description: "Master B-Tree index optimization, EXPLAIN execution plans, transaction ACID isolation, and database normalization.",
    chapters: [
      {
        id: "sql-ch-3",
        title: "Indexing & Database Internals",
        level: "Advanced",
        lessons: [
          {
            id: "sql-3-1",
            title: "Database Indexing & EXPLAIN Execution Plans",
            slug: "sql-indexing-explain",
            level: "Advanced",
            language: "sql",
            tldr: "Indexes act like book index lookups, turning slow O(n) sequential table scans into fast O(log n) B-Tree searches.",
            description: "Without an index, querying WHERE email = 'user@corp.com' on a 10-million-row table forces the database engine to read every single data block from disk (Sequential Scan). A B-Tree index maintains a balanced search tree allowing the database to locate matching rows in milliseconds.",
            code: `-- Create a high-performance B-Tree index on email
CREATE INDEX idx_users_email ON users(email);

-- Composite index for multi-column queries (tenant_id + status)
CREATE INDEX idx_orders_tenant_status ON orders(tenant_id, order_status);

-- Inspect query plan without executing
EXPLAIN ANALYZE 
SELECT * FROM users 
WHERE email = 'dev@asci.org';`,
            output: `Index Scan using idx_users_email on users  (cost=0.42..8.44 rows=1 width=128) (actual time=0.042..0.044 rows=1 loops=1)
  Index Cond: ((email)::text = 'dev@asci.org'::text)
Planning Time: 0.112 ms
Execution Time: 0.068 ms`,
            visualDiagramTitle: "Sequential Table Scan vs B-Tree Index Lookup",
            visualDiagram: `Without Index: [Disk Block 1] ──> [Disk Block 2] ──> ... ──> [Disk Block 10,000] (O(N) - 8,500ms)
With B-Tree:    [Root Node] ──> [Branch Node] ──> [Leaf Pointer: Page 42, Offset 8] (O(log N) - 0.04ms!)`,
            lineExplanations: [
              { line: "CREATE INDEX idx_users_email", explanation: "Builds a balanced tree on the email column for instant searches." },
              { line: "EXPLAIN ANALYZE", explanation: "Instructs database planner to run query and report actual millisecond execution costs." }
            ],
            keyPoints: [
              "Indexes speed up reads (SELECT) but slightly slow down writes (INSERT/UPDATE/DELETE) due to tree maintenance.",
              "Order matters in composite indexes: (tenant_id, status) speeds up queries on tenant_id alone, but not status alone (Leftmost Prefix Rule).",
              "Index Cardinality refers to the uniqueness of data values; high cardinality columns make ideal indexes."
            ],
            quiz: {
              question: "What is the primary trade-off of adding multiple indexes to a database table?",
              options: ["Database crashes on startup", "Faster reads (SELECT), but slower writes (INSERT/UPDATE) and increased disk storage", "Lower network speed", "All queries become sequential scans"],
              correctIndex: 1,
              explanation: "Every index requires disk storage and must be updated whenever rows are inserted, updated, or deleted."
            }
          },
          {
            id: "sql-3-2",
            title: "Transactions & ACID Isolation Levels",
            slug: "sql-acid-transactions",
            level: "Advanced",
            language: "sql",
            tldr: "Transactions bundle multiple operations into an all-or-nothing atomic unit satisfying ACID guarantees.",
            description: "Financial and critical enterprise systems cannot afford half-completed updates. Transactions guarantee ACID: Atomicity (all succeed or all rollback), Consistency (valid state transitions), Isolation (concurrent transactions do not corrupt each other), and Durability (committed writes survive server power failure).",
            code: `-- Bank transfer transaction between two accounts
BEGIN TRANSACTION;

-- Deduct funds from source account
UPDATE bank_accounts
SET balance = balance - 500.00
WHERE account_id = 'ACC_1001' AND balance >= 500.00;

-- Deposit funds into destination account
UPDATE bank_accounts
SET balance = balance + 500.00
WHERE account_id = 'ACC_2002';

-- If any step fails, ROLLBACK cancels everything!
-- If all succeeds, COMMIT permanently persists:
COMMIT;`,
            output: `BEGIN
UPDATE 1
UPDATE 1
COMMIT`,
            visualDiagramTitle: "ACID Transaction State Machine",
            visualDiagram: `[BEGIN] ──Step 1 (Deduct)──> [Step 2 (Deposit)] 
       ├── If error / crash: [ROLLBACK] ──> (Zero changes persisted)
       └── If all success:   [COMMIT]   ──> (Flushed to Write-Ahead Log on disk)`,
            lineExplanations: [
              { line: "BEGIN TRANSACTION;", explanation: "Opens an isolated transaction context." },
              { line: "COMMIT;", explanation: "Persists all mutations atomically and releases database row locks." },
              { line: "ROLLBACK;", explanation: "Aborts the transaction and reverts all changes back to previous clean state." }
            ],
            keyPoints: [
              "Write-Ahead Logging (WAL) ensures committed transactions survive power outages (Durability).",
              "Four Isolation Levels: Read Uncommitted, Read Committed (default in PG), Repeatable Read, and Serializable.",
              "Row-level locking prevents two concurrent transactions from overwriting the same record."
            ],
            quiz: {
              question: "Which ACID property guarantees that if a system crashes halfway through a transfer, all changes are undone?",
              options: ["Atomicity", "Consistency", "Isolation", "Durability"],
              correctIndex: 0,
              explanation: "Atomicity ensures operations within a transaction are all-or-nothing—either all succeed or the entire batch is rolled back."
            }
          }
        ]
      }
    ]
  }
]
