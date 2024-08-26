# Spicy Cravings

Spicy Cravings is an online food ordering system that allows users to browse a menu, add items to a cart, and place orders. The project is built using a React frontend and a Node.js/Express backend, with SQLite as the database.

## Table of Contents

- [Demo](#demo)
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Running the Project](#running-the-project)

## Demo

Check out the live demo of the application: [Live Demo](https://spicy-cravings.vercel.app/)

## Project Overview

Spicy Cravings allows users to:

- Browse a menu of food items
- Apply filters to items
- Add items to a cart
- Place an order and receive a confirmation message

## Features

- **Authentication**: Secure user authentication using JWT.
- **Menu Display**: Dynamic menu display from the backend.
- **Cart Management**: Add, remove, and manage cart items.
- **Order Placement**: Users can place orders with real-time order confirmation.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- SQLite3

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prasanth-p8/Spicy_Cravings_Backend.git
   cd Spicy_Cravings_Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the SQLite database:**

   Ensure you have SQLite installed and set up the database by running the SQL scripts provided (if any).

4. **Environment Variables:**

   PORT= 3000 <br>
   JWT_SECRET= your_secret_key

5. **Run the backend server:**

   ```bash
   npm install
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST `/login`:** Authenticate user and stores the JWT token.

### Register

- **POST `/register`:** Adds user data into database.

### Home

- **GET `/`:** Retrieve the username and store it on header.

### Menu

- **GET `/menu`:** Retrieve the list of menu items.

### Account

- **GET `/profile`:** Retrieves all data of the user.

## Running the Project

1. **Start the Backend:**

   ```bash
   npm start
   ```

   The backend server should be running on http://localhost:3000.

2. **Run the Frontend:**

   Assuming you have the frontend in a separate repository, ensure it's running concurrently with the backend.
