# Tour Booking Backend API

## Overview

This project is a RESTful backend system for a tour booking platform. It manages users, tours, buses, and bookings while implementing secure authentication and role-based access control. The API handles the full lifecycle of tours, including creation, booking, cancellation, and completion while maintaining historical data.

The system is designed with modular architecture, middleware-based request handling, and centralized error management to keep the codebase maintainable and scalable.

---

## Key Features

### Authentication & Security

* User registration and login
* Password hashing using bcrypt
* JWT based authentication
* Refresh token flow for session management
* Role-based authorization for protected operations

### Tour Management

* Creation and management of tours
* Automatic bus assignment based on availability
* Tour lifecycle management including completion handling
* Historical tour records preserved

### Booking System

* Seat reservation system for tours
* Seat availability control to prevent overbooking
* Booking cancellation with seat restoration
* Booking history retrieval

### Middleware Architecture

* Token verification middleware
* Role-based authorization middleware
* Centralized error handling
* Async request handler wrapper

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Tokens)
* bcrypt

---

## API Capabilities

The API provides endpoints for:

* User authentication and session management
* Tour creation and retrieval
* Bus management
* Tour booking and cancellation
* Role-restricted administrative operations

---

## Security Considerations

* Passwords are securely hashed before storage.
* JWT tokens are used for authenticated requests.
* Role-based authorization prevents unauthorized actions.
* Refresh tokens allow secure session renewal.

---

## Learning Outcomes

This project demonstrates backend system design including authentication flows, middleware architecture, relational data modeling in MongoDB, and implementation of secure server-side business logic.
