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

  // Mobile Detection
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Image Loading State
  const [mobileImageLoaded, setMobileImageLoaded] = useState(false);
  const [mobileImageError, setMobileImageError] = useState(false);


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

  // Progressive image loading with priority (skip on mobile)
  useEffect(() => {
    if (isMobile) {
      setImagesLoaded(true); // Skip loading frames on mobile
      return;
    }

    const loadImages = async () => {
      const imageArray = new Array(totalFrames);

      // Define key frames to load first (first, last, and evenly distributed frames)
      const keyFrames = [
        1, // First frame
        Math.floor(totalFrames * 0.25), // 25%
        Math.floor(totalFrames * 0.5),  // 50%
        Math.floor(totalFrames * 0.75), // 75%
        totalFrames // Last frame
      ];

      // Load key frames first for immediate playback
      const loadFrame = (frameIndex) => {
        return new Promise((resolve) => {
          const img = new Image();
          const frameNumber = String(frameIndex).padStart(3, '0');

          // Add decoding optimization
          img.decoding = 'async';
          img.src = `/webpHero/ezgif-frame-${frameNumber}.webp`;

          img.onload = () => {
            imageArray[frameIndex - 1] = img;
            resolve(img);
          };
          img.onerror = (error) => {
            console.error(`Failed to load frame ${frameNumber}:`, error);
            resolve(null);
          };
        });
      };

      try {
        // Phase 1: Load key frames first
        await Promise.all(keyFrames.map(loadFrame));

        // Set images loaded early so animation can start
        setImages([...imageArray]);
        setImagesLoaded(true);

        // Phase 2: Load remaining frames in background
        const remainingFrames = [];
        for (let i = 1; i <= totalFrames; i++) {
          if (!keyFrames.includes(i)) {
            remainingFrames.push(i);
          }
        }

        // Load in batches to avoid overwhelming the browser
        const batchSize = 10;
        for (let i = 0; i < remainingFrames.length; i += batchSize) {
          const batch = remainingFrames.slice(i, i + batchSize);
          await Promise.all(batch.map(loadFrame));

          // Update images array after each batch
          setImages([...imageArray]);
        }

      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [isMobile, totalFrames]);

  // ... (Rest of animation logic kept mostly same, but guarded by !isMobile check effectively via rendering) ...

  // Start auto-play when images are loaded (desktop only)
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

  // User interaction detection - stops auto-play (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleInteraction = () => {
      if (!userHasInteracted) {
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

  // Auto-play animation (1→192 at 24fps) - Desktop only
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

  // Manual play button animation - Desktop only
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

  // Scroll-based frame updates - Desktop only
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

  // Handle Resize - Desktop only
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



  return (
    <div ref={containerRef} className="scroll-hero-container" id="home">
      <Navbar />
      <div className="hero-section">
        {isMobile ? (
          // Mobile View - Static Hero Image with Loader
          <div className="mobile-hero-container">
            {/* Loading Overlay - Shows while image is loading */}
            {!mobileImageLoaded && !mobileImageError && (
              <div className="mobile-loading-overlay">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
              </div>
            )}

            {/* Error State - Shows if image fails to load */}
            {mobileImageError && (
              <div className="mobile-error-overlay">
                <p>Failed to load image</p>
                <button 
                  className="retry-btn"
                  onClick={() => {
                    setMobileImageError(false);
                    setMobileImageLoaded(false);
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Hero Image - Hidden until loaded to prevent partial loading display */}
            <img
              src="https://res.cloudinary.com/datkxm0yf/image/upload/v1771319032/h1_tcy2gz.webp"
              alt="Royal Spicy Masala Hero"
              className={`mobile-hero-image ${mobileImageLoaded ? 'loaded' : 'loading'}`}
              loading="eager"
              onLoad={() => setMobileImageLoaded(true)}
              onError={() => setMobileImageError(true)}
              style={{ opacity: mobileImageLoaded ? 1 : 0 }}
            />

            {/* Brand Overlay - Always visible on top */}
            <div className="mobile-hero-brand">
              <h1 className="mobile-brand-heading">Royal Spicy</h1>
              <h1 className="mobile-brand-heading-2">Masala</h1>
              <p className="mobile-brand-tagline">Authentic Flavors, Premium Quality</p>
            </div>
          </div>
        ) : (
          // Desktop View - Canvas Animation
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