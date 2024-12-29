interface ProjectProps {
	name: string;
	link: string;
	image: string;
	className?: string;
}

const Project = ({ name, link, image, className }: ProjectProps) => {
	return (
		<div className={`flex flex-col m-auto my-4 items-center rounded-lg ${className}`}>			
            <a href={link} target="_blank">
                <img
    				src={image}
    				alt={name}
    				className="border-2 border-rust w-[60vw] h-auto object-fill rounded-md"
    			/>
            </a>
		</div>
	);
};

export default Project;