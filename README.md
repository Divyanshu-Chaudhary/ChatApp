# Real-Time Chat Application

A full-stack real-time chat application built using Spring Boot, React, WebSocket, STOMP, MongoDB, and Docker.

## Features

* Real-time messaging using WebSockets
* Multiple chat rooms
* Join and leave notifications
* Responsive user interface
* Message timestamps
* MongoDB database integration
* Dockerized backend and frontend
* REST APIs with Spring Boot

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* SockJS
* STOMP.js

### Backend

* Spring Boot
* Spring WebSocket
* Spring Data MongoDB
* Maven

### Database

* MongoDB

### DevOps

* Docker
* Docker Compose
* GitHub

## Project Structure

```text
SpringBoot_React_FullStack_Chat_project
│
├── ChatAppFrontend
│
├── ChatAppBackend
│
└── docker-compose.yml
```

## Getting Started

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### Backend Setup

```bash
cd ChatAppBackend
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd ChatAppFrontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Docker Deployment

Build and start containers:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d
```

Stop containers:

```bash
docker compose down
```

## Screenshots

<img width="1642" height="858" alt="Room Created" src="https://github.com/user-attachments/assets/ae675fdc-2590-4d87-b1c1-3c0c1d7ddbcc" />
<img width="1640" height="854" alt="Room Left" src="https://github.com/user-attachments/assets/9f3da76d-448d-4527-a39d-87b3df40822c" />
<img width="1647" height="861" alt="ChatPage" src="https://github.com/user-attachments/assets/4ab04eae-1225-4498-b08d-b97daca088c2" />
<img width="987" height="806" alt="Login" src="https://github.com/user-attachments/assets/5fe0308e-ebd6-4571-92bb-7c5f9ceb3ca1" />


## Future Improvements

* Private messaging
* User authentication and authorization
* Online/offline status
* File sharing
* Emoji support
* Message persistence improvements

## Author

Divyanshu
