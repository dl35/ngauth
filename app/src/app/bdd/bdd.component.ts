import { BddService } from './../services/bdd.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-bdd',
  templateUrl: './bdd.component.html',
  styleUrls: ['./bdd.component.css'],
  animations: [
    trigger('fade', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class BddComponent implements OnInit , OnDestroy {


  info = { status: 200 , message: '' };
  subjects$: Subject<boolean>  = new Subject<boolean>(); 

  constructor(private serv: BddService ) { }

  ngOnInit(): void {
  }

  setMessage(res : any){
    
    this.info = res ;
    setTimeout( 
          () => {
              this.info.message = "" ;
          } ,1500 ) ;

  }




createSports() {
  this.serv.createSports().pipe(
     takeUntil(this.subjects$) ,
     catchError( err =>  of(err) )
     ).subscribe(
    m =>    this.setMessage( m )
) ;
}

deleteSports() {
  this.serv.deleteSports().pipe(
    takeUntil(this.subjects$),
    catchError( err =>  of(err) )
    ).subscribe( m =>
    this.setMessage( m )
        );}

dropSports() {
  this.serv.dropSports().pipe(
     takeUntil(this.subjects$),
     catchError( err =>  of(err) )
     ).subscribe(
    m =>    this.setMessage( m )
) ;

}

ngOnDestroy(): void {
  this.subjects$.next(true);
  this.subjects$.complete();
     
}

}




