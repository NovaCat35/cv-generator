interface ResetButtonProps {
   handleReset: () => void;
}

export default function ResetButton({handleReset} : ResetButtonProps) {
   return (
         <button className='reset-btn' onClick={handleReset}>RESET</button>
   )
}