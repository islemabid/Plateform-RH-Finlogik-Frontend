import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TimeOffBalances } from 'src/models/TimeOffBalances';
import { LoginService } from 'src/services/login.service';
import { TimeOffBalancesService } from 'src/services/time-off-balances.service';

@Component({
  selector: 'app-time-off-balances',
  templateUrl: './time-off-balances.component.html',
  styleUrls: ['./time-off-balances.component.scss']
})
export class TimeOffBalancesComponent implements OnInit {
  isLoggedIn = false;
  idEmployee:string;
  role: any;
  decode: any;
   rh = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<TimeOffBalances> = new MatTableDataSource(this.timeOffBalancesService.tab);
  displayedColumns: string[] = ["EmployeeFullName","type", "Status", "StartDate", "EndDate",  "Actions"];
  constructor(private timeOffBalancesService: TimeOffBalancesService,private login: LoginService) {
    const timeoffBalances = Array.from({ length: 100 });
    this.dataSource = new MatTableDataSource(this.timeOffBalancesService.tab);
  }

  ngOnInit(): void {
    this.GetAllTimeOffBalances();
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.idEmployee= this.decode["UserId"];
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (this.role == 'Ressources Humaines') {
        this.rh = true;
      }

    }
  }

  GetAllTimeOffBalances(): void {
    this.timeOffBalancesService.GetALL()
      .then((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        

      });
  }
  validate(data) {
    
    this.timeOffBalancesService.Validate(data).then(() => {
      this.GetAllTimeOffBalances();

    });

  }
  refuse(data) {
    
   this.timeOffBalancesService.Refuse(data).then(() => {
      this.GetAllTimeOffBalances();
   });

  }
  async filtersChangedHandler(filters) {
    this.dataSource.data = await this.timeOffBalancesService.GetALL();
    const { type, endDate,startDate } = filters;
    this.dataSource.data = this.dataSource.data.filter(data => {
      const typeCondition = type ? data.state.includes(type) : true;
      let startdateCondition = true;
      let enddateCondition = true;
      if (startDate && endDate) {
        data.startDate= formatDate( data.startDate.toString(), 'MM-dd-yyyy','en-US');
        let start=formatDate(startDate.toString(), 'MM-dd-yyyy','en-US');
        startdateCondition =start.includes(data.startDate);
        data.endDate= formatDate( data.endDate.toString(), 'MM-dd-yyyy','en-US');
        let end=formatDate(endDate.toString(), 'MM-dd-yyyy','en-US');
        enddateCondition =end.includes(data.endDate);
      }
    
      return startdateCondition && enddateCondition && typeCondition;
    })
  }

}
