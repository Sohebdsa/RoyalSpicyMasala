import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Navbar from './Navbar';
import './ScrollHero.css';

const ScrollHero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const currentFrameRef = useRef(0); // Ref to track current frame without dependencies

  // Mobile Slider State
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderPlaying, setIsSliderPlaying] = useState(true);

  const sliderImages = [
    '/Heroimg/frame2/ezgif-frame-001.png',
    '/Heroimg/frame2/ezgif-frame-048.png',
    '/Heroimg/frame2/ezgif-frame-096.png',
    '/Heroimg/frame2/ezgif-frame-144.png',
    '/Heroimg/frame2/ezgif-frame-190.png'
  ];

  // Animation control states
  const [autoPlayActive, setAutoPlayActive] = useState(false);
  const [playbackComplete, setPlaybackComplete] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [manualPlayActive, setManualPlayActive] = useState(false);
  const [scrollStartFrame, setScrollStartFrame] = useState(0); // Stable start frame for scroll mapping

  const manualPlayRef = useRef(false);
  const autoPlayRef = useRef(false);

  // Load all 192 frames sequentially
  const totalFrames = 192;

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Slider Auto-play
  useEffect(() => {
    let interval;
    if (isMobile && isSliderPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isMobile, isSliderPlaying]);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic frame mapping based on playback state
  // Uses stable scrollStartFrame instead of changing currentFrame to avoid infinite loops
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    playbackComplete ? [totalFrames - 1, 0] : [scrollStartFrame, totalFrames - 1]
  );

  // ... (Transformations kept matching original) ...

  const opacity1 = useTransform(scrollYProgress, [0, 0.15], playbackComplete ? [0, 0] : [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], playbackComplete ? [0, 0] : [0, -50]);

  // Keep ref in sync with state for event handlers
  useEffect(() => {
    currentFrameRef.current = currentFrame;
  }, [currentFrame]);

  // Preload all images (Only on desktop)
  useEffect(() => {
    if (isMobile) {
      setImagesLoaded(true); // Skip loading large sequence on mobile
      return;
    }

    // ... (Existing load logic) ...
    const loadImages = async () => {
      const imageArray = [];
      const loadPromises = [];

      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, '0');
        img.src = `/Heroimg/frame2/ezgif-frame-${frameNumber}.png`;

        const loadPromise = new Promise((resolve) => {
          img.onload = () => resolve(img);
          img.onerror = (error) => {
            console.error(`Failed to load frame ${frameNumber}:`, error);
            resolve(null);
          };
        });

        imageArray.push(img);
        loadPromises.push(loadPromise);
      }

      try {
        await Promise.all(loadPromises);
        setImages(imageArray);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [isMobile]);

  // ... (Rest of animation logic kept mostly same, but guarded by !isMobile check effectively via rendering) ...

  // Start auto-play when images are loaded
  useEffect(() => {
    if (imagesLoaded && !userHasInteracted && !isMobile) {
      setAutoPlayActive(true);
    }
  }, [imagesLoaded, userHasInteracted, isMobile]);

  const renderFrame = (index) => {
    if (!canvasRef.current || !images[index]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = images[index];

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, rect.width, rect.height);

    const imgAspect = img.width / img.height;
    const canvasAspect = rect.width / rect.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      drawHeight = rect.height;
      drawWidth = drawHeight * imgAspect;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = rect.width;
      drawHeight = drawWidth / imgAspect;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Sync refs
  useEffect(() => {
    manualPlayRef.current = manualPlayActive;
    autoPlayRef.current = autoPlayActive;
  }, [manualPlayActive, autoPlayActive]);

  // User interaction detection - stops auto-play
  useEffect(() => {
    const handleInteraction = () => {
      if (!userHasInteracted && !isMobile) {
        setScrollStartFrame(currentFrameRef.current);
        setUserHasInteracted(true);
        setAutoPlayActive(false);
      }
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [userHasInteracted, isMobile]);

  // Auto-play animation (1→192 at 24fps) - Only desktop
  useEffect(() => {
    if (!autoPlayActive || !imagesLoaded || isMobile) return;

    let animationId;
    let lastTime = 0;
    const fps = 24;

    const animate = (currentTime) => {
      if (!autoPlayRef.current) return;

      if (currentTime - lastTime >= 1000 / fps) {
        setCurrentFrame(prev => {
          if (prev >= totalFrames - 1) {
            setAutoPlayActive(false);
            setPlaybackComplete(true);
            return totalFrames - 1;
          }
          return prev + 1;
        });
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [autoPlayActive, imagesLoaded, totalFrames, isMobile]);

  // Manual play button animation - Only desktop
  useEffect(() => {
    if (!manualPlayActive || !imagesLoaded || isMobile) return;

    let animationId;
    let lastTime = 0;
    const fps = 24;

    const animate = (currentTime) => {
      if (!manualPlayRef.current) return;

      if (currentTime - lastTime >= 1000 / fps) {
        setCurrentFrame(prev => {
          if (prev >= totalFrames - 1) {
            setManualPlayActive(false);
            setPlaybackComplete(true);
            return totalFrames - 1;
          }
          return prev + 1;
        });
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [manualPlayActive, imagesLoaded, totalFrames, isMobile]);

  // Render frame when currentFrame changes during auto-play or manual play
  useEffect(() => {
    if ((autoPlayRef.current || manualPlayRef.current) && imagesLoaded && !isMobile) {
      renderFrame(currentFrame);
    }
  }, [currentFrame, imagesLoaded, isMobile]);

  // Scroll-based frame updates
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || isMobile) return;
    if (autoPlayActive || manualPlayActive) return;

    const unsubscribe = frameIndex.on('change', (latest) => {
      const index = Math.round(latest);
      if (images[index]) {
        setCurrentFrame(index);
        renderFrame(index);
      }
    });

    renderFrame(currentFrame);
    return () => unsubscribe();
  }, [imagesLoaded, frameIndex, images, autoPlayActive, manualPlayActive, playbackComplete, isMobile]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded && !isMobile) renderFrame(currentFrame);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, currentFrame, isMobile]);

  // Play button handler - always plays once from start
  const handlePlayClick = () => {
    setCurrentFrame(0);
    setPlaybackComplete(false);
    setUserHasInteracted(true);
    setScrollStartFrame(0);
    setAutoPlayActive(false);
    setManualPlayActive(true);
  };

  const handleSliderPlayPause = () => {
    setIsSliderPlaying(!isSliderPlaying);
  };

  return (
    <div ref={containerRef} className={`scroll-hero-container ${isMobile ? 'mobile-slider-mode' : ''}`} id="home">
      <Navbar />
      <div className="hero-section">

        {isMobile ? (
          // --- Mobile Slider View ---
          <div className="mobile-slider-container">
            <img
              // src={sliderImages[currentSlide]}
              src='/Heroimg/frame2/ezgif-frame-096.png'
              alt={`Slide ${currentSlide + 1}`}
              className="mobile-slider-image"
            />

            <div className="mobile-slider-controls">
              {/* <button className="slider-play-btn" onClick={handleSliderPlayPause}>
                {isSliderPlaying ? '❚❚' : '▶'}
              </button> */}

              <div className="slider-dots">
                {sliderImages.map((_, index) => (
                  <span
                    key={index}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // --- Desktop Canvas View ---
          <>
            {/* The Animated Canvas Background */}
            <canvas ref={canvasRef} className="hero-canvas" />

            {/* Loading Spinner */}
            {!imagesLoaded && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <p>Preparing your experience...</p>
              </div>
            )}

            {/* Content Overlay Layer */}
            <div className="scroll-content-layer">
              {/* ... Existing Text Animation Code commented out in original ... */}
            </div>

            {/* Play Button - Plays animation once from start */}
            <button
              className="play-btn"
              onClick={handlePlayClick}
              title="Play Animation (24fps)"
            >
              ▶
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default ScrollHero;