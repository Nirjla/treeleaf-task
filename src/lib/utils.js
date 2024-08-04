import { clsx } from "clsx"
import { isDate, parse } from "date-fns"
import { useEffect } from "react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
      return twMerge(clsx(inputs))
}

export function parseDateString(value, originalValue) {
      const parsedDate = isDate(originalValue) ? originalValue : parse(originalValue, 'yyyy-MM-dd', new Date())
      return parsedDate
}


function getStorageValue(key, defaultValue) {
      // getting stored value
      const saved = localStorage.getItem(key);
      const initial = JSON.parse(saved);
      return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
      const [value, setValue] = useState(() => {
            return getStorageValue(key, defaultValue);
      });

      useEffect(() => {
            // storing input name
            localStorage.setItem(key, JSON.stringify(value));
      }, [key, value]);

      return [value, setValue];
};
