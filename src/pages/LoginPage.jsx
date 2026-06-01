import { useForm } from "react-hook-form";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      login(response.data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      padding: "24px",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.04) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }} className="animate-fadeUp">
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "linear-gradient(135deg, #6366f1, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 0 32px rgba(99,102,241,0.25)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px" }}>AI Task Portal</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 6 }}>Sign in to your workspace</p>
        </div>

        <div className="glass" style={{ borderRadius: 16, padding: 28 }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                {...register("email")}
                className="input-base"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="input-base"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "11px", marginTop: 4, fontSize: 15 }}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-muted)" }}>
            No account yet?{" "}
            <Link to="/register" style={{ color: "var(--accent)", fontWeight: 500 }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
