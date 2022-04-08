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
      }); 
    }

    async filtersChangedHandler(filters) {
      this.offers = await this.offerService.GetALL();
      const { type, keywords } = filters;
      this.offers = this.offers.filter(offer => {
        const typeCondition = type ? offer.type.includes(type) : true;
        let keywordsCondition = true;
        if (keywords) {
          const words = keywords.split(' ');
          keywordsCondition = words.some(word => offer.offerName.includes(word) || offer.offerDescription.includes(word));
        }
        return typeCondition && keywordsCondition;
      })
    }
}
