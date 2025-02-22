// projectsData.js
import rentRollImage from "../../Assets/Projects/rentroll.png";
import chatmeImage from "../../Assets/Projects/ChatMe.png";
import photoboothImage from "../../Assets/Projects/PhotoBooth.png";
import courseAIImage from "../../Assets/Projects/course_ai.png";
import cookingRecipeImage from "../../Assets/Projects/cooking_recipes.png";
import linkedinScrapperImage from "../../Assets/Projects/linkedin-scrapper.png";
import trendingTodayImage from "../../Assets/Projects/trending_today.png";
import geminiOAuthImage from "../../Assets/Projects/gemini-oauth.png";
import agreenablyImage from "../../Assets/Projects/agreenably.png";
import shieldAuthImage from "../../Assets/Projects/shield-auth.png";


const projects = [
  {
    title: "Cooking Recipe Generator",
    description:
      "A scalable recipe management platform featuring a microservices architecture for seamless backend performance, a responsive UI for intuitive recipe recording and search, and AI-powered voice-to-text transcription, ingredient extraction, and recipe formatting for enhanced user experience.",
    imgPath: cookingRecipeImage,
    ghLink: "https://github.com/meetgandhii/cooking-recipe-automator",
    demoLink: null
  },
  {
    title: "S.H.I.E.L.D. Auth",
    description:
      "A secure OAuth 2.0 authentication system offering signup, login, token generation, and role-based access control. It incorporates REST APIs, scalable database management, and advanced security measures like HTTPS enforcement to ensure robust client-server communication.",
    imgPath: shieldAuthImage,
    ghLink: "https://github.com/meetgandhii/S.H.I.E.L.D.-Auth",
    demoLink: null
  },
  {
    title: "CourseAI",
    description:
      "An AI-driven platform designed to create personalized learning paths and online courses. It offers adaptive scheduling, curated content, interactive tools, and progress tracking to provide an engaging and efficient learning experience for users.",
    imgPath: courseAIImage,
    ghLink: "https://github.com/meetgandhii/CourseAI",
    demoLink: "https://courseai-yo1t.onrender.com"
  },
  {
    title: "Linkedin Scrapper",
    description:
      "A powerful tool for scraping LinkedIn data from URLs (single or bulk via CSV) and formatting it into JSON for visualization. Features include rotating API keys for efficient data extraction and secure operations.",
    imgPath: linkedinScrapperImage,
    ghLink: "https://github.com/meetgandhii/linkedin-scrapper",
    demoLink: "https://github.com/meetgandhii/linkedin-scrapper",
  },
  {
    title: "Trending Now",
    description:
      "An automated platform that scrapes Google Trends, gathers top articles from news sources, generates AI-driven insights, and publishes blog posts daily using React and Perplexity API with a scheduled cron job for consistent updates.",
    imgPath: trendingTodayImage,
    ghLink: "https://github.com/meetgandhii/trending-today",
    demoLink: "https://github.com/meetgandhii/trending-today",
  },
  {
    title: "Gemini Exchange OAuth App",
    description:
      "A sandbox environment app that integrates Gemini Exchange using OAuth. It enables users to securely connect their accounts and perform actions like withdrawals, transfers, deposits, and balance checks with ease.",
    imgPath: geminiOAuthImage,
    ghLink: "https://github.com/meetgandhii/test-oauth-app",
    demoLink: "https://github.com/meetgandhii/test-oauth-app",
  },
  {
    title: "Agreenably",
    description:
      "An intelligent certification automation app that simplifies filing processes like FDA approvals by analyzing company documents using AI. Designed to streamline compliance efforts for startups with high accuracy.",
    imgPath: agreenablyImage,
    ghLink: "https://github.com/meetgandhii/agreenably",
    demoLink: "https://github.com/meetgandhii/agreenably",
  },
  {
    title: "Rent & Roll",
    description:
      "Webapp for hourly car bookings with normal, subscription, and admin users. Admin manages cars, subs get 40% off, users book based on availability. Dynamic search bar for easy access. Clone, install dependencies, and run for seamless car renting experience.",
    imgPath: rentRollImage,
    ghLink: "https://github.com/meetgandhii/Rent-Roll",
    demoLink: "https://master--fancy-malabi-9c648b.netlify.app",
  },
  {
    title: "ChatMe",
    description:
      "A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/ChatMe",
    demoLink: "https://github.com/meetgandhii/ChatMe",
  },
  {
    title: "PhotoBooth",
    description:
      "Implemented a Java-based Image Processing Application using MVC design with Swing for GUI, offering interactive text UI, batch processing, and various image manipulations like color adjustments, flipping, blur, and compression. Utilized Command Callback and Command Design Patterns, adhering to SOLID principles, and employed jUnit for testing.",
    imgPath: photoboothImage,
    ghLink: "https://github.com/meetgandhii/Image-Processing-App-Java",
    demoLink: "https://github.com/meetgandhii/Image-Processing-App-Java",
  },
  {
    title: "Kanbas",
    description:
      "A fully functional Canvas clone offering features like quizzes, modules, user management, and content creation. It integrates backend and frontend seamlessly to provide a smooth user experience for educators and learners.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/CS5610_Web-Development_NEU/tree/assignment6",
    demoLink: "https://github.com/meetgandhii/CS5610_Web-Development_NEU/tree/assignment6",
  },
  {
    title: "One For All",
    description:
      "A versatile web application enabling English text conversion to Braille or ASL and vice versa. It includes interactive tools for learning sign language and Braille while offering testing features to gauge understanding.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/One-for-All?tab=readme-ov-file",
    demoLink: "https://github.com/meetgandhii/One-for-All?tab=readme-ov-file",
  },
  {
    title: "Hotel Booking System",
    description:
      "A comprehensive hotel booking system with admin capabilities to manage hotels and slots. Users can efficiently search and book rooms through an intuitive interface designed for seamless functionality.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/hotel-booking-system-django",
    demoLink: "https://github.com/meetgandhii/hotel-booking-system-django",
  },

  {
    title: "Travel Guide",
    description:
      "A smart travel recommendation platform that scrapes data from multiple sources, including Wikipedia and tourism websites, to provide users with tailored travel suggestions based on their preferences and filters.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/Travel-Guide",
    demoLink: "https://github.com/meetgandhii/Travel-Guide",
  },
  {
    title: "Ride Along",
    description:
      "A carpooling website that connects users based on shared interests, offering a convenient and social way to travel. It features user-friendly tools for matching and managing trips efficiently.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/Ride-Along",
    demoLink: "https://github.com/meetgandhii/Ride-Along",
  },
  {
    title: "Salon Management System",
    description:
      "A Java-based application that allows admins to manage barbers and users to book appointments. It generates itemized bills using a file management system for streamlined operations.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: null,
  },
  {
    title: "Education Fantasy League",
    description:
      "A unique mobile app where students create fantasy leagues by predicting exam questions. It uses string-matching algorithms to reward accurate predictions, motivating collaborative study efforts.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: null,
  },
  {
    title: "P.V.G. Chemicals",
    description:
      "A professional company website showcasing the portfolio, mission, vision, history, and contact details of P.V.G. Chemicals. Built to highlight their expertise in the chemical industry.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/pvgchemical",
    demoLink: null,
  },
  {
    title: "Symptom Checker",
    description:
      "An intuitive medical tool that allows users to select body parts, input symptoms, and receive potential diagnoses and remedies. Powered by advanced medical APIs for accurate health insights.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: null,
  },
  {
    title: "Loan Eligibility Checker",
    description:
      "A mobile app that evaluates loan eligibility by analyzing uploaded documents like government IDs, income proofs, and mortgages. Features realistic machine learning models for precise assessments.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/LoanEligibilityChecker",
    demoLink: "https://github.com/meetgandhii/LoanEligibilityChecker",
  },
  {
    title: "Dogs vs Cats Checker",
    description:
      "A machine learning-powered application that classifies images of dogs and cats with high accuracy. Designed for seamless image recognition and reliable performance.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/dogs-vs-cats-checker",
    demoLink: "https://github.com/meetgandhii/dogs-vs-cats-checker",
  },
  {
    title: "Airline Booking System",
    description:
      "An efficient airline booking system designed to manage flights, bookings, and passenger details. Provides an intuitive interface for seamless reservation management.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/Python-Airline-Booking-System",
    demoLink: null,
  },
  {
    title: "Sareeshadow",
    description:
      "An e-commerce website built on WordPress for Sareeshadow, featuring WooCommerce integration for seamless shopping experiences with secure payment options.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: "https://sareeshadow.com/",
  },
  {
    title: "VirVentures",
    description:
      "A large-scale e-commerce platform connecting vendors with customers across various categories such as electronics, beauty products, books, and more. Designed for scalability and efficient order processing.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: "https://virventures.com/",
  },
  {
    title: "Acadzo",
    description:
      "A dynamic platform aimed at equipping children with essential skills through personalized learning experiences, group activities, and online resources. Built to foster creativity and problem-solving skills.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: "https://acadzo.com/",
  },
{
    title: "Frescolimited",
    description:
      "A professional website for Fresco Limited, showcasing their expertise in manufacturing cooling radiators, tanks, frames, and industrial products for various sectors. Built to enhance their online presence.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: "https://frescolimited.com/",
  },
  {
    title: "ApexHatchers",
    description:
      "A consulting firm website offering services in business operations, legal operations, and people operations. It helps businesses expand globally and enter Indian markets with research-driven strategies.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: "https://apexhatchers.com/",
  },
  {
    title: "Medanand",
    description:
      "An e-commerce medical store web application developed as a freelance project. It streamlines the purchase of medical supplies with an intuitive interface for a seamless shopping experience.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: null,
  },
  {
    title: "RCMHV",
    description:
      "The official website of the Rotaract Club of Mulund Hill View, showcasing their initiatives and events as the youth wing of Rotary Club of Mulund Hill View. Built to promote community engagement.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: null,
  },
  {
    title: "SICA India",
    description:
      "The official website of SICA India, highlighting their expertise in aluminum profiles and conveyor components for factory automation. Designed to showcase their industrial capabilities and services.",
    imgPath: chatmeImage,
    ghLink: null,
    demoLink: "http://www.sica.in/",
  }
];



