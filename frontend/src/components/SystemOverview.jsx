import React from 'react';
import { Layers, ShieldCheck, Database, Cpu, ArrowRight, LayoutGrid, CheckCircle } from 'lucide-react';

export default function SystemOverview({ setActiveTab, annotations }) {
  const mvcLayers = [
    {
      title: "Presentation Layer (Views & Controllers)",
      icon: LayoutGrid,
      analogy: "ELI5 Analogy: The Waiter & Menu. The FXML layout is the menu customers see, and the Controller is the waiter who takes your order and ensures you entered your PIN correctly.",
      desc: "JavaFX FXML layouts define the visual hierarchy, while Java controllers handle user interactions, input validation, and Step-Up PIN authorization.",
      bullets: ["dashboard.fxml / DashboardController", "atm.fxml / AtmController", "investments.fxml / InvestmentController", "admin.fxml / AdminController"]
    },
    {
      title: "Service Layer (Business Logic)",
      icon: Cpu,
      analogy: "ELI5 Analogy: The Master Chef. The chef doesn't talk to customers or fetch ingredients directly; they stay in the kitchen doing the heavy calculations and making sure you don't spend money you don't have.",
      desc: "Encapsulates mathematical calculations, outflow aggregations, discretionary income clamping, and variance analysis entirely decoupled from UI threads.",
      bullets: ["BudgetService.java (Pure Stream calculations)", "NotificationService.java (System alerts)"]
    },
    {
      title: "Data Access Layer (DAOs)",
      icon: Database,
      analogy: "ELI5 Analogy: The Inventory Clerk. The clerk knows exactly how to fetch ingredients from the storage room (database) without bothering the chef with technical storage details.",
      desc: "DAOs abstract all JDBC interactions, providing clean CRUD methods scoped strictly by user ID to guarantee multi-tenant data isolation.",
      bullets: ["UserDAO.java (Auth & PIN verification)", "TransactionDAO.java (Ledger & cloning)", "InvestmentDAO.java (Holdings & market sim)", "GoalDAO.java (Savings targets)"]
    },
    {
      title: "Persistence Layer (SQLite)",
      icon: Layers,
      analogy: "ELI5 Analogy: The Secure Pantry. A locked storage room where all user records, transaction histories, and encrypted PINs are permanently kept safe.",
      desc: "A local SQLite database (budgetfit.db) provisioned with PRAGMA foreign_keys = ON, automatic schema migrations, and BCrypt security hashing.",
      bullets: ["budgetfit.db (Users, Transactions, Investments, Goals, Logs)", "DatabaseHelper.java (Provisioning & migrations)"]
    }
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-inkBlack">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-alabaster mb-4">
          Architectural Foundation & MVC Lifecycle
        </h2>
        <p className="text-sm text-lavender leading-relaxed">
          BudgetFit implements a strictly decoupled layered architecture. This design guarantees clean separation between visual rendering, mathematical business rules, and relational data persistence.
        </p>
      </div>

      {/* MVC Layer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mvcLayers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <div key={index} className="bg-[#0a1520] p-8 rounded border border-lavender/20 flex flex-col justify-between hover:border-emeraldAccent/40 transition-colors shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded border border-lavender/30 bg-inkBlack text-emeraldAccent shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-mono font-medium text-alabaster">{layer.title}</h3>
                </div>
                
                {/* ELI5 Analogy Box */}
                <div className="mb-4 p-3 rounded bg-inkBlack border border-lavender/20 text-xs font-mono text-emeraldAccent leading-relaxed">
                  {layer.analogy}
                </div>

                <p className="text-xs text-lavender leading-relaxed mb-6">{layer.desc}</p>
                <div className="space-y-2 mb-4">
                  {layer.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-alabaster/90 bg-inkBlack p-2.5 rounded border border-lavender/10">
                      <CheckCircle className="w-3.5 h-3.5 text-emeraldAccent shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Feature Showcase: Step-Up PIN Auth */}
      <div className="bg-[#0a1520] p-8 sm:p-12 rounded border border-lavender/20 relative overflow-hidden shadow-sm">
        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-inkBlack border border-lavender/30 text-xs font-mono text-emeraldAccent">
            <ShieldCheck className="w-4 h-4" />
            <span>Core Security Architecture</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-normal text-alabaster tracking-tight">
            Step-Up PIN Authorization Flow
          </h3>

          <p className="text-xs sm:text-sm text-lavender leading-relaxed">
            To prevent unauthorized financial transactions on a shared desktop, BudgetFit enforces a secondary layer of security known as Step-Up PIN Authorization. Before any ATM withdrawal or P2P transfer is executed, the user must input their 4-digit PIN.
          </p>

          <div className="p-6 rounded bg-inkBlack border border-lavender/20 font-mono text-xs text-alabaster/90 space-y-3 shadow-inner">
            <div className="text-lavender">// Step-Up Authentication Sequence</div>
            <div className="flex items-center gap-2">
              <span className="text-emeraldAccent">1.</span>
              <span>User initiates Transfer in AtmController</span>
              <ArrowRight className="w-3.5 h-3.5 text-lavender ml-auto" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emeraldAccent">2.</span>
              <span>AtmController.promptForPin() triggers TextInputDialog modal</span>
              <ArrowRight className="w-3.5 h-3.5 text-lavender ml-auto" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emeraldAccent">3.</span>
              <span>UserDAO.verifyPin(userId, pin) checks BCrypt pin_hash in SQLite</span>
              <ArrowRight className="w-3.5 h-3.5 text-lavender ml-auto" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emeraldAccent">4.</span>
              <span>Transaction committed & DashboardController.getInstance().refreshAll() broadcasted</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('explorer')}
              className="px-6 py-3 rounded bg-alabaster text-inkBlack text-xs font-mono font-medium hover:bg-alabaster/90 transition-colors flex items-center gap-2 shadow-sm"
            >
              Inspect AtmController.java
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className="px-6 py-3 rounded bg-inkBlack text-emeraldAccent border border-emeraldAccent/30 text-xs font-mono font-medium hover:bg-emeraldAccent/10 transition-colors flex items-center gap-2"
            >
              Test Users Table in Sandbox
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
