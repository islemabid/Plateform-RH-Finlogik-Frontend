import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isLoading: boolean;

  constructor(private router: Router) {

    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {

        this.showSidebar = true;
        this.showNavbar = true;
        this.showFooter = true;
        document.querySelector('.main-panel').classList.remove('w-100');
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
        document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
        document.querySelector('.content-wrapper').classList.remove('p-0');

      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }



  ngOnInit() {

    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
