import CloseSVG from "../assets/close.svg";

interface CardListProps {
   currList: any[];
   mainName: string;
   handleRemoveCard: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CardList({currList, mainName, handleRemoveCard} :CardListProps) {
	return (
		<div className="skill-list-container">
			{currList.map((item) => (
				<div className={`${mainName}-details`} id={item.id} key={item.id}>
					<div>{item.skill}</div>
					<button className="closeBtn" onClick={handleRemoveCard}>
						<img src={CloseSVG} alt="close button" />
					</button>
				</div>
			))}
		</div>
	);
}
