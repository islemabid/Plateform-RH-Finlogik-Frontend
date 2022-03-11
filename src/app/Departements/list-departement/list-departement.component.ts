import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Departements } from 'src/models/Departement';
import { DepartementService } from 'src/services/departement.service';


@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent implements OnInit {



  dataSource: MatTableDataSource<Departements> = new MatTableDataSource(this.ms.tab);
  displayedColumns: string[] = ["name", "description", "Actions"];
  constructor(private ms: DepartementService, private dialog: MatDialog) {
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
  GetDepartements(): void {

    this.ms.GetALL()
      .then((data) => {
        this.dataSource.data = data;
        console.log(this.dataSource.data);

      });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }


  ngOnInit(): void {
    this.GetDepartements();
  }

}
