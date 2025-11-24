import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CaptionDisplay } from './components/CaptionDisplay';
import { DragAndDropUploader } from './components/DragAndDropUploader';
import { HistoryList } from './components/HistoryList'; // Import new component
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import {X as XIcon, Sparkles, LogOut, History as HistoryIcon, LayoutGrid } from 'lucide-react';

function App() {
  const BASE_URL = 'http://localhost:3000/api'; // Or your local if testing
  // const BASE_URL = 'http://localhost:3000/api'; 

  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('login');
  
  // History State
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistoryMobile, setShowHistoryMobile] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/check`, { withCredentials: true });
      if (response.status === 200) {
        setView('main');
        fetchHistory(); // Fetch history when logged in
      } else {
        setView('login');
      }
    } catch (e) {
      setView('login');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get(`${BASE_URL}/posts/history`, { withCredentials: true });
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
    setView('login');
    setCaption('');
    setHistory([]);
  };

  const handleFileSelect = (file) => {
    if (!file) {
        setImageFile(null);
        return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setImageFile(file);
    setCaption('');
    setError('');
    generateCaption(file);
  };

  const generateCaption = async (file) => {
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${BASE_URL}/posts`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setCaption(response.data.data.captions);
        fetchHistory(); // Refresh history after generation
      } else {
        throw new Error(response.data.message || 'Failed to generate caption.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (view === 'login') return <Login BASE_URL={BASE_URL} onLoginSuccess={() => { setView('main'); fetchHistory(); }} onSwitchToRegister={() => setView('register')} />;
  if (view === 'register') return <Register BASE_URL={BASE_URL} onSwitchToLogin={() => setView('login')} />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Sparkles size={20} />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                CaptionCraft
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowHistoryMobile(!showHistoryMobile)}
                className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <HistoryIcon size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
          
          {/* Main Content - Creator Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-1">
               {/* Header inside card */}
               <div className="px-6 py-4 border-b border-gray-50">
                 <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                   <LayoutGrid size={18} className="text-blue-500"/> 
                   Generate New Caption
                 </h2>
               </div>
               
               <div className="p-6 sm:p-8">
                  <DragAndDropUploader onFileSelect={handleFileSelect} setCaption={setCaption} />
                  
                  <div className="mt-8 min-h-[150px]">
                    {loading && (
                      <div className="flex flex-col items-center justify-center py-10 fade-in">
                        <LoadingSpinner />
                        <p className="mt-4 text-gray-500 animate-pulse">Analyzing magic...</p>
                      </div>
                    )}

                    {!loading && error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center border border-red-100">
                        {error}
                      </div>
                    )}

                    {!loading && caption && (
                      <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Results</h3>
                        {caption.Caption1 && <CaptionDisplay caption={caption.Caption1} />}
                        {caption.Caption2 && <CaptionDisplay caption={caption.Caption2} />}
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar - History */}
          <div className={`
            fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:bg-transparent lg:z-auto lg:col-span-4 lg:block
            ${showHistoryMobile ? 'translate-x-0' : 'translate-x-full'}
          `}>
             <div className="bg-white lg:rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                   <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                     <HistoryIcon size={18} className="text-purple-500"/>
                     Your History
                   </h2>
                   <button onClick={() => setShowHistoryMobile(false)} className="lg:hidden">
                     <XIcon size={20} />
                   </button>
                </div>
                <div className="flex-1 p-4 overflow-hidden">
                   <HistoryList history={history} isLoading={loadingHistory} />
                </div>
             </div>
          </div>

        </div>
      </div>
      
      {/* Mobile overlay backdrop */}
      {showHistoryMobile && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setShowHistoryMobile(false)}
        />
      )}
    </div>
  );
}

export default App;
