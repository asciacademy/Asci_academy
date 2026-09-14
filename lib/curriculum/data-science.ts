import { CurriculumCourse } from "../curriculum-data"

export const DATA_SCIENCE_COURSES: CurriculumCourse[] = [
  // =========================================================================
  // COURSE 1: GOOGLE DATA ANALYTICS PROFESSIONAL CERTIFICATE
  // =========================================================================
  {
    id: "google-data-analytics",
    slug: "google-data-analytics",
    title: "Google Data Analytics Professional Certificate",
    description: "The industry-standard 8-course credential: ask business questions, prepare and clean datasets, analyze trends with R and SQL, and share visual narratives.",
    category: "Data Science",
    level: "Beginner",
    weeks: "24 Weeks",
    duration_hours: 180,
    lessons: 72,
    projects: 5,
    certificate: "Google Professional Certificate",
    is_premium: false,
    tools: ["SQL (BigQuery)", "Spreadsheets", "Tableau", "R Programming", "RStudio", "Kaggle"],
    highlights: [
      "The 6 Phases of Analysis: Ask, Prepare, Process, Analyze, Share, Act",
      "Advanced SQL Data Transformation (Joins, Unions, Subqueries & Window Functions)",
      "Data Cleaning Protocols: Handling Nulls, Inconsistencies, and Type Casts",
      "Statistical Programming with R: DataFrames, dplyr, and ggplot2",
      "Interactive Executive Dashboards and Visual Storytelling with Tableau"
    ],
    modules: [
      {
        id: "gda-mod-1",
        title: "Course 1: Foundations — Data, Data, Everywhere",
        sequence_order: 1,
        description: "Explore the analytical mindset, data ecosystems, and the 6 phases of data analysis.",
        lessons: [
          {
            id: "gda-1-1",
            title: "1.1 The Analytical Thinking Framework",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Apply the 6 analytical phases: Ask, Prepare, Process, Analyze, Share, Act.",
            content: `### The 6 Phases of Analysis
Google's data methodology structures analytical inquiries into six continuous phases:
1. **Ask:** Define the business problem and understand stakeholder expectations.
2. **Prepare:** Collect, extract, and store data securely while identifying bias.
3. **Process:** Clean dirty data, verify integrity, and check formatting errors.
4. **Analyze:** Perform calculations, group data, and identify statistical patterns.
5. **Share:** Visualize insights through charts and present findings clearly.
6. **Act:** Apply insights to resolve the initial business challenge.

\`\`\`python
phases = ["ASK", "PREPARE", "PROCESS", "ANALYZE", "SHARE", "ACT"]
print(f"TOTAL_PHASES:{len(phases)}")
\`\`\``,
            challenge_data: {
              initialCode: `phases = ["ASK", "PREPARE", "PROCESS", "ANALYZE", "SHARE", "ACT"]\nprint(len(phases))\n`,
              expectedOutput: "6",
              instructions: "Print the number of Google data analysis phases (6)."
            }
          }
        ]
      },
      {
        id: "gda-mod-2",
        title: "Course 2: Ask Questions to Make Data-Driven Decisions",
        sequence_order: 2,
        description: "Formulate SMART business questions and establish clear stakeholder metrics.",
        lessons: [
          {
            id: "gda-2-1",
            title: "2.1 The SMART Questioning Methodology",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 45,
            description: "Structure questions that are Specific, Measurable, Action-oriented, Relevant, and Time-bound.",
            content: `### SMART Criteria
- **Specific:** Does the question address a distinct metric?
- **Measurable:** Can quantitative numbers be assigned to outcomes?
- **Action-oriented:** Will findings steer business actions?
- **Relevant:** Does it support primary organizational goals?
- **Time-bound:** What period is being measured?`
          }
        ]
      },
      {
        id: "gda-mod-3",
        title: "Course 3: Prepare Data for Exploration",
        sequence_order: 3,
        description: "Verify data integrity, identify sampling bias, and assess open vs proprietary data sources.",
        lessons: [
          {
            id: "gda-3-1",
            title: "3.1 Data Ethics & Privacy Standards",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 50,
            description: "Understand Personally Identifiable Information (PII) anonymization and data governance.",
            content: `Data analysts must safeguard user privacy by stripping or hashing PII (names, SSNs, phone numbers) before datasets enter shared analytics warehouses.`
          }
        ]
      },
      {
        id: "gda-mod-4",
        title: "Course 4: Process Data from Dirty to Clean",
        sequence_order: 4,
        description: "Detect duplicate rows, coerce corrupted data types, and cleanse datasets using SQL.",
        lessons: [
          {
            id: "gda-4-1",
            title: "4.1 SQL Data Cleaning with TRIM & COALESCE",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Cleanse leading whitespace and replace NULL values in SQL.",
            content: `### Cleaning Functions in SQL
* \`TRIM(string)\`: Removes leading and trailing whitespaces.
* \`COALESCE(val, fallback)\`: Replaces NULL values with default fallbacks.
* \`CAST(column AS INT64)\`: Normalizes numeric representations.

\`\`\`python
data = ["  alpha ", "beta", None]
cleaned = [x.strip() if x else "DEFAULT" for x in data]
print(cleaned)
\`\`\``,
            challenge_data: {
              initialCode: `raw = ["  apple  ", "banana ", None]\ncleaned = [x.strip() if x else "UNKNOWN" for x in raw]\nprint("CLEANED:", cleaned)\n`,
              expectedOutput: "CLEANED: ['apple', 'banana', 'UNKNOWN']",
              instructions: "Strip whitespace and replace None with 'UNKNOWN', then print the list."
            }
          }
        ]
      },
      {
        id: "gda-mod-5",
        title: "Course 5: Analyze Data to Answer Questions",
        sequence_order: 5,
        description: "Perform SQL aggregations, multi-table JOINs, subqueries, and window functions.",
        lessons: [
          {
            id: "gda-5-1",
            title: "5.1 SQL Grouping & Aggregations",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Compute grouped summaries, counts, and averages across dimensional categories.",
            content: `### Grouped Aggregations
Aggregate rows using \`GROUP BY\` and filter aggregations with \`HAVING\`:

\`\`\`python
orders = [("Tech", 120), ("Tech", 80), ("Food", 30)]
totals = {}
for cat, val in orders:
    totals[cat] = totals.get(cat, 0) + val
print(totals)
\`\`\``,
            challenge_data: {
              initialCode: `orders = [("Tech", 100), ("Tech", 50), ("Office", 40)]\ntotals = {}\nfor cat, val in orders:\n    totals[cat] = totals.get(cat, 0) + val\nprint("TECH_TOTAL:", totals["Tech"])\n`,
              expectedOutput: "TECH_TOTAL: 150",
              instructions: "Sum values for category 'Tech' and output 'TECH_TOTAL: 150'."
            }
          }
        ]
      },
      {
        id: "gda-mod-6",
        title: "Course 6: Share Data Through the Art of Visualization",
        sequence_order: 6,
        description: "Design stakeholder-ready dashboards and visual presentations using Tableau.",
        lessons: [
          {
            id: "gda-6-1",
            title: "6.1 Dashboard Design Principles in Tableau",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 60,
            description: "Use visual hierarchy, color palette restraint, and interactive filters for executive clarity.",
            content: `Effective dashboards answer the user's primary business question within 5 seconds. Use clean layouts, consistent legends, and avoid clutter.`
          }
        ]
      },
      {
        id: "gda-mod-7",
        title: "Course 7: Data Analysis with R Programming",
        sequence_order: 7,
        description: "Master RStudio, vectors, data frames, dplyr pipelines, and ggplot2 graphics.",
        lessons: [
          {
            id: "gda-7-1",
            title: "7.1 Tidyverse Data Wrangling & Pipes",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Chain transformations using R's pipe operator (%>%) or modern native pipe (|>).",
            content: `### Chained Data Pipelines
In R's Tidyverse, operations flow sequentially through pipes:
\`\`\`r
library(dplyr)
cleaned_df <- raw_df %>%
  filter(sales > 100) %>%
  mutate(tax = sales * 0.08)
\`\`\``,
            challenge_data: {
              initialCode: `sales = [50, 120, 200, 80]\n# Filter sales > 100\nfiltered = [s for s in sales if s > 100]\nprint("FILTERED:", filtered)\n`,
              expectedOutput: "FILTERED: [120, 200]",
              instructions: "Filter values greater than 100 and print 'FILTERED: [120, 200]'."
            }
          }
        ]
      },
      {
        id: "gda-mod-8",
        title: "Course 8: Google Data Analytics Capstone",
        sequence_order: 8,
        description: "Complete an end-to-end case study: ask questions, clean data, analyze trends, and present recommendations.",
        lessons: [
          {
            id: "gda-8-1",
            title: "8.1 Capstone Case Study Defense",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 100,
            description: "Document and publish your verified analytics case study to your portfolio.",
            content: `The capstone project demonstrates end-to-end mastery. Learners analyze real-world datasets (such as bike-share ridership or fitness-tracker telemetry) to deliver actionable business insights.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 2: DATA SCIENCE WITH PYTHON (FREECODECAMP)
  // =========================================================================
  {
    id: "data-science-python",
    slug: "data-science-python",
    title: "Data Science with Python (freeCodeCamp)",
    description: "300 hours of hands-on data manipulation, NumPy arrays, Pandas DataFrames, Matplotlib plotting, statistical modeling, and 5 verified capstone projects.",
    category: "Data Science",
    level: "Intermediate",
    weeks: "16 Weeks",
    duration_hours: 120,
    lessons: 54,
    projects: 5,
    certificate: "freeCodeCamp Verified Certificate",
    is_premium: false,
    tools: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Jupyter", "SciPy"],
    highlights: [
      "NumPy Vectorization: Strides, Broadcasting & Memory Alignment",
      "High-Performance Data Ingestion and Indexing with Pandas",
      "Exploratory Data Analysis (EDA): Quantiles, Outliers & Normalization",
      "Statistical Hypothesis Testing, Pearson Correlation & Regressions",
      "5 Verified Real-World Capstones Required for Certification"
    ],
    modules: [
      {
        id: "fcc-mod-1",
        title: "Module 1: Python Data Foundations & Statistics",
        sequence_order: 1,
        description: "Master descriptive statistics, variances, and standard deviation calculations.",
        lessons: [
          {
            id: "fcc-1-1",
            title: "1.1 Mean, Median & Variance from Scratch",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 60,
            description: "Compute the arithmetic mean and sample variance of numeric datasets.",
            content: `### Mathematical Definitions
$$\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i$$
$$s^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2$$`,
            challenge_data: {
              initialCode: `nums = [10, 20, 30, 40]\nmean = sum(nums) / len(nums)\nprint("MEAN:", int(mean))\n`,
              expectedOutput: "MEAN: 25",
              instructions: "Compute the mean and print 'MEAN: 25'."
            }
          }
        ]
      },
      {
        id: "fcc-mod-2",
        title: "Module 2: NumPy N-Dimensional Arrays & Vectorization",
        sequence_order: 2,
        description: "Eliminate slow Python loops using vectorized C-level array broadcasting.",
        lessons: [
          {
            id: "fcc-2-1",
            title: "2.1 Array Broadcasting & Element-wise Arithmetic",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Apply scalar broadcasting across multi-dimensional matrices.",
            content: `### NumPy Broadcasting
Broadcasting allows arithmetic operations between arrays of differing shapes by stretching singleton dimensions without allocating memory copies.`,
            challenge_data: {
              initialCode: `vec = [1, 2, 3]\n# Multiply each element by scalar 10\nscaled = [x * 10 for x in vec]\nprint("SCALED:", scaled)\n`,
              expectedOutput: "SCALED: [10, 20, 30]",
              instructions: "Scale the vector by 10 and print 'SCALED: [10, 20, 30]'."
            }
          }
        ]
      },
      {
        id: "fcc-mod-3",
        title: "Module 3: Pandas DataFrames & Series",
        sequence_order: 3,
        description: "Filter, group, merge, and transform tabular records with Pandas.",
        lessons: [
          {
            id: "fcc-3-1",
            title: "3.1 Boolean Indexing & Groupby Aggregations",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Filter rows matching multiple predicates and aggregate by group.",
            content: `### Pandas Boolean Indexing
Filter records using vector conditions (\`df[df['age'] > 21]\`) and compute group aggregations (\`df.groupby('dept')['salary'].mean()\`).`,
            challenge_data: {
              initialCode: `records = [\n    {"dept": "Engineering", "salary": 120000},\n    {"dept": "Engineering", "salary": 140000},\n    {"dept": "Design", "salary": 90000}\n]\neng_salaries = [r["salary"] for r in records if r["dept"] == "Engineering"]\navg_eng = sum(eng_salaries) / len(eng_salaries)\nprint("AVG_ENG_SALARY:", int(avg_eng))\n`,
              expectedOutput: "AVG_ENG_SALARY: 130000",
              instructions: "Calculate the average salary for Engineering and output 'AVG_ENG_SALARY: 130000'."
            }
          }
        ]
      },
      {
        id: "fcc-mod-4",
        title: "Module 4: Data Cleaning & Feature Engineering",
        sequence_order: 4,
        description: "Handle missing values with imputation, encode categorical variables, and normalize scales.",
        lessons: [
          {
            id: "fcc-4-1",
            title: "4.1 Imputation & Z-Score Outlier Detection",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 70,
            description: "Detect anomalies outside 3 standard deviations using Z-score normalization.",
            content: `$$Z = \\frac{x - \\mu}{\\sigma}$$
Values where $|Z| > 3.0$ represent severe outliers that skew linear models and parameter estimations.`
          }
        ]
      },
      {
        id: "fcc-mod-5",
        title: "Module 5: Visualization with Matplotlib & Seaborn",
        sequence_order: 5,
        description: "Generate scatter plots, distribution histograms, and heatmaps.",
        lessons: [
          {
            id: "fcc-5-1",
            title: "5.1 Visualizing Correlation Matrices",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 75,
            description: "Plot heatmaps of Pearson correlation coefficients between features.",
            content: `A correlation matrix quantifies linear relationships between continuous variables from $-1.0$ (perfect inverse correlation) to $+1.0$ (perfect positive correlation).`
          }
        ]
      },
      {
        id: "fcc-mod-6",
        title: "Module 6: Capstone Projects (5 Projects)",
        sequence_order: 6,
        description: "Build the 5 required projects: Mean-Variance-Std Dev Calculator, Demographic Data Analyzer, Medical Data Visualizer, Page View Time Series Visualizer, and Sea Level Predictor.",
        lessons: [
          {
            id: "fcc-6-1",
            title: "6.1 Mean-Variance-Standard Deviation Calculator",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Build a matrix statistics engine that calculates 3x3 array metrics along both axes.",
            content: `### Capstone 1: Matrix Metrics
Given a list of 9 numbers, convert into a $3 \\times 3$ matrix and compute mean, variance, standard deviation, max, min, and sum along axis 0, axis 1, and flattened.`,
            challenge_data: {
              initialCode: `matrix = [\n    [0, 1, 2],\n    [3, 4, 5],\n    [6, 7, 8]\n]\nrow_sums = [sum(row) for row in matrix]\nprint("ROW_SUMS:", row_sums)\n`,
              expectedOutput: "ROW_SUMS: [3, 12, 21]",
              instructions: "Calculate the sum of each row and output 'ROW_SUMS: [3, 12, 21]'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 3: DATA SCIENCE: VISUALIZATION (HARVARDX)
  // =========================================================================
  {
    id: "data-science-visualization",
    slug: "data-science-visualization",
    title: "Data Science: Visualization (HarvardX)",
    description: "Master exploratory data analysis and visual communication using ggplot2, principles of graphic design, color theory, and spotting visual misinformation.",
    category: "Data Science",
    level: "Beginner",
    weeks: "8 Weeks",
    duration_hours: 36,
    lessons: 24,
    projects: 2,
    certificate: "HarvardX Verified Certificate",
    is_premium: false,
    tools: ["R", "ggplot2", "Tidyverse", "RMarkdown", "ColorBrewer"],
    highlights: [
      "The Grammar of Graphics: Data, Aesthetic Mappings, Geometries & Faceting",
      "Choosing Correct Visual Formats (Scatter, Boxplots, Ridgelines, Violin plots)",
      "Spotting Misleading Charts: Truncated Y-Axes & Distorted Aspect Ratios",
      "High-Density Displays: Communicating Multivariate Trends with Precision"
    ],
    modules: [
      {
        id: "harv-vis-mod-1",
        title: "Module 1: The Grammar of Graphics & ggplot2",
        sequence_order: 1,
        description: "Deconstruct Leland Wilkinson's Grammar of Graphics framework into layered code.",
        lessons: [
          {
            id: "harv-vis-1-1",
            title: "1.1 Layers of the Grammar of Graphics",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 60,
            description: "Combine Data, Aesthetics (aes), Geometries (geom), and Scales.",
            content: `### The Grammar Hierarchy
1. **Data:** The tidy data frame.
2. **Aesthetics (\`aes\`):** Mapping columns to $x$, $y$, color, size, or shape.
3. **Geometries (\`geom\`):** Visual shapes (points, bars, lines).
4. **Faceting:** Splitting plots across categorical subsets.`,
            challenge_data: {
              initialCode: `layers = ["data", "aes", "geom", "scales", "facets"]\nprint("TOTAL_LAYERS:", len(layers))\n`,
              expectedOutput: "TOTAL_LAYERS: 5",
              instructions: "Output the count of core graphic grammar layers: 'TOTAL_LAYERS: 5'."
            }
          }
        ]
      },
      {
        id: "harv-vis-mod-2",
        title: "Module 2: Aesthetic Mappings & Coordinates",
        sequence_order: 2,
        description: "Select effective coordinates, log scales, and colorblind-safe palettes.",
        lessons: [
          {
            id: "harv-vis-2-1",
            title: "2.1 Log-Scale Transformations for Skewed Data",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Apply log transformations to visualize multiplicative and power-law distributions.",
            content: `### Logarithmic Scales
When visualizing data spanning multiple orders of magnitude (e.g., GDP per capita, population sizes), linear scales compress 90% of the observations into an unreadable cluster. Transforming axes with $\\log_{10}$ restores visual interpretability.`,
            challenge_data: {
              initialCode: `import math\nvals = [10, 100, 1000]\nlogs = [int(math.log10(v)) for v in vals]\nprint("LOGS:", logs)\n`,
              expectedOutput: "LOGS: [1, 2, 3]",
              instructions: "Compute log10 of the values and print 'LOGS: [1, 2, 3]'."
            }
          }
        ]
      },
      {
        id: "harv-vis-mod-3",
        title: "Module 3: Selecting Effective Visualizations",
        sequence_order: 3,
        description: "Compare histograms, kernel density estimates, boxplots, and scatter plots.",
        lessons: [
          {
            id: "harv-vis-3-1",
            title: "3.1 Distributions: Boxplots vs Histograms",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 65,
            description: "Understand the five-number summary: min, Q1, median, Q3, and max.",
            content: `Box plots highlight the interquartile range (IQR) and potential outliers ($1.5 \\times \\text{IQR}$), making them ideal for comparing distributions across multiple categories side-by-side.`
          }
        ]
      },
      {
        id: "harv-vis-mod-4",
        title: "Module 4: Spotting Visual Misinformation & Design Ethics",
        sequence_order: 4,
        description: "Detect truncated axes, dual-axis scale mismatches, and misleading 3D projections.",
        lessons: [
          {
            id: "harv-vis-4-1",
            title: "4.1 The Truncated Y-Axis Fallacy",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Enforce zero-baseline rules on bar charts to preserve visual area proportions.",
            content: `### The Zero Baseline Rule
In bar charts, the numerical value is encoded by the **area and height** of the bar. Truncating the y-axis (e.g. starting at 95 instead of 0) visually exaggerates a 1% difference into a 500% gap.`,
            challenge_data: {
              initialCode: `def is_valid_bar_baseline(y_min):\n    return y_min == 0\n\nprint("IS_VALID:", is_valid_bar_baseline(0))\n`,
              expectedOutput: "IS_VALID: True",
              instructions: "Verify zero baseline requirement and output 'IS_VALID: True'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 4: DATA SCIENCE: PROBABILITY & INFERENCE (HARVARDX)
  // =========================================================================
  {
    id: "data-science-probability",
    slug: "data-science-probability",
    title: "Data Science: Probability & Statistical Inference (HarvardX)",
    description: "Master probability theory, Monte Carlo approximations, discrete and continuous distributions, the Central Limit Theorem, and hypothesis testing. Direct from the HarvardX curriculum.",
    category: "Data Science",
    level: "Beginner",
    weeks: "8 Weeks",
    duration_hours: 40,
    lessons: 26,
    projects: 3,
    certificate: "HarvardX Verified Certificate",
    is_premium: false,
    tools: ["Python", "SciPy", "NumPy", "Monte Carlo", "Matplotlib"],
    highlights: [
      "Probability Axioms, Independent Events & Conditional Probability (Bayes Theorem)",
      "Monte Carlo Simulation: Approximating Complex Integrals and Probabilities",
      "Continuous Random Variables, Normal Density & Standard Z-Scores",
      "The Central Limit Theorem (CLT) & Sample Average Convergence",
      "Hypothesis Testing, Confidence Intervals (95%), and Two-Tailed P-Values"
    ],
    modules: [
      {
        id: "prob-mod-1",
        title: "Module 1: Probability Axioms & Combinatorics",
        sequence_order: 1,
        description: "Foundations of discrete probability, sample spaces, and independence.",
        lessons: [
          {
            id: "prob-1-1",
            title: "1.1 Independent Events & Conditional Probability",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 60,
            description: "Compute conditional probability: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$.",
            content: `### Bayes Rule Foundation
For events $A$ and $B$ where $P(B) > 0$:
$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$
When $A$ and $B$ are independent, $P(A \\cap B) = P(A)P(B)$.`,
            challenge_data: {
              initialCode: `p_a_and_b = 0.12\np_b = 0.40\np_a_given_b = p_a_and_b / p_b\nprint("P(A|B):", round(p_a_given_b, 2))\n`,
              expectedOutput: "P(A|B): 0.3",
              instructions: "Compute conditional probability P(A|B) and print 'P(A|B): 0.3'."
            }
          }
        ]
      },
      {
        id: "prob-mod-2",
        title: "Module 2: Monte Carlo Simulations",
        sequence_order: 2,
        description: "Simulate random sampling to approximate expected values and win probabilities.",
        lessons: [
          {
            id: "prob-2-1",
            title: "2.1 Estimating Pi via Monte Carlo Circle Quadrant",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Ratio of random darts falling inside unit circle quadrant converges to $\\frac{\\pi}{4}$.",
            content: `### Monte Carlo Approximation
Sample $N$ points $(x, y) \\in [0, 1]^2$. Points inside $x^2 + y^2 \\le 1$ represent area $\\frac{\\pi}{4}$. Therefore:
$$\\pi \\approx 4 \\times \\frac{N_{inside}}{N}$$`,
            challenge_data: {
              initialCode: `inside = 785\ntotal = 1000\npi_estimate = 4 * (inside / total)\nprint("PI_ESTIMATE:", round(pi_estimate, 2))\n`,
              expectedOutput: "PI_ESTIMATE: 3.14",
              instructions: "Estimate pi from the simulated sample and print 'PI_ESTIMATE: 3.14'."
            }
          }
        ]
      },
      {
        id: "prob-mod-3",
        title: "Module 3: Continuous Variables & The Central Limit Theorem",
        sequence_order: 3,
        description: "The distribution of sample means approaches Gaussian normality regardless of parent population shape.",
        lessons: [
          {
            id: "prob-3-1",
            title: "3.1 Standard Error of the Mean (SEM)",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Calculate standard error: $\\text{SE} = \\frac{\\sigma}{\\sqrt{n}}$.",
            content: `### Sample Mean Standard Error
As sample size $n$ quadruples, the variability of the sample mean drops by half:
$$\\text{SE} = \\frac{\\sigma}{\\sqrt{n}}$$`,
            challenge_data: {
              initialCode: `import math\nsigma = 10\nn = 100\nsem = sigma / math.sqrt(n)\nprint("SEM:", round(sem, 1))\n`,
              expectedOutput: "SEM: 1.0",
              instructions: "Calculate standard error of the mean and print 'SEM: 1.0'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 5: IBM DATA SCIENCE PROFESSIONAL CERTIFICATE
  // =========================================================================
  {
    id: "ibm-data-science",
    slug: "ibm-data-science",
    title: "IBM Data Science Professional Certificate",
    description: "Launch your career with IBM's industry-standard 10-course program: data science methodology, relational databases, scikit-learn models, and SpaceX rocket landing prediction capstone.",
    category: "Data Science",
    level: "Beginner",
    weeks: "20 Weeks",
    duration_hours: 110,
    lessons: 60,
    projects: 5,
    certificate: "IBM Professional Certificate",
    is_premium: false,
    tools: ["Python", "SQL (Db2/PostgreSQL)", "Scikit-Learn", "Folium", "Dash", "Jupyter"],
    highlights: [
      "The 10-Stage Data Science Methodology (Business Understanding to Feedback)",
      "Database Querying with SQL, Subqueries & Multiple Table Relational Joins",
      "Machine Learning with Scikit-Learn: Classification, Regression & Clustering",
      "Interactive Geospatial Visualizations with Folium & Plotly Dash Apps",
      "SpaceX Falcon 9 First-Stage Landing Prediction Machine Learning Capstone"
    ],
    modules: [
      {
        id: "ibm-ds-mod-1",
        title: "Module 1: The Data Science Methodology",
        sequence_order: 1,
        description: "The 10-stage lifecycle formulated by IBM for end-to-end data analytics.",
        lessons: [
          {
            id: "ibm-1-1",
            title: "1.1 The Ten Iterative Stages",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "From Business Understanding to Analytic Approach, Data Requirements, and Feedback.",
            content: `### The IBM Data Lifecycle
1. Business Understanding
2. Analytic Approach
3. Data Requirements
4. Data Collection
5. Data Understanding
6. Data Preparation
7. Modeling
8. Evaluation
9. Deployment
10. Feedback`,
            challenge_data: {
              initialCode: `stages = 10\nprint("STAGES_COUNT:", stages)\n`,
              expectedOutput: "STAGES_COUNT: 10",
              instructions: "Print the total count of IBM data methodology stages: 'STAGES_COUNT: 10'."
            }
          }
        ]
      },
      {
        id: "ibm-ds-mod-2",
        title: "Module 2: Applied Machine Learning with Scikit-Learn",
        sequence_order: 2,
        description: "Train Logistic Regression, Support Vector Machines (SVM), Decision Trees, and K-Nearest Neighbors.",
        lessons: [
          {
            id: "ibm-2-1",
            title: "2.1 Train/Test Split & Accuracy Scoring",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Partition datasets 80/20 to prevent data leakage and evaluate true generalization.",
            content: `### Out-of-Sample Evaluation
Evaluating a model on the data it trained on yields optimistic overfit scores. Always hold out an unseen test set.`,
            challenge_data: {
              initialCode: `total_samples = 1000\ntest_ratio = 0.20\ntest_size = int(total_samples * test_ratio)\ntrain_size = total_samples - test_size\nprint(f"TRAIN:{train_size}_TEST:{test_size}")\n`,
              expectedOutput: "TRAIN:800_TEST:200",
              instructions: "Calculate 80/20 train/test split sizes and print 'TRAIN:800_TEST:200'."
            }
          }
        ]
      },
      {
        id: "ibm-ds-mod-3",
        title: "Module 3: Capstone — SpaceX Falcon 9 Landing Prediction",
        sequence_order: 3,
        description: "Collect real flight telemetry via SpaceX REST API, predict booster reusability, and build Dash dashboard.",
        lessons: [
          {
            id: "ibm-3-1",
            title: "3.1 Booster Landing Classification Evaluation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Compute the F1-Score: $2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}$.",
            content: `### F1-Score Harmonic Mean
When classes are imbalanced (e.g. successful landings vs failed crashes), the F1-score balances precision and recall:
$$F_1 = 2 \\times \\frac{P \\times R}{P + R}$$`,
            challenge_data: {
              initialCode: `precision = 0.85\nrecall = 0.80\nf1 = 2 * (precision * recall) / (precision + recall)\nprint("F1_SCORE:", round(f1, 2))\n`,
              expectedOutput: "F1_SCORE: 0.82",
              instructions: "Compute the F1 score and print 'F1_SCORE: 0.82'."
            }
          }
        ]
      }
    ]
  }
]

