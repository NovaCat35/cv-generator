import { createContext, Dispatch, SetStateAction } from 'react';

interface ColorContextType {
  colorName: string;
  colorHeader: string
  colorSubheader: string
  setColorName: Dispatch<SetStateAction<string>>;
  setColorHeader: Dispatch<SetStateAction<string>>;
  setColorSubheader: Dispatch<SetStateAction<string>>;
}

export const ColorContext = createContext<ColorContextType>({} as ColorContextType);
