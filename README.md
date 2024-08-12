Welcome to the MailFusion! This React-based frontend application is designed to help you create and manage beautiful email templates with ease. The application is hosted on Vercel, ensuring fast and reliable access.

## Live Demo

Check out the live version of the app [here](#).

## Overview

MailFusion is built with a focus on providing an intuitive user experience while leveraging modern web development technologies. The frontend handles the user interface, where users can input their preferences, generate templates, and manage saved designs.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Code Explanation](#code-explanation)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [License](#license)

## Tech Stack

This project uses a variety of technologies to create a robust and dynamic web application:

- **React**: The core library for building user interfaces.
- **React Router**: For handling navigation and routing within the app.
- **Axios**: Used for making HTTP requests to the backend API.
- **Styled Components**: For writing CSS that's scoped to individual components.
- **Vercel**: For hosting and deploying the application seamlessly.

## Code Explanation

The frontend is designed to be modular, with each component handling a specific part of the user interface. Here’s a brief overview of how the code is organized:

- **Components**: Each feature or section of the app is encapsulated within its own component, making the code easy to maintain and extend. For example, the `TemplateForm` component handles the form where users input their template details, while the `TemplateList` component displays a list of saved templates.

- **State Management**: We use React's `useState` and `useEffect` hooks to manage local state within components, ensuring that the app responds to user interactions in real-time.

- **API Integration**: Axios is used to communicate with the backend API, sending requests to generate new templates, save them, or fetch saved templates for the user.

- **Styling**: Styled Components allow us to write CSS directly in our JavaScript files, scoping styles to specific components and ensuring that our design is consistent and modular.

## Installation

To get started with this project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/EmailTemplateGenerator.git
   cd EmailTemplateGenerator/template-generation-main
   ```

2. **Install dependencies:**

   Make sure you have Node.js installed. Then, run:

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm start
   ```

   This will start the app on `http://localhost:3000`.

## Project Structure

Here’s a quick rundown of the key directories and files in the project:

- **`src/`**: Contains all the React components, pages, and styles.
  - **`components/`**: Reusable UI components.
  - **`pages/`**: Different pages of the application (e.g., Home, Login, Dashboard).
  - **`styles/`**: Global styles and theme settings.
- **`public/`**: Static files like `index.html` and images.
- **`build/`**: The production-ready version of the app.
- **`.env`**: Configuration for environment variables.

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Starts the app in development mode.
- **`npm run build`**: Builds the app for production, optimizing the output for best performance.
- **`npm test`**: Runs the test suite to ensure that everything works as expected.

## Deployment

Deploying this project to Vercel is straightforward:

1. Install the Vercel CLI if you haven’t already:

   ```bash
   npm install -g vercel
   ```

2. Deploy the app with:

   ```bash
   vercel
   ```

   Follow the prompts to set up your project. Vercel will handle the rest, ensuring your app is live and accessible.
