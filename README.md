# IZARA-AI 🤖✨

![IZARA-AI Demo](public/izara.gif)

## App Description 📝  
IZARA-AI is a full-stack AI assistant that provides intelligent responses to user queries. It features:

- 💬 Natural language processing powered by GPT-4.1  
- 🌈 Modern UI with beautiful gradients and animations  
- ⚡ Real-time markdown formatted responses  
- 🔄 Seamless communication between React frontend and Express backend  
- 🔐 Secure API endpoints with CORS protection  

## Technology Stack 🛠️  

### Frontend  
| Technology | Purpose |  
|------------|---------|  
| React 19 | Component-based UI |  
| Tailwind CSS | Styling with utility classes |  
| React Router | Navigation between pages |  
| Axios | HTTP requests to backend |  
| React Markdown | Rendering AI responses |  
| Vite | Ultra-fast development server |  

### Backend  
| Technology | Purpose |  
|------------|---------|  
| Express.js | API server framework |  
| Node-Fetch | Making HTTP requests to AI API |  
| CORS | Secure cross-origin requests |  
| Dotenv | Environment variable management |  

### Development Tools  
- Nodemon (auto-restart server)  
- Concurrently (run multiple commands)  
- ESLint (code quality)  

## Installation Guide 🚀  

### 1. Clone the Repository  

    git clone https://github.com/your-username/IZARA-AI.git
    cd IZARA-AI

### 2. Install Dependencies

    npm install

### 3. Configure Environment
Create .env file in root directory:

    GITHUB_TOKEN=your_github_personal_access_token
    PORT=3000
    CLIENT_URL=http://localhost:5173

### 4. Run the Application

    npm start

This will run:

- Frontend on http://localhost:5173

- Backend on http://localhost:3000


### How to Contribute 🤝
- Fork the repository

- Create your feature branch (git checkout -b feature/amazing-feature)

- Commit your changes (git commit -m 'Add amazing feature')

- Push to the branch (git push origin feature/amazing-feature)

- Open a Pull Request