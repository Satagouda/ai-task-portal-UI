import { useForm } from "react-hook-form";
import { updateTask } from "../../api/taskApi";
import toast from "react-hot-toast";

export default function EditTaskModal({ task, onClose, onUpdated }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues: task });

  const submit = async (data) => {
    try {
      await updateTask(task.id, {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        dueDate: data.dueDate,
        estimatedEffort: data.estimatedEffort,
      });
      toast.success("Task updated!");
      onUpdated();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update task");
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 500 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>Edit Task</h2>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>Update task details</p>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text-muted)", padding: 4, borderRadius: 6,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label className="label">Title</label>
            <input {...register("title")} className="input-base" />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea {...register("description")} className="input-base" rows={3} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="label">Priority</label>
              <select {...register("priority")} className="input-base">
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select {...register("status")} className="input-base">
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>DONE</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="label">Due Date</label>
              <input type="date" {...register("dueDate")} className="input-base" />
            </div>
            <div>
              <label className="label">Effort (1–10)</label>
              <input type="number" min={1} max={10} {...register("estimatedEffort", { required: true, min: 1, max: 10 })} className="input-base" />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingTop: 4 }}>
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
              </svg>
              {isSubmitting ? "Saving…" : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
