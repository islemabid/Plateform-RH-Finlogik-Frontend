
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';
import { LeaveTypeService } from 'src/services/leave-type.service';
import { LoginService } from 'src/services/login.service';
import { TimeOffBalancesService } from 'src/services/time-off-balances.service';


@Component({
  selector: 'app-request-time-off',
  templateUrl: './request-time-off.component.html',
  styleUrls: ['./request-time-off.component.scss']
})
export class RequestTimeOffComponent implements OnInit {
  form: FormGroup;
  LeaveTotal:any;
  iduser:string;
  currentEmployee:any;
  leavesType:any;
  isLoggedIn = false;
  endMaxDate:Date;
  role: any;
  verifnumberSickLeave=false;
  verifnumberPaidLeave=false;
  decode: any;
  numberDaysTotal:number;
  idLeaveType:number;
  employee = false;
  days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  leaves: any = {
    start: {
      date: null,
      quantity: null // 'half' => afternoon, 'full'
    },
    end: {
      date: null,
      quantity: null // 'half' morning, 'full'
    }
  }

  quantities = {
    sameDate: ['morning', 'afternoon', 'full day'],
    start: ['afternoon', 'full day'],
    end: ['morning', 'full day']
  }

  constructor(private login: LoginService
,    private timeoffService :TimeOffBalancesService, private router: Router, private employeeService:EmployeeService,private leaveTypeService:LeaveTypeService) { }

  ngOnInit(): void {

    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      this.iduser = this.decode["UserId"];
   
      if (this.role == 'employee') {
        this.employee = true;
      }

    };
    this.GetLeaveTotalByIdEmployee();
    this.initform();
    this.GetConnectUser();
    this.GetleaveTypes();
    
    
  }
  initform(): void {
    this.form = new FormGroup({
      startDate :new FormControl(new Date(), [Validators.required]),
      endDate :new FormControl(new Date(), [Validators.required]),
      startDateQuantity:new FormControl("", [Validators.required]),
      endDateQuantity:new FormControl("", [Validators.required]),
      state:new FormControl("Waiting", [Validators.required]),
      idEmployee :new FormControl("",[Validators.required]),
      idLeaveType :new FormControl("",[Validators.required]),
      isActive:new FormControl(true,[Validators.required]),
      comment:new FormControl(''),
     
    });
  }
  
 
  getMaxEndDate(startDateQuantity,endDateQuantity) {

    let start=new Date(this.leaves.start.date);
    let end=new Date(this.leaves.end.date);
    console.log(this.leaves.end.date);
    let diffDays = end.getTime() - start.getTime();
    let numberOfDays =  diffDays / (1000 * 3600 * 24); 
   
   
      if(startDateQuantity=="afternoon") {
        numberOfDays+=0.5;
      }
      if(startDateQuantity=="full day") {
        numberOfDays+=1;
      }
      if(endDateQuantity=="morning")
      {
        numberOfDays+=0.5;
      }
      if(endDateQuantity=="full day") {
        numberOfDays+=1;
      }
  
    numberOfDays-=this.getDaysOff(numberOfDays);
    return numberOfDays;
      
   
  }
  getDaysOff(numberOfDays)
  {
    return (numberOfDays)/3;  
  }
   
  onSubmit() {

    const saveLeave = { ...this.form.value }
    saveLeave.startDate = new Date(saveLeave.startDate.toLocaleString("en-US", {timeZone: 'Europe/Brussels'}));
    saveLeave.endDate = new Date(saveLeave.endDate.toLocaleString("en-US", {timeZone: 'Europe/Brussels'}));
   
    
    if(this.isSameDate()) {
   
      saveLeave.endDate=saveLeave.startDate;
      saveLeave.endDateQuantity=saveLeave.startDateQuantity;
      saveLeave.idEmployee=this.currentEmployee.id;
      this.numberDaysTotal=this.getMaxEndDate(saveLeave.startDateQuantity,saveLeave.endDateQuantity);
      if(saveLeave.idLeaveType==1){
        if(this.numberDaysTotal>this.LeaveTotal.numbertotalSickLeave) {
         this.verifnumberSickLeave=true;
        }
        else {
          this.timeoffService.AddTimeoffBalances(saveLeave).then((data)=>{
       
            this.router.navigate(['leaves']);
          });
        }
     
      }
      if(saveLeave.idLeaveType==2){
        if(this.numberDaysTotal>this.LeaveTotal.numbertotalPaidLeave) {
         this.verifnumberPaidLeave=true;
        }
        else {
          this.timeoffService.AddTimeoffBalances(saveLeave).then((data)=>{
       
            this.router.navigate(['leaves']);
          });
        }
     
      }
       

       
      }
  
     
 
    else {

      saveLeave.idEmployee=this.currentEmployee.id;
      this. numberDaysTotal=this.getMaxEndDate(saveLeave.startDateQuantity,saveLeave.endDateQuantity);
      if(saveLeave.idLeaveType==1){
        if(this.numberDaysTotal>this.LeaveTotal.numbertotalSickLeave) {
         this.verifnumberSickLeave=true;
        }
        else {
          this.timeoffService.AddTimeoffBalances(saveLeave).then((data)=>{
       
            this.router.navigate(['leaves']);
          });
        }
     
      }
      if(saveLeave.idLeaveType==2){
        if(this.numberDaysTotal>this.LeaveTotal.numbertotalPaidLeave) {
         this.verifnumberPaidLeave=true;
        }
        else {
          this.timeoffService.AddTimeoffBalances(saveLeave).then((data)=>{
       
            this.router.navigate(['leaves']);
          });
        }
     
      }
       
  }

}
  
  
  cancel(){
    this.router.navigate(['leaves']);
  }
   


  isSameDate() {
    const { start, end } = this.leaves;
    return start.date.getTime() === end.date.getTime();
  }


  GetConnectUser(): void {
    this.employeeService.getEmpById(this.iduser)
      .then((data) => {
      this.currentEmployee=data;

      });
  }
  

  GetleaveTypes(): void {
    this.leaveTypeService.GetAllLeaveType()
      .then((data) => {
      this.leavesType=data;

      });
  }
  GetLeaveTotalByIdEmployee(){
    this.timeoffService.GetLeaveTotalByIdEmployee(this.iduser).then((data)=>{
      this.LeaveTotal=data;
      console.log(this.LeaveTotal);
    });
  }

}



