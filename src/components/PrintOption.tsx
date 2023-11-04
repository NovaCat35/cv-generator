import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import printSVG from '../assets/print.svg'
import ResumePreview from "./ResumePreview";

export default function PrintComponent(props: any) {
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div className='print-container'>
			{/* component to be printed or downloaded */}
			<div style={{ display: "none" }}>
				<ResumePreview ref={componentRef} {...props} />
			</div>
			{/* button to trigger printing or downloading of ResumePreview */}
			<button onClick={handlePrint}><img src={printSVG} alt="print icon" /></button>
		</div>
	);
}
