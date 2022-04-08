import { Component, OnInit, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() filtersChanged: EventEmitter<object> = new EventEmitter<object>();
  contractTypes: string[] = ['Internship','CDI', 'CDD', 'CIVP', 'Freelance'];
  selectedType: string;
  keywords: string;

  constructor() { }

  ngOnInit(): void {
    
  }
  searchOffersHandler() {
    console.log(this.selectedType, this.keywords);
    this.filtersChanged.emit({ type: this.selectedType, keywords: this.keywords });
  }
}
