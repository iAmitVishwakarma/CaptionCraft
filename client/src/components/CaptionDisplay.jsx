// src/components/CaptionDisplay.jsx
import React from 'react';
import { Copy } from 'lucide-react';

export const CaptionDisplay = ({ caption, error }) => {
  return (
    <div className="mt-4 text-center shadow my-2 p-2 rounded-b-2xl">
      {error && <p className="text-red-500">{error}</p>}
      {caption && (<>
        <article className="text-lg font-semibold text-gray-800 py-2 ">{caption}</article>
      
        <button className='flex shadow rounded-full px-10 gap-2 py-1 items-center justify-center mx-auto' 
        onClick={(e) => {
          if (e.target.closest("button").children[1].innerText === 'Copied!') {
            // If the text is already 'Copied!', do nothing
            return;
          }
          navigator.clipboard.writeText(caption);
          e.target.closest("button").children[1].innerText = 'Copied!';
        }}><Copy /> <span className='ml-1'>Copy</span></button>
      </>)}
    </div>
  );
};