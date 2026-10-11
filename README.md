# PDF RAG Application 🤖📄

> A powerful web application that allows users to upload PDF documents and interactively ask questions about their contents using an advanced Retrieval-Augmented Generation (RAG) pipeline powered by Google Gemini and Qdrant.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Backend: Express](https://img.shields.io/badge/Backend-Express.js-white?logo=express)](https://expressjs.com/)

## 📖 Overview / About
The PDF RAG application bridges the gap between static documents and interactive AI. It solves the problem of manually reading through long PDF files by extracting text, converting it into vector embeddings, and allowing users to semantically search and chat with their documents. It uses BullMQ for robust background processing of files and Qdrant for blazing-fast vector similarity searches.

## ✨ Features
- 🚀 **Interactive PDF Chat** - Ask questions and get context-aware answers directly from your uploaded PDF documents.
- 🧠 **Advanced AI Embeddings** - Utilizes LangChain and Google's Gemini GenAI models for highly accurate context generation and retrieval.
- ⚡ **Background Processing** - Scalable file ingestion queue powered by BullMQ and Valkey (Redis) so the UI never blocks.
- 🔒 **Secure Authentication** - Built-in user authentication and session management using Clerk.
- 🎨 **Modern UI** - Clean and responsive interface built with Next.js 15, React 19, and TailwindCSS 4.

## 🛠️ Tech Stack
| Category | Technologies |
| --- | --- |
| **Frontend** | Next.js 15, React 19, TailwindCSS, Clerk (Auth), Lucide React |
| **Backend** | Node.js, Express.js, BullMQ, Multer |
| **AI & RAG** | LangChain, Google Gemini API (`@langchain/google-genai`), PDF-Parse |
| **Databases** | Qdrant (Vector Store), Valkey/Redis (Message Queue) |
| **Tools** | Docker, Docker Compose, TypeScript |

## 📸 Screenshots / Demo
**Live Demo:** None

<!-- Replace the placeholder below with actual screenshots of your application -->
![Screenshot Placeholder](https://via.placeholder.com/800x400?text=PDF+RAG+Chat+Interface)

## 📁 Folder Structure
```bash
pdf-rag-code/
├── client/                 # Next.js Frontend Application
│   ├── app/                # App router (components, layouts, middleware)
│   ├── package.json
│   └── tsconfig.json
├── server/                 # Node.js / Express Backend
│   ├── uploads/            # Temporary storage for uploaded PDFs
│   ├── index.js            # Main Express server and API routes
│   ├── worker.js           # BullMQ worker for background processing
│   └── package.json
├── docker-compose.yml      # Infrastructure setup (Valkey & Qdrant)
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker & Docker Compose](https://www.docker.com/) (Required for Qdrant and Valkey)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)
- A [Clerk](https://clerk.com/) account for Auth keys

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/pdf-rag-code.git
cd pdf-rag-code
```

2. **Start Infrastructure (Databases):**
Run the Docker containers for Valkey (Redis fork) and Qdrant in the background.
```bash
docker-compose up -d
```

3. **Setup and Run the Server:**
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
# server/.env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
```
Start the server and worker:
```bash
# Terminal 1: Start the API server
npm run dev

# Terminal 2: Start the background worker (still inside /server)
npm run dev:worker
```

4. **Setup and Run the Client:**
```bash
cd ../client
npm install
```
Create a `.env.local` file in the `client` directory:
```env
# client/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_API_URL=http://localhost:8000
```
Start the Next.js frontend:
```bash
npm run dev
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Health check endpoint (Returns status: 'All Good!') |
| `POST` | `/upload/pdf` | Uploads a PDF file (multipart/form-data) and adds it to the BullMQ processing queue |
| `GET` | `/chat?message=<query>` | Performs a vector search in Qdrant and returns an AI-generated answer using the PDF context |

## 💡 Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Log in using the Clerk authentication flow.
3. Upload a PDF file using the UI upload component. The backend will parse it, chunk the text, and store the embeddings in Qdrant.
4. Type your question in the chat interface. The system will retrieve the most relevant sections of your PDF and the Gemini model will formulate a precise answer based on that context.

## 🗺️ Future Improvements / Roadmap
- [ ] Add support for multiple document uploads simultaneously.
- [ ] Implement conversation history (chat memory) so the LLM remembers previous questions in the same session.
- [ ] Add support for other document types (Word, TXT, CSV).
- [ ] Deploy infrastructure to production (Vercel/Render, Managed Qdrant, Upstash).

## 🤝 Contributing
Contributions are always welcome! 

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
This project is licensed under the [MIT License](LICENSE).

## 👤 Author / Contact
- **Name:** [TODO: Your Name]
- **GitHub:** [@yourusername](https://github.com/yourusername)
- **Email:** [TODO: youremail@example.com]
