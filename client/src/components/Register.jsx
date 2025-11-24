import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { AuthLayout } from "./AuthLayout";
import { AuthForm } from "./AuthForm"; // Import the shared component

const Register = ({ onSwitchToLogin }) => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
// console.log(values);  
    try {
      const response = await axios.post("/api/auth/register",values,{ withCredentials: true });

      if (response.status === 201) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => onSwitchToLogin(), 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start creating viral captions with AI today."
    >
      <Helmet>
        <title>Sign Up - CaptionCraft</title>
        {/* ... existing meta tags ... */}
      </Helmet>

      <AuthForm 
        type="register"
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
      />

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold text-gray-900 hover:text-gray-700 transition-colors hover:underline decoration-2 underline-offset-4"
          >
            Log in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;