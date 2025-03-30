# EduCore - Learning Management System (LMS)

EduCore is a **full-stack Learning Management System (LMS)** built using the **MERN (MongoDB, Express.js, React, Node.js) stack**. This platform enables users to **create, manage, and enroll** in courses with secure authentication and cloud storage for learning materials. It is designed to provide an interactive and scalable online learning experience.

## 🚀 Features
- **User Authentication & Authorization**
  - Signup/Login using **JWT (JSON Web Token)**
  - OAuth 2.0 authentication with **Google Login**
  - Role-Based Access Control (**Admin, Instructor, Student**)
  
- **Course Management**
  - Create, edit, and delete courses
  - Manage course content including videos, PDFs, and quizzes
  - Enroll and track progress in courses
  
- **Secure File Uploads**
  - Integration with **Cloudinary** for media storage
  - Upload and manage course-related files (videos, PDFs, assignments)
  
- **API-Driven Architecture**
  - Built with **RESTful APIs** for efficient communication
  - Secure endpoints with authentication middleware

- **Dashboard & User Profiles**
  - Interactive instructor and student dashboards
  - Track completed courses and learning progress
  
- **Payment & Subscription (Upcoming Feature)**
  - Stripe/Razorpay integration for paid courses

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Next.js (if applicable)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT, OAuth 2.0 (Google Login)
- **Cloud Storage:** Cloudinary (for file uploads)
- **Styling:** Tailwind CSS / Material-UI
- **Payment Gateway:** (Upcoming Feature: Stripe/Razorpay)

---

## 📂 Folder Structure
```
📦 EduCore
├── 📂 client (Frontend - React/Next.js)
│   ├── pages/ (Next.js pages or React components)
│   ├── components/ (Reusable UI components)
│   ├── styles/ (CSS/Tailwind styling)
│   ├── utils/ (Helper functions)
│   ├── redux/ (State management with Redux)
│   ├── public/ (Static assets)
│
├── 📂 server (Backend - Express.js)
│   ├── models/ (Mongoose Schemas for Users, Courses, etc.)
│   ├── routes/ (API Routes for authentication, courses, payments)
│   ├── controllers/ (Business Logic for APIs)
│   ├── middleware/ (Auth Middleware & Error Handlers)
│   ├── config/ (DB Connection & Cloudinary Setup)
│   ├── index.js (Main Express App Entry Point)
│
├── .env (Environment Variables for Security)
├── .gitignore (Git ignored files)
├── package.json (Project Dependencies)
├── README.md (Project Documentation)
```

---

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/devkushwah22/EduCore.git
cd EduCore
```

### 2️⃣ Install Dependencies
```sh
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the `server/` directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4️⃣ Run the Project
```sh
# Start Backend Server
cd server
npm run dev

# Start Frontend
cd client
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user with JWT |
| GET | `/api/auth/google` | Google OAuth Login |
| GET | `/api/courses` | Fetch all available courses |
| POST | `/api/courses/create` | Create a new course (Instructor only) |
| GET | `/api/courses/:id` | Fetch details of a single course |
| POST | `/api/courses/enroll/:id` | Enroll in a course |
| GET | `/api/user/profile` | Fetch user profile (Protected) |

---

## ✨ Future Enhancements
- **Quiz & Assignments**
- **Course Reviews & Ratings**
- **Live Class Integration (Zoom/WebRTC)**
- **Certificate Generation**
- **Dark Mode UI Theme**
- **Multilingual Support**

---

## 🏆 Contributing
Contributions are welcome! Feel free to fork the repository, submit a pull request, or open an issue.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

