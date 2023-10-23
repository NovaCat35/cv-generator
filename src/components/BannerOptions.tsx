import CloseSVG from "../assets/close.svg";

interface BannerOptionsProps {
	mainName: string;
	type: string;
	currState: any;
	handleSeeBanner: (e: React.MouseEvent<HTMLDivElement>) => void;
	handleAddClick: () => void;
	handleRemoveClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function BannerOptions({ mainName, type, currState, handleSeeBanner, handleAddClick, handleRemoveClick }: BannerOptionsProps) {
	return (
		<div className={`${mainName} opt-container`}>
			{/* Populates the main container with the individual exp OR skill stored in currState*/}
			{currState.map((item: any) => (
				<div className="details" id={item.id} key={item.id} onClick={handleSeeBanner}>
					<div>{(type =='experience') ? item.company : item.header}</div>
					<button className="closeBtn" onClick={handleRemoveClick}>
						<img src={CloseSVG} alt="close button" />
					</button>
				</div>
			))}
			<div className="button-container">
				<button type="button" onClick={handleAddClick}>
					{(type =='experience') ? 'Add Experience' : 'Add SKill'}
				</button>
			</div>
		</div>
	);
}
