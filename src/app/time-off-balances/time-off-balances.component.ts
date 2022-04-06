import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TimeOffBalances } from 'src/models/TimeOffBalances';
import { EmployeeService } from 'src/services/employee.service';
import { LoginService } from 'src/services/login.service';
import { TimeOffBalancesService } from 'src/services/time-off-balances.service';

@Component({
  selector: 'app-time-off-balances',
  templateUrl: './time-off-balances.component.html',
  styleUrls: ['./time-off-balances.component.scss']
})
export class TimeOffBalancesComponent implements OnInit {
  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<TimeOffBalances> = new MatTableDataSource(this.timeOffBalancesService.tab);
  displayedColumns: string[] = ["EmployeeFullName", "StartDate", "EndDate", "type", "Status", "Actions"];
  constructor(private timeOffBalancesService: TimeOffBalancesService,private login: LoginService) {
    const timeoffBalances = Array.from({ length: 100 });
    this.dataSource = new MatTableDataSource(this.timeOffBalancesService.tab);
  }

  ngOnInit(): void {
    this.GetAllTimeOffBalances();
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
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
        console.log(this.dataSource.data);

      });
  }
  validate(data) {
    data.isActive = true;
    this.timeOffBalancesService.UpdateStatus(data).then(() => {
      this.GetAllTimeOffBalances();


    });

  }
  refuse(data) {
    data.isActive = false;
    this.timeOffBalancesService.UpdateStatus(data).then(() => {
      this.GetAllTimeOffBalances();


    });

  }

}
