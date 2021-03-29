export interface MyUser {
    
    id?: number,
    user: string,
    passwd: string,
    firstname: string,
    lastname: string,
    role: role 
    
  }



type role =  "admin" | "user" ;