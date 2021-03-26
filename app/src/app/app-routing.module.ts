import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { Sports1Component } from './sports1/sports1.component';
import { BddComponent } from './bdd/bdd.component';
import { LoginComponent } from './login/login.component';
import { GuardGuard } from './guard/guard.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {


    path: '', component: MenuComponent, canActivate: [GuardGuard], canActivateChild: [GuardGuard],  children:
    [
     
      { path: 'bdd', component: BddComponent },
      { path: 'sports1', component: Sports1Component },
      { path: 'users', component: UsersComponent }
     
    ]
  },
  { path: '**', component: LoginComponent } ,
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
