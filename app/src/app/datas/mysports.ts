export interface MySports {
    
    id?: number,
    sexe: sexe,
    firstname: string,
    lastname: string,
    discipline: discipline ,
    duree: number,
    day: string
    
  }


type sexe = "F" | "M";  
type discipline =  "RUNNING" | "BIKE"  | "SWIM" ;