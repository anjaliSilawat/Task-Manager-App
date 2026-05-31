# Task Manager App

A full-stack task management application with authentication.

## Live Links
- Frontend: https://task-manager-app-eight-virid.vercel.app
- Backend: https://task-manager-app-g7er.onrender.com

## Tech Stack
- Frontend: React, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB, JWT

## Features
- Register and Login with JWT authentication
- Create, update, delete tasks
- Three stages: Todo, In Progress, Done
- Responsive design with loading and error states

## Local Setup

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Assumptions and Tradeoffs
- Used Tailwind CDN for simplicity in deployment
- JWT stored in localStorage
- Free tier Render may have cold start delay of 30 seconds

## AI Tools Used
- Claude (Anthropic) was used for code generation
- Backend was implemented as it is mandatory when AI tools are used