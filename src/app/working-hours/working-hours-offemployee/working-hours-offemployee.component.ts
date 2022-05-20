import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkingHours } from 'src/models/WorkingHours';
import { EmployeeService } from 'src/services/employee.service';
import { LoginService } from 'src/services/login.service';
import { PointageService } from 'src/services/pointage.service';


@Component({
  selector: 'app-working-hours-offemployee',
  templateUrl: './working-hours-offemployee.component.html',
  styleUrls: ['./working-hours-offemployee.component.scss']
})
export class WorkingHoursOffemployeeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  idEmployee:string;
  decode: any;
   employee = false;
   employeeFullName:string;
  dataSource: MatTableDataSource<WorkingHours> = new MatTableDataSource(this.ms.tab);
  displayedColumns: string[] = [  "Date", "Hours"];

  constructor(private ms: PointageService, private login: LoginService,private employeeService:EmployeeService) {

    this.dataSource = new MatTableDataSource(this.ms.tab);
  }

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


  async filtersChangedHandler(filters){
    this.dataSource.data = await this.ms.GetallWorkingHoursOfAllEmployees();
    const { type, Date } = filters;
    
    this.dataSource.data = this.dataSource.data.filter(data => {
      const typeCondition = type ? data.idEmployee.includes(type) : true;
      let dateCondition = true;
      if (Date) {
       let date= formatDate( Date.toString(), 'dd-MM-yyyy','en-US');
       data.date= formatDate( data.date, 'dd-MM-yyyy','en-US');
       
       dateCondition =date.includes(data.date);
       }
       return typeCondition && dateCondition ;
  });

  }
  GetAllWorkingHoursOffEmployee(){
    this.ms.GetAllWorkingHoursByIdEmployee(this.idEmployee)
    .then((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);

    });
  }
}
