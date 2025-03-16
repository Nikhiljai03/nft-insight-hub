
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCw, Wallet, PieChart, BarChartHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import GlassCard from './GlassCard';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const TutorialVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const handleWaiting = () => {
      setIsBuffering(true);
    };
    
    const handleCanPlay = () => {
      setIsBuffering(false);
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);
  
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          toast({
            title: "Can't play video",
            description: "Please try again or check your browser settings.",
            variant: "destructive",
          });
        });
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
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 0;
      const progressValue = (currentTime / duration) * 100;
      setProgress(progressValue);
      setCurrentTime(currentTime);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
      videoRef.current.currentTime = clickPosition * videoRef.current.duration;
    }
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleExploreCollections = () => {
    navigate('/');
  };
  
  const handleConnectWallet = () => {
    navigate('/wallet');
    toast({
      title: "Wallet Connection",
      description: "Wallet connection feature is coming soon!",
    });
  };

  const handleGetStarted = () => {
    navigate('/get-started');
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center max-w-lg">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full bg-white/20 backdrop-blur hover:bg-white/30 mb-4"
                onClick={handlePlayPause}
              >
                <Play className="h-8 w-8 text-white" />
              </Button>
              <h2 className="text-white text-2xl font-bold drop-shadow-md mb-3">
                NFT Insight Hub Tutorial
              </h2>
              <p className="text-white/80 mb-4 drop-shadow-md">
                Learn how to navigate the platform, analyze NFT collections, connect your wallet, 
                and leverage blockchain data for better insights.
              </p>
            </div>
          </div>
        )}
        
        {isBuffering && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <RotateCw className="h-8 w-8 text-white animate-spin" />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>
          
          <div 
            className="w-full h-2 bg-gray-600 rounded-full mb-2 cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary rounded-full absolute top-0 left-0" 
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
              <span className="text-white text-xs">{isPlaying ? 'Playing' : 'Paused'}</span>
            </div>
            
            <Button variant="ghost" size="icon" className="text-white" onClick={handleFullscreen}>
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">NFT Insight Hub: The Complete Guide</h3>
        <p className="text-muted-foreground mb-6">
          This tutorial walks you through every feature of our platform, from browsing NFT collections 
          and analyzing market trends to connecting your wallet and making informed decisions using our 
          blockchain analytics tools.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col gap-2 p-4 bg-secondary/20 rounded-md">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <span className="font-medium">Analytics Dashboard</span>
            </div>
            <p className="text-sm text-muted-foreground">Explore real-time market data, price trends, and collection statistics</p>
          </div>
          
          <div className="flex flex-col gap-2 p-4 bg-secondary/20 rounded-md">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="font-medium">Wallet Integration</span>
            </div>
            <p className="text-sm text-muted-foreground">Connect your crypto wallet to track your NFT portfolio and trade assets</p>
          </div>
          
          <div className="flex flex-col gap-2 p-4 bg-secondary/20 rounded-md">
            <div className="flex items-center gap-2">
              <BarChartHorizontal className="h-5 w-5 text-primary" />
              <span className="font-medium">Collection Comparison</span>
            </div>
            <p className="text-sm text-muted-foreground">Compare different NFT collections to identify investment opportunities</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1" onClick={handleGetStarted}>
            View Full Tutorial Guide
          </Button>
          <Button variant="default" className="flex-1" onClick={handleExploreCollections}>
            Start Exploring Collections
          </Button>
          <Button variant="secondary" className="flex-1" onClick={handleConnectWallet}>
            <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default TutorialVideo;
