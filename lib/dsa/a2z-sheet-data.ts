/**
 * ASCI A2Z DSA Master Track Dataset
 * 18 Structured Steps, 62 Subtopics, 474 Problems
 * The definitive algorithmic curriculum for engineering interviews and competitive problem solving.
 */

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface AsciDsaProblem {
  id: string;
  title: string;
  difficulty: ProblemDifficulty;
  guideUrl: string | null;
  youtubeUrl: string | null;
  leetcodeUrl: string | null;
  hasAsciNotes: boolean;
}

// Backward compatibility alias
export type TUFProblem = AsciDsaProblem;

export interface AsciDsaSubcategory {
  id: string;
  title: string;
  problems: AsciDsaProblem[];
}

// Backward compatibility alias
export type TUFSubcategory = AsciDsaSubcategory;

export interface AsciDsaStep {
  stepNumber: number;
  id: string;
  title: string;
  totalProblems: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  subcategories: AsciDsaSubcategory[];
}

// Backward compatibility alias
export type TUFStep = AsciDsaStep;

export interface A2ZSheetStats {
  totalSteps: number;
  totalSubcategories: number;
  totalProblems: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

export const A2Z_SHEET_STATS: A2ZSheetStats = {
  totalSteps: 18,
  totalSubcategories: 62,
  totalProblems: 474,
  easyCount: 151,
  mediumCount: 187,
  hardCount: 136
};

export const A2Z_SHEET_STEPS: AsciDsaStep[] = [
  {
    "stepNumber": 1,
    "id": "683",
    "title": "Learn the basics",
    "totalProblems": 54,
    "easyCount": 51,
    "mediumCount": 3,
    "hardCount": 0,
    "subcategories": [
      {
        "id": "499",
        "title": "Things to Know in C++/Java/Python or any language",
        "problems": [
          {
            "id": "425",
            "title": "Input Output",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EAR7De6Goz4?t=250",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1211",
            "title": "Cpp Basics",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EAR7De6Goz4?t=2415",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "424",
            "title": "If ElseIf",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EAR7De6Goz4?t=1259",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "429",
            "title": "Switch Case",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EAR7De6Goz4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2869",
            "title": "What are arrays, strings?",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EAR7De6Goz4?t=2415",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2867",
            "title": "For loops",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EAR7De6Goz4?t=3096",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2868",
            "title": "While loops",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EAR7De6Goz4?t=3459",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2866",
            "title": "Functions (Pass by Reference and Value)",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EAR7De6Goz4?t=3677",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1219",
            "title": "Theory with examples",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/FPu9Uld7W-E",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "494",
        "title": "Build-up Logical Thinking",
        "problems": [
          {
            "id": "1216",
            "title": "Easy and Medium",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1205",
            "title": "Hard",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "360",
        "title": "Patterns",
        "problems": [
          {
            "id": "401",
            "title": "Pattern 1",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "412",
            "title": "Pattern 2",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "416",
            "title": "Pattern 3",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "417",
            "title": "Pattern 4",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "418",
            "title": "Pattern 5",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "419",
            "title": "Pattern 6",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "420",
            "title": "Pattern 7",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "421",
            "title": "Pattern 8",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "422",
            "title": "Pattern 9",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "402",
            "title": "Pattern 10",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "403",
            "title": "Pattern 11",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "404",
            "title": "Pattern 12",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "405",
            "title": "Pattern 13",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "406",
            "title": "Pattern 14",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "407",
            "title": "Pattern 15",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "408",
            "title": "Pattern 16",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "409",
            "title": "Pattern 17",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "410",
            "title": "Pattern 18",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "411",
            "title": "Pattern 19",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "413",
            "title": "Pattern 20",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "414",
            "title": "Pattern 21",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "415",
            "title": "Pattern 22",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "498",
        "title": "Learn STL/Java-Collections or similar thing in your\n            language",
        "problems": [
          {
            "id": "1218",
            "title": "STL",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=RRVYpIET_RU",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1217",
            "title": "Java Collections",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "495",
        "title": "Know Basic Maths",
        "problems": [
          {
            "id": "367",
            "title": "Count all Digits of a Number",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1xNbjMdbjug",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "376",
            "title": "Reverse a number",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1xNbjMdbjug?t=930",
            "leetcodeUrl": "https://leetcode.com/problems/reverse-integer/",
            "hasAsciNotes": true
          },
          {
            "id": "374",
            "title": "Palindrome Number",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1xNbjMdbjug?t=1230",
            "leetcodeUrl": "https://leetcode.com/problems/palindrome-number/",
            "hasAsciNotes": true
          },
          {
            "id": "372",
            "title": "GCD of Two Numbers",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1xNbjMdbjug?t=2684",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "366",
            "title": "Check if the Number is Armstrong",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1xNbjMdbjug?t=1418",
            "leetcodeUrl": "https://leetcode.com/problems/armstrong-number/",
            "hasAsciNotes": true
          },
          {
            "id": "2807",
            "title": "Print all Divisors",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1xNbjMdbjug?t=1580",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "365",
            "title": "Check for Prime Number",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1xNbjMdbjug?t=2381",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "497",
        "title": "Learn Basic Recursion",
        "problems": [
          {
            "id": "2401",
            "title": "Understand recursion by print something N times",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=yVdKa8dnKiE&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2405",
            "title": "Print name N times using recursion",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=un6PLygfXrA&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=2",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "850",
            "title": "Print 1 to N using Recursion",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=un6PLygfXrA&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=2",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "852",
            "title": "Print N to 1 using Recursion",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=un6PLygfXrA&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=2",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "386",
            "title": "Sum of First N Numbers",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=69ZCDFy-OUo&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "371",
            "title": "Factorial of a given number",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=69ZCDFy-OUo&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "342",
            "title": "Reverse an array",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=twuC1F6gLI8&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "378",
            "title": "Check if String is Palindrome or Not ",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=twuC1F6gLI8&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=4",
            "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome/",
            "hasAsciNotes": true
          },
          {
            "id": "381",
            "title": "Fibonacci Number",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=kvRjNm4rVBE&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=5",
            "leetcodeUrl": "https://leetcode.com/problems/fibonacci-number/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "496",
        "title": "Learn Basic Hashing",
        "problems": [
          {
            "id": "1203",
            "title": "Basic Hashing",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=KEs5UyBJ39g",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "252",
            "title": "Counting Frequencies of Array Elements",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "344",
            "title": "Highest Occurring Element in an Array",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/frequency-of-the-most-frequent-element/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 2,
    "id": "681",
    "title": "Learn Important Sorting Techniques",
    "totalProblems": 7,
    "easyCount": 6,
    "mediumCount": 1,
    "hardCount": 0,
    "subcategories": [
      {
        "id": "487",
        "title": "Sorting-I",
        "problems": [
          {
            "id": "947",
            "title": "Selection Sort",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/HGk_ypEuS24?t=167",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "943",
            "title": "Bubble Sort",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/HGk_ypEuS24?t=1061",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "944",
            "title": "Insertion Sorting",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/HGk_ypEuS24?t=1900",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "488",
        "title": "Sorting-II",
        "problems": [
          {
            "id": "945",
            "title": "Merge Sorting",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ogjf7ORKfd8",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "881",
            "title": "Recursive Bubble Sort",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "882",
            "title": "Recursive Insertion Sort",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "946",
            "title": "Quick Sorting",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/WIrA4YexLRQ",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 3,
    "id": "686",
    "title": "Solve Problems on Arrays [Easy -> Medium -> Hard]",
    "totalProblems": 40,
    "easyCount": 14,
    "mediumCount": 20,
    "hardCount": 6,
    "subcategories": [
      {
        "id": "505",
        "title": "Easy",
        "problems": [
          {
            "id": "38",
            "title": "Largest Element ",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/37E9ckMDdTk?t=526",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "43",
            "title": "Second Largest Element",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/37E9ckMDdTk?t=810",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "379",
            "title": "Check if the Array is Sorted II",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/37E9ckMDdTk?t=17224",
            "leetcodeUrl": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/#:~:text=Input%3A%20nums%20%3D%20%5B2%2C,no%20rotation)%20to%20make%20nums.",
            "hasAsciNotes": true
          },
          {
            "id": "2764",
            "title": "Remove duplicates from Sorted array",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/37E9ckMDdTk?t=1887",
            "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/#:~:text=Input%3A%20nums%20%3D%20%5B0%2C,%2C%203%2C%20and%204%20respectively.",
            "hasAsciNotes": true
          },
          {
            "id": "40",
            "title": "Left Rotate Array by One",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/wvcQg43_V8U?t=61",
            "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
            "hasAsciNotes": true
          },
          {
            "id": "39",
            "title": "Left Rotate Array by K Places",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/wvcQg43_V8U?t=485",
            "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
            "hasAsciNotes": true
          },
          {
            "id": "46",
            "title": "Move Zeros to End",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/wvcQg43_V8U?t=1633",
            "leetcodeUrl": "https://leetcode.com/problems/move-zeroes/",
            "hasAsciNotes": true
          },
          {
            "id": "41",
            "title": "Linear Search",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/wvcQg43_V8U?t=2465",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "48",
            "title": "Union of two sorted arrays",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/wvcQg43_V8U?t=2584",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "44",
            "title": "Find missing number",
            "difficulty": "Easy",
            "guideUrl": "https://www.geeksforgeeks.org/find-the-missing-number/",
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "42",
            "title": "Maximum Consecutive Ones",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/bYWLJb3vCWY?t=1124",
            "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones/",
            "hasAsciNotes": true
          },
          {
            "id": "2793",
            "title": "Find the number that appears once, and other numbers twice.",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/bYWLJb3vCWY?t=1369",
            "leetcodeUrl": "https://leetcode.com/problems/single-number/",
            "hasAsciNotes": true
          },
          {
            "id": "2836",
            "title": "Longest subarray with given sum K(positives)",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=frf7qxiN2qU&feature=youtu.be",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "564",
            "title": "Longest subarray with sum K",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/frf7qxiN2qU",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "507",
        "title": "Medium",
        "problems": [
          {
            "id": "37",
            "title": "Two Sum",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/UXDSeD9mN-k",
            "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
            "hasAsciNotes": true
          },
          {
            "id": "2762",
            "title": "Sort an array of 0's 1's and 2's",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tp8JIuCXBaU",
            "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
            "hasAsciNotes": true
          },
          {
            "id": "22",
            "title": "Majority Element-I",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nP_ns3uSh80",
            "leetcodeUrl": "https://leetcode.com/problems/majority-element/",
            "hasAsciNotes": true
          },
          {
            "id": "29",
            "title": "Kadane's Algorithm",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/AHZpyENo7k4?si=QJpof4R1hHokm1hw",
            "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray/",
            "hasAsciNotes": true
          },
          {
            "id": "2761",
            "title": "Print subarray with maximum subarray sum (extended version of above problem)",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/AHZpyENo7k4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2798",
            "title": "Stock Buy and Sell",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/excAOvwF_Wk",
            "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            "hasAsciNotes": true
          },
          {
            "id": "34",
            "title": "Rearrange array elements by sign",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/h4aBagy4Uok",
            "leetcodeUrl": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
            "hasAsciNotes": true
          },
          {
            "id": "31",
            "title": "Next Permutation",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/JDOXKqF60RQ",
            "leetcodeUrl": "https://leetcode.com/problems/next-permutation/",
            "hasAsciNotes": true
          },
          {
            "id": "30",
            "title": "Leaders in an Array",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/cHrH9CQ8pmY",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2835",
            "title": "Longest Consecutive Sequence in an Array",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/oO5uLE7EUlM",
            "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/solution/",
            "hasAsciNotes": true
          },
          {
            "id": "911",
            "title": "Set Matrix Zeroes",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/N0MgLvceX7M",
            "leetcodeUrl": "https://leetcode.com/problems/set-matrix-zeroes/",
            "hasAsciNotes": true
          },
          {
            "id": "35",
            "title": "Rotate matrix by 90 degrees",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Z0R2u6gd3GU",
            "leetcodeUrl": "https://leetcode.com/problems/rotate-image/",
            "hasAsciNotes": true
          },
          {
            "id": "33",
            "title": "Print the matrix in spiral manner",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/3Zv-s9UUrFM",
            "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix/",
            "hasAsciNotes": true
          },
          {
            "id": "561",
            "title": "Count subarrays with given sum",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=xvNwoz-ufXA&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=32",
            "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "506",
        "title": "Hard",
        "problems": [
          {
            "id": "813",
            "title": "Pascal's Triangle I",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/bR7mQgwQ_o8",
            "leetcodeUrl": "https://leetcode.com/problems/pascals-triangle/",
            "hasAsciNotes": true
          },
          {
            "id": "23",
            "title": "Majority Element-II",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/vwZj1K0e9U8",
            "leetcodeUrl": "https://leetcode.com/problems/majority-element-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "27",
            "title": "3 Sum",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/DhFh8Kw7ymk",
            "leetcodeUrl": "https://leetcode.com/problems/3sum/",
            "hasAsciNotes": true
          },
          {
            "id": "28",
            "title": "4 Sum",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/eD95WRfh81c",
            "leetcodeUrl": "https://leetcode.com/problems/4sum/",
            "hasAsciNotes": true
          },
          {
            "id": "605",
            "title": "Largest Subarray with Sum 0",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=xmguZ6GbatA&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=23",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "562",
            "title": "Count subarrays with given xor K",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/eZr-6p0B7ME",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "715",
            "title": "Merge Overlapping Subintervals",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/IexN60k62jo",
            "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
            "hasAsciNotes": true
          },
          {
            "id": "25",
            "title": "Merge two sorted arrays without extra space",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/n7uwj04E0I4",
            "leetcodeUrl": "https://leetcode.com/problems/merge-sorted-array/",
            "hasAsciNotes": true
          },
          {
            "id": "21",
            "title": "Find the repeating and missing number",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/2D0D8HE6uak",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "20",
            "title": "Count Inversions",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/AseUmwVNaoY",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "26",
            "title": "Reverse Pairs",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0e4bZaP3MDI",
            "leetcodeUrl": "https://leetcode.com/problems/reverse-pairs/",
            "hasAsciNotes": true
          },
          {
            "id": "24",
            "title": "Maximum Product Subarray in an Array",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-product-subarray/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 4,
    "id": "673",
    "title": "Binary Search [1D, 2D Arrays, Search Space]",
    "totalProblems": 32,
    "easyCount": 10,
    "mediumCount": 14,
    "hardCount": 8,
    "subcategories": [
      {
        "id": "456",
        "title": "BS on 1D Arrays",
        "problems": [
          {
            "id": "81",
            "title": "Search X in sorted array",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/MHf6awe89xw",
            "leetcodeUrl": "https://leetcode.com/problems/binary-search/",
            "hasAsciNotes": true
          },
          {
            "id": "80",
            "title": "Lower Bound ",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/6zhGS79oQ4k",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "82",
            "title": "Upper Bound",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/6zhGS79oQ4k",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "89",
            "title": "Search insert position",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/6zhGS79oQ4k",
            "leetcodeUrl": "https://leetcode.com/problems/search-insert-position/#:~:text=Search%20Insert%20Position%20%2D%20LeetCode&text=Given%20a%20sorted%20array%20of,(log%20n)%20runtime%20complexity.",
            "hasAsciNotes": true
          },
          {
            "id": "86",
            "title": "Floor and Ceil in Sorted Array",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=6zhGS79oQ4k&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "85",
            "title": "First and last occurrence",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/hjR1IYVx9lY",
            "leetcodeUrl": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
            "hasAsciNotes": true
          },
          {
            "id": "229",
            "title": "Count Occurrences in a Sorted Array",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/hjR1IYVx9lY",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "87",
            "title": "Search in rotated sorted array-I",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=r3pMQ8-Ad5s&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=64",
            "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
            "hasAsciNotes": true
          },
          {
            "id": "88",
            "title": "Search in rotated sorted array-II",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/w2G2W8l__pc",
            "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "83",
            "title": "Find minimum in Rotated Sorted Array",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nhEMDKMB44g",
            "leetcodeUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            "hasAsciNotes": true
          },
          {
            "id": "84",
            "title": "Find out how many times the array is rotated",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/jtSiWTPLwd0",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2770",
            "title": "Single element in a Sorted Array",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/AZOmHuHadxQ",
            "leetcodeUrl": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
            "hasAsciNotes": true
          },
          {
            "id": "75",
            "title": "Find peak element",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/cXxmbemS6XM",
            "leetcodeUrl": "https://leetcode.com/problems/find-peak-element/#:~:text=Find%20Peak%20Element%20%2D%20LeetCode&text=A%20peak%20element%20is%20an,to%20any%20of%20the%20peaks.",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "458",
        "title": "BS on Answers",
        "problems": [
          {
            "id": "92",
            "title": "Find square root of a number",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Bsv3FPUX_BA",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "91",
            "title": "Find Nth root of a number",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=WjpswYrS2nY&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=62",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "94",
            "title": "Koko eating bananas",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/qyfekrNni90",
            "leetcodeUrl": "https://leetcode.com/problems/koko-eating-bananas/",
            "hasAsciNotes": true
          },
          {
            "id": "95",
            "title": "Minimum days to make M bouquets",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/TXAuxeYBTdg",
            "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
            "hasAsciNotes": true
          },
          {
            "id": "93",
            "title": "Find the smallest divisor",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/UvBKTVaG6U8",
            "leetcodeUrl": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
            "hasAsciNotes": true
          },
          {
            "id": "161",
            "title": "Capacity to Ship Packages Within D Days",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/MG-Ac4TAvTY",
            "leetcodeUrl": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
            "hasAsciNotes": true
          },
          {
            "id": "600",
            "title": "Kth Missing Positive Number",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/uZ0N_hZpyps",
            "leetcodeUrl": "https://leetcode.com/problems/kth-missing-positive-number/#:~:text=Given%20an%20array%20arr%20of,13%2C...%5D.",
            "hasAsciNotes": true
          },
          {
            "id": "73",
            "title": "Aggressive Cows",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/R_Mfw4ew-Vo",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "74",
            "title": "Book Allocation Problem",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=gYmWHvRHu-s&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=69",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "79",
            "title": "Split array - largest sum",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=thUd_WJn6wk&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=20",
            "leetcodeUrl": "https://leetcode.com/problems/split-array-largest-sum/",
            "hasAsciNotes": true
          },
          {
            "id": "805",
            "title": "Painter's Partition",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=thUd_WJn6wk&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=20",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "78",
            "title": "Minimize Max Distance to Gas Station",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=kMSBvlZ-_HA&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=21",
            "leetcodeUrl": "https://leetcode.com/problems/minimize-max-distance-to-gas-station/",
            "hasAsciNotes": true
          },
          {
            "id": "77",
            "title": "Median of 2 sorted arrays",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=NTop3VTjmxk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=65",
            "leetcodeUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
            "hasAsciNotes": true
          },
          {
            "id": "2767",
            "title": "Kth element of 2 sorted arrays",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/D1oDwWCq50g",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "457",
        "title": "BS on 2D Arrays",
        "problems": [
          {
            "id": "66",
            "title": "Find row with maximum 1's",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/SCz-1TtYxDI",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "69",
            "title": "Search in a 2D matrix",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ZYpYur0znng",
            "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
            "hasAsciNotes": true
          },
          {
            "id": "68",
            "title": "Search in 2D matrix - II",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/9ZbB397jU4k",
            "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "65",
            "title": "Find Peak Element - II",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nGGp5XBzC4g?si=WCop5C6Azj5gAELH",
            "leetcodeUrl": "https://leetcode.com/problems/find-a-peak-element-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "67",
            "title": "Matrix Median",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Q9wXgdxJq48?si=ScI_0uzJh7yg8nrX",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 5,
    "id": "689",
    "title": "Strings [Basic and Medium]",
    "totalProblems": 15,
    "easyCount": 7,
    "mediumCount": 8,
    "hardCount": 0,
    "subcategories": [
      {
        "id": "512",
        "title": "Basic and Easy String Problems",
        "problems": [
          {
            "id": "892",
            "title": "Remove Outermost Parentheses",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/remove-outermost-parentheses/",
            "hasAsciNotes": true
          },
          {
            "id": "2863",
            "title": "Reverse words in a given string / Palindrome Check",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/reverse-words-in-a-string/",
            "hasAsciNotes": true
          },
          {
            "id": "394",
            "title": "Largest Odd Number in a String",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/largest-odd-number-in-string/",
            "hasAsciNotes": true
          },
          {
            "id": "395",
            "title": "Longest Common Prefix",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/longest-common-prefix/",
            "hasAsciNotes": true
          },
          {
            "id": "393",
            "title": "Isomorphic String",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/isomorphic-strings/",
            "hasAsciNotes": true
          },
          {
            "id": "398",
            "title": "Rotate String",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/rotate-string/",
            "hasAsciNotes": true
          },
          {
            "id": "2809",
            "title": "Check if two strings are anagram of each other",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/#:~:text=Given%20two%20strings%20s%20and,the%20original%20letters%20exactly%20once.&text=Constraints%3A,.length%20%3C%3D%205%20*%2010",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "513",
        "title": "Medium String Problems",
        "problems": [
          {
            "id": "399",
            "title": "Sort Characters by Frequency",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/sort-characters-by-frequency/",
            "hasAsciNotes": true
          },
          {
            "id": "674",
            "title": "Maximum Nesting Depth of the Parentheses",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
            "hasAsciNotes": true
          },
          {
            "id": "903",
            "title": "Roman to Integer",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/roman-to-integer/",
            "hasAsciNotes": true
          },
          {
            "id": "974",
            "title": "String to Integer (atoi)",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/string-to-integer-atoi/",
            "hasAsciNotes": true
          },
          {
            "id": "2394",
            "title": "Count Number of Substrings",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "638",
            "title": "Longest Palindromic Substring",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
            "hasAsciNotes": true
          },
          {
            "id": "993",
            "title": "Sum of Beauty of All Substrings",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/",
            "hasAsciNotes": true
          },
          {
            "id": "984",
            "title": "Reverse every word in a string",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/reverse-words-in-a-string/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 6,
    "id": "682",
    "title": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]",
    "totalProblems": 31,
    "easyCount": 8,
    "mediumCount": 16,
    "hardCount": 7,
    "subcategories": [
      {
        "id": "490",
        "title": "Learn 1D LinkedList",
        "problems": [
          {
            "id": "1237",
            "title": "Introduction to Singly LinkedList",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Nq7ok-OyEpg?si=9PR1o8OPRWil7fRA",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "356",
            "title": "Insertion at the head of Linked List",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/VaECK03Dz-g?si=vHSwdf9jhE05adKM&t=1934",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "352",
            "title": "Deletion of the head of LL",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/VaECK03Dz-g?si=CRaBHbOo2bHFbOT5",
            "leetcodeUrl": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
            "hasAsciNotes": true
          },
          {
            "id": "470",
            "title": "Find the length of the Linked List",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Nq7ok-OyEpg?si=xqQbukLfo2oZ6C6s&t=2240",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "905",
            "title": "Search in Linked List",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Nq7ok-OyEpg?si=WNXcIaXZ_B6cNq0s&t=2524",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "491",
        "title": "Learn Doubly LinkedList",
        "problems": [
          {
            "id": "1234",
            "title": "Introduction to Doubly LL",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0eKMU10uEDI?si=uDnoj_C5ghEpNLvP",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "361",
            "title": "Insert node before head in Doubly Linked List",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0eKMU10uEDI?si=J5a0pQTosimcO_aA&t=2684",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "348",
            "title": "Delete head of Doubly Linked List",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0eKMU10uEDI?si=sE7jqrW46lfRHVLd&t=853",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "900",
            "title": "Reverse a Doubly Linked List",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/u3WUW2qe6ww?si=96Wwlju72IvmzkxE",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "493",
        "title": "Medium Problems of LL",
        "problems": [
          {
            "id": "2810",
            "title": "Middle of a LinkedList [TortoiseHare Method]",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/7LjQ57RqgEc?si=ir_rRDio38rhamU_",
            "leetcodeUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
            "hasAsciNotes": true
          },
          {
            "id": "2850",
            "title": "Reverse a LinkedList [Iterative]",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/D2vI2DNJGd8?si=RCaLSx01qR21IBdh",
            "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
            "hasAsciNotes": true
          },
          {
            "id": "627",
            "title": "Reverse a LL",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/D2vI2DNJGd8?si=RCaLSx01qR21IBdh",
            "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
            "hasAsciNotes": true
          },
          {
            "id": "2845",
            "title": "Detect a loop in LL",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/wiOo4DC5GGA?si=zagt6O6tFXc4_3cx",
            "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle/",
            "hasAsciNotes": true
          },
          {
            "id": "2847",
            "title": "Find the starting point in LL",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/2Kd0KKmmHFc?si=7UreDPRjRvapeVB0",
            "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "623",
            "title": "Length of loop in LL",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/I4g1qbkTPus?si=ONktpqewvx57T8pF",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2844",
            "title": "Check if LL is palindrome or not",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/lRY_G-u_8jk?si=BpM8hRYvXSYyjl-G",
            "leetcodeUrl": "https://leetcode.com/problems/palindrome-linked-list/",
            "hasAsciNotes": true
          },
          {
            "id": "628",
            "title": "Segregate odd and even nodes in Linked List",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/qf6qp7GzD5Q?si=JozAyXUdT8EJMSCQ",
            "leetcodeUrl": "https://leetcode.com/problems/odd-even-linked-list/",
            "hasAsciNotes": true
          },
          {
            "id": "2849",
            "title": "Remove Nth node from the back of the LL",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/3kMKYQ2wNIU?si=DtFDnPU7z9HMz_GM",
            "leetcodeUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
            "hasAsciNotes": true
          },
          {
            "id": "619",
            "title": "Delete the middle node in LL",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ePpV-_pfOeI?si=Au9GsZkVO57j6SiN",
            "leetcodeUrl": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/#:~:text=You%20are%20given%20the%20head,than%20or%20equal%20to%20x%20.",
            "hasAsciNotes": true
          },
          {
            "id": "616",
            "title": "Sort LL",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/8ocB7a_c-Cc?si=Gv-Y8q8-WyARoV35",
            "leetcodeUrl": "https://leetcode.com/problems/sort-list/",
            "hasAsciNotes": true
          },
          {
            "id": "629",
            "title": "Sort a Linked List of 0's 1's and 2's",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/gRII7LhdJWc?si=l3qRC7w3NhY7OAqw",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2846",
            "title": "Find the intersection point of Y LL",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0DYoPz2Tpt4?si=L-uJs5yXUxj4VJM2",
            "leetcodeUrl": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
            "hasAsciNotes": true
          },
          {
            "id": "617",
            "title": "Add one to a number represented by LL",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/aXQWhbvT3w0?si=uRgU9S4r5cVmnUy7",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "625",
            "title": "Add two numbers in Linked List",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=LBVsXSMOIk4&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=32",
            "leetcodeUrl": "https://leetcode.com/problems/add-two-numbers/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "492",
        "title": "Medium Problems of DLL",
        "problems": [
          {
            "id": "609",
            "title": "Delete all occurrences of a key in DLL",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Mh0NH_SD92k?si=tCYshBRi1upMqSVz",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "452",
            "title": "Find Pairs with Given Sum in Doubly Linked List",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/YitR4dQsddE?si=iZAC259hdngV_OxC",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "610",
            "title": "Remove duplicates from sorted DLL",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/YJKVTnOJXSY?si=AsZoNUoewetsBjr0",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "489",
        "title": "Hard Problems of LL",
        "problems": [
          {
            "id": "2842",
            "title": "Reverse LL in group of given size K",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/lIar1skcQYI?si=_jFghHKX4eaK36a1",
            "leetcodeUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
            "hasAsciNotes": true
          },
          {
            "id": "2843",
            "title": "Rotate a LL",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/uT7YI7XbTY8?si=ZaChW3a68c_v54Is",
            "leetcodeUrl": "https://leetcode.com/problems/rotate-list/description/",
            "hasAsciNotes": true
          },
          {
            "id": "2841",
            "title": "Flattening of LL",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ykelywHJWLg?si=InMg9MmTHzY22NSR",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "611",
            "title": "Clone a LL with random and next pointer",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/q570bKdrnlw?si=epZtpWvtNwuTf23o",
            "leetcodeUrl": "https://leetcode.com/problems/copy-list-with-random-pointer/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 7,
    "id": "684",
    "title": "Recursion [PatternWise]",
    "totalProblems": 25,
    "easyCount": 4,
    "mediumCount": 13,
    "hardCount": 8,
    "subcategories": [
      {
        "id": "500",
        "title": "Get a Strong Hold",
        "problems": [
          {
            "id": "2862",
            "title": "Recursive Implementation of atoi()",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/string-to-integer-atoi/",
            "hasAsciNotes": true
          },
          {
            "id": "2855",
            "title": "Pow(x, n)",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/l0YC3876qxg",
            "leetcodeUrl": "https://leetcode.com/problems/powx-n/",
            "hasAsciNotes": true
          },
          {
            "id": "222",
            "title": "Count Good Numbers",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/count-good-numbers/",
            "hasAsciNotes": true
          },
          {
            "id": "2858",
            "title": "Sort a stack using recursion",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "901",
            "title": "Reverse a Stack",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "501",
        "title": "Subsequences Pattern",
        "problems": [
          {
            "id": "493",
            "title": "Generate Binary Strings Without Consecutive 1s",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "876",
            "title": "Generate Parentheses",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/generate-parentheses/",
            "hasAsciNotes": true
          },
          {
            "id": "878",
            "title": "Power Set",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=b7AYbpM5YrE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=67",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2400",
            "title": "Learn All Patterns of Subsequences (Theory)",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=eQCS_v3bw0Q&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=7",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "880",
            "title": "Count all subsequences with sum K",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "879",
            "title": "Check if there exists a subsequence with sum K",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "864",
            "title": "Combination Sum",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=OyZFFqQtu98&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=49",
            "leetcodeUrl": "https://leetcode.com/problems/combination-sum/",
            "hasAsciNotes": true
          },
          {
            "id": "865",
            "title": "Combination Sum II",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=G1fRTGRxXU8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=50",
            "leetcodeUrl": "https://leetcode.com/problems/combination-sum-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "867",
            "title": "Subsets I",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=rYkfBRtMJr8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=52",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "868",
            "title": "Subsets II",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=RIn3gOkbhQE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=53",
            "leetcodeUrl": "https://leetcode.com/problems/subsets-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "866",
            "title": "Combination Sum III",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/combination-sum-iii/",
            "hasAsciNotes": true
          },
          {
            "id": "875",
            "title": "Letter Combinations of a Phone Number",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "502",
        "title": "Trying out all Combos / Hard",
        "problems": [
          {
            "id": "871",
            "title": "Palindrome partitioning",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_H8V5hJUGd0",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "874",
            "title": "Word Search",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/word-search/",
            "hasAsciNotes": true
          },
          {
            "id": "870",
            "title": "N Queen",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=i05Ju7AftcM&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=57",
            "leetcodeUrl": "https://leetcode.com/problems/n-queens/",
            "hasAsciNotes": true
          },
          {
            "id": "872",
            "title": "Rat in a Maze",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=bLGZhJlt4y0&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=60",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "4",
            "title": "Word Break",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "869",
            "title": "M Coloring Problem",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=wuVwUK25Rfc&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=59",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "873",
            "title": "Sudoku Solver",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=FWAIf_EVUKE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=58",
            "leetcodeUrl": "https://leetcode.com/problems/sudoku-solver/",
            "hasAsciNotes": true
          },
          {
            "id": "3",
            "title": "Expression Add Operators",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/expression-add-operators/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 8,
    "id": "676",
    "title": "Bit Manipulation [Concepts & Problems]",
    "totalProblems": 18,
    "easyCount": 8,
    "mediumCount": 7,
    "hardCount": 3,
    "subcategories": [
      {
        "id": "466",
        "title": "Learn Bit Manipulation",
        "problems": [
          {
            "id": "1155",
            "title": "Introduction to Bits and Tricks",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/qQd-ViW7bfk?si=QtdNaRhHmZb08Mr8",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "177",
            "title": "Check if the i-th bit is Set or Not",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nttpF8kwgd4?si=x9o8PsYaA2XVZ9rV",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "171",
            "title": "Check if a Number is Odd or Not",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nttpF8kwgd4?si=x9o8PsYaA2XVZ9rV",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "172",
            "title": "Check if a Number is Power of 2 or Not",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nttpF8kwgd4?si=x9o8PsYaA2XVZ9rV",
            "leetcodeUrl": "https://leetcode.com/problems/power-of-two/",
            "hasAsciNotes": true
          },
          {
            "id": "243",
            "title": "Count the Number of Set Bits",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nttpF8kwgd4?si=x9o8PsYaA2XVZ9rV",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2410",
            "title": "Set/Unset the rightmost unset bit",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nttpF8kwgd4?si=x9o8PsYaA2XVZ9rV",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1005",
            "title": "Swap Two Numbers",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nttpF8kwgd4?si=x9o8PsYaA2XVZ9rV",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "140",
            "title": "Divide two numbers without multiplication and division",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/pBD4B1tzgVc?si=G9c5pEE-RrzeU6sz",
            "leetcodeUrl": "https://leetcode.com/problems/divide-two-integers/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "465",
        "title": "Interview Problems",
        "problems": [
          {
            "id": "141",
            "title": "Minimum Bit Flips to Convert Number",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/OOdrmcfZXd8?si=rnkRVz1UiVBKWC69",
            "leetcodeUrl": "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
            "hasAsciNotes": true
          },
          {
            "id": "143",
            "title": "Single Number - I",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/bYWLJb3vCWY?t=1369",
            "leetcodeUrl": "https://leetcode.com/problems/single-number/",
            "hasAsciNotes": true
          },
          {
            "id": "142",
            "title": "Power Set Bit Manipulation",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/LqKaUv1G3_I?si=UXU_T5OsHiokPRvP",
            "leetcodeUrl": "https://leetcode.com/problems/subsets/",
            "hasAsciNotes": true
          },
          {
            "id": "146",
            "title": "XOR of numbers in a given range",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/WqGb7159h7Q?si=uGUEbNUUaIN_6Vvr",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "145",
            "title": "Single Number - III",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/UA5JnV1J2sI?si=VFBRJyb3boZvx_r1",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "464",
        "title": "Advanced Maths",
        "problems": [
          {
            "id": "2853",
            "title": "Print Prime Factors of a Number",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/LT7XhVdeRyg?si=6HkjQokJRPTFai21",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "370",
            "title": "Divisors of a Number",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1xNbjMdbjug?t=1580",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "651",
            "title": "Count primes in range L to R",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/g5Fuxn_AvSk?si=fv6Q-Po7wrMW0a5n",
            "leetcodeUrl": "https://leetcode.com/problems/count-primes/",
            "hasAsciNotes": true
          },
          {
            "id": "652",
            "title": "Prime factorisation of a Number",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/LT7XhVdeRyg?si=6HkjQokJRPTFai21",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "877",
            "title": "Pow(x,n)",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/l0YC3876qxg",
            "leetcodeUrl": "https://leetcode.com/problems/powx-n/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 9,
    "id": "687",
    "title": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]",
    "totalProblems": 30,
    "easyCount": 9,
    "mediumCount": 13,
    "hardCount": 8,
    "subcategories": [
      {
        "id": "509",
        "title": "Learning",
        "problems": [
          {
            "id": "390",
            "title": "Implement Stack using Arrays",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "387",
            "title": "Implement Queue using Arrays",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "392",
            "title": "Implement Stack using Queue",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
            "leetcodeUrl": "https://leetcode.com/problems/implement-stack-using-queues/",
            "hasAsciNotes": true
          },
          {
            "id": "389",
            "title": "Implement Queue using Stack",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
            "leetcodeUrl": "https://leetcode.com/problems/implement-queue-using-stacks/",
            "hasAsciNotes": true
          },
          {
            "id": "391",
            "title": "Implement stack using Linkedlist",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "388",
            "title": "Implement queue using Linkedlist",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "966",
            "title": "Balanced Paranthesis",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/xwjS0iZhw4I?si=UoyKpFn4Q3nf5h2R",
            "leetcodeUrl": "https://leetcode.com/problems/valid-parentheses/",
            "hasAsciNotes": true
          },
          {
            "id": "958",
            "title": "Implement Min Stack",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/NdDIaH91P0g?si=4_Jbsq5trFvfSdUY",
            "leetcodeUrl": "https://leetcode.com/problems/min-stack/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "511",
        "title": "Prefix, Infix, PostFix Conversion Problems",
        "problems": [
          {
            "id": "586",
            "title": "Infix to Postfix Conversion",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/4pIc9UBHJtk?si=ryeVvQWpCgwbTQrh",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "848",
            "title": "Prefix to Infix Conversion",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/4pIc9UBHJtk?si=ryeVvQWpCgwbTQrh",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "849",
            "title": "Prefix to Postfix Conversion",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/4pIc9UBHJtk?si=0pWtyDC1GhbiYP3P",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "825",
            "title": "Postfix to Prefix Conversion",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/4pIc9UBHJtk?si=0pWtyDC1GhbiYP3P",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "824",
            "title": "Postfix to Infix Conversion",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/4pIc9UBHJtk?si=0pWtyDC1GhbiYP3P",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "587",
            "title": "Infix to Prefix Conversion",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/4pIc9UBHJtk?si=0pWtyDC1GhbiYP3P",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "510",
        "title": "Monotonic Stack/Queue Problems [VVV. Imp]",
        "problems": [
          {
            "id": "968",
            "title": "Next Greater Element",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/e7XQLtOQM3I?si=QdcHpTtx6gAHsext",
            "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-i/",
            "hasAsciNotes": true
          },
          {
            "id": "969",
            "title": "Next Greater Element - 2",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/7PrncD7v9YQ?si=UkBc7eVy9HGlBpeW",
            "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "768",
            "title": "Next Smaller Element",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "285",
            "title": "Number of Greater Elements to the Right",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "965",
            "title": "Trapping Rainwater",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1_5VuquLbXg?si=NFG6df318_6OtGvg",
            "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water/",
            "hasAsciNotes": true
          },
          {
            "id": "971",
            "title": "Sum of Subarray Minimums",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/v0e8p9JCgRc?si=XAU7ekECgS5nboRw",
            "leetcodeUrl": "https://leetcode.com/problems/sum-of-subarray-minimums/",
            "hasAsciNotes": true
          },
          {
            "id": "967",
            "title": "Asteroid Collision",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_eYGqw_VDR4?si=YyxibcHq800RqgIQ",
            "leetcodeUrl": "https://leetcode.com/problems/asteroid-collision/",
            "hasAsciNotes": true
          },
          {
            "id": "972",
            "title": "Sum of Subarray Ranges",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/gIrMptNPf5M?si=Q_GHuBvzZVs27X_U",
            "leetcodeUrl": "https://leetcode.com/problems/sum-of-subarray-ranges/",
            "hasAsciNotes": true
          },
          {
            "id": "970",
            "title": "Remove K Digits",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/jmbuRzYPGrg?si=WN387gwQ7aXWkUao",
            "leetcodeUrl": "https://leetcode.com/problems/remove-k-digits/",
            "hasAsciNotes": true
          },
          {
            "id": "959",
            "title": "Largest rectangle in a histogram",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Bzat9vgD0fs?si=DiBlLejXcr6EJoyB",
            "leetcodeUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
            "hasAsciNotes": true
          },
          {
            "id": "962",
            "title": "Maximum Rectangles",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tOylVCugy9k",
            "leetcodeUrl": "https://leetcode.com/problems/maximal-rectangle/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "508",
        "title": "Implementation Problems",
        "problems": [
          {
            "id": "963",
            "title": "Sliding Window Maximum",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/NwBvene4Imo?si=eU1PY-bcQfk5wdog",
            "leetcodeUrl": "https://leetcode.com/problems/sliding-window-maximum/",
            "hasAsciNotes": true
          },
          {
            "id": "964",
            "title": "Stock span problem",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/eay-zoSRkVc?si=deNNe5i38BOAntha",
            "leetcodeUrl": "https://leetcode.com/problems/online-stock-span/",
            "hasAsciNotes": true
          },
          {
            "id": "957",
            "title": "Celebrity Problem",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/cEadsbTeze4?si=olXYfOs7l-SEn2zl",
            "leetcodeUrl": "https://leetcode.com/accounts/login/?next=/problems/find-the-celebrity/",
            "hasAsciNotes": true
          },
          {
            "id": "961",
            "title": "LRU Cache",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "960",
            "title": "LFU Cache",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=0PSB9y8ehbk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=79",
            "leetcodeUrl": "https://leetcode.com/problems/lfu-cache/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 10,
    "id": "685",
    "title": "Sliding Window & Two Pointer Combined Problems",
    "totalProblems": 12,
    "easyCount": 0,
    "mediumCount": 5,
    "hardCount": 7,
    "subcategories": [
      {
        "id": "504",
        "title": "Medium Problems",
        "problems": [
          {
            "id": "2857",
            "title": "Longest Substring Without Repeating Characters",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/-zSxTJkcdAo?si=I2zfR-vlDMg0zU9z",
            "leetcodeUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            "hasAsciNotes": true
          },
          {
            "id": "930",
            "title": " Max Consecutive Ones III",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/3E4JBHSLpYk?si=SoOW64pP6otEKxBw",
            "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones-iii/",
            "hasAsciNotes": true
          },
          {
            "id": "926",
            "title": " Fruit Into Baskets",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/e3bs0uA1NhQ?si=gR8pO62u-nJeFAXk",
            "leetcodeUrl": "https://leetcode.com/problems/fruit-into-baskets/description/",
            "hasAsciNotes": true
          },
          {
            "id": "927",
            "title": "Longest Repeating Character Replacement",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_eNhaDCr6P0?si=pBWcEjozF5poom0p",
            "leetcodeUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
            "hasAsciNotes": true
          },
          {
            "id": "923",
            "title": "Binary Subarrays With Sum",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/XnMdNUkX6VM?si=Nyt8EveeLUg8lmty",
            "leetcodeUrl": "https://leetcode.com/problems/binary-subarrays-with-sum/",
            "hasAsciNotes": true
          },
          {
            "id": "924",
            "title": "Count number of Nice subarrays",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/j_QOv9OT9Og?si=Oq5-5hyFkzVSOZpP",
            "leetcodeUrl": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
            "hasAsciNotes": true
          },
          {
            "id": "925",
            "title": "Number of Substrings Containing All Three Characters",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/xtqN4qlgr8s?si=kuaLHVOLXhh5Z2tW",
            "leetcodeUrl": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
            "hasAsciNotes": true
          },
          {
            "id": "922",
            "title": "Maximum Points You Can Obtain from Cards ",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/pBWCOCS636U?si=-X64rY67noxvOwrG",
            "leetcodeUrl": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "503",
        "title": "Hard Problems",
        "problems": [
          {
            "id": "928",
            "title": "Longest Substring With At Most K Distinct Characters",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/teM9ZsVRQyc?si=Kh0_u6aCkkBU3Q33",
            "leetcodeUrl": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
            "hasAsciNotes": true
          },
          {
            "id": "988",
            "title": "Subarrays with K Different Integers",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/7wYGbV_LsX4?si=KWa48RgLDCvdNqRb",
            "leetcodeUrl": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
            "hasAsciNotes": true
          },
          {
            "id": "931",
            "title": "Minimum Window Substring ",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/WJaij9ffOIY?si=-xnsWIH84zWU0ICd",
            "leetcodeUrl": "https://leetcode.com/problems/minimum-window-substring/",
            "hasAsciNotes": true
          },
          {
            "id": "754",
            "title": "Minimum Window Subsequence",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/minimum-window-subsequence/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 11,
    "id": "680",
    "title": "Heaps [Learning, Medium, Hard Problems]",
    "totalProblems": 17,
    "easyCount": 3,
    "mediumCount": 10,
    "hardCount": 4,
    "subcategories": [
      {
        "id": "485",
        "title": "Learning",
        "problems": [
          {
            "id": "1223",
            "title": "Heaps (Theory Video)",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "576",
            "title": "Implement Min Heap",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "571",
            "title": "Check if an array represents a min heap ",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "572",
            "title": "Convert Min Heap to Max Heap",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "486",
        "title": "Medium Problems",
        "problems": [
          {
            "id": "578",
            "title": "K-th Largest element in an array",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2840",
            "title": "Kth smallest element in an array [use priority queue]",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2409",
            "title": "Sort K sorted array",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "569",
            "title": "Merge K sorted Lists",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
            "hasAsciNotes": true
          },
          {
            "id": "898",
            "title": "Replace Elements by Their Rank",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1008",
            "title": "Task Scheduler",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/task-scheduler/",
            "hasAsciNotes": true
          },
          {
            "id": "556",
            "title": "Hand of Straights",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/hand-of-straights/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "484",
        "title": "Hard Problems",
        "problems": [
          {
            "id": "565",
            "title": "Design Twitter",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/design-twitter/",
            "hasAsciNotes": true
          },
          {
            "id": "755",
            "title": "Minimum Cost to Connect Sticks",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2838",
            "title": "Kth largest element in a stream of running integers",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-a-stream/#:~:text=Implement%20KthLargest%20class%3A,largest%20element%20in%20the%20stream.",
            "hasAsciNotes": true
          },
          {
            "id": "568",
            "title": "Maximum Sum Combination",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "566",
            "title": "Find Median from Data Stream",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
            "hasAsciNotes": true
          },
          {
            "id": "1018",
            "title": "Top K Frequent Elements",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 12,
    "id": "679",
    "title": "Greedy Algorithms [Easy, Medium/Hard]",
    "totalProblems": 15,
    "easyCount": 3,
    "mediumCount": 10,
    "hardCount": 2,
    "subcategories": [
      {
        "id": "482",
        "title": "Easy Problems",
        "problems": [
          {
            "id": "2834",
            "title": "Assign Cookies",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/DIX2p7vb9co?si=GofAIDimue-Av0Fi",
            "leetcodeUrl": "https://leetcode.com/problems/assign-cookies/",
            "hasAsciNotes": true
          },
          {
            "id": "489",
            "title": "Fractional Knapsack",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/1ibsQrnuEEg?si=8R2By3wpHo0zZVHE",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "543",
            "title": "Lemonade Change",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/n_tmibEhO6Q?si=q1NW8MfPy0QU6fIl",
            "leetcodeUrl": "https://leetcode.com/problems/lemonade-change/",
            "hasAsciNotes": true
          },
          {
            "id": "545",
            "title": "Valid Paranthesis Checker",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/cHT6sG_hUZI?si=XRHeyh7jOaLaTy3g",
            "leetcodeUrl": "https://leetcode.com/problems/valid-parenthesis-string/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "483",
        "title": "Medium/Hard",
        "problems": [
          {
            "id": "549",
            "title": "N meetings in one room",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/mKfhTotEguk?si=2RELeq18mpmIIN3Q",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "542",
            "title": "Jump Game - I",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tZAa_jJ3SwQ?si=voKd7n9VTLDRRNzJ",
            "leetcodeUrl": "https://leetcode.com/problems/jump-game/",
            "hasAsciNotes": true
          },
          {
            "id": "595",
            "title": "Jump Game II",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/7SBVnw7GSTk?si=9uUouBELh9K3m2jZ",
            "leetcodeUrl": "https://leetcode.com/problems/jump-game-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "548",
            "title": "Minimum number of platforms required for a railway",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/AsGzwR_FWok?si=165acXU_dtqOHuo9",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "547",
            "title": "Job sequencing Problem",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/QbwltemZbRg?si=wvcemJ5BLPlTRmkG",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "544",
            "title": "Candy",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/IIqVFvKE6RY?si=EjmuXZJNLQLUkEd7",
            "leetcodeUrl": "https://leetcode.com/problems/candy/",
            "hasAsciNotes": true
          },
          {
            "id": "551",
            "title": "Shortest Job First",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/3-QbX1iDbXs?si=IH8QZUblr01F7UoQ",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2859",
            "title": "Program for Least Recently Used (LRU) Page Replacement Algorithm",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "546",
            "title": "Insert Interval",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/xxRE-46OCC8?si=a7aPuIw16zDx2lAa",
            "leetcodeUrl": "https://leetcode.com/problems/insert-interval/",
            "hasAsciNotes": true
          },
          {
            "id": "712",
            "title": "Merge Intervals",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=2JzRBPFYbKE&list=PLgUwDviBIf0rPG3Ictpu74YWBQ1CaBkm2&index=6",
            "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
            "hasAsciNotes": true
          },
          {
            "id": "550",
            "title": "Non-overlapping Intervals",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/HDHQ8lAWakY?si=JVtLqboGdpUTOVjf",
            "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 13,
    "id": "675",
    "title": "Binary Trees [Traversals, Medium and Hard Problems]",
    "totalProblems": 38,
    "easyCount": 14,
    "mediumCount": 16,
    "hardCount": 8,
    "subcategories": [
      {
        "id": "463",
        "title": "Traversals",
        "problems": [
          {
            "id": "2865",
            "title": "Introduction to Trees",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_ANrF3FJm7I",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2864",
            "title": "Binary Tree Representation in Java",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/hyLyW7rP24I",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "136",
            "title": "Pre, Post, Inorder in one traversal",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ySp2epYvgTE",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "137",
            "title": "Preorder Traversal",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/RlUu72JrOCQ",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2785",
            "title": "Inorder Traversal of Binary Tree",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Z_NEgBgbRVI",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "135",
            "title": "Postorder Traversal",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/2YBhNLodD8Q",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "134",
            "title": "Level Order Traversal",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/EoAsWbO7sqg",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2872",
            "title": "Iterative Preorder Traversal of Binary Tree",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Bfqd8BsPVuw",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2786",
            "title": "Iterative Inorder Traversal of Binary Tree",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/lxTGsVXjwvM",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2788",
            "title": "Post-order Traversal of Binary Tree using 2 stack",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/2YBhNLodD8Q",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2787",
            "title": "Post-order Traversal of Binary Tree using 1 stack",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/NzIGLLwZBS8",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2789",
            "title": "Preorder, Inorder, and Postorder Traversal in one Traversal",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ySp2epYvgTE",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "462",
        "title": "Medium Problems",
        "problems": [
          {
            "id": "131",
            "title": "Maximum Depth in BT",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/eD3tmO66aBA",
            "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "127",
            "title": "Check for balanced binary tree",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Yt50Jfbd8Po",
            "leetcodeUrl": "https://leetcode.com/problems/balanced-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "130",
            "title": "Diameter of Binary Tree",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Rezetez59Nk",
            "leetcodeUrl": "https://leetcode.com/problems/diameter-of-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "132",
            "title": "Maximum path sum ",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/WszrfSwMz58",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
            "hasAsciNotes": true
          },
          {
            "id": "129",
            "title": "Check if two trees are identical or not",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/BhuvF_-PWS0",
            "leetcodeUrl": "https://leetcode.com/problems/same-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "126",
            "title": "Zig Zag or Spiral Traversal",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/3OXWEdlIGl4",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "116",
            "title": "Boundary Traversal",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0ca1nvR0be4",
            "leetcodeUrl": "https://leetcode.com/problems/boundary-of-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "125",
            "title": "Vertical Order Traversal",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/q_a6lpbKJdw",
            "leetcodeUrl": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "124",
            "title": "Top View of BT",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Et9OCDNvJ78",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "115",
            "title": "Bottom view of BT",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0FtVY6I4pB8",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2782",
            "title": "Right/Left View of Binary Tree",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/KV4mRzTjlAk",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-right-side-view/",
            "hasAsciNotes": true
          },
          {
            "id": "2784",
            "title": "Symmetric Binary Tree",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=nKggNAiEpBE",
            "leetcodeUrl": "https://leetcode.com/problems/symmetric-tree/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "461",
        "title": "Hard Problems",
        "problems": [
          {
            "id": "122",
            "title": "Print root to leaf path in BT",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/fmflMqVOC7k",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "118",
            "title": "LCA in BT",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_-QHfMDde90",
            "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "119",
            "title": "Maximum Width of BT",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ZbybYvcVLks",
            "leetcodeUrl": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "185",
            "title": "Children Sum Property in Binary Tree",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/fnmisPM6cVo",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "121",
            "title": "Print all nodes at a distance of K in BT",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/i9ORlEy6EsI",
            "leetcodeUrl": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "120",
            "title": "Minimum time taken to burn the BT from a given Node",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/2r5wLmQfD6g",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "117",
            "title": "Count total nodes in a complete BT",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/u-yWemKGWO0",
            "leetcodeUrl": "https://leetcode.com/problems/count-complete-tree-nodes/",
            "hasAsciNotes": true
          },
          {
            "id": "111",
            "title": "Requirements needed to construct a unique BT",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/9GMECGQgWrQ",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "110",
            "title": "Construct a BT from Preorder and Inorder",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/aZNaLrVebKQ",
            "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2781",
            "title": "Construct the Binary Tree from Postorder and Inorder Traversal",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/LgLRTaEMRVc",
            "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "112",
            "title": "Serialize and De-serialize BT",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/-YbXySKJsX8",
            "leetcodeUrl": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "2791",
            "title": "Morris Preorder Traversal of a Binary Tree",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/80Zug6D1_r4",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2792",
            "title": "Morris Inorder Traversal of a Binary Tree",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/80Zug6D1_r4",
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "486",
            "title": "Flatten Binary Tree to Linked List",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/sWf7k1x9XR4",
            "leetcodeUrl": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 14,
    "id": "674",
    "title": "Binary Search Trees [Concept and Problems]",
    "totalProblems": 16,
    "easyCount": 5,
    "mediumCount": 7,
    "hardCount": 4,
    "subcategories": [
      {
        "id": "459",
        "title": "Concepts",
        "problems": [
          {
            "id": "1153",
            "title": "Introduction to BST",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/p7-9UvDQZ3w",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2780",
            "title": "Search in a Binary Search Tree",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/KcNt6v_56cc",
            "leetcodeUrl": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "2398",
            "title": "Find Min/Max in BST",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "460",
        "title": "Practice Problems",
        "problems": [
          {
            "id": "107",
            "title": "Floor and Ceil in a BST",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=xm_W1ub-K-w&list=PLgUwDviBIf0q8Hkd7bK2Bpryj2xVJk8Vk&index=43",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2778",
            "title": "Floor in a Binary Search Tree",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/xm_W1ub-K-w",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "104",
            "title": "Insert a given node in BST",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/FiFiNvM29ps",
            "leetcodeUrl": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "102",
            "title": "Delete a node in BST",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/kouxiP_H5WE",
            "leetcodeUrl": "https://leetcode.com/problems/delete-node-in-a-bst/",
            "hasAsciNotes": true
          },
          {
            "id": "105",
            "title": "Kth Smallest and Largest element in BST",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/9TJYWh0adfk",
            "leetcodeUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
            "hasAsciNotes": true
          },
          {
            "id": "100",
            "title": "Check if a tree is a BST or not",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/f-sj7I5oXEI",
            "leetcodeUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "106",
            "title": "LCA in BST",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/cX_kPV_foZc",
            "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "101",
            "title": "Construct a BST from a preorder traversal",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/UmJT3j26t1I",
            "leetcodeUrl": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
            "hasAsciNotes": true
          },
          {
            "id": "2775",
            "title": "Inorder Successor/Predecessor in BST",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/SXKAD2svfmI",
            "leetcodeUrl": "https://leetcode.com/problems/inorder-successor-in-bst/",
            "hasAsciNotes": true
          },
          {
            "id": "2772",
            "title": "Merge 2 BST's",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/D2jMcmxU4bs",
            "leetcodeUrl": "https://leetcode.com/problems/binary-search-tree-iterator/",
            "hasAsciNotes": true
          },
          {
            "id": "2774",
            "title": "Two Sum In BST | Check if there exists a pair with Sum K",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ssL3sHwPeb4",
            "leetcodeUrl": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
            "hasAsciNotes": true
          },
          {
            "id": "97",
            "title": "Correct BST with two nodes swapped",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ZWGW7FminDM",
            "leetcodeUrl": "https://leetcode.com/problems/recover-binary-search-tree/",
            "hasAsciNotes": true
          },
          {
            "id": "98",
            "title": "Largest BST in Binary Tree",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/X0oXMdtUDwo",
            "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 15,
    "id": "678",
    "title": "Graphs [Concepts & Problems]",
    "totalProblems": 53,
    "easyCount": 4,
    "mediumCount": 15,
    "hardCount": 34,
    "subcategories": [
      {
        "id": "476",
        "title": "Learning",
        "problems": [
          {
            "id": "1222",
            "title": "Introduction to Graph",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/3oI-34aPMWM",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2870",
            "title": "Graph Representation | C++",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/3oI-34aPMWM",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2871",
            "title": "Graph Representation | Java",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/3oI-34aPMWM",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "528",
            "title": "Connected Components",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "529",
            "title": "Traversal Techniques",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Qzf1a--rhp8",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2831",
            "title": "DFS",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Qzf1a--rhp8",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "479",
        "title": "Problems on BFS/DFS",
        "problems": [
          {
            "id": "535",
            "title": "Number of provinces",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ACzkVtewUYA",
            "leetcodeUrl": "https://leetcode.com/problems/number-of-provinces/#:~:text=A%20province%20is%20a%20group,the%20total%20number%20of%20provinces.",
            "hasAsciNotes": true
          },
          {
            "id": "2830",
            "title": "Connected Components Problem in Matrix",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "536",
            "title": "Rotten Oranges",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=yf3oUhkvqA0",
            "leetcodeUrl": "https://leetcode.com/problems/rotting-oranges/",
            "hasAsciNotes": true
          },
          {
            "id": "531",
            "title": "Flood fill algorithm",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/flood-fill/",
            "hasAsciNotes": true
          },
          {
            "id": "2817",
            "title": "Cycle Detection in Undirected Graph (bfs)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/BPlrALf1LDU",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "501",
            "title": "Detect a cycle in an undirected graph",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/zQ3zgFypzX4",
            "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
            "hasAsciNotes": true
          },
          {
            "id": "530",
            "title": "Distance of nearest cell having one",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/edXdVwkYHF8",
            "leetcodeUrl": "https://leetcode.com/problems/01-matrix/",
            "hasAsciNotes": true
          },
          {
            "id": "537",
            "title": "Surrounded Regions",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/BtdgAys4yMk",
            "leetcodeUrl": "https://leetcode.com/problems/surrounded-regions/",
            "hasAsciNotes": true
          },
          {
            "id": "533",
            "title": "Number of enclaves",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/rxKcepXQgU4",
            "leetcodeUrl": "https://leetcode.com/problems/number-of-enclaves/",
            "hasAsciNotes": true
          },
          {
            "id": "509",
            "title": "Word ladder I",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tRPda0rcf8E",
            "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
            "hasAsciNotes": true
          },
          {
            "id": "510",
            "title": "Word ladder II",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/AD4SFl7tu7I?si=EpcJQTWm2YeURvEG",
            "leetcodeUrl": "https://leetcode.com/problems/word-ladder-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "534",
            "title": "Number of islands",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=muncqlKJrH0&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=8",
            "leetcodeUrl": "https://leetcode.com/problems/number-of-islands/",
            "hasAsciNotes": true
          },
          {
            "id": "2813",
            "title": "Bipartite Graph (DFS)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/KG5YFfR0j8A",
            "leetcodeUrl": "https://leetcode.com/problems/is-graph-bipartite/",
            "hasAsciNotes": true
          },
          {
            "id": "2814",
            "title": "Cycle Detection in Directed Graph (DFS)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/9twcmtQj4DU",
            "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/discuss/293048/detecting-cycle-in-directed-graph-problem",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "481",
        "title": "Topo Sort and Problems",
        "problems": [
          {
            "id": "2822",
            "title": "Topo Sort",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/5lZ0iJMrUMk",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "502",
            "title": "Topological sort or Kahn's algorithm",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/5lZ0iJMrUMk",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "500",
            "title": "Detect a cycle in a directed graph",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=uzVUw90ZFIg&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=12",
            "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
            "hasAsciNotes": true
          },
          {
            "id": "504",
            "title": "Course Schedule I",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/WAOfKpxYHR8",
            "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
            "hasAsciNotes": true
          },
          {
            "id": "505",
            "title": "Course Schedule II",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/WAOfKpxYHR8",
            "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "506",
            "title": "Find eventual safe states",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/2gtg3VsDGyc",
            "leetcodeUrl": "https://leetcode.com/problems/find-eventual-safe-states/",
            "hasAsciNotes": true
          },
          {
            "id": "503",
            "title": "Alien Dictionary",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/U3N_je7tWAs",
            "leetcodeUrl": "https://leetcode.com/problems/alien-dictionary/solution/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "480",
        "title": "Shortest Path Algorithms and Problems",
        "problems": [
          {
            "id": "508",
            "title": "Shortest path in undirected graph with unit weights",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=C4gxoTaI71U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=28",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "507",
            "title": "Shortest path in DAG",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=ZUFQfFaU-8U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=27",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2827",
            "title": "Djisktra's Algorithm",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=rp1SMw7HSO8&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=35",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2828",
            "title": "Why priority Queue is used in Djisktra's Algorithm",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=rp1SMw7HSO8&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=35",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "527",
            "title": "Shortest Distance in a Binary Maze",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=U5Mw4eyUmw4&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=36",
            "leetcodeUrl": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
            "hasAsciNotes": true
          },
          {
            "id": "525",
            "title": "Path with minimum effort",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0ytpZyiZFhA",
            "leetcodeUrl": "https://leetcode.com/problems/path-with-minimum-effort/",
            "hasAsciNotes": true
          },
          {
            "id": "519",
            "title": "Cheapest flight within K stops",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/9XybHVqTHcQ",
            "leetcodeUrl": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
            "hasAsciNotes": true
          },
          {
            "id": "764",
            "title": "Network Delay Time",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/network-delay-time/",
            "hasAsciNotes": true
          },
          {
            "id": "524",
            "title": "Number of ways to arrive at destination",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_-0mx0SmYxA",
            "leetcodeUrl": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
            "hasAsciNotes": true
          },
          {
            "id": "523",
            "title": "Minimum multiplications to reach end",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=_BvEJ3VIDWw&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=39",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2826",
            "title": "Bellman Ford Algorithm",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/0vVofAhAYjc",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "522",
            "title": "Floyd warshall algorithm",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=YbY8cVwWAvw&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=42",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "521",
            "title": "Find the city with the smallest number of neighbors",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/9XybHVqTHcQ",
            "leetcodeUrl": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "477",
        "title": "MinimumSpanningTree/Disjoint Set and Problems",
        "problems": [
          {
            "id": "1221",
            "title": "MST theory",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ZSPjZuZWCME",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2825",
            "title": "Prim's Algorithm",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/mJcZjjKzeqk",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "516",
            "title": "Disjoint Set ",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/aBxjDBC4M1U",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "517",
            "title": "Find the MST weight",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/mJcZjjKzeqk",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "515",
            "title": "Number of operations to make network connected",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/FYrl7iz9_ZU",
            "leetcodeUrl": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
            "hasAsciNotes": true
          },
          {
            "id": "513",
            "title": "Most stones removed with same row or column",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/OwMNX8SPavM",
            "leetcodeUrl": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
            "hasAsciNotes": true
          },
          {
            "id": "511",
            "title": "Accounts merge",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/FMwpt_aQOGw",
            "leetcodeUrl": "https://leetcode.com/problems/accounts-merge/",
            "hasAsciNotes": true
          },
          {
            "id": "514",
            "title": "Number of islands II",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Rn6B-Q4SNyA",
            "leetcodeUrl": "https://leetcode.com/problems/number-of-islands-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "512",
            "title": "Making a large island",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/lgiz0Oup6gM",
            "leetcodeUrl": "https://leetcode.com/problems/making-a-large-island/",
            "hasAsciNotes": true
          },
          {
            "id": "1006",
            "title": "Swim in Rising Water",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/swim-in-rising-water/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "478",
        "title": "Other Algorithms",
        "problems": [
          {
            "id": "497",
            "title": "Bridges in graph",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/qrAub5z8FeA",
            "leetcodeUrl": "https://leetcode.com/problems/critical-connections-in-a-network/discuss/382385/find-bridges-in-a-graph",
            "hasAsciNotes": true
          },
          {
            "id": "496",
            "title": "Articulation point in graph",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/j1QDfU21iZk",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "498",
            "title": "Kosaraju's algorithm",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=V8qIqJxCioo&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=27",
            "leetcodeUrl": "https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/discuss/766485/kosaraju-algorithm-on",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 16,
    "id": "677",
    "title": "Dynamic Programming [Patterns and Problems]",
    "totalProblems": 55,
    "easyCount": 3,
    "mediumCount": 26,
    "hardCount": 26,
    "subcategories": [
      {
        "id": "474",
        "title": "Introduction to DP",
        "problems": [
          {
            "id": "1195",
            "title": "Introduction to DP",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tyB0ztf0DNY",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "467",
        "title": "1D DP",
        "problems": [
          {
            "id": "287",
            "title": "Climbing stairs",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/mLfjzJsN8us",
            "leetcodeUrl": "https://leetcode.com/problems/climbing-stairs/",
            "hasAsciNotes": true
          },
          {
            "id": "288",
            "title": "Frog Jump",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=EgG3jsGoPvQ",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "289",
            "title": "Frog jump with K distances",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=Kmh3rhyEtB8",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "291",
            "title": "Maximum sum of non adjacent elements",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=GrMBfJNk_NY",
            "leetcodeUrl": "https://leetcode.com/problems/house-robber/",
            "hasAsciNotes": true
          },
          {
            "id": "290",
            "title": "House robber",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=3WaxQMELSkw",
            "leetcodeUrl": "https://leetcode.com/problems/house-robber-ii/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "468",
        "title": "2D/3D DP and DP on Grids",
        "problems": [
          {
            "id": "292",
            "title": "Ninja's training",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=AE39gJYuRog",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2795",
            "title": "Grid Unique Paths : DP on Grids (DP8)",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=sdE0A2Oxofw",
            "leetcodeUrl": "https://leetcode.com/problems/unique-paths/",
            "hasAsciNotes": true
          },
          {
            "id": "300",
            "title": "Unique paths II",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=TmhpgXScLyY",
            "leetcodeUrl": "https://leetcode.com/problems/unique-paths-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "298",
            "title": "Minimum Falling Path Sum",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_rgTlyky1uQ",
            "leetcodeUrl": "https://leetcode.com/problems/minimum-path-sum/",
            "hasAsciNotes": true
          },
          {
            "id": "299",
            "title": "Triangle",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=SrP-PiLSYC0",
            "leetcodeUrl": "https://leetcode.com/problems/triangle/",
            "hasAsciNotes": true
          },
          {
            "id": "769",
            "title": "Ninja and his Friends",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=QGfn7JeXK54",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "473",
        "title": "DP on Subsequences",
        "problems": [
          {
            "id": "2804",
            "title": "Subset sum equal to target (DP- 14)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=fWX9xDmIzRI",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "321",
            "title": "Partition equal subset sum",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=7win3dcgo3k",
            "leetcodeUrl": "https://leetcode.com/problems/partition-equal-subset-sum/",
            "hasAsciNotes": true
          },
          {
            "id": "320",
            "title": "Partition a set into two subsets with minimum absolute sum difference",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=GS_OqZb2CWc",
            "leetcodeUrl": "https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/",
            "hasAsciNotes": true
          },
          {
            "id": "318",
            "title": "Count subsets with sum K",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=ZHyb-A2Mte4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "317",
            "title": "Count partitions with given difference",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=zoilQD1kYSg",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "541",
            "title": "Assign Cookies",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/DIX2p7vb9co?si=GofAIDimue-Av0Fi",
            "leetcodeUrl": "https://leetcode.com/problems/assign-cookies/",
            "hasAsciNotes": true
          },
          {
            "id": "2802",
            "title": "Minimum Coins (DP - 20)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=myPeWb3Y68A",
            "leetcodeUrl": "https://leetcode.com/problems/coin-change/",
            "hasAsciNotes": true
          },
          {
            "id": "324",
            "title": "Target sum",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=b3GD8263-PQ",
            "leetcodeUrl": "https://leetcode.com/problems/target-sum/",
            "hasAsciNotes": true
          },
          {
            "id": "2801",
            "title": "Coin Change 2 (DP - 22)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=HgyouUi11zk",
            "leetcodeUrl": "https://leetcode.com/problems/coin-change-2/",
            "hasAsciNotes": true
          },
          {
            "id": "325",
            "title": "Unbounded knapsack",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/OgvOZ6OrJoY",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2803",
            "title": "Rod Cutting Problem | (DP - 24)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/mO8XpGoJwuo",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "472",
        "title": "DP on Strings",
        "problems": [
          {
            "id": "308",
            "title": "Longest common subsequence",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/-zI4mrF2Pb4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2799",
            "title": "Print Longest Common Subsequence | (DP - 26)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/-zI4mrF2Pb4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "309",
            "title": "Longest common substring",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_wP9mWNPL5w",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "310",
            "title": "Longest palindromic subsequence",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/6i_T5kkfv4A",
            "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-subsequence/",
            "hasAsciNotes": true
          },
          {
            "id": "2800",
            "title": "Minimum insertions to make string palindrome | DP-29",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=xPBLEj41rFU",
            "leetcodeUrl": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
            "hasAsciNotes": true
          },
          {
            "id": "311",
            "title": "Minimum insertions or deletions to convert string A to B",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=yMnH0jrir0Q",
            "leetcodeUrl": "https://leetcode.com/problems/delete-operation-for-two-strings/",
            "hasAsciNotes": true
          },
          {
            "id": "313",
            "title": "Shortest common supersequence",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/xElxAuBcvsU",
            "leetcodeUrl": "https://leetcode.com/problems/shortest-common-supersequence/",
            "hasAsciNotes": true
          },
          {
            "id": "306",
            "title": "Distinct subsequences",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nVG7eTiD2bY",
            "leetcodeUrl": "https://leetcode.com/problems/distinct-subsequences/",
            "hasAsciNotes": true
          },
          {
            "id": "307",
            "title": "Edit distance",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/fJaKO8FbDdo",
            "leetcodeUrl": "https://leetcode.com/problems/edit-distance/",
            "hasAsciNotes": true
          },
          {
            "id": "314",
            "title": "Wildcard matching",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/ZmlQ3vgAOMo",
            "leetcodeUrl": "https://leetcode.com/problems/wildcard-matching/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "471",
        "title": "DP on Stocks",
        "problems": [
          {
            "id": "301",
            "title": "Best time to buy and sell stock",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/excAOvwF_Wk",
            "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            "hasAsciNotes": true
          },
          {
            "id": "302",
            "title": "Best time to buy and sell stock II",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/nGJmxkUJQGs",
            "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "303",
            "title": "Best time to buy and sell stock III",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/-uQGzhYj8BQ",
            "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/",
            "hasAsciNotes": true
          },
          {
            "id": "304",
            "title": "Best time to buy and sell stock IV",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/IV1dHbk5CDc",
            "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
            "hasAsciNotes": true
          },
          {
            "id": "56",
            "title": "Best Time to Buy and Sell Stock with Cooldown",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/IGIe46xw3YY",
            "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
            "hasAsciNotes": true
          },
          {
            "id": "305",
            "title": "Best time to buy and sell stock with transaction fees",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/k4eK-vEmnKg",
            "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "469",
        "title": "DP on LIS",
        "problems": [
          {
            "id": "636",
            "title": "Longest Increasing Subsequence",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/on2hvxBXJH4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "851",
            "title": "Print Longest Increasing Subsequence",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/IFfYfonAFGc",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2851",
            "title": "Longest Increasing Subsequence |(DP-43)",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/on2hvxBXJH4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "603",
            "title": "Largest Divisible Subset",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/gDuZwBW9VvM",
            "leetcodeUrl": "https://leetcode.com/problems/largest-divisible-subset/",
            "hasAsciNotes": true
          },
          {
            "id": "640",
            "title": "Longest String Chain",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/YY8iBaYcc4g",
            "leetcodeUrl": "https://leetcode.com/problems/longest-string-chain/",
            "hasAsciNotes": true
          },
          {
            "id": "633",
            "title": "Longest Bitonic Subsequence",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/y4vN0WNdrlg",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "780",
            "title": "Number of Longest Increasing Subsequences",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/cKVl1TFdNXg",
            "leetcodeUrl": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "475",
        "title": "MCM DP | Partition DP",
        "problems": [
          {
            "id": "327",
            "title": "Matrix chain multiplication",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/vRVfmbCFW7Y",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2806",
            "title": "Matrix Chain Multiplication | Bottom-Up|(DP-49)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/pDCXsbAw5Cg",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "328",
            "title": "Minimum cost to cut the stick",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/xwomavsC86c",
            "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
            "hasAsciNotes": true
          },
          {
            "id": "326",
            "title": "Burst balloons",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/Yz4LlDSlkns",
            "leetcodeUrl": "https://leetcode.com/problems/burst-balloons/",
            "hasAsciNotes": true
          },
          {
            "id": "276",
            "title": "Different Ways to Evaluate a Boolean Expression",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/MM7fXopgyjw",
            "leetcodeUrl": "https://leetcode.com/problems/parsing-a-boolean-expression/",
            "hasAsciNotes": true
          },
          {
            "id": "329",
            "title": "Palindrome partitioning II ",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/_H8V5hJUGd0",
            "leetcodeUrl": "https://leetcode.com/problems/palindrome-partitioning-ii/",
            "hasAsciNotes": true
          },
          {
            "id": "810",
            "title": "Partition Array for Maximum Sum",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/PhWWJmaKfMc",
            "leetcodeUrl": "https://leetcode.com/problems/partition-array-for-maximum-sum/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "470",
        "title": "DP on Squares",
        "problems": [
          {
            "id": "2860",
            "title": "Maximum Rectangle Area with all 1's|(DP-55)",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/tOylVCugy9k",
            "leetcodeUrl": "https://leetcode.com/problems/maximal-rectangle/",
            "hasAsciNotes": true
          },
          {
            "id": "2395",
            "title": "Count Square Submatrices with All Ones|(DP-56)",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/auS1fynpnjo",
            "leetcodeUrl": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 17,
    "id": "690",
    "title": "Tries",
    "totalProblems": 7,
    "easyCount": 1,
    "mediumCount": 2,
    "hardCount": 4,
    "subcategories": [
      {
        "id": "516",
        "title": "Theory",
        "problems": [
          {
            "id": "1028",
            "title": "Trie Implementation and Operations",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=dBGUmUQhjaM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp",
            "leetcodeUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
            "hasAsciNotes": true
          }
        ]
      },
      {
        "id": "515",
        "title": "Problems",
        "problems": [
          {
            "id": "1027",
            "title": "Trie Implementation and Advanced Operations",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1023",
            "title": "Longest Word with All Prefixes",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=AWnBa91lThI&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=3",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1026",
            "title": "Number of distinct substrings in a string",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=RV0QeTyHZxo&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=4",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "2390",
            "title": "Bit PreRequisites for TRIE Problems",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": "https://youtu.be/5iyuU4hQFrw",
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "1024",
            "title": "Maximum XOR of two numbers in an array",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=EIhAwfHubE8&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=6",
            "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
            "hasAsciNotes": true
          },
          {
            "id": "1025",
            "title": "Maximum Xor with an element from an array",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": "https://www.youtube.com/watch?v=Q8LhG9Pi5KM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=7",
            "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  },
  {
    "stepNumber": 18,
    "id": "688",
    "title": "Strings",
    "totalProblems": 9,
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 7,
    "subcategories": [
      {
        "id": "514",
        "title": "Hard Problems",
        "problems": [
          {
            "id": "983",
            "title": "Minimum number of bracket reversals to make an expression balanced",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
            "hasAsciNotes": true
          },
          {
            "id": "982",
            "title": "Count and say",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/count-and-say/",
            "hasAsciNotes": true
          },
          {
            "id": "2399",
            "title": "Hashing In Strings | Theory",
            "difficulty": "Easy",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "979",
            "title": "Rabin Karp Algorithm",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/repeated-string-match/discuss/416144/Rabin-Karp-algorithm-C%2B%2B-implementation",
            "hasAsciNotes": true
          },
          {
            "id": "981",
            "title": "Z function",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "977",
            "title": "KMP Algorithm or LPS array",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/implement-strstr/",
            "hasAsciNotes": true
          },
          {
            "id": "980",
            "title": "Shortest Palindrome",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": null,
            "hasAsciNotes": true
          },
          {
            "id": "978",
            "title": "Longest happy prefix",
            "difficulty": "Hard",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/longest-happy-prefix/",
            "hasAsciNotes": true
          },
          {
            "id": "231",
            "title": "Count Palindromic Subsequences",
            "difficulty": "Medium",
            "guideUrl": null,
            "youtubeUrl": null,
            "leetcodeUrl": "https://leetcode.com/problems/count-palindromic-subsequences/",
            "hasAsciNotes": true
          }
        ]
      }
    ]
  }
];

export function getAllProblems(): AsciDsaProblem[] {
  const problems: AsciDsaProblem[] = [];
  for (const step of A2Z_SHEET_STEPS) {
    for (const sub of step.subcategories) {
      problems.push(...sub.problems);
    }
  }
  return problems;
}

export function getStepByNumber(stepNum: number): AsciDsaStep | undefined {
  return A2Z_SHEET_STEPS.find(s => s.stepNumber === stepNum);
}
