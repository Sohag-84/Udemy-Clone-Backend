# 🎓 Udemy Clone Backend (LMS API)

A **Udemy-style Learning Management System (LMS) backend** built with **Node.js, Express, and MongoDB**.  
This project follows **real Udemy architecture** with **Course → Section → Lecture** hierarchy and supports **video uploads, preview access, and scalable curriculum management**.

---

## 🚀 Features

- ✅ Course creation & management
- ✅ Lecture management under sections
- ✅ Optional ordering for sections & lectures
- ✅ Preview vs paid lecture access
- ✅ Instructor & Admin only curriculum control
- ✅ RESTful, scalable API design
- ✅ MongoDB with Mongoose ODM


## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **Cloudinary** (Video & media storage)
- **Multer** (File uploads)
- **JWT Authentication**
- **REST API**

---

## 📂 Project Structure
```text
src/
├── controllers/
│   ├── course.controller.js
│   ├── section.controller.js
│   └── lecture.controller.js
│
├── models/
│   ├── course-model.js
│   ├── section-model.js
│   └── lecture-model.js
│
├── routes/
│   ├── course.route.js
│   ├── section.route.js
│   └── lecture.route.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── utils/
│   └── cloudinary.js
│
├── config/
│   └── db.js
│
└── server.js
```

## 🔑 Environment Variables

Create a .env file in the root directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

## ⚙️ Installation & Setup

```
# Clone repository
git clone git@github.com:Sohag-84/Udemy-Clone-Backend.git


# Navigate to project
cd Udemy-Clone-Backend

# Install dependencies
npm install

# Run development server
npm run dev

```


