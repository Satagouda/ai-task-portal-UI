export default function TaskFilters({ keyword, setKeyword, status, setStatus, priority, setPriority, onSearch }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
      {/* Search */}
      <div style={{ position: "relative", flex: "1 1 200px" }}>
        <div style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: "var(--text-muted)", pointerEvents: "none",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search tasks…"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSearch()}
          className="input-base"
          style={{ paddingLeft: 36 }}
        />
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="input-base"
        style={{ flex: "0 1 150px" }}
      >
        <option value="">All Status</option>
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      {/* Priority */}
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        className="input-base"
        style={{ flex: "0 1 150px" }}
      >
        <option value="">All Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <button onClick={onSearch} className="btn btn-primary" style={{ flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Search
      </button>

      {(keyword || status || priority) && (
        <button
          onClick={() => { setKeyword(""); setStatus(""); setPriority(""); onSearch(); }}
          className="btn btn-ghost"
          style={{ flexShrink: 0 }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
