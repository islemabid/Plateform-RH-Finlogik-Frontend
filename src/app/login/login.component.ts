import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }
  invalidLogin: any;
  form: any;
  decodedToken: any;
  isLoggedIn = false;
  role: any;

  ngOnInit() {
    const token: string = localStorage.getItem("jwt");
    if (token) {
      this.isLoggedIn = true;
    }

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
  }
  login() {
  
    this.loginService.authentication(this.form.value)
      .then(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.decodedToken = this.loginService.decodejwt(token);
        this.role = this.decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        this.loginService.userRole.emit(this.role);
        this.router.navigate(['Employees']);
      }).catch(err => {
        this.invalidLogin = true;
        console.log(err);
      });
    
  }
  get loginFormControl() {
    return this.form.controls;
  }

}
