import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CandidatsService } from 'src/services/candidats.service';
import { FileService } from 'src/services/file.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-list-candidats',
  templateUrl: './list-candidats.component.html',
  styleUrls: ['./list-candidats.component.scss']
})
export class ListCandidatsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;



  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.candidatService.tab);
  displayedColumns: string[] = ["FirstName", "LastName","Email","PhoneNumber", "CV","CoverLetter","AssignmentDate","Offer Name","Contrat Type","Actions"];

  constructor(private candidatService:CandidatsService,private login: LoginService,private fileService:FileService) { }

  ngOnInit(): void {
    this.GetAllApplicationOffers();
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (this.role == 'Ressources Humaines') {
        this.rh = true;
      }

    }
  }
  
  GetAllApplicationOffers(){
    this.candidatService.GetAllApplicationOffers().then((data)=>{
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);

    })
  }
  async filtersChangedHandler(filters) {
    this.dataSource.data = await this.candidatService.GetAllApplicationOffers();
    const { type, Date } = filters;
    this.dataSource.data = this.dataSource.data.filter(data => {
     const typeCondition = type ? data.offer.type.includes(type) : true;
      let dateCondition = true;
      if (Date) {
       data.assignmentDate= formatDate( data.assignmentDate.toString(), 'dd-MM-yyyy','en-US');
       let date=formatDate(Date.toString(), 'dd-MM-yyyy','en-US');
       dateCondition =date.includes(data.assignmentDate);
       }
      return typeCondition && dateCondition;
    })
  }


 
}