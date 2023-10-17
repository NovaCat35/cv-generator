import { format, parseISO } from "date-fns";

export default function formatDate(rawDate: string) {
   // Parse the ISO date string to a Date object 
   const selectedDate = parseISO(rawDate); 
   const formattedDate = format(selectedDate, "LLL yyyy");
   return formattedDate;
}