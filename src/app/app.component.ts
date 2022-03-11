import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo1';
  isLoggedIn = false;
  role = '';
  templateEmployee = false;
  templateRH = false;
  decode: any;



  constructor(private login: LoginService) { }



  ngOnInit() {
    const token: string = localStorage.getItem("jwt");
    if (token) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(token)
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (this.role == "Ressources Humaines") {
        this.templateRH = true;
      }
      else if (this.role == "employee") {
        this.templateEmployee = true;
      }
    }

  }
}
