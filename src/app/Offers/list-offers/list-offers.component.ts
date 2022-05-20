import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Offers } from 'src/models/Offer';
import { AlertNotificationService } from 'src/services/alert-notification.service';
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
  code :any;
  idOffer:any;

  dataSource: MatTableDataSource<Offers> = new MatTableDataSource(this.offerService.tab);
  displayedColumns: string[] = ["Name", "Type","Actions"];



  constructor(private offerService: OfferService,private acivateRoute: ActivatedRoute,private alertNotification:AlertNotificationService, private login: LoginService, private dialog: MatDialog) {
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
    this.dialog.open(DialogModalOfferComponent, { width: "500px" }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.GetOffers();
      }
    });
  }
  edit(row: any) {
    this.dialog.open(DialogModalOfferComponent, { width: "500px", data: row }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.GetOffers();
      }
    });
  }
  GetOffers(): void {
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
  GetLinkedinApi(idoffer:any) {
   
    window.location.href = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78garf686nkvua&redirect_uri=http://localhost:4200/Offers&scope=r_liteprofile%20r_emailaddress%20w_member_social&state="+idoffer;

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
   this.code=this.acivateRoute.snapshot.queryParams.code;
    this.idOffer=this.acivateRoute.snapshot.queryParams.state;
    let OfferById={"id":this.idOffer};
    console.log(this.idOffer);
     if(!!this.code) {
    
       this.offerService.PostOfferInLinkedin(this.code,OfferById).then(()=>{
        this.alertNotification.showNotification("Offer post successfully  in linkedin !","OK");
       })
    }
  }

}

