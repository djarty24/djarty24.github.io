import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Project from "./Project";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up previous ScrollTrigger instances on component unmount
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Animate fade-in for all sections with the "fade-section" class
    const sections = gsap.utils.toArray<HTMLElement>(".fade-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Pin the "About Me" section
    if (aboutMeRef.current) {
      gsap.to(aboutMeRef.current, {
        scrollTrigger: {
          trigger: aboutMeRef.current, // Element to trigger the pinning
          start: "top top",           // Start pinning when "About Me" hits the top of the viewport
          end: "bottom top",          // End when the bottom of "About Me" hits the top of the viewport
          pin: true,                  // Pin the element
          pinSpacing: true,           // Ensure spacing after pinning
          scrub: 1,                   // Smooth scrubbing
        },
      });
    }

    // Cleanup ScrollTriggers when the component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="select-none">
      {/* Hero Section */}
      <div className="h-[100vh] flex items-end fade-section">
        <p className="font-bold text-rust pl-10 text-7xl sm:text-9xl md:text-[20vw] lg:-my-8 leading-none">
          Revati Tambe
        </p>
      </div>

      {/* About Me Section */}
      <div
        ref={aboutMeRef}
        className="about-me min-h-[100vh] text-rust font-base text-4xl flex flex-col justify-evenly"
      >
        <p className="fade-section ml-auto pr-16 text-right w-1/3">
          I'M A HIGH SCHOOL STUDENT IN THE BAY AREA.
        </p>
        <div className="w-fit relative overflow-hidden">
          <div className="photo-gallery flex gap-4">
			  <div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
			  <div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
			  <div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
			  <div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
			  <div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
			  <div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
			  <div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
			  <div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
          </div>
        </div>
        <p className="pl-16 w-1/2">
          YOU CAN FIND ME WRITING CODE, CREATING BEATS, TAKING PHOTOS, BOXING, AND OUT FOR A RUN.
        </p>
      </div>

      {/* Projects Section */}
      <div className="w-full flex-col">
        <div className="w-full h-[100vh] flex justify-center items-center">
          <h1 className="font-bold text-center text-[12vw] text-rust">
            I like making websites
          </h1>
        </div>
        <div className="w-full flex-col">
          <Project
            name="Cool Project 1"
            link="https://example.com"
            image="https://via.placeholder.com/400x300"
          />
          <Project
            name="Cool Project 2"
            link="https://example.com"
            image="https://via.placeholder.com/400x300"
          />
          <Project
            name="Cool Project 3"
            link="https://example.com"
            image="https://via.placeholder.com/400x300"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;