export type CourseLevel = "Beginner" | "Intermediate" | "Advanced"

export interface LineExplanation {
  line: string
  explanation: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface CourseLesson {
  id: string
  title: string
  slug: string
  level: CourseLevel
  tldr: string
  description: string
  code: string
  output?: string
  livePreviewHtml?: string
  lineExplanations?: LineExplanation[]
  quiz: QuizQuestion
  language: "c" | "cpp" | "html" | "css" | "javascript" | "python" | "typescript" | "sql" | "bash" | "git" | string
  keyPoints?: string[]
  visualDiagram?: string
  visualDiagramTitle?: string
}

export interface CourseChapter {
  id: string
  title: string
  level: CourseLevel
  lessons: CourseLesson[]
}

export interface CoursePart {
  id: string
  title: string
  badge: string
  description: string
  chapters: CourseChapter[]
}

export const C_COURSE_PARTS: CoursePart[] = [
  {
    id: "c-part-1",
    title: "Part 1: C Basics & Getting Started",
    badge: "Beginner",
    description: "Learn how C works, write your first program, and understand variables, data types, and operators.",
    chapters: [
      {
        id: "c-ch-1",
        title: "Introduction to C",
        level: "Beginner",
        lessons: [
          {
            id: "c-1-1",
            title: "C Introduction & First Program",
            slug: "c-intro",
            level: "Beginner",
            language: "c",
            tldr: "C is a fast and powerful programming language created in 1972 that powers operating systems and hardware.",
            description: "C is one of the most popular programming languages in the world. It was developed by Dennis Ritchie at Bell Labs. Because C is very close to computer hardware, programs written in C run extremely fast. Almost every modern language—including C++, Java, Python, and JavaScript—borrowed ideas from C.",
            code: `#include <stdio.h>

int main() {
    printf("Hello, World! Welcome to C.\n");
    return 0;
}`,
            output: "Hello, World! Welcome to C.",
            visualDiagramTitle: "C Compilation & Execution Pipeline",
            visualDiagram: `1. Source Code (.c file) -> Human readable C code with functions & headers
2. Preprocessor (cpp) -> Expands #include headers and #define macros into pure C
3. Compiler (gcc) -> Translates C syntax into machine assembly instructions
4. Assembler -> Converts assembly into binary machine code object (.o file)
5. Linker (ld) -> Combines object files and C standard library into final executable`,
            lineExplanations: [
              { line: "#include <stdio.h>", explanation: "Tells the computer to include the Standard Input Output library so we can use printf()." },
              { line: "int main() {", explanation: "The main function. Every C program begins executing right here." },
              { line: 'printf("Hello, World!\\n");', explanation: "Prints text to the screen. \\n moves the cursor to a new line." },
              { line: "return 0;", explanation: "Ends the main function and tells the operating system that our program finished successfully." },
              { line: "}", explanation: "Closes the main function." }
            ],
            keyPoints: [
              "C is case-sensitive: main is different from Main.",
              "Every statement in C must end with a semicolon (;).",
              "Execution always starts at the main() function."
            ],
            quiz: {
              question: "Which function is the mandatory entry point for every C program?",
              options: ["start()", "main()", "run()", "printf()"],
              correctIndex: 1,
              explanation: "Every C program must have a main() function—that is where the computer begins running your code."
            }
          },
          {
            id: "c-1-2",
            title: "C Syntax & Statements",
            slug: "c-syntax",
            level: "Beginner",
            language: "c",
            tldr: "A C program is made of statements that execute one after another, ending with semicolons.",
            description: "A statement is an instruction that tells the computer to do something. In C, statements are written inside functions. Forgetting a semicolon at the end of a line is the most common beginner error!",
            code: `#include <stdio.h>

int main() {
    printf("I am learning C.\n");
    printf("It is awesome!\n");
    return 0;
}`,
            output: "I am learning C.\nIt is awesome!",
            lineExplanations: [
              { line: 'printf("I am learning C.\\n");', explanation: "First statement: prints the first sentence and creates a new line." },
              { line: 'printf("It is awesome!\\n");', explanation: "Second statement: prints the second sentence." }
            ],
            keyPoints: [
              "Whitespace like spaces and empty lines are ignored by the compiler, but help humans read code.",
              "Curly brackets { } group statements into a code block."
            ],
            quiz: {
              question: "What character must end every regular statement in C?",
              options: [". (period)", ": (colon)", "; (semicolon)", ", (comma)"],
              correctIndex: 2,
              explanation: "In C, every statement must end with a semicolon (;)."
            }
          },
          {
            id: "c-1-3",
            title: "C Comments",
            slug: "c-comments",
            level: "Beginner",
            language: "c",
            tldr: "Comments are notes in your code that the computer ignores when running your program.",
            description: "Comments explain what your code does and make it easier for others (and future you) to understand. C supports single-line comments starting with // and multi-line comments wrapped in /* and */.",
            code: `#include <stdio.h>

int main() {
    // This is a single-line comment
    printf("Comments do not show on screen.\n");

    /* This is a multi-line comment
       that spans across multiple lines */
    printf("Only this text will be printed.\n");
    return 0;
}`,
            output: "Comments do not show on screen.\nOnly this text will be printed.",
            lineExplanations: [
              { line: "// This is a single-line comment", explanation: "The compiler completely skips this line." },
              { line: "/* ... */", explanation: "Everything between /* and */ is ignored, even across multiple lines." }
            ],
            keyPoints: [
              "Use // for quick one-line notes.",
              "Use /* */ to comment out large chunks of code when debugging."
            ],
            quiz: {
              question: "How do you write a single-line comment in C?",
              options: ["# comment", "<!-- comment -->", "// comment", "-- comment"],
              correctIndex: 2,
              explanation: "Two forward slashes (//) start a single-line comment in C."
            }
          }
        ]
      },
      {
        id: "c-ch-2",
        title: "Variables, Data Types & Operators",
        level: "Beginner",
        lessons: [
          {
            id: "c-1-4",
            title: "C Variables & Format Specifiers",
            slug: "c-variables",
            level: "Beginner",
            language: "c",
            tldr: "Variables store data values in memory. Format specifiers (%d, %c) tell printf how to display them.",
            description: "To store information in C, you must specify what type of data the variable will hold. When displaying variables with printf(), we use format specifiers: %d for integers, %f for decimal numbers, and %c for single characters.",
            code: `#include <stdio.h>

int main() {
    int age = 20;
    float score = 95.5;
    char grade = 'A';

    printf("Age: %d\n", age);
    printf("Score: %.1f\n", score);
    printf("Grade: %c\n", grade);
    return 0;
}`,
            output: "Age: 20\nScore: 95.5\nGrade: A",
            lineExplanations: [
              { line: "int age = 20;", explanation: "Creates an integer variable named age and assigns it the number 20." },
              { line: "float score = 95.5;", explanation: "Creates a decimal number variable named score." },
              { line: "char grade = 'A';", explanation: "Creates a character variable holding the single letter A." },
              { line: 'printf("Age: %d\\n", age);', explanation: "%d is replaced by the value of age." }
            ],
            keyPoints: [
              "int: whole numbers (e.g. 10, -5).",
              "float: floating point numbers with decimals (e.g. 3.14).",
              "char: single characters enclosed in single quotes (e.g. 'X').",
              "Format specifiers: %d for int, %f for float, %c for char, %s for string."
            ],
            quiz: {
              question: "Which format specifier is used to print an integer in C?",
              options: ["%s", "%f", "%d", "%c"],
              correctIndex: 2,
              explanation: "%d (or %i) represents decimal integers in printf()."
            }
          },
          {
            id: "c-1-5",
            title: "C Constants",
            slug: "c-constants",
            level: "Beginner",
            language: "c",
            tldr: "Use the const keyword when you have a variable whose value should never change.",
            description: "If you don't want others (or yourself) to accidentally change a variable's value, use the const keyword. This makes the variable read-only.",
            code: `#include <stdio.h>

int main() {
    const int BIRTH_YEAR = 2004;
    const float PI = 3.14159;

    printf("Birth Year: %d\n", BIRTH_YEAR);
    printf("PI Value: %.5f\n", PI);
    return 0;
}`,
            output: "Birth Year: 2004\nPI Value: 3.14159",
            lineExplanations: [
              { line: "const int BIRTH_YEAR = 2004;", explanation: "Tells the compiler that BIRTH_YEAR cannot be reassigned later." }
            ],
            keyPoints: [
              "You must assign a value when declaring a const variable.",
              "Good convention: write constant variable names in UPPERCASE."
            ],
            quiz: {
              question: "What happens if you try to change the value of a const variable in C?",
              options: ["It changes normally", "The computer crashes", "A compile error occurs", "It turns into zero"],
              correctIndex: 2,
              explanation: "Const variables are strictly read-only; attempting to change them causes a compiler error."
            }
          },
          {
            id: "c-1-6",
            title: "C Operators & Arithmetic",
            slug: "c-operators",
            level: "Beginner",
            language: "c",
            tldr: "Operators perform operations on variables and values (+, -, *, /, %).",
            description: "C includes standard arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), and modulus (%) which gives the remainder of a division.",
            code: `#include <stdio.h>

int main() {
    int x = 10;
    int y = 3;

    printf("Sum: %d\n", x + y);
    printf("Difference: %d\n", x - y);
    printf("Product: %d\n", x * y);
    printf("Quotient: %d\n", x / y);
    printf("Remainder: %d\n", x % y);
    return 0;
}`,
            output: "Sum: 13\nDifference: 7\nProduct: 30\nQuotient: 3\nRemainder: 1",
            lineExplanations: [
              { line: "x / y", explanation: "10 / 3 gives 3 because dividing two integers discards the decimal fraction." },
              { line: "x % y", explanation: "10 % 3 gives 1 because 3 goes into 10 three times with 1 remaining." }
            ],
            keyPoints: [
              "Integer division rounds down (truncates decimals).",
              "Modulus (%) only works with integers.",
              "Increment (++) adds 1, decrement (--) subtracts 1."
            ],
            quiz: {
              question: "What is the result of 14 % 4 in C?",
              options: ["3", "2", "3.5", "0"],
              correctIndex: 1,
              explanation: "4 goes into 14 three times (12), leaving a remainder of 2."
            }
          }
        ]
      }
    ]
  },
  {
    id: "c-part-2",
    title: "Part 2: Control Flow & Decision Making",
    badge: "Core Logic",
    description: "Master conditions, if-else logic, switch statements, and loops in C.",
    chapters: [
      {
        id: "c-ch-3",
        title: "Conditions & Branching",
        level: "Beginner",
        lessons: [
          {
            id: "c-2-1",
            title: "C If...Else Statements",
            slug: "c-if-else",
            level: "Beginner",
            language: "c",
            tldr: "Use if to execute code when a condition is true, and else when it is false.",
            description: "Decision making allows your program to take different paths based on input or calculations. In C, any non-zero value is treated as true, and zero is treated as false.",
            code: `#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("Grade: Excellent!\n");
    } else if (score >= 75) {
        printf("Grade: Good job!\n");
    } else {
        printf("Keep practicing!\n");
    }
    return 0;
}`,
            output: "Grade: Good job!",
            lineExplanations: [
              { line: "if (score >= 90)", explanation: "Tests if score is greater than or equal to 90. 85 is not, so moves to else if." },
              { line: "else if (score >= 75)", explanation: "Tests if score is >= 75. 85 is, so runs this block." }
            ],
            keyPoints: [
              "Comparison operators: == (equal), != (not equal), <, >, <=, >=.",
              "Logical operators: && (AND), || (OR), ! (NOT)."
            ],
            quiz: {
              question: "Which operator checks if two values are equal in C?",
              options: ["=", "==", "===", "equals"],
              correctIndex: 1,
              explanation: "Single = is for assignment; double == checks for equality."
            }
          },
          {
            id: "c-2-2",
            title: "C Switch Statement",
            slug: "c-switch",
            level: "Beginner",
            language: "c",
            tldr: "Use switch to select one of many code blocks to be executed.",
            description: "Instead of writing many if...else statements, you can use the switch statement to cleanly compare a variable against multiple fixed values.",
            code: `#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday\n");
            break;
        case 2:
            printf("Tuesday\n");
            break;
        case 3:
            printf("Wednesday\n");
            break;
        default:
            printf("Other day\n");
    }
    return 0;
}`,
            output: "Wednesday",
            lineExplanations: [
              { line: "switch (day) {", explanation: "Evaluates day once and looks for matching case." },
              { line: "break;", explanation: "Stops execution and exits the switch block. Without break, execution falls through to the next case!" },
              { line: "default:", explanation: "Runs if none of the cases match." }
            ],
            keyPoints: [
              "Always include break; after each case unless you intentionally want fall-through.",
              "default: is optional but recommended as a fallback."
            ],
            quiz: {
              question: "What keyword prevents code from falling through to the next case in a switch statement?",
              options: ["stop", "exit", "break", "return"],
              correctIndex: 2,
              explanation: "break terminates the switch block immediately."
            }
          }
        ]
      },
      {
        id: "c-ch-4",
        title: "Loops & Iteration",
        level: "Beginner",
        lessons: [
          {
            id: "c-2-3",
            title: "C While & Do-While Loops",
            slug: "c-while-loop",
            level: "Beginner",
            language: "c",
            tldr: "Loops repeat a block of code as long as a specified condition remains true.",
            description: "A while loop checks the condition first. If true, it runs the code inside, and checks again. A do/while loop always runs at least once before checking the condition.",
            code: `#include <stdio.h>

int main() {
    int i = 1;

    while (i <= 4) {
        printf("Step %d\n", i);
        i++; // Increment so loop eventually ends!
    }
    return 0;
}`,
            output: "Step 1\nStep 2\nStep 3\nStep 4",
            lineExplanations: [
              { line: "while (i <= 4)", explanation: "Runs as long as i is less than or equal to 4." },
              { line: "i++;", explanation: "Increases i by 1 each time. Without this, the loop would run forever (infinite loop)." }
            ],
            keyPoints: [
              "Always make sure your loop condition will eventually become false.",
              "do { ... } while (condition); executes code at least once."
            ],
            quiz: {
              question: "What happens if you forget to increment the loop variable inside a while loop?",
              options: ["The program completes faster", "An infinite loop occurs", "The compiler fixes it automatically", "It runs exactly twice"],
              correctIndex: 1,
              explanation: "If the condition never becomes false, the loop continues running forever."
            }
          },
          {
            id: "c-2-4",
            title: "C For Loop",
            slug: "c-for-loop",
            level: "Beginner",
            language: "c",
            tldr: "When you know exactly how many times you want to loop, use a for loop.",
            description: "A for loop puts initialization, condition check, and increment all together in a single clean line: for (init; condition; update).",
            code: `#include <stdio.h>

int main() {
    for (int i = 0; i < 5; i++) {
        printf("Count: %d\n", i);
    }
    return 0;
}`,
            output: "Count: 0\nCount: 1\nCount: 2\nCount: 3\nCount: 4",
            lineExplanations: [
              { line: "for (int i = 0; i < 5; i++)", explanation: "1. Sets i=0. 2. Checks i<5. 3. Runs block. 4. Executes i++ and repeats." }
            ],
            keyPoints: [
              "for loops are the most commonly used loop structure in C.",
              "Nested for loops are often used to process 2D grids and matrices."
            ],
            quiz: {
              question: "How many times will a loop with for (int i = 0; i < 3; i++) run?",
              options: ["2 times", "3 times", "4 times", "0 times"],
              correctIndex: 1,
              explanation: "It runs for i = 0, i = 1, and i = 2—a total of 3 times."
            }
          }
        ]
      }
    ]
  },
  {
    id: "c-part-3",
    title: "Part 3: Arrays, Strings, Pointers & Functions",
    badge: "Intermediate",
    description: "Understand arrays, strings, user input, functions, and C's most famous feature: memory pointers.",
    chapters: [
      {
        id: "c-ch-5",
        title: "Arrays & Strings",
        level: "Intermediate",
        lessons: [
          {
            id: "c-3-1",
            title: "C Arrays",
            slug: "c-arrays",
            level: "Intermediate",
            language: "c",
            tldr: "Arrays store multiple values of the same data type in contiguous memory.",
            description: "Instead of creating 5 separate variables for 5 numbers, you can store them in an array. In C, array indexing starts at 0.",
            code: `#include <stdio.h>

int main() {
    int scores[4] = {90, 85, 95, 88};

    printf("First score: %d\n", scores[0]);
    printf("Third score: %d\n", scores[2]);

    scores[0] = 92; // Update first element
    printf("Updated first score: %d\n", scores[0]);
    return 0;
}`,
            output: "First score: 90\nThird score: 95\nUpdated first score: 92",
            lineExplanations: [
              { line: "int scores[4] = {90, 85, 95, 88};", explanation: "Declares an array of 4 integers." },
              { line: "scores[0]", explanation: "Accesses the first item at index 0." }
            ],
            keyPoints: [
              "Array indices always begin at index 0 and end at length - 1.",
              "C does not perform bounds checking: accessing index 10 of a size-4 array causes undefined behavior."
            ],
            quiz: {
              question: "What is the index of the first element in a C array?",
              options: ["1", "-1", "0", "first"],
              correctIndex: 2,
              explanation: "C uses zero-based indexing; the first element is always at index 0."
            }
          },
          {
            id: "c-3-2",
            title: "C Strings & The Null Terminator",
            slug: "c-strings",
            level: "Intermediate",
            language: "c",
            tldr: "In C, strings are simply arrays of characters ending with a special null character ('\\0').",
            description: "Unlike high-level languages, C does not have a built-in String type. A string in C is an array of characters ending with a null character (\\0) so the computer knows where the text ends.",
            code: `#include <stdio.h>
#include <string.h>

int main() {
    char greeting[] = "Hello";
    printf("Message: %s\n", greeting);
    printf("Length: %lu\n", strlen(greeting));
    return 0;
}`,
            output: "Message: Hello\nLength: 5",
            lineExplanations: [
              { line: 'char greeting[] = "Hello";', explanation: "C automatically adds the invisible '\\0' at the end, so greeting has 6 bytes in memory." },
              { line: "strlen(greeting)", explanation: "Returns the number of readable characters (5), excluding the null terminator." }
            ],
            keyPoints: [
              "Use %s in printf() to print a string.",
              "Include <string.h> to use functions like strlen(), strcpy(), and strcmp()."
            ],
            quiz: {
              question: "What special character marks the end of a string in C?",
              options: ["\\n", "\\0", ";", "$"],
              correctIndex: 1,
              explanation: "The null character ('\\0') tells C string functions where the string ends."
            }
          }
        ]
      },
      {
        id: "c-ch-6",
        title: "Pointers & Functions",
        level: "Intermediate",
        lessons: [
          {
            id: "c-3-3",
            title: "C Memory Addresses & Pointers",
            slug: "c-pointers",
            level: "Intermediate",
            language: "c",
            tldr: "A pointer is a variable that stores the memory address of another variable.",
            description: "Every variable in your computer lives at a specific location in RAM (its memory address). The & operator gets the address of a variable, and a pointer variable (declared with *) stores that address.",
            code: `#include <stdio.h>

int main() {
    int age = 25;
    int* ptr = &age; // ptr holds memory address of age

    printf("Value of age: %d\n", age);
    printf("Memory address of age: %p\n", ptr);
    printf("Value pointed to by ptr: %d\n", *ptr);
    return 0;
}`,
            output: "Value of age: 25\nMemory address of age: 0x7ffd9b82e3fc\nValue pointed to by ptr: 25",
            visualDiagramTitle: "RAM Memory Address & Pointer Box Model",
            visualDiagram: `1. Variable 'age' in RAM -> Value: 25 stored at RAM address 0x7ffd9b82e3fc
2. Address Operator (&age) -> Extracts physical 64-bit RAM memory address
3. Pointer Variable 'ptr' -> Stores address 0x7ffd9b82e3fc in its 8-byte container
4. Dereference Operator (*ptr) -> Reads or modifies the value at the pointed RAM address`,
            lineExplanations: [
              { line: "int* ptr = &age;", explanation: "&age gives the memory address where age is stored. ptr saves it." },
              { line: "*ptr", explanation: "Dereference operator: reads the value stored at the address inside ptr." }
            ],
            keyPoints: [
              "& (address-of operator): finds where a variable lives in memory.",
              "* (dereference operator): reads or writes the value at the address.",
              "Pointers make C fast because you can pass memory addresses instead of copying large blocks of data."
            ],
            quiz: {
              question: "Which operator is used to get the memory address of a variable in C?",
              options: ["*", "&", "#", "%"],
              correctIndex: 1,
              explanation: "The ampersand (&) operator returns the memory address of a variable."
            }
          },
          {
            id: "c-3-4",
            title: "C Functions",
            slug: "c-functions",
            level: "Intermediate",
            language: "c",
            tldr: "Functions are reusable blocks of code that take inputs, perform tasks, and return results.",
            description: "Functions prevent you from writing repetitive code. You declare a function with a return type, a name, and parameters inside parentheses.",
            code: `#include <stdio.h>

// Function declaration
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(15, 25);
    printf("Result: %d\n", result);
    return 0;
}`,
            output: "Result: 40",
            lineExplanations: [
              { line: "int add(int a, int b)", explanation: "Defines a function that takes two integers and returns an integer." },
              { line: "add(15, 25)", explanation: "Calls the function with arguments 15 and 25." }
            ],
            keyPoints: [
              "void return type means the function does not return any value.",
              "Functions must be declared or defined before they are called in main()."
            ],
            quiz: {
              question: "What return type should you use if a function does NOT return any value?",
              options: ["null", "empty", "void", "zero"],
              correctIndex: 2,
              explanation: "void indicates that a function returns nothing."
            }
          }
        ]
      }
    ]
  },
  {
    id: "c-part-3",
    title: "Part 3: Advanced Systems Programming",
    badge: "Advanced",
    description: "Master dynamic memory (malloc/free), structs, function pointers, bitwise logic, and memory safety.",
    chapters: [
      {
        id: "c-ch-7",
        title: "Dynamic Memory Allocation (Heap)",
        level: "Advanced",
        lessons: [
          {
            id: "c-adv-1",
            title: "Dynamic Memory: malloc() & free()",
            slug: "c-malloc-free",
            level: "Advanced",
            language: "c",
            tldr: "malloc() asks the operating system for dynamic heap memory at runtime, and free() releases it back to prevent leaks.",
            description: "Standard variables live on the Stack and disappear when functions finish. Dynamic memory lives on the Heap and stays alive until you explicitly release it with free(). Forgetting free() causes memory leaks!",
            code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate space for 3 integers on the Heap
    int* numbers = (int*) malloc(3 * sizeof(int));
    if (numbers == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    numbers[0] = 10;
    numbers[1] = 20;
    numbers[2] = 30;

    printf("Dynamic values: %d, %d, %d\n", numbers[0], numbers[1], numbers[2]);

    // Mandatory: Always free dynamically allocated memory!
    free(numbers);
    numbers = NULL; // Prevent dangling pointer
    printf("Memory safely released.\n");
    return 0;
}`,
            output: "Dynamic values: 10, 20, 30\nMemory safely released.",
            visualDiagramTitle: "Heap Memory vs Stack Frame Model",
            visualDiagram: `1. Stack Frame -> Pointer 'numbers' stored on Stack (holds Heap address 0x55a1...)
2. OS Memory Manager -> System call requests 12 contiguous bytes from system Heap
3. Heap Allocation -> Raw bytes formatted for [int 10, int 20, int 30]
4. free(numbers) -> Releases 12 bytes back to OS; numbers set to NULL to prevent dangling reference`,
            lineExplanations: [
              { line: "malloc(3 * sizeof(int))", explanation: "Calculates byte count (3 x 4 = 12 bytes) and requests it from the system heap." },
              { line: "if (numbers == NULL)", explanation: "Defensive check: verifies the operating system had enough RAM." },
              { line: "free(numbers);", explanation: "Deallocates the heap memory so other programs can use it." },
              { line: "numbers = NULL;", explanation: "Safety convention: zeros pointer to prevent accessing already freed memory." }
            ],
            keyPoints: [
              "Always pair every malloc() or calloc() with a free().",
              "Include <stdlib.h> to use memory management functions.",
              "Setting pointers to NULL after free() stops dangerous dangling pointer crashes."
            ],
            quiz: {
              question: "What happens if a program allocates heap memory with malloc() but never calls free()?",
              options: ["Compile error", "Memory Leak", "Automatic garbage collection", "Stack overflow"],
              correctIndex: 1,
              explanation: "Failing to release heap memory causes a Memory Leak, which consumes RAM until the system slows down or crashes."
            }
          },
          {
            id: "c-adv-2",
            title: "C Structures (struct)",
            slug: "c-structures",
            level: "Advanced",
            language: "c",
            tldr: "A struct allows you to group different data types (like an int age and char name) together under one custom type.",
            description: "Real-world data is rarely just numbers. A Student has a name, roll number, and GPA. A struct creates a composite data type holding multiple related variables in a single memory block.",
            code: `#include <stdio.h>
#include <string.h>

struct Student {
    char name[30];
    int rollNumber;
    float gpa;
};

int main() {
    struct Student s1;
    strcpy(s1.name, "Alex Mercer");
    s1.rollNumber = 101;
    s1.gpa = 3.92f;

    printf("Student: %s | Roll: %d | GPA: %.2f\n", s1.name, s1.rollNumber, s1.gpa);
    return 0;
}`,
            output: "Student: Alex Mercer | Roll: 101 | GPA: 3.92",
            lineExplanations: [
              { line: "struct Student { ... };", explanation: "Defines a new custom compound data type called Student." },
              { line: "struct Student s1;", explanation: "Instantiates a variable of type Student with its own memory block." },
              { line: "s1.name, s1.gpa", explanation: "Dot operator (.) accesses member fields inside the struct instance." }
            ],
            keyPoints: [
              "Use the dot (.) operator to access fields of a struct instance.",
              "Use the arrow (->) operator when accessing fields through a pointer to a struct.",
              "Structs are the foundational building block for OOP classes and data structures."
            ],
            quiz: {
              question: "Which operator is used to access fields of a struct through a pointer (e.g. ptr->name)?",
              options: [". (dot)", "-> (arrow)", ":: (double colon)", "# (hash)"],
              correctIndex: 1,
              explanation: "The arrow operator (->) dereferences the pointer and accesses the member field in one step."
            }
          }
        ]
      },
      {
        id: "c-ch-8",
        title: "Function Pointers & Bitwise Operations",
        level: "Advanced",
        lessons: [
          {
            id: "c-adv-3",
            title: "Function Pointers & Callbacks",
            slug: "c-function-pointers",
            level: "Advanced",
            language: "c",
            tldr: "Function pointers store the address of executable machine instructions, allowing functions to be passed as arguments.",
            description: "In C, functions also reside in computer memory. A function pointer points to the code of a function, enabling callbacks, event listeners, and custom sorting logic like qsort().",
            code: `#include <stdio.h>

void greet(const char* name) {
    printf("Hello, %s!\n", name);
}

// Function that accepts a function pointer callback
void executeCallback(void (*callbackPtr)(const char*), const char* arg) {
    callbackPtr(arg); // Calls greet() dynamically
}

int main() {
    // Pass greet function as an argument
    executeCallback(greet, "Developer");
    return 0;
}`,
            output: "Hello, Developer!",
            lineExplanations: [
              { line: "void (*callbackPtr)(const char*)", explanation: "Declares a pointer to any function returning void and accepting a const char*." },
              { line: "callbackPtr(arg);", explanation: "Executes the function target through the pointer." }
            ],
            keyPoints: [
              "Function pointers power plugin architectures, operating system interrupt tables, and event loops.",
              "Syntax follows: return_type (*pointer_name)(parameter_types)."
            ],
            quiz: {
              question: "What does a function pointer store in C?",
              options: ["Return value", "Memory address of executable code", "Total lines of code", "Number of arguments"],
              correctIndex: 1,
              explanation: "A function pointer stores the memory address where the function's machine code instructions begin."
            }
          },
          {
            id: "c-adv-4",
            title: "Bitwise Operations & Bitmasks",
            slug: "c-bitwise",
            level: "Advanced",
            language: "c",
            tldr: "Bitwise operators manipulate the raw individual 0s and 1s of integers with microsecond speed.",
            description: "Operating systems, network drivers, and microcontrollers use bitwise logic to pack multiple on/off configuration flags into a single byte of memory.",
            code: `#include <stdio.h>

int main() {
    unsigned char flags = 0; // 00000000

    // Set bit 2 (flag ON) using bitwise OR (|)
    flags |= (1 << 2); // 00000100 (value: 4)
    printf("Flags after setting bit 2: %d\n", flags);

    // Check if bit 2 is set using bitwise AND (&)
    if (flags & (1 << 2)) {
        printf("Bit 2 is active!\n");
    }

    // Toggle bit 2 using XOR (^)
    flags ^= (1 << 2); // 00000000
    printf("Flags after toggle: %d\n", flags);
    return 0;
}`,
            output: "Flags after setting bit 2: 4\nBit 2 is active!\nFlags after toggle: 0",
            lineExplanations: [
              { line: "flags |= (1 << 2)", explanation: "Bitwise OR with bitshift: sets the 3rd bit (index 2) to 1." },
              { line: "flags & (1 << 2)", explanation: "Bitwise AND: masks all other bits to test if bit 2 is 1." },
              { line: "flags ^= (1 << 2)", explanation: "Bitwise XOR: inverts the bit (1 becomes 0, 0 becomes 1)." }
            ],
            keyPoints: [
              "& (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).",
              "Bitwise operations are executed directly by the CPU ALU in a single cycle."
            ],
            quiz: {
              question: "Which bitwise operator is used to test whether a specific bit is set to 1?",
              options: ["| (OR)", "& (AND)", "^ (XOR)", "~ (NOT)"],
              correctIndex: 1,
              explanation: "Bitwise AND (&) is used with a bitmask to isolate and test individual bits."
            }
          },
          {
            id: "c-adv-5",
            title: "POSIX Threads & Mutex Locks",
            slug: "c-pthreads-concurrency",
            level: "Advanced",
            language: "c",
            tldr: "pthreads allow running multiple functions concurrently in parallel threads sharing process memory.",
            description: "To utilize modern multi-core processors in C, developers spawn POSIX threads (pthread). When multiple threads write to the same shared memory, a mutex (mutual exclusion lock) guarantees only one thread accesses the critical section at any instant, preventing race conditions.",
            code: `#include <stdio.h>
#include <pthread.h>

long long counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void* worker(void* arg) {
    for (int i = 0; i < 10000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Safely synchronized counter: %lld\\n", counter);
    return 0;
}`,
            output: "Safely synchronized counter: 20000",
            visualDiagramTitle: "Multi-Thread Synchronization & Mutex Locking",
            visualDiagram: `1. Main Thread spawns Thread A & Thread B via pthread_create
2. Thread A requests Mutex Lock -> Lock acquired -> counter increments
3. Thread B requests Mutex Lock -> Blocked / Waiting in sleep state
4. Thread A unlocks Mutex -> Thread B awakens and acquires Lock
5. Both threads finish -> pthread_join waits -> Final atomic value returned`,
            lineExplanations: [
              { line: "pthread_t t1, t2;", explanation: "Defines handles for two distinct CPU threads of execution." },
              { line: "pthread_mutex_lock(&lock);", explanation: "Acquires exclusive lock; blocks any other thread until unlocked." },
              { line: "pthread_join(t1, NULL);", explanation: "Suspends main thread until worker thread t1 completes its execution." }
            ],
            keyPoints: [
              "Threads share heap memory, global variables, and open file descriptors.",
              "Always protect shared writable data with mutexes to avoid non-deterministic race conditions.",
              "Compile pthreads with the -pthread compiler flag in GCC/Clang."
            ],
            quiz: {
              question: "What happens if two threads write to the same global variable simultaneously without a mutex?",
              options: ["The compiler catches it automatically", "A race condition occurs leading to data corruption", "The program executes twice as fast", "The OS terminates the computer"],
              correctIndex: 1,
              explanation: "Without synchronization, thread instructions interleave unpredictably, causing lost updates and corrupted memory known as race conditions."
            }
          },
          {
            id: "c-adv-6",
            title: "UNIX System Calls & File Descriptors",
            slug: "c-system-calls",
            level: "Advanced",
            language: "c",
            tldr: "System calls (open, read, write) invoke the operating system kernel directly without library buffering.",
            description: "While printf and fopen are high-level C runtime wrappers, system calls like open(), read(), write(), and close() communicate directly with the operating system kernel using integer file descriptors (0 = stdin, 1 = stdout, 2 = stderr).",
            code: `#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

int main() {
    const char* message = "Writing directly to stdout using kernel syscall 1!\\n";
    
    // System call: write(file_descriptor, buffer, byte_count)
    // File descriptor 1 is standard output (terminal screen)
    ssize_t bytes_written = write(1, message, strlen(message));
    
    printf("Bytes pushed to kernel: %zd\\n", bytes_written);
    return 0;
}`,
            output: "Writing directly to stdout using kernel syscall 1!\nBytes pushed to kernel: 51",
            visualDiagramTitle: "User Space vs Kernel Space System Call Gate",
            visualDiagram: `[User Application (C Code)] -> [System Call Interface (libc)] -> [CPU Privilege Switch: Ring 3 to Ring 0] -> [Kernel Space Dispatcher] -> [Hardware Disk / TTY Driver]`,
            lineExplanations: [
              { line: "write(1, message, strlen(message));", explanation: "Direct kernel system call #1 (sys_write) targeting stdout fd 1." },
              { line: "ssize_t bytes_written", explanation: "Signed size type returning actual number of bytes written or -1 on error." }
            ],
            keyPoints: [
              "System calls cross the user-mode to kernel-mode security barrier via CPU software interrupts.",
              "File descriptors are lightweight integers indexing into the process kernel open-file table.",
              "Kernel calls have context-switching overhead, which is why standard I/O (buffered) is often faster for small writes."
            ],
            quiz: {
              question: "What integer file descriptor represents standard output (stdout) in UNIX?",
              options: ["0", "1", "2", "-1"],
              correctIndex: 1,
              explanation: "By UNIX convention, 0 is stdin, 1 is stdout, and 2 is stderr."
            }
          }
        ]
      }
    ]
  }
]

