🎬 MovieTracker
MovieTracker is a full-featured fullstack application for tracking your watched movies.
It allows users to register, log in, add and manage movies, apply filters, rate, and track viewing status.
🔧 Tech Stack
   Frontend:
React (with Vite)
React Router
Context API for authentication
Axios – centralized API instance with interceptors
Vanilla CSS
Fully responsive design

   Backend:
Node.js + Express
MongoDB (with Mongoose)
JWT-based authentication
RESTful API (/api/v1)
Filtering, pagination, search, and custom error handling

🔗Live Demo
Frontend (Vercel): https://movie-tracker-blond.vercel.app
Backend API (Render): https://movietracker-ryhw.onrender.com/api-docs

⚠️ Note: If testing locally, make sure your backend is running at http://localhost:3000.

✅ Features
 JWT-based user registration and login
 Auth state stored in localStorage with protected routes
 Full CRUD for movies (create, read, update, delete)
 Search by title and director
 Filter by genre, age rating, status, and user rating 
 Default fallback poster if none is provided
 Fully responsive layout for mobile and desktop
![Screenshot 2025-06-23 at 7 55 38 PM](https://github.com/user-attachments/assets/8b2dca71-f904-4fa9-8f5d-c522a4e8a436)
![Screenshot 2025-06-23 at 7 56 09 PM](https://github.com/user-attachments/assets/532ab2b9-fbb2-4dff-b142-e5cba8142f61)

 📖 API Documentation (Swagger)
This project includes full API documentation using Swagger (OpenAPI 3.0). All endpoints are documented and split into separate YAML files for clarity.
🔹 How to Access
Live: https://movietracker-ryhw.onrender.com/api-docs
Local: after running your backend locally, visit http://localhost:3000/api-docs
Explore and test endpoints (e.g. register, login, create/delete/update/get a movie)
Authorize with a Bearer token to test protected routes
![Screenshot 2025-06-23 at 11 43 53 PM](https://github.com/user-attachments/assets/87721d2e-0aae-4266-bbd3-afcc33453908)

🚀 Getting Started (Local)
1.Clone the repo: git clone https://github.com/yourusername/MovieTracker.git
2.Install frontend & backend dependencies: cd Frontend npm install
                                           cd Backend npm install
3. Set up environment variables: create .env in both Frontend and Backend with:

Frontend:
VITE_API_URL=http://localhost:3000/api/v1
Backend:
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret    

4.Run both servers
                                          
