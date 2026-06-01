import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTaskModal from "../components/task/EditTaskModal";
import useAuth from "../hooks/useAuth";
import LedgerModal from "../components/ledger/LedgerModal";
import StatsCards from "../components/dashboard/StatsCards";
import { getTasks, searchTasks } from "../api/taskApi";
import CreateTaskModal from "../components/task/CreateTaskModal";
import TaskFilters from "../components/task/TaskFilters";
import TaskTable from "../components/task/TaskTable";

export default function DashboardPage() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [historyTask, setHistoryTask] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = keyword || status || priority
        ? await searchTasks({ keyword, status, priority })
        : await getTasks();

      if (Array.isArray(response)) setTasks(response);
      else if (response && Array.isArray(response.content)) setTasks(response.content);
      else setTasks([]);
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Ambient background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(ellipse at 10% 0%, rgba(99,102,241,0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 100%, rgba(124,58,237,0.04) 0%, transparent 50%)",
      }} />

      {/* Topbar */}
      <header style={{
        position: "sticky", top: 0, zIndex: 30,
        background: "rgba(17,19,24,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(99,102,241,0.25)",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", letterSpacing: "-0.3px" }}>
            AI Task Portal
          </span>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#fff",
            }}>
              {user?.firstName?.[0]?.toUpperCase() || "U"}
            </div>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {user?.firstName} {user?.lastName}
            </span>
          </div>

          <div style={{ width: 1, height: 20, background: "var(--border)" }} />

          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="btn btn-ghost"
            style={{ padding: "6px 12px" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px", position: "relative", zIndex: 1 }}>
        {/* Stats */}
        <StatsCards tasks={tasks} />

        {/* Task section */}
        <div className="glass" style={{ borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
          <div style={{
            padding: "18px 22px",
            display: "flex", flexWrap: "wrap", gap: 12,
            alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid var(--border)",
          }}>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>
                My Tasks
              </h2>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                {loading ? "Loading…" : `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <button onClick={() => setShowModal(true)} className="btn btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Task
            </button>
          </div>

          {/* Filters */}
          <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
            <TaskFilters
              keyword={keyword} setKeyword={setKeyword}
              status={status} setStatus={setStatus}
              priority={priority} setPriority={setPriority}
              onSearch={loadTasks}
            />
          </div>

          {/* Table */}
          <TaskTable
            tasks={tasks}
            loading={loading}
            onEdit={setSelectedTask}
            onDeleted={loadTasks}
            onHistory={setHistoryTask}
          />
        </div>
      </main>

      {/* Modals */}
      {selectedTask && (
        <EditTaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onUpdated={loadTasks} />
      )}
      {showModal && (
        <CreateTaskModal onClose={() => setShowModal(false)} onCreated={loadTasks} />
      )}
      {historyTask && (
        <LedgerModal task={historyTask} onClose={() => setHistoryTask(null)} />
      )}
    </div>
  );
}
