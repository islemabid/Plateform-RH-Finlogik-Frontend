import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkingHours } from 'src/models/WorkingHours';
import { LoginService } from 'src/services/login.service';
import { PointageService } from 'src/services/pointage.service';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss']
})
export class WorkingHoursComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;
  dataSource: MatTableDataSource<WorkingHours> = new MatTableDataSource(this.ms.tab);
  displayedColumns: string[] = [ "FullName", "IdEmployee", "Date", "Hours"];

  constructor(private ms: PointageService, private login: LoginService) {

    this.dataSource = new MatTableDataSource(this.ms.tab);
  }

  ngOnInit(): void {
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (this.role == 'Ressources Humaines') {
        this.rh = true;
      }

    }
    this.GetAllWorkingHours();

  }
 async filtersChangedHandler(filters){

      this.dataSource.data = await this.ms.GetallWorkingHoursOfAllEmployees();
      const { type, Date } = filters;
      this.dataSource.data = this.dataSource.data.filter(data => {
        const typeCondition = type ? data.employeeFullName.includes(type) : true;
        let dateCondition = true;
        if (Date) {
         let date= formatDate( Date.toString(), 'dd-MM-yyyy','en-US');
         data.date= formatDate( data.date, 'dd-MM-yyyy','en-US');
         
         dateCondition =date.includes(data.date);
         }
         return typeCondition && dateCondition ;
    });
  
    }
  

  GetAllWorkingHours(){
    this.ms.GetallWorkingHoursOfAllEmployees()
    .then((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);

    });
  }
 

}
