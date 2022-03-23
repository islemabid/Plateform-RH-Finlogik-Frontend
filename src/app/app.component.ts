import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  role = '';
  templateEmployee = false;
  templateRH = false;
  decode: any;



  constructor(private login: LoginService, private router: Router) { }



  ngOnInit() {
    const token: string = localStorage.getItem("jwt");
    console.log("token app component : ", token);
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
    this.login.userLogOut.subscribe(isUserLogOut => {
      console.log(isUserLogOut);
      this.templateEmployee = false;
      this.templateRH = false;
      this.router.navigate(['/login']).then(() => { window.location.reload() }

      );

    })
  }
}
