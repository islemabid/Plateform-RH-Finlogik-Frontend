import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Departements } from 'src/models/Departement';
import { DepartementService } from 'src/services/departement.service';
import { LoginService } from 'src/services/login.service';
import { DialogModalDepartementComponent } from '../dialog-modal-departement/dialog-modal-departement.component';


@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.scss']
})
export class ListDepartementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;

  dataSource: MatTableDataSource<Departements> = new MatTableDataSource(this.ms.tab);
  displayedColumns: string[] = ["Name", "Description", "Actions"];



  constructor(private ms: DepartementService, private login: LoginService, private dialog: MatDialog) {
    const Departements = Array.from({ length: 100 });
    this.dataSource = new MatTableDataSource(this.ms.tab);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.ms.RemoveDepById(id).then(() => this.GetDepartements());

        }
      }

    )
  }
  create() {
    this.dialog.open(DialogModalDepartementComponent, { width: "600px" }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.GetDepartements();
      }
    });
  }
  edit(row: any) {
    this.dialog.open(DialogModalDepartementComponent, { width: "600px", data: row }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.GetDepartements();
      }
    });
  }
  GetDepartements(): void {
      this.ms.GetALL()
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
    this.GetDepartements();
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