export default projects;


/**
 const projects = [
  {
    title: "Cooking Recipe Generator",
    description:
      "A scalable recipe management system which features a microservices architecture for backend efficiency, a responsive user interface for seamless recipe recording and search functionality, and AI-powered voice-to-text transcription, ingredient extraction, and recipe formatting to enhance user experience.",
    imgPath: cookingRecipeImage,
    ghLink: "https://github.com/meetgandhii/cooking-recipe-automator",
    demoLink: "https://github.com/meetgandhii/cooking-recipe-automator",
  },
  {
    title: "S.H.I.E.L.D. Auth",
    description:
      "A secure OAuth 2.0 authentication system with signup, login, token generation, and role-based access control. Built using MongoDB, Express.js, Node.js, AWS, and React Hooks, it features REST APIs, scalable database management, and advanced security measures like HTTPS enforcement.",
    imgPath: shieldAuthImage,
    ghLink: "https://github.com/meetgandhii/S.H.I.E.L.D.-Auth",
    demoLink: "https://github.com/meetgandhii/S.H.I.E.L.D.-Auth",
  },
  {
    title: "CourseAI",
    description:
      "An AI-powered platform for creating personalized learning paths and online courses. Features include adaptive scheduling, content curation, interactive tools, and progress tracking, built with React.js, Node.js, Python, and MongoDB for a seamless user experience.",
    imgPath: courseAIImage,
    ghLink: "https://github.com/meetgandhii/CourseAI",
    demoLink: "https://github.com/meetgandhii/CourseAI",
  },
  {
    title: "Linkedin Scrapper",
    description:
      "A tool to scrape LinkedIn data from URLs (single, multiple, or CSV) and format it into JSON for visualization. Features include rotating API keys for efficient and secure data extraction.",
    imgPath: linkedinScrapperImage,
    ghLink: "https://github.com/meetgandhii/linkedin-scrapper",
    demoLink: "https://github.com/meetgandhii/linkedin-scrapper",
  },
  {
    title: "Trending Now",
    description:
      "An automated platform that scrapes Google Trends, gathers top articles, generates AI-driven insights, and publishes blog posts daily using React, Perplexity API, and a 12am cron job for consistent updates.",
    imgPath: trendingTodayImage,
    ghLink: "https://github.com/meetgandhii/trending-today",
    demoLink: "https://github.com/meetgandhii/trending-today",
  }
  ,
  {
    title: "Gemini Exchange OAuth App",
    description:
      "A test app for integrating Gemini Exchange using OAuth, enabling users to connect their accounts and perform actions like withdraw, transfer, deposit, and check balances in a sandbox environment.",
    imgPath: geminiOAuthImage,
    ghLink: "https://github.com/meetgandhii/test-oauth-app",
    demoLink: "https://github.com/meetgandhii/test-oauth-app",
  },
  {
    title: "Agreenably",
    description:
      "An app that automates filing certifications like FDA approvals by analyzing company documents with AI to accurately complete submissions. Built for startups to simplify compliance processes.",
    imgPath: agreenablyImage,
    ghLink: "https://github.com/meetgandhii/agreenably",
    demoLink: "https://github.com/meetgandhii/agreenably",
  }
  ,
  {
    title: "Rent & Roll",
    description:
      "Webapp for hourly car bookings with normal, subscription, and admin users. Admin manages cars, subs get 40% off, users book based on availability. Dynamic search bar for easy access. Clone, install dependencies, and run for seamless car renting experience.",
    imgPath: rentRollImage,
    ghLink: "https://github.com/meetgandhii/Rent-Roll",
    demoLink: "https://master--fancy-malabi-9c648b.netlify.app",
  },
  {
    title: "ChatMe",
    description:
      "A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience.",
    imgPath: chatmeImage,
    ghLink: "https://github.com/meetgandhii/ChatMe",
    demoLink: "https://github.com/meetgandhii/ChatMe",
  },
  {
    title: "PhotoBooth",
    description:
      "Implemented a Java-based Image Processing Application using MVC design with Swing for GUI, offering interactive text UI, batch processing, and various image manipulations like color adjustments, flipping, blur, and compression. Utilized Command Callback and Command Design Patterns, adhering to SOLID principles, and employed jUnit for testing.",
    imgPath: photoboothImage,
    ghLink: "https://github.com/meetgandhii/Image-Processing-App-Java",
    demoLink: "https://github.com/meetgandhii/Image-Processing-App-Java",
  },
  {
    title: "Kanbas",
    imgPath: chatmeImage,
    description: "A fully functional clone of Canvas with features like quizzes, modules, user management, and content creation. Includes backend and frontend integration for seamless operation.",
    ghLink: "https://github.com/meetgandhii/CS5610_Web-Development_NEU/tree/assignment6",
    demoLink: "https://github.com/meetgandhii/CS5610_Web-Development_NEU/tree/assignment6"
  },
  {
    title: "One For All",
    imgPath: chatmeImage,
    description: "A web app that converts English text to Braille and ASL, and vice versa. Includes interactive tools for learning sign and Braille languages, along with testing features.",
    ghLink: "https://github.com/meetgandhii/One-for-All?tab=readme-ov-file",
    demoLink: "https://github.com/meetgandhii/One-for-All?tab=readme-ov-file"
  },
  {
    title: "Hotel Booking System",
    imgPath: chatmeImage,
    description: "A hotel booking system with admin capabilities to manage hotels and slots, and user functionality to book rooms efficiently.",
    ghLink: "https://github.com/meetgandhii/hotel-booking-system-django",
    demoLink: "https://github.com/meetgandhii/hotel-booking-system-django"
  },
  {
    title: "Travel Guide",
    imgPath: chatmeImage,
    description: "A platform providing travel recommendations in India by scraping and amalgamating data from multiple sources, tailored to user preferences.",
    ghLink: "https://github.com/meetgandhii/Travel-Guide",
    demoLink: "https://github.com/meetgandhii/Travel-Guide"
  },
  {
    title: "Ride Along",
    imgPath: chatmeImage,
    description: "A carpooling website that connects users based on shared interests for a convenient and social travel experience.",
    ghLink: "https://github.com/meetgandhii/Ride-Along",
    demoLink: "https://github.com/meetgandhii/Ride-Along"
  },
  {
    title: "Symptom Checker",
    imgPath: chatmeImage,
    description: "An app where users can select body parts, input symptoms, and receive potential diagnoses and remedies using medical APIs.",
    ghLink: null,
    demoLink: null
  },
  {
    title: "Loan Eligibility Checker",
    imgPath: chatmeImage,
    description: "A mobile app that uses uploaded documents to determine loan eligibility with high accuracy through machine learning models.",
    ghLink: "https://github.com/meetgandhii/LoanEligibilityChecker",
    demoLink: "https://github.com/meetgandhii/LoanEligibilityChecker"
  },
  {
    title: "Salon Management System",
    imgPath: chatmeImage,
    description: "A Java-based app allowing admins to manage barbers and users to book appointments while generating itemized bills using a file management system.",
    ghLink: "https://github.com/meetgandhii/salon-bill-and-time-management-system",
    demoLink: null
  },
  {
    title: "Dogs vs Cats Checker",
    imgPath: chatmeImage,
    description: "An ML model that identifies whether an uploaded image is of a dog or a cat with high precision.",
    ghLink: "https://github.com/meetgandhii/dogs-vs-cats-checker",
    demoLink: "https://github.com/meetgandhii/dogs-vs-cats-checker"
  },
  {
    title: "Education Fantasy League",
    imgPath: chatmeImage,
    description: "A mobile app where students predict exam questions in a fantasy league format to win points, motivating study and collaboration.",
    ghLink: null,
    demoLink: null
  },
  {
    title: "P.V.G. Chemicals",
    imgPath: chatmeImage,
    description: "A company website showcasing the portfolio, mission, vision, history, and contact details of P.V.G. Chemicals.",
    ghLink: "https://github.com/meetgandhii/pvgchemical",
    demoLink: null
  },
  {
    title: "Airline Booking System",
    imgPath: chatmeImage,
    description: "An airline booking system for managing flights, bookings, and passenger details efficiently.",
    ghLink: "https://github.com/meetgandhii/Python-Airline-Booking-System",
    demoLink: null
  },
  {
    title: "Sareeshadow",
    imgPath: chatmeImage,
    description: "An e-commerce website built on WordPress for Sareeshadow, featuring WooCommerce integration for seamless online shopping.",
    ghLink: null,
    demoLink: "https://sareeshadow.com/"
  },
  {
    title: "VirVentures",
    imgPath: chatmeImage,
    description: "An e-commerce platform connecting vendors with customers across categories like electronics, books, beauty products, and more.",
    ghLink: null,
    demoLink: "https://virventures.com/"
  },
  {
    title: "Acadzo",
    imgPath: chatmeImage,
    description: "A website dedicated to empowering children with skills through personalized learning experiences and group activities.",
    ghLink: null,
    demoLink: "https://acadzo.com/"
  },
  {
    title: "Frescolimited",
    imgPath: chatmeImage,
    description: "A company website for Fresco Limited showcasing their expertise in manufacturing cooling radiators, tanks, frames, and industrial products.",
    ghLink: null,
    demoLink: "https://frescolimited.com/"
  },
  {
    title: "ApexHatchers",
    imgPath: chatmeImage,
    description: "A consulting firm website offering services in business operations, legal operations, and people operations for global businesses.",
    ghLink: null,
    demoLink: "https://apexhatchers.com/"
  },
  {
    title: "Medanand",
    imgPath: chatmeImage,
    description: "An e-commerce medical store web application developed as a freelance project for a company.",
    ghLink: null,
    demoLink: null
  },
  {
    title: "RCMHV",
    imgPath: chatmeImage,
    description:
      "The official website of the Rotaract Club of Mulund Hill View showcasing their initiatives as the youth wing of Rotary Club of Mulund Hill View.",
    ghlink: null,
    demolink: null
  },
  {
    title: "SICA India",
    imgPath: chatmeImage,
    description:
      "Official website of SICA India showcasing their expertise in aluminum profiles and conveyor components for factory automation.",
    ghlink: null,
    demolink: "http//www.sica.in"
  }
];
 */