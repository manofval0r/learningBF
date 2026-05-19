# BudgetFit Immersive Tutorial & Architecture Showcase 🚀

An immersive, highly illustrative tutorial website designed to teach the **BudgetFit JavaFX + SQLite** project (`C:\CD STF\School Stuff\java\BudgetFit`) to teammates. The site bridges high-level system comprehension with deep technical breakdowns through interactive 3D/relational visualizations, an annotated codebase explorer, a live SQLite sandbox, a project history showcase, and an AI chatbot assistant.

---

## 🌟 Key Features

### 1. 🌐 Interactive 3D / Relational Mind-Map
- Visualizes system connections, workflows, and dependencies between Controllers, DAOs, DatabaseHelper, and Services.
- **Multi-Representation Deep-Dives**: Clicking any node opens a deep-dive modal featuring a Plain Language Summary, Relational Flow Diagram, and Core Annotated Java Implementation.

### 2. 💻 Annotated Codebase Explorer
- Interactive file tree paired with a dual-pane code viewer powered by Prism.js.
- Switch seamlessly between **Plain Language Summaries** for general system comprehension and **Technical Depth** tabs for architectural breakdowns.

### 3. 🗄️ Live SQLite Database Sandbox
- Integrates a live, read-only copy of `budgetfit.db`.
- Execute real-time SQL queries (`SELECT`) against the `users`, `transactions`, `investments`, `goals`, and `system_logs` tables to see live mock data exactly as the Java DAOs retrieve it.

### 4. 📜 Project History & Regression Prevention Guide
- An interactive visual timeline detailing BudgetFit's evolution from a basic desktop MVP (Phase 1) to an interactive ledger (Phase 5).
- Highlights strategic architectural pivots (Dual-Path Styling System, Decoupling Geometry from Color Tokens) and crucial regression prevention guides (JavaFX CSS precedence traps, FXMLLoader exceptions).

### 5. 🤖 AI Chatbot Assistant
- Powered by OpenRouter API (supporting free models like `google/gemini-2.5-flash:free` or `meta-llama/llama-3-8b-instruct:free`).
- Pre-loaded with BudgetFit codebase context to answer teammates' questions instantly. Includes a fully contextualized offline fallback mode to ensure 100% uptime.

---

## 🛠️ Technology Stack

- **Frontend SPA**: React 18, Vite, TailwindCSS (Dark Luxury glassmorphism aesthetic), Lucide Icons, Prism.js, D3.js, Three.js.
- **Backend API**: Node.js, Express, SQLite3, Socket.io, Axios, Dotenv.
- **Database**: SQLite (`budgetfit.db`).

---

## 🚀 Quick Start Guide

### One-Click Launch (Windows)
Simply run the included batch script from your terminal or double-click it:
```powershell
.\run-tutorial.bat
```
This script will automatically:
1. Install backend dependencies (`backend/`).
2. Install frontend dependencies (`frontend/`).
3. Concurrently start the Express backend on `http://localhost:5000` and the Vite dev server on `http://localhost:5173`.

### Manual Launch
If you prefer to start the servers manually in separate terminal windows:

**1. Start the Backend Server:**
```powershell
cd backend
npm install
npm start
```

**2. Start the Frontend Dev Server:**
```powershell
cd frontend
npm install
npm run dev
```

---

## 🔑 Configuring OpenRouter AI (Optional)
To enable live LLM streaming via OpenRouter instead of the built-in Mock AI Fallback mode:
1. Open `backend/.env`.
2. Add your API key:
   ```env
   OPENROUTER_API_KEY=your_api_key_here
   ```
3. Restart the backend server.
"# learningBF" 
