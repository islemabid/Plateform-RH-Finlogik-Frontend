import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { ContratService } from 'src/services/contrat.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DialogModalContratComponent } from '../dialog-modal-contrat/dialog-modal-contrat.component';
import { Contrats } from 'src/models/Contrats';

@Component({
  selector: 'app-list-contrats',
  templateUrl: './list-contrats.component.html',
  styleUrls: ['./list-contrats.component.scss']
})
export class ListContratsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;

  rh = false;
  dataSource: MatTableDataSource<Contrats> = new MatTableDataSource(this.contratService.tab);
  displayedColumns: string[] = ["shortDescription", "LongDescription", "Actions"];

  constructor(private contratService: ContratService, private login: LoginService, private dialog: MatDialog) {
    const Contrats = Array.from({ length: 100 });
    this.dataSource = new MatTableDataSource(this.contratService.tab);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) { 
          console.log(id);
          this.contratService.RemoveContratById(id).then(() => this.GetAllContrats());

        }
      }

    )
  }
  create() {
    this.dialog.open(DialogModalContratComponent, { width: "350px" }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.GetAllContrats();
      }
    });
  }
  edit(row: any) {
    this.dialog.open(DialogModalContratComponent, { width: "350px", data: row }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.GetAllContrats();
      }
    });
  }

  GetAllContrats(): void {


    this.contratService.GetALL()
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

    this.GetAllContrats();

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
