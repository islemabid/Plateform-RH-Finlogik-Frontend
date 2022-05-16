import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeePayService } from 'src/services/employee-pay.service';



@Component({
  selector: 'app-employee-pay-rool-details',
  templateUrl: './employee-pay-rool-details.component.html',
  styleUrls: ['./employee-pay-rool-details.component.scss']
})
export class EmployeePayRoolDetailsComponent implements OnInit {
  currentid:string;
  EmployeePays:any;

  constructor(private employeePay: EmployeePayService, private acivateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentid = this.acivateRoute.snapshot.params.id;
    if (!!this.currentid) {
       this.employeePay.GetHistoryPaytsByIdEmployee(this.currentid).then((data)=>this.EmployeePays=data);
  }
  }
}
