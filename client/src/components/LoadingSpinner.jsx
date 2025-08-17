// src/components/LoadingSpinner.jsx
export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500"></div>
      <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500" style={{ animationDelay: '-0.1s' }}></div>
      <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500" style={{ animationDelay: '-0.2s' }}></div>
      <p className="text-gray-600">Generating caption...</p>
    </div>
  );
};