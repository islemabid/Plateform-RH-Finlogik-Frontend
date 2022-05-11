import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-filter-leaves',
  templateUrl: './filter-leaves.component.html',
  styleUrls: ['./filter-leaves.component.scss']
})
export class FilterLeavesComponent implements OnInit {
  @Output() filtersChanged: EventEmitter<object> = new EventEmitter<object>();
  startDate:Date;
  endDate:Date;
  LeaveRequestList:any;
  isLoggedIn = false;
  selectedType:string;
  idEmployee:string;
  currentEmployee:any;
  role: any;
  decode: any;
  employee = false;
  LeaveTypes: string[] = ['Waiting','validated', 'rejected'];
  constructor(private login: LoginService) { }

  ngOnInit(): void {
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      this.idEmployee= this.decode["UserId"];
      if (this.role == 'employee') {
        this.employee = true;
      }
    }
  }
  searchLeavesHandler() {
    console.log(this.startDate, this.endDate);
    this.filtersChanged.emit({ type: this.selectedType, endDate: this.endDate, startDate:this.startDate});
  }
}
