import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationCountResult, NotificationResult } from 'src/models/Notification';
import { EmployeeService } from 'src/services/employee.service';
import { LoginService } from 'src/services/login.service';
import { NotificationService } from 'src/services/notification.service';
import * as signalR from '@microsoft/signalr'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  @Input() displayNotificationIcon: boolean = true;
  notification: NotificationCountResult;  
  messages: NotificationResult[];  
  errorMessage = ''; 
  decode: any;
  iduser: any;
  employeeInfo: any;
  constructor(config: NgbDropdownConfig, private login: LoginService,private notificationService: NotificationService, private employeeService: EmployeeService, private router: Router) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    if (localStorage.getItem("jwt")) {
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.iduser = this.decode["UserId"];
    }
    console.log(this.iduser);
    this.getUserByID();
    this.getNotificationCount();
    this.getNotificationMessage();

    const connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl('https://localhost:7152/notify')  
      .build();  
    
  
    connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
  
    connection.on("BroadcastMessage", () => {  
      this.getNotificationCount();  
      this.getNotificationMessage();
    });  
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if ((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }


  public createImgPath = (serverPath: string) => {
    return `https://localhost:7152/${serverPath}`;
  }


  logout() {
    this.login.logOut();
  }


  showProfil() {
    this.router.navigate(['profil/personal']);
  }


  getUserByID() {
    this.employeeService.getEmpById(this.iduser).then((data) => {
      this.employeeInfo = data;
      console.log(this.employeeInfo);
    }
    )
  }

  getNotificationCount() {  
    this.notificationService.getNotificationCount().then(  
      notification => {  
        this.notification = notification;  
      }
    );  
  }


  getNotificationMessage() {  
    this.notificationService.getNotificationMessage().then(  
      messages => {  
        this.messages = messages; 
        console.log(this.messages);
      } 
      
    );  
  }  
  
  


}
