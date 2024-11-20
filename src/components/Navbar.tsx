import { useState, useEffect } from 'react';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

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
		<div
			className={`select-none font-base text-rust flex justify-end items-center ${isOpen ? 'bg-rust' : ''
				}`}
			style={{ minHeight: isOpen ? '100vh' : '13vh' }}
		>
			<p className="text-right mx-8 lg:my-8 lg:mx-16 leading-none text-2xl sm:text-3xl lg:text-4xl cursor-pointer" onClick={toggleMenu} >
				MENU
			</p>

			{/* Fullscreen Menu */}
			{isOpen && (
				<div className="absolute w-full h-full bg-rust text-ivory">
					<div className="flex-col">
						<div className='select-none font-base flex justify-end items-center w-full h-[13vh] lg:h-auto'>
							<button
								className="text-right mx-8 lg:my-8 lg:mx-16 leading-none text-2xl sm:text-3xl lg:text-4xl cursor-pointer"
								onClick={toggleMenu}
							>
								CLOSE
							</button>
						</div>
						<div className='h-[87vh] p-0 m-0 font-bold flex flex-col gap-2 justify-center lg:justify-normal items-center text-8xl lg:text-9xl'>
							<p className="leading-none p-0 m-0 cursor-pointer">Home</p>
							<p className="leading-none p-0 m-0 cursor-pointer">About</p>
							<p className="leading-none p-0 m-0 cursor-pointer">Works</p>
							<p className="leading-none p-0 m-0 cursor-pointer">Contact</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;