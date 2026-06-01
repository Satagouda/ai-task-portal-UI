export default function StatsCards({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "DONE").length;
  const inProgress = tasks.filter(t => t.status === "IN_PROGRESS").length;
  const overdue = tasks.filter(t => {
    if (t.status === "DONE") return false;
    return t.dueDate && new Date(t.dueDate) < new Date();
  }).length;

  const cards = [
    {
      title: "Total Tasks",
      value: total,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
      accent: "#6366f1",
      bg: "rgba(99,102,241,0.08)",
      border: "rgba(99,102,241,0.2)",
    },
    {
      title: "Completed",
      value: completed,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      accent: "#10b981",
      bg: "rgba(16,185,129,0.08)",
      border: "rgba(16,185,129,0.2)",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
        </svg>
      ),
      accent: "#3b82f6",
      bg: "rgba(59,130,246,0.08)",
      border: "rgba(59,130,246,0.2)",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      accent: "#ef4444",
      bg: "rgba(239,68,68,0.08)",
      border: "rgba(239,68,68,0.2)",
    },
  ];

  return (
    <div className="stagger" style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 16,
      marginBottom: 24,
    }}>
      {cards.map((card, i) => (
        <div
          key={card.title}
          className="animate-fadeUp"
          style={{
            background: "var(--surface)",
            border: `1px solid var(--border)`,
            borderRadius: 12,
            padding: "20px 22px",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.2s, transform 0.2s",
            cursor: "default",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = card.border; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {/* Glow accent */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: 80, height: 80,
            background: `radial-gradient(circle, ${card.bg} 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: card.bg,
              border: `1px solid ${card.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: card.accent,
              flexShrink: 0,
            }}>
              {card.icon}
            </div>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {card.title}
            </span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "var(--text)", letterSpacing: "-1px", lineHeight: 1 }}>
            {card.value}
          </div>
          {/* Bottom accent bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            height: 2, width: `${total > 0 ? (card.value / total * 100) : 0}%`,
            background: card.accent, transition: "width 0.6s ease",
          }} />
        </div>
      ))}
    </div>
  );
}
