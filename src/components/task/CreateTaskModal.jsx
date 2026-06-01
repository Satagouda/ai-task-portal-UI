import { useState } from "react";
import { useForm } from "react-hook-form";
import { createTask } from "../../api/taskApi";
import toast from "react-hot-toast";
import { generateTaskDetails } from "../../api/aiApi";

export default function CreateTaskModal({ onClose, onCreated }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [aiLoading, setAiLoading] = useState(false);

  const submit = async (data) => {
    try {
      await createTask(data);
      toast.success("Task created!");
      reset();
      onCreated();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create task");
    }
  };

  const generateWithAI = async () => {
    const title = watch("title");
    if (!title) { toast.error("Enter a title first"); return; }
    setAiLoading(true);
    try {
      const response = await generateTaskDetails(title);
      setValue("description", response.description);
      setValue("priority", response.priority);
      setValue("estimatedEffort", response.estimatedEffort);
      toast.success("AI generated task details");
    } catch {
      toast.error("AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 500 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>Create Task</h2>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>Add a new task to your workspace</p>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text-muted)", width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Title + AI */}
          <div>
            <label className="label">Title</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Task title…" {...register("title")} className="input-base" style={{ flex: 1 }} />
              <button
                type="button"
                onClick={generateWithAI}
                disabled={aiLoading}
                className="btn btn-ai"
                style={{ flexShrink: 0 }}
              >
                {aiLoading ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                )}
                {aiLoading ? "Generating…" : "AI Fill"}
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea placeholder="Describe the task…" {...register("description")} className="input-base" rows={3} />
          </div>

          {/* Priority + Status */}
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

          {/* Due Date + Effort */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="label">Due Date</label>
              <input type="date" {...register("dueDate")} className="input-base" />
            </div>
            <div>
              <label className="label">Effort (1–10)</label>
              <input type="number" min={1} max={10} placeholder="5" {...register("estimatedEffort")} className="input-base" />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingTop: 4 }}>
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
              </svg>
              Save Task
            </button>
          </div>
        </form>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
