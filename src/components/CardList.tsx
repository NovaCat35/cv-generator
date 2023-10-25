import CloseSVG from "../assets/close.svg";

interface CardListProps {
   currList: any[];
   mainName: string;
   handleRemoveCard: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Creates a container of cards. Each card will contain individual details & a delete button 
export default function CardList({currList, mainName, handleRemoveCard} :CardListProps) {
	return (
		<div className='list-container'>
			{currList.map((item) => (
				<div className='details' id={item.id} key={item.id}>
					<div>{(mainName=='skill') ? item.skill : item.bulletPoint}</div>
					<button className="closeBtn" onClick={handleRemoveCard}>
						<img src={CloseSVG} alt="close button" />
					</button>
				</div>
			))}
		</div>
	);
}
