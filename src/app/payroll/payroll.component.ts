import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeePay } from 'src/models/EmployeePay';
import { EmployeePayService } from 'src/services/employee-pay.service';
import { LoginService } from 'src/services/login.service';
import { AddEmployeePayComponent } from './add-employee-pay/add-employee-pay.component';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;

  rh = false;
  dataSource: MatTableDataSource<EmployeePay> = new MatTableDataSource(this.employeePay.tab);
  displayedColumns: string[] = ["Employee", "Mounth", "Year", "Salary", "MealTicket", "TicketPassGift","Prime","Check"];

  constructor(private employeePay: EmployeePayService, private login: LoginService, private dialog: MatDialog) {

    this.dataSource = new MatTableDataSource(this.employeePay.tab);
  }

  create() {
    this.dialog.open(AddEmployeePayComponent, { width: "600px" }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.GetEmployeePays();
      }
    });
  }


  GetEmployeePays(): void {
   

    this.employeePay.GetALL()
      .then((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);

      });


  }


 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {

    this.GetEmployeePays();

    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (this.role == 'Ressources Humaines') {
        this.rh = true;
      }

    }

  }
  async filtersChangedHandler(filters) {
    this.dataSource.data = await this.employeePay.GetALL();
    const { selectedYear, selectedMounth,selectedEmployee } = filters;
    this.dataSource.data = this.dataSource.data.filter(res=> {
      const selectedYearCondition =  selectedYear? res.year.includes(selectedYear) : true;
      const selectedMounthCondition =  selectedMounth? res.mounth.includes(selectedMounth) : true;
      const selectedEmployeeCondition =  selectedEmployee? res.idEmployee.includes(selectedEmployee) : true;
      return selectedYearCondition && selectedMounthCondition && selectedEmployeeCondition ;
    })
  }

}
