interface ResetButtonProps {
   nameType: string;
   handleClick: () => void;
}

export default function CustomButton({nameType, handleClick} : ResetButtonProps) {
   return (
      <button className={`${nameType}-btn`} onClick={handleClick}>
         {(nameType=='clear') ? 'CLEAR' : 'Sample'}
      </button>
   )
}