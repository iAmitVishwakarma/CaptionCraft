import axios from 'axios';
import React, { useState } from 'react';

const Login = ({ onLoginSuccess, onSwitchToRegister , BASE_URL }) => {
 const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { ...user},
      {withCredentials: true})
      .then((res) => {
        if (res.status == 200) {
           setTimeout(() => { onLoginSuccess()}, 1000);
           setLoading(true);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-2xl w-full max-w-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Login to CaptionCraft</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-500 hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
