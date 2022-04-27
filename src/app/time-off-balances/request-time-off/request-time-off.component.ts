import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-time-off',
  templateUrl: './request-time-off.component.html',
  styleUrls: ['./request-time-off.component.scss']
})
export class RequestTimeOffComponent implements OnInit {

  StartDate:Date;
  EndDate:Date;

  constructor() { }

  ngOnInit(): void {
  }


}
