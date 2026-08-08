# Interview API

A backend API for an interview question bank. It lets users register, log in, and
browse interview questions filtered by topic or difficulty, while admin accounts can
add, update, and remove questions. Built with Node.js, Express, and MongoDB, and
secured with JWT authentication and role-based access control.

**Live URL:** https://interview-api-dd6a.onrender.com

---

## Table of Contents

- Overview
- Tech Stack
- Features
- Architecture
- API Endpoints
- Environment Variables
- Running Locally
- Challenges & What I Learned
- Future Improvements

---

## Overview

This project is a REST API — the backend service behind an interview preparation
platform. A frontend (web app, mobile app, or a tool like Postman) can connect to it to
let users create an account, verify their email, log in, and then browse a bank of
interview questions. Regular users have read-only access to the question bank, while
users with an "admin" role can create, edit, replace, and delete questions, keeping the
question bank curated and up to date.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Runtime | Node.js | JavaScript runtime for the server |
| Framework | Express.js | Handles all HTTP routes |
| Database | MongoDB | Stores users, admins, and interview questions |
| ODM | Mongoose | Structures and validates data from Node before it reaches MongoDB |
| Authentication | JSON Web Tokens (JWT) | Verifies who's making each request, stored as an httpOnly cookie |
| Password security | bcrypt | Hashes passwords before storing them |
| Input validation | express-validator | Validates and sanitizes incoming request data (e.g. password strength, email format) |
| Rate limiting | express-rate-limit | Protects routes from being spammed or brute-forced |
| Email | Nodemailer | Sends OTP verification codes and password reset links |
| Payments (planned) | Stripe | Scaffolded for future premium/paid features |
| OAuth (planned) | Passport (Google OAuth2) | Scaffolded for future "Sign in with Google" support |
| Hosting | Render | Deploys the app and gives it a public URL |

---

## Features

**Authentication**
- Register with email/password, verified via a one-time password (OTP) sent by email
- Resend OTP if it expires or gets lost
- Password strength is enforced at registration: must include a number, an uppercase
  letter, a lowercase letter, and a special character
- Login with JWT issued as an httpOnly cookie
- Forgot password / reset password via an emailed reset link
- Logout, which clears the auth cookie

**Question Bank**
- Get all questions
- Get questions by topic
- Filter questions by difficulty
- Get a single question by its ID
- Update a question (partial update)
- Replace a question (full overwrite)
- Delete a question
- Add a new question

**Role-Based Access Control**
- Regular users can only read questions
- Only accounts with an "admin" role can add, update, replace, or delete questions,
  enforced through dedicated middleware that checks the role stored in the user's JWT

**Rate Limiting**
- Every route is protected by a rate limiter to reduce the risk of abuse or brute-force
  attempts, particularly on login and OTP-related endpoints

**Planned, Not Yet Active**
- Google OAuth login (dependencies and route scaffolding exist, currently disabled)
- Stripe-based payments and webhook handling (scaffolded, currently disabled)

---

## Architecture

The project follows a layered backend structure:

Router      -->  defines URL paths (e.g. POST /api/login)
Controller  -->  contains the actual logic for each route
Middleware  -->  runs before a route (auth checks, admin checks, validation, rate limiting)
Model       -->  defines the shape of data stored in MongoDB (Student, Admin, Question)

Requests pass through a chain of middleware before reaching their controller. For
example, adding a new question passes through: rate limiter -> auth check (valid JWT?)
-> admin check (is this user an admin?) -> the actual controller logic. This keeps
permission logic separate from business logic, making each layer easier to test and
reason about independently.

---

## API Endpoints

Base URL: https://interview-api-dd6a.onrender.com

**Authentication**

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/register | Register a new user, triggers an OTP email |
| PATCH | /api/verifyotp | Verify the OTP and activate the account |
| POST | /api/resendotp | Resend a new OTP if the previous one expired |
| POST | /api/login | Log in and receive an auth token (set as an httpOnly cookie) |
| POST | /api/logout | Log out and clear the auth cookie (requires authentication) |
| POST | /api/forgotpassword | Request a password reset link by email |
| PATCH | /api/resetPassword/:token | Reset the password using the token from the email |

**Questions** (all require authentication; admin-only routes are marked)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /api/getAllQuestion | Get every question in the bank | Any logged-in user |
| GET | /api/singleTopic/:topic | Get all questions under a specific topic | Any logged-in user |
| GET | /api/difficultQuestions | Filter questions by difficulty (via query param) | Any logged-in user |
| GET | /api/question/:id | Get a single question by its ID | Any logged-in user |
| PUT | /api/updateQuestion/:id | Replace a question entirely | Admin only |
| PATCH | /api/upDateQuestion/:id | Partially update a question | Admin only |
| DELETE | /api/delete/:id | Delete a question | Admin only |
| POST | /api/addQuestion | Add a new question | Admin only |

---

## Environment Variables

The following variables must be set (in a local .env file for development, or in your
hosting provider's environment settings for production):

MONGODB_URI=          # your MongoDB connection string
JWT_SECRET_KEY=        # any long random string, used to sign auth tokens
EMAIL_SENDER=          # the email address used to send OTP/reset emails
EMAIL_PASSWORD=        # an app-specific password for that email account
NODE_ENV=               # "development" or "production"
PORT=                   # defaults to 3000 if not set

None of these values should ever be committed to version control. The .env file is
excluded via .gitignore.

---

## Running Locally

git clone https://github.com/SilentAchiever-stack/Interview_Api.git
cd Interview_Api
npm install

Create a .env file in the project root with the variables listed above, then:

npm run dev

The server will start on http://localhost:3000 (or whichever port is set in .env).

---

## Challenges & What I Learned

**Role-based permissions as a distinct layer.** Rather than checking "is this user an
admin" inside every controller function, that check was pulled out into its own
reusable middleware that runs before the controller. This keeps the authorization logic
in one place and makes it trivial to add or remove admin protection from any route.

**Consistent, layered validation.** Input validation (like password strength rules and
email format) is handled at the middleware level using express-validator, before a
request ever reaches the controller. This keeps controllers focused purely on business
logic, rather than mixing validation and data-handling concerns together.

**Disabling incomplete features safely.** Some features (Google OAuth, Stripe payments)
were scaffolded early but aren't fully wired up yet. Rather than deleting that code,
the relevant requires and routes were commented out in server.js. This surfaced an
important lesson: commenting out a file's usage isn't enough on its own if the file is
also excluded from version control — both the file and every place that imports it need
to be in sync, or the app will crash on deployment with a "module not found" error even
though it runs fine locally.

**Deploying and debugging in a live environment.** Errors that never appear locally can
surface only after deployment, e.g. a missing dependency that was installed locally but
never added to package.json, or a required file that was excluded via .gitignore but
still referenced elsewhere in the code. Reading deployment logs carefully, one line at
a time, was essential to tracing these back to their actual cause.

---

## Future Improvements

- Finish and enable Google OAuth login
- Finish and enable Stripe-based payments for premium content
- Add automated tests (unit tests for controllers, integration tests for full routes)
- Add pagination to the "get all questions" endpoint as the question bank grows
- Add search functionality across question text, not just topic/difficulty filters
