
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


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
  selectedType:string;
  LeaveTypes: string[] = ['Waiting','validated', 'rejected','canceled'];
  constructor() { }

  ngOnInit(): void {

  }
  searchLeavesHandler() {
    console.log(this.startDate, this.endDate);
    this.filtersChanged.emit({ type: this.selectedType, endDate: this.endDate, startDate:this.startDate});
  }
}
