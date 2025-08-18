import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// Import images directly
import interior from '../assets/images/interior .JPG';
import mitsRV from '../assets/images/Mits. RV.JPG';
import mitsRVR3 from '../assets/images/Mits. RVR 3.JPG';
import mitsRVR4 from '../assets/images/Mits. RVR 4.JPG';
import mitsRVR from '../assets/images/Mits. RVR.jpg';
import toyota4Runner from '../assets/images/Toyota 4 Runner .JPG';
import toyota4Runner1 from '../assets/images/Toyota 4 Runner 1.JPG';
import toyotaHighlander from '../assets/images/Toyota Highlander.JPG';
import toyotaTundra2 from '../assets/images/Toyota Tundra. 2.JPG';
import toyotaTundra from '../assets/images/Toyota Tundra.JPG';

const CardSliderCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);
  const intervalRef = useRef(null);

  // Photo data with imported images
  const photos = [
    {
      src: interior,
      title: "Interior Detailing",
      description: "Professional interior cleaning and protection services for all vehicle types"
    },
    {
      src: mitsRV,
      title: "Mitsubishi RV Detailing",
      description: "Complete exterior detailing service with premium protection"
    },
    {
      src: mitsRVR3,
      title: "Mitsubishi RVR Premium",
      description: "Full detail and protection package with ceramic coating"
    },
    {
      src: mitsRVR4,
      title: "Mitsubishi RVR Finishing",
      description: "Final detailing touches and quality inspection"
    },
    {
      src: mitsRVR,
      title: "Mitsubishi RVR Complete",
      description: "Comprehensive detailing with lasting protection"
    },
    {
      src: toyota4Runner,
      title: "Toyota 4Runner Detailing",
      description: "SUV specialized detailing with off-road protection"
    },
    {
      src: toyota4Runner1,
      title: "Toyota 4Runner Premium",
      description: "Advanced protection and showroom shine finish"
    },
    {
      src: toyotaHighlander,
      title: "Toyota Highlander Service",
      description: "Family vehicle detailing with child-safe products"
    },
    {
      src: toyotaTundra2,
      title: "Toyota Tundra Professional",
      description: "Heavy-duty truck detailing and protection services"
    },
    {
      src: toyotaTundra,
      title: "Toyota Tundra Complete",
      description: "Full truck detailing with durable coating protection"
    }
  ];

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Calculate max slides
  const maxSlides = Math.max(0, photos.length - cardsPerView);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    setCurrentSlide(Math.min(index, maxSlides));
  }, [maxSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide >= maxSlides ? 0 : prevSlide + 1));
  }, [maxSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide <= 0 ? maxSlides : prevSlide - 1));
  }, [maxSlides]);

  // Auto-advance slides
  useEffect(() => {
    if (isAutoPlay && photos.length > cardsPerView) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, nextSlide, photos.length, cardsPerView]);

  // Handle auto-play toggle
  const handleAutoPlayToggle = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        handleAutoPlayToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">


        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {photos.length > cardsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20
                           w-12 h-12 bg-white shadow-lg hover:shadow-xl
                           rounded-full flex items-center justify-center
                           border border-gray-200 hover:border-[#1393c4]
                           transition-all duration-300 hover:scale-110
                           focus:outline-none focus:ring-2 focus:ring-[#1393c4]"
                aria-label="Previous slides"
              >
                <ChevronLeft className="w-6 h-6 text-[#1393c4]" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20
                           w-12 h-12 bg-white shadow-lg hover:shadow-xl
                           rounded-full flex items-center justify-center
                           border border-gray-200 hover:border-[#1393c4]
                           transition-all duration-300 hover:scale-110
                           focus:outline-none focus:ring-2 focus:ring-[#1393c4]"
                aria-label="Next slides"
              >
                <ChevronRight className="w-6 h-6 text-[#1393c4]" />
              </button>

              {/* Auto-play Toggle */}
              <button
                onClick={handleAutoPlayToggle}
                className="absolute top-0 right-0 z-20
                           w-10 h-10 bg-white/90 hover:bg-white
                           rounded-full flex items-center justify-center
                           border border-gray-200 hover:border-[#1393c4]
                           transition-all duration-300 hover:scale-110
                           focus:outline-none focus:ring-2 focus:ring-[#1393c4]"
                aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
              >
                {isAutoPlay ? (
                  <Pause className="w-4 h-4 text-[#1393c4]" />
                ) : (
                  <Play className="w-4 h-4 text-[#1393c4] ml-0.5" />
                )}
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`
              }}
            >
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          {photos.length > cardsPerView && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:ring-offset-2 ${
                    currentSlide === index
                      ? 'w-8 h-3 bg-[#1393c4]'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Counter */}
          {photos.length > cardsPerView && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                {currentSlide + 1} of {maxSlides + 1}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Hint */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Use arrow keys to navigate • Space to pause/play
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardSliderCarousel;