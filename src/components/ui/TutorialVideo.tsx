
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Book, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from './GlassCard';

const TutorialVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
      videoRef.current.currentTime = clickPosition * videoRef.current.duration;
    }
  };
  
  return (
    <GlassCard className="overflow-hidden">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          poster="/tutorial-poster.jpg"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full bg-white/20 backdrop-blur hover:bg-white/30 mb-4"
                onClick={handlePlayPause}
              >
                <Play className="h-8 w-8 text-white" />
              </Button>
              <div className="text-white text-xl font-bold drop-shadow-md">Watch AI-Powered NFT Tutorial</div>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
          <div 
            className="w-full h-1 bg-gray-600 rounded-full mb-2 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-white" onClick={handleMuteToggle}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <Button variant="ghost" size="icon" className="text-white" onClick={handleFullscreen}>
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">How to Use NFT Insight Hub</h3>
        <p className="text-muted-foreground mb-4">
          This AI-generated tutorial walks you through the main features of our platform, showing you how to 
          search for collections, analyze market data, and use our tools to make informed decisions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 p-3 bg-secondary/20 rounded-md">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span>Interactive Learning</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-secondary/20 rounded-md">
            <Book className="h-5 w-5 text-primary" />
            <span>Step-by-Step Guide</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-secondary/20 rounded-md">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI-Enhanced</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={handlePlayPause}>
            {isPlaying ? 'Pause Tutorial' : 'Play Tutorial'}
          </Button>
          <Button className="flex-1">
            Download Tutorial PDF
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default TutorialVideo;
