import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import './ScrollHero.css';

const ScrollHero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Available frames based on actual files in public/Heroimg/
  const availableFrames = [
    ...Array.from({ length: 103 }, (_, i) => i + 1),  // 1-103
    ...Array.from({ length: 5 }, (_, i) => i + 109),   // 109-113
    ...Array.from({ length: 63 }, (_, i) => i + 130)   // 130-192
  ];

  const totalFrames = availableFrames.length;

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imageArray = [];
      const loadPromises = [];

      for (let i = 0; i < availableFrames.length; i++) {
        const img = new Image();
        const frameNumber = String(availableFrames[i]).padStart(3, '0');
        img.src = `/Heroimg/frame2/ezgif-frame-${frameNumber}.png`;

        const loadPromise = new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = (error) => {
            console.error(`Failed to load frame ${frameNumber}:`, error);
            reject(error);
          };
        });

        imageArray.push(img);
        loadPromises.push(loadPromise);
      }

      try {
        await Promise.all(loadPromises);
        setImages(imageArray);
        setImagesLoaded(true);
        console.log('All images loaded successfully!');
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  // Update canvas when frame changes
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const unsubscribe = frameIndex.on('change', (latest) => {
      const index = Math.round(latest);
      setCurrentFrame(index);
      renderFrame(index);
    });

    // Render initial frame
    renderFrame(0);

    return () => unsubscribe();
  }, [imagesLoaded, frameIndex]);

  // Render frame to canvas
  const renderFrame = (index) => {
    if (!canvasRef.current || !images[index]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = images[index];

    // Set canvas size to match viewport exactly
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Calculate scaling to cover entire viewport (like CSS object-fit: cover)
    const imgAspect = img.width / img.height;
    const canvasAspect = rect.width / rect.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      // Image is wider - fit to height and crop sides
      drawHeight = rect.height;
      drawWidth = drawHeight * imgAspect;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Image is taller - fit to width and crop top/bottom
      drawWidth = rect.width;
      drawHeight = drawWidth / imgAspect;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    }

    // Draw image to fill entire canvas
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded) {
        renderFrame(currentFrame);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, currentFrame]);

  return (
    <>
      <div ref={containerRef} className="scroll-hero-container" id="home">
        <div className="hero-section">
          <canvas
            ref={canvasRef}
            className="hero-canvas"
          />

          {!imagesLoaded && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Loading cinematic experience...</p>
            </div>
          )}

          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Royal Spicy Masala
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Grains of Truth, Spices of Life
            </motion.p>
          </div>

          {/* {imagesLoaded && (
            <div className="scroll-indicator">
              <div className="scroll-progress">
                Frame {currentFrame + 1} / {totalFrames}
              </div>
            </div>
          )} */}

        </div>
      </div>

    </>
  );
};

export default ScrollHero;
