import {  formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { LoginService } from 'src/services/login.service';
import { TimeOffBalancesService } from 'src/services/time-off-balances.service';

@Component({
  selector: 'app-list-leave-request',
  templateUrl: './list-leave-request.component.html',
  styleUrls: ['./list-leave-request.component.scss']
})
export class ListLeaveRequestComponent implements OnInit {
  panelOpenState = false;
  LeaveRequestList:any;
  isLoggedIn = false;
  currentDate=new Date();
  idEmployee:string;
  LeaveTotal:any;
  currentEmployee:any;
  days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  role: any;
  decode: any;
  employee = false;
  constructor(private timeoffService :TimeOffBalancesService,private login: LoginService,private employeeService:EmployeeService) { }

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
 
   
   
    this.GetConnectUser();
    this.GetLeavesRequestsByEmployee();
    this.GetLeaveTotalByIdEmployee();

    
  }

  GetLeavesRequestsByEmployee(): void {
     this.timeoffService.GetTimeOffBalancesListByEmployeeId(this.idEmployee)
      .then((data) => {
       this.LeaveRequestList=data;
     
     
      
      });
  }

  async filtersChangedHandler(filters) {
    this.LeaveRequestList = await this.timeoffService.GetTimeOffBalancesListByEmployeeId(this.idEmployee);
    const { type, endDate,startDate } = filters;
    this.LeaveRequestList = this.LeaveRequestList.filter(data => {
      const typeCondition = type ? data.state.includes(type) : true;
      let startdateCondition = true;
      let enddateCondition = true;
      if (startDate && endDate) {
        data.startDate= formatDate( data.startDate.toString(), 'MM-dd-yyyy','en-US');
        let start=formatDate(startDate.toString(), 'MM-dd-yyyy','en-US');
        startdateCondition =start.includes(data.startDate);
        data.endDate= formatDate( data.endDate.toString(), 'MM-dd-yyyy','en-US');
        let end=formatDate(endDate.toString(), 'MM-dd-yyyy','en-US');
        enddateCondition =end.includes(data.endDate);
      }
    
      return startdateCondition && enddateCondition && typeCondition;
    })
  }
 
  GetConnectUser(): void {
    this.employeeService.getEmpById(this.idEmployee)
      .then((data) => {
      this.currentEmployee=data;

      });
  }
  GetLeaveTotalByIdEmployee(){
    this.timeoffService.GetLeaveTotalByIdEmployee(this.idEmployee).then((data)=>{
      this.LeaveTotal=data;
      
    });
  }

 cancelRequest(idRequest) {
   this.timeoffService.cancelRequest(idRequest).then((data)=>{this.GetLeavesRequestsByEmployee();})
    
 }
 verifStatus(startDate){
   startDate=new Date(startDate);
   return startDate.getTime()>this.currentDate.getTime();
 }
  
}
