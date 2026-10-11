import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f6f3ed] mt-12 border-t border-[#3a2118]/8 shadow-[0_-1px_6px_rgba(58,33,24,0.03)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-headline font-bold text-base text-[#220d06]">Café Companion</span>
          <span className="text-xs text-[#504440]">• Multimodal Sensory Hospitality System</span>
        </div>
        <div className="flex items-center gap-6 text-[#504440] text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9c4328]"></span>
            Downtown SF Hub
          </span>
          <span>Latency 42ms</span>
          <span>Acoustics 54 dB</span>
          <span className="text-[#9c4328] font-bold">Google Cloud Run &bull; Cloud SQL &bull; Gemini 3.8</span>
        </div>
      </div>
    </footer>
  );
};
