import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Project from "./Project";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const aboutMeRef = useRef<HTMLDivElement>(null);
	const photoGalleryRef = useRef<HTMLDivElement>(null);
	const projectsPinRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

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

		if (aboutMeRef.current && photoGalleryRef.current) {
			const galleryWidth = photoGalleryRef.current.scrollWidth;
			const viewportWidth = window.innerWidth;

			const initialOffset = viewportWidth / 2;
			const xTranslation = -(galleryWidth - viewportWidth / 2);
			
			gsap.set(photoGalleryRef.current, {
				x: initialOffset,
			});

			// Animate the gallery scrolling left
			gsap.to(photoGalleryRef.current, {
				x: xTranslation,
				ease: "none",
				scrollTrigger: {
					trigger: aboutMeRef.current,
					start: "top top",
					end: () => `+=${galleryWidth - viewportWidth / 2 + initialOffset}`,
					pin: true,
					scrub: 1,
				},
			});
		}

		if (projectsPinRef.current && projectsRef.current) {
			const lastProject = projectsRef.current.querySelectorAll('.project');
			const lastProjectHeight = lastProject[lastProject.length - 1]?.clientHeight || 0;

			const projectsHeight = projectsRef.current.offsetHeight;

			gsap.to(projectsPinRef.current, {
				scrollTrigger: {
					trigger: projectsPinRef.current,
					start: "center center",
					end: () => `+=${projectsHeight}`,
					pin: true,
					scrub: true,
					anticipatePin: 1,
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
			<div className="h-[85vh] flex items-end fade-section">
				<p className="font-bold text-rust pl-10 text-7xl sm:text-9xl md:text-[20vw] lg:-my-8 leading-none">Revati Tambe</p>
			</div>

			{/* About Me Section */}
			<div ref={aboutMeRef} className="about-me min-h-[100vh] text-rust font-base text-4xl flex flex-col justify-evenly">
				<p className="fade-section ml-auto pr-16 text-right w-1/3">I'M A HIGH SCHOOL STUDENT IN THE BAY AREA. </p>
				<div ref={photoGalleryRef} className="photo-gallery flex gap-4" style={{ width: "max-content" }}>
					<div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
					<div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
					<div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
					<div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
					<div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
					<div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
					<div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
					<div className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust">.</div>
				</div>
				<p className="pl-16 w-1/2">YOU CAN FIND ME WRITING CODE, CREATING BEATS, TAKING PHOTOS, BOXING, AND OUT FOR A RUN.</p>
			</div>

			{/* Projects Section */}
			<div className="projects w-full flex-col" ref={projectsRef}>
				<div className="w-full h-[100vh] flex justify-center items-center relative z-10">
					<h1 ref={projectsPinRef} className="projects-pin font-bold text-center text-[12vw] text-rust relative z-20">I like making websites</h1>
				</div>
				<div className="w-full flex-col relative z-10">
					<Project className="project" name="Cool Project 1" link="https://example.com" image="https://via.placeholder.com/400x300"/>
					<Project className="project" name="Cool Project 2" link="https://example.com" image="https://via.placeholder.com/400x300"/>
					<Project className="project" name="Cool Project 3" link="https://example.com" image="https://via.placeholder.com/400x300"/>
				</div>
			</div>
		</div>
	);
};

export default Home;