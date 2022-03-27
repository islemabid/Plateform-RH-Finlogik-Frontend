import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
      /*this.decodedToken = this.loginService.decodejwt(token);
    console.log(this.decodedToken);
    this.role = this.decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    console.log(this.role);*/

    }

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  login() {
    this.loginService.authentication(this.form.value)
      .then(response => {
        console.log(response);
        const token = (<any>response).token;
        console.log(token);
        localStorage.setItem("jwt", token);
        this.decodedToken = this.loginService.decodejwt(token);
        this.role = this.decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        this.loginService.userRole.emit(this.role);
        console.log(this.role);
        this.router.navigate(['Employees']);
      }).catch(err => {
        this.invalidLogin = true;
        console.log(err);
      });
  }


}
