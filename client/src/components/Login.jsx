import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthLayout } from "./AuthLayout";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/auth/login",
        { ...user },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Add a small delay for better UX (so the user sees the success state)
        setTimeout(() => onLoginSuccess(), 800);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your details to access your workspace."
    >
      <Helmet>
        <title>Login - CaptionCraft</title>
        <meta
          name="description"
          content="Log in to your CaptionCraft account to access your saved captions and generate new ones."
        />
        <meta property="og:title" content="Login - CaptionCraft" />
        <meta
          property="og:description"
          content="Log in to your CaptionCraft account to access your saved captions and generate new ones."
        />
      </Helmet>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Username Input */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2 animate-fade-in">
            <span className="w-1 h-4 bg-red-500 rounded-full"></span>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              Sign in <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          New to CaptionCraft?{" "}
          <button
            onClick={onSwitchToRegister}
            className="font-semibold text-blue-600 hover:text-blue-500 transition-colors hover:underline decoration-2 underline-offset-4"
          >
            Create an account
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
