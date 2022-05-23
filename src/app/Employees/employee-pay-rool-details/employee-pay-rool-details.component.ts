import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EmployeePay } from 'src/models/EmployeePay';
import { EmployeePayService } from 'src/services/employee-pay.service';



@Component({
  selector: 'app-employee-pay-rool-details',
  templateUrl: './employee-pay-rool-details.component.html',
  styleUrls: ['./employee-pay-rool-details.component.scss']
})
export class EmployeePayRoolDetailsComponent implements OnInit {
  currentid:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<EmployeePay> = new MatTableDataSource(this.employeePay.tab);
  displayedColumns: string[] = [ "Mounth", "Year", "Salary", "MealTicket", "TicketPassGift","Prime","Status"];


  constructor(private employeePay: EmployeePayService, private acivateRoute: ActivatedRoute) {
    this.dataSource = new MatTableDataSource(this.employeePay.tab);
   }

  ngOnInit(): void {
    this.currentid = this.acivateRoute.snapshot.params.id;
    if (!!this.currentid) {
       this.employeePay.GetHistoryPaytsByIdEmployee(this.currentid).then((data)=> { this.dataSource.data = data;
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       console.log(this.dataSource.data);
      });
  }
  }
}
