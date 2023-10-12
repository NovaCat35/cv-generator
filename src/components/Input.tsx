import {HandleChange} from '../App.tsx'

interface InputProps {
   keyName: string;
   label: string;
   placeholder: string;
	setState: React.Dispatch<React.SetStateAction<any>>;
   currState: any;
   onChange: (data: HandleChange) => void;
 }
 
export default function Input({keyName, label, placeholder, onChange, setState, currState} : InputProps) {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ e, fieldName: keyName, setState, currState});
    };
    
   return (
      <label>
         {label}
         <input type="text" placeholder={placeholder} onChange={handleChange}/>
      </label>
   )
}