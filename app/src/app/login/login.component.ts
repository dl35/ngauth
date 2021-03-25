import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public dataForm: FormGroup ;

  constructor( private formBuilder: FormBuilder, private loginService: LoginService  , private router: Router  ) {
  }


  ngOnInit(): void {
    this.doSignOut();
    this.initForm();

  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      // tslint:disable-next-line:max-line-length
      user: [ 'test@meteo.fr'  , [Validators.required , Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ] ]  ,
      pwd: [ 'test', [Validators.required,  Validators.minLength(4)] ]
                                        });
  }


doSignOut() {
this.loginService.signout();
}


doSignUp() {

this.loginService.signup( this.dataForm.value  ).subscribe(
// tslint:disable-next-line:max-line-length
(data)  =>   {  sessionStorage.setItem('token' , data.token )  ;     this.router.navigate(['/']) ;  } ,
(error) => {
  } ,
() => {}


) ;


}

}
