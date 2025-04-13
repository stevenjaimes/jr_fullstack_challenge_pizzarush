
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  export type ClassValue = string | number | boolean | null | undefined | ClassArray | ClassDictionary;
  export interface ClassArray extends Array<ClassValue> {}
  export interface ClassDictionary { [id: string]: boolean | null | undefined }
  
  
  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';