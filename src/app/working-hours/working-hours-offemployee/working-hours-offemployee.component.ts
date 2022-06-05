
import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/services/login.service';
import { PointageService } from 'src/services/pointage.service';


@Component({
  selector: 'app-working-hours-offemployee',
  templateUrl: './working-hours-offemployee.component.html',
  styleUrls: ['./working-hours-offemployee.component.scss']
})
export class WorkingHoursOffemployeeComponent implements OnInit {

 
  isLoggedIn = false;
  role: any;
  idEmployee:string;
  decode: any;
  Events:any[];
  employee = false;
  employeeFullName:string;
  calendarOptions: { initialView: string; events: any[]; };


  constructor(private ms: PointageService, private login: LoginService) {}

  ngOnInit(): void {
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      this.idEmployee= this.decode["UserId"];
      if (this.role == 'employee') {
        this.employee = true;
      }

    }
    this.GetAllWorkingHoursOffEmployee();
  }



  GetAllWorkingHoursOffEmployee(){
    this.ms.GetAllWorkingHoursByIdEmployee(this.idEmployee)
    .then((data) => {
      this.Events=data;
      this.calendarOptions = {
       initialView: 'dayGridMonth',
       events:this.Events.map(event => ({ title: event.hours+" h ", date: event.date.split('T')[0] }))
     };

    });
  }
}
