import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { Sports1Component } from './sports1/sports1.component';
import { Sports2Component } from './sports2/sports2.component';
import { BddComponent } from './bdd/bdd.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent,   children:
    [
      { path: '', component: BddComponent },
      { path: 'bdd', component: BddComponent },
       { path: 'sports1', component: Sports1Component },
      { path: 'sports2', component: Sports2Component }

     
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
