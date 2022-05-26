
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Employees } from 'src/models/Employee';
import { EmployeeService } from 'src/services/employee.service';
import { LoginService } from 'src/services/login.service';
import { DialogModalEmployeeComponent } from '../dialog-modal-employee/dialog-modal-employee.component';




@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;
  dataSource: MatTableDataSource<Employees> = new MatTableDataSource(this.ms.tab);
  displayedColumns: string[] = ["Image", "FullName", "Email", "Adress", "PhoneNumber", "Actions"];

  constructor(private ms: EmployeeService, private login: LoginService, private dialog: MatDialog) {

    this.dataSource = new MatTableDataSource(this.ms.tab);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.ms.RemoveEmpById(id).then(() => this.GetEmployees());

        }
      }

    )
  }
  create() {
    this.dialog.open(DialogModalEmployeeComponent, { width: "600px" }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.GetEmployees();
      }
    });
  }
  edit(row: any) {
    this.dialog.open(DialogModalEmployeeComponent, { width: "600px", data: row }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.GetEmployees();
      }
    });
  }

  GetEmployees(): void {


    this.ms.GetALL()
      .then((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);

      });


  }


  public createImgPath = (serverPath: string) => {
    return `https://localhost:7152/${serverPath}`;

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  ngOnInit(): void {

    this.GetEmployees();

    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (this.role == 'Ressources Humaines') {
        this.rh = true;
      }

    }

  }

}

