import React, { useState } from 'react';
import { Facebook, Linkedin, Instagram, Copy, Check, ArrowRight } from 'lucide-react';
import { ShareOption, SocialPlatform } from '../types';
import { CAMPAIGN_URL } from '../constants';

interface ShareButtonsProps {
  option: ShareOption;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ option }) => {
  const [caption, setCaption] = useState(option.defaultCaption);
  const [activePlatform, setActivePlatform] = useState<SocialPlatform | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: SocialPlatform) => {
    // All platforms now use the modal flow.
    setActivePlatform(platform);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setActivePlatform(null);
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(option.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${option.title.replace(/\s+/g, '-').toLowerCase()}-poster.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.warn("Auto-download failed", error);
    }
  };

  const openPlatform = () => {
    const text = encodeURIComponent(caption);
    const url = encodeURIComponent(CAMPAIGN_URL);
    const popupFeatures = 'width=1000,height=800,scrollbars=yes,resizable=yes';

    // Always download image for all platforms so user has it ready
    downloadImage();

    switch (activePlatform) {
      case 'twitter':
        // Twitter supports text pre-filling via URL
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
        break;
      case 'facebook':
        window.open('https://www.facebook.com', 'facebook_share', popupFeatures);
        break;
      case 'linkedin':
        // Use share-offsite for the "Start a Post" modal experience
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, 'linkedin_share', 'width=600,height=600');
        break;
      case 'instagram':
        window.open('https://www.instagram.com', 'instagram_share', popupFeatures);
        break;
    }
    
    closeModal();
  };

  const getPlatformDisplayName = (p: SocialPlatform) => {
    switch (p) {
        case 'twitter': return 'X (Twitter)';
        case 'facebook': return 'Facebook';
        case 'instagram': return 'Instagram';
        case 'linkedin': return 'LinkedIn';
        default: return '';
    }
  };

  const getStep1Instruction = () => {
    // Unified instruction for all platforms since we now auto-download for all
    if (!activePlatform) return null;
    
    // Customize name display if needed, or just use helper
    const name = activePlatform === 'twitter' ? 'X' : getPlatformDisplayName(activePlatform);
    
    return <span>Click <span className="font-bold text-gray-900">Open {name}</span> below. The image will <span className="font-bold text-campaign-red">automatically download</span>.</span>;
  };

  const getStep3Instruction = () => {
    switch (activePlatform) {
      case 'twitter':
        return <span>Post your tweet!</span>;
      case 'facebook':
        return <span>Click <span className="font-bold text-gray-900">"What's on your mind"</span>, upload the image, and paste the caption.</span>;
      case 'linkedin':
        return <span>In the popup, <span className="font-bold text-gray-900">upload</span> the image (to replace the link preview) and <span className="font-bold text-gray-900">paste</span> the caption.</span>;
      case 'instagram':
        return <span>Create a post, upload the image, and <span className="font-bold text-gray-900">paste</span> the caption.</span>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center w-full">
      {/* Caption Input (Manual Edit Only) */}
      <div className="w-full mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
        <label className="text-xs font-display tracking-wide text-gray-500 uppercase mb-1 block">Your Caption:</label>
        <textarea 
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full text-xs p-2 border rounded resize-none focus:ring-2 focus:ring-campaign-red focus:outline-none text-gray-800"
          rows={3}
        />
      </div>

      <div className="mb-2 text-xl font-display font-black text-black uppercase tracking-tight">
        Share on:
      </div>
      
      <div className="flex gap-3 justify-center">
        <button 
          onClick={() => handleShare('instagram')}
          className="cursor-pointer bg-campaign-red text-white p-3 rounded-full hover:bg-red-700 transition-transform hover:scale-110"
          aria-label="Share on Instagram"
        >
          <Instagram size={24} />
        </button>
        <button 
          onClick={() => handleShare('facebook')}
          className="cursor-pointer bg-campaign-red text-white p-3 rounded-full hover:bg-red-700 transition-transform hover:scale-110"
          aria-label="Share on Facebook"
        >
          <Facebook size={24} />
        </button>
        <button 
          onClick={() => handleShare('linkedin')}
          className="cursor-pointer bg-campaign-red text-white p-3 rounded-full hover:bg-red-700 transition-transform hover:scale-110"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={24} />
        </button>
        <button 
          onClick={() => handleShare('twitter')}
          className="cursor-pointer bg-campaign-red text-white p-3 rounded-full hover:bg-red-700 transition-transform hover:scale-110 flex items-center justify-center"
          aria-label="Share on X"
        >
          {/* X Logo */}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
      </div>

      {/* Share Modal */}
      {activePlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center relative shadow-2xl">
            <button 
              onClick={closeModal}
              className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              ✕
            </button>
            
            <h3 className="text-xl font-display tracking-wide mb-4">
              Post to {getPlatformDisplayName(activePlatform)}
            </h3>
            
            <div className="text-sm text-gray-600 mb-6 text-left space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-campaign-red text-white w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                <p>
                   {getStep1Instruction()}
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="bg-campaign-red text-white w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                <p>
                  {activePlatform === 'twitter' ? (
                     <span>In the X window, <span className="font-bold text-gray-900">upload</span> the image you just downloaded.</span>
                  ) : (
                     <span><span className="font-bold text-gray-900">Copy</span> the caption below.</span>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-campaign-red text-white w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                <p>
                   {getStep3Instruction()}
                </p>
              </div>
            </div>
            
            {/* Caption Preview Box */}
            <div className="bg-gray-50 p-3 rounded-lg mb-6 text-left text-xs border border-gray-200 relative group">
              <p className="text-gray-700 pr-6 leading-relaxed">{caption}</p>
              <button 
                onClick={copyToClipboard}
                className="cursor-pointer absolute top-2 right-2 bg-white p-1.5 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-campaign-red transition-colors"
                title="Copy text"
              >
                {copied ? <Check size={14} className="text-green-600"/> : <Copy size={14} />}
              </button>
            </div>

            <button 
              onClick={openPlatform}
              className="cursor-pointer w-full bg-campaign-red text-white py-3 rounded-lg font-display tracking-wider text-lg hover:bg-red-700 transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              Open {getPlatformDisplayName(activePlatform)}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};