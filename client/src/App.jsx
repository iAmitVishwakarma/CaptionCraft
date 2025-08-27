import React, { useState, useEffect } from 'react';
import {LoadingSpinner} from './components/LoadingSpinner';
import {CaptionDisplay} from './components/CaptionDisplay';
import {DragAndDropUploader} from './components/DragAndDropUploader';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';

function App() {
const BASE_URL = 'https://captioncraft-pqdi.onrender.com/api';


  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('login'); // 'login', 'register', 'main'



  // This effect checks if the user is authenticated on page load.
  useEffect(() => {
    const checkAuth = async () => {
      try {
       const response = await axios.get(`${BASE_URL}/auth/check`, { withCredentials: true });
       if (response.status === 200) {
         setView('main');
       } else {
         setView('login');
       }
     } catch (e) {
       setView('login');
     }
   };
   checkAuth();
 }, []);

   const handleLogout = () => {
    setView('login');
    setCaption('');
    setError('');
  }; 
  
  
 const handleFileSelect = (file) => {
  if (!file || !file.type.startsWith('image/')) {
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
    formData.append('image', file); // 👈 Matches Postman key

    const response = await axios.post(`${BASE_URL}/posts`, formData, {
      withCredentials: true, 
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    if (response.status === 201) {
      setCaption(response.data.data.captions);
    } else {
      throw new Error(response.data.message || 'Failed to generate caption.');
    }
  } catch (err) {
    setError(err.message || 'An unexpected error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};


  const renderContent = () => {
    if (view === 'login') {
      return <Login BASE_URL={BASE_URL} onLoginSuccess={() => setView('main')} onSwitchToRegister={() => setView('register')} />;
    } else if (view === 'register') {
      return <Register BASE_URL={BASE_URL} onSwitchToLogin={() => setView('login')} />;
    } else {
      return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
             <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
       CaptionCraft 🎨
             </h1>
             <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition-colors"
              >
               Logout
             </button>
          </div>
          <DragAndDropUploader onFileSelect={handleFileSelect} />
          <div className="mt-6 flex flex-col items-center">
            {loading && <LoadingSpinner />}
            {!loading && <CaptionDisplay caption={caption.Caption1} error={error} />}
            {!loading && !error ? <CaptionDisplay caption={caption.Caption2} error={error} /> : <></>}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      {renderContent()}
    </div>
  );
}

export default App;
