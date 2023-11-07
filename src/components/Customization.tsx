import Header from "./Header.tsx";
import paletteSvg from "../assets/palette.svg";
import ColorPicker from "./ColorPicker.tsx"

interface CustomizationProps {
	isActive: boolean;
	onExpand: (param: number) => void;
}

export default function Customization({isActive, onExpand}:CustomizationProps) {
   // HandleExpand checks if the current container is already active, if so we close, otherwise we open
	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(5);
	};

   return(
      <div className={isActive ? "form-container active" : "form-container"}>
         <Header name="Customize" isActive={isActive} handleExpandClick={handleExpandClick} imgSrc={paletteSvg}/>
         <div className="main-custom-container" style={{marginTop: "5px"}}>
            <ColorPicker type='name'/>
            <p>Name Color</p>
         </div>
         <div className="main-custom-container">
            <ColorPicker type='header'/>
            <p>Header Color</p>
         </div>
         <div className="main-custom-container">
            <ColorPicker type='subheader'/>
            <p>Sub-Header Color</p>
         </div>
      </div>
   )
}