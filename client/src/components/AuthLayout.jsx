import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AuthLayout = ({ children, title, subtitle, imageSide = "left" }) => {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Visual Side (Left) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1732029062269-dab8feace9f3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply"
        />
        
        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
              <Sparkles size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">CaptionCraft</span>
          </div>
          
          <div className="mb-12">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Turn your images into <br/>
              <span className="text-blue-200">viral stories.</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-md leading-relaxed">
              Join thousands of creators using AI to generate the perfect captions for Instagram, LinkedIn, and Twitter in seconds.
            </p>
          </div>

          <div className="flex gap-2 opacity-50 text-sm">
            <span>© 2024 CaptionCraft Inc.</span>
            <span>•</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Form Side (Right) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-gray-50/50">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};