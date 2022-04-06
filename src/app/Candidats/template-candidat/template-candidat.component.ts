import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/services/offer.service';

@Component({
  selector: 'app-template-candidat',
  templateUrl: './template-candidat.component.html',
  styleUrls: ['./template-candidat.component.scss']
})
export class TemplateCandidatComponent implements OnInit {

  offers:any;
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.GetOffers();
  }
 
 
  GetOffers(): void {
    this.offerService.GetALL()
      .then((data) => {
        this.offers = data;
       console.log(this.offers);

      }); }
}
