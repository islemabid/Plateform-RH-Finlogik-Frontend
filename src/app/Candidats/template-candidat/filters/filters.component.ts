import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() filtersChanged: EventEmitter<object> = new EventEmitter<object>();
  @Input() displayKeywords: boolean = true;
  @Input() displayAssignementDate: boolean = false;
  contractTypes: string[] = ['Internship','CDI', 'CDD', 'CIVP', 'Freelance'];
  selectedType: string;
  keywords: string;
  AssignementDate:Date;

  constructor() { }

  ngOnInit(): void {
    
  }
  searchOffersHandler() {
    console.log(this.selectedType, this.keywords,this.AssignementDate);
    this.filtersChanged.emit({ type: this.selectedType, keywords: this.keywords, Date:this.AssignementDate});
  }
}
