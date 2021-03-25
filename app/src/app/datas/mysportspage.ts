import { MySports } from "./mysports";

export interface MySportsPage {
    
    total: number,
    current: number,
    pages: number,
    datas: MySports[],
    
  }