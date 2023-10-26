import ExpandSVG from "../assets/expand.svg";

interface HeaderProps {
	name: string;
	isActive: boolean;
	handleExpandClick: () => void;
	imgSrc? : string;
}

export default function Header({ name, isActive, handleExpandClick, imgSrc='' }: HeaderProps) {
	return (
		<div className="head">
			<div className='left-container'>
				{imgSrc !='' && <img className='header-icon' src={imgSrc} alt="header icon" />}
				<h1>{name}</h1>
			</div>
			<button className={isActive ? "expandBtn active" : "expandBtn"} onClick={handleExpandClick}>
				<img src={ExpandSVG} alt="expand icon" />
			</button>
		</div>
	);
}
