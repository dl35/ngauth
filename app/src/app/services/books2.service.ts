import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MyBooks } from '../datas/mybooks';


@Injectable({
  providedIn: 'root'
})
export class Books2Service {


  private subject = new BehaviorSubject<MyBooks[]>([]) ;
  datas$ = this.subject.asObservable();
 
  url = "/books";
  constructor(private http:  HttpClient ) { }

  get(): any {
    let surl =this.url +'/list' ;
    this.http.get<MyBooks[]>( surl  ).subscribe(
                  m => this.subject.next(m)
    )
  }

  delete(id: number): any {
    let surl =this.url +'/'+ id ;
    this.http.delete<any>( surl  ).subscribe(
                          m => {
                            let datas: MyBooks[] = this.subject.getValue();
                            let datas2 = datas.filter((m) => m.id !== id);
                            this.subject.next( datas2 ) 
                          }
    )
  }
  post(book: MyBooks): any {
    this.http.post<any>( this.url , book ).subscribe(
                  m => {
                        let datas = this.subject.getValue() ;
                        book.id = m.insertId ;
                        // add first
                        datas = [ book , ...datas ];
                        this.subject.next( datas ) 
                      }
    )
  }

  put(id: number , book: MyBooks): any {
    let surl =this.url +'/'+ id ;
    this.http.put<any>( surl , book ).subscribe(
                m => {
                  let datas = this.subject.getValue() ;
                  let index = datas.findIndex((m) => m.id === id );
                  book.id = id ;
                  datas[index] = book  ;
                  this.subject.next( datas ) 
                }
    )
  }


  sort() {
    let datas : MyBooks[] = this.subject.getValue().sort((a,b) => this.predicat(a,b)) ;
    this.subject.next( datas ) 

  }

  private predicat( a, b ) {
    return (a.title < b.title ? -1 : 1)
  }





}
