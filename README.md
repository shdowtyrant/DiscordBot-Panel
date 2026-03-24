<div align="center">

```text
███████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ██╗    ██╗    ████████╗██╗   ██╗██████╗  █████╗ ███╗   ██╗████████╗
██╔════╝██║  ██║██╔══██╗██╔══██╗██╔═══██╗██║    ██║    ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔══██╗████╗  ██║╚══██╔══╝
███████╗███████║███████║██║  ██║██║   ██║██║ █╗ ██║       ██║    ╚████╔╝ ██████╔╝███████║██╔██╗ ██║   ██║   
╚════██║██╔══██║██╔══██║██║  ██║██║   ██║██║███╗██║       ██║     ╚██╔╝  ██╔══██╗██╔══██║██║╚██╗██║   ██║   
███████║██║  ██║██║  ██║██████╔╝╚██████╔╝╚███╔███╔╝       ██║      ██║   ██║  ██║██║  ██║██║ ╚████║   ██║   
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝        ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   
```

![License](https://img.shields.io/badge/LICENSE-GPL--3.0-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-100%25-blue?style=for-the-badge&logo=typescript)
![Next.js](https://img.shields.io/badge/NEXT.JS-APP--ROUTER-black?style=for-the-badge&logo=next.js)
![Bot](https://img.shields.io/badge/DISCORD-BOT-5865F2?style=for-the-badge&logo=discord&logoColor=white)

**A Premium Discord Bot Management Panel & Dashboard**  
Built by **Shadow Tyrant**
</div>

---

## 🚀 The Workshop

This repository serves as a centralized vault for the **Discord Bot Panel**. It contains a highly scalable, full-stack application designed to give Discord server owners and administrators full control over their bot configurations seamlessly from a Web UI.

### ✨ Key Features
- **Modern Dashboard UI**: Built with Next.js App Router, TailwindCSS, and Aceternity UI components.
- **Discord OAuth2**: Secure user authentication and authorization straight through Discord.
- **Real-Time Data**: Global statistics, actively managed guilds, and robust activity logging.
- **Role-Based Access**: Safe and precise permission gating for Server Owners vs. Admins.
- **Modular Backend**: A streamlined Express & MongoDB REST API to handle fast server configuration updates.

## 🛠 Tech Stack

**Frontend:**
- Next.js (React)
- Tailwind CSS
- Lucide Icons

**Backend:**
- Node.js & Express.js
- MongoDB (Mongoose)
- Discord.js (for OAuth & Bot integration)
- JSON Web Tokens (JWT)

## 💻 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Username/RepoName.git
cd RepoName
```

### 2. Setup Environment Variables
Duplicate the `.env.example` files in both the `frontend` and `backend` directories, rename them to `.env` (or `.env.local` for frontend), and configure your database and Discord API credentials.

### 3. Start the Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Start the Frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

## 🌌 Deployment

- **Frontend**: Best deployed on **Vercel** with a seamless GitHub integration.
- **Backend / Bot**: Run seamlessly on your personal VPS/RDP via **PM2** for 24/7 uptime:
  ```bash
  pm2 start npm --name "discord-panel-backend" -- start
  ```

---
<div align="center">
  <i>"Master the servers, command the shadows."</i>
</div>
