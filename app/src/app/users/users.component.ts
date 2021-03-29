import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MyUser } from '../datas/myuser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  datas$: Observable<MyUser>;
  constructor(private serv: UsersService, private router: Router ) {}

  ngOnInit(): void {

    this.datas$ = this.serv.datas$ ;


    this.serv.get()
  }


  edit(item) {
    
        const u = '/users/edit/'+item.id ;
        this.router.navigate([u] ) ;


  }


}
