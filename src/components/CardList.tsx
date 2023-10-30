import CloseSVG from "../assets/close.svg";
import { v4 as uuidv4 } from "uuid";

interface CardListProps {
	type?: string;
	currSubHeaderList?: any[];
	currBulletList: any[];
	mainName: string;
	handleRemoveCard: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Creates a container of cards. Each card will contain individual details & a delete button
export default function CardList({ type = "normal", currSubHeaderList, currBulletList, mainName, handleRemoveCard }: CardListProps) {
	return type == "normal" ? (
		<div className="list-container">
			{currBulletList.map((item) => (
				<div className={`${mainName}-details details`} id={item.id} key={item.id}>
					<div>{mainName == "skill" ? item.skill : item.bulletPoint}</div>
					<button className="closeBtn" onClick={handleRemoveCard}>
						<img src={CloseSVG} alt="close button" />
					</button>
				</div>
			))}
		</div>
	) : (
		<div className="list-container">
			{currBulletList.map((item) => (
					<div className={`${mainName}-details details`} id={item.id} key={item.id}>
						{/* Using the optional chaining operator (?.) to safely access properties on potentially undefined objects. */}						
						{currSubHeaderList?.map((subHeader) => (
							subHeader.id == item.subHeaderId && <div className="sub-header" key={uuidv4()}>{subHeader.headerName}</div>
						))}
						<div>{mainName == "skill" ? item.skill : item.bulletPoint}</div>
						<button className="closeBtn" onClick={handleRemoveCard}>
							<img src={CloseSVG} alt="close button" />
						</button>
					</div>
			))}
		</div>
	);
}
