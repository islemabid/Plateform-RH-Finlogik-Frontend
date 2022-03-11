import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { EmployeeService } from 'src/services/employee.service';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees: any;
  Employees: any;
  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;

  constructor(private ms: EmployeeService, private login: LoginService, private dialog: MatDialog, private http: HttpClient) {

  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
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


  GetEmployees(): void {
    console.log(localStorage.getItem("jwt"));

    this.ms.GetALL()
      .then((data) => {
        this.employees = data;
        console.log(this.employees);

      });


  }


  public createImgPath = (serverPath: string) => {
    return `https://localhost:7152/${serverPath}`;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employees.filter = filterValue.trim().toLowerCase();


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

