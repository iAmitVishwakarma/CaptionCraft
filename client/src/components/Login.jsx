import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthLayout } from "./AuthLayout";
import { AuthForm } from "./AuthForm"; // Import the shared component

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
      const response = await axios.post(
        "/api/auth/login",
        values,
        { withCredentials: true }
      );

      console.log(response);
      // if (response.status === 200) {
      //   setTimeout(() => onLoginSuccess(), 800);
      // }
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
        {/* ... existing meta tags ... */}
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