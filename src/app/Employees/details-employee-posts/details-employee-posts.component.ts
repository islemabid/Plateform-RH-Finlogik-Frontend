import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AffectEmployeePostService } from 'src/services/affect-employee-post.service';

@Component({
  selector: 'app-details-employee-posts',
  templateUrl: './details-employee-posts.component.html',
  styleUrls: ['./details-employee-posts.component.scss']
})
export class DetailsEmployeePostsComponent implements OnInit {
  currentid: any;
  details: any;
  constructor(private ms: AffectEmployeePostService, private acivateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentid = this.acivateRoute.snapshot.params.id;
    if (!!this.currentid) {
      this.ms.GetPostsByIdEmployee(this.currentid).then(
        (item) => {
          this.details = item;
          console.log(this.details);
        }
      );
    }
  }

}
