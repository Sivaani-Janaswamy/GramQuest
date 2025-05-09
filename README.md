Guide to Start Contributing to the Project 

Layout:
project-root/               #GramQuest
├── client/                 # Frontend (Vite + React)
├── server/                 # Backend (Node.js + Express + MongoDB)
│   ├── uploads/            # Folder for storing uploaded files
│   └── ensureUploadsFolder.js
├── .gitignore
├── README.md

Prerequisites:
=>Node.js ≥ 18.x
=>npm or pnpm
=>MongoDB Atlas connection string (ask the maintainer or set up your own)

Setup Instructions:
git clone
cd your-repo

Install dependencies:
For Backend - server
=>cd server
=>npm install
This will automatically create the /uploads folder and .gitkeep file via the postinstall script.

For Frontend - client
=>cd ../client
=>npm install


Set up environment variables:
=>Create a .env file in the /server folder: touch server/.env
=>Add the following:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key

Run the Application:
Backend
=>cd server
=?npm start
Frontend
=>cd client
=>npm run dev

