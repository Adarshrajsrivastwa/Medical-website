<div align="center">

# 🏥 CareSpaceX — Medical Website

**A full-stack, AI-powered healthcare platform connecting Patients, Doctors, Hospitals, and Admins in one unified ecosystem.**

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb)](https://mongodb.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python)](https://python.org)

> **Repository:** [Adarshrajsrivastwa/Medical-website](https://github.com/Adarshrajsrivastwa/Medical-website)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
  - [Patient Dashboard](#-patient-dashboard)
  - [Doctor Dashboard](#-doctor-dashboard)
  - [Hospital Dashboard](#-hospital-dashboard)
  - [Admin Dashboard](#-admin-dashboard)
  - [AI Models](#-ai-models)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Routes](#-api-routes)
- [Database Models](#-database-models)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CareSpaceX** is a comprehensive, full-stack medical platform built to modernize healthcare delivery. It provides role-based dashboards for **Patients**, **Doctors**, **Hospitals**, and **Admins** — each with tailored features. It also integrates three AI/ML models to power a medical chatbot, a medicine analyzer, and a medicine guidelines & alternatives tool.

The platform supports:
- OTP-based authentication via Gmail SMTP
- Real-time chat using **Socket.IO**
- Online payments via **Razorpay**
- AI-powered healthcare assistance via **Google Gemini API**
- Medicine analytics via **Streamlit** dashboards
- Full **Vercel** deployment support for both frontend and backend

---

## ✨ Features

### 🧑‍⚕️ Patient Dashboard

| Feature | Description |
|---|---|
| **Profile Management** | View and update personal patient profile details |
| **Book Doctor Appointment** | Search doctors and book appointments with Razorpay payment |
| **Book Hospital Bed** | Reserve a hospital bed with integrated payment flow |
| **View Appointments** | Track all booked doctor appointments |
| **Bed Booking History** | View all past and active bed reservations |
| **Medical History** | Access full medical history and past prescriptions |
| **Chat with Doctor** | Real-time messaging with assigned doctor via Socket.IO |
| **Medicine Overview** | View medicine details, guidelines, and alternatives |
| **AI Chat Support** | Talk to Gemini-powered medical chatbot for health queries |

---

### 👨‍⚕️ Doctor Dashboard

| Feature | Description |
|---|---|
| **Profile Management** | View and update doctor profile information |
| **Appointment Management** | View, accept, and manage patient appointments |
| **Patient History** | Access full history of all patients |
| **Write Prescription** | Create and manage prescriptions for patients |
| **Chat with Patient** | Real-time messaging with patients via Socket.IO |
| **Medicine Analyzer** | AI-powered medicine review and sentiment analysis (MediTrust) |

---

### 🏨 Hospital Dashboard

| Feature | Description |
|---|---|
| **Profile Management** | View and update hospital profile information |
| **Inventory Management** | Add, update, and track hospital medical inventory |
| **Get Inventory** | View current stock levels and inventory details |
| **Bed Management** | Manage hospital bed allocations and availability |

---

### 🛡️ Admin Dashboard

| Feature | Description |
|---|---|
| **Doctor Management** | Approve or reject doctor registration requests |
| **Hospital Management** | Approve or reject hospital registration requests |

---

### 🤖 AI Models

CareSpaceX integrates **three independent AI/ML services** built with Python:

#### 1. 💬 AI Chat Support (Gemini Chatbot)
- **Tech:** FastAPI + Google Gemini 1.5 Flash
- **Endpoint:** `POST /chatbot`
- **Auth:** API Key based
- Answers any medical or general health query via Gemini generative AI
- CORS-enabled for seamless frontend integration

#### 2. 💊 Medicine Analyzer (MediTrust)
- **Tech:** Streamlit + Pandas + Scikit-learn + BeautifulSoup
- **Dataset:** `drugsComTrain_raw.tsv` + `drugsComTest_raw.tsv` (UCI Drug Reviews Dataset)
- Analyzes medicine reviews, ratings, and useful counts
- Web scrapes [drugs.com](https://www.drugs.com) for real-time drug descriptions, warnings, and precautions
- Admin analytics dashboard: scatter plots, histograms, box plots

#### 3. 🌿 Medicine Guidelines & Alternatives
- **Tech:** Streamlit + Pandas
- **Dataset:** `medicines_50.csv`
- Search any medicine name to get:
  - Usage information
  - Active ingredients
  - Side effects
  - Expiry date (with expiry warning)
  - Alternative medicine suggestions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI Framework |
| Vite | 6 | Build Tool & Dev Server |
| React Router DOM | 7 | Client-side Routing |
| Tailwind CSS | 3 | Utility-first Styling |
| Radix UI | Latest | Accessible UI Components |
| Framer Motion | 12 | Animations |
| Axios | 1.7 | HTTP Client |
| Socket.IO Client | 4.8 | Real-time Communication |
| Razorpay JS | — | Payment Integration |
| js-cookie | 3 | Cookie Management |
| Lucide React | Latest | Icon Library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express.js | 4.x | Web Framework |
| MongoDB | 6.x | Database |
| Mongoose | 8.x | ODM |
| Socket.IO | 4.8 | Real-time WebSocket |
| Nodemailer | 6.x | OTP Email via Gmail SMTP |
| Razorpay | 2.9 | Payment Gateway |
| Multer | 1.4 | File Uploads |
| dotenv | 16 | Environment Variables |
| express-session | 1.18 | Session Management |
| cookie-parser | 1.4 | Cookie Parsing |
| nodemon | 3.1 | Dev Auto-restart |

### AI Models
| Technology | Purpose |
|---|---|
| FastAPI | REST API for Chatbot |
| Google Gemini 1.5 Flash | Generative AI for Chat Support |
| Streamlit | Interactive ML dashboards |
| Pandas | Data manipulation |
| Scikit-learn | ML preprocessing |
| BeautifulSoup | Web scraping from drugs.com |
| Seaborn / Matplotlib | Data visualization |

### Deployment
| Service | Usage |
|---|---|
| Vercel | Frontend (React + Vite) |
| Vercel | Backend (Node.js / Express) |
| MongoDB Atlas | Cloud Database |

---

## 📁 Project Structure

```
Medical-website/
├── frontend/                    # React + Vite Frontend
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Authentication/
│   │   │   │   ├── SignUp.jsx       # OTP-based Signup
│   │   │   │   └── Login.jsx        # OTP-based Login
│   │   │   ├── DetailsForm/
│   │   │   │   ├── PatientDetails.jsx
│   │   │   │   ├── DoctorDetails.jsx
│   │   │   │   └── HospitalDetails.jsx
│   │   │   ├── PatientDashboard/
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── BookAppointment.jsx
│   │   │   │   ├── DoctorAppointment.jsx
│   │   │   │   ├── BookBed.jsx
│   │   │   │   ├── BedBooking.jsx
│   │   │   │   ├── History.jsx
│   │   │   │   ├── ChatWithDoctor.jsx
│   │   │   │   └── OrderMedicine.jsx
│   │   │   ├── DoctorDashboard/
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── AppointmentManagement.jsx
│   │   │   │   ├── PatientHistory.jsx
│   │   │   │   ├── Prescription.jsx
│   │   │   │   ├── ChatWithPatient.jsx
│   │   │   │   └── MedicineAnalyzer.jsx
│   │   │   ├── HospitalDashboard/
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── InventoryManagement.jsx
│   │   │   │   ├── GetInventory.jsx
│   │   │   │   └── BedManagement.jsx
│   │   │   ├── AdminDashboard/
│   │   │   │   ├── DoctorManagement.jsx
│   │   │   │   └── HospitalManagement.jsx
│   │   │   ├── Home.jsx
│   │   │   └── MedicineOverview.jsx
│   │   ├── Components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   ├── ChatInterface.jsx
│   │   │   └── DatePicker.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
│
├── backend/                     # Node.js + Express Backend
│   ├── config/
│   │   ├── db.js
│   │   └── multer.js
│   ├── models/
│   │   ├── user.js
│   │   ├── doctor.js
│   │   ├── hospital.js
│   │   ├── admin.js
│   │   ├── appointment.js
│   │   ├── bed.js
│   │   ├── chat.js
│   │   ├── payment.js
│   │   ├── medication.js
│   │   └── inventry.js
│   ├── route/
│   │   ├── signup.js
│   │   ├── detail.js
│   │   ├── doctorsearch.js
│   │   ├── appointment.js
│   │   ├── payment.js
│   │   ├── bed.js
│   │   ├── chat.js
│   │   ├── profile.js
│   │   ├── inventry.js
│   │   ├── history.js
│   │   ├── medication.js
│   │   ├── approval.js
│   │   ├── searchhistory.js
│   │   └── user.js
│   ├── .env
│   ├── app.js
│   ├── vercel.json
│   └── package.json
│
└── AI_Model/                    # Python AI/ML Services
    ├── chat_bot/
    │   ├── main.py
    │   ├── app.py
    │   └── requirements.txt
    ├── medical_medicine_analyzer/
    │   ├── app.py
    │   ├── main.py
    │   ├── drugsComTrain_raw.tsv
    │   ├── drugsComTest_raw.tsv
    │   └── requirements.txt
    └── uses_AlternativeOf_medicine/
        ├── app.py
        ├── main.py
        ├── medicines_50.csv
        └── requirements.txt
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://npmjs.com/) v9+
- [Python](https://python.org/) v3.10+
- [pip](https://pip.pypa.io/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Razorpay](https://razorpay.com/) account
- [Google AI Studio](https://aistudio.google.com/) API Key

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Adarshrajsrivastwa/Medical-website.git
cd Medical-website
```

**2. Install Backend dependencies**
```bash
cd backend
npm install
```

**3. Install Frontend dependencies**
```bash
cd ../frontend
npm install
```

**4. Install AI Model dependencies**
```bash
cd ../AI_Model/chat_bot && pip install -r requirements.txt
cd ../medical_medicine_analyzer && pip install -r requirements.txt
cd ../uses_AlternativeOf_medicine && pip install -r requirements.txt
```

---

### Environment Variables

#### Backend — `backend/.env`
```env
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/medical-website?retryWrites=true&w=majority
SESSION_SECRET=your_super_secret_session_key_change_this
FRONTEND_URL=http://localhost:5173
PORT=3000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> ⚠️ **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords and generate one.

#### Frontend — `frontend/.env`
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
VITE_AI_Chat_Support=http://localhost:8000/chatbot
VITE_Medicine_Analyzer=http://localhost:8501
VITE_Medicine_Guidelines_Alternatives=http://localhost:8502
```

#### AI Chatbot — `AI_Model/chat_bot/.env`
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

### Running the App

```bash
# Backend
cd backend && npm start
# http://localhost:3000

# Frontend
cd frontend && npm run dev
# http://localhost:5173

# AI Chatbot
cd AI_Model/chat_bot && uvicorn main:app --reload --port 8000
# http://localhost:8000

# Medicine Analyzer
cd AI_Model/medical_medicine_analyzer && streamlit run app.py --server.port 8501
# http://localhost:8501

# Medicine Guidelines
cd AI_Model/uses_AlternativeOf_medicine && streamlit run app.py --server.port 8502
# http://localhost:8502
```

---

## 📡 API Routes

### Authentication — `/sign`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/sign/signup` | Register new user (sends OTP) |
| POST | `/sign/signin` | Sign in existing user (sends OTP) |
| POST | `/sign/verify-otp` | Verify OTP & complete registration |
| POST | `/sign/login` | Login with OTP |

### Payment — `/payment`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/payment/create/orderId` | Create Razorpay order |
| POST | `/payment/api/payment/verify` | Verify appointment payment |
| POST | `/payment/api/payment/verify/bed` | Verify bed booking payment |

### Appointments — `/list`
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/list/*` | Appointment CRUD |

### Chat & History — `/history`
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/history/*` | Chat messages & medical history |

### Profile — `/profile`
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/profile/*` | User profile management |

### Inventory — `/add`
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/add/*` | Hospital inventory management |

### Medicine — `/medicine`
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/medicine/*` | Prescription & medication routes |

### Admin — `/admin`
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/admin/*` | Doctor & hospital approval |

### Others
| Prefix | Description |
|---|---|
| `/detail/*` | Profile details for all roles |
| `/loading/*` | Doctor search & filter |
| `/hospital/*` | Bed booking routes |
| `/search/*` | Search history logs |

---

## 🗄️ Database Models

| Model | Key Fields |
|---|---|
| `User` (Patient) | name, email, otp, role, details |
| `Doctor` | name, email, otp, specialization, approved |
| `Hospital` | name, email, otp, location, approved |
| `Admin` | name, email, otp, role |
| `Appointment` | patient, doctor, date, timeSlot, issue, email |
| `Bed` | Hospital, patient, issue, email |
| `Chart` (Chat) | sender, recipient, message, timestamp |
| `Payment` | orderId, paymentId, amount, currency, status |
| `Medication` | prescription, doctor, patient, medicines |
| `Inventry` | itemName, quantity, hospital |

---

## ☁️ Deployment

### Frontend → Vercel
```bash
cd frontend && vercel --prod
```
The `vercel.json` handles SPA routing (all routes redirect to `index.html`).

### Backend → Vercel
```bash
cd backend && vercel --prod
```
The `vercel.json` routes all requests through the Express app.

> 🔒 Set all environment variables in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## 🙌 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

Licensed under the **ISC License**. See [LICENSE](./LICENSE) for details.

---

<div align="center">

Made with ❤️ by **Adarsh Raj**

[GitHub](https://github.com/Adarshrajsrivastwa) · [Issues](https://github.com/Adarshrajsrivastwa/Medical-website/issues)

</div>
