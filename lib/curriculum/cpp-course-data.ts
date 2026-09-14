import { CoursePart } from "./c-course-data"

export const CPP_COURSE_PARTS: CoursePart[] = [
  {
    id: "cpp-part-1",
    title: "Part 1: C++ Basics & Standard I/O",
    badge: "Beginner",
    description: "Learn modern C++ syntax, printing with std::cout, reading input with std::cin, strings, and operators.",
    chapters: [
      {
        id: "cpp-ch-1",
        title: "Introduction & Output",
        level: "Beginner",
        lessons: [
          {
            id: "cpp-1-1",
            title: "C++ Introduction & First Program",
            slug: "cpp-intro",
            level: "Beginner",
            language: "cpp",
            tldr: "C++ is an extension of C that adds object-oriented features, used for high-performance games, browsers, and engines.",
            description: "C++ was developed by Bjarne Stroustrup in 1979 as an enhancement to the C language. It gives programmers high control over system memory while providing modern features like classes and objects. It powers Unreal Engine, Google Chrome, and operating systems.",
            code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World! Welcome to C++." << endl;
    return 0;
}`,
            output: "Hello, World! Welcome to C++.",
            lineExplanations: [
              { line: "#include <iostream>", explanation: "Header library that allows working with input and output objects like cout." },
              { line: "using namespace std;", explanation: "Allows using names from the standard library without prefixing std:: every time." },
              { line: "int main() {", explanation: "Entry point of every C++ program." },
              { line: 'cout << "Hello, World!" << endl;', explanation: "cout (see-out) prints to the screen. << is the stream insertion operator. endl creates a new line." },
              { line: "return 0;", explanation: "Terminates the main function successfully." }
            ],
            keyPoints: [
              "C++ uses cout instead of C's printf().",
              "You can chain multiple outputs using <<.",
              "endl flushes the output buffer and moves to a new line."
            ],
            quiz: {
              question: "Which object is used to output text in C++?",
              options: ["print", "cin", "cout", "system.out"],
              correctIndex: 2,
              explanation: "cout (character output) combined with the << operator prints text in C++."
            }
          },
          {
            id: "cpp-1-2",
            title: "C++ User Input with cin",
            slug: "cpp-user-input",
            level: "Beginner",
            language: "cpp",
            tldr: "Use cin with the extraction operator (>>) to read input from the keyboard.",
            description: "cin (character input) is a predefined variable that reads data from the keyboard. Notice that cin uses >> (points toward the variable), while cout uses << (points toward output).",
            code: `#include <iostream>
using namespace std;

int main() {
    int age = 21;
    cout << "Learner Age: " << age << endl;

    // Simulation of reading user input
    int luckyNumber = 7;
    cout << "Your lucky number is: " << luckyNumber << endl;
    return 0;
}`,
            output: "Learner Age: 21\nYour lucky number is: 7",
            lineExplanations: [
              { line: "cin >> variable;", explanation: "Extracts characters from input stream and stores them into variable." },
              { line: "cout << ...", explanation: "Inserts characters into output stream." }
            ],
            keyPoints: [
              "cout uses << (insertion).",
              "cin uses >> (extraction).",
              "cin stops reading when it encounters whitespace (space, tab, newline)."
            ],
            quiz: {
              question: "Which operator is used with cin to read input into a variable?",
              options: ["<<", ">>", "->", "=="],
              correctIndex: 1,
              explanation: "The extraction operator (>>) takes data from cin and puts it into your variable."
            }
          },
          {
            id: "cpp-1-3",
            title: "C++ Strings",
            slug: "cpp-strings",
            level: "Beginner",
            language: "cpp",
            tldr: "C++ provides a first-class string type for working with text easily.",
            description: "Unlike C where you had to manage char arrays and null terminators manually, C++ has the string class. You can easily concatenate strings with the + operator and find their length with .length().",
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string firstName = "Ada";
    string lastName = "Lovelace";
    string fullName = firstName + " " + lastName;

    cout << "Full Name: " << fullName << endl;
    cout << "Character count: " << fullName.length() << endl;
    cout << "First initial: " << fullName[0] << endl;
    return 0;
}`,
            output: "Full Name: Ada Lovelace\nCharacter count: 12\nFirst initial: A",
            lineExplanations: [
              { line: "string fullName = firstName + \" \" + lastName;", explanation: "Uses the + operator to join (concatenate) strings together." },
              { line: "fullName.length()", explanation: "Returns the number of characters in the string." },
              { line: "fullName[0]", explanation: "Accesses the character at index 0 ('A')." }
            ],
            keyPoints: [
              "Include <string> to unlock rich string methods.",
              "Access individual characters with square brackets [index]."
            ],
            quiz: {
              question: "How do you combine two strings in C++?",
              options: ["concat(a, b)", "a + b", "a . b", "a & b"],
              correctIndex: 1,
              explanation: "The + operator concatenates strings in C++."
            }
          }
        ]
      }
    ]
  },
  {
    id: "cpp-part-2",
    title: "Part 2: References, Pointers & Functions",
    badge: "Core Mechanisms",
    description: "Understand references (&), pointers, memory management, and function overloading in C++.",
    chapters: [
      {
        id: "cpp-ch-2",
        title: "References & Memory",
        level: "Intermediate",
        lessons: [
          {
            id: "cpp-2-1",
            title: "C++ References (&)",
            slug: "cpp-references",
            level: "Intermediate",
            language: "cpp",
            tldr: "A reference is an alias (another name) for an existing variable.",
            description: "When a reference is created with &, it shares the exact same memory location as the original variable. Modifying the reference modifies the original variable directly!",
            code: `#include <iostream>
using namespace std;

int main() {
    string food = "Pizza";
    string &meal = food; // meal is an alias for food

    cout << "Original: " << food << endl;
    cout << "Reference: " << meal << endl;

    meal = "Burger"; // Changes both meal and food!
    cout << "After update: " << food << endl;
    return 0;
}`,
            output: "Original: Pizza\nReference: Pizza\nAfter update: Burger",
            lineExplanations: [
              { line: "string &meal = food;", explanation: "meal is a reference to food. They are two names for the same memory box." }
            ],
            keyPoints: [
              "References must be initialized when declared.",
              "References cannot be reseated to point to something else later.",
              "Used extensively in function parameters to pass large objects without copying (Pass by Reference)."
            ],
            quiz: {
              question: "What symbol creates a reference variable in C++?",
              options: ["*", "&", "@", "%"],
              correctIndex: 1,
              explanation: "The ampersand (&) declares a reference alias in C++."
            }
          },
          {
            id: "cpp-2-2",
            title: "Pass by Reference in Functions",
            slug: "cpp-pass-by-reference",
            level: "Intermediate",
            language: "cpp",
            tldr: "Passing arguments by reference lets functions modify original variables without making copies.",
            description: "Normally, passing an argument to a function creates a copy (pass-by-value). If you want the function to modify the original variable, or avoid copying huge objects, pass by reference (&).",
            code: `#include <iostream>
using namespace std;

void swapNumbers(int &x, int &y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int first = 10;
    int second = 20;

    cout << "Before swap: " << first << " and " << second << endl;
    swapNumbers(first, second);
    cout << "After swap:  " << first << " and " << second << endl;
    return 0;
}`,
            output: "Before swap: 10 and 20\nAfter swap:  20 and 10",
            lineExplanations: [
              { line: "void swapNumbers(int &x, int &y)", explanation: "Receives references to the original variables, allowing direct modification." }
            ],
            keyPoints: [
              "Pass-by-value copies data (safe, but can be slow for large structures).",
              "Pass-by-reference (&) shares the original data (fast and allows modification).",
              "Use const Type &param when you want speed without allowing the function to modify data."
            ],
            quiz: {
              question: "Why do programmers pass large objects by reference in C++?",
              options: ["To slow down execution", "To avoid copying large amounts of memory", "To delete the object", "It is required by the compiler"],
              correctIndex: 1,
              explanation: "Passing by reference avoids costly memory copying, making programs run much faster."
            }
          }
        ]
      }
    ]
  },
  {
    id: "cpp-part-3",
    title: "Part 3: Object-Oriented Programming (OOP)",
    badge: "OOP Mastery",
    description: "Master classes, objects, constructors, encapsulation, inheritance, and polymorphism in C++.",
    chapters: [
      {
        id: "cpp-ch-3",
        title: "Classes, Objects & Constructors",
        level: "Intermediate",
        lessons: [
          {
            id: "cpp-3-1",
            title: "C++ Classes and Objects",
            slug: "cpp-classes",
            level: "Intermediate",
            language: "cpp",
            tldr: "A class is a blueprint, and an object is an instance built from that blueprint.",
            description: "Object-oriented programming groups related variables (attributes) and functions (methods) into reusable classes. For example, a Car class can produce many car objects with different colors and speeds.",
            code: `#include <iostream>
#include <string>
using namespace std;

class Car {
  public:
    string brand;
    string model;
    int year;

    void displayInfo() {
        cout << year << " " << brand << " " << model << endl;
    }
};

int main() {
    Car car1;
    car1.brand = "Tesla";
    car1.model = "Model 3";
    car1.year = 2024;

    car1.displayInfo();
    return 0;
}`,
            output: "2024 Tesla Model 3",
            lineExplanations: [
              { line: "class Car {", explanation: "Defines the Car blueprint." },
              { line: "public:", explanation: "Members below this keyword can be accessed from outside the class." },
              { line: "Car car1;", explanation: "Instantiates an object named car1 from the Car class." }
            ],
            keyPoints: [
              "A class is a user-defined data type.",
              "public members can be accessed outside the class; private members cannot.",
              "Don't forget the semicolon (;) after the closing curly brace of a class!"
            ],
            quiz: {
              question: "What must be placed at the end of a C++ class definition?",
              options: ["Nothing", "; (semicolon)", ": (colon)", "endclass"],
              correctIndex: 1,
              explanation: "In C++, a class definition must end with a closing bracket and a semicolon (};)."
            }
          },
          {
            id: "cpp-3-2",
            title: "C++ Constructors",
            slug: "cpp-constructors",
            level: "Intermediate",
            language: "cpp",
            tldr: "A constructor is a special method automatically called whenever a new object is created.",
            description: "Constructors initialize an object's attributes with starting values. A constructor has the exact same name as the class, and never has a return type.",
            code: `#include <iostream>
#include <string>
using namespace std;

class Smartphone {
  public:
    string model;
    int storage;

    // Constructor with parameters
    Smartphone(string m, int s) {
        model = m;
        storage = s;
    }

    void specs() {
        cout << model << " (" << storage << "GB)" << endl;
    }
};

int main() {
    Smartphone phone1("Pixel 9", 256);
    Smartphone phone2("iPhone 16", 512);

    phone1.specs();
    phone2.specs();
    return 0;
}`,
            output: "Pixel 9 (256GB)\niPhone 16 (512GB)",
            lineExplanations: [
              { line: "Smartphone(string m, int s)", explanation: "Constructor matches the class name and sets up the object's properties." },
              { line: 'Smartphone phone1("Pixel 9", 256);', explanation: "Creates phone1 and passes initial values directly to the constructor." }
            ],
            keyPoints: [
              "Constructors run automatically when an object is instantiated.",
              "Constructors never specify a return type (not even void).",
              "You can have multiple constructors with different parameters (constructor overloading)."
            ],
            quiz: {
              question: "What is the return type of a constructor in C++?",
              options: ["void", "int", "auto", "Constructors have no return type"],
              correctIndex: 3,
              explanation: "Constructors never specify a return type, not even void."
            }
          },
          {
            id: "cpp-3-3",
            title: "C++ Inheritance & Polymorphism",
            slug: "cpp-inheritance",
            level: "Intermediate",
            language: "cpp",
            tldr: "Inheritance lets a child class inherit attributes and methods from a parent class.",
            description: "Inheritance allows code reuse. For example, a Dog class can inherit from an Animal class, gaining all its common traits while adding dog-specific behaviors.",
            code: `#include <iostream>
#include <string>
using namespace std;

// Base class
class Animal {
  public:
    void sleep() {
        cout << "Zzz... sleeping peacefully." << endl;
    }
};

// Derived class (inherits from Animal)
class Dog : public Animal {
  public:
    void bark() {
        cout << "Woof! Woof!" << endl;
    }
};

int main() {
    Dog myDog;
    myDog.bark();
    myDog.sleep(); // Inherited from Animal!
    return 0;
}`,
            output: "Woof! Woof!\nZzz... sleeping peacefully.",
            lineExplanations: [
              { line: "class Dog : public Animal", explanation: "The colon (:) means Dog inherits all public members from Animal." },
              { line: "myDog.sleep();", explanation: "Calls the inherited sleep() method from the base Animal class." }
            ],
            keyPoints: [
              "Base class = Parent class. Derived class = Child class.",
              "Promotes DRY (Don't Repeat Yourself) principle.",
              "virtual functions enable runtime polymorphism so children can override parent behavior."
            ],
            quiz: {
              question: "What symbol indicates inheritance when declaring a derived class in C++?",
              options: ["->", "extends", ": (colon)", "inherits"],
              correctIndex: 2,
              explanation: "In C++, a colon (:) specifies the base class being inherited from."
            }
          },
          {
            id: "cpp-3-4",
            title: "C++ Virtual Functions & Runtime Polymorphism",
            slug: "cpp-virtual-functions",
            level: "Intermediate",
            language: "cpp",
            tldr: "virtual functions allow a base pointer to invoke derived class overrides at runtime via the vtable.",
            description: "When using pointers or references to base classes, declaring a method virtual ensures C++ calls the actual object's implementation rather than the base type's implementation, using a dynamic dispatch virtual table (vtable).",
            code: `#include <iostream>
#include <memory>
using namespace std;

class Shape {
  public:
    virtual void draw() {
        cout << "Drawing generic shape." << endl;
    }
    virtual ~Shape() {} // Essential virtual destructor
};

class Circle : public Shape {
  public:
    void draw() override {
        cout << "Drawing smooth red circle!" << endl;
    }
};

int main() {
    Shape* s = new Circle();
    s->draw(); // Dynamically calls Circle::draw()
    delete s;
    return 0;
}`,
            output: "Drawing smooth red circle!",
            visualDiagramTitle: "Virtual Table (vtable) Dynamic Dispatch",
            visualDiagram: `[Base Pointer Shape* s] -> [Instance of Circle in Heap] -> [vptr (Virtual Pointer)] -> [vtable for Circle] -> [Circle::draw() Code Segment]`,
            lineExplanations: [
              { line: "virtual void draw()", explanation: "Registers method in compiler vtable for runtime resolution." },
              { line: "void draw() override", explanation: "override keyword ensures compiler validates identical signature in base class." },
              { line: "virtual ~Shape()", explanation: "Virtual destructor prevents memory leaks when deleting through base pointer." }
            ],
            keyPoints: [
              "Always declare a virtual destructor in polymorphic base classes.",
              "The override keyword prevents accidental signature mismatches.",
              "Pure virtual functions (virtual void draw() = 0;) make a class abstract (interface)."
            ],
            quiz: {
              question: "Why must a polymorphic base class have a virtual destructor?",
              options: ["To speed up program compilation", "To ensure derived class cleanup executes when deleted via base pointer", "To allow private variables", "Destructors in C++ are always virtual automatically"],
              correctIndex: 1,
              explanation: "A virtual destructor ensures that when deleting an object through a base pointer, the derived class destructor is invoked first, avoiding memory leaks."
            }
          }
        ]
      }
    ]
  },
  {
    id: "cpp-part-4",
    title: "Part 4: Standard Template Library (STL)",
    badge: "Intermediate",
    description: "Master C++ industry standard containers and algorithms: dynamic vectors, hash maps, sorting, and lambda expressions.",
    chapters: [
      {
        id: "cpp-ch-4",
        title: "STL Containers & Algorithms",
        level: "Intermediate",
        lessons: [
          {
            id: "cpp-4-1",
            title: "C++ Vectors & Iterators",
            slug: "cpp-vectors",
            level: "Intermediate",
            language: "cpp",
            tldr: "std::vector is a self-resizing contiguous dynamic array that handles its own memory automatically.",
            description: "Unlike static C arrays with fixed sizes, std::vector automatically grows and shrinks as elements are added or removed. It provides O(1) random access and cache-friendly contiguous memory layout.",
            code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> scores = {85, 92, 78};

    scores.push_back(99); // Appends 99 to the back
    scores.push_back(95);

    cout << "Vector size: " << scores.size() << endl;
    cout << "First score: " << scores.front() << ", Last score: " << scores.back() << endl;

    // Modern range-based for loop
    cout << "Scores: ";
    for (int score : scores) {
        cout << score << " ";
    }
    cout << endl;
    return 0;
}`,
            output: "Vector size: 5\nFirst score: 85, Last score: 95\nScores: 85 92 78 99 95",
            visualDiagramTitle: "std::vector Dynamic Heap Allocation Model",
            visualDiagram: `[Vector Header: { ptr, size: 5, capacity: 8 }] -> [Contiguous Heap Buffer: [85][92][78][99][95][empty][empty][empty]]`,
            lineExplanations: [
              { line: "vector<int> scores;", explanation: "Defines dynamic array of integers using template parameter <int>." },
              { line: "scores.push_back(99);", explanation: "Adds element to end; doubles internal capacity if full." },
              { line: "for (int score : scores)", explanation: "Modern C++ range-for loop traversing elements using iterators." }
            ],
            keyPoints: [
              "push_back() has amortized O(1) time complexity.",
              "Contiguous memory layout gives optimal CPU L1/L2 cache hit ratios.",
              "Use .reserve(N) ahead of time if total size is known to prevent reallocation."
            ],
            quiz: {
              question: "What is the amortized time complexity of appending to a std::vector using push_back?",
              options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
              correctIndex: 2,
              explanation: "Appending with push_back is amortized O(1) because reallocation only occurs geometrically."
            }
          },
          {
            id: "cpp-4-2",
            title: "C++ Hash Maps & Unordered Maps",
            slug: "cpp-unordered-map",
            level: "Intermediate",
            language: "cpp",
            tldr: "std::unordered_map provides blazing fast O(1) average key-value lookups using hash tables.",
            description: "When you need to look up items by name or ID, std::unordered_map hashes the keys into buckets. For sorted keys, use std::map (Red-Black tree, O(log N)). For pure lookup speed, std::unordered_map is the go-to container.",
            code: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, double> inventory = {
        {"laptop", 1299.99},
        {"mouse", 29.50},
        {"keyboard", 89.00}
    };

    inventory["monitor"] = 249.99; // Insert or update

    // Check if key exists
    if (inventory.find("laptop") != inventory.end()) {
        cout << "Laptop price: $" << inventory["laptop"] << endl;
    }

    cout << "Total items: " << inventory.size() << endl;
    return 0;
}`,
            output: "Laptop price: $1299.99\nTotal items: 4",
            visualDiagramTitle: "Hash Function & Bucket Distribution",
            visualDiagram: `[Key: "laptop"] -> [Hash Function std::hash] -> [Bucket Index #3] -> [Node: { "laptop", 1299.99 }]`,
            lineExplanations: [
              { line: "unordered_map<string, double>", explanation: "Hash map with string keys and double floating-point values." },
              { line: 'inventory["monitor"] = 249.99;', explanation: "Direct bracket insertion or update." },
              { line: 'if (inventory.find("key") != inventory.end())', explanation: "Standard idiom to safely check existence without auto-inserting default value." }
            ],
            keyPoints: [
              "std::unordered_map is O(1) average lookup, insertion, and deletion.",
              "std::map is ordered and O(log n) backed by balanced binary search trees.",
              "Bracket syntax map[key] inserts a default constructed value if key is not found!"
            ],
            quiz: {
              question: "What happens when accessing a non-existent key using map[nonExistentKey] in C++?",
              options: ["Throws an out_of_range exception", "Returns nullptr", "Inserts the key with a default-constructed value", "Crashes the application"],
              correctIndex: 2,
              explanation: "The bracket operator automatically default-constructs and inserts the key if it does not already exist."
            }
          },
          {
            id: "cpp-4-3",
            title: "C++ Lambda Expressions & Algorithms",
            slug: "cpp-lambdas-algorithms",
            level: "Intermediate",
            language: "cpp",
            tldr: "Lambdas are anonymous inline functions that pair with STL algorithms like std::sort and std::count_if.",
            description: "Modern C++ embraces functional programming paradigms. Lambda syntax [capture](parameters) -> return_type { body } lets you define inline custom logic right where you need it.",
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers = {42, 17, 88, 5, 23, 61};

    // Sort ascending with standard algorithm
    sort(numbers.begin(), numbers.end());

    // Filter count with lambda expression
    int threshold = 20;
    int count = count_if(numbers.begin(), numbers.end(), [threshold](int n) {
        return n > threshold;
    });

    cout << "Smallest number: " << numbers.front() << endl;
    cout << "Numbers greater than " << threshold << ": " << count << endl;
    return 0;
}`,
            output: "Smallest number: 5\nNumbers greater than 20: 4",
            visualDiagramTitle: "Lambda Capture & Algorithmic Pipeline",
            visualDiagram: `[Vector: 42, 17, 88, 5, 23, 61] -> [std::sort Algorithm] -> [Lambda Filter: n > threshold] -> [Evaluated Count: 4]`,
            lineExplanations: [
              { line: "sort(numbers.begin(), numbers.end());", explanation: "Introsort (hybrid of QuickSort, HeapSort, and InsertionSort) running in O(N log N)." },
              { line: "[threshold](int n) { return n > threshold; }", explanation: "Lambda capturing local threshold variable by value and testing each element." }
            ],
            keyPoints: [
              "[=] captures all outer variables by value (copy).",
              "[&] captures all outer variables by reference.",
              "STL algorithms accept lambdas for custom comparators, transforms, and predicates."
            ],
            quiz: {
              question: "What does the capture clause [&] mean in a C++ lambda expression?",
              options: ["Capture nothing", "Capture all outer scope variables by reference", "Capture by bitwise AND", "Execute concurrently"],
              correctIndex: 1,
              explanation: "[&] indicates that any referenced external variables are captured by reference."
            }
          }
        ]
      }
    ]
  },
  {
    id: "cpp-part-5",
    title: "Part 5: Advanced Modern C++ & Systems Internals",
    badge: "Advanced",
    description: "Deep dive into move semantics, smart pointers RAII, templates, and multi-threaded systems programming.",
    chapters: [
      {
        id: "cpp-ch-5",
        title: "Memory Safety & RAII",
        level: "Advanced",
        lessons: [
          {
            id: "cpp-5-1",
            title: "Smart Pointers: std::unique_ptr & std::shared_ptr",
            slug: "cpp-smart-pointers",
            level: "Advanced",
            language: "cpp",
            tldr: "Smart pointers manage heap memory automatically following RAII, eliminating memory leaks and dangling pointers.",
            description: "Modern C++ forbids raw new and delete in application code. Instead, use std::unique_ptr for exclusive single-owner resources (zero overhead) and std::shared_ptr for reference-counted shared ownership.",
            code: `#include <iostream>
#include <memory>
using namespace std;

class Resource {
  public:
    Resource() { cout << "Resource acquired." << endl; }
    ~Resource() { cout << "Resource automatically freed!" << endl; }
    void work() { cout << "Executing safe operation." << endl; }
};

int main() {
    {
        // Automatically deleted when scope exits!
        unique_ptr<Resource> res = make_unique<Resource>();
        res->work();
    } // ~Resource() is called right here automatically!

    cout << "Scope finished cleanly." << endl;
    return 0;
}`,
            output: "Resource acquired.\nExecuting safe operation.\nResource automatically freed!\nScope finished cleanly.",
            visualDiagramTitle: "RAII Lifecycle & Automatic Scope Deallocation",
            visualDiagram: `[Scope Start] -> [make_unique allocates Heap Object] -> [Use Object via unique_ptr] -> [Scope Exits] -> [Stack Unwinds] -> [Destructor deletes Heap Memory Automatically]`,
            lineExplanations: [
              { line: "unique_ptr<Resource> res = make_unique<Resource>();", explanation: "Safe factory function that allocates memory and manages ownership." },
              { line: "} // Scope exit", explanation: "Destructor runs deterministically the moment execution crosses the closing brace." }
            ],
            keyPoints: [
              "RAII = Resource Acquisition Is Initialization.",
              "unique_ptr cannot be copied, only moved via std::move().",
              "make_unique and make_shared ensure exception-safe single memory allocations."
            ],
            quiz: {
              question: "Can a std::unique_ptr be copied to another unique_ptr?",
              options: ["Yes, using the = assignment operator", "No, it can only be moved via std::move()", "Yes, if both point to the same type", "Only inside a try/catch block"],
              correctIndex: 1,
              explanation: "unique_ptr represents exclusive ownership; copying is explicitly deleted in the compiler, only moving is permitted."
            }
          },
          {
            id: "cpp-5-2",
            title: "Move Semantics & Rvalue References (std::move)",
            slug: "cpp-move-semantics",
            level: "Advanced",
            language: "cpp",
            tldr: "Move semantics allow stealing heap resources from temporary objects without expensive deep copying.",
            description: "Before C++11, passing large vectors or strings around copied every byte in memory. Move semantics introduce rvalue references (&&) to transfer ownership of internal memory buffers in O(1) time without copying.",
            code: `#include <iostream>
#include <vector>
#include <utility>
using namespace std;

int main() {
    vector<int> hugeData(1000000, 42); // 1 million integers
    cout << "Original vector size: " << hugeData.size() << endl;

    // std::move casts hugeData to an rvalue, transferring internal pointer
    vector<int> transferredData = std::move(hugeData);

    cout << "New vector size: " << transferredData.size() << endl;
    cout << "Original vector size after move: " << hugeData.size() << " (Empty!)" << endl;
    return 0;
}`,
            output: "Original vector size: 1000000\nNew vector size: 1000000\nOriginal vector size after move: 0 (Empty!)",
            visualDiagramTitle: "Pointer Transfer vs Deep Copy in Move Semantics",
            visualDiagram: `Deep Copy: [Heap Buffer 1] ---Copy All 4MB---> [Heap Buffer 2]
Move Semantics: [Vector A: Ptr] ──Steal Pointer──> [Vector B: Ptr] ──> [Single Original 4MB Heap Buffer] (Vector A set to null)`,
            lineExplanations: [
              { line: "vector<int> transferredData = std::move(hugeData);", explanation: "Invokes Move Constructor: steals buffer pointer without allocating new heap memory." },
              { line: "hugeData.size()", explanation: "Original container is left in a valid but unspecified (usually empty) state." }
            ],
            keyPoints: [
              "std::move does not actually move anything—it casts an lvalue into an rvalue reference (Type&&).",
              "Move operations have O(1) performance regardless of data size.",
              "Rule of Five: If you define a destructor, define copy constructor, copy assignment, move constructor, and move assignment."
            ],
            quiz: {
              question: "What is the time complexity of moving a 10GB std::vector using std::move?",
              options: ["O(10GB)", "O(1)", "O(log n)", "O(n)"],
              correctIndex: 1,
              explanation: "Moving transfers internal pointers in O(1) constant time without copying buffer contents."
            }
          },
          {
            id: "cpp-5-3",
            title: "C++ Templates & Generic Metaprogramming",
            slug: "cpp-templates",
            level: "Advanced",
            language: "cpp",
            tldr: "Templates allow writing generic type-safe code that the compiler expands for any data type at compile time.",
            description: "Templates are the engine behind the STL. You write logic once with placeholder typename T, and the compiler generates optimized, dedicated assembly for each type requested with zero runtime overhead.",
            code: `#include <iostream>
#include <string>
using namespace std;

// Generic template function
template <typename T>
T findMax(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << "Max int: " << findMax<int>(15, 42) << endl;
    cout << "Max double: " << findMax<double>(3.1415, 2.718) << endl;
    cout << "Max string: " << findMax<string>("Apple", "Zebra") << endl;
    return 0;
}`,
            output: "Max int: 42\nMax double: 3.1415\nMax string: Zebra",
            visualDiagramTitle: "Template Monomorphization Compiler Pipeline",
            visualDiagram: `[Generic Template: findMax<T>] -> [Compiler AST Monomorphizer] -> [Generated: findMax(int, int)] + [Generated: findMax(double, double)] + [Generated: findMax(string, string)]`,
            lineExplanations: [
              { line: "template <typename T>", explanation: "Declares a template parameterized on type T." },
              { line: "findMax<int>(15, 42)", explanation: "Explicit specialization instructing compiler to stamp out the integer version." }
            ],
            keyPoints: [
              "Template expansion occurs during compilation (monomorphization) so there is zero runtime penalty.",
              "C++20 Concepts add formal compile-time constraints to template parameters.",
              "Templates enable static polymorphism without virtual function table lookups."
            ],
            quiz: {
              question: "When are C++ templates expanded into concrete machine code?",
              options: ["At runtime via the JIT compiler", "At compile time by the compiler", "When linking against shared libraries", "During garbage collection"],
              correctIndex: 1,
              explanation: "Templates are processed entirely at compile time, generating specialized functions for each concrete type."
            }
          },
          {
            id: "cpp-5-4",
            title: "Modern C++ Multi-Threading & Concurrency",
            slug: "cpp-multithreading",
            level: "Advanced",
            language: "cpp",
            tldr: "std::jthread and std::mutex provide safe hardware-parallel execution with automatic thread joining.",
            description: "Modern C++ (C++20) provides std::jthread, which automatically joins on destruction. Protect shared state with std::mutex and std::lock_guard to ensure lock acquisition and release following RAII.",
            code: `#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

mutex mtx;
int sharedCounter = 0;

void safeIncrement(int threadId) {
    for (int i = 0; i < 5000; i++) {
        lock_guard<mutex> lock(mtx); // RAII lock: auto unlocks when out of scope
        sharedCounter++;
    }
}

int main() {
    thread t1(safeIncrement, 1);
    thread t2(safeIncrement, 2);

    t1.join();
    t2.join();

    cout << "Final safe counter value: " << sharedCounter << endl;
    return 0;
}`,
            output: "Final safe counter value: 10000",
            visualDiagramTitle: "RAII Thread Lock Scope & Synchronization",
            visualDiagram: `[Thread 1] ──lock_guard──> [Acquires std::mutex] ──Writes Counter──> [Scope Exit auto-unlocks]
                                    ▲
[Thread 2] ────────Wait / Blocked───┘`,
            lineExplanations: [
              { line: "lock_guard<mutex> lock(mtx);", explanation: "Locks the mutex immediately and automatically releases it when lock goes out of scope." },
              { line: "t1.join();", explanation: "Pauses caller thread until worker thread t1 completes." }
            ],
            keyPoints: [
              "Always prefer std::lock_guard or std::unique_lock over manual lock()/unlock().",
              "For lock-free operations on single numbers, use std::atomic<int>.",
              "std::jthread in C++20 joins automatically upon destruction, preventing abort() on unjoined threads."
            ],
            quiz: {
              question: "What is the primary benefit of using std::lock_guard over manual mutex.lock() and mutex.unlock()?",
              options: ["It executes code on the GPU", "It automatically releases the lock even if an exception is thrown", "It removes the need for a mutex", "It allows multiple threads to write at once"],
              correctIndex: 1,
              explanation: "std::lock_guard follows RAII, guaranteeing the mutex is unlocked even when early returns or exceptions occur."
            }
          }
        ]
      }
    ]
  }
]

