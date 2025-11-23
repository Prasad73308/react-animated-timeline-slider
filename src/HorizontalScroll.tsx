import { useState, useEffect, useRef } from "react";
import { Handshake, Headset, Search, Globe } from "lucide-react";
const SLIDES = [
  {
    id: 1,
    title: "Connect with Partners",
    subtitle: "Building Bridges",
    description:
      "We establish strong relationships with industry leaders to ensure sustainable growth.",
    icon: <Handshake size={32} />,
  },
  {
    id: 2,
    title: "24/7 Support System",
    subtitle: "Always Here",
    description:
      "Our dedicated team is available round the clock to solve your queries.",
    icon: <Headset size={32} />,
  },
  {
    id: 3,
    title: "Deep Analytics",
    subtitle: "Data Driven",
    description:
      "Gain insights with our advanced analytics tools that track every metric.",
    icon: <Search size={32} />,
  },
  {
    id: 4,
    title: "Global Reach",
    subtitle: "Worldwide",
    description:
      "Expand beyond borders with infrastructure designed for worldwide scale.",
    icon: <Globe size={32} />,
  },
];

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2070&auto=format&fit=crop",
  "https://workingsolutions.com/wp-content/uploads/2022/03/24-7-customer-service-1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJAtAyhwbHTcrpS7WvDs12HIIDBzUwrhfloA",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8FjQbRY2BWhc1VGLiLWemOWazAsuqzGT57Q",
];
export default function HorizontalScroll() {
  const [progress, setProgress] = useState(0);
  const [iconSpacing, setIconSpacing] = useState(260);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const updateSpacing = () => {
      const w = window.innerWidth;
      if (w <= 480) setIconSpacing(140);
      else if (w <= 768) setIconSpacing(180);
      else if (w <= 1024) setIconSpacing(220);
      else setIconSpacing(200);
    };
    updateSpacing();
    window.addEventListener("resize", updateSpacing);
    return () => window.removeEventListener("resize", updateSpacing);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrollLeft = el.scrollLeft;
      const totalScrollWidth = el.scrollWidth - window.innerWidth;
      const rawProgress = scrollLeft / totalScrollWidth;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clamped);
    };
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  const step = 1 / SLIDES.length;
  let activeIndex = 0;
  if (progress >= step * 3) activeIndex = 3;
  else if (progress >= step * 2) activeIndex = 2;
  else if (progress >= step) activeIndex = 1;
  else activeIndex = 0;
  const totalTrackWidth = iconSpacing * (SLIDES.length - 1);
  const translateX = -(progress * totalTrackWidth);
  const CROSSHAIR_POSITION_PCT = 8;
  return (
    <div className="w-full h-screen overflow-hidden font-sans text-slate-800">
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory"
        style={{
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
        }}
      >
        {SLIDES.map((slide, index) => (
          <section
            key={slide.id}
            className="inline-block align-top w-screen h-screen snap-start relative"
          >
            <div className="absolute inset-0 bg-[#FFFBF5] flex flex-col justify-center">
              <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 h-[60%] items-center">
                <div className="absolute ml-[0px] mb-[450px]">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-full w-[100px]">
                    Lorem
                  </button>
                  <h2 className="mt-[20px] text-2xl font-bold">
                    Lorem ipsum dolor sit amet
                  </h2>
                  <h2 className="ml-[550px] mt-[30px] text-2xl font-bold">
                    Lorem ipsum dolor sit amet
                  </h2>
                </div>
                <div className="pl-[15%] md:pl-[20%]">
                  {index === activeIndex && (
                    <div className="transition-all duration-700 opacity-100">
                      <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4">
                        Step 0{index + 1}
                      </span>
                      <h2 className="text-2xl md:text-4xl mb-2 text-orange-600 font-bold">
                        {slide.title}
                      </h2>
                      <h3 className="text-2xl text-slate-500 mb-6 italic font-serif">
                        {slide.subtitle}
                      </h3>
                      <p className="text-lg leading-relaxed text-slate-600">
                        {slide.description}
                      </p>
                    </div>
                  )}
                </div>
                <div className="hidden md:flex justify-center items-center">
                  <div className="w-full max-w-md aspect-video rounded-xl shadow-2xl overflow-hidden relative">
                    {SLIDE_IMAGES.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                          i === activeIndex ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent to-white/50 mb-[80px]">
                <div
                  className="absolute w-[2px] bg-slate-800 z-20"
                  style={{
                    left: `${CROSSHAIR_POSITION_PCT}%`,
                    top: "-200px",
                    height: "300px",
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rounded-full" />
                </div>
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 z-10" />
                <div
                  className="absolute top-1/2 flex items-center transition-transform duration-300 z-30"
                  style={{
                    left: `${CROSSHAIR_POSITION_PCT}%`,
                    marginLeft: `-${iconSpacing / 2}px`,
                    transform: `translateY(-50%) translateX(${translateX}px)`,
                  }}
                >
                  {SLIDES.map((slide, i) => {
                    const isActive = i === activeIndex;
                    const iconX = i * iconSpacing + translateX;
                    const shouldHide = iconX < 0;
                    return (
                      <div
                        key={slide.id}
                        className="relative flex justify-center items-center cursor-default transition-opacity duration-300"
                        style={{
                          width: `${iconSpacing}px`,
                          opacity: shouldHide ? 0 : 1,
                          pointerEvents: shouldHide ? "none" : "auto",
                        }}
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white transition-all duration-300 ${
                            isActive
                              ? "scale-125 bg-orange-600"
                              : "scale-90 bg-orange-400 opacity-70"
                          }`}
                        >
                          {slide.icon}
                        </div>

                        <div
                          className={`absolute top-20 text-center w-48 text-sm font-bold transition-opacity duration-300 ${
                            isActive
                              ? "opacity-100 text-orange-600"
                              : "opacity-0"
                          }`}
                        >
                          {slide.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className=" absolute w-full p-4 flex justify-center gap-5  z-30 mt-[650px]">
              <button className="w-[300px] px-4 py-2 bg-orange-500 text-white rounded-full">
                Lorem Ipsum
              </button>
              <button className="w-[300px] px-4 py-2 bg-white text-orange-500 border border-orange-500 rounded-full">
                lorem Ipsum
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
