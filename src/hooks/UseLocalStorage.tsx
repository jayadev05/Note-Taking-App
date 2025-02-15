import { useEffect, useState } from "react"



function useLocalStorage<T>(key:string ,initialValue:T | (()=> T)) {

    const [value,setValue]= useState<T | null>(()=>{

      const jsonValue= localStorage.getItem(key);

      if(jsonValue!==null){
        try {
          return JSON.parse(jsonValue) as T;
        } catch (error) {
          console.log(`Error parsing localstorage key ${key}`);
        }
        
      }

      return typeof initialValue==='function' ? (initialValue as ()=>T) () : initialValue;

    
    })

    useEffect(() => {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }, [value, key]);

    return [value,setValue] as const

  
}

export default useLocalStorage