import React, { useState } from "react";
import axios from "axios";

const Register = ({ onSwitchToLogin, BASE_URL }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    console.log(user);

    try {
      const response = await axios
        .post(`${BASE_URL}/auth/register`, { ...user },
          {
            withCredentials: true
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setSuccess("Registration successful! You can now log in.");
            setTimeout(() => onSwitchToLogin(), 2000);
          }})
        .catch((err) => setError(err.response.data.message));
      //         const errData = await response.json();
      //         throw new Error(errData.message || 'Registration failed');
      //       }

      //       setSuccess('Registration successful! You can now log in.');
      //       setTimeout(() => onSwitchToLogin(), 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-2xl w-full max-w-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Register for CaptionCraft
      </h2>
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && (
        <p className="mt-4 text-red-500 text-xs font-semibold">{error}</p>
      )}
      {success && <p className="mt-4 text-green-500 text-sm">{success}</p>}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-500 hover:underline font-medium"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
