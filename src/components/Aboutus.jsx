import React, { useEffect, useState } from 'react';
import { Car, Medal, ShieldCheck, Wrench, MapPin } from 'lucide-react';
import aboutUsVideo from '../assets/images/about us banner.mp4';
import Footer from '../components/Footer';

const ActionCarAbout = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Factory-Trained.",
    "Award-Winning.",
    "Detail-Obsessed."
  ];

  const videoData = [
    {
      title: "Auto Detailing Winnipeg",
      videoId: "HizJuRhbYdE",
      description: "Complete detailing transformation"
    },
    {
      title: "Silver Package Service", 
      videoId: "wfvj2vqgrsw",
      description: "Mid-tier detailing excellence"
    },
    {
      title: "Diamond Package Service",
      videoId: "fXgGjLL6pYs", 
      description: "Premium detailing experience"
    },
    {
      title: "Ceramic Coating Application",
      videoId: "Bz-g7qz0Iqo",
      description: "Long-lasting paint protection"
    }
  ];

  const services = [
    'Auto Detailing',
    'Ceramic Coating', 
    'Paint Protection Film (PPF)',
    'Window Tinting'
  ];

  const commitments = [
    'Quality work',
    'Premium products',
    '100% customer satisfaction', 
    'Expert craftsmanship'
  ];

  const trustReasons = [
    'XPEL Certified Dealer & Installer',
    'Fully Insured, Professional Studio',
    'Trusted by hundreds of happy customers',
    'Clean, modern facility with precision-focused care'
  ];

  useEffect(() => {
    const typewriterEffect = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setDisplayedText(currentPhrase.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(prev => prev - 1);
        
        if (currentCharIndex === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
        }
      } else {
        setDisplayedText(currentPhrase.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
        
        if (currentCharIndex === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(typewriterEffect, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentCharIndex, currentPhraseIndex, isDeleting, phrases]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Video Section - Force White Background and Light Blue Text */}
      <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: 'white' }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'white' }}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto min-w-full object-cover"
            style={{
              aspectRatio: '16/9'
            }}
          >
            <source src={aboutUsVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex-col items-center justify-end px-1 xs:px-2 sm:px-4 lg:px-8 pb-3 xs:pb-4 sm:pb-6 lg:pb-8 z-20 hidden sm:flex">
          <div className="text-center w-full max-w-full overflow-hidden">
            <h1 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight whitespace-nowrap"
              style={{ color: 'white' }}
            >
              ABOUT US
            </h1>
            
            <div className="min-h-[40px] lg:min-h-[50px] flex items-center justify-center overflow-hidden">
              <p 
                className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium whitespace-nowrap"
                style={{ color: '#0ea5e9' }}
              >
                {displayedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ladder Cards Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
            
            {/* Card 1 - Who We Are */}
            <div className="scroll-animate opacity-0 translate-y-12 transition-all duration-800 w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12">
              <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-xl border border-sky-300 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                  <div className="bg-sky-100 p-3 sm:p-4 rounded-lg flex-shrink-0 self-start lg:self-center border border-sky-300">
                    <Car className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-700 mb-3 sm:mb-4">Who We Are</h2>
                    <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-sky-800">
                      <p className="leading-relaxed">
                        At <span className="font-semibold text-sky-900">Action Car Detailing</span>, we do more than clean cars — we restore, protect, and elevate them. Based in Winnipeg with 12+ years of industry experience.
                      </p>
                      <ul className="space-y-2 sm:space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-sky-500 mt-1 text-lg">•</span>
                          <span>Certified and authorized by XPEL</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-sky-500 mt-1 text-lg">•</span>
                          <span>Studio run by factory-trained professionals</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - What Sets Us Apart */}
            <div className="scroll-animate opacity-0 translate-y-12 transition-all duration-800 w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 ml-auto">
              <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-xl border border-sky-300 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                  <div className="bg-sky-100 p-3 sm:p-4 rounded-lg flex-shrink-0 self-start lg:self-center border border-sky-300">
                    <Medal className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-700 mb-3 sm:mb-4">What Sets Us Apart</h2>
                    <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-sky-800">
                      <p className="leading-relaxed">
                        We're proud to be the <span className="font-semibold text-sky-900">2024 Consumer Choice Award Winner</span> in the Auto Detailing category — the only winner in Winnipeg & the Greater Region.
                      </p>
                      <div className="bg-sky-50 p-4 sm:p-5 lg:p-6 rounded-lg border border-sky-200">
                        <p className="font-semibold text-sky-900 mb-3 text-sm sm:text-base">Our commitment:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {commitments.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-sky-500 text-sm sm:text-base">✓</span>
                              <span className="font-medium text-sky-800 text-sm sm:text-base">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Our Services */}
            <div className="scroll-animate opacity-0 translate-y-12 transition-all duration-800 w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12">
              <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-xl border border-sky-300 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                  <div className="bg-sky-100 p-3 sm:p-4 rounded-lg flex-shrink-0 self-start lg:self-center border border-sky-300">
                    <Wrench className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-700 mb-3 sm:mb-4">Our Services</h2>
                    <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-sky-800">
                      <p className="leading-relaxed">Every car gets personalized attention with our premium services:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {services.map((service, index) => (
                          <div key={index} className="flex items-center gap-2 bg-sky-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-sky-200">
                            <span className="text-sky-500 font-bold">•</span>
                            <span className="font-medium text-sky-800 text-sm sm:text-base">{service}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-sky-500 text-white p-3 sm:p-4 rounded-lg text-center mt-4">
                        <p className="font-semibold text-sm sm:text-base lg:text-lg">
                          We don't rush — we perfect every detail.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - Why Clients Trust Us */}
            <div className="scroll-animate opacity-0 translate-y-12 transition-all duration-800 w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 ml-auto">
              <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-xl border border-sky-300 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                  <div className="bg-sky-100 p-3 sm:p-4 rounded-lg flex-shrink-0 self-start lg:self-center border border-sky-300">
                    <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-700 mb-3 sm:mb-4">Why Clients Trust Us</h2>
                    <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-sky-800">
                      <ul className="space-y-2 sm:space-y-3">
                        {trustReasons.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-sky-500 mt-1 text-lg">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 - Visit Us */}
            <div className="scroll-animate opacity-0 translate-y-12 transition-all duration-800 w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto">
              <div className="bg-sky-500 text-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
                <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
                  <div className="bg-white/30 p-3 sm:p-4 rounded-lg flex-shrink-0 border border-white/40">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <div className="text-center lg:text-left flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Visit Us</h2>
                    <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                      Come see why Winnipeg trusts us to protect what moves them.
                    </p>
                    <div className="bg-white/20 p-3 sm:p-4 rounded-lg border border-white/30 max-w-md mx-auto lg:mx-0">
                      <p className="font-bold text-sm sm:text-base lg:text-lg">
                        Experience detailing — done right.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate opacity-0 translate-y-12 transition-all duration-800">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-600 mb-2 sm:mb-3 lg:mb-4">Our Work in Action</h2>
            <p className="text-base sm:text-lg lg:text-xl text-sky-800 max-w-2xl mx-auto leading-relaxed">
              See the precision and care we put into every vehicle
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {videoData.map((video, index) => (
              <div 
                key={index} 
                className="scroll-animate opacity-0 translate-y-12 bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-sky-300 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
              >
                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-700 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm sm:text-base text-sky-800 leading-relaxed">
                    {video.description}
                  </p>
                </div>
                <div className="aspect-video sm:aspect-[21/9] md:aspect-video rounded-lg overflow-hidden bg-sky-50 border border-sky-200">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx global>{`
        @media (min-width: 475px) {
          .xs\\:text-4xl {
            font-size: 2.25rem;
            line-height: 2.5rem;
          }
          .xs\\:text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
          .xs\\:min-h-\\[80px\\] {
            min-height: 80px;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default ActionCarAbout;