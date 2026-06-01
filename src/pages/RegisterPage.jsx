import { useForm } from "react-hook-form";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
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
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(circle at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }} className="animate-fadeUp">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
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
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px" }}>Create Account</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 6 }}>Join the AI Task Portal</p>
        </div>

        <div className="glass" style={{ borderRadius: 16, padding: 28 }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label className="label">Username</label>
              <input placeholder="your_username" {...register("username")} className="input-base" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label className="label">First Name</label>
                <input placeholder="John" {...register("firstName")} className="input-base" />
              </div>
              <div>
                <label className="label">Last Name</label>
                <input placeholder="Doe" {...register("lastName")} className="input-base" />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" placeholder="you@company.com" {...register("email")} className="input-base" />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" placeholder="••••••••" {...register("password")} className="input-base" />
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input type="password" placeholder="••••••••" {...register("confirmPassword")} className="input-base" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "11px", marginTop: 4, fontSize: 15 }}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--accent)", fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
