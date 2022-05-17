import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-filters-payroll',
  templateUrl: './filters-payroll.component.html',
  styleUrls: ['./filters-payroll.component.scss']
})
export class FiltersPayrollComponent implements OnInit {
  @Output() filtersChanged: EventEmitter<object> = new EventEmitter<object>();
  selectedYear: string;
  selectedMounth:string;
  selectedEmployee:string;
  employees:any;
  years = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  mounths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(private employee: EmployeeService) { }
  searchPayRollsHandler() {
    console.log(this.selectedYear, this.selectedMounth,this.selectedEmployee);
    this.filtersChanged.emit({ selectedYear: this.selectedYear, selectedMounth: this.selectedMounth, selectedEmployee:this.selectedEmployee});
  }
  ngOnInit(): void {
    this.GetEmployees();
  }
  GetEmployees(): void {
    this.employee.GetALL()
   .then((data) => {
    this.employees=data;
   
    
   });


}

}



