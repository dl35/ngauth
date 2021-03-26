import { Sports1Service } from '../services/sports1.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MySports } from '../datas/mysports';





export class SportsDataSource extends DataSource<any | undefined> {
    //  private length = 100000;
 
    private pageSize = 20;
    private cachedData = Array.from<MySports>({ length: 0 });
    private fetchedPages = new Set<MySports>();
    private dataStream = new BehaviorSubject<(MySports | null)[]>(this.cachedData);
    private subscription = new Subscription();

    private paginate = 1;
    private lastPage = 0;
    filter =  { search: [] };

    

    constructor(private total$: BehaviorSubject<string>, private sportServ: Sports1Service) {
        super();
        this.getdatas();
    }



    connect(collectionViewer: CollectionViewer): Observable<(any | undefined)[]> {

        this.subscription.add(collectionViewer.viewChange.subscribe(range => {
            const currentPage = this.getPageForIndex(range.end);

           
              console.log(currentPage, this.lastPage);
         
            if (currentPage > this.lastPage) {
                this.lastPage = currentPage;
                this.getdatas();
            }

        }));
        return this.dataStream;
    }

    getdatas(): void {
        this.sportServ.get(this.paginate, this.filter).subscribe(
            (v) => {
                this.total$.next(v.total);
                this.cachedData = this.cachedData.concat(v.datas);
                this.dataStream.next(this.cachedData);
                this.paginate++;
            });
    }

    delete(item: MySports ): void {
        this.cachedData =   this.cachedData.filter((it) => it !== item )
        this.dataStream.next(this.cachedData);
    }

    refreshData(filter): void {
        this.paginate = 1;
        this.lastPage = 0;
        this.filter = filter ;
        this.cachedData = Array.from<MySports>({ length: 0 });
        this.getdatas();

    }





    disconnect(): void {
        this.subscription.unsubscribe();
    }

    private getPageForIndex(index: number): number {
        return Math.floor(index / this.pageSize);
    }

}
