import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, map, tap, switchMap, takeUntil } from 'rxjs/operators';
import { MySports } from '../datas/mysports';
import { Sports1Service } from '../services/sports1.service';
import { MySportsPage } from '../datas/mysportspage';

@Component({
  selector: 'app-sports1',
  templateUrl: './sports1.component.html',
  styleUrls: ['./sports1.component.css']
})
export class Sports1Component implements OnInit, OnDestroy {


  subject$ = new Subject();
  datas$ : Observable<MySportsPage>;
  page: number = 1 ;
  nbpages: number = 1 ;
 
  search: FormControl = new FormControl('');
  constructor(private serv: Sports1Service ) {}


  ngOnInit(): void {

  

  

    // startWith ajoute de '' dans le flux
    // debounceTime Émet une valeur après un laps de temps
    // distinctUntilChanged() , renvoi un observablesi avec des valeurs distinctes
     this.search.valueChanges.pipe(         // startWith(''),
                                    debounceTime(500),
                                    distinctUntilChanged(),
                                    takeUntil(this.subject$)
                                  ).subscribe( 
                                     v => this.serv.get( 1 ,v )
                                             )
      
       
      this.datas$ = this.serv.datas$.pipe(
          tap( ( m  ) => { if( m) { this.page = m.current ; this.nbpages = m.pages ;  } } )
                )
      this.toPage(1);
  }


  toPage(page: number){
    if ( page < 1 ) {
      page = 1 ;
    } else if ( page > this.nbpages ) {
      page = this.nbpages ;
    } 
    this.serv.get( page , this.search.value  );
   
    
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
    this.subject$.next(true);
    this.subject$.complete();
  }




}


