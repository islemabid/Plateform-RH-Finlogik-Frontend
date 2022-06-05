import { formatDate } from '@angular/common';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CalendarOptions } from '@fullcalendar/angular';
import { WorkingHours } from 'src/models/WorkingHours';
import { LoginService } from 'src/services/login.service';
import { PointageService } from 'src/services/pointage.service';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss']
})
export class WorkingHoursComponent implements OnInit {


  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;
  Events: any[];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events:[]
  };



  constructor(private ms: PointageService, private login: LoginService) {}

  ngOnInit(): void {
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (this.role == 'Ressources Humaines') {
        this.rh = true;
      }

    }
    this.GetAllWorkingHours();

  }
  
 async filtersChangedHandler(filters){

      this.Events = await this.ms.GetallWorkingHoursOfAllEmployees();
      this.calendarOptions.events=this.Events.map(event => ({ title: event.employeeFullName+" : "+event.hours+" h", date: event.date.split('T')[0] }));
      
      const { type } = filters;
      this.calendarOptions.events = this.calendarOptions.events.filter(data => {
       const typeCondition = type ? data.title.includes(type) : true;
       return typeCondition  ;
      });
  
 }
  

  GetAllWorkingHours(){
    this.ms.GetallWorkingHoursOfAllEmployees()
    .then((data) => {
      this.Events=data;
      this.calendarOptions = {
       initialView: 'dayGridMonth',
       events: []
     };
   });
     

    
  }
 

}
