# PropNest - Real Estate Buyer Portal

A sleek, intuitive buyer portal for a real estate agency, focused on user privacy and property curation. Built tightly integrated using React + Redux on the frontend and NestJS matching backend.

## Tech Stack
-   **Frontend:** React (Vite), Tailwind CSS, Redux Toolkit (RTK Query), React Router v6, React Hot Toast
-   **Backend:** NestJS, TypeScript, MongoDB (Mongoose), JWT Security
-   **Icons & styling:** lucide-react, Google Inter Fonts, Glassmorphism elements

## Features
-   Secure JWT-based authentication
-   User registration and personalized login functionality
-   Full dashboard to view user status and properties
-   Adding, managing, and securely deleting favourite properties
-   "My Favourites" are strictly scoped to the currently authenticated user

---

## 🚀 Running the App Locally

### 1. Start the Backend
Navigate to your backend directory:
```bash
cd backend/backend
npm install
# Make sure your .env has MONGO_URI setup and JWT_SECRET
npm run start:dev
```
The backend starts on **http://localhost:3001** and allows CORS from `http://localhost:3000` (or your frontend url).

### 2. Start the Frontend
In a separate terminal, navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
The application will be running locally (usually port `5173` or `3000`).

---

## 💡 Example Flow
1.  **Welcome / Register:** Navigate to the `/register` route. Input your `First Name`, `Last Name`, `Email`, and `Password`. This persists to the MongoDB users collection.
2.  **Login:** Head to `/login` to sign in. Once authorized, a JWT token is created by NestJS, and your local Redux Store saves the user instance safely.
3.  **Dashboard:** Access the `/dashboard`. You will see your name dynamically fetched. It will initially show "No favourites."
4.  **Save properties:** Click on `Add Property`. A sleek modal pops up. Enter dummy property info, hit "Save." RTK Query instantly adds this to Mongo and elegantly updates the UI via cache invalidation.
5.  **Remove properties:** Click the *Trash* icon on any property card to cleanly delete it. The UI feels instant thanks to optimized RTK slice invalidation.
