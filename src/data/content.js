// Single source of truth for all portfolio content.
// Consumed by the game, the parallax site, and the basic site.

export const identity = {
  name: "Meet Gandhi",
  roles: ["Software Development Engineer", "Full Stack Developer", "Builder"],
  location: "Boston, MA, USA",
  email: "meetgandhi412@gmail.com",
  phone: "(857) 930-8967",
  resumePdf: "/Meet_Resume.pdf",
  tagline: "I build full-stack products — from crypto rails at Fidelity to AI tools for family businesses in Mumbai.",
};

export const socials = [
  { label: "GitHub", url: "https://github.com/meetgandhii", icon: "github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/meetgandhii/", icon: "linkedin" },
  { label: "Twitter", url: "https://twitter.com/meeeeeeeettttt", icon: "twitter" },
  { label: "Instagram", url: "https://www.instagram.com/meetgandhii", icon: "instagram" },
  { label: "Email", url: "mailto:meetgandhi412@gmail.com", icon: "mail" },
];

export const about = {
  intro:
    "I learned software development through internships, a Computer Science masters, and a long trail of shipped projects — including freelance work for real companies and industries. Coding isn't just a skill for me; it's the thing that keeps me engaged, excited and entertained, especially when the task looks out of my league.",
  long: [
    "I hold a Masters of Science in Computer Science from Northeastern University's Khoury College of Computer Science (4.0 GPA), and I currently build crypto transfer and payments systems at Fidelity Investments in Boston.",
    "My journey has been marked by a relentless pursuit of learning, a knack for swiftly adapting to diverse tech stacks, and a refusal to accept 'no' for an answer. My unique strength is consistently finding answers to problems that seem out of my league — whether that's a gnarly technical issue or crafting a pitch that lands.",
    "Coworkers would describe me as a passion-driven team player. I take pride in going beyond the ask to learn and implement new technologies, and in keeping the room collaborative and positive while doing it.",
  ],
};

export const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL", "HTML", "CSS"],
  Frontend: ["React", "Redux", "Angular (NgRx)", "Vue.js", "Next.js", "Apollo Client", "Tailwind CSS"],
  Backend: ["Node.js", "NestJS", "Express.js", "Django", "GraphQL", "REST", "PostgreSQL", "MySQL", "MongoDB", "Redis"],
  "DevOps & Tools": ["Git", "AWS", "Jenkins", "Kubernetes", "CircleCI", "Jest", "WebdriverIO", "SonarQube"],
};

export const achievements = [
  "Yale 2024 Winter Hackathon — Runner Up",
  "J.P. Morgan Code for Good 2023 Hackathon — Runner Up",
];

// Chronological resume timeline (oldest first — the order Resume Road is walked).
export const timeline = [
  {
    period: "2019 — May 2023",
    title: "B.E. Computer Engineering",
    org: "K. J. Somaiya College of Engineering",
    place: "Mumbai, India",
    type: "education",
    points: ["GPA 3.80 / 4.00", "Python, OOP, DBMS, Web Development, C"],
  },
  {
    period: "Sep 2023 — May 2025",
    title: "M.S. Computer Science",
    org: "Northeastern University, Khoury College",
    place: "Boston, MA",
    type: "education",
    points: [
      "GPA 4.00 / 4.00",
      "Algorithms, Web Dev, Information Retrieval, Scalable Distributed Systems, Mobile Development",
    ],
  },
  {
    period: "Jul 2024 — Dec 2024",
    title: "Software Development Engineer Co-op",
    org: "Fidelity Investments",
    place: "Boston, MA",
    type: "work",
    points: [
      "Built Proof of Assets verification with React/Node — 100% accuracy across 15+ wallet platforms",
      "Cut OnRamp transfer latency 60% across 10+ exchanges via API Gateway restructuring",
      "NestJS health monitoring: 99.9% incident detection, MTTR down 75%",
      "Automated EC2 rehydration — deployment time cut 94%",
    ],
  },
  {
    period: "Feb 2025 — Present",
    title: "Software Development Engineer",
    org: "Fidelity Investments",
    place: "Boston, MA",
    type: "work",
    points: [
      "Architected Transfer of Assets frontend (Angular) — rolled out to 196k+ invited customers",
      "GraphQL/Node backend for crypto transfers — $178M in deposits, $17.3M in withdrawals facilitated",
      "Spearheaded Peer-to-Peer crypto payments backend with NestJS",
      "Jenkins CI/CD happy-path validation + mentoring junior developers",
    ],
  },
  {
    period: "2026 — Present",
    title: "Founder",
    org: "PASKEN",
    place: "Mumbai, India",
    type: "venture",
    points: ["Building AI tools for Indian chemical traders"],
  },
];

