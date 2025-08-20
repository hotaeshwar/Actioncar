// First, import React hooks
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Import FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSprayCan,
  faWindowMaximize,
  faCertificate,
  faUserCheck,
  faShield,
  faTrophy,
  faCheck,
  faHandshake,
  faTag,
  faStar,
  faTools,
  faPlay,
  faPause,
  faArrowRight,
  faTimes,
  faThumbsUp,
  faPhone,
  faHammer
} from '@fortawesome/free-solid-svg-icons';

// Import images and videos
import car1 from '../assets/images/car1.jpg';
import car2 from '../assets/images/car2.jpg';
import car3 from '../assets/images/car3.jpg';
import car4 from '../assets/images/car4.jpg';
import car5 from '../assets/images/car5.jpg';
import wash1 from '../assets/images/wash1.png';
import wash2 from '../assets/images/wash2.png';
import awardLogo from '../assets/images/award png.png';
import blogBanner from '../assets/images/blog-banner.jpg';
import car6 from '../assets/images/car6.png';
import VideoCarousel from './VideoCarousel';
import beforeAfterImage from '../assets/images/before-and-after-dent-repair.png';

// Import new card images for "Your Vehicle Deserves The Best" section
import certifiedExpertsImg from '../assets/images/Certified Experts.png';
import keepingCustomersHappyImg from '../assets/images/Keeping Customers Happy.png';
import licensedInsuredImg from '../assets/images/Licensed and insured.png';
import professionalInstallationImg from '../assets/images/Professional Installation.png';
import qualityGuaranteeImg from '../assets/images/Quality Guarantee.png';

// Import insurance image for MPI card
import insuranceImg from '../assets/images/insurance.png';

// Import custom auto detailing assets
import autoDetailingVideo from '../assets/images/Auto Detailing final.mp4';
import autoDetailingImage from '../assets/images/autodetailing.png';

// Import custom paint correction assets
import paintCorrectionVideo from '../assets/images/PaintcorrectionHomepage.mp4';
import paintCorrectionImage from '../assets/images/paint correction polishing.png';
import BusinessDescription from './BusinessDescription'; // Adjust path as needed

// Import custom window tinting assets
import windowTintingVideo from '../assets/images/WindowtintHomepage.mp4';
import windowTintingImage from '../assets/images/windowtint.png';

// Import custom ceramic coating assets
import ceramicCoatingVideo from '../assets/images/CeramicCoatingHomepage.mp4';

// Import custom paint protection film assets
import paintProtectionVideo from '../assets/images/PPFHomepage.mp4';

// Import custom dent repair assets
import dentRepairVideo from '../assets/images/Dent Repair.mp4';
import dentRepairImage from '../assets/images/dent repair.png';

// Import videos - Updated to remove interior detailing and add new carousel video
import carwashing1 from '../assets/images/carwashing1.mp4';
import carwashing2 from '../assets/images/carwashing2.mp4';
import carwashing4 from '../assets/images/carwashing4.mp4';
import carouselVideo from '../assets/images/carasoulevideo.mp4';

// Import the new award icon - BIGGER VERSION
import awardHome from '../assets/images/Awardhome.png';

// Import ChooseYourService component
import ChooseYourService from './ChooseYourService';

// Custom Hook for Scroll Animations
// REPLACE the existing useScrollAnimation and AnimatedSection with this fixed version:

// Fixed Custom Hook for Scroll Animations - Move to component level
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.animateId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const registerElement = useCallback((element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  return { visibleElements, registerElement };
};

// Fixed Animated Section Wrapper Component - Uses shared animation context
const AnimatedSection = ({ children, animationId, delay = 0, className = "", visibleElements, registerElement }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (registerElement) {
      registerElement(elementRef.current);
    }
  }, [registerElement]);

  const isVisible = visibleElements ? visibleElements.has(animationId) : true;

  return (
    <div
      ref={elementRef}
      data-animate-id={animationId}
      className={`transition-all duration-1000 ease-out ${isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-95'
        } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
};
const Service = ({ setCurrentView }) => {
  // Scroll animation hook - ONLY DECLARE THIS ONCE
  const { visibleElements, registerElement } = useScrollAnimation();

  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);

  // Flip card state and modal state for small screens
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardModalRef = useRef(null);

  // Blue card modal state
  const [isBlueCardModalOpen, setIsBlueCardModalOpen] = useState(false);
  const [selectedBlueCard, setSelectedBlueCard] = useState(null);
  const blueCardModalRef = useRef(null);

  // Updated data arrays using imported assets
  const carImages = [car1, car2, car3, car4, car5];
  // UPDATED VIDEO ARRAY - Removed interior detailing (carwashing3) and added new carousel video
  const videos = [
    {
      src: carwashing2,
      title: "Complete Exterior and Interior Detailing",
      description: "Professional Detailing services"
    },
    {
      src: carouselVideo,
      title: "Ceramic Coating",
      description: "Long-lasting protection"
    },
    {
      src: carwashing4,
      title: "Professional Service",
      description: "Expert care for your vehicle"
    }
  ];

  // Updated card data with imported images for blue card design
  const blueCardData = [
    {
      id: 'licensed-insured',
      title: 'Licensed & Insured',
      description: 'We got it covered! Our company is fully licensed and insured with over 14 years experience in the service industry.',
      fullDescription: 'Our company is fully licensed and insured with over 14 years experience in the service industry. We maintain comprehensive coverage to protect both our customers and our team during all service operations.',
      image: licensedInsuredImg,
      tag: 'Premium Service',
      features: [
        'Comprehensive liability insurance coverage',
        'Licensed professionals with 14+ years experience',
        'Bonded and insured for customer protection',
        'Industry-certified operations'
      ]
    },
    {
      id: 'professional-installation',
      title: 'Professional Installation',
      description: 'Our experienced detailing and installation team has the knowledge and ability to provide superior service on any make and model.',
      fullDescription: 'Our experienced detailing and installation team has the knowledge and ability to provide superior service on any make and model. We use industry-leading techniques and tools to ensure perfect results every time.',
      image: professionalInstallationImg,
      tag: 'Premium Service',
      features: [
        'Expert installation on all vehicle makes and models',
        'Industry-leading techniques and equipment',
        'Precision workmanship guaranteed',
        'Ongoing professional training and certification'
      ]
    },
    {
      id: 'certified-experts',
      title: 'Certified Experts',
      description: 'All our installers have been extensively trained. We really believe in the quality of our work and our people.',
      fullDescription: 'All our installers have been extensively trained and certified in the latest automotive detailing and protection techniques. We really believe in the quality of our work and our people, which is why we invest heavily in ongoing education and training.',
      image: certifiedExpertsImg,
      tag: 'Premium Service',
      features: [
        'Extensively trained and certified technicians',
        'Ongoing education in latest techniques',
        'Quality-focused team culture',
        'Proven track record of excellence'
      ]
    },
    {
      id: 'quality-guarantee',
      title: 'Quality Guarantee',
      description: 'We guarantee our customers the best installation services and manufacture warranty options in the industry.',
      fullDescription: 'We guarantee our customers the best installation services and manufacture warranty options in the industry. Our commitment to quality means we stand behind every job with comprehensive warranties and satisfaction guarantees.',
      image: qualityGuaranteeImg,
      tag: 'Premium Service',
      features: [
        'Best-in-class installation warranties',
        'Comprehensive manufacturer guarantees',
        '100% satisfaction promise',
        'Quality workmanship backed by years of experience'
      ]
    },
    {
      id: 'keeping-customers-happy',
      title: 'Keeping Customers Happy',
      description: 'Our company is responsive, friendly, and provides timely, relevant information whenever our customers need it.',
      fullDescription: 'Our company is responsive, friendly, and provides timely, relevant information whenever our customers need it. We pride ourselves on exceptional customer service and building lasting relationships with every client.',
      image: keepingCustomersHappyImg,
      tag: 'Premium Service',
      features: [
        'Responsive customer service team',
        'Friendly and professional staff',
        'Timely communication and updates',
        'Customer satisfaction is our priority'
      ]
    }
  ];

  // Card data for Why Choose Us section - MADE SMALLER FOR MOBILE
  const cardData = {
    'card5': {
      frontTitle: 'Reputable Since 2011',
      icon: faThumbsUp,
      backTitle: 'Reputable Since 2011',
      backContent: 'Locally owned and operated serving Winnipeg with excellence for over a decade. Our commitment to quality has made us the trusted choice for thousands of satisfied customers.',
      features: [
        'Over 14 years of experience',
        'Thousands of satisfied customers',
        'Locally owned and operated',
        'Established reputation in Winnipeg'
      ]
    },
    'card6': {
      frontTitle: 'MPI Accredited',
      icon: faTrophy,
      customImage: insuranceImg,
      backTitle: 'MPI Accredited',
      backContent: 'Only Auto Detailing shop in Winnipeg accredited by MPI. This exclusive accreditation demonstrates our commitment to meeting the highest industry standards.',
      features: [
        'Exclusive MPI accreditation',
        'Meets highest industry standards',
        'Recognized quality and reliability',
        'Insurance approved services'
      ]
    },
    'card7': {
      frontTitle: 'Award Winning',
      icon: faStar,
      customImage: awardHome,
      backTitle: 'Award Winning',
      backContent: 'Winner of Consumer Choice Award 2025 in Auto Detailing Category. This prestigious award recognizes our outstanding service and customer satisfaction.',
      features: [
        'Consumer Choice Award 2025 winner',
        'Outstanding customer satisfaction',
        'Industry recognition',
        'Proven track record of excellence'
      ]
    },
    'card8': {
      frontTitle: 'Transparent Pricing',
      icon: faTag,
      backTitle: 'Transparent Pricing',
      backContent: 'Up front pricing with no hidden fees. One stop shop for all your auto detailing needs. We believe in honest, straightforward pricing you can trust.',
      features: [
        'No hidden fees or surprises',
        'Upfront transparent pricing',
        'Complete service packages',
        'One-stop shop convenience'
      ]
    }
  };

  // Section Divider Component with animation
  const SectionDivider = ({ animationId }) => (
    <AnimatedSection animationId={animationId} className="relative py-8 sm:py-12 md:py-16">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-4 sm:px-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );

  // Screen size state
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and device type on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setIsMobile(width < 1400);
      setIsMobileDevice(isMobile || width < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Flip card handler - IMPROVED TO PREVENT ACCIDENTAL MODAL OPENING DURING SCROLL
  const handleFlipCard = (cardId, isUserAction = true) => {
    if (!isUserAction) return;

    if (isMobile) {
      const cardInfo = cardData[cardId];
      if (cardInfo) {
        setSelectedCard(cardInfo);
        setIsCardModalOpen(true);
        document.body.style.overflow = 'hidden';
      }
    } else {
      setFlippedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(cardId)) {
          newSet.delete(cardId);
        } else {
          newSet.add(cardId);
        }
        return newSet;
      });
    }
  };

  // Blue card modal handlers
  const openBlueCardModal = (cardData, event) => {
    const isPremiumButtonClick = event?.target?.closest('.premium-button') !== null;

    if (isPremiumButtonClick) {
      const button = event.target.closest('.premium-button');
      if (button) {
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease';

        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 150);
      }

      setTimeout(() => {
        setSelectedBlueCard(cardData);
        setIsBlueCardModalOpen(true);
        document.body.style.overflow = 'hidden';
      }, 200);
    } else {
      setSelectedBlueCard(cardData);
      setIsBlueCardModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeBlueCardModal = () => {
    setIsBlueCardModalOpen(false);
    setSelectedBlueCard(null);
    document.body.style.overflow = 'auto';
  };

  // FIXED Card modal handlers - SIMPLE VERSION
  const closeCardModal = () => {
    console.log('closeCardModal called'); // Debug log
    setIsCardModalOpen(false);
    setSelectedCard(null);
    document.body.style.overflow = 'auto';
  };

  // Handlers
  const handlePlayPause = useCallback(() => {
    if (videoRefs.current[currentSlide]) {
      if (isPlaying) {
        videoRefs.current[currentSlide].pause();
      } else {
        videoRefs.current[currentSlide].play().catch(error => {
          console.log("Play failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [currentSlide, isPlaying]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsPlaying(true);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % videos.length);
  }, [currentSlide, videos.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + videos.length) % videos.length);
  }, [currentSlide, videos.length, goToSlide]);

  // SIMPLIFIED Click outside detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Blue card modal
      if (blueCardModalRef.current && !blueCardModalRef.current.contains(event.target) && event.target.classList.contains('blue-card-modal-backdrop')) {
        closeBlueCardModal();
      }
    };

    if (isBlueCardModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isBlueCardModalOpen]);

  // Close modals with escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (isBlueCardModalOpen) closeBlueCardModal();
        if (isCardModalOpen) closeCardModal();
      }
    };

    if (isCardModalOpen || isBlueCardModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isCardModalOpen, isBlueCardModalOpen]);

  // Listen for window resize to handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && (isCardModalOpen || isBlueCardModalOpen)) {
        closeCardModal();
        closeBlueCardModal();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isCardModalOpen, isBlueCardModalOpen]);

  // Effects - Optimized video management
  useEffect(() => {
    const interval = isMobileDevice ? 10000 : 8000;

    intervalRef.current = setInterval(() => {
      if (isPlaying) {
        nextSlide();
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, nextSlide, isMobileDevice]);

  // Optimized video loading and playback
  useEffect(() => {
    const playCurrentVideo = async () => {
      try {
        videoRefs.current.forEach((video, index) => {
          if (video && index !== currentSlide) {
            video.pause();
            video.currentTime = 0;
          }
        });

        const currentVideo = videoRefs.current[currentSlide];
        if (currentVideo) {
          if (isMobileDevice) {
            currentVideo.load();
            await new Promise(resolve => {
              currentVideo.addEventListener('loadeddata', resolve, { once: true });
              setTimeout(resolve, 2000);
            });
          }

          try {
            await currentVideo.play();
            setIsVideoLoaded(true);
          } catch (playError) {
            console.log("Video play failed, retrying:", playError);
            setTimeout(async () => {
              try {
                await currentVideo.play();
              } catch (retryError) {
                console.log("Video play retry failed:", retryError);
              }
            }, 500);
          }
        }
      } catch (error) {
        console.log("Video management error:", error);
      }
    };

    playCurrentVideo();
  }, [currentSlide, isMobileDevice]);

  // Blue Card Component - UPDATED TO MATCH ACTION CAR DETAILING CARD COLORS
  const renderBlueCard = (cardData, index = 0) => (
    <div className="group cursor-pointer w-full">
      <div
        onClick={(e) => openBlueCardModal(cardData, e)}
        className="relative bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 rounded-2xl sm:rounded-3xl shadow-2xl shadow-sky-500/30 group-hover:shadow-3xl group-hover:shadow-sky-600/40 overflow-hidden w-full aspect-square transition-all duration-500"
      >
        {/* Mirror shine effect like Action Car Detailing cards */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out skew-x-12"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-70"></div>

        {/* Decorative Circle - Top Right */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center opacity-80">
          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
        </div>

        {/* Decorative Small Circles */}
        <div className="absolute bottom-6 left-6 w-3 h-3 bg-white/40 rounded-full opacity-60"></div>
        <div className="absolute top-1/3 right-8 w-2 h-2 bg-white/30 rounded-full opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-white/25 rounded-full opacity-40"></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full justify-center text-center p-6">
          {/* Icon Section */}
          <div className="flex-shrink-0 flex justify-center pt-2">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl shadow-black/20 border border-white/30 group-hover:scale-110 transition-all duration-500">
              <img
                src={cardData.image}
                alt={cardData.title}
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                style={{ filter: 'brightness(0) invert(1)' }}
                onError={(e) => {
                  console.log(`Failed to load image: ${cardData.image}`);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Title Section */}
          <div className="flex-grow flex flex-col justify-center py-4">
            <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg leading-tight group-hover:scale-105 transition-transform duration-300">
              {cardData.title}
            </h3>
          </div>

          {/* Tag Section */}
          <div className="flex-shrink-0 pb-2">
            <div className="scale-90 group-hover:scale-100 transition-all duration-500 opacity-80 group-hover:opacity-100">
              <span className="inline-block px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-white text-sm border border-white/30 shadow-lg font-medium">
                {cardData.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Subtle Border Glow */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-white/25 transition-all duration-500"></div>
      </div>
    </div>
  );

  // Blue Cards Grid Section - EQUAL SIZED CARDS
  const BlueCardsSection = () => (
    <div className="pb-8 md:pb-12 lg:pb-16 xl:pb-20 relative overflow-hidden bg-white -mt-4 blue-cards-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          {/* Top Row - 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center place-items-center">
            {blueCardData.slice(0, 3).map((card, index) => (
              <div key={card.id || `blue-card-top-${index}`} className="w-full max-w-[280px] equal-card-size">
                {renderBlueCard(card, index)}
              </div>
            ))}
          </div>

          {/* Bottom Row - 2 Cards Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 justify-items-center place-items-center max-w-[600px] mx-auto">
            {blueCardData.slice(3, 5).map((card, index) => (
              <div key={card.id || `blue-card-bottom-${index}`} className="w-full max-w-[280px] equal-card-size">
                {renderBlueCard(card, index + 3)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Flip Card Component - IMPROVED TOUCH HANDLING TO PREVENT SCROLL INTERFERENCE
  const renderFlipCard = (id, frontTitle, iconOrComponent, backTitle, backContent, index = 0) => {
    const isFlipped = flippedCards.has(id);
    const icon = typeof iconOrComponent === 'object' && !React.isValidElement(iconOrComponent) ? iconOrComponent : faThumbsUp;

    const handleTouchStart = useRef({ x: 0, y: 0, time: 0 });
    const isTouchingRef = useRef(false);

    const handleTouchStartEvent = (e) => {
      const touch = e.touches[0];
      handleTouchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
      isTouchingRef.current = true;
    };

    const handleTouchEndEvent = (e) => {
      if (!isTouchingRef.current) return;

      const touch = e.changedTouches[0];
      const touchEnd = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };

      // Calculate movement distance and time
      const deltaX = Math.abs(touchEnd.x - handleTouchStart.current.x);
      const deltaY = Math.abs(touchEnd.y - handleTouchStart.current.y);
      const deltaTime = touchEnd.time - handleTouchStart.current.time;

      // Only trigger if:
      // 1. Touch was brief (less than 300ms)
      // 2. Movement was minimal (less than 10px in any direction)
      // 3. Not a scroll gesture
      const isQuickTap = deltaTime < 300;
      const isMinimalMovement = deltaX < 10 && deltaY < 10;
      const isNotVerticalScroll = deltaY < 30; // Allow some vertical tolerance but prevent scroll interference

      if (isQuickTap && isMinimalMovement && isNotVerticalScroll) {
        e.preventDefault();
        e.stopPropagation();
        handleFlipCard(id, true);
      }

      isTouchingRef.current = false;
    };

    const handleClick = (e) => {
      // Only handle click events on non-mobile or when not currently touching
      if (!isMobile || !isTouchingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        handleFlipCard(id, true);
      }
    };

    return (
      <AnimatedSection
        animationId={`flip-card-${index}`}
        delay={index * 120}
        className="flip-card-container group relative cursor-pointer touch-manipulation mobile-smaller-card"
        style={{
          perspective: '1000px',
          height: '18rem' // Reduced from 20rem to 18rem for mobile
        }}
      >
        <div
          onClick={handleClick}
          onTouchStart={handleTouchStartEvent}
          onTouchEnd={handleTouchEndEvent}
          className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-gpu ${isFlipped ? 'mobile-flip-card-flipped' : ''} ${!isMobile ? 'group-hover:rotate-y-180' : ''}`}
          style={{
            transformStyle: isMobile ? 'flat' : 'preserve-3d',
            height: '18rem' // Reduced height
          }}
        >
          {/* Front Side */}
          <div
            className="flip-card-front w-full h-full rounded-xl sm:rounded-2xl shadow-2xl shadow-sky-900/50 overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              height: '18rem', // Reduced height
              position: isMobile ? 'relative' : 'absolute'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 relative mirror-card">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out skew-x-12 mirror-shine"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-70"></div>
              <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mirror-reflection"></div>
              <div className="absolute bottom-0 right-0 w-1/4 h-2/3 bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>

              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full transition-opacity duration-300"></div>
                </div>

                <div className="mb-3 sm:mb-4"> {/* Reduced margin */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl shadow-black/30 border border-white/30 group-hover:scale-110 transition-all duration-300"> {/* Reduced icon sizes */}
                    {cardData[id]?.customImage ? (
                      <img
                        src={cardData[id].customImage}
                        alt={frontTitle}
                        className={`object-contain ${id === 'card7' ?
                          'w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20' : // Reduced award image size
                          'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16' // Reduced other image sizes
                          }`}
                        onError={(e) => {
                          console.log(`${frontTitle} image failed to load, using fallback icon`);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white" // Reduced icon sizes
                      />
                    )}
                    {cardData[id]?.customImage && (
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white" // Reduced icon sizes
                        style={{ display: 'none' }}
                      />
                    )}
                  </div>
                </div>

                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-cyan-400 mb-2 sm:mb-3 drop-shadow-lg leading-tight px-2 text-center"> {/* Reduced text sizes and margins */}
                  {frontTitle}
                </h3>

                <div className="flex items-center text-cyan-300/80 text-xs sm:text-sm group-hover:text-cyan-300 transition-all duration-300"> {/* Reduced text size */}
                  <span className="mr-2 font-medium">
                    {isMobile ? 'Tap' : 'Hover'} for details
                  </span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div
            className={`flip-card-back ${isMobile ? 'hidden' : 'hidden xl:block'} w-full h-full rounded-xl sm:rounded-2xl shadow-2xl shadow-sky-900/50 overflow-hidden`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              height: '18rem' // Reduced height
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 relative overflow-hidden mirror-card">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out skew-x-12 mirror-shine delay-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-70"></div>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>

              <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full -translate-y-10 sm:-translate-y-16 translate-x-10 sm:translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-sky-400/20 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>

              <div className="flex flex-col h-full justify-center items-center text-center relative z-10 p-6">
                <div className="mb-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-2xl shadow-black/40 border border-white/30 mirror-element">
                    {cardData[id]?.customImage ? (
                      <img
                        src={cardData[id].customImage}
                        alt={backTitle}
                        className="w-14 h-14 object-contain"
                        onError={(e) => {
                          console.log(`${backTitle} back image failed to load, using fallback icon`);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-2xl text-white"
                      />
                    )}
                    {cardData[id]?.customImage && (
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-2xl text-white"
                        style={{ display: 'none' }}
                      />
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-cyan-400 mb-3 drop-shadow-lg leading-tight px-2">
                  {backTitle}
                </h3>

                <p className="text-sm text-cyan-300/90 leading-relaxed drop-shadow-md px-2 max-w-sm text-center">
                  {backContent}
                </p>

                <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/20 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    );
  };

  // FIXED Card Modal Component - SIMPLE AND WORKING
  const CardModal = () => {
    if (!isCardModalOpen || !selectedCard) return null;

    const handleCloseModal = () => {
      console.log('CardModal close button clicked'); // Debug log
      closeCardModal();
    };

    const handleBackdropClick = (e) => {
      // Only close if clicking directly on backdrop
      if (e.target === e.currentTarget) {
        console.log('CardModal backdrop clicked'); // Debug log
        closeCardModal();
      }
    };

    const handleContentClick = (e) => {
      // Prevent clicks on modal content from closing modal
      e.stopPropagation();
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ display: isMobile ? 'flex' : 'none' }}
        onClick={handleBackdropClick}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

        <div
          ref={cardModalRef}
          className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 rounded-2xl shadow-3xl max-w-sm w-full mx-auto overflow-hidden transform transition-all duration-500 opacity-100 scale-100 border-2 border-white/20"
          style={{ maxHeight: '85vh', height: 'auto' }}
          onClick={handleContentClick}
        >
          <div className="relative p-6 text-center border-b border-white/20">
            {/* SIMPLE CLOSE BUTTON */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-50"
              style={{
                WebkitTapHighlightColor: 'transparent',
                minHeight: '48px',
                minWidth: '48px'
              }}
              aria-label="Close modal"
              type="button"
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-white text-xl"
              />
            </button>

            <h2 className="text-xl font-bold text-cyan-400 mb-2 drop-shadow-lg pt-4 pr-12">
              {selectedCard.backTitle}
            </h2>
          </div>

          <div className="p-6 overflow-y-auto" style={{ maxHeight: '60vh' }}>
            <p className="text-cyan-300/90 text-base leading-relaxed mb-6 drop-shadow-md">
              {selectedCard.backContent}
            </p>

            <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
              <div className="w-4 h-4 bg-white/30 rounded-full mr-3"></div>
              Key Benefits
            </h3>

            <ul className="space-y-3">
              {selectedCard.features.map((feature, index) => (
                <li key={index} className="flex items-start p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <FontAwesomeIcon icon={faCheck} className="text-white mt-1 mr-3 text-sm flex-shrink-0" />
                  <span className="text-cyan-300/90 text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-center">
                <div className="w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/20 rounded-full mx-auto mb-3"></div>
                <span className="text-cyan-300/80 text-sm font-medium">
                  Trusted by thousands of customers
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 p-4 bg-white/5">
            <button
              onClick={handleCloseModal}
              className="w-full py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 font-semibold backdrop-blur-sm border border-white/30"
              style={{
                WebkitTapHighlightColor: 'transparent',
                minHeight: '48px'
              }}
              type="button"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Blue Card Modal Component - UPDATED TO MATCH ACTION CAR DETAILING COLORS
  const BlueCardModal = () => {
    if (!isBlueCardModalOpen || !selectedBlueCard) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 blue-card-modal-backdrop">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

        <div
          ref={blueCardModalRef}
          className="relative bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 rounded-2xl shadow-3xl max-w-md w-full mx-auto overflow-hidden transform transition-all duration-500 opacity-100 scale-100 border-2 border-white/20"
          style={{ maxHeight: '90vh' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative p-6 text-center border-b border-white/20">
            <button
              onClick={closeBlueCardModal}
              className="absolute top-3 right-3 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
            </button>

            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 shadow-xl shadow-black/40 border border-white/30">
              <img
                src={selectedBlueCard.image}
                alt={selectedBlueCard.title}
                className="w-10 h-10 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
                onError={(e) => {
                  console.log(`Modal ${selectedBlueCard.title} image failed to load`);
                  e.target.style.display = 'none';
                }}
              />
            </div>

            <h2 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{selectedBlueCard.title}</h2>
          </div>

          <div className="p-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <p className="text-white/90 text-base leading-relaxed mb-6 drop-shadow-md">
              {selectedBlueCard.fullDescription}
            </p>

            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <div className="w-4 h-4 bg-white/30 rounded-full mr-3"></div>
              Key Features
            </h3>

            <ul className="space-y-3 mb-6">
              {selectedBlueCard.features.map((feature, index) => (
                <li key={index} className="flex items-start p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <FontAwesomeIcon icon={faCheck} className="text-white mt-1 mr-3 text-sm flex-shrink-0" />
                  <span className="text-white/90 text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-center">
                <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30 shadow-lg font-medium">
                  {selectedBlueCard.tag}
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/20 rounded-full mx-auto mt-3"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 p-4 bg-white/5">
            <button
              onClick={closeBlueCardModal}
              className="w-full py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 font-semibold backdrop-blur-sm border border-white/30"
            >
              Perfect!
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ChooseYourService Component - Added below hero section */}
      <ChooseYourService setCurrentView={setCurrentView} />

      {/* Section Divider */}
      <SectionDivider animationId="divider-1" />

      {/* FREE PAINT EVALUATION Banner */}
      <AnimatedSection
        animationId="paint-evaluation"
        className="relative py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-4 sm:mb-6">
            <span className="block text-sky-400 drop-shadow-2xl">FREE PAINT EVALUATION</span>
            <span className="block text-sky-400 drop-shadow-2xl">
              & ESTIMATE
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-cyan-400 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
            Professional assessment of your vehicle's paint condition - absolutely free!
          </p>
        </div>
      </AnimatedSection>

      {/* Section Divider */}
      <SectionDivider animationId="divider-2" />

      {/* PERFECT SOLUTIONS FOR ALL VEHICLES Section */}
      <AnimatedSection
        animationId="perfect-solutions"
        className="py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection
            animationId="perfect-solutions-title"
            className="text-center mb-8 sm:mb-10 lg:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative">
              <span className="relative z-10 text-sky-400 drop-shadow-2xl">
                PERFECT SOLUTIONS
              </span>
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 lg:w-48 h-1 sm:h-2 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-full shadow-xl shadow-sky-500/50"></div>
            </h2>
            <p className="text-xl sm:text-2xl text-cyan-400 max-w-3xl mx-auto leading-relaxed">
              FOR ALL VEHICLES
            </p>
          </AnimatedSection>

          {/* Video Slider */}
          <AnimatedSection
            animationId="video-slider"
            delay={200}
            className="relative max-w-6xl mx-auto rounded-3xl shadow-3xl shadow-black/50 overflow-hidden border-4 border-white/20"
          >
            <div className="relative aspect-video bg-black">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={video.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload={index === 0 ? "auto" : isMobileDevice ? "none" : "metadata"}
                    poster={index === currentSlide ? undefined : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"}
                    onLoadedData={() => {
                      if (index === currentSlide) {
                        setIsVideoLoaded(true);
                      }
                    }}
                    onError={(e) => {
                      console.log(`Video ${index} error:`, e);
                    }}
                    onWaiting={() => {
                      console.log(`Video ${index} buffering...`);
                    }}
                    onCanPlay={() => {
                      if (index === currentSlide) {
                        console.log(`Video ${index} can play`);
                      }
                    }}
                    style={{
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-end justify-center p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="w-full text-center">
                      <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2 drop-shadow-lg leading-tight">
                        {video.title}
                      </h3>
                      <p className="text-cyan-300/90 text-sm sm:text-lg md:text-xl drop-shadow-md leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {isMobileDevice && !isVideoLoaded && index === currentSlide && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md hover:scale-110 z-20 group"
              aria-label="Previous video"
            >
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md hover:scale-110 z-20 group"
              aria-label="Next video"
            >
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={handlePlayPause}
              className="absolute top-4 left-4 w-5 h-5 sm:w-6 sm:h-6 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md hover:scale-110 z-20 group"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} className="text-white text-xs group-hover:text-cyan-400 transition-colors duration-300" style={{ fontSize: '8px' }} />
              ) : (
                <FontAwesomeIcon icon={faPlay} className="text-white text-xs group-hover:text-cyan-400 transition-colors duration-300 ml-0.5" style={{ fontSize: '8px' }} />
              )}
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${currentSlide === index
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                    }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Section Divider */}
      <SectionDivider animationId="divider-3" />

      {/* QUALITY SERVICE & YOUR VEHICLE DESERVES THE BEST - Combined Section */}
      <AnimatedSection
        animationId="quality-service-combined"
        className="py-4 md:py-6 lg:py-8 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 sm:mb-4 tracking-wider">
            <span className="text-sky-400 drop-shadow-2xl">
              QUALITY SERVICE
            </span>
          </h2>

          <div className="mb-8 sm:mb-10 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1">
              <span className="text-sky-400 drop-shadow-2xl">
                YOUR VEHICLE DESERVES
              </span>
            </h3>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-sky-400 drop-shadow-2xl relative inline-block">
              THE BEST
              <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 lg:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-full shadow-xl shadow-sky-500/50"></div>
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Blue Cards Grid */}
      <BlueCardsSection />

      {/* Section Divider */}
      <SectionDivider animationId="divider-4" />

      {/* WHY CHOOSE ACTION CAR DETAILING Section */}
      <AnimatedSection
        animationId="why-choose"
        className="py-8 md:py-12 lg:py-16 xl:py-20 relative bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection
            animationId="why-choose-title"
            className="text-center mb-8 sm:mb-10 lg:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative">
              <span className="relative z-10 text-sky-400 drop-shadow-2xl">
                ACTION CAR DETAILING
              </span>
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 lg:w-48 h-1 sm:h-2 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-full shadow-xl shadow-sky-500/50"></div>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {Object.entries(cardData).map(([cardId, data], index) => (
              <div key={cardId}>
                {renderFlipCard(cardId, data.frontTitle, data.icon, data.backTitle, data.backContent, index)}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Modals */}
      <BusinessDescription setCurrentView={setCurrentView} />
      <CardModal />
      <BlueCardModal />

      {/* CSS Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes mirrorShine {
          0% { transform: translateX(-100%) skewX(12deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%) skewX(12deg); opacity: 0; }
        }
        
        @keyframes mirrorReflection {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        .mirror-card {
          position: relative;
          overflow: hidden;
        }
        
        .mirror-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%) skewX(12deg);
          transition: transform 1.5s ease-in-out;
        }
        
        .group:hover .mirror-shine {
          transform: translateX(200%) skewX(12deg);
        }
        
        .mirror-reflection {
          position: absolute;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
          opacity: 0;
          transition: all 0.7s ease-in-out;
        }
        
        .group:hover .mirror-reflection {
          opacity: 1;
          animation: mirrorReflection 2s ease-in-out;
        }
        
        .mirror-element {
          position: relative;
          overflow: hidden;
        }
        
        .mirror-element::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transition: left 1s ease-in-out;
          z-index: 10;
        }
        
        .group:hover .mirror-element::before {
          left: 100%;
        }
        
        .mirror-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            rgba(255,255,255,0.1) 0%, 
            transparent 25%, 
            transparent 50%, 
            rgba(255,255,255,0.05) 75%, 
            transparent 100%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        
        .group:hover .mirror-card::after {
          opacity: 1;
        }

        .mobile-flip-card-flipped {
          transform: rotateY(180deg) !important;
        }
        
        /* UPDATED MOBILE CARD SIZING - SMALLER FOR BETTER SCROLLING */
        .mobile-smaller-card {
          height: 16rem !important; /* Reduced from 18rem to 16rem for mobile */
          min-height: 16rem !important;
          max-height: 16rem !important;
        }
        
        .flip-card-container {
          height: 18rem !important; /* Default desktop size */
          min-height: 18rem !important;
          max-height: 18rem !important;
          display: block;
        }
        
        /* Mobile-specific smaller sizing */
        @media (max-width: 640px) {
          .mobile-smaller-card {
            height: 15rem !important; /* Even smaller on very small screens */
            min-height: 15rem !important;
            max-height: 15rem !important;
          }
          
          .flip-card-inner,
          .flip-card-front,
          .flip-card-back {
            height: 15rem !important;
            min-height: 15rem !important;
            max-height: 15rem !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .mobile-smaller-card {
            height: 17rem !important; /* Medium screens */
            min-height: 17rem !important;
            max-height: 17rem !important;
          }
          
          .flip-card-inner,
          .flip-card-front,
          .flip-card-back {
            height: 17rem !important;
            min-height: 17rem !important;
            max-height: 17rem !important;
          }
        }
        
        .flip-card-inner {
          width: 100%;
          height: 18rem !important; /* Default */
          min-height: 18rem !important;
          max-height: 18rem !important;
          position: relative;
        }
        
        .flip-card-front,
        .flip-card-back {
          width: 100%;
          height: 18rem !important; /* Default */
          min-height: 18rem !important;
          max-height: 18rem !important;
          border-radius: 0.75rem;
        }

        .blue-cards-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* EQUAL CARD SIZING FOR ALL BLUE CARDS */
        .equal-card-size {
          width: 100% !important;
          max-width: 280px !important;
          min-width: 200px !important;
        }

        .blue-cards-container .aspect-square {
          aspect-ratio: 1 / 1 !important;
          width: 100% !important;
          height: auto !important;
        }

        /* RESPONSIVE CARD SIZING */
        @media (max-width: 640px) {
          .equal-card-size {
            max-width: 260px !important;
            min-width: 180px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .equal-card-size {
            max-width: 240px !important;
            min-width: 200px !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .equal-card-size {
            max-width: 260px !important;
            min-width: 220px !important;
          }
        }

        @media (min-width: 1025px) {
          .equal-card-size {
            max-width: 280px !important;
            min-width: 240px !important;
          }
        }

        @media (max-width: 1399px) {
          .flip-card-container {
            height: 18rem !important;
            min-height: 18rem !important;
            max-height: 18rem !important;
          }
          
          .flip-card-inner {
            transform-style: flat !important;
            height: 18rem !important;
            min-height: 18rem !important;
            max-height: 18rem !important;
          }
          
          .flip-card-front {
            position: relative !important;
            display: block !important;
            height: 18rem !important;
            min-height: 18rem !important;
            max-height: 18rem !important;
          }
          
          .flip-card-back {
            display: none !important;
          }
        }

        @media (min-width: 1400px) {
          .flip-card-inner {
            transform-style: preserve-3d !important;
          }
          
          .flip-card-front {
            position: absolute !important;
          }
          
          .flip-card-back {
            display: block !important;
            position: absolute !important;
          }
          
          .group:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
        }

        button:active {
          transform: scale(0.95);
        }
        
        button:disabled:active {
          transform: none;
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (prefers-contrast: high) {
          .flip-card-container,
          .blue-cards-container .group {
            border: 2px solid;
          }
          
          .modal-close-btn {
            border: 2px solid;
          }
        }

        @media print {
          .modal-backdrop,
          .card-modal-backdrop,
          .blue-card-modal-backdrop {
            display: none !important;
          }
          
          .flip-card-back {
            display: block !important;
            position: static !important;
            transform: none !important;
          }
          
          .flip-card-front {
            display: none !important;
          }
        }

        .flip-card-container:focus-within {
          outline: 2px solid #0ea5e9;
          outline-offset: 4px;
          border-radius: 1rem;
        }
        
        .blue-cards-container .group:focus-within {
          outline: 2px solid #ffffff;
          outline-offset: 4px;
          border-radius: 1rem;
        }

        .modal-backdrop,
        .card-modal-backdrop,
        .blue-card-modal-backdrop {
          backdrop-filter: blur(8px) saturate(180%);
          -webkit-backdrop-filter: blur(8px) saturate(180%);
        }

        .flip-card-container:hover {
          z-index: 10;
        }
        
        .blue-cards-container .group:hover {
          z-index: 10;
        }

        .modal-content-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        .mirror-card,
        .mirror-element,
        .mirror-shine,
        .mirror-reflection {
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .mirror-shine,
          .mirror-reflection,
          .mirror-element::before {
            animation: none !important;
            transition: none !important;
          }
          
          .mobile-flip-card-flipped,
          .group:hover [class*="rotate"],
          .group:hover [class*="scale"],
          .group:hover [class*="translate"] {
            transition: none !important;
            animation: none !important;
          }
          
          * {
            transition: none !important;
            animation: none !important;
          }
        }

        @media (hover: none) and (pointer: coarse) {
          .group:hover .mirror-shine {
            transform: translateX(200%) skewX(12deg);
          }
          
          .cursor-pointer.touch-manipulation {
            min-height: 44px;
            min-width: 44px;
          }
        }

        .cursor-pointer:focus-visible {
          outline: 2px solid #0ea5e9;
          outline-offset: 2px;
          border-radius: 0.5rem;
        }
        
        button:focus-visible {
          outline: 2px solid #0ea5e9;
          outline-offset: 2px;
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-stagger-1 { transition-delay: 100ms; }
        .scroll-stagger-2 { transition-delay: 200ms; }
        .scroll-stagger-3 { transition-delay: 300ms; }
        .scroll-stagger-4 { transition-delay: 400ms; }
        .scroll-stagger-5 { transition-delay: 500ms; }
        .scroll-stagger-6 { transition-delay: 600ms; }

        .section-spacing {
          padding-top: clamp(2rem, 5vw, 4rem);
          padding-bottom: clamp(2rem, 5vw, 4rem);
        }
        
        .section-spacing-large {
          padding-top: clamp(3rem, 8vw, 6rem);
          padding-bottom: clamp(3rem, 8vw, 6rem);
        }
        
        .section-spacing-small {
          padding-top: clamp(1rem, 3vw, 2rem);
          padding-bottom: clamp(1rem, 3vw, 2rem);
        }

        .transition-smooth {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .transition-smooth-slow {
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .grid-enhanced {
          gap: clamp(1rem, 4vw, 2.5rem);
        }
        
        @media (min-width: 640px) {
          .grid-enhanced {
            gap: clamp(1.5rem, 4vw, 3rem);
          }
        }
        
        @media (min-width: 1024px) {
          .grid-enhanced {
            gap: clamp(2rem, 4vw, 3.5rem);
          }
        }

        .gpu-accelerated {
          transform: translateZ(0);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        
        @media (max-width: 768px) {
          .section-spacing {
            padding-top: clamp(1.5rem, 4vw, 3rem);
            padding-bottom: clamp(1.5rem, 4vw, 3rem);
          }
          
          .section-spacing-large {
            padding-top: clamp(2rem, 6vw, 4rem);
            padding-bottom: clamp(2rem, 6vw, 4rem);
          }
        }

        /* ADDITIONAL MOBILE OPTIMIZATIONS FOR BETTER SCROLLING */
        @media (max-width: 640px) {
          .py-8 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
          .md\\:py-12 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
          .lg\\:py-16 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
          .xl\\:py-20 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
          
          .gap-6 { gap: 1rem; }
          .sm\\:gap-8 { gap: 1rem; }
          .lg\\:gap-10 { gap: 1rem; }
          
          .mb-8 { margin-bottom: 1.5rem; }
          .sm\\:mb-10 { margin-bottom: 1.5rem; }
          .lg\\:mb-16 { margin-bottom: 1.5rem; }
        }
      `}</style>
    </>
  );
};

export default Service;