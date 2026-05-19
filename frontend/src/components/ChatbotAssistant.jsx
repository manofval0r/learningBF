import React, { useState, useEffect, useRef } from 'react';
import { BotMessageSquare, Send, User, Sparkles, RefreshCw, Cpu, AlertCircle } from 'lucide-react';
import Prism from 'prismjs';

export default function ChatbotAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "### Welcome to BudgetFit AI Assistant\n\nI am an expert fintech architect trained on the entire BudgetFit JavaFX + SQLite codebase. How can I help you understand the architecture today?\n\n**Try asking me about:**\n- Step-Up PIN Authorization Flow\n- Cloning Recurring Transactions\n- BudgetService Business Logic\n- Theming Precedence Traps & CSS Overrides\n- The ATM Corrective Pivot",
      mode: "system"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    Prism.highlightAll();
  }, [messages]);

  const handleSendMessage = async (textOverride) => {
    const userText = textOverride || input;
    if (!userText.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();

      setMessages(prev => [...prev, {
        sender: "ai",
        text: data.reply || "Sorry, I couldn't process that request.",
        mode: data.mode || "mock"
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: "ai",
        text: "### Connection Error\n\nUnable to reach the AI backend server. Please verify that node server.js is running on port 5000.",
        mode: "error"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedPrompts = [
    "Explain Step-Up PIN auth",
    "How are recurring transactions cloned?",
    "What does BudgetService do?",
    "Explain JavaFX CSS precedence traps",
    "What was the ATM corrective pivot?"
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col h-[85vh] bg-inkBlack">
      
      {/* Section Header */}
      <div className="bg-[#0a1520] p-6 rounded border border-lavender/20 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded border border-lavender/30 bg-inkBlack text-emeraldAccent shadow-sm">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-alabaster">
              BudgetFit AI Chatbot Assistant
            </h2>
            <p className="text-xs text-lavender font-mono">Powered by OpenRouter API & High-Fidelity Architectural Knowledge Base</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-inkBlack px-3 py-1.5 rounded border border-lavender/20 text-xs font-mono text-lavender shadow-inner">
          <Cpu className="w-4 h-4 text-emeraldAccent animate-spin" />
          <span>Active Mode: Hybrid AI</span>
        </div>
      </div>

      {/* Chat Messages Workspace */}
      <div className="flex-1 bg-[#0a1520] rounded border border-lavender/20 p-6 overflow-y-auto space-y-6 shadow-sm">
        {messages.map((msg, idx) => {
          const isAI = msg.sender === 'ai';
          return (
            <div key={idx} className={`flex items-start gap-4 animate-fadeIn ${isAI ? '' : 'flex-row-reverse'}`}>
              
              {/* Avatar */}
              <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 shadow-sm border ${
                isAI 
                  ? 'bg-inkBlack border-emeraldAccent text-emeraldAccent' 
                  : 'bg-inkBlack border-lavender/30 text-alabaster'
              }`}>
                {isAI ? <BotMessageSquare className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-2xl rounded p-6 space-y-3 shadow-sm border ${
                isAI
                  ? 'bg-inkBlack border-lavender/30 text-alabaster'
                  : 'bg-inkBlack border-emeraldAccent/40 text-alabaster'
              }`}>
                
                {isAI && msg.mode && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-lavender/20 text-[10px] font-mono text-lavender uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-emeraldAccent font-medium">
                      <Sparkles className="w-3 h-3" />
                      BudgetFit Architect AI
                    </span>
                    <span className="text-lavender">Mode: {msg.mode}</span>
                  </div>
                )}

                <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 font-mono whitespace-pre-wrap">
                  {msg.text}
                </div>

              </div>

            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-9 h-9 rounded bg-inkBlack border border-lavender/30 flex items-center justify-center text-emeraldAccent">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-inkBlack p-4 rounded border border-lavender/20 text-xs font-mono text-lavender shadow-sm">
              Analyzing BudgetFit architecture & generating response...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="shrink-0 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-alabaster uppercase tracking-wider px-2">
          <Sparkles className="w-4 h-4 text-emeraldAccent" />
          <span>Suggested Architectural Queries</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={loading}
              className="px-4 py-2 rounded bg-[#0a1520] hover:bg-lavender/10 text-alabaster/90 hover:text-alabaster border border-lavender/30 text-xs font-mono transition-all duration-200 shadow-sm disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Area */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="shrink-0 flex items-center gap-4 bg-[#0a1520] p-3 rounded border border-lavender/20 shadow-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Ask anything about BudgetFit classes, FXML views, or SQLite triggers..."
          className="flex-1 bg-inkBlack border border-lavender/30 rounded px-4 py-2.5 text-xs font-mono text-alabaster placeholder-lavender outline-none focus:border-emeraldAccent transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex items-center gap-2 px-6 py-2.5 rounded bg-alabaster hover:bg-alabaster/90 text-inkBlack font-mono font-medium text-xs transition-all duration-200 disabled:opacity-50 shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          Send Query
        </button>
      </form>

    </div>
  );
}
