import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-personnal',
  templateUrl: './personnal.component.html',
  styleUrls: ['./personnal.component.scss']
})
export class PersonnalComponent implements OnInit {

  
  isLoggedIn = false;
  decode: any;
  iduser: any;
  employeeInfo: any;
  constructor(private loginService: LoginService, private employeeService: EmployeeService) { }


  ngOnInit(): void {
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.loginService.decodejwt(localStorage.getItem("jwt"));
      this.iduser = this.decode["UserId"];
    }
    console.log(this.iduser);
    this.getUserByID();

  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:7152/${serverPath}`;

  }
  getUserByID() {
    this.employeeService.getEmpById(this.iduser).then((data) => {
      this.employeeInfo = data;
      console.log(this.employeeInfo);
    }
    )
  }
}
