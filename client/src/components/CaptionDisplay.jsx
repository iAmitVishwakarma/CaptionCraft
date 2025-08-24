// src/components/CaptionDisplay.jsx
import React from 'react';
import { Copy } from 'lucide-react';

export const CaptionDisplay = ({ caption, error }) => {
  return (
    <div className="mt-4 text-center">
      {error && <p className="text-red-500">{error}</p>}
      {caption && (<>
        <p className="text-lg font-semibold text-gray-800 break-words">{caption}</p>
        <br />
        <button onClick={() => navigator.clipboard.writeText(caption)}><Copy /> Copy</button>
      </>)}
    </div>
  );
};