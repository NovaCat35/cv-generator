import { format, parse, parseISO } from "date-fns";

function formatDate(rawDate: string) {
	// Parse the ISO date string to a Date object
	const selectedDate = parseISO(rawDate);
	const formattedDate = format(selectedDate, "MMM yyyy");
	return formattedDate;
}

// Mapping of full month names to standard abbreviations
const monthAbbreviations: { [key: string]: string } = {
	January: "Jan",
	February: "Feb",
	March: "Mar",
	April: "Apr",
	May: "May",
	June: "Jun",
	July: "Jul",
	August: "Aug",
	September: "Sep",
	October: "Oct",
	November: "Nov",
	December: "Dec",
};

function revertFormatDate(rawDate: string) {
	// Parse the ISO date string to a Date object
	if (rawDate !== "") {
		// Convert full month names to standard abbreviations (MMM)
		const normalizedDate = rawDate.replace(/\b(\w+)\b/g, (match) => monthAbbreviations[match] || match);
      
		const parsedDate = parse(normalizedDate, "MMM yyyy", new Date());
		const formattedDate = format(parsedDate, "yyyy-MM");
		return formattedDate;
	}
	return "";
}

export { formatDate, revertFormatDate };
