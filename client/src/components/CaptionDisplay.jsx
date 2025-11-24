import React from 'react';
import { Copy, Check } from 'lucide-react';

export const CaptionDisplay = ({ caption, error }) => {
   const [copied, setCopied] = React.useState(false);

   if (error) return null;
   if (!caption) return null;

   const handleCopy = () => {
      navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
       <article className="text-gray-800 text-lg leading-relaxed pr-8">
          {caption}
       </article>
       
       <button
         onClick={handleCopy}
         className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-200 flex items-center gap-2
           ${copied 
             ? 'bg-green-100 text-green-700' 
             : 'bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600'
           }`}
         title="Copy to clipboard"
       >
         {copied ? <Check size={18} /> : <Copy size={18} />}
       </button>
    </div>
  );
};
