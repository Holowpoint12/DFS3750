import React, { useEffect, useRef } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
  className?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
  videoId, 
  autoplay = false,
  className = ''
}) => {
  const playerRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Add event listener for messaging from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === "onStateChange" && data.info === 0) {
          // Video ended, could handle replay or other actions
          console.log("Video ended");
        }
      } catch (e) {
        // Not a JSON message or other error
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [videoId]);

  return (
    <div className={`youtube-player-container ${className}`}>
      <iframe
        ref={playerRef}
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&enablejsapi=1&modestbranding=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer; 