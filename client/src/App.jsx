import React, { useState, useEffect, Suspense, lazy } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import axios from "axios";

const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

function App() {
  const [view, setView] = useState("loading"); // Default to loading
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // History State
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistoryMobile, setShowHistoryMobile] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/auth/check", {
        withCredentials: true,
      });
      
      // CRITICAL SECURITY FIX: Ensure we actually got a JSON response with user data
      // This prevents "index.html" 200 OK responses from logging people in.
      if (response.status === 200 && response.data && response.data.message === "Authenticated") {
        setView("main");
        fetchHistory();
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
      const res = await axios.get("/api/posts/history", {
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
     // Clear cookie logic should ideally be an API call, assuming cookie is httpOnly
     // For now, we update state.
    setView("login");
    setCaption("");
    setHistory([]);
  };

  const handleFileSelect = (file) => {
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
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

      const response = await axios.post("/api/posts", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 && response.data?.data) {
        setCaption(response.data.data.captions);
        fetchHistory();
      } else {
        throw new Error(response.data.message || "Failed to generate caption.");
      }
    } catch (err) {
      // If 401, redirect to login
      if (err.response && err.response.status === 401) {
          setView("login");
      }
      setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoadingSpinner />
    </div>
  );

  if (view === "loading") {
      return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      {view === "login" && (
        <Login
          onLoginSuccess={() => {
            setView("main");
            fetchHistory();
          }}
          onSwitchToRegister={() => setView("register")}
        />
      )}
      {view === "register" && (
        <Register onSwitchToLogin={() => setView("login")} />
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