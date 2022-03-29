import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TimeOffBalances } from 'src/models/TimeOffBalances';
import { EmployeeService } from 'src/services/employee.service';
import { TimeOffBalancesService } from 'src/services/time-off-balances.service';

@Component({
  selector: 'app-time-off-balances',
  templateUrl: './time-off-balances.component.html',
  styleUrls: ['./time-off-balances.component.scss']
})
export class TimeOffBalancesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<TimeOffBalances> = new MatTableDataSource(this.timeOffBalancesService.tab);
  displayedColumns: string[] = ["EmployeeFullName", "StartDate", "EndDate", "type", "Status", "Actions"];
  constructor(private timeOffBalancesService: TimeOffBalancesService, private employeeservice: EmployeeService) {
    const timeoffBalances = Array.from({ length: 100 });
    this.dataSource = new MatTableDataSource(this.timeOffBalancesService.tab);
  }

  ngOnInit(): void {
    this.GetAllTimeOffBalances();
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

}
