import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isLoggedIn = false;
  role = '';
  templateEmployee = false;
  templateRH = false;
  decode: any;

  constructor(private login: LoginService, private router: Router) { }

  ngOnInit(): void {
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
    this.login.userLogOut.subscribe(async (isUserLogOut) => {
      this.templateEmployee = false;
      this.templateRH = false;
      await this.router.navigate(['/login']);
    })
    this.login.userRole.subscribe(role => {
      if (role == "Ressources Humaines") {
        this.templateRH = true;
      }
      else if (role == "employee") {
        this.templateEmployee = true;
      }
      
    })
  }


}
