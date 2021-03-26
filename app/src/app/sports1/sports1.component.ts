import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, map, tap, switchMap, takeUntil } from 'rxjs/operators';
import { MySports } from '../datas/mysports';
import { Sports1Service } from '../services/sports1.service';
import { MySportsPage } from '../datas/mysportspage';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { SportsDataSource } from './SportsDataSource';
import { MatChipInputEvent } from '@angular/material/chips/chip-input';

@Component({
  selector: 'app-sports1',
  templateUrl: './sports1.component.html',
  styleUrls: ['./sports1.component.css']
})
export class Sports1Component implements OnInit, OnDestroy {



  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  total$ = new BehaviorSubject<string>('0');
  ds: SportsDataSource ;


  filter = { search: [] };
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];




  subject$ = new Subject();
  datas$ : Observable<MySportsPage>;
  page: number = 1 ;
  nbpages: number = 1 ;
 

  constructor(private serv: Sports1Service ) {}


  ngOnInit(): void {

  

      
   this.ds = new SportsDataSource(this.total$ , this.serv );
   
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.filter.search.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.viewPort.scrollToIndex(0);
    this.ds.refreshData( this.filter );
  }

  remove(item: any): void {
    const index = this.filter.search.indexOf(item);
    if (index >= 0) {
      this.filter.search.splice(index, 1);
    }
    this.viewPort.scrollToIndex(0);
    this.ds.refreshData( this.filter );
  }

    delete( item: MySports ){
      this.ds.delete( item ) ;
    }


  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }




}


