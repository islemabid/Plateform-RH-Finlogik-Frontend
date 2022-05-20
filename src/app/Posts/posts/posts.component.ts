import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DialogModalPostComponent } from '../dialog-modal-post/dialog-modal-post.component';
import { Posts } from 'src/models/Post';
import { ViewChild } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { LoginService } from 'src/services/login.service';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;

  rh = false;
  dataSource: MatTableDataSource<Posts> = new MatTableDataSource(this.postService.tab);
  displayedColumns: string[] = ["shortDescription", "LongDescription", "Actions"];

  constructor(private postService: PostService, private login: LoginService, private dialog: MatDialog) {
    const Posts = Array.from({ length: 100 });
    this.dataSource = new MatTableDataSource(this.postService.tab);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.postService.RemovePostById(id).then(() => this.GetAllPosts());

        }
      }

    )
  }
  create() {
    this.dialog.open(DialogModalPostComponent, { width: "600px" }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.GetAllPosts();
      }
    });
  }
  edit(row: any) {
    this.dialog.open(DialogModalPostComponent, { width: "600px", data: row }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.GetAllPosts();
      }
    });
  }

  GetAllPosts(): void {
   

    this.postService.GetALL()
      .then((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      

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

    this.GetAllPosts();

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
