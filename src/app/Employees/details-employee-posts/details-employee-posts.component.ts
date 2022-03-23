import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryemployeeService } from 'src/services/History-employee.service';



@Component({
  selector: 'app-details-employee-posts',
  templateUrl: './details-employee-posts.component.html',
  styleUrls: ['./details-employee-posts.component.scss']
})
export class DetailsEmployeePostsComponent implements OnInit {
  currentid: any;
  detailsPosts: any;
  detailsContrats: any;
  constructor(private acivateRoute: ActivatedRoute, private historyService: HistoryemployeeService) { }

  ngOnInit(): void {
    this.currentid = this.acivateRoute.snapshot.params.id;
    if (!!this.currentid) {
      this.historyService.GetHistoryPostsByIdEmployee(this.currentid).then(
        (item) => {
          this.detailsPosts = item;
          console.log(this.detailsContrats);
        }


      );
      this.historyService.GetHistoryContratsByIdEmployee(this.currentid).then(
        (item) => {
          this.detailsContrats = item;
          console.log(this.detailsContrats);
        });


    }

  }
}
