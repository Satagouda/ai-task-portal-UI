import { useEffect, useState } from "react";
import { getLedger, verifyLedger } from "../../api/ledgerApi";

export default function LedgerModal({ task, onClose }) {
  const [history, setHistory] = useState([]);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadLedger(); }, []);

  const loadLedger = async () => {
    try {
      setLoading(true);
      const [ledger, verify] = await Promise.all([getLedger(task.id), verifyLedger(task.id)]);
      setHistory(ledger || []);
      // API may return a raw boolean (true/false) or an object ({ valid: true })
      if (typeof verify === "boolean") {
        setValid(verify);
      } else if (verify && typeof verify === "object") {
        setValid(verify.valid ?? verify.isValid ?? verify.verified ?? false);
      } else {
        setValid(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", zIndex: 40 }}
        onClick={onClose}
        className="animate-fadeIn"
      />

      <div
        style={{
          position: "fixed", top: 0, right: 0, height: "100%",
          width: "100%", maxWidth: 480,
          background: "var(--surface)",
          borderLeft: "1px solid var(--border)",
          zIndex: 50, overflowY: "auto",
          boxShadow: "-24px 0 48px rgba(0,0,0,0.4)",
        }}
        className="animate-slideInRight"
      >
        {/* Header */}
        <div style={{
          padding: "22px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "var(--surface-2)",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)",
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
                  <path d="M12 7v5l4 2"/>
                </svg>
              </div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>Audit Trail</h2>
            </div>
            <p style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--mono)" }}>
              {task.title}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "1px solid var(--border)", cursor: "pointer",
              color: "var(--text-muted)", borderRadius: 8, width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Integrity badge */}
        {!loading && (
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 14px", borderRadius: 8,
              background: valid ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
              border: `1px solid ${valid ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
              color: valid ? "#34d399" : "#f87171",
              fontSize: 13, fontWeight: 600,
            }}>
              {valid ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              )}
              {valid ? "Chain Verified" : "Chain Invalid"}
            </div>
            <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8 }}>
              {valid ? "All blocks are cryptographically valid." : "One or more blocks may have been tampered with."}
            </p>
          </div>
        )}

        {/* Timeline */}
        <div style={{ padding: "20px 24px" }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <div className="skeleton" style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0 }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div className="skeleton" style={{ height: 14, width: "60%" }} />
                    <div className="skeleton" style={{ height: 12, width: "40%" }} />
                    <div className="skeleton" style={{ height: 12, width: "80%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>No blockchain history found.</p>
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute", left: 13, top: 28, bottom: 28,
                width: 1, background: "var(--border)",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {history.map((block, index) => (
                  <div key={block.id} style={{ display: "flex", gap: 16, paddingBottom: 20 }}>
                    {/* Dot */}
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      background: index === 0 ? "var(--accent)" : "var(--surface-2)",
                      border: `2px solid ${index === 0 ? "var(--accent)" : "var(--border-light)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative", zIndex: 1,
                      color: index === 0 ? "#fff" : "var(--text-muted)",
                      fontSize: 10, fontWeight: 700, fontFamily: "var(--mono)",
                    }}>
                      {index === 0 ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 11l3 3L22 4"/>
                        </svg>
                      ) : block.blockIndex}
                    </div>

                    {/* Card */}
                    <div style={{
                      flex: 1,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      padding: "12px 14px",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, color: "var(--text)", fontSize: 13 }}>{block.action}</span>
                        <span style={{
                          fontSize: 10, color: "var(--text-muted)",
                          fontFamily: "var(--mono)",
                          background: "var(--border)",
                          padding: "2px 6px", borderRadius: 4,
                        }}>
                          #{block.blockIndex}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--mono)", marginBottom: 6 }}>
                        {block.createdAt}
                      </div>
                      <div style={{
                        fontSize: 10, color: "var(--text-muted)",
                        fontFamily: "var(--mono)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        background: "var(--bg)", padding: "4px 8px", borderRadius: 5,
                        border: "1px solid var(--border)",
                      }}>
                        {block.currentHash?.substring(0, 40)}…
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}