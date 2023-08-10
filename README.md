# eCommerce-Application

## Table of Contents
1. [Description](#description)
2. [Purpose](#purpose)
3. [Technical Stack](#technical-stack)
4. [Scripts List](#scripts-list)
5. [Setup Instructions](#setup-instructions)

## Description
Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment 🏪. 

Users can browse through a vast range of products 📚👗👟, view detailed descriptions, add their favorite items to the basket 🛒, and proceed to checkout 💳. It includes features such as user registration and login 📝🔐, product search 🔍, product categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

The application is a Single Page Application (SPA) i.e. dynamically rewrites a current web page with new data from the web server.

Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

The application is powered by CommerceTools 🌐, a leading provider of commerce solutions for B2C and B2B enterprises. CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences.

## Purpose
The main idea of our application is to become a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

## Technical Stack
1. **TypeScript**: ensures type safety and improve the maintainability and scalability of the application.
2. **React**: front-end JS library for building user interfaces based on components.
3. **CommerceTools API**: provides business logic for commerce solutions as web services.
4. **ESLint**: enforces consistent coding styles and identify potential issues in the codebase.
5. **Prettier**: automatically formates code, ensuring a consistent and readable code style.
6. **Husky**: manages Git hooks, automating tasks such as code formatting and linting checks during the commit process.
7. **Jest**: the testing framework, enabling comprehensive testing of code functionality.
8. **Vite**: bundles JS files for usage in a browser.
9. **React Router**: Facilitates navigation and routing in a React application, enabling dynamic and multi-page experiences.
10. **GitHub Project board**: represents work and its path towards completion.

## Scripts List
1. **ESLint**: 
- `npm run lint`: check the code on formatting problems,
- `npm run lint:fix`: fix problems.
2. **Prettier**: 
- `npm run check-format`: check the code on formatting problems,
- `npm run format`: fix problems.
3. **Jest**: 
- `npm run test`: test the code.
4. **Vite**: 
- `npm run dev`: start a local web server with HMR for development,
- `npm run build`: build the project, and outputs to the folder ./dist,
- `npm run preview`: start a local web server that serves the built solution from ./dist for previewing.
5. **Husky**: 
- `npm run prepare`: install Git hooks.

## Setup Instructions
1. **Clone repository**:  
- *https* : `git clone https://github.com/DanilBogdanov/eCommerce-Application.git`,
- *SSH* : `git clone git@github.com:DanilBogdanov/eCommerce-Application.git`.
2. **Install dependencies**: `npm install`.
3. **Build the project**: `npm run build`.
4. **Start a local web server for preview**: `npm run preview`.
5. **Open this address in browser**: `http://localhost:4173/`.
6. **You are awasome!**