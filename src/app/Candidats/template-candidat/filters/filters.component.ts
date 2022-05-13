import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContratService } from 'src/services/contrat.service';



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() filtersChanged: EventEmitter<object> = new EventEmitter<object>();
  @Input() displayKeywords: boolean = true;
  @Input() displayAssignementDate: boolean = false;
  contractTypes:any;
  selectedType: string;
  keywords: string;
  AssignementDate:Date;

  constructor(private contratsservice: ContratService,) { }

  ngOnInit(): void {
    this.GetAllContrats();
  }
  searchOffersHandler() {
    console.log(this.selectedType, this.keywords,this.AssignementDate);
    this.filtersChanged.emit({ type: this.selectedType, keywords: this.keywords, Date:this.AssignementDate});
  }
    
  GetAllContrats() {
    this.contratsservice.GetALL().then((data) => {
      this.contractTypes = data;
     
    }
    )
  }
}