const img = (file) => `/assets/projects/${file}`;
const PLACEHOLDER = null; // projects without a real screenshot get a generated card

// districts: "lab" = The Lab (latest builds), "campus" = Academic Campus,
// "arcade" = AI & Apps Arcade, "bazaar" = Client Bazaar (freelance)
export const projects = [
  {
    id: "pasken",
    title: "PASKEN",
    district: "lab",
    description:
      "My startup: AI tools for Indian chemical traders. Automates the unglamorous core of the trade — inquiries, quotations, follow-ups and market intelligence — for family-run chemical businesses in Mumbai and beyond.",
    tech: ["AI", "Node.js", "Founder"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "atithi",
    title: "Atithi — Hospitality OS",
    district: "lab",
    description:
      "An AI operating system for Indian boutique hospitality. Ingestion pipelines turn WhatsApp threads, bookings, bank statements, call transcriptions and video into structured, queryable operations data.",
    tech: ["TypeScript", "Node.js", "Supabase", "Anthropic SDK"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "pitwall",
    title: "Pitwall — F1 AI Companion",
    district: "lab",
    description:
      "A desktop companion for Formula 1 race weekends: a floating always-on-top overlay with live timing, session updates and an AI race engineer to ask about strategy, tyres and standings mid-race.",
    tech: ["Electron", "React", "TypeScript", "Express"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "gesture-os",
    title: "GestureOS",
    district: "lab",
    description:
      "Webcam-based hand-gesture control for macOS that replaces the trackpad — cursor, click, scroll, zoom and desktop navigation driven by real-time MediaPipe hand tracking.",
    tech: ["Python", "MediaPipe", "OpenCV"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "ai-news-bot",
    title: "AI News Bot",
    district: "lab",
    description:
      "A WhatsApp bot that fetches RSS articles, summarizes them with multiple AI providers (Gemini, OpenAI, Groq), and ships a daily digest to mailing lists — with rate limiting and hardened endpoints.",
    tech: ["Node.js", "WhatsApp Web.js", "Gemini", "OpenAI"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/AI-News-Bot",
    demoLink: null,
  },
  {
    id: "resume-extension",
    title: "Resume Tailor Extension",
    district: "lab",
    description:
      "A Chrome extension paired with a local Node server that reads a job description on any page and generates a tailored, typeset PDF resume on the spot using Claude and Pandoc.",
    tech: ["Chrome Extension", "Node.js", "Claude", "Pandoc"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "rent-it-out",
    title: "Rent It Out",
    district: "lab",
    description:
      "A rental marketplace platform connecting listers, renters and delivery partners — KYC verification, item management and delivery integration across a multi-frontend architecture.",
    tech: ["React", "Node.js", "MongoDB"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/rent-it-out",
    demoLink: null,
  },
  {
    id: "restaurant-ai",
    title: "Restaurant AI",
    district: "lab",
    description:
      "A restaurant management system with menu, table and booking APIs — plus a voice-AI layer (VAPI) so customers can book a table by simply calling the restaurant.",
    tech: ["React", "Node.js", "MongoDB", "VAPI"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "birthday-treasure-hunt",
    title: "F1 Birthday Treasure Hunt",
    district: "lab",
    description:
      "A full-stack F1-themed scavenger hunt built as a birthday gift: 7 location-based challenges with maps, camera filters, a points system, gift shop and admin panel.",
    tech: ["React", "Node.js", "MongoDB", "Google Maps", "Cloudinary"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/simrans-bday",
    demoLink: null,
  },
  {
    id: "birthday-quiz",
    title: "Birthday Quiz Arena",
    district: "lab",
    description:
      "A real-time full-stack quiz platform built as a birthday gift — live quiz gameplay with sockets, scoring and a custom question set.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/harshit-birthday",
    demoLink: null,
  },
  {
    id: "chrome-toolbox",
    title: "Chrome Extension Toolbox",
    district: "lab",
    description:
      "A personal collection of 8+ Chrome extensions solving daily annoyances: YouTube ad skipper, Amex offers sorter, LinkedIn skills helper, USCIS form autofill, volume booster, co-op game sync and more.",
    tech: ["JavaScript", "Manifest V3", "Chrome APIs"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "split",
    title: "Split",
    district: "lab",
    description:
      "Roommate expense automation: Playwright scrapers log into Instacart, Costco Same-Day and Weee, pull order history, and map every line item to the right roommate via card numbers.",
    tech: ["Node.js", "Playwright"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "recipe-generator",
    title: "Cooking Recipe Generator",
    district: "campus",
    description:
      "A scalable recipe management platform featuring a microservices architecture for seamless backend performance, a responsive UI for intuitive recipe recording and search, and AI-powered voice-to-text transcription, ingredient extraction, and recipe formatting for enhanced user experience.",
    tech: ["React", "Node.js", "Python", "FastAPI", "MongoDB"],
    img: img("cooking_recipes.png"),
    ghLink: "https://github.com/meetgandhii/cooking-recipe-automator",
    demoLink: null,
  },
  {
    id: "shield-auth",
    title: "S.H.I.E.L.D. Auth",
    district: "campus",
    description:
      "A secure OAuth 2.0 authentication system offering signup, login, token generation, and role-based access control. It incorporates REST APIs, scalable database management, and advanced security measures like HTTPS enforcement to ensure robust client-server communication.",
    tech: ["MongoDB", "Express.js", "Node.js", "OAuth 2.0"],
    img: img("shield-auth.png"),
    ghLink: "https://github.com/meetgandhii/S.H.I.E.L.D.-Auth",
    demoLink: null,
  },
  {
    id: "course-ai",
    title: "CourseAI",
    district: "arcade",
    description:
      "An AI-driven platform designed to create personalized learning paths and online courses. It offers adaptive scheduling, curated content, interactive tools, and progress tracking to provide an engaging and efficient learning experience for users.",
    tech: ["React", "Node.js", "Python", "MongoDB"],
    img: img("course_ai.png"),
    ghLink: "https://github.com/meetgandhii/CourseAI",
    demoLink: "https://courseai-yo1t.onrender.com",
  },
  {
    id: "linkedin-scrapper",
    title: "LinkedIn Scrapper",
    district: "arcade",
    description:
      "A powerful tool for scraping LinkedIn data from URLs (single or bulk via CSV) and formatting it into JSON for visualization. Features include rotating API keys for efficient data extraction and secure operations.",
    tech: ["Node.js", "APIs", "CSV"],
    img: img("linkedin-scrapper.png"),
    ghLink: "https://github.com/meetgandhii/linkedin-scrapper",
    demoLink: null,
  },
  {
    id: "trending-now",
    title: "Trending Now",
    district: "arcade",
    description:
      "An automated platform that scrapes Google Trends, gathers top articles from news sources, generates AI-driven insights, and publishes blog posts daily using React and Perplexity API with a scheduled cron job for consistent updates.",
    tech: ["React", "Perplexity API", "Cron"],
    img: img("trending_today.png"),
    ghLink: "https://github.com/meetgandhii/trending-today",
    demoLink: null,
  },
  {
    id: "gemini-oauth",
    title: "Gemini Exchange OAuth App",
    district: "arcade",
    description:
      "A sandbox environment app that integrates Gemini Exchange using OAuth. It enables users to securely connect their accounts and perform actions like withdrawals, transfers, deposits, and balance checks with ease.",
    tech: ["OAuth", "Node.js"],
    img: img("gemini-oauth.png"),
    ghLink: "https://github.com/meetgandhii/test-oauth-app",
    demoLink: null,
  },
  {
    id: "agreenably",
    title: "Agreenably",
    district: "arcade",
    description:
      "An intelligent certification automation app that simplifies filing processes like FDA approvals by analyzing company documents using AI. Designed to streamline compliance efforts for startups with high accuracy.",
    tech: ["AI", "Document Analysis"],
    img: img("agreenably.png"),
    ghLink: "https://github.com/meetgandhii/agreenably",
    demoLink: null,
  },
  {
    id: "rent-roll",
    title: "Rent & Roll",
    district: "arcade",
    description:
      "Webapp for hourly car bookings with normal, subscription, and admin users. Admin manages cars, subs get 40% off, users book based on availability. Dynamic search bar for easy access.",
    tech: ["React", "Node.js"],
    img: img("rentroll.png"),
    ghLink: "https://github.com/meetgandhii/Rent-Roll",
    demoLink: "https://master--fancy-malabi-9c648b.netlify.app",
  },
  {
    id: "chatme",
    title: "ChatMe",
    district: "arcade",
    description:
      "A user-friendly chat app that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience.",
    tech: ["React", "Node.js", "Encryption"],
    img: img("ChatMe.png"),
    ghLink: "https://github.com/meetgandhii/ChatMe",
    demoLink: null,
  },
  {
    id: "photobooth",
    title: "PhotoBooth",
    district: "campus",
    description:
      "A Java-based image processing application using MVC design with Swing GUI, offering interactive text UI, batch processing, and image manipulations like color adjustments, flipping, blur, and compression. Built with command design patterns, SOLID principles, and JUnit testing.",
    tech: ["Java", "Swing", "MVC", "JUnit"],
    img: img("PhotoBooth.png"),
    ghLink: "https://github.com/meetgandhii/Image-Processing-App-Java",
    demoLink: null,
  },
  {
    id: "kanbas",
    title: "Kanbas",
    district: "campus",
    description:
      "A fully functional Canvas clone offering features like quizzes, modules, user management, and content creation. It integrates backend and frontend seamlessly to provide a smooth user experience for educators and learners.",
    tech: ["React", "Node.js", "MongoDB"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/CS5610_Web-Development_NEU/tree/assignment6",
    demoLink: null,
  },
  {
    id: "one-for-all",
    title: "One For All",
    district: "campus",
    description:
      "A versatile web application enabling English text conversion to Braille or ASL and vice versa. It includes interactive tools for learning sign language and Braille while offering testing features to gauge understanding.",
    tech: ["Web", "Accessibility"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/One-for-All",
    demoLink: null,
  },
  {
    id: "hotel-booking",
    title: "Hotel Booking System",
    district: "campus",
    description:
      "A comprehensive hotel booking system with admin capabilities to manage hotels and slots. Users can efficiently search and book rooms through an intuitive interface designed for seamless functionality.",
    tech: ["Django", "Python"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/hotel-booking-system-django",
    demoLink: null,
  },
  {
    id: "travel-guide",
    title: "Travel Guide",
    district: "campus",
    description:
      "A smart travel recommendation platform that scrapes data from multiple sources, including Wikipedia and tourism websites, to provide users with tailored travel suggestions based on their preferences and filters.",
    tech: ["Python", "Web Scraping"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/Travel-Guide",
    demoLink: null,
  },
  {
    id: "ride-along",
    title: "Ride Along",
    district: "campus",
    description:
      "A carpooling website that connects users based on shared interests, offering a convenient and social way to travel. It features user-friendly tools for matching and managing trips efficiently.",
    tech: ["Web"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/Ride-Along",
    demoLink: null,
  },
  {
    id: "salon-management",
    title: "Salon Management System",
    district: "campus",
    description:
      "A Java-based application that allows admins to manage barbers and users to book appointments. It generates itemized bills using a file management system for streamlined operations.",
    tech: ["Java"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/salon-bill-and-time-management-system",
    demoLink: null,
  },
  {
    id: "education-fantasy-league",
    title: "Education Fantasy League",
    district: "campus",
    description:
      "A unique mobile app where students create fantasy leagues by predicting exam questions. It uses string-matching algorithms to reward accurate predictions, motivating collaborative study efforts.",
    tech: ["Mobile", "Algorithms"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "symptom-checker",
    title: "Symptom Checker",
    district: "campus",
    description:
      "An intuitive medical tool that allows users to select body parts, input symptoms, and receive potential diagnoses and remedies. Powered by advanced medical APIs for accurate health insights.",
    tech: ["Medical APIs"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "loan-eligibility",
    title: "Loan Eligibility Checker",
    district: "campus",
    description:
      "A mobile app that evaluates loan eligibility by analyzing uploaded documents like government IDs, income proofs, and mortgages. Features realistic machine learning models for precise assessments.",
    tech: ["Mobile", "ML"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/LoanEligibilityChecker",
    demoLink: null,
  },
  {
    id: "dogs-vs-cats",
    title: "Dogs vs Cats Checker",
    district: "campus",
    description:
      "A machine learning-powered application that classifies images of dogs and cats with high accuracy. Designed for seamless image recognition and reliable performance.",
    tech: ["ML", "Python"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/dogs-vs-cats-checker",
    demoLink: null,
  },
  {
    id: "airline-booking",
    title: "Airline Booking System",
    district: "campus",
    description:
      "An efficient airline booking system designed to manage flights, bookings, and passenger details. Provides an intuitive interface for seamless reservation management.",
    tech: ["Python"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/Python-Airline-Booking-System",
    demoLink: null,
  },
  {
    id: "pvg-chemicals",
    title: "P.V.G. Chemicals",
    district: "bazaar",
    description:
      "A professional company website showcasing the portfolio, mission, vision, history, and contact details of P.V.G. Chemicals. Built to highlight their expertise in the chemical industry.",
    tech: ["Web", "Freelance"],
    img: PLACEHOLDER,
    ghLink: "https://github.com/meetgandhii/pvgchemical",
    demoLink: null,
  },
  {
    id: "sareeshadow",
    title: "Sareeshadow",
    district: "bazaar",
    description:
      "An e-commerce website built on WordPress for Sareeshadow, featuring WooCommerce integration for seamless shopping experiences with secure payment options.",
    tech: ["WordPress", "WooCommerce"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: "https://sareeshadow.com/",
  },
  {
    id: "virventures",
    title: "VirVentures",
    district: "bazaar",
    description:
      "A large-scale e-commerce platform connecting vendors with customers across various categories such as electronics, beauty products, books, and more. Designed for scalability and efficient order processing.",
    tech: ["E-commerce"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: "https://virventures.com/",
  },
  {
    id: "acadzo",
    title: "Acadzo",
    district: "bazaar",
    description:
      "A dynamic platform aimed at equipping children with essential skills through personalized learning experiences, group activities, and online resources. Built to foster creativity and problem-solving skills.",
    tech: ["EdTech"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: "https://acadzo.com/",
  },
  {
    id: "frescolimited",
    title: "Fresco Limited",
    district: "bazaar",
    description:
      "A professional website for Fresco Limited, showcasing their expertise in manufacturing cooling radiators, tanks, frames, and industrial products for various sectors. Built to enhance their online presence.",
    tech: ["Web", "Freelance"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: "https://frescolimited.com/",
  },
  {
    id: "apexhatchers",
    title: "ApexHatchers",
    district: "bazaar",
    description:
      "A consulting firm website offering services in business operations, legal operations, and people operations. It helps businesses expand globally and enter Indian markets with research-driven strategies.",
    tech: ["Web", "Freelance"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: "https://apexhatchers.com/",
  },
  {
    id: "medanand",
    title: "Medanand",
    district: "bazaar",
    description:
      "An e-commerce medical store web application developed as a freelance project. It streamlines the purchase of medical supplies with an intuitive interface for a seamless shopping experience.",
    tech: ["E-commerce", "Freelance"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "rcmhv",
    title: "RCMHV",
    district: "bazaar",
    description:
      "The official website of the Rotaract Club of Mulund Hill View, showcasing their initiatives and events as the youth wing of Rotary Club of Mulund Hill View. Built to promote community engagement.",
    tech: ["Web", "Community"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: null,
  },
  {
    id: "sica-india",
    title: "SICA India",
    district: "bazaar",
    description:
      "The official website of SICA India, highlighting their expertise in aluminum profiles and conveyor components for factory automation. Designed to showcase their industrial capabilities and services.",
    tech: ["Web", "Freelance"],
    img: PLACEHOLDER,
    ghLink: null,
    demoLink: "http://www.sica.in/",
  },
];

export const districts = {
  lab: {
    name: "The Lab",
    blurb: "Latest builds (2025–26) — startups, AI tools and desktop experiments",
  },
  campus: {
    name: "Academic Campus",
    blurb: "Coursework & university builds — Northeastern and K.J. Somaiya",
  },
  arcade: {
    name: "AI & Apps Arcade",
    blurb: "AI experiments, tools and full-stack apps",
  },
  bazaar: {
    name: "Client Bazaar",
    blurb: "Freelance and client work shipped for real businesses",
  },
};
