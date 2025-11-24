import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthLayout } from "./AuthLayout";
import { AuthForm } from "./AuthForm";
import api from "../../api/axios";


const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use the 'api' instance instead of direct axios
      const response = await api.post("/auth/login", values); // Note: '/auth/login' because baseURL includes '/api'

      // SECURITY FIX: Check for actual user data, not just status 200.
      // If the proxy fails and returns HTML (200 OK), response.data.user will be undefined.
      if (response.status === 200 && response.data && response.data.user) {
        setTimeout(() => onLoginSuccess(), 800);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      // Handle specific error messages from backend
      const errorMessage = 
        err.response?.data?.message || 
        "Invalid username or password."; // Default fallback
      
      setError(errorMessage);
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
      </Helmet>

      <AuthForm 
        type="login"
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

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