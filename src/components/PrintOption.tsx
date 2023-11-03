import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "./ResumePreview";

export default function PrintComponent(props: any) {
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div>
			{/* component to be printed or downloaded */}
			<div style={{ display: "none" }}>
				<ResumePreview ref={componentRef} {...props} />
			</div>
			{/* button to trigger printing or downloading of ResumePreview */}
			<button onClick={handlePrint}>Print this out!</button>
		</div>
	);
}
