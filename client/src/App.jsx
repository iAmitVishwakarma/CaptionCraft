import React, { useState, useEffect, Suspense, lazy } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import axios from "axios";

// Lazy load components
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

function App() {

  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("login");

  // History State
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistoryMobile, setShowHistoryMobile] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get('api/auth/check', {
        withCredentials: true,
      });
      if (response.status === 200) {
        setView("main");
        fetchHistory(); // Fetch history when logged in
      } else {
        setView("login");
      }
    } catch (e) {
      setView("login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get('api/posts/history', {
        withCredentials: true,
      });
      if (res.data && res.data.data) {
        setHistory(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleLogout = () => {
    // Ideally call logout API to clear cookie
    setView("login");
    setCaption("");
    setHistory([]);
  };

  const handleFileSelect = (file) => {
    if (!file) {
      setImageFile(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setImageFile(file);
    setCaption("");
    setError("");
    generateCaption(file);
  };

  const generateCaption = async (file) => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post('api/posts', formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setCaption(response.data.data.captions);
        fetchHistory(); // Refresh history after generation
      } else {
        throw new Error(response.data.message || "Failed to generate caption.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoadingSpinner />
    </div>
  );

  return (
    <Suspense fallback={<LoadingFallback />}>
      {view === "login" && (
        <Login
          BASE_URL={BASE_URL}
          onLoginSuccess={() => {
            setView("main");
            fetchHistory();
          }}
          onSwitchToRegister={() => setView("register")}
        />
      )}
      {view === "register" && (
        <Register
          BASE_URL={BASE_URL}
          onSwitchToLogin={() => setView("login")}
        />
      )}
      {view === "main" && (
        <Dashboard
          handleLogout={handleLogout}
          showHistoryMobile={showHistoryMobile}
          setShowHistoryMobile={setShowHistoryMobile}
          handleFileSelect={handleFileSelect}
          setCaption={setCaption}
          loading={loading}
          error={error}
          caption={caption}
          history={history}
          loadingHistory={loadingHistory}
        />
      )}
    </Suspense>
  );
}

export default App;
