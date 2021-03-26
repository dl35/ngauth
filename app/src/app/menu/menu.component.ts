import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  constructor(private lserv: LoginService ,  private router: Router ) {
   if ( this.isadmin && router.url === '/' )  {
      this.router.navigate(['/bdd'], {  skipLocationChange: false});
    } else if (router.url === '/') {
      this.router.navigate(['/sports1'], {  skipLocationChange: false});
    }

   }

  isadmin() {
return this.lserv.isAdmin() ;

  } 



  ngOnInit(): void {
  }

}
