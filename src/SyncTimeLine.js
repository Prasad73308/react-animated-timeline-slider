import React, { useState, useEffect, useRef } from 'react';
import { Handshake, Headset, Search, Globe } from 'lucide-react';

// --- DATA DEFINITION ---
// This is where you define your slides. Easy to edit.
const SLIDES = [
  {
    id: 1,
    title: "Connect with Partners",
    subtitle: "Building Bridges",
    description: "We establish strong relationships with industry leaders to ensure sustainable growth and mutual success in every project.",
    icon: <Handshake size={32} />,
    color: "bg-orange-500"
  },
  {
    id: 2,
    title: "24/7 Support System",
    subtitle: "Always Here",
    description: "Our dedicated team is available round the clock to solve your queries and ensure your operations never hit a roadblock.",
    icon: <Headset size={32} />,
    color: "bg-orange-500"
  },
  {
    id: 3,
    title: "Deep Analytics",
    subtitle: "Data Driven",
    description: "Gain insights into your performance with our advanced analytics tools that track every metric that matters to your business.",
    icon: <Search size={32} />,
    color: "bg-orange-500"
  },
  {
    id: 4,
    title: "Global Reach",
    subtitle: "Worldwide",
    description: "Expand your horizon beyond borders. We provide the infrastructure and network to get your product to a global audience.",
    icon: <Globe size={32} />,
    color: "bg-orange-500"
  }
];

export default function App() {
  // Ref for the tall container (to measure how far we've scrolled)
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State to track progress (0.0 to 1.0) and active index (0 to 3)
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the container is currently scrolled past the top of the screen
      // logic: (scrolled distance) / (scrollable distance)
      const scrollDistance = -top;
      const totalScrollableDistance = height - windowHeight;

      let newProgress = scrollDistance / totalScrollableDistance;

      // Clamp value between 0 and 1 (0% to 100%)
      newProgress = Math.max(0, Math.min(1, newProgress));

      setProgress(newProgress);

      // Determine which slide is active based on progress chunks
      // 0.00 - 0.24 = Index 0
      // 0.25 - 0.49 = Index 1, etc.
      const newIndex = Math.min(
        SLIDES.length - 1,
        Math.floor(newProgress * SLIDES.length)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- LAYOUT CONFIG ---
  // Distance between icons in pixels
  const ICON_SPACING = 250; 
  
  // Calculate how far the timeline should shift left.
  // We want the active icon to always be at the "Intersection Point".
  // So as we scroll, we push the whole row left.
  const translateX = -(progress * (ICON_SPACING * (SLIDES.length - 1)));

  return (
    <div className="w-full font-sans text-slate-800">
      
      {/* 1. PREVIOUS SECTION (Just for demo) */}
      <section className="h-screen bg-slate-50 flex items-center justify-center border-b border-slate-200">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Welcome to the Page</h1>
          <p className="text-slate-500">Scroll down to see the sticky timeline animation</p>
          <div className="mt-8 animate-bounce">↓</div>
        </div>
      </section>


      {/* 2. THE MAIN INTERACTIVE SECTION 
          h-[400vh] means this section is 4x the height of the screen.
          This provides the "track" for us to scroll through.
      */}
      <div ref={containerRef} className="relative h-[400vh] bg-[#FFFBF5]">
        
        {/* THE STICKY VIEWPORT 
            sticky top-0: Ensures this view stays pinned while we scroll through the 400vh parent.
            h-screen: Takes up full view.
            overflow-hidden: Hides the timeline going off-screen.
        */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          
          {/* Background Watermarks (Optional visual flair from your reference) */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-wrap gap-8 p-10 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="text-6xl font-bold transform -rotate-12">LOGOS</div>
            ))}
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 h-[60%] items-center">
            
            {/* LEFT SIDE: TEXT CONTENT */}
            <div className="pl-12 md:pl-24">
              {/* We map through slides but only show the active one with opacity transition */}
              <div className="relative h-64">
                {SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                      index === activeIndex 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4">
                      Step 0{index + 1}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
                      {slide.title}
                    </h2>
                    <h3 className="text-2xl text-slate-500 mb-6 font-serif italic">
                      {slide.subtitle}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: GRAY BOX (Placeholder Image) */}
            <div className="flex justify-center items-center">
               {/* The box transitions slightly based on index for a nice effect */}
               <div className="w-full max-w-md aspect-video bg-gray-400/80 rounded-xl shadow-2xl backdrop-blur-sm transition-transform duration-700 ease-out transform"
                    style={{ transform: `scale(${0.95 + (activeIndex * 0.02)}) rotate(${activeIndex * 1}deg)` }}>
                  {/* Inner content of box */}
                  <div className="w-full h-full flex items-center justify-center text-white/50 font-bold text-xl">
                    Slide Image {activeIndex + 1}
                  </div>
               </div>
            </div>
          </div>


          {/* --- THE TIMELINE & CROSSHAIRS SECTION --- */}
          <div className="absolute bottom-0 left-0 w-full h-[30%] border-t border-slate-200/50 bg-gradient-to-b from-transparent to-white/50">
            
            {/* 1. THE STATIC INTERSECTION LINES (The Crosshair) */}
            {/* Vertical Line */}
            <div className="absolute left-[25%] top-0 bottom-0 w-px bg-slate-800 z-20">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rounded-full" />
            </div>
            
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 z-10" />

            {/* 2. THE MOVING TIMELINE TRACK */}
            {/* We align the track so the first item starts exactly at the crosshair (left-[25%]).
                Then we apply translateX to move the whole track left as we scroll.
            */}
            <div 
              className="absolute top-1/2 left-[25%] flex items-center z-30 transition-transform duration-100 ease-linear will-change-transform"
              style={{ transform: `translate(-50%, -50%) translateX(${translateX}px)` }}
            >
              {/* Render Icons */}
              {SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <div 
                    key={slide.id} 
                    className="relative flex justify-center items-center transition-all duration-500"
                    style={{ width: `${ICON_SPACING}px` }} // Enforce exact spacing
                  >
                    {/* The Circle Bubble */}
                    <div 
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white
                        transition-all duration-500 transform
                        ${isActive ? 'scale-125 bg-orange-600' : 'scale-90 bg-orange-400 opacity-70'}
                      `}
                    >
                      {slide.icon}
                    </div>

                    {/* Label below icon (optional) */}
                    <div className={`absolute top-20 text-sm font-bold transition-opacity duration-300 ${isActive ? 'opacity-100 text-orange-600' : 'opacity-0'}`}>
                      {slide.title}
                    </div>
                  </div>
                );
              })}
              
              {/* Extra padding line at the end so the last item doesn't look cut off */}
              <div style={{ width: '50vw' }}></div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. NEXT SECTION */}
      <section className="h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Next Section</h2>
          <p className="text-slate-400">The timeline stays above until finished.</p>
        </div>
      </section>

    </div>
  );2
}