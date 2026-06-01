import TaskRow from "./TaskRow";

export default function TaskTable({ tasks, loading, onEdit, onDeleted, onHistory }) {
  return (
    <div className="glass" style={{ borderRadius: 12, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Title", "Description", "Priority", "Status", "Effort", "Due Date", "Actions"].map(col => (
                <th key={col} style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  background: "var(--surface-2)",
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} style={{ padding: "14px 16px" }}>
                      <div className="skeleton" style={{ height: 14, width: j === 0 ? 120 : j === 6 ? 80 : 70 }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : !Array.isArray(tasks) ? (
              <tr>
                <td colSpan="7">
                  <div style={{ textAlign: "center", padding: "40px 16px", color: "var(--danger)" }}>
                    Invalid task data received.
                  </div>
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div style={{ textAlign: "center", padding: "52px 16px" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 12,
                      background: "var(--surface-2)", border: "1px solid var(--border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px", color: "var(--text-muted)",
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                      </svg>
                    </div>
                    <p style={{ color: "var(--text)", fontWeight: 600, marginBottom: 6 }}>No tasks yet</p>
                    <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Create your first task to get started.</p>
                  </div>
                </td>
              </tr>
            ) : (
              tasks.map(task => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDeleted={onDeleted}
                  onHistory={onHistory}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      {Array.isArray(tasks) && tasks.length > 0 && (
        <div style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--border)",
          fontSize: 12,
          color: "var(--text-muted)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span>{tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
        </div>
      )}
    </div>
  );
}
