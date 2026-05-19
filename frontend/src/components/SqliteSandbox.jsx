import React, { useState, useEffect } from 'react';
import { Database, Play, AlertCircle, CheckCircle, Table, Sparkles } from 'lucide-react';

export default function SqliteSandbox() {
  const [query, setQuery] = useState('SELECT id, username, role, monthly_income, last_active FROM users LIMIT 10;');
  const [tables, setTables] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTables();
    handleRunQuery('SELECT id, username, role, monthly_income, last_active FROM users LIMIT 10;');
  }, []);

  const fetchTables = async () => {
    try {
      const res = await fetch('/api/sandbox/tables');
      const data = await res.json();
      if (data.tables) setTables(data.tables);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  const handleRunQuery = async (overrideQuery) => {
    const activeQuery = overrideQuery || query;
    if (!activeQuery) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('/api/sandbox/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: activeQuery })
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to execute SQL query.");
      } else {
        setResults(data);
      }
    } catch (err) {
      setError(err.message || "Network error while connecting to SQLite runner.");
    } finally {
      setLoading(false);
    }
  };

  const queryTemplates = [
    { label: "Inspect Users Table", sql: "SELECT id, username, role, monthly_income, last_active FROM users;" },
    { label: "View Banking Transactions", sql: "SELECT id, category, item_name, actual_amount, tx_type, date FROM transactions WHERE user_id = 2;" },
    { label: "Check Investment Portfolios", sql: "SELECT id, symbol, shares, avg_price, current_price FROM investments;" },
    { label: "Inspect Savings Goals", sql: "SELECT id, name, target_amount, current_amount, target_date FROM goals;" },
    { label: "View Audit System Logs", sql: "SELECT id, user_id, action, log_date FROM system_logs LIMIT 15;" },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-inkBlack">
      
      {/* Section Header */}
      <div className="bg-[#0a1520] p-8 rounded border border-lavender/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded border border-lavender/30 bg-inkBlack text-emeraldAccent shadow-sm">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-alabaster">
              Live SQLite Database Sandbox
            </h2>
          </div>
          <p className="text-xs text-lavender max-w-xl font-mono">
            Execute real-time SQL queries against the active `budgetfit.db` instance. Inspect live mock data exactly as the Java DAOs retrieve it.
          </p>
        </div>

        {/* Available Tables Chip Display */}
        <div className="flex flex-wrap items-center gap-2 bg-inkBlack p-3 rounded border border-lavender/20 shadow-inner">
          <Table className="w-4 h-4 text-lavender mr-1" />
          <span className="text-xs font-mono text-lavender uppercase tracking-wider mr-2">Tables:</span>
          {tables.map(t => (
            <span key={t} className="px-3 py-1 rounded bg-[#0a1520] border border-lavender/30 text-xs font-mono text-alabaster">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Query Runner & Template Chips */}
      <div className="bg-[#0a1520] p-8 rounded border border-lavender/20 space-y-6 shadow-sm">
        
        {/* Template Chips */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-alabaster uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emeraldAccent" />
            <span>Pre-Made Query Templates</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {queryTemplates.map((qt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(qt.sql);
                  handleRunQuery(qt.sql);
                }}
                className="px-4 py-2 rounded bg-inkBlack hover:bg-lavender/10 text-alabaster/90 hover:text-alabaster border border-lavender/30 text-xs font-mono transition-all duration-200 shadow-sm"
              >
                {qt.label}
              </button>
            ))}
          </div>
        </div>

        {/* SQL Input Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-medium text-alabaster uppercase tracking-wider">SQL Query Statement</label>
            <span className="text-xs font-mono text-lavender">Read-Only Mode (SELECT queries only)</span>
          </div>

          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              className="w-full bg-inkBlack border border-lavender/30 rounded p-4 font-mono text-xs text-alabaster placeholder-lavender outline-none focus:border-emeraldAccent transition-colors shadow-inner"
              placeholder="SELECT * FROM users WHERE role = 'admin';"
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => handleRunQuery()}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 rounded bg-alabaster hover:bg-alabaster/90 text-inkBlack font-mono font-medium text-xs transition-all duration-200 disabled:opacity-50 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {loading ? "Executing Query..." : "Run SQL Query"}
            </button>
          </div>
        </div>

      </div>

      {/* Query Results Panel */}
      <div className="bg-[#0a1520] p-8 rounded border border-lavender/20 min-h-[300px] flex flex-col shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-lavender/20">
          <h3 className="text-base font-mono font-medium text-alabaster">Query Execution Results</h3>
          {results && (
            <div className="flex items-center gap-2 text-xs font-mono text-emeraldAccent bg-emeraldAccent/10 px-3 py-1.5 rounded border border-emeraldAccent/20">
              <CheckCircle className="w-4 h-4" />
              <span>Returned {results.count} Rows</span>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex-1 flex items-center justify-center text-lavender font-mono text-xs animate-pulse my-auto">
            Connecting to SQLite database runner...
          </div>
        )}

        {error && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-rose-500/10 border border-rose-500/20 rounded my-auto">
            <AlertCircle className="w-10 h-10 text-rose-500 mb-3" />
            <div className="text-sm font-mono font-medium text-rose-200 mb-1">Query Execution Error</div>
            <p className="text-xs font-mono text-rose-300 max-w-md">{error}</p>
          </div>
        )}

        {!loading && !error && results && results.rows && results.rows.length > 0 && (
          <div className="overflow-x-auto rounded border border-lavender/20 bg-inkBlack">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-lavender/20 bg-[#0a1520] text-[11px] font-mono font-medium text-alabaster uppercase tracking-wider">
                  {Object.keys(results.rows[0]).map(col => (
                    <th key={col} className="py-3 px-5 border-r border-lavender/20 last:border-r-0">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-lavender/20 font-mono text-xs text-lavender">
                {results.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#0a1520] transition-colors">
                    {Object.values(row).map((val, vIdx) => (
                      <td key={vIdx} className="py-3 px-5 border-r border-lavender/20 last:border-r-0 truncate max-w-[250px]">
                        {val === null ? <span className="text-lavender/50 italic">null</span> : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && results && results.rows && results.rows.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-lavender font-mono text-xs my-auto">
            Query executed successfully, but returned 0 rows.
          </div>
        )}

        {!loading && !error && !results && (
          <div className="flex-1 flex items-center justify-center text-lavender font-mono text-xs my-auto">
            Enter a SQL statement above and click Run to view live database records.
          </div>
        )}

      </div>

    </div>
  );
}
