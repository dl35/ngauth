export interface MyOptionsSports {
    page: number,
    search: Search
  }


interface Search {
    firstname: string,
    lastname: string,
    discipline: discipline
  }

  
type discipline =  "RUNNING" | "BIKE"  | "SWIM" ;  