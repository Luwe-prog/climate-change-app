import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Droplets, Wind, Sun, Recycle, TreePine, Lightbulb, Factory, Globe, Cloud, Sprout, ArrowUp, Download } from 'lucide-react';

import Scene from './components/Scene';

// ========== NEW: Scroll Progress Bar Component ==========
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// ========== NEW: Floating 3D Nature Icons that Follow Scroll ==========
const FloatingNatureIcons = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const icons = [
    { Icon: Leaf, left: '5%', baseTop: 20, speed: 0.3, rotate: true },
    { Icon: Droplets, right: '8%', baseTop: 30, speed: 0.25, rotate: false },
    { Icon: Wind, left: '10%', baseTop: 50, speed: 0.35, rotate: true },
    { Icon: Cloud, right: '12%', baseTop: 60, speed: 0.2, rotate: false },
    { Icon: Sprout, left: '7%', baseTop: 80, speed: 0.28, rotate: true },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {icons.map((item, index) => {
        const { Icon, left, right, baseTop, speed, rotate } = item;
        const offset = scrollY * speed;
        const top = `${baseTop + (offset % 60)}vh`;
        
        return (
          <div
            key={index}
            className="absolute transition-all duration-300 opacity-20 hover:opacity-40"
            style={{
              left,
              right,
              top,
              transform: rotate ? `rotate(${(scrollY * 0.1) % 360}deg)` : 'none',
            }}
          >
            <Icon className="w-12 h-12 text-green-600" />
          </div>
        );
      })}
    </div>
  );
};

// ========== NEW: Back to Top Button ==========
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 animate-bounce"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

// ========== NEW: Animated Statistics Counter ==========
const StatCounter = ({ end, duration = 2000, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <div ref={counterRef} className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl transform hover:scale-105 transition-all">
      <div className="text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-lg text-green-200">{label}</div>
    </div>
  );
};

// ========== UPDATED: Navbar Component with Scroll Effect ==========
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const [showModel, setShowModel] = useState(false);
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-green-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="text-green-300 w-8 h-8" />
            <span className="text-white font-bold text-xl">EcoAwareness</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#hero" className="text-white hover:text-green-300 transition-colors">Home</a>
            <a href="#stats" className="text-white hover:text-green-300 transition-colors">Statistics</a>
            <a href="#what-is" className="text-white hover:text-green-300 transition-colors">What is Climate Change</a>
            <a href="#solutions" className="text-white hover:text-green-300 transition-colors">Solutions</a>
            <a href="#ai-assistant" className="text-white hover:text-green-300 transition-colors">AI Assistant</a>
            <a href="#3d-model" className="text-white hover:text-green-300 transition-colors">3d model</a>
             <a href="#download-map" className="text-white hover:text-green-300 transition-colors">Download 3d model</a>
          </div>
          

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-green-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#hero" 
                className="block px-3 py-2 text-white hover:bg-green-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#ai-assistant" 
                className="block px-3 py-2 text-white hover:bg-green-800 rounded-md transition-colors"
                 onClick={() => setMobileMenuOpen(false)}
              > 
                AI Assistant
              </a>
              <a 
                href="#stats" 
                className="block px-3 py-2 text-white hover:bg-green-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Statistics
              </a>
              <a 
                href="#what-is" 
                className="block px-3 py-2 text-white hover:bg-green-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                What is Climate Change
              </a>
              <a 
                href="#solutions" 
                className="block px-3 py-2 text-white hover:bg-green-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <a href="#hazard-map" 
              className="text-white hover:text-green-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              >
                Hazard Map
                </a>
                 <a 
                href="#3d-model" 
                className="block px-3 py-2 text-white hover:bg-green-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                3d model
              </a>
               <a 
                href="#download-map" 
                className="block px-3 py-2 text-white hover:bg-green-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download 3d Map
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-300/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-800 via-teal-700 to-blue-900">
      <FloatingParticles />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 text-center px-4 animate-fadeIn">
        <div className="mb-8 flex justify-center">
          <Globe className="w-24 h-24 text-green-300 animate-spin-slow" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Climate Change Awareness
        </h1>
        <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
          Let's learn about climate change and how we can help our environment
        </p>
        <button 
            onClick={() => {
            document.getElementById('stats').scrollIntoView({ behavior: 'smooth' });
         }}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-2xl"
        > 
            Start Learning
        </button>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

// ========== NEW: Climate Statistics Section ==========
const StatsSection = () => {
  return (
    <section id="stats" className="py-24 bg-gradient-to-br from-green-700 via-teal-600 to-blue-700 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Climate Change by the Numbers</h2>
          <p className="text-xl text-green-100">Critical statistics that show the urgency of action</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <StatCounter end={1} duration={2000} label="°C Temperature Rise" suffix=".1" />
          <StatCounter end={419} duration={2500} label="ppm CO₂ Levels" />
          <StatCounter end={20} duration={2000} label="Typhoons/Year (PH)" />
          <StatCounter end={48} duration={2200} label="% Emissions from Fossil Fuels" suffix="%" />
        </div>
      </div>
    </section>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle, icon: Icon }) => {
  return (
    <div className="text-center mb-16 animate-fadeInUp">
      <div className="flex justify-center mb-4">
        <Icon className="w-16 h-16 text-green-600" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

// 3D Info Card Component with Read More
const InfoCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldTruncate = description.length > 120;
  const displayText = isExpanded || !shouldTruncate 
    ? description 
    : description.slice(0, 120) + '...';

  return (
    <div
      className="relative group animate-fadeInUp"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative bg-white rounded-2xl p-8 shadow-xl transition-all duration-300 transform ${isHovered ? 'scale-105 shadow-2xl -translate-y-2' : ''}`}>
        {/* 3D Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-green-500 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{displayText}</p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-green-600 hover:text-green-700 font-semibold text-sm flex items-center transition-colors"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
              <span className="ml-1">{isExpanded ? '↑' : '→'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Expandable Text Component for Large Sections
const ExpandableText = ({ children, maxLength = 200 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? text 
    : text.slice(0, maxLength) + '...';

  return (
    <div>
      <p className="text-lg text-gray-700 leading-relaxed">{displayText}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-all transform hover:scale-105"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

// Expandable Text Component for White Text on Colored Backgrounds
const ExpandableTextWhite = ({ children, maxLength = 200 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? text 
    : text.slice(0, maxLength) + '...';

  return (
    <div>
      <p className="text-lg leading-relaxed opacity-90">{displayText}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-full transition-all transform hover:scale-105 backdrop-blur-sm"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

// 3Rs Card Component with Read More
const ThreeRCard = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  const shouldTruncate = text.length > 100;
  const displayText = isExpanded || !shouldTruncate 
    ? text 
    : text.slice(0, 100) + '...';

  return (
    <div className="text-center">
      <h4 className="text-2xl font-bold mb-4">{title}</h4>
      <p className="text-lg opacity-90">{displayText}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-white/80 hover:text-white font-semibold text-sm underline"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};




// ========== NEW: Hazard Map Component ==========
const HazardMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);



  // Lubao center coordinates
  const lubaoCenter = [14.9386, 120.5964];

  // Sample hazard zones (we'll update these with real data later)
  const hazardZones = [
    {
      id: 1,
      name: "High Risk Zone - River Areas",
      type: "high",
      barangays: ["San Nicolas 1st", "San Nicolas 2nd", "Santa Monica", "Prado Siongco"],
      description: "Areas near Gumain River and low-lying zones. Prone to severe flooding during typhoons.",
      coordinates: [
        [14.955, 120.580],
        [14.945, 120.590],
        [14.935, 120.585],
        [14.940, 120.575]
      ]
    },
    {
      id: 2,
      name: "Medium Risk Zone - Central Area",
      type: "medium",
      barangays: ["Poblacion", "Bacolor", "San Agustin", "Santo Tomas"],
      description: "Moderate elevation. May experience flooding during heavy rainfall.",
      coordinates: [
        [14.940, 120.600],
        [14.930, 120.610],
        [14.920, 120.605],
        [14.925, 120.595]
      ]
    },
    {
      id: 3,
      name: "Safe Zone - Higher Ground",
      type: "safe",
      barangays: ["San Jose Gumi", "Baliti", "San Matias"],
      description: "Higher elevation areas. Suitable for evacuation during calamities.",
      coordinates: [
        [14.950, 120.610],
        [14.945, 120.620],
        [14.935, 120.615],
        [14.938, 120.605]
      ]
    }
  ];


  
  // Evacuation centers
  const evacuationCenters = [
    {
      name: "Lubao Municipal Hall",
      coordinates: [14.9386, 120.5964],
      capacity: "500 families",
      facilities: "Medical aid, food distribution"
    },
    {
      name: "Lubao National High School",
      coordinates: [14.9420, 120.5980],
      capacity: "300 families",
      facilities: "Temporary shelter, clean water"
    },
    {
      name: "Diosdado Macapagal Park (DOST Station)",
      coordinates: [14.9370, 120.5950],
      capacity: "Monitoring only",
      facilities: "Real-time rainfall monitoring"
    }
  ];

  const getZoneColor = (type) => {
    switch(type) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'safe': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <section id="hazard-map" className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex justify-center mb-4">
            <Globe className="w-16 h-16 text-red-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Lubao Hazard Map</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive map showing flood-prone areas and evacuation centers
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="h-[500px] md:h-[600px] relative">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=120.55,14.90,120.64,14.98&layer=mapnik&marker=${lubaoCenter[0]},${lubaoCenter[1]}`}
              className="w-full h-full"
              style={{ border: 0 }}
              title="Lubao Pampanga Map"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg">
              <h4 className="font-bold text-gray-800 mb-2">Legend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Safe Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span>Evacuation Center</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hazard Zones Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {hazardZones.map((zone) => (
            <div
              key={zone.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              style={{ borderLeft: `6px solid ${getZoneColor(zone.type)}` }}
              onClick={() => setSelectedZone(zone)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-6 h-6 rounded-full mt-1"
                  style={{ backgroundColor: getZoneColor(zone.type) }}
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{zone.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {zone.type === 'high' ? '⚠️ High Risk' : zone.type === 'medium' ? '⚡ Medium Risk' : '✅ Safe'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{zone.description}</p>
              <div className="text-xs text-gray-500">
                <strong>Barangays:</strong> {zone.barangays.join(', ')}
              </div>
            </div>
          ))}
        </div>

        {/* Evacuation Centers */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-6 text-center">Evacuation Centers</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {evacuationCenters.map((center, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h4 className="text-xl font-bold mb-2">📍 {center.name}</h4>
                <p className="text-sm opacity-90 mb-2">
                  <strong>Capacity:</strong> {center.capacity}
                </p>
                <p className="text-sm opacity-90">
                  <strong>Facilities:</strong> {center.facilities}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-red-600 text-3xl">⚠️</div>
            <div>
              <h4 className="text-xl font-bold text-red-800 mb-2">Emergency Preparedness</h4>
              <p className="text-gray-700 mb-3">
                According to Pampanga Governor Lilia Pineda, critical dike damage poses a threat to 5-6 barangays 
                and approximately 30,000 families in Lubao. Stay alert during typhoon season and know your nearest evacuation center.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3">
                  <strong className="text-red-600">📞 Emergency Hotlines:</strong>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• MDRRMO Lubao: (Update with real number)</li>
                    <li>• PNP Lubao: 911</li>
                    <li>• Red Cross: 143</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <strong className="text-blue-600">💧 DOST Monitoring:</strong>
                  <p className="mt-2 text-gray-600">
                    Real-time rainfall data available at Diosdado Macapagal Park monitoring station
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note for Updates */}
        <div className="mt-6 text-center text-gray-500 text-sm italic">
          * This map uses sample data for demonstration. For official hazard information, 
          please contact the Lubao Municipal Disaster Risk Reduction and Management Office (MDRRMO)
        </div>
      </div>
    </section>
  );
};
// ========== DOWNLOADABLE 3D CAMPUS MAP SECTION ==========
const Download3DMap = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Reset after 2 seconds
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <section id="download-map" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-full">
                <Globe className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Download 3D Campus Map
            </h2>
            <p className="text-xl text-gray-600">
              Get the complete 3D model of PSU Lubao Campus
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-200 animate-fadeInUp" style={{animationDelay: '100ms'}}>
            
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm flex-shrink-0">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">PSU Lubao Campus 3D Model</h3>
                  <p className="text-blue-100 leading-relaxed">
                    High-quality 3D model in GLB format. Perfect for visualization, presentations, and educational purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
              
              {/* File Information */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-blue-600 font-semibold text-sm mb-1">File Format</div>
                  <div className="text-gray-800 font-bold text-lg">GLB</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-blue-600 font-semibold text-sm mb-1">Compatible With</div>
                  <div className="text-gray-800 font-bold text-lg">Blender, Unity, etc.</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-blue-600 font-semibold text-sm mb-1">File Name</div>
                  <div className="text-gray-800 font-bold text-lg">campus-map.glb</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span> What's Included
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Complete campus buildings</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Landscape and terrain</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Optimized for viewing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Ready to use</span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="text-center">
                <a
                  href="/assets/psu-map.glb"
                  download="PSU-Lubao-Campus-3D-Map.glb"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-2xl"
                >
                  {isDownloading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      <span>Download 3D Map</span>
                    </>
                  )}
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  Click to download • File will be saved as "PSU-Lubao-Campus-3D-Map.glb"
                </p>
              </div>

            </div>
          </div>

          {/* Usage Instructions */}
          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500 animate-fadeInUp" style={{animationDelay: '200ms'}}>
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <span>📖</span> How to Use This File
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <p><strong>Download</strong> the GLB file by clicking the button above</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <p><strong>Open</strong> with 3D software like Blender, Unity, Unreal Engine, or online viewers</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <p><strong>Use</strong> for presentations, projects, VR/AR applications, or educational purposes</p>
              </div>
            </div>
          </div>

          {/* Compatible Software */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">Compatible with popular 3D software:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200">Blender</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200">Unity</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200">Unreal Engine</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200">SketchUp</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200">3D Viewers</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ========== AI CLIMATE ASSISTANT COMPONENT ==========
const ClimateAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Climate Change Assistant. Ask me anything about climate change, environmental solutions, or the situation in Lubao, Pampanga! 🌍'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const sendMessage = async () => {
  if (!inputMessage.trim() || isLoading) return;

  const userMessage = inputMessage.trim();
  setInputMessage('');
  
  setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
  setIsLoading(true);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // ✅ Updated to current model
        messages: [
          {
            role: 'system',
            content: 'You are an educational climate change assistant for students in Lubao, Pampanga, Philippines. Help students understand climate change clearly, simply, and accurately. Be friendly, encouraging, and supportive. Explain concepts in simple language suitable for high school/college students. Use examples relevant to the Philippines and Lubao when possible. Keep responses concise (2-4 paragraphs max) but informative.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Failed to get response'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  } catch (error) {
    console.error('Error:', error);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: `❌ Sorry, I encountered an error: ${error.message}

Please check:
1. Your Groq API key is correct in the .env file
2. The API key is active at https://console.groq.com/keys
3. You haven't exceeded the rate limit` 
    }]);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What is climate change?",
    "How does climate change affect the Philippines?",
    "What can I do to help fight climate change?",
    "Why is Lubao prone to flooding?",
    "What are renewable energy sources?"
  ];

  return (
    <section id="ai-assistant" className="py-24 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
              <Lightbulb className="w-16 h-16 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">AI Climate Assistant</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? Ask our AI assistant anything about climate change!
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-200">
            
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Climate Change Assistant</h3>
                    <p className="text-sm opacity-90">Powered by AI • Always here to help 🌱</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto p-6 bg-gray-50 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-white text-gray-800 shadow-md border border-gray-200'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fadeInUp">
                  <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-6 py-4 bg-purple-50 border-t border-purple-100">
                <p className="text-sm font-semibold text-gray-700 mb-3">💡 Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                      }}
                      className="text-xs bg-white hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-full border border-purple-200 transition-all transform hover:scale-105"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about climate change..."
                  className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? '...' : 'Send'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                💡 Tip: Press Enter to send your message
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🤖</div>
              <div>
                <h4 className="font-bold text-purple-900 mb-2">About This AI Assistant</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This assistant uses advanced AI to help you understand climate change topics. 
                  It's trained to provide accurate, educational responses suitable for students. 
                  Ask about climate science, environmental solutions, local impacts in Lubao, or anything climate-related!
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs bg-white px-3 py-1 rounded-full text-purple-700 font-medium">✓ Accurate Information</span>
                  <span className="text-xs bg-white px-3 py-1 rounded-full text-purple-700 font-medium">✓ Student-Friendly</span>
                  <span className="text-xs bg-white px-3 py-1 rounded-full text-purple-700 font-medium">✓ Always Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhatIsSection = () => {
  return (
    <section id="what-is" className="py-24 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader 
          title="What is Climate Change?"
          subtitle="Let's explore the definition, causes, and effects of climate change"
          icon={Globe}
        />

        {/* Main Definition Card with Glassmorphism */}
        <div className="mb-16 animate-fadeInUp">
          <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-green-200">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-500 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50"></div>
            
            <div className="relative">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <Droplets className="w-10 h-10 mr-4 text-blue-600" />
                Definition of Climate Change
              </h3>
              <ExpandableText maxLength={500}>
                  Climate change refers to the long-term alteration of the Earth's weather patterns. It occurs when the
                  planet becomes warmer or colder over a long period of time, not just for a few days or months.
                  Nowadays, it is mostly caused by human activities such as burning fossil fuels and cutting down trees.
              </ExpandableText>
            </div>
          </div>
        </div>

        {/* Causes Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">Causes of Climate Change</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard 
              icon={Factory}
              title="Greenhouse Gases"
              description="Although the Philippines contributes only 0.48% of global greenhouse gas emissions, it remains highly vulnerable to climate change. National emissions continue to rise, with 41% coming from coal and fuel oil used for power generation and 35% from land, air, and water transportation. Globally, fossil fuels accounted for 77% of primary energy use and over 60% of electricity production in 2023. Their combustion produces significant environmental impacts, with carbon dioxide from fossil fuel burning responsible for more than 70% of human-related greenhouse gas emissions in 2022. This makes fossil fuels the leading driver of global warming and ocean acidification."
              delay={0}
            />
            <InfoCard 
              icon={TreePine}
              title="Deforestation"
              description="Deforestation is a significant contributor to climate change and undermines forest resilience. It is the second-largest source of human-generated CO₂ emissions—after fossil fuel use—due to tree burning and the release of carbon stored in soils. In 2019, deforestation accounted for approximately 11% of global greenhouse gas emissions, with rates increasing in tropical regions. Although forests serve as essential carbon sinks, climate-related disturbances such as wildfires, invasive species, and extreme weather weaken them further. This creates a harmful feedback loop in which deforestation intensifies climate change, which in turn accelerates forest loss."
              delay={100}
            />
            <InfoCard 
              icon={Factory}
              title="Pollution"
              description="Air pollution has become increasingly severe in the Philippines over the past year. According to the World Health Organization's health and environment scorecard, the country's annual average concentration of fine particulate matter is 24 μg/m³, far above the recommended limit of 5 μg/m³. Much of this pollution results from the burning of fossil fuels such as coal and oil. Additionally, 53% of the population lacks access to clean cooking fuels and technologies, a condition that is likely to worsen air quality over time."
              delay={200}
            />
          </div>
        </div>

        {/* Effects Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">Effects of Climate Change</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard 
              icon={Sun}
              title="Global Warming"
              description="Global warming is the long-term increase in the Earth's surface temperature, driven mainly by rising concentrations of greenhouse gases in the atmosphere. Its impacts extend far beyond higher temperatures. Heat waves have become more frequent and intense across most land regions, increasing heat-related illnesses and mortality, while making outdoor work more dangerous—especially in tropical countries. Ecosystems are also being disrupted as species migrate toward cooler areas, and hotter, drier conditions have made wildfires more frequent and harder to control. The oceans, which absorb most of the excess heat, are experiencing marine heatwaves, coral bleaching, and reduced oxygen levels, all of which threaten marine biodiversity and fisheries."
              delay={0}
            />
            <InfoCard 
              icon={Wind}
              title="Stronger Storms"
              description="Although the total number of tropical cyclones may not necessarily increase, climate change is making them significantly more intense and dangerous. Warmer ocean temperatures and higher atmospheric moisture provide additional energy for storms, resulting in stronger winds and heavier rainfall. Rising sea levels combined with more powerful cyclones also produce more destructive storm surges during landfall. In addition, storms are now more likely to undergo rapid intensification, reducing the time available for communities to prepare or evacuate and increasing the risk of severe impacts."
              delay={100}
            />
            <InfoCard 
              icon={Droplets}
              title="Sea Level Rise"
              description="Global sea levels are rising at an accelerating pace, primarily due to the thermal expansion of warming ocean waters and the continued melting of glaciers and ice sheets. This rise increases the risk of coastal flooding, erosion, and landslides, as higher sea levels allow storm surges to extend farther inland during extreme weather events. Critical infrastructure and water resources are also threatened, with roads, bridges, water systems, and sewage facilities facing potential inundation. In addition, saltwater intrusion can contaminate freshwater aquifers, jeopardizing drinking water supplies and agricultural productivity."
              delay={200}
            />
          </div>
        </div>

        {/* Philippines & Lubao Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-teal-600 rounded-3xl p-10 text-white shadow-2xl transform hover:scale-105 transition-all animate-fadeInUp">
            <h3 className="text-3xl font-bold mb-6">Climate Change in the Philippines</h3>
            <ExpandableTextWhite maxLength={200}>
              The Philippines is consistently identified as one of the world's most climate-vulnerable countries. Climate-related hazards—such as extreme weather events, coral bleaching, and coastal degradation—pose serious risks to the nation's economy, ecosystems, and community livelihoods. From 2000 to 2019, the country ranked as the fourth most affected by climate impacts, underscoring the severity of its exposure.
              Its location within the typhoon belt and its extensive coastlines heighten this vulnerability, threatening natural resources and the well-being of millions. These increasing risks highlight the urgent need for strengthened adaptation and mitigation strategies to protect communities and support a more sustainable and climate-resilient future.
            </ExpandableTextWhite>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-10 text-white shadow-2xl transform hover:scale-105 transition-all animate-fadeInUp" style={{animationDelay: '100ms'}}>
            <h3 className="text-3xl font-bold mb-6">Climate Change in Lubao, Pampanga</h3>
            <ExpandableTextWhite maxLength={200}>
              Lubao, situated in a low-lying area within the Tarlac-Nueva Ecija-Pampanga-Bulacan valley, is traversed by waters flowing from the highlands of Benguet, Zambales, and Rizal toward northern Manila Bay. Due to its vulnerability to flooding, the town has been designated as a hazard-prone area by the government. To monitor rainfall in real time, the Department of Science and Technology has installed a remote monitoring station at Diosdado Macapagal Park near the Lubao Municipal Hall.
              According to Pampanga Governor Lilia Pineda, damage to the local dike has reached a critical level, posing a potential threat to five to six barangays and approximately 30,000 families if floodwaters breach, potentially devastating homes and agricultural lands.
            </ExpandableTextWhite>
          </div>
        </div>
      </div>
    </section>
  );
};

// Solutions Section
const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-24 bg-gradient-to-b from-green-50 to-blue-50 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader 
          title="How to Reduce Things That Harm the Environment"
          subtitle="Practical solutions for a more sustainable future"
          icon={Leaf}
        />

        {/* 3Rs Section - Featured */}
        <div className="mb-16 animate-fadeInUp">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <Recycle className="w-20 h-20 animate-spin-slow" />
            </div>
            <h3 className="text-4xl font-bold mb-8 text-center">3Rs: Reduce, Reuse, Recycle</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <ThreeRCard title="Reduce">
                Reduce means to minimize the amount of waste we generate by consuming only what is necessary and avoiding excess. It encourages thoughtful use of resources, such as buying products with less packaging, opting for durable goods instead of disposable ones, and conserving energy and materials in daily activities. By reducing consumption, we lower the volume of waste sent to landfills and decrease the environmental impact, contributing to the fight against climate change.
              </ThreeRCard>
              <ThreeRCard title="Reuse">
                Reuse involves finding new ways to use items instead of discarding them. This can include repairing, repurposing, or donating products so they serve multiple uses before becoming waste. Reusing extends the life of materials, conserves resources, reduces pollution from manufacturing, and decreases the demand for new products.
              </ThreeRCard>
              <ThreeRCard title="Recycle">
                Recycle is the process of transforming used materials into new products. By separating recyclable waste—such as paper, plastics, glass, and metals—we prevent these items from ending up in landfills or being incinerated. Recycling conserves natural resources, saves energy, reduces greenhouse gas emissions, and supports a circular economy where materials are continuously reused.
              </ThreeRCard>
            </div>
          </div>
        </div>

        {/* Solution Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <InfoCard 
            icon={Sun}
            title="Renewable Energy"
            description="Renewable energy is derived from natural sources that are replenished faster than they are consumed, including sunlight, wind, water, geothermal heat, and ocean currents. Unlike fossil fuels, which release large amounts of carbon dioxide and take millions of years to form, renewable energy produces significantly lower greenhouse gas emissions and supports a transition toward a more sustainable energy system. Solar energy harnesses sunlight through photovoltaic panels or concentrated solar systems, providing electricity, heat, and fuel even in cloudy conditions, while wind energy captures the kinetic energy of air through onshore and offshore turbines, with global potential sufficient to meet a significant portion of electricity demand. Geothermal energy utilizes heat from the Earth's interior from naturally hot or enhanced reservoirs to generate stable, low-emission electricity. Hydropower generates energy from flowing water in rivers or reservoirs, offering additional benefits such as irrigation, flood control, and drinking water, with small-scale hydro being particularly suitable for remote communities. Emerging ocean energy technologies harness the power of waves, tides, and currents, offering vast long-term potential to supplement the global energy supply. Collectively, these renewable sources are increasingly cost-effective, environmentally friendly, and vital for mitigating climate change while creating jobs and reducing reliance on fossil fuels."
            delay={0}
          />
          <InfoCard 
            icon={TreePine}
            title="Tree Planting / Reforestation"
            description="Reforestation and tree planting restore trees in areas affected by natural events or human activities, helping to rebuild forest canopies and preserve biodiversity. These practices reduce air pollution, absorb carbon dioxide, prevent soil erosion, and lower the risk of floods and landslides. By improving ecosystem health and resilience, tree planting is a key strategy in combating climate change and protecting the environment."
            delay={100}
          />
          <InfoCard 
            icon={Recycle}
            title="Waste Management"
            description="Waste management involves properly handling, disposing, and processing waste to minimize its impact on the environment. Effective waste management reduces pollution, conserves natural resources, prevents soil and water contamination, and helps mitigate climate change. Practices include proper segregation, collection, treatment, and safe disposal of different types of waste."
            delay={200}
          />
          <InfoCard 
            icon={Wind}
            title="Sustainable Transportation"
            description="Sustainable transportation aims to meet mobility needs while reducing environmental impact, improving public health, and promoting social equity. By encouraging walking, cycling, public transit, and electric or hybrid vehicles, cities can significantly lower greenhouse gas emissions and urban pollution. Combined with smart urban planning, policies such as carpooling, stricter vehicle emission standards, and &quot;15-minute cities&quot; where essential services are accessible by foot or bike, sustainable transportation helps create cleaner, healthier, and more livable communities while addressing climate change."
            delay={300}
          />
          <InfoCard 
            icon={Lightbulb}
            title="Energy Conservation"
            description="Energy conservation involves using energy more efficiently and minimizing unnecessary consumption. Simple practices such as turning off unused appliances, using energy-efficient lighting, and optimizing heating or cooling systems can significantly reduce energy use. Conserving energy lowers greenhouse gas emissions, decreases utility costs, and supports sustainable resource management, contributing to climate change mitigation."
            delay={400}
          />
          <InfoCard 
            icon={Factory}
            title="Anti-Pollution Programs"
            description="Republic Act No. 8749, or the Philippine Clean Air Act of 1999, is a landmark law designed to protect and improve air quality in the Philippines. It provides a comprehensive framework for preventing, controlling, and mitigating air pollution from mobile and stationary sources to safeguard public health and the environment. The Act establishes air quality standards for key pollutants such as particulate matter, sulfur dioxide, carbon monoxide, nitrogen oxides, and ozone, and mandates continuous monitoring and enforcement. The law integrates air quality management into national and local planning, ensuring that pollution control is prioritized in both urban and rural areas. It assigns responsibilities to government agencies, particularly the Department of Environment and Natural Resources (DENR), to enforce standards, regulate industrial emissions, and promote cleaner technologies. The Act also encourages public participation and imposes penalties on violators, including fines and permit suspensions or revocations. Through these measures, the Clean Air Act aims to reduce pollution, protect public health, and promote sustainable development in the Philippines."
            delay={500}
          />
        </div>

        {/* PSU Lubao Campus Section */}
        <div className="animate-fadeInUp">
          <div className="relative bg-white rounded-3xl p-12 shadow-2xl border-4 border-green-500">
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg">
              Campus Action Plan
            </div>
            
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <Leaf className="w-10 h-10 mr-4 text-green-600" />
              Application of Solutions at PSU Lubao Campus
            </h3>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Campus Initiatives</h4>
                <p className="text-gray-700">Schools in the Philippines are increasingly adopting strategies to reduce their environmental impact and promote sustainability. Key initiatives include plastic recycling programs, composting food waste, and reducing single-use disposable items like plastic cutlery, cups, and bottles. College campuses can further support sustainability by offering donation programs and e-waste recycling drives during moving season, helping keep unwanted items and electronics out of landfills. To support these efforts, campuses can implement clear recycling plans: Coordinate with local recyclers to identify acceptable materials, Place labeled bins in high-traffic areas, Organize volunteer teams to collect and track recyclables weekly. Investments in tree planting on campus provide additional benefits, including improved air quality, energy savings from reduced heating and cooling, and increased property value. Sustainable infrastructure and initiatives not only enhance the campus environment but also allow schools to redirect cost savings to educational programs.</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Student Participation</h4>
                <p className="text-gray-700">Students play a vital role in making campus sustainability initiatives successful. Simple habits like using reusable water bottles, coffee cups, and utensils, packing lunch in reusable containers, and avoiding plastic straws or bags can collectively reduce campus waste. Students can also engage in practical activities such as community clean-ups, recycling drives, and campaigns to reduce single-use plastics. Participation helps students develop critical thinking, teamwork, and leadership skills while fostering a sense of responsibility toward the environment. By taking part in composting programs, recycling, and energy conservation projects, students not only contribute to a cleaner campus but also gain hands-on experience in sustainable practices that they can apply in their personal lives.</p>
              </div>
              
              <div className="bg-teal-50 rounded-xl p-6 hover:bg-teal-100 transition-colors">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Community Engagement</h4>
                <p className="text-gray-700">Sustainability on campus extends beyond the school itself, influencing the broader community. Universities can lead community-driven projects, collaborate with local partners, and develop eco-friendly innovations in collaboration with organizations like IPUs and Fab Labs. These initiatives can enhance the university's visibility in rankings for innovation and sustainability, while inspiring local residents and businesses to adopt similar practices. Through education and outreach, students and staff can promote environmental awareness in surrounding communities, participate in tree planting programs, and share best practices in waste management and energy conservation. These efforts help create cleaner, healthier, and more resilient communities, demonstrating that protecting the environment is not only a campus responsibility but a shared social commitment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const ThreeDModelSection = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <section

      id="3d-model"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
    >
       {/* 3D Model Section */}
  {showModel && (
    <section style={{ width: "100%", height: "500px", marginTop: "20px" }}>
      <Scene />
    </section>
  )}
      {/* Optional animated background shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 3D Model */}
      <div className="relative z-10 w-full h-full flex items-center justify-center animate-fadeIn">
        <Scene />
      </div>

      {/* Wave effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};
// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-900 to-teal-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-8 h-8 text-green-300" />
              <span className="font-bold text-xl">EcoAwareness</span>
            </div>
            <p className="text-green-200">
              Together, let's take care of our environment for a better future.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-green-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#stats" className="text-green-200 hover:text-white transition-colors">Statistics</a></li>
              <li><a href="#what-is" className="text-green-200 hover:text-white transition-colors">Climate Change Info</a></li>
              <li><a href="#solutions" className="text-green-200 hover:text-white transition-colors">Solutions</a></li>
               <li><a href="#download-map" className="text-green-200 hover:text-white transition-colors">Download map</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <p className="text-green-200">
              Pampanga State University<br />
              Lubao Campus<br />
              Lubao, Pampanga
            </p>
          </div>
        </div>
        
        <div className="border-t border-green-700 pt-8 text-center text-green-200">
          <p>&copy; 2025 EcoAwareness Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="font-sans">
  <style>{/* your existing animations */}</style>

  {/* Button to show/hide the 3D model */}
  

  {/* 3D Model Section */}
  {showModel && (
    <section style={{ width: "100%", height: "500px", marginTop: "20px" }}>
      <Scene />
    </section>
  )}

      {/* NEW FEATURES */}
      <ScrollProgress />
      <FloatingNatureIcons />
      <BackToTop />

      {/* EXISTING SECTIONS */}
      <Navbar />
      <Hero />
      <StatsSection />
     
      <HazardMap />
      <ClimateAssistant />
      <WhatIsSection />
      <SolutionsSection />
      < ThreeDModelSection/>
       <Download3DMap />
      <Footer />
    </div>
  )
}

export default App;