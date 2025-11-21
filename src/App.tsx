import { useState, useEffect } from "react";
import { FaRegHandshake } from "react-icons/fa6";
import { FaMailBulk } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import { LiaGlobeEuropeSolid } from "react-icons/lia";
const SLIDES = [
  {
    id: 1,
    title: "Connect with Partners",
    subtitle: "Building Bridges",
    description:
      "We establish strong relationships with industry leaders to ensure sustainable growth and mutual success in every project.",
    icon: <FaRegHandshake  size={32}/>,
  },
  {
    id: 2,
    title: "24/7 Support System",
    subtitle: "Always Here",
    description:
      "Our dedicated team is available round the clock to solve your queries and ensure your operations never hit a roadblock.",
    icon: <FaMailBulk  size={32}/>,
  },
  {
    id: 3,
    title: "Deep Analytics",
    subtitle: "Data Driven",
    description:
      "Gain insights into your performance with our advanced analytics tools that track every metric that matters to your business.",
    icon: <LuUserRoundSearch size={32} />,
  },
  {
    id: 4,
    title: "Global Reach",
    subtitle: "Worldwide",
    description:
      "Expand your horizon beyond borders. We provide the infrastructure and network to get your product to a global audience.",
    icon: <LiaGlobeEuropeSolid size={32} />,
  },
];

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2070&auto=format&fit=crop",
  "https://workingsolutions.com/wp-content/uploads/2022/03/24-7-customer-service-1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJAtAyhwbHTcrpS7WvDs12HIIDBzUwrhfloA",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8FjQbRY2BWhc1VGLiLWemOWazAsuqzGT57Q",
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [iconSpacing, setIconSpacing] = useState(260);

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

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setProgress(index / (SLIDES.length - 1));
  };

  const currentTranslateX = -(progress * (iconSpacing * (SLIDES.length - 1)));

  const MAX_LEFT = 0;
  const MAX_RIGHT = -(iconSpacing * (SLIDES.length - 1));

  const safeTranslateX = Math.max(
    MAX_RIGHT,
    Math.min(MAX_LEFT, currentTranslateX)
  );
  const CROSSHAIR_POSITION_PCT = 18;
  return (
    <div className="w-full font-serif text-slate-800">
      <div className="relative h-screen bg-[#FFFBF5]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          <div className="absolute ml-[0px] mb-[450px]">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full w-[100px] ml-[100px]">
              Lorem
            </button>
            <h2 className="ml-[100px] mt-[20px] text-2xl font-bold">
              Lorem ipsum dolor sit amet
            </h2>
             <h2 className="ml-[550px] mt-[30px] text-2xl font-bold">
              Lorem ipsum dolor sit amet
            </h2>
          </div>
          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 h-[60%] items-center mt-[80px]">
            <div className="pl-[15%] md:pl-[20%]">
              <div className="relative h-64 overflow-hidden sm:overflow-hidden md:overflow-hidden lg:overflow-visible">
                {SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute transition-all duration-700 ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ marginLeft: "150px" }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4">
                      Step 0{index + 1}
                    </span>

                    <h2 className="text-2xl md:text-2xl mb-2 text-orange-600 font-bold">
                      {slide.title}
                    </h2>

                    <h3 className="text-2xl text-slate-500 mb-6 italic font-serif">
                      {slide.subtitle}
                    </h3>

                    <p className="text-lg leading-relaxed text-slate-600">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="w-full max-w-md aspect-video rounded-xl shadow-2xl overflow-hidden relative">
                {SLIDE_IMAGES.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      index === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[30%] border-t border-slate-200/50 bg-gradient-to-b from-transparent to-white/50 mb-[70px]">
            <div
              className="absolute w-[2px] bg-slate-800 z-20"
              style={{
                left: `${CROSSHAIR_POSITION_PCT}%`,
                top: "-180px",
                height: "300px",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rounded-full" />
            </div>
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 z-10" />
            <div
              className="absolute top-1/2 flex items-center transition-transform duration-500 z-30"
              style={{
                left: `${CROSSHAIR_POSITION_PCT}%`,
                marginLeft: `-${iconSpacing / 2}px`,
                transform: `translateY(-50%) translateX(${safeTranslateX}px)`,
                width: `${SLIDES.length * iconSpacing}px`,
              }}
            >
              {SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={slide.id}
                    onClick={() => handleClick(index)}
                    className="relative flex justify-center items-center cursor-pointer transition-all duration-500"
                    style={{ width: `${iconSpacing}px` }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white transition-all duration-500 ${
                        isActive
                          ? "scale-125 bg-orange-600"
                          : "scale-90 bg-orange-400 opacity-70"
                      }`}
                    >
                      {slide.icon}
                    </div>

                    <div
                      className={`absolute top-20 text-center w-48 text-sm font-bold transition-opacity duration-300 ${
                        isActive ? "opacity-100 text-orange-600" : "opacity-0"
                      }`}
                    >
                      {slide.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" absolute w-full p-4 flex justify-center gap-5  z-30 mt-[650px]">
            <button className="w-[300px] px-4 py-2 bg-orange-500 text-white rounded-full">Lorem Ipsum</button>
            <button className="w-[300px] px-4 py-2 bg-white text-orange-500 border border-orange-500 rounded-full">lorem Ipsum</button>
          </div>
        </div>
      </div>
    </div>
  );
}
