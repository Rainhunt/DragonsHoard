
# Dragon's Hoard Frontend Project

Welcome to the Dragon's Hoard Frontend Project! This is a React TypeScript application designed to provide a comprehensive toolbox for running Dungeons & Dragons (D&D) games. It includes features such as a searchable and filterable monster database (along with the rest of the 5e SRD rules) and a Virtual Tabletop (VTT) for running sessions (currently not implemented).

## Table of Contents

- [Installation](#installation)
  - [System Requirements](#system-requirements)
  - [Steps](#steps)
- [Usage](#usage)
- [Features](#features)
  - [Key Libraries Used](#summary-of-key-libraries-used)
  - [Routing](#routing)
  - [User Management](#user-management)
  - [Monsters Management](#monsters-management)
  - [Permissions](#permissions)
- [API Integration](#api-integration)
  - [User Authentication](#user-authentication)
  - [Monster Management](#monster-management)

## Installation

To install and set up the project locally, follow these steps:

### System Requirements

- **Node.js**: Version 16 or higher (can be downloaded from [nodejs.org](https://nodejs.org/)).
- **npm**: Comes bundled with Node.js (ensure it’s updated to version 6 or higher).

### Steps

1. Clone the repository:
```bash
git clone https://github.com/Rainhunt/DragonsHoard
```
2.  Install the libraries:

```bash
cd DragonsHoard
npm install
``` 

3.  Start the development server:





## Usage

1.  Start the server:
```bash
npm run dev
``` 
2.  Your app will now be running locally at
`http://localhost:5173`

## Features

### Summary of Key Libraries Used:

-   **react**: A JavaScript library for building user interfaces.
-   **react-router-dom**: A routing library for handling navigation within the app.
-   **jwt-decode**: A library to decode JWT tokens.
-   **zod**: A TypeScript-first schema validation library.

---

### Routing

The app uses `react-router-dom` to manage navigation between pages. Here are some key routes:

-   **/**: Home Page. Find out everything that is going on at DragonsHoard.
-   **/about**: About Page. A short summary of who we are and what our vision is.
-   **/codex**: View and search the monster database.
-   **/monsters/statblock/:id**: View a specific monster's details.
-   **/profile**: Manage your user profile and settings.
-   **/login**: User login page.
-   **/signup**: User registration page.
---
A full list of routes can be found at the bottom of this file, or by viewing `src/routes/routerModel.ts`

### User Management

Dragon's Hoard integrates with your backend's API to allow for:

-   **User Registration**: Sign up for a new account.
-   **User Login**: Log in to create your own resources for DND.
-   **Profile Management**: Update and view your profile.
-   **Permissions**: Admin users have extended permissions to view and edit others' data.

### Monsters Management

The app provides functionality to:

-   **View Monster Database**: Browse through a collection of 5e SRD monsters.
-   **Search & Filter**: Use a powerful search and filtering system to find specific monsters.
-   **CRUD Operations**: Users can add custom homebrew content.

### Page Permissions

Permissions and page access are controlled based on user roles:

-   **Admin**: Admin users can access all routes and perform CRUD operations on all data.
-   **Regular User**: Regular users can access their own profile and monsters but cannot modify others’ data.

## API Integration

### User Authentication

The app integrates with the backend API for user authentication and management. When users log in, a **JWT token** is received and stored in the browser’s local storage. This token is used to authenticate the user on subsequent requests.

-   **JWT Token Storage**: The token is decoded using `jwt-decode` to extract user data like role and permissions.
-   **Protected Routes**: Certain routes are protected and require a valid token to access.

### Monster Management

Monsters can be viewed, added, and modified through the frontend, with data coming from the backend API.

-   **Fetching Monsters**: The app queries the backend API to fetch the monster database and specific monster details.

## VTT (Virtual Tabletop)

-   **Not Implemented**: The Virtual Tabletop feature is planned for future implementation. Once completed, it will allow Dungeon Masters to manage maps, tokens, and combat directly within the application.

## Routes

| Route Name          | Path                     | Description                                  |
|---------------------|--------------------------|----------------------------------------------|
| ROOT                | /                        | The homepage of the application.             |
| ABOUT               | /about                   | Information about the application.           |
| CODEX               | /codex                   | Access to the SRD rules and other resources. |
| CODEX               | /codex/homebrew          | Access to the monsters you have created.     |
| MONSTER_STATBLOCK   | /monsters/statblock/:id  | View the statblock of a specific monster.    |
| CREATE_MONSTER      | /monsters/create         | Create a new custom monster.                 |
| SIGNUP              | /signup                  | User registration page.                      |
| LOGIN               | /login                   | User login page.                             |
| PROFILE             | /profile/:id             | View and manage user profile.                |
| EDIT_USER           | /profile/update/:id      | Update user profile information.             |
| MANAGE_USERS        | /admin/users             | Admin interface to manage users.             |
