import { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react'; 

export const DragAndDropUploader = ({ onFileSelect , setCaption}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    onFileSelect(null); // You might need to handle null in parent
    setCaption('')
  }

  return (
    <div
      className={`relative group w-full h-64 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden
        ${isDragging 
          ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' 
          : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input').click()}
    >
      <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      
      {preview ? (
        <>
          <img src={preview} alt="Preview" className="w-full h-full object-contain p-2" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <p className="text-white font-medium flex items-center gap-2">
              <Upload size={20} /> Change Image
            </p>
          </div>
          <button 
            onClick={clearImage}
            className="absolute top-3 right-3 p-1 bg-white rounded-full shadow-md text-gray-500 hover:text-red-500 z-10"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div className="text-center p-6 transition-transform duration-300 group-hover:scale-105">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Upload an image</h3>
          <p className="text-gray-400 mt-2 text-sm">Drag and drop or click to browse</p>
        </div>
      )}
    </div>
  );
};
