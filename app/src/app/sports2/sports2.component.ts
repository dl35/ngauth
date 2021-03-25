import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { of } from 'rxjs';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap, switchMap, startWith, mergeMap, withLatestFrom } from 'rxjs/operators';
import { MySports } from '../datas/mysports';
import { MySportsPage } from '../datas/mysportspage';
import { Sports2Service } from '../services/sports2.service';

@Component({
  selector: 'app-sports2',
  templateUrl: './sports2.component.html',
  styleUrls: ['./sports2.component.css']
})
export class Sports2Component implements OnInit {


  page$ = new BehaviorSubject<number>(1);
  


  subject$ = new Observable<string>();
  datas$ : Observable<MySportsPage>;
  page: number = 1 ;
  nbpages: number = 1 ;
 
  search: FormControl = new FormControl('');
  constructor(private serv: Sports2Service ) {}


  ngOnInit(): void {

  

  

    // startWith ajoute de '' dans le flux
    // debounceTime Émet une valeur après un laps de temps
    // distinctUntilChanged() , renvoi un observablesi avec des valeurs distinctes
    this.subject$ =  this.search.valueChanges.pipe(  startWith(''),
                                    debounceTime(500),
                                    distinctUntilChanged(),
                                    map( m => m )
                                    
                       )

      

      this.datas$ = combineLatest( [this.page$ , this.subject$ ] ).pipe(
           tap( ([p , s])   =>  { console.log( p ,s ) } ) ,
           map( ([p , s])   =>  this.serv.get( p ,s ) ) ,
           switchMap( v =>  this.serv.datas$.pipe(
            tap( ( m  ) => { if( m) { this.page = m.current ; this.nbpages = m.pages ;  } } )

           )   ) 



      )
      


 //    this.search('');  
 //    this.toPage(1);
  }

  


  toPage(page: number){
    if ( page < 1 ) {
      page = 1 ;
    } else if ( page > this.nbpages ) {
      page = this.nbpages ;
    } 
//    this.serv.get( page , this.search.value  );
   this.page$.next( page );
    
  }  


  delete(item: MySports) {
      this.serv.delete( item.id );
  } 

  post() {

    const a = ["Dario","Guido","isidro","Hilario","Javier","Manuel"];
    const b = ["Cordobes","Napoleon","Vasquez","Neymar","Messi","Di-Maria"];

    const f=  a[Math.floor(Math.random() * a.length)]; 
    const l=  b[Math.floor(Math.random() * b.length)]; 


    const obj: MySports = {sexe :'M' , firstname: f , lastname: l , discipline: 'BIKE' , duree: 60 , day: new Date().toISOString() }  
    this.serv.post( obj );
  }

  put(item: MySports) {

      const a = ["Dario","Guido","isidro","Hilario","Javier","Manuel"];
      const b = ["Cordobes","Napoleon","Vasquez","Neymar","Messi","Di-Maria"];

      const f=  a[Math.floor(Math.random() * a.length)]; 
      const l=  b[Math.floor(Math.random() * b.length)]; 

    const obj: MySports = { sexe :'M' , firstname: f , lastname: l , discipline: 'SWIM' , duree: 60 , day: new Date().toISOString() }  
    this.serv.put(item.id , obj );
  }



  ngOnDestroy(): void {
   // this.subject$.next(true);
  //  this.subject$.complete();
  }




}


