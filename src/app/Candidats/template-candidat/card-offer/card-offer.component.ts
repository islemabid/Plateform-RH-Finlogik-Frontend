import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-offer',
  templateUrl: './card-offer.component.html',
  styleUrls: ['./card-offer.component.scss']
})
export class CardOfferComponent implements OnInit {

  @Input() offer;
  @Input() displayApply: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
