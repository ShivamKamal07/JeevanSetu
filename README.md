# 🏥 JeevanSetu - Smart Healthcare Appointment & Queue Management System

JeevanSetu is a full-stack MERN healthcare application that connects **patients** and **doctors** through a modern digital platform. It simplifies appointment booking, live queue management, AI-powered symptom checking, doctor-patient communication, and digital prescriptions.

---

# 📌 Features

## 👤 Patient

- Secure JWT Authentication
- Patient Dashboard
- AI Symptom Checker
- Find Doctors
- Book Appointments
- View Upcoming Appointments
- Live Queue Status
- My Appointments
- Chat with Doctor
- View Digital Prescription
- Cancel Appointment

---

## 👨‍⚕️ Doctor

- Secure Login
- Doctor Dashboard
- View Today's Appointments
- Approve Appointments
- Cancel Appointments
- Manage Queue
- Chat with Patients
- Create Digital Prescription
- View Appointment Statistics

---

## 🤖 AI Features

- AI Symptom Checker
- Intelligent Healthcare Guidance
- Smart Appointment Workflow

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- ShadCN UI
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io (Chat)

---

## Database

- MongoDB Atlas / Local MongoDB

---

# 📂 Project Structure

```text
JeevanSetu/
│
├── frontend/
│
│   ├── src/
│   │
│   ├── app/
│   ├── assets/
│   ├── features/
│   │
│   │   ├── auth/
│   │   ├── patient/
│   │   ├── doctor/
│   │   ├── chat/
│   │   ├── prescription/
│   │   └── landing/
│   │
│   ├── services/
│   ├── shared/
│   └── index.js
│
└── backend/
    │
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── socket/
    ├── utils/
    └── server.js
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/JeevanSetu.git
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend

npm install

npm start
```

Backend runs on

```
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Authentication

The application uses **JWT Authentication**.

After successful login the following data is stored in Local Storage.

```javascript
token
userId
role
name
```

---

# API Modules

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Doctors

```
GET /api/doctors

GET /api/doctors/:id
```

---

## Appointments

```
GET    /api/appointments/user/:userId

POST   /api/appointments

DELETE /api/appointments/:id

PUT    /api/appointments/:id/approve

PUT    /api/appointments/:id/cancel
```

---

## Queue

```
GET /api/appointments/queue/:doctorId/:userId
```

Returns

```json
{
    "yourToken":5,
    "currentToken":2,
    "patientsAhead":3,
    "waitingTime":15
}
```

---

## Chat

```
GET /api/chat/:conversationId

POST /api/chat/send
```

---

## Prescription

```
POST /api/prescriptions

GET /api/prescriptions/patient/:id

GET /api/prescriptions/:id
```

---

# Database Models

- User
- Patient
- Doctor
- Appointment
- Queue
- Conversation
- Chat
- Prescription
- Notification

---

# Key Functionalities

✅ Secure JWT Authentication

✅ Doctor Search

✅ Appointment Booking

✅ Appointment Approval

✅ Appointment Cancellation

✅ Live Queue Tracking

✅ Doctor Dashboard

✅ Patient Dashboard

✅ AI Symptom Checker

✅ Doctor-Patient Chat

✅ Digital Prescription

✅ Responsive Design

---

# Future Enhancements

- Video Consultation
- Payment Gateway
- Email Notifications
- SMS Notifications
- AI Health Reports
- Voice Assistant
- Medical History Timeline
- Admin Dashboard
- Multi-language Support
- Appointment Reminder Notifications

---

# Screenshots

Add screenshots here.

```
Landing Page

Patient Dashboard

Doctor Dashboard

Queue Status

Appointment Booking

Chat Module

Prescription Module
```

---

# Authors

**Shivam Kamal**

Full Stack MERN Developer

---

# License

This project is developed for educational and academic purposes.

---

# Acknowledgements

- React
- Node.js
- Express.js
- MongoDB
- Tailwind CSS
- ShadCN UI
- Socket.io
- Loveable AI
- OpenAI
