import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MyHttpInterceptor } from './interceptor/my-http-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';


import { Sports1Component } from './sports1/sports1.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BddComponent } from './bdd/bdd.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    Sports1Component,
    BddComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule




  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy} ,  { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
