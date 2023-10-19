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
   Sept: "Sep", // Additional abbreviation for September
};

function revertFormatDate(rawDate: string) {
	if (rawDate !== "" && rawDate !== "Present") {
      // Convert full month names to standard abbreviations (MMM) if possible
      const monthRegex = /\b(January|February|March|April|May|June|July|August|September|October|November|December|Sept)\b/g;
      const normalizedDate = rawDate.replace(monthRegex, (match) => monthAbbreviations[match] || match);
      
      // Reformat the date so that the input[type='month'] value can understand (e.g. Oct 2023 ---> 2023-10)
		const parsedDate = parse(normalizedDate, "MMM yyyy", new Date());
		const formattedDate = format(parsedDate, "yyyy-MM");
		return formattedDate;
	}
	return "";
}

export { formatDate, revertFormatDate };
