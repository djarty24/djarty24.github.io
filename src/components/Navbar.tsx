import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const linksRef = useRef<(HTMLParagraphElement | null)[]>([]);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const timeline = gsap.timeline();
        if (isOpen) {
            timeline.to(menuRef.current, {
                y: '0%',
                duration: 0.5,
                ease: 'power3.out',
            });

            timeline.fromTo(
                linksRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.15,
                    ease: 'power3.out',
                },
                '-=0.4'
            );
        } else {
            timeline.to(linksRef.current.reverse(), {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.15,
                ease: 'power3.in',
            });

            timeline.to(
                menuRef.current,
                {
                    y: '-100%',
                    duration: 0.5,
                    ease: 'power3.in',
                },
                '-=0.3'
            );
        }
    }, [isOpen]);

    // Prevent scrolling when the menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div className={`select-none font-base text-rust flex justify-end items-center`} style={{ minHeight: '13vh' }}>
            <p className="text-right mx-8 lg:my-8 lg:mx-16 leading-none text-2xl sm:text-3xl lg:text-4xl cursor-pointer" onClick={toggleMenu} >MENU</p>
            
            {/* Fullscreen Menu */}
            <div ref={menuRef} className="absolute top-0 left-0 w-full h-full bg-rust text-ivory -translate-y-full z-50" style={{ transform: 'translateY(-100%)' }}>
                <div className="flex-col">
                    <div className="select-none font-base flex justify-end items-center w-full h-[13vh] lg:h-auto">
                        <div className="text-right mx-8 lg:my-8 lg:mx-16 leading-none text-2xl sm:text-3xl lg:text-4xl cursor-pointer" onClick={toggleMenu}>CLOSE</div>
                    </div>
                    <div className="h-[87vh] p-0 m-0 font-base flex flex-col gap-10 justify-center lg:justify-normal items-center text-7xl lg:text-8xl">
                        <p className="leading-none p-0 m-0 cursor-pointer" ref={(el) => (linksRef.current[0] = el)}>Home</p>
                        <p className="leading-none p-0 m-0 cursor-pointer" ref={(el) => (linksRef.current[1] = el)}>About</p>
                        <p className="leading-none p-0 m-0 cursor-pointer" ref={(el) => (linksRef.current[2] = el)}>Works</p>
                        <p className="leading-none p-0 m-0 cursor-pointer" ref={(el) => (linksRef.current[3] = el)}>Contact</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;