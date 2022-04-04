import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Offers } from 'src/models/Offer';
import { LoginService } from 'src/services/login.service';
import { OfferService } from 'src/services/offer.service';
import { DialogModalOfferComponent } from '../dialog-modal-offer/dialog-modal-offer.component';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})
export class ListOffersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;

  dataSource: MatTableDataSource<Offers> = new MatTableDataSource(this.offerService.tab);
  displayedColumns: string[] = ["Name", "Description", "Type","Actions"];



  constructor(private offerService: OfferService, private login: LoginService, private dialog: MatDialog) {
    const Departements = Array.from({ length: 100 });
    this.dataSource = new MatTableDataSource(this.offerService.tab);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.offerService.RemoveOfferById(id).then(() => this.GetOffers());

        }
      }

    )
  }
  create() {
    this.dialog.open(DialogModalOfferComponent, { width: "600px" }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.GetOffers();
      }
    });
  }
  edit(row: any) {
    this.dialog.open(DialogModalOfferComponent, { width: "600px", data: row }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.GetOffers();
      }
    });
  }
  GetOffers(): void {
    console.log(localStorage.getItem("jwt"));

    this.offerService.GetALL()
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
    this.GetOffers();
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

