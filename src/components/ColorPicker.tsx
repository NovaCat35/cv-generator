import React, { useContext } from "react";
import { ColorContext } from "../contexts/ColorContext.ts";

interface ColorContextProps {
	type: string;
}

export default function ColorPicker({ type }: ColorContextProps) {
	const { colorName, colorHeader, colorSubheader, setColorName, setColorHeader, setColorSubheader } = useContext(ColorContext);

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value;
		if (type === "name") {
			setColorName(newColor);
		} else if (type === "header") {
			setColorHeader(newColor);
		} else {
			setColorSubheader(newColor);
		}
	};

	return (
		<div className="color-picker-container">
			<input type="color" id="color-picker" value={type === "name" ? colorName : type === "header" ? colorHeader : colorSubheader} onChange={handleColorChange}></input>
		</div>
	);
}
