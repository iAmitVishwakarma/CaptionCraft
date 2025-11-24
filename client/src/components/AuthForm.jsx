import React from "react";
import { Mail, User, Lock, Loader2, ArrowRight } from "lucide-react";

export const AuthForm = ({
  type = "login", // 'login' or 'register'
  onSubmit,
  loading,
  error,
  success,
  values,
  onChange,
}) => {
  const isLogin = type === "login";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Username Input */}
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isLogin ? "Username" : "Choose a Username"}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              {isLogin ? <Mail size={18} /> : <User size={18} />}
            </div>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={onChange}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white"
              placeholder={isLogin ? "Enter your username" : "e.g. creative_mind"}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              {isLogin ? "Password" : "Create Password"}
            </label>
            {isLogin && (
              <button
                type="button"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white"
              placeholder="••••••••"
              required
              minLength={!isLogin ? 6 : undefined}
            />
          </div>
          {!isLogin && (
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters
            </p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50SC border border-red-100 text-red-600 text-sm flex items-center gap-2 animate-fade-in">
          <span className="w-1 h-4 bg-red-500 rounded-full"></span>
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm flex items-center gap-2 animate-fade-in">
          {success}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || (success && !isLogin)}
        className={`w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semiboldQX text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] ${
          isLogin
            ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            : "bg-gray-900 hover:bg-gray-800 focus:ring-gray-900"
        }`}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            {isLogin ? "Sign in" : "Get Started"}
            {isLogin && <ArrowRight size={16} />}
          </>
        )}
      </button>
    </form>
  );
};