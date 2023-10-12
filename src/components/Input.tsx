interface InputProps {
   keyName: string;
   label: string;
   placeholder: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>, inputValue: string) => void;
 }
 
export default function Input({keyName, label, placeholder, onChange} : InputProps) {
   return (
      <label>
         {label}
         <input type="text" placeholder={placeholder} onChange={(e) => onChange(e, keyName)}/>
      </label>
   )
}