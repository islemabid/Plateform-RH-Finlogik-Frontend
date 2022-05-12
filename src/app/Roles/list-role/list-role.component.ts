import { RoleService } from 'src/services/role.service';
import { LoginService } from 'src/services/login.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DialogModalRoleComponent } from '../dialog-modal-role/dialog-modal-role.component';
import { Roles } from 'src/models/Role';


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;

  rh = false;
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource(this.roleService.tab);
  displayedColumns: string[] = ["name", "Actions"];

  constructor(private roleService: RoleService, private login: LoginService, private dialog: MatDialog) {
    const Roles = Array.from({ length: 100 });
    this.dataSource = new MatTableDataSource(this.roleService.tab);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.roleService.RemoveRoleById(id).then(() => this.GetAllRoles());

        }
      }

    )
  }
  create() {
    this.dialog.open(DialogModalRoleComponent, { width: "600px" }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.GetAllRoles();
      }
    });
  }
  edit(row: any) {
    this.dialog.open(DialogModalRoleComponent, { width: "600px", data: row }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.GetAllRoles();
      }
    });
  }

  GetAllRoles(): void {
  

    this.roleService.GetALL()
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

    this.GetAllRoles();

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
