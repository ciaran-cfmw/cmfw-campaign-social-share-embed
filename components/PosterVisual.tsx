import React from 'react';
import { Download } from 'lucide-react';
import { ShareOption } from '../types';

interface PosterVisualProps {
  option: ShareOption;
}

export const PosterVisual: React.FC<PosterVisualProps> = ({ option }) => {
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Fetch the image as a blob to force a proper download
      const response = await fetch(option.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Create a filename based on the title
      link.download = `${option.title.replace(/\s+/g, '-').toLowerCase()}-poster.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback if fetch fails (e.g. CORS): open in new tab
      console.warn("Direct download failed, opening in new tab", error);
      window.open(option.imageUrl, '_blank');
    }
  };

  return (
    <div className="relative w-full bg-white flex flex-col items-center justify-center overflow-hidden group/poster">
      <img 
        src={option.imageUrl} 
        alt={option.title}
        className="w-full h-auto object-cover block"
        loading="lazy"
      />

      {/* Download Button Overlay */}
      <button
        onClick={handleDownload}
        className="cursor-pointer absolute bottom-4 left-1/2 -translate-x-1/2 bg-campaign-red text-white p-2.5 rounded-full shadow-lg opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200 flex items-center justify-center hover:bg-red-700"
        title="Download Image"
        aria-label="Download poster"
      >
        <Download size={20} />
      </button>
    </div>
  );
};