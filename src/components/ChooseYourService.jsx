import React, { useState, useEffect, useRef } from 'react';

// Import FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSprayCan,
  faCheck,
  faArrowRight,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Import images and videos
import car1 from '../assets/images/car1.jpg';
import car3 from '../assets/images/car3.jpg';
import car4 from '../assets/images/car4.jpg';
import wash1 from '../assets/images/wash1.png';
import wash2 from '../assets/images/wash2.png';
import beforeAfterImage from '../assets/images/before-and-after-dent-repair.png';

// Import custom auto detailing assets
import autoDetailingVideo from '../assets/images/Auto detailing Service page.mp4';
import autoDetailingImage from '../assets/images/autodetailing.png';

// Import custom paint correction assets
import paintCorrectionVideo from '../assets/images/Paint Correction Polishing (1).mp4';
import paintCorrectionImage from '../assets/images/paint correction polishing.png';

// Import custom window tinting assets
import windowTintingVideo from '../assets/images/WindowtintHomepage.mp4';
import windowTintingImage from '../assets/images/windowtint.png';

// Import custom ceramic coating assets
import ceramicCoatingVideo from '../assets/images/Ceramic Coating Home page.mp4';

// Import custom paint protection film assets
import paintProtectionVideo from '../assets/images/PPF Home page.mp4';

// Import custom dent repair assets
import dentRepairVideo from '../assets/images/Dent Repair.mp4';
import dentRepairImage from '../assets/images/dent repair.png';

const ChooseYourService = ({ setCurrentView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const videoRef = useRef(null);

  // Check screen size and setup video handling like Hero component
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isIPad = (
        (width === 768) || (width === 820) || (width === 834) || (width === 1024) ||
        navigator.userAgent.includes('iPad') || 
        (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document)
      );
      setIsSmallScreen(width < 768 && !isIPad);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Video setup effect for modal videos
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      const video = videoRef.current;
      
      // Essential settings for smooth playback (from Hero)
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      
      // Performance optimizations (from Hero)
      video.preload = 'auto';
      video.poster = '';
      video.loading = 'eager';
      video.crossOrigin = 'anonymous';
      
      // Force browser optimization (from Hero)
      video.style.willChange = 'auto';
      video.style.backfaceVisibility = 'hidden';
      video.style.perspective = '1000px';
      video.style.transformStyle = 'preserve-3d';
      
      // iPad-specific video adjustments (from Hero)
      const adjustVideoFit = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Detect iPad devices
        const isIPad = (
          (width === 768 && height === 1024) ||
          (width === 820 && height === 1180) ||
          (width === 834 && height === 1194) ||
          (width === 1024 && height === 1366) ||
          (height === 768 && width === 1024) ||
          (height === 820 && width === 1180) ||
          (height === 834 && width === 1194) ||
          (height === 1024 && width === 1366) ||
          (navigator.userAgent.includes('iPad') || 
           (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document))
        );
        
        // Calculate aspect ratios
        const screenRatio = width / height;
        const videoRatio = 16 / 9;
        
        // Base styles for all devices
        video.style.objectFit = 'cover';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.transform = 'translateZ(0)';
        
        // iPad-specific positioning
        if (isIPad) {
          video.style.objectPosition = 'center center';
          video.style.minWidth = '100%';
          video.style.minHeight = '100%';
        }
        // Other devices
        else if (screenRatio > videoRatio) {
          video.style.objectPosition = 'center center';
        } else {
          video.style.objectPosition = 'center 40%';
        }
      };
      
      adjustVideoFit();
      
      // Force video load and play (from Hero)
      const forceVideoLoad = () => {
        return new Promise((resolve) => {
          if (video.readyState === 4) {
            resolve();
            return;
          }
          
          const checkLoad = () => {
            if (video.readyState === 4) {
              resolve();
            } else {
              setTimeout(checkLoad, 50);
            }
          };
          
          video.addEventListener('canplaythrough', resolve, { once: true });
          video.addEventListener('loadeddata', checkLoad, { once: true });
          
          video.load();
        });
      };
      
      const playVideo = async () => {
        try {
          await forceVideoLoad();
          await new Promise(resolve => setTimeout(resolve, 200));
          await video.play();
        } catch (error) {
          console.log('Initial autoplay failed, setting up user interaction');
          
          const enableVideo = async () => {
            try {
              await forceVideoLoad();
              await video.play();
              document.removeEventListener('click', enableVideo);
              document.removeEventListener('touchstart', enableVideo);
              document.removeEventListener('scroll', enableVideo);
            } catch (err) {
              console.log('Video play failed:', err);
            }
          };
          
          document.addEventListener('click', enableVideo, { once: true });
          document.addEventListener('touchstart', enableVideo, { once: true });
          document.addEventListener('scroll', enableVideo, { once: true });
        }
      };
      
      setTimeout(playVideo, 1000);
    }
  }, [isModalOpen, selectedService]);

  // Get container height function (from Hero)
  const getVideoContainerHeight = () => {
    if (typeof window === 'undefined') return '320px'; // Default for modal
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Detect iPad devices
    const isIPad = (
      (width === 768 && height === 1024) ||
      (width === 820 && height === 1180) ||
      (width === 834 && height === 1194) ||
      (width === 1024 && height === 1366) ||
      (height === 768 && width === 1024) ||
      (height === 820 && width === 1180) ||
      (height === 834 && width === 1194) ||
      (height === 1024 && width === 1366) ||
      (navigator.userAgent.includes('iPad') || 
       (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document))
    );
    
    // Mobile phones (portrait)
    if (width < 768) {
      return Math.min(height * 0.4, 300); // Smaller for modal
    }
    // iPad specific handling
    else if (isIPad) {
      return Math.min(width * 0.4, height * 0.4); // Smaller for modal
    }
    // Other tablets and small laptops
    else if (width < 1024) {
      return Math.min(height * 0.5, 400); // Smaller for modal
    }
    // Desktop
    else {
      return '320px'; // Fixed height for desktop modal
    }
  };

  // Simple service data
  const servicesData = {
    "Auto Detailing": {
      title: "Premium Auto Detailing",
      shortDescription: "Complete interior and exterior restoration services",
      fullDescription: "Our comprehensive auto detailing service combines advanced techniques with premium-grade products to restore your vehicle to showroom condition. From paint correction polishing to interior deep cleaning, we provide meticulous attention to every detail of your vehicle.",
      features: [
        "Professional hand wash with premium soaps and microfiber techniques",
        "Clay bar treatment to remove embedded contaminants and surface pollution",
        "Deep interior cleaning with commercial-grade steam cleaning equipment",
        "Leather conditioning and protective treatment with UV protection",
        "Dashboard and trim restoration using specialized automotive products",
        "Complete tire and wheel detailing with protective coating application"
      ],
      image: car1,
      video: autoDetailingVideo,
      icon: autoDetailingImage,
      price: "Starting at $180",
      linkTo: 'auto-detailing'
    },
    "Paint Correction Polishing": {
      title: "Paint Correction Polishing",
      shortDescription: "Restore gloss, clarity, and a factory-fresh finish",
      fullDescription: "Our paint correction polishing service eliminates imperfections like swirls, scratches, and oxidation — bringing your vehicle's paint back to life with a deep, flawless shine.",
      features: [
        "Scratch and swirl mark removal for a refined finish",
        "Oxidation and UV damage correction to restore color",
        "Hologram and buffer trail elimination",
        "Bird dropping etching safely corrected",
        "Water spot damage removal from paint and clear coat",
        "Correction of automatic car wash-induced abrasions"
      ],
      image: car3,
      video: paintCorrectionVideo,
      icon: paintCorrectionImage,
      price: "Starting at $299",
      linkTo: 'paint-correction'
    },
    "Window Tinting": {
      title: "Automotive Window Film",
      shortDescription: "Get Ready to Enjoy Every Drive with XPEL PRIME",
      fullDescription: "Stay cool and comfortable behind the wheel with XPEL PRIME. Our cutting-edge window tint doesn't just look great — it blocks out heat, shields you from harmful UV rays, cuts down glare, and still keeps your view perfectly clear.",
      features: [
        "Premium ceramic film technology for superior performance",
        "99% UV ray blocking for interior and occupant protection",
        "Up to 80% heat rejection for improved comfort and efficiency",
        "Significant glare reduction for safer driving",
        "Lifetime warranty against bubbling, peeling, and fading",
        "Computer-cut precision templates for perfect fitment"
      ],
      image: car4,
      video: windowTintingVideo,
      icon: windowTintingImage,
      price: "Starting at $249",
      linkTo: 'window-tinting'
    },
    "Ceramic Coating": {
      title: "Automotive Ceramic Coating",
      shortDescription: "Leave Water (and Worries) Behind with FUSION PLUS™",
      fullDescription: "Keep your ride looking spotless without the extra effort. FUSION PLUS creates a strong bond with your car's surface to repel water, dirt, and grime, making cleanups quick and easy.",
      features: [
        "9H hardness ceramic protection exceeding OEM paint durability",
        "Defends against stains, chemical etching, and environmental damage",
        "Enhanced gloss and color depth for premium appearance",
        "Superior hydrophobic properties for easy maintenance",
        "Chemical and contaminant resistance",
        "UV damage prevention and color fade protection"
      ],
      image: wash1,
      video: ceramicCoatingVideo,
      icon: wash2,
      price: "Starting at $499",
      linkTo: 'ceramic-coatings'
    },
    "Paint Protection Film": {
      title: "Paint Protection Film",
      shortDescription: "Invisible protection against chips, scratches, and road debris",
      fullDescription: "Our advanced PPF provides unmatched defense with self-healing technology and a 10-year manufacturer warranty — preserving your vehicle's paint and long-term value.",
      features: [
        "Guards against rock chips, scratches, and road debris",
        "Self-healing properties for long-term clarity and shine",
        "Helps retain resale value by protecting original paint",
        "Reduces maintenance caused by frequent washing or wear",
        "Installed using custom-fit templates for near-invisible finish",
        "Backed by XPEL Ultimate Plus+ and a 10-year warranty"
      ],
      image: wash2,
      video: paintProtectionVideo,
      icon: wash1,
      price: "Starting at $599",
      linkTo: 'paint-protection-film'
    },
    "Dent Repair": {
      title: "Professional Dent Repair",
      shortDescription: "Paintless dent removal and traditional repair services",
      fullDescription: "Our expert dent repair technicians use advanced paintless dent removal (PDR) techniques and traditional repair methods to restore your vehicle's body to its original condition.",
      features: [
        "Paintless Dent Removal (PDR) for minor dents and dings",
        "Traditional bodywork for more extensive damage",
        "Hail damage repair and restoration",
        "Door ding and parking lot damage correction",
        "Creased and sharp dent repair capabilities",
        "Insurance claim assistance and documentation"
      ],
      image: beforeAfterImage,
      video: dentRepairVideo,
      icon: dentRepairImage,
      price: "Starting at $150",
      linkTo: 'dent-repair'
    }
  };

  const openModal = (serviceName) => {
    setSelectedService(servicesData[serviceName]);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  const handleBookService = () => {
    if (selectedService?.linkTo && setCurrentView) {
      closeModal();
      setTimeout(() => {
        setCurrentView(selectedService.linkTo);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 100);
    }
  };

  const renderServiceCard = (title, description) => {
    const serviceData = servicesData[title];
    
    return (
      <div 
        key={title}
        className="group cursor-pointer bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
        onClick={() => openModal(title)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
              <img
                src={serviceData.icon}
                alt={title}
                className="w-14 h-14 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-white/90 mb-4 leading-relaxed">{description}</p>
          
          <div className="flex items-center justify-center text-white/80 hover:text-white transition-colors">
            <span className="mr-2">View Details</span>
            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* CHOOSE YOUR SERVICE Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-4 text-sky-400">
              CHOOSE YOUR SERVICE
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-sky-500 to-sky-700 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-cyan-400 max-w-3xl mx-auto">
              Transform your vehicle with our premium detailing services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderServiceCard("Auto Detailing", "Complete interior and exterior detailing services")}
            {renderServiceCard("Paint Correction Polishing", "Restore gloss, clarity, and a factory-fresh finish")}
            {renderServiceCard("Window Tinting", "Premium tinting solutions")}
            {renderServiceCard("Ceramic Coating", "Long-lasting protection")}
            {renderServiceCard("Paint Protection Film", "Film installation")}
            {renderServiceCard("Dent Repair", "Paintless dent removal and traditional repair services")}
          </div>
        </div>
      </div>

      {/* Simple Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={closeModal}></div>
          
          <div className="relative bg-white rounded-2xl max-w-2xl w-full mx-auto overflow-hidden shadow-2xl">
            {/* Video Section - Updated with Hero component sizing logic */}
            <div 
              className="relative bg-gray-100 overflow-hidden"
              style={{ 
                height: getVideoContainerHeight(),
                minHeight: isSmallScreen ? '200px' : '250px'
              }}
            >
              <video
                ref={videoRef}
                key={selectedService.title}
                className="w-full h-full"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="auto"
                poster=""
                crossOrigin="anonymous"
                loading="eager"
                disablePictureInPicture
                disableRemotePlaybook
                x-webkit-airplay="deny"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'auto',
                  WebkitTransform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                  imageRendering: 'optimizeSpeed',
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  transition: 'none',
                  animation: 'none',
                }}
                onLoadStart={(e) => {
                  setTimeout(() => {
                    if (e.target.paused) {
                      e.target.play().catch(() => {});
                    }
                  }, 100);
                }}
                onCanPlay={(e) => {
                  e.target.play().catch(() => {});
                }}
              >
                <source src={selectedService.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-6 max-h-80 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2 text-cyan-500">{selectedService.title}</h2>
              <p className="text-cyan-400 mb-6">{selectedService.fullDescription}</p>

              <h3 className="text-xl font-bold mb-4 text-cyan-500">Features</h3>
              <ul className="mb-6 space-y-2">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faCheck} className="text-sky-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-cyan-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gradient-to-r from-sky-50 to-sky-100 p-6 rounded-xl mb-6 border border-sky-200">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 font-semibold">Starting Price</span>
                  <span className="text-2xl font-bold text-sky-600">{selectedService.price}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-6 bg-gray-50 flex justify-between items-center">
              <button
                onClick={closeModal}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-cyan-400 hover:bg-gray-100 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleBookService}
                className="px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                {selectedService.linkTo ? 'Learn More' : 'Book Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChooseYourService;
