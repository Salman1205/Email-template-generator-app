# MailFusion - Create, Edit, and Elevate Email Templates

Welcome to MailFusion! This repository houses both the frontend and backend components of our application, designed to help you create, manage, and elevate beautiful email templates with ease. 

## Live Demo

Check out the live version of the app [here](https://mail-fusion-create-edit-and-elevate-email-templates.vercel.app/signup).

## Overview

MailFusion is a comprehensive email template generation platform. The backend is built with Flask and handles user authentication, template generation, and data management. The frontend, built with React, provides an intuitive user interface for interacting with the backend services.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Code Explanation](#code-explanation)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Available Routes](#available-routes)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)

## Tech Stack

### Backend

- **Flask**: Lightweight WSGI web application framework in Python.
- **Flask-SQLAlchemy**: ORM for interacting with the database.
- **Flask-JWT-Extended**: Handles JWT for secure user authentication.
- **Azure SQL Database**: Database for storing user and template data.
- **Gunicorn**: WSGI HTTP server for UNIX.
- **Docker**: Optional containerization.
- **Gemini API**: For advanced AI text generation.
- **Unsplash API**: For fetching high-quality images.

### Frontend

- **React**: Core library for building user interfaces.
- **React Router**: Handles navigation and routing.
- **Axios**: For making HTTP requests.
- **Styled Components**: For scoped component-level styling.
- **Vercel**: Hosting and deployment.

## Code Explanation

### Backend

- **Routes**: Defined in `app.py`, handling user login, signup, and template management.
- **Authentication**: Managed with JWT tokens.
- **Template Generation**: Uses Gemini API for generating email content.
- **Image Integration**: Uses Unsplash API for fetching images.
- **Database Models**: Defined in `models.py` with SQLAlchemy.

### Frontend

- **Components**: Modular components for UI features (e.g., `TemplateForm`, `TemplateList`).
- **State Management**: Uses React hooks (`useState`, `useEffect`).
- **API Integration**: Axios for communication with backend APIs.
- **Styling**: Scoped using Styled Components.

## Installation

### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/MailFusion-Create-Edit-and-Elevate-Email-Templates.git
   cd MailFusion-Create-Edit-and-Elevate-Email-Templates/backend
   ```

2. **Set up a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory with the following variables:

   ```bash
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your_secret_key
   JWT_SECRET_KEY=your_jwt_secret_key
   SQLALCHEMY_DATABASE_URI=sqlite:///db.sqlite3  # Or your preferred database
   GEMINI_API_KEY=your_gemini_api_key
   UNSPLASH_API_KEY=your_unsplash_api_key
   ```

### Frontend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/MailFusion-Create-Edit-and-Elevate-Email-Templates.git
   cd MailFusion-Create-Edit-and-Elevate-Email-Templates/frontend
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

### Backend

- **`app.py`**: The main application file containing the routes and application setup.

### Frontend

- **`src/`**: Contains all the React components, pages, and styles.
  - **`components/`**: Reusable UI components.
  - **`pages/`**: Different pages of the application (e.g., Home, Login, Dashboard).
  - **`CSS/`**: Global styles and theme settings.
- **`public/`**: Static files like `index.html` and images.
- **`build/`**: The production-ready version of the app.

## Available Scripts

### Backend

- **`flask run`**: Starts the Flask application.

### Frontend

- **`npm start`**: Starts the React app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm test`**: Runs the test suite.

## Available Routes

- **`/login`**: POST - Authenticates a user and returns a JWT token.
- **`/signup`**: POST - Registers a new user.
- **`/query`**: POST - Handles email template generation requests.
- **`/save-template`**: POST - Saves a generated email template.
- **`/templates`**: GET - Retrieves saved templates.

## Environment Variables

Ensure the following environment variables are set:

- **Backend**
  - `FLASK_APP`
  - `FLASK_ENV`
  - `SECRET_KEY`
  - `JWT_SECRET_KEY`
  - `SQLALCHEMY_DATABASE_URI`
  - `GEMINI_API_KEY`
  - `UNSPLASH_API_KEY`

- **Frontend**
  - `REACT_APP_BACKEND_URL`: The URL of the backend API.

## Running the Application

- **Backend**: Use `flask run` to start the backend server.
- **Frontend**: Use `npm start` to start the React app.

## Deployment

- **Backend**: Deploy using Vercel,Gunicorn, Heroku, or Docker.
- **Frontend**: Deploy to Vercel with the Vercel CLI.
