# Task Manager API

This is a Task Manager API built using Node.js and Express, which allows users to register, log in, and manage events. The API provides functionality for event creation, updates, and registrations, with role-based access control.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [License](#license)

## Features

- **User Registration & Login**: Allows users to register with their name, email, and password. Registered users can log in to get a JWT token.
- **Role-based Access**: Supports different roles such as `attendee` and `organizer` with specific permissions for managing events.
- **Event Management**: Organizers can create, update, and delete events. Attendees can register for events.
- **JWT Authentication**: All sensitive routes are protected by JWT token authentication.
  
## Technologies

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for building the API.
- **bcrypt**: For hashing passwords securely.
- **jsonwebtoken (JWT)**: For creating and verifying JSON Web Tokens.
- **dotenv**: To manage environment variables.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/task-manager-api.git
    cd task-manager-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project to store environment variables like `JWT_SECRET`:
    ```plaintext
    JWT_SECRET=your_jwt_secret_key
    PORT=3000
    ```

## Usage

After installing the dependencies and setting up the environment variables, you can start the server by running:

```bash
npm start