import React, { useState } from "react";
import axios from "axios";
import { AuthLayout } from './AuthLayout';
import { User, Lock, Loader2, CheckCircle2 } from 'lucide-react';

const Register = ({ onSwitchToLogin, BASE_URL }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, 
        { ...user },
        { withCredentials: true }
      );
      
      if (response.status === 201) {
        setSuccess("Account created successfully!");
        setTimeout(() => onSwitchToLogin(), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Start creating viral captions with AI today."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Username Input */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose a Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none bg-white"
                placeholder="e.g. creative_mind"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none bg-white"
                placeholder="••••••••"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm animate-fade-in">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || success}
          className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : "Get Started"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold text-purple-600 hover:text-purple-500 transition-colors hover:underline decoration-2 underline-offset-4"
          >
            Log in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;