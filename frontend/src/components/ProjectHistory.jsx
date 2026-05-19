import { History, GitCommit, AlertTriangle, ShieldAlert, CheckCircle, Split, Sparkles, BookOpen } from 'lucide-react';

export default function ProjectHistory({ annotations }) {
  const historyData = annotations?.projectHistory || null;

  if (!historyData || !historyData.phases) {
    return (
      <div className="py-24 text-center text-lavender font-mono text-xs animate-pulse">
        Loading historical evolution and architectural records...
      </div>
    );
  }

  // Curated OOP & Java concepts applied in the project
  const javaConcepts = [
    {
      concept: "Inheritance & Polymorphism (Parent & Child blueprint)",
      explanation: "ELI5 Analogy: A blueprint for Vehicles. Just like a Sports Car and a School Bus are both 'Vehicles' that inherit wheels and an engine, different screens in BudgetFit (like the ATM or Investments screen) are both 'Initializable Screens'. They share the same basic setup rules so the main dashboard can open them all the same way.",
      example: "AtmController implements JavaFX's Initializable interface, allowing the navigation manager to initialize all sub-screens using a single generic rule."
    },
    {
      concept: "Exception Handling (Safety Nets)",
      explanation: "ELI5 Analogy: A Safety Net. If you are juggling balls (running code) and drop one (like a database error or missing file), a safety net catches it before it hits the floor. The app doesn't crash; it just handles the mistake safely and tells the user what went wrong.",
      example: "Using try-catch blocks to catch SQLException when loading data from SQLite, popping up a helpful warning dialog instead of crashing the program."
    },
    {
      concept: "The Singleton Pattern (One Single Instance)",
      explanation: "ELI5 Analogy: The President of a Country. A country only has exactly one active President. If anyone wants to make a national decision, they talk to that single president. Similarly, there is only ever one active Dashboard screen running in the app's memory.",
      example: "DashboardController.getInstance() allows child sub-views (like AtmController) to find and talk to the single running dashboard to refresh the UI."
    },
    {
      concept: "Encapsulation (A Piggy Bank with a Slot)",
      explanation: "ELI5 Analogy: A Locked Piggy Bank. You cannot reach inside the bank directly to grab or mess with the coins (private variables). You can only slide money in through the slot, or ask the owner to read the counter (public getters and setters). This keeps the internal values safe.",
      example: "TransactionEntry stores values in private variables, exposing them safely through public getter/setter methods like getActualAmount()."
    },
    {
      concept: "Static Modifiers vs. Object Instances (Calculator vs. Spreadsheet)",
      explanation: "ELI5 Analogy: A Calculator vs. a personal Spreadsheet. A calculator is static — anyone can use it to add numbers without needing to configure it first. A spreadsheet is an instance — you must create a new, separate spreadsheet page for each user to track their specific monthly budget.",
      example: "Stateless database checks like UserDAO.verifyPin() are static (callable anytime), whereas BudgetService must be created as a new instance specifically for the logged-in user."
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-inkBlack">
      
      {/* Section Header */}
      <div className="bg-[#0a1520] p-8 sm:p-12 rounded border border-lavender/20 text-center max-w-4xl mx-auto shadow-sm">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-inkBlack border border-lavender/30 text-xs font-mono text-emeraldAccent mb-2 shadow-sm">
            <History className="w-4 h-4" />
            <span>Authoritative Architectural Record</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-alabaster">
            {historyData.title || "Project History & Lessons Learned"}
          </h2>
          
          <p className="text-xs sm:text-sm text-lavender max-w-2xl mx-auto leading-relaxed font-mono">
            {historyData.subtitle || "Explore the evolutionary journey from a desktop MVP to an enterprise fintech dashboard."}
          </p>
        </div>
      </div>

      {/* Evolutionary Timeline (Phases 1 to 5) */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 max-w-4xl mx-auto px-4">
          <GitCommit className="w-5 h-5 text-emeraldAccent" />
          <h3 className="text-xl font-mono font-medium text-alabaster">Project Timeline & Story</h3>
        </div>

        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l border-lavender/20 space-y-12">
          {historyData.phases.map((phase, idx) => (
            <div key={idx} className="relative group animate-fadeIn">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-5 h-5 rounded bg-inkBlack border border-emeraldAccent flex items-center justify-center shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent" />
              </div>

              <div className="bg-[#0a1520] p-8 rounded border border-lavender/20 group-hover:border-emeraldAccent/40 transition-colors space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-lg font-mono font-medium text-alabaster">{phase.phase}</h4>
                  <span className="text-xs font-mono text-emeraldAccent bg-inkBlack px-3 py-1 rounded border border-lavender/20 self-start sm:self-auto shadow-sm">
                    {phase.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-lavender leading-relaxed bg-inkBlack p-6 rounded border border-lavender/20 shadow-inner font-mono">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Architectural Decisions & Pivots */}
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 px-4">
          <Split className="w-5 h-5 text-emeraldAccent" />
          <h3 className="text-xl font-mono font-medium text-alabaster">Strategic Architectural Pivots</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {historyData.architecturalPivots?.map((pivot, idx) => (
            <div key={idx} className="bg-[#0a1520] p-8 rounded border border-lavender/20 hover:border-emeraldAccent/40 transition-colors space-y-4 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded border border-lavender/30 bg-inkBlack text-emeraldAccent shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-mono font-medium text-alabaster">{pivot.title}</h4>
                </div>
                <p className="text-xs text-lavender leading-relaxed bg-inkBlack p-6 rounded border border-lavender/20 shadow-inner font-mono">
                  {pivot.description}
                </p>
              </div>
              <div className="pt-4 border-t border-lavender/20 flex items-center gap-2 text-xs font-mono text-emeraldAccent">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Architectural Rule Established</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Challenges, Pitfalls & Regression Prevention */}
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 px-4">
          <ShieldAlert className="w-5 h-5 text-emeraldAccent" />
          <h3 className="text-xl font-mono font-medium text-alabaster">Regression Prevention Guide</h3>
        </div>

        <div className="space-y-6">
          {historyData.regressionPrevention?.map((reg, idx) => (
            <div key={idx} className="bg-[#0a1520] p-8 rounded border border-lavender/20 hover:border-emeraldAccent/40 transition-colors space-y-6 shadow-sm">
              <h4 className="text-base font-mono font-medium text-alabaster flex items-center gap-3">
                <div className="p-2 rounded border border-lavender/30 bg-inkBlack text-emeraldAccent shadow-sm">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                {reg.title}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded bg-inkBlack border border-lavender/20 space-y-3 shadow-inner">
                  <div className="text-xs font-mono font-medium text-rose-400 uppercase tracking-wider flex items-center gap-2 border-b border-lavender/20 pb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>The Pitfall / Problem</span>
                  </div>
                  <p className="text-xs font-mono text-rose-200/90 leading-relaxed">
                    {reg.pitfall}
                  </p>
                </div>

                <div className="p-6 rounded bg-inkBlack border border-lavender/20 space-y-3 shadow-inner">
                  <div className="text-xs font-mono font-medium text-emeraldAccent uppercase tracking-wider flex items-center gap-2 border-b border-lavender/20 pb-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>The Prevention Strategy</span>
                  </div>
                  <p className="text-xs font-mono text-emeraldAccent/90 leading-relaxed">
                    {reg.prevention}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Core Java Concepts Applied Study Guide */}
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 px-4">
          <BookOpen className="w-5 h-5 text-emeraldAccent" />
          <h3 className="text-xl font-mono font-medium text-alabaster">Core Java Concepts Applied</h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {javaConcepts.map((item, idx) => (
            <div key={idx} className="bg-[#0a1520] p-8 rounded border border-lavender/20 hover:border-emeraldAccent/40 transition-colors space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-lavender/20 pb-2">
                <h4 className="text-base font-mono font-medium text-alabaster">{item.concept}</h4>
                <span className="text-[10px] font-mono text-emeraldAccent bg-emeraldAccent/10 px-2 py-0.5 rounded border border-emeraldAccent/20">OOP Concept</span>
              </div>
              <p className="text-xs text-lavender font-mono leading-relaxed">
                {item.explanation}
              </p>
              <div className="p-4 rounded bg-inkBlack border border-lavender/10 font-mono text-xs text-alabaster/80 space-y-1 shadow-inner">
                <div className="text-emeraldAccent uppercase tracking-wider text-[9px] font-semibold">Real-world Codebase Example:</div>
                <div className="leading-relaxed">{item.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
