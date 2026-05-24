# DEVLINK

DEVLINK is a MERN developer networking and collaboration platform for beginners, professionals, mentors, and project teams.

## Structure

```txt
client/  React + Vite + Tailwind
server/  Node + Express + MongoDB
```

## Local Setup

Install dependencies:

```bash
cd server
npm install
cd ../client
npm install
```

Create environment files from the examples:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Start the API:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

## Required Environment

Backend:

```txt
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Frontend:

```txt
VITE_API_URL=http://localhost:5000/api
```
