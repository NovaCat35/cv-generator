import ExpandSVG from "../assets/expand.svg";

interface HeaderProps {
	name: string;
	isActive: boolean;
	handleExpandClick: () => void;
}

export default function Header({ name, isActive, handleExpandClick }: HeaderProps) {
	return (
		<div className="head">
			<h1>{name}</h1>
			<button className={isActive ? "expandBtn active" : "expandBtn"} onClick={handleExpandClick}>
				<img src={ExpandSVG} alt="expand icon" />
			</button>
		</div>
	);
}
