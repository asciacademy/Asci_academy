export interface CareerRoleCourse {
  id: string
  slug: string
  title: string
  partner: string
  partnerLogo?: string
  partnerType?: string
  thumbnail: string
  rating: number
  reviews: string
  level: "Beginner" | "Intermediate" | "Advanced"
  credential: string
  duration: string
  badge?: string
  skills: string[]
  category: string
  description: string
  enrollUrl?: string
}

export interface CareerRoleTrack {
  id: string
  title: string
  headline: string
  roleCategory: string
  badgeText: string
  description: string
  goalLabel: string
  goalUrl: string
  inDemandSkills: string[]
  courses: CareerRoleCourse[]
}

const THUMBNAILS = {
  ai_upenn: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  ml_stanford: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  google_cloud_ml: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  data_foundations: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  explainable_ai: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  ibm_ai_dev: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  ibm_ai_eng: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  michigan_mech: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  duke_mlops: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
  azure_ai: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
  ibm_ml: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
  ibm_swe: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",

  ibm_sql_py: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  ibm_analyst: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  ibm_intro_ds: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
  ibm_data_eng: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  meta_analyst: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  ucdavis_sql: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
  google_analyst: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  umich_python: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  ibm_datascience: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  edureka_analytics: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  ibm_applied_ds: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",

  google_cyber: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  ibm_cyber_analyst: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  ibm_cyber_fund: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",

  web_master: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  dsa_master: "https://images.unsplash.com/photo-1516116211227-bbc15433d76e?auto=format&fit=crop&w=1200&q=80",
}

export const CAREER_ROLE_TRACKS: CareerRoleTrack[] = [
  // =========================================================================
  // ROLE 1: MACHINE LEARNING ENGINEER
  // =========================================================================
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    headline: "In-demand skills for Machine Learning Engineer roles",
    roleCategory: "AI & ML",
    badgeText: "High Demand · ₹28L–₹45L Avg Salary",
    description: "Master probability, neural architectures, PyTorch, TensorFlow, MLOps, and agentic workflows to train and deploy production AI models.",
    goalLabel: "Edit goal",
    goalUrl: "https://www.coursera.org/career-academy/roles/machine-learning-engineer",
    inDemandSkills: [
      "Probability & Statistics",
      "Deep Learning",
      "PyTorch",
      "TensorFlow",
      "MLOps",
      "Model Evaluation",
      "Generative AI",
      "Agentic systems"
    ],
    courses: [
      {
        id: "ai-machinelearning-essentials",
        slug: "ai-machinelearning-essentials",
        title: "AI and Machine Learning Essentials with Python",
        partner: "University of Pennsylvania",
        partnerLogo: "upenn",
        partnerType: "University",
        thumbnail: THUMBNAILS.ai_upenn,
        rating: 4.5,
        reviews: "60 reviews",
        level: "Intermediate",
        credential: "Specialization (4 courses)",
        duration: "4 months",
        badge: "Top recommendation",
        category: "AI & ML",
        description: "Master probability, statistical modeling, logistic regression, model optimization, and agentic systems using Python and PyTorch.",
        skills: [
          "Probability & Statistics",
          "Deep Learning",
          "Algorithms",
          "Python Programming",
          "Probability",
          "Artificial Intelligence",
          "Logistic Regression",
          "Model Optimization",
          "PyTorch",
          "Agentic systems"
        ]
      },
      {
        id: "machine-learning-introduction",
        slug: "machine-learning-introduction",
        title: "Machine Learning",
        partner: "Multiple educators",
        partnerLogo: "deeplearning",
        partnerType: "AI Research Institute",
        thumbnail: THUMBNAILS.ml_stanford,
        rating: 4.9,
        reviews: "39K reviews",
        level: "Beginner",
        credential: "Specialization (3 courses)",
        duration: "3 months",
        badge: "Top AI program",
        category: "AI & ML",
        description: "The gold standard ML curriculum by Andrew Ng. Master supervised, unsupervised, and reinforcement learning with TensorFlow.",
        skills: [
          "TensorFlow",
          "Classification Algorithms",
          "Model Training",
          "Supervised Learning",
          "Decision Tree Learning",
          "Reinforcement Learning",
          "Scikit Learn",
          "Responsible AI",
          "NumPy"
        ]
      },
      {
        id: "google-cloud-ml-engineer",
        slug: "google-cloud-ml-engineer",
        title: "Preparing for Google Cloud Certification: Machine Learning Engineer",
        partner: "Google Cloud",
        partnerLogo: "google",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.google_cloud_ml,
        rating: 4.4,
        reviews: "5K reviews",
        level: "Intermediate",
        credential: "Professional Certificate (6 courses)",
        duration: "4 months",
        badge: "Top AI program",
        category: "AI & ML",
        description: "Design, build, and productionize end-to-end ML systems on Google Cloud Platform with MLOps and Vertex AI.",
        skills: [
          "Google Cloud Platform",
          "TensorFlow",
          "Model Deployment",
          "MLOps",
          "Feature Engineering",
          "CI/CD",
          "Prompt Engineering",
          "Generative AI",
          "Dataflow",
          "Cloud Computing"
        ]
      },
      {
        id: "data-science-foundations-ml",
        slug: "data-science-foundations",
        title: "Data Science Foundations",
        partner: "Multiple educators",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.data_foundations,
        rating: 4.6,
        reviews: "118K reviews",
        level: "Beginner",
        credential: "Specialization (8 courses)",
        duration: "3 months",
        badge: "Bestseller",
        category: "Data Science",
        description: "Build a strong analytical base with NumPy, Pandas, data mining, correlation analysis, and regression modeling.",
        skills: [
          "NumPy",
          "Data Science",
          "Python Programming",
          "Correlation Analysis",
          "Machine Learning",
          "Jupyter",
          "Predictive Modeling",
          "Pandas",
          "Data Mining"
        ]
      },
      {
        id: "explainable-ai-xai",
        slug: "explainable-ai-xai",
        title: "Explainable AI (XAI)",
        partner: "Duke University",
        partnerLogo: "duke",
        partnerType: "University",
        thumbnail: THUMBNAILS.explainable_ai,
        rating: 4.6,
        reviews: "96 reviews",
        level: "Intermediate",
        credential: "Specialization (3 courses)",
        duration: "3 months",
        badge: "Specialization",
        category: "AI & ML",
        description: "Understand model interpretability, SHAP/LIME feature attribution, ethical AI, and auditing black-box neural networks.",
        skills: [
          "Responsible AI",
          "Model Evaluation",
          "Large Language Modeling",
          "Generative AI",
          "Regression Analysis",
          "Deep Learning",
          "Data Ethics",
          "Decision Intelligence"
        ]
      },
      {
        id: "ibm-ai-developer",
        slug: "ibm-ai-developer",
        title: "IBM AI Developer",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_ai_dev,
        rating: 4.7,
        reviews: "83K reviews",
        level: "Beginner",
        credential: "Professional Certificate (10 courses)",
        duration: "6 months",
        badge: "Top AI program",
        category: "AI & ML",
        description: "Build GenAI applications, LangChain RAG pipelines, and full-stack AI assistants with Python and IBM watsonx.",
        skills: [
          "Generative AI",
          "Python Programming",
          "IBM Cloud",
          "Prompt Engineering",
          "LangChain",
          "RAG",
          "Computer Vision",
          "Software Architecture"
        ]
      },
      {
        id: "ibm-ai-engineering",
        slug: "ibm-ai-engineering",
        title: "IBM AI Engineering",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_ai_eng,
        rating: 4.6,
        reviews: "22K reviews",
        level: "Intermediate",
        credential: "Professional Certificate (13 courses)",
        duration: "6 months",
        badge: "Top AI program",
        category: "AI & ML",
        description: "Deep dive into PyTorch, Keras, Apache Spark big data pipelines, fine-tuning LLMs, and vector database architectures.",
        skills: [
          "PyTorch",
          "Keras",
          "Model Optimization",
          "Fine-tuning",
          "RAG",
          "Apache Spark",
          "Vector Databases",
          "LLM Application"
        ]
      },
      {
        id: "ai-mechanical-engineers",
        slug: "ai-mechanical-engineers",
        title: "AI for Mechanical Engineers",
        partner: "University of Michigan",
        partnerLogo: "umich",
        partnerType: "University",
        thumbnail: THUMBNAILS.michigan_mech,
        rating: 4.5,
        reviews: "213 reviews",
        level: "Intermediate",
        credential: "Specialization (3 courses)",
        duration: "3 months",
        category: "AI & ML",
        description: "Apply machine learning and computer vision to robotics, energy systems, control loops, and manufacturing.",
        skills: [
          "Artificial Intelligence",
          "Robotics",
          "Control Systems",
          "Model Optimization",
          "Transfer Learning",
          "Deep Learning",
          "AI Workflows"
        ]
      },
      {
        id: "duke-mlops",
        slug: "mlops-machine-learning-duke",
        title: "MLOps | Machine Learning Operations",
        partner: "Duke University",
        partnerLogo: "duke",
        partnerType: "University",
        thumbnail: THUMBNAILS.duke_mlops,
        rating: 4.1,
        reviews: "641 reviews",
        level: "Advanced",
        credential: "Specialization (4 courses)",
        duration: "6 months",
        badge: "Top AI program",
        category: "Git & DevOps",
        description: "Deploy and monitor models in production using AWS SageMaker, Azure ML, Hugging Face, automated CI/CD, and GitHub Copilot.",
        skills: [
          "MLOps",
          "Model Deployment",
          "AWS SageMaker",
          "Microsoft Azure",
          "DevOps",
          "Hugging Face",
          "GitHub Copilot",
          "Cloud Deployment"
        ]
      },
      {
        id: "azure-ai-900",
        slug: "microsoft-azure-ai-fundamentals-ai-900",
        title: "Microsoft Azure AI Fundamentals AI-900 Exam Prep",
        partner: "Microsoft",
        partnerLogo: "microsoft",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.azure_ai,
        rating: 4.5,
        reviews: "1.6K reviews",
        level: "Beginner",
        credential: "Specialization (5 courses)",
        duration: "2 months",
        badge: "Top AI program",
        category: "AI & ML",
        description: "Prepare for Microsoft Certified Azure AI Fundamentals. Explore computer vision, NLP, conversational AI, and anomaly detection.",
        skills: [
          "Microsoft Azure",
          "NLP",
          "Computer Vision",
          "Machine Learning",
          "Responsible AI",
          "Applied Machine Learning",
          "Anomaly Detection"
        ]
      },
      {
        id: "ibm-machine-learning-cert",
        slug: "ibm-machine-learning",
        title: "IBM Machine Learning",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_ml,
        rating: 4.6,
        reviews: "3.7K reviews",
        level: "Intermediate",
        credential: "Professional Certificate (6 courses)",
        duration: "3 months",
        badge: "Top AI program",
        category: "AI & ML",
        description: "Master time series analysis, deep learning, CNNs, RNNs, GANs, autoencoders, and feature engineering.",
        skills: [
          "Time Series Analysis",
          "Deep Learning",
          "CNNs",
          "RNNs",
          "GANs",
          "Autoencoders",
          "Feature Engineering",
          "Reinforcement Learning"
        ]
      },
      {
        id: "applied-swe-fundamentals",
        slug: "software-engineering-fundamentals",
        title: "Applied Software Engineering Fundamentals",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_swe,
        rating: 4.6,
        reviews: "52K reviews",
        level: "Beginner",
        credential: "Specialization (5 courses)",
        duration: "3 months",
        badge: "Bestseller",
        category: "Programming",
        description: "Build robust software foundations: Linux CLI, Bash scripting, Git version control, Python Flask, and CI/CD pipelines.",
        skills: [
          "Python Programming",
          "Linux Commands",
          "Shell Script",
          "Git",
          "Flask",
          "Software Architecture",
          "Full-Stack Web Development",
          "Application Deployment"
        ]
      }
    ]
  },

  // =========================================================================
  // ROLE 2: DATA SCIENTIST
  // =========================================================================
  {
    id: "data-scientist",
    title: "Data Scientist",
    headline: "In-demand skills for Data Scientist roles",
    roleCategory: "Data Science",
    badgeText: "High Demand · ₹24L–₹38L Avg Salary",
    description: "Extract insights from complex data with SQL, Python, R, predictive modeling, statistical testing, and executive storytelling dashboards.",
    goalLabel: "Edit goal",
    goalUrl: "https://www.coursera.org/career-academy/roles/data-scientist",
    inDemandSkills: [
      "SQL",
      "Python Programming",
      "Data Analysis",
      "Pandas & NumPy",
      "Statistical Modeling",
      "Data Visualization",
      "ETL & Pipelines",
      "Tableau & PowerBI"
    ],
    courses: [
      {
        id: "ds-foundations-lead",
        slug: "data-science-foundations",
        title: "Data Science Foundations",
        partner: "Multiple educators",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.data_foundations,
        rating: 4.6,
        reviews: "118K reviews",
        level: "Beginner",
        credential: "Specialization (8 courses)",
        duration: "3 months",
        badge: "Bestseller · Top recommendation",
        category: "Data Science",
        description: "Learn Python data analysis, NumPy, Pandas, predictive modeling, web scraping, and dashboard creation from leading academics.",
        skills: [
          "NumPy",
          "Data Science",
          "Python Programming",
          "Pandas",
          "Data Analysis",
          "Predictive Modeling",
          "Jupyter",
          "Dashboard Creation"
        ]
      },
      {
        id: "ds-fundamentals-python-sql",
        slug: "data-science-fundamentals-python-sql",
        title: "Data Science Fundamentals with Python and SQL",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_sql_py,
        rating: 4.6,
        reviews: "75K reviews",
        level: "Beginner",
        credential: "Specialization (5 courses)",
        duration: "3 months",
        badge: "Bestseller",
        category: "Data Science",
        description: "Gain hands-on experience querying relational databases with SQL and running statistical evaluations in Python and R.",
        skills: [
          "SQL",
          "Python Programming",
          "NumPy",
          "Descriptive Statistics",
          "Relational Databases",
          "Data Visualization",
          "Statistical Analysis"
        ]
      },
      {
        id: "ibm-data-analyst",
        slug: "ibm-data-analyst",
        title: "IBM Data Analyst",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_analyst,
        rating: 4.6,
        reviews: "100K reviews",
        level: "Beginner",
        credential: "Professional Certificate (11 courses)",
        duration: "4 months",
        badge: "Job skills",
        category: "Data Science",
        description: "Master Excel formulas, SQL wrangling, Python data analysis, Plotly graphs, and IBM Cognos executive dashboards.",
        skills: [
          "Microsoft Excel",
          "Data Wrangling",
          "SQL",
          "Dashboard Creation",
          "Data Storytelling",
          "Python Programming",
          "Plotly",
          "IBM Cognos Analytics"
        ]
      },
      {
        id: "intro-data-science",
        slug: "introduction-data-science",
        title: "Introduction to Data Science",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_intro_ds,
        rating: 4.6,
        reviews: "102K reviews",
        level: "Beginner",
        credential: "Specialization (4 courses)",
        duration: "3 months",
        badge: "Job skills",
        category: "Data Science",
        description: "Deconstruct what data scientists do, cloud big data pipelines, data cleansing methods, and relational database queries.",
        skills: [
          "SQL",
          "Data Science",
          "Jupyter",
          "Big Data",
          "Cloud Computing",
          "Data Cleansing",
          "Relational Databases",
          "Data Wrangling"
        ]
      },
      {
        id: "ibm-data-engineer-cert",
        slug: "ibm-data-engineer",
        title: "IBM Data Engineering",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_data_eng,
        rating: 4.6,
        reviews: "63K reviews",
        level: "Beginner",
        credential: "Professional Certificate (16 courses)",
        duration: "6 months",
        badge: "Job skills",
        category: "Data Science",
        description: "Design ETL pipelines, data warehouses, NoSQL stores, Apache Spark distributed jobs, and Apache Hadoop clusters.",
        skills: [
          "ETL",
          "Apache Spark",
          "SQL",
          "Data Pipelines",
          "Data Warehousing",
          "NoSQL",
          "Database Architecture",
          "Apache Hadoop"
        ]
      },
      {
        id: "meta-data-analyst-cert",
        slug: "meta-data-analyst",
        title: "Meta Data Analyst",
        partner: "Meta",
        partnerLogo: "meta",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.meta_analyst,
        rating: 4.7,
        reviews: "1.9K reviews",
        level: "Beginner",
        credential: "Professional Certificate (5 courses)",
        duration: "5 months",
        badge: "Job skills",
        category: "Data Science",
        description: "Learn how Meta product analysts define KPIs, test statistical hypotheses, manipulate datasets with Pandas, and present insights.",
        skills: [
          "Data Analysis",
          "Pandas",
          "Data Storytelling",
          "SQL",
          "Python Programming",
          "Descriptive Statistics",
          "KPIs",
          "Bayesian Statistics"
        ]
      },
      {
        id: "ucdavis-sql-basics",
        slug: "learn-sql-basics-data-science",
        title: "Learn SQL Basics for Data Science",
        partner: "University of California, Davis",
        partnerLogo: "ucdavis",
        partnerType: "University",
        thumbnail: THUMBNAILS.ucdavis_sql,
        rating: 4.6,
        reviews: "17K reviews",
        level: "Beginner",
        credential: "Specialization (3 courses)",
        duration: "2 months",
        badge: "Trending right now",
        category: "Data Science",
        description: "Filter, sort, aggregate, and join complex datasets with SQL, Databricks, and Apache Spark distributed queries.",
        skills: [
          "SQL",
          "Apache Spark",
          "Data Governance",
          "Databricks",
          "Data Pipelines",
          "Exploratory Data Analysis",
          "Data Lakes"
        ]
      },
      {
        id: "google-data-analytics-cert",
        slug: "google-data-analytics",
        title: "Google Data Analytics",
        partner: "Google",
        partnerLogo: "google",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.google_analyst,
        rating: 4.8,
        reviews: "182K reviews",
        level: "Beginner",
        credential: "Professional Certificate (9 courses)",
        duration: "6 months",
        badge: "Trending right now",
        category: "Data Science",
        description: "Google's flagship analytics certificate covering spreadsheets, SQL queries, Tableau visual dashboards, and R programming.",
        skills: [
          "Data Analysis",
          "Data Cleansing",
          "Spreadsheet Software",
          "Data Ethics",
          "Data Storytelling",
          "Ggplot2",
          "R Programming",
          "Tableau"
        ]
      },
      {
        id: "umich-python-everybody",
        slug: "python-for-everybody",
        title: "Python for Everybody",
        partner: "University of Michigan",
        partnerLogo: "umich",
        partnerType: "University",
        thumbnail: THUMBNAILS.umich_python,
        rating: 4.8,
        reviews: "281K reviews",
        level: "Beginner",
        credential: "Specialization (5 courses)",
        duration: "3 months",
        badge: "Bestseller",
        category: "Programming",
        description: "Dr. Chuck's world-famous Python specialization covering data structures, web scraping, JSON REST APIs, and database storage.",
        skills: [
          "Python Programming",
          "Data Structures",
          "Web Scraping",
          "SQL",
          "Database Design",
          "JSON",
          "RESTful APIs",
          "Data Visualization"
        ]
      },
      {
        id: "ibm-data-science-prof",
        slug: "ibm-data-science",
        title: "IBM Data Science",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_datascience,
        rating: 4.6,
        reviews: "151K reviews",
        level: "Beginner",
        credential: "Professional Certificate (12 courses)",
        duration: "4 months",
        badge: "Job skills",
        category: "Data Science",
        description: "Master open-source data science tools, SQL databases, Python analysis, machine learning models, and real-world capstone projects.",
        skills: [
          "SQL",
          "Model Evaluation",
          "Jupyter",
          "Data Cleansing",
          "Plotly",
          "Generative AI",
          "Dashboard Creation",
          "Unsupervised Learning"
        ]
      },
      {
        id: "edureka-data-analytics",
        slug: "applied-data-analytics",
        title: "Applied Data Analytics",
        partner: "Edureka",
        partnerLogo: "edureka",
        partnerType: "Institute",
        thumbnail: THUMBNAILS.edureka_analytics,
        rating: 4.6,
        reviews: "60 reviews",
        level: "Intermediate",
        credential: "Specialization (4 courses)",
        duration: "5 months",
        category: "Data Science",
        description: "Advanced analytics with Matplotlib, Seaborn, Power BI DAX formulas, statistical hypothesis testing, and feature engineering.",
        skills: [
          "Matplotlib",
          "Python Programming",
          "NumPy",
          "Seaborn",
          "Power BI",
          "DAX",
          "Hypothesis Testing",
          "Feature Engineering"
        ]
      },
      {
        id: "ibm-applied-data-science",
        slug: "applied-data-science",
        title: "Applied Data Science",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_applied_ds,
        rating: 4.6,
        reviews: "62K reviews",
        level: "Beginner",
        credential: "Specialization (5 courses)",
        duration: "3 months",
        badge: "Job ready",
        category: "Data Science",
        description: "Apply data science workflows: data wrangling with Pandas, interactive charts with Plotly, and classification modeling.",
        skills: [
          "Python Programming",
          "Model Evaluation",
          "Data Analysis",
          "Data Wrangling",
          "Plotly",
          "Exploratory Data Analysis",
          "Machine Learning"
        ]
      }
    ]
  },

  // =========================================================================
  // ROLE 3: CYBER SECURITY SPECIALIST / TECHNICIAN
  // =========================================================================
  {
    id: "cyber-security-specialist",
    title: "Cyber Security Specialist / Technician",
    headline: "Master Cybersecurity to succeed as a Cyber Security Specialist / Technician",
    roleCategory: "Cybersecurity",
    badgeText: "High Demand · ₹22L–₹40L Avg Salary",
    description: "Defend organizational digital assets, detect intrusions with SIEM platforms, perform vulnerability assessments, and automate threat response.",
    goalLabel: "Edit goal",
    goalUrl: "https://www.coursera.org/career-academy/roles/cyber-security-specialist-technician",
    inDemandSkills: [
      "SIEM Tools (Splunk/QRadar)",
      "Network Security",
      "Incident Response",
      "Python for Security",
      "Linux Hardening",
      "Vulnerability Assessment",
      "Cryptography",
      "Penetration Testing"
    ],
    courses: [
      {
        id: "google-cybersecurity-cert",
        slug: "google-cybersecurity",
        title: "Google Cybersecurity",
        partner: "Google",
        partnerLogo: "google",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.google_cyber,
        rating: 4.8,
        reviews: "69K reviews",
        level: "Beginner",
        credential: "Professional Certificate (9 courses)",
        duration: "6 months",
        badge: "Trending right now · Top recommendation",
        category: "Cybersecurity",
        description: "Google's industry-standard cybersecurity program covering SIEM tools, network protocols, Python automation, and incident mitigation.",
        skills: [
          "SIEM Tools",
          "Network Security",
          "Python for Security",
          "Linux Security",
          "Incident Response",
          "Vulnerability Management",
          "SQL for Auditing",
          "Threat Analysis"
        ]
      },
      {
        id: "ibm-cybersecurity-analyst",
        slug: "ibm-cybersecurity-analyst",
        title: "IBM Cybersecurity Analyst",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_cyber_analyst,
        rating: 4.6,
        reviews: "28K reviews",
        level: "Beginner",
        credential: "Professional Certificate (14 courses)",
        duration: "4 months",
        badge: "Trending right now",
        category: "Cybersecurity",
        description: "Master cybersecurity analysis: network forensics, penetration testing basics, incident response playbooks, and IBM QRadar SIEM.",
        skills: [
          "Cyber Threat Intelligence",
          "Network Forensics",
          "Penetration Testing",
          "Security Operations",
          "Incident Response",
          "SIEM (QRadar)",
          "Compliance"
        ]
      },
      {
        id: "cybersecurity-fundamentals-ibm",
        slug: "cybersecurity-fundamentals",
        title: "Cybersecurity Fundamentals",
        partner: "IBM",
        partnerLogo: "ibm",
        partnerType: "Enterprise",
        thumbnail: THUMBNAILS.ibm_cyber_fund,
        rating: 4.8,
        reviews: "3.2K reviews",
        level: "Beginner",
        credential: "Specialization (4 courses)",
        duration: "3 months",
        badge: "Specialization",
        category: "Cybersecurity",
        description: "Learn core information security: encryption algorithms, authentication factors, network attack vectors, and malware defense.",
        skills: [
          "Information Security",
          "Cryptography",
          "Network Vulnerabilities",
          "Authentication Protocols",
          "Malware Analysis",
          "Security Hygiene"
        ]
      }
    ]
  },

  // =========================================================================
  // ROLE 4: FULL-STACK & WEB SYSTEMS ARCHITECT
  // =========================================================================
  {
    id: "full-stack-web-architect",
    title: "Full-Stack Software Engineer & Web Systems",
    headline: "Core Engineering: Full-Stack Web, Systems & Architecture",
    roleCategory: "Web Development",
    badgeText: "High Demand · ₹18L–₹36L Avg Salary",
    description: "Build modern web applications with React 19, TypeScript, Node.js, relational database modeling, and scalable cloud deployment.",
    goalLabel: "Explore Path",
    goalUrl: "/programs",
    inDemandSkills: [
      "React 19 & Next.js",
      "TypeScript",
      "REST & GraphQL APIs",
      "Relational Databases (PostgreSQL)",
      "Node.js Backend",
      "Docker & CI/CD",
      "Clean Architecture"
    ],
    courses: [
      {
        id: "webdev-master-track",
        slug: "webdev",
        title: "Web Development Master Track",
        partner: "ASCI Institute of Technology",
        partnerLogo: "asci",
        partnerType: "Accredited Academy",
        thumbnail: THUMBNAILS.web_master,
        rating: 4.9,
        reviews: "45K reviews",
        level: "Beginner",
        credential: "Professional Certificate (6 courses)",
        duration: "12 Weeks",
        badge: "Top recommendation",
        category: "Web Development",
        description: "Complete 3-pillar path with live split-pane browser preview sandbox covering HTML5, CSS3, JavaScript ES6+, and responsive UI.",
        skills: [
          "HTML5 Semantic Structure",
          "CSS3 Flexbox & Grid",
          "JavaScript ES6+",
          "DOM Manipulation",
          "Responsive Design",
          "Web Accessibility"
        ]
      },
      {
        id: "dsa-master-curriculum",
        slug: "dsa",
        title: "Data Structures & Algorithms in Java",
        partner: "Stanford Online & ASCI",
        partnerLogo: "asci",
        partnerType: "University",
        thumbnail: THUMBNAILS.dsa_master,
        rating: 4.9,
        reviews: "68K reviews",
        level: "Intermediate",
        credential: "Specialization (4 courses)",
        duration: "12 Weeks",
        badge: "Bestseller",
        category: "DSA",
        description: "Master Big-O asymptotic analysis, binary trees, dynamic programming, graphs, and system design challenges step-by-step.",
        skills: [
          "Big-O Analysis",
          "Arrays & Hashing",
          "Binary Trees & BSTs",
          "Dynamic Programming",
          "Graph Algorithms",
          "Recursion & Backtracking"
        ]
      }
    ]
  }
]
