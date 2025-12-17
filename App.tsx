import React from 'react';
import { SHARE_OPTIONS } from './constants';
import { PosterVisual } from './components/PosterVisual';
import { ShareButtons } from './components/ShareButtons';

export default function App() {
  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 font-sans bg-transparent">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-black text-campaign-dark uppercase mb-4 tracking-tighter">
            Spread the Word
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a poster below to share your pledge with your network.
          </p>
        </div>

        {/* Grid updated to force 3 columns starting at 'md' breakpoint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 align-top">
          {SHARE_OPTIONS.map((option) => (
            <div key={option.id} className="flex flex-col items-center">
              {/* The Poster Container with border effect */}
              <div className="w-full relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative ring-1 ring-gray-900/5 rounded-sm bg-white p-2 shadow-xl">
                   {/* Clean container for the image */}
                   <div className="border border-gray-100 p-0.5 bg-white">
                      <PosterVisual option={option} />
                   </div>
                </div>
              </div>

              {/* Share Controls */}
              <ShareButtons option={option} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}