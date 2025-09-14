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
		// Clear existing ScrollTriggers on re-render
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

		// Fade-in animations for sections
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

		// Horizontal scroll for the photo gallery
		if (aboutMeRef.current && photoGalleryRef.current) {
			const galleryWidth = photoGalleryRef.current.scrollWidth;
			const viewportWidth = window.innerWidth;
			const initialOffset = viewportWidth / 2;
			const xTranslation = -(galleryWidth - viewportWidth / 2);

			gsap.set(photoGalleryRef.current, {
				x: initialOffset,
			});

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

		// Pin the projects section
		if (projectsPinRef.current && projectsRef.current) {
			const projectsHeight = projectsRef.current.offsetHeight * 2.25;

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

		// Cleanup ScrollTriggers on unmount
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<div ref={containerRef} className="select-none">
			{/* Hero Section */}
			<div className="h-[87vh] flex items-end fade-section">
				<p className="font-bold text-rust pl-10 text-7xl sm:text-9xl md:text-[20vw] lg:-my-8 leading-none">
					Revati Tambe
				</p>
			</div>

			{/* About Me Section */}
			<div ref={aboutMeRef} className="about-me min-h-[100vh] text-rust font-base text-4xl flex flex-col justify-evenly relative overflow-x-hidden">
				<p className="fade-section ml-auto pr-16 text-right w-2/3 sm:w-1/2 md:w-1/3 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					I'M A HIGH SCHOOL STUDENT IN THE BAY AREA.
				</p>
				<div
					ref={photoGalleryRef}
					className="photo-gallery flex gap-4"
					style={{ width: "max-content" }}
				>
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/1.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/2.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/3.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/4.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/5.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/6.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/7.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/8.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/9.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/10.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/11.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/12.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/13.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/14.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/15.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/16.jpg" alt="" />
					<img className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust object-cover" src="/img/photo-gallery/17.jpg" alt="" />
				</div>
				<p className="pl-16 w-2/3 md:w-1/2 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					YOU CAN FIND ME WRITING CODE, CREATING BEATS, TAKING PHOTOS, BOXING, AND OUT FOR A RUN.
				</p>
			</div>

			{/* Projects Section */}
			<div className="projects w-full flex-col h-fit" ref={projectsRef}>
				<div className="w-full h-[100vh] flex justify-center items-center relative z-10">
					<h1
						ref={projectsPinRef}
						className="projects-pin w-fit h-fit font-bold text-center text-[12vw] text-rust relative z-20"
					>
						I like making websites
					</h1>
				</div>
				<div className="w-full flex-col h-fit relative z-10">
					<Project
						className="project"
						name="Multiverse Researchers"
						link="https://multiverseresearchers.org"
						image="/img/projects-gallery/1.png"
					/>
					<Project
						className="project"
						name="Bloom Institute Mountain View"
						link="https://mv.bloominst.org"
						image="/img/projects-gallery/2.png"
					/>
					<Project
						className="project"
						name="Zeno"
						link="https://zenoai.co"
						image="/img/projects-gallery/3.png"
					/>
				</div>
			</div>
			<div className="w-full h-[200vh]">
				.
			</div>
		</div>
	);
};

export default Home;