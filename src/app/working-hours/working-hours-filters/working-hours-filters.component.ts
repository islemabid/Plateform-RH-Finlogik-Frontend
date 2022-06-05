
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-working-hours-filters',
  templateUrl: './working-hours-filters.component.html',
  styleUrls: ['./working-hours-filters.component.scss']
})
export class WorkingHoursFiltersComponent implements OnInit {
  @Output() filtersChanged: EventEmitter<object> = new EventEmitter<object>();
  Employees:any;
  selectedType:string;
 
  
  
  constructor(private ms: EmployeeService) { }

  ngOnInit(): void {
    this.GetEmployees();
  }
 
 
  GetEmployees(): void {
   this.ms.GetALL()
      .then((data) => {
       this.Employees=data;
      });


  }
  searchHandler() {
    
    this.filtersChanged.emit({ type: this.selectedType});
  }

}
