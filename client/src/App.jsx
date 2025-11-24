import React, { useState, useEffect, Suspense, lazy } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import api from "../api/axios";


// Lazy load components
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

function App() {
  const [view, setView] = useState("loading");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistoryMobile, setShowHistoryMobile] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/check");
      
      // Strict check: Status 200 AND specific success message
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
      const res = await api.get("/posts/history");
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
    setView("login");
    setCaption("");
    setHistory([]);
    // Optional: Call logout API if you implement it backend side to clear cookies
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

      const response = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 && response.data?.data) {
        setCaption(response.data.data.captions);
        fetchHistory();
      } else {
        throw new Error(response.data.message || "Failed to generate caption.");
      }
    } catch (err) {
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