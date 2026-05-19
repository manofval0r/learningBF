import express from 'express';
import http from 'http';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'budgetfit.db');
const ANNOTATIONS_PATH = path.join(__dirname, 'data', 'codebaseAnnotations.json');

app.use(cors());
app.use(express.json());

// Initialize SQLite database connection
const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error("Error opening SQLite database:", err.message);
  } else {
    console.log("Connected to BudgetFit SQLite database (Read-Only Mode).");
  }
});

// Load Codebase Annotations Knowledge Base
let annotationsData = {};
try {
  const rawData = fs.readFileSync(ANNOTATIONS_PATH, 'utf-8');
  annotationsData = JSON.parse(rawData);
  console.log("Loaded Codebase Annotations Knowledge Base successfully.");
} catch (err) {
  console.error("Error reading codebaseAnnotations.json:", err.message);
}

// REST API Endpoints
app.get('/api/annotations', (req, res) => {
  res.json(annotationsData);
});

app.get('/api/history', (req, res) => {
  res.json(annotationsData.projectHistory || {});
});

// Live SQLite Query Runner Endpoint
app.post('/api/sandbox/query', (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "SQL query is required." });
  }

  // Prevent destructive queries for safety in tutorial mode
  const upperQuery = query.trim().toUpperCase();
  if (upperQuery.startsWith('INSERT') || upperQuery.startsWith('UPDATE') || upperQuery.startsWith('DELETE') || upperQuery.startsWith('DROP') || upperQuery.startsWith('ALTER') || upperQuery.startsWith('PRAGMA')) {
    return res.status(403).json({ error: "Tutorial Sandbox enforces Read-Only queries (SELECT) to protect live mock data integrity." });
  }

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ rows, count: rows.length });
  });
});

app.get('/api/sandbox/tables', (req, res) => {
  const query = "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ tables: rows.map(r => r.name) });
  });
});

// OpenRouter AI Chatbot Helper
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const SYSTEM_PROMPT = `You are BudgetFit AI, an expert agentic AI coding assistant and fintech architect. Your purpose is to help teammates understand the BudgetFit JavaFX + SQLite project.
Here is the core architecture context:
- Presentation Layer: JavaFX FXML views (dashboard, atm, investments, admin) and Java Controllers (DashboardController, AtmController, etc.).
- Service Layer: BudgetService (calculates totals, discretionary income clamping, variance analysis).
- Data Access Layer: DAOs (UserDAO, TransactionDAO, InvestmentDAO, GoalDAO) managing SQLite persistence.
- Persistence Layer: SQLite (budgetfit.db) with PRAGMA foreign_keys = ON, BCrypt password/PIN hashing.
- Step-Up PIN Auth: Required for ATM withdrawals and P2P transfers via AtmController promptForPin() and UserDAO.verifyPin().
- Theming Architecture: Base styles in styles.css (Bento Warm light mode) and Master Override in dark-theme.css (Zebec V2 dark luxury). Resolves JavaFX CSS precedence traps by injecting dark-theme.css directly into child Parent containers.

Answer teammates' questions accurately, concisely, and with technical depth. Include code snippets where relevant.`;

async function callOpenRouterAI(userMessage) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured.");
  }

  const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    model: "openrouter/free",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ]
  }, {
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:5000",
      "X-Title": "BudgetFit Immersive Tutorial"
    }
  });

  return response.data.choices[0].message.content;
}

function getMockAIFallback(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  if (lowerMsg.includes("step-up") || lowerMsg.includes("pin")) {
    return `### Step-Up PIN Authentication Flow\n\nBudgetFit enforces Step-Up PIN Authorization before executing sensitive financial transactions such as ATM Cash Withdrawals or P2P Transfers.\n\n\`\`\`java\n// AtmController.java\nprivate boolean promptForPin(String actionName) {\n    TextInputDialog dialog = new TextInputDialog();\n    dialog.setTitle(\"PIN Verification Required\");\n    dialog.setHeaderText(\"Authorize \" + actionName);\n    dialog.setContentText(\"Please enter your 4-digit ATM PIN:\");\n    Optional<String> result = dialog.showAndWait();\n    return result.isPresent() && UserDAO.verifyPin(UserSession.getUserId(), result.get().trim());\n}\n\`\`\`\n\nWhen promptForPin() executes, it invokes UserDAO.verifyPin(), which verifies the entered PIN against the securely stored BCrypt pin_hash in the SQLite database. If verification passes, the transaction is committed; otherwise, an error alert is displayed and the operation aborts.`;
  } else if (lowerMsg.includes("recurring") || lowerMsg.includes("copy") || lowerMsg.includes("clone")) {
    return `### Cloning Recurring Transactions\n\nTransactionDAO.copyRecurringTransactions(userId, targetMonthStr) provides an automated mechanism to clone previous monthly bills and subscriptions into a new target month.\n\n\`\`\`java\n// TransactionDAO.java\npublic static void copyRecurringTransactions(int userId, String targetMonthStr) {\n    // 1. SELECT category, item_name, budgeted_amount FROM transactions WHERE user_id = ? AND recurring = 1\n    // 2. Checks if the item already exists in targetMonthStr\n    // 3. If missing, inserts a new TransactionEntry with actual_amount = 0.0 and paid = false\n}\n\`\`\`\n\nThis ensures teammates and users do not need to manually re-enter fixed monthly expenses like Rent or Utility bills.`;
  } else if (lowerMsg.includes("service") || lowerMsg.includes("budgetservice")) {
    return `### BudgetService Business Logic\n\nBudgetService.java is a pure business logic service completely decoupled from JavaFX UI rendering threads. This architectural decoupling guarantees deterministic unit testability.\n\nKey responsibilities include:\n- calculateTotalBudget() / calculateTotalActual(): Utilizes Java 8 Streams to sum amounts while filtering out uncommitted placeholder rows (!entry.isPlaceholder()).\n- calculateLeftToSpend(): Calculates discretionary income and clamps negative slices using Math.max(monthlyIncome - totalOutflow, 0.0) to prevent invalid UI allocation renders.`;
  } else if (lowerMsg.includes("theme") || lowerMsg.includes("dark") || lowerMsg.includes("css") || lowerMsg.includes("precedence")) {
    return `### Theming Architecture & Precedence Traps\n\nBudgetFit implements a Dual-Path Styling System:\n1. Base (styles.css): Defines structural layout rules, typography scales, padding tokens, and default Bento Warm light mode colors.\n2. Master Override (dark-theme.css): Contains purely color and border override rules.\n\n#### The JavaFX CSS Precedence Trap\nStylesheets attached directly to child Parent containers (stylesheets="@/css/styles.css") take higher precedence than stylesheets attached to the root Scene.\n\n**The Fix**: DashboardController.switchView() dynamically injects dark-theme.css directly into every child Parent node inside contentArea whenever the dark mode toggle is active.`;
  } else if (lowerMsg.includes("history") || lowerMsg.includes("pivot") || lowerMsg.includes("atm")) {
    return `### Project History & The ATM Corrective Pivot\n\nDuring Phase 3, an early attempt to overhaul the dark theme accidentally hardcoded atm.fxml to dark mode by default.\n\n**The Corrective Pivot**: We executed a strategic pivot to restore atm.fxml back to the pristine Bento Warm light mode default, ensuring structural parity while reserving the dark luxury palette strictly for the runtime override stylesheet (dark-theme.css).\n\nWe also decoupled layout geometry from color tokens by introducing .card-padded to prevent containers from collapsing when theme classes switch.`;
  } else {
    return `### BudgetFit AI Assistant\n\nI am ready to help you understand the BudgetFit codebase. You asked: "${userMessage}"\n\n*(Note: Running in high-fidelity Mock AI Fallback mode. To enable live OpenRouter LLM streaming, configure your OPENROUTER_API_KEY in backend/.env)*\n\n**Try asking me about:**\n- Step-Up PIN Auth\n- Recurring Transactions\n- BudgetService\n- Theming Precedence Traps\n- ATM Corrective Pivot`;
  }
}

// REST Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    if (OPENROUTER_API_KEY) {
      const aiResponse = await callOpenRouterAI(message);
      return res.json({ reply: aiResponse, mode: "openrouter" });
    } else {
      const fallbackReply = getMockAIFallback(message);
      return res.json({ reply: fallbackReply, mode: "mock" });
    }
  } catch (err) {
    console.warn("OpenRouter API failed, switching to Mock AI Fallback:", err.message);
    const fallbackReply = getMockAIFallback(message);
    return res.json({ reply: fallbackReply, mode: "mock_fallback", error: err.message });
  }
});

// Socket.io Real-Time Chat Handler
io.on('connection', (socket) => {
  console.log(`New client connected to Socket.io: ${socket.id}`);

  socket.on('send_message', async (data) => {
    const { message } = data;
    console.log(`Received Socket.io message from ${socket.id}: ${message}`);

    try {
      if (OPENROUTER_API_KEY) {
        const aiResponse = await callOpenRouterAI(message);
        socket.emit('receive_message', { reply: aiResponse, mode: "openrouter" });
      } else {
        const fallbackReply = getMockAIFallback(message);
        socket.emit('receive_message', { reply: fallbackReply, mode: "mock" });
      }
    } catch (err) {
      console.warn("Socket.io OpenRouter failed, emitting fallback:", err.message);
      const fallbackReply = getMockAIFallback(message);
      socket.emit('receive_message', { reply: fallbackReply, mode: "mock_fallback", error: err.message });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`BudgetFit Tutorial Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;
