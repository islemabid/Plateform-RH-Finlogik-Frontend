import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationCountResult, NotificationResult } from 'src/models/Notification';
import { EmployeeService } from 'src/services/employee.service';
import { LoginService } from 'src/services/login.service';
import { NotificationService } from 'src/services/notification.service';
import * as signalR from '@microsoft/signalr'; 
import { Pointages } from 'src/models/Pointage';
import { PointageService } from 'src/services/pointage.service';
import { AlertNotificationService } from 'src/services/alert-notification.service';


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
  constructor(config: NgbDropdownConfig,private pointage:PointageService,private alertNotification:AlertNotificationService, private login: LoginService,private notificationService: NotificationService, private employeeService: EmployeeService, private router: Router) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    if (localStorage.getItem("jwt")) {
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.iduser = this.decode["UserId"];
    }
    
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
    this.router.navigate(['profil']);
  }


  getUserByID() {
    this.employeeService.getEmpById(this.iduser).then((data) => {
      this.employeeInfo = data;
  
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
       
      } 
      
    );  
  } 
  
  deleteNotification(msg){
    this.notificationService.UpdateNotificationStatus(msg).then((data)=>{
     this. getNotificationCount()
      this.getNotificationMessage();
    })

  
  }
  in(){
    const PointageIn={
      action:"In",
      idEmployee:this.iduser
    } as Pointages;

    this.pointage.AddPointage(PointageIn).then((data)=>{
      this.alertNotification.showNotification("you have to click on the In button  "," ok!");
    });
  }
  
  out() {
    const PointageOut={
      action:"Out",
      idEmployee:this.iduser
    } as Pointages;

    this.pointage.AddPointage(PointageOut).then((data)=>{this.alertNotification.showNotification("you have to click on the Out button  "," ok!");
  });
  }


}
