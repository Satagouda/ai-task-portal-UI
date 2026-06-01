import toast from "react-hot-toast";
import { deleteTask } from "../../api/taskApi";

const statusClass = { TODO: "badge-todo", IN_PROGRESS: "badge-inprogress", DONE: "badge-done" };
const statusLabel = { TODO: "Todo", IN_PROGRESS: "In Progress", DONE: "Done" };
const priorityClass = { LOW: "badge-low", MEDIUM: "badge-medium", HIGH: "badge-high" };

export default function TaskRow({ task, onEdit, onDeleted, onHistory }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${task.title}"?`);
    if (!confirmed) return;
    try {
      await deleteTask(task.id);
      toast.success("Task deleted");
      onDeleted();
    } catch {
      toast.error("Delete failed");
    }
  };

  const isOverdue = task.status !== "DONE" && task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <tr style={{
      borderBottom: "1px solid var(--border)",
      transition: "background 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Title */}
      <td style={{ padding: "14px 16px", maxWidth: 220 }}>
        <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {task.title}
        </div>
      </td>

      {/* Description */}
      <td style={{ padding: "14px 16px", maxWidth: 260 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {task.description?.length > 55 ? `${task.description.substring(0, 55)}…` : task.description || "—"}
        </div>
      </td>

      {/* Priority */}
      <td style={{ padding: "14px 16px" }}>
        <span className={`badge ${priorityClass[task.priority] || "badge-low"}`}>
          {task.priority}
        </span>
      </td>

      {/* Status */}
      <td style={{ padding: "14px 16px" }}>
        <span className={`badge ${statusClass[task.status] || "badge-todo"}`}>
          {statusLabel[task.status] || task.status}
        </span>
      </td>

      {/* Effort */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 48, height: 4, background: "var(--border-light)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2,
              width: `${Math.min((task.estimatedEffort / 10) * 100, 100)}%`,
              background: task.estimatedEffort > 7 ? "#ef4444" : task.estimatedEffort > 4 ? "#f59e0b" : "#10b981",
            }} />
          </div>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--mono)" }}>{task.estimatedEffort}/10</span>
        </div>
      </td>

      {/* Due Date */}
      <td style={{ padding: "14px 16px" }}>
        <span style={{
          fontSize: 12,
          fontFamily: "var(--mono)",
          color: isOverdue ? "var(--danger)" : "var(--text-muted)",
          fontWeight: isOverdue ? 600 : 400,
        }}>
          {task.dueDate || "—"}
        </span>
        {isOverdue && <span style={{ marginLeft: 4, fontSize: 10, color: "var(--danger)" }}>● OVERDUE</span>}
      </td>

      {/* Actions */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
          <button onClick={() => onHistory(task)} className="btn btn-ghost btn-sm" title="Audit Trail">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
              <path d="M12 7v5l4 2"/>
            </svg>
            Trail
          </button>
          <button onClick={() => onEdit(task)} className="btn btn-warning btn-sm" title="Edit">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger btn-sm" title="Delete">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
