import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  
  
  public userForm: FormGroup ;
  id: number;

  constructor(private formBuilder: FormBuilder ,  private route: ActivatedRoute ) {
 
      console.log( this.route.snapshot.url.join('/') );

      this.route.params.subscribe( 
          params =>  { console.log( params ) ; /*this.id = +params['id'] */  }
      )

      this.makeForm();


  }


  makeForm() {
    this.userForm = this.formBuilder.group({
      id: [null , [Validators.required] ] ,
      user: [null , [Validators.required , Validators.email] ] ,
      passwd: [null , [Validators.required] ] ,
      firstname: [null , [Validators.required] ] ,
      lastname: [null , [Validators.required] ] ,
      role: [null , [Validators.required] ] ,
    });

      this.userForm.removeControl('id') ;
  }


  ngOnInit(): void {
  }

}
