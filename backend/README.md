This is a Car Dealership Inventory Management System built using the MERN stack (MongoDB, Express, React, Node.js).
The goal is to provide a simple and fast tool for car dealers to manage:

Vehicle inventory

Sold units

Test-drive scheduling

Basic dashboard stats

User authentication (Admin + Sales roles)

This is an MVP (Minimum Viable Product) built for rapid development.

🛠️ Tech Stack
Frontend

React

Axios

React Router

Bootstrap/Tailwind (optional)

Backend

Node.js

Express.js

Mongoose

JSON Web Tokens (JWT) for authentication

Database

MongoDB (Atlas or local)

📂 Project Structure
project/
  backend/
    server.js
    routes/
    controllers/
    models/
    middleware/
  frontend/
    src/
      components/
      pages/
      App.js

🚀 Features (MVP)
✔ Inventory Management

Add new vehicles

Edit vehicle details

Delete vehicles

Mark vehicles as "Sold"

✔ Test Drive Scheduler

Book a test drive

View upcoming bookings

✔ Authentication

Login

JWT-based session

Admin & Sales roles

✔ Dashboard

Total cars in stock

Total sold

Total test-drive bookings

Installation & Setup
1Cone the repo
git clone https://github.com/joseph-musyoki/car-deals.git
cd car-inventory-system

Backend Setup
backend
npm install


Create a .env file:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Start server:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm start


React runs on http://localhost:3000

Backend runs on http://localhost:5000

🔗 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login

Vehicles
GET    /api/vehicles
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id

Test Drives
POST   /api/testdrives
GET    /api/testdrives

Dashboard
GET    /api/dashboard/stats

✨ Screens Included (MVP)

Login

Dashboard

Vehicle Inventory

Add/Edit Vehicle

Test Drive Booking

Test Drive List

Future Improvements (Optional)

Customer portal

Image uploads (S3)

Calendar integration

Sales reports

Advanced analytics

Multi-location support