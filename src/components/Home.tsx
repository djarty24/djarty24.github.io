import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sections = gsap.utils.toArray(".fade-section") as HTMLElement[];

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
	}, []);

	return (
		<div ref={containerRef} className="select-none">
			<div className="h-[87vh] flex items-end fade-section">
				<p className="font-bold text-rust pl-10 text-7xl sm:text-9xl md:text-[20vw] lg:-my-8 leading-none">
					Revati Tambe
				</p>
			</div>
			<div className="h-[100vh] text-rust font-base text-4xl flex flex-col justify-evenly fade-section">
				<p className="ml-auto pr-16 text-right w-1/3">
					I'M A HIGH SCHOOL STUDENT IN THE BAY AREA.
				</p>
				<div className="w-fit relative overflow-hidden fade-section">
					<div className="photo-gallery flex gap-4">
						{Array(24)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className="w-32 sm:w-44 h-72 sm:h-[40vh] bg-rust"
								>
									.
								</div>
							))}
					</div>
				</div>
				<p className="pl-16 w-1/2 fade-section">
					YOU CAN FIND ME WRITING CODE, CREATING BEATS, TAKING PHOTOS, BOXING,
					AND OUT FOR A RUN.
				</p>
			</div>
		</div>
	);
};

export default Home;