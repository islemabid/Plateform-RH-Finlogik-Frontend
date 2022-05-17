import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { HolidaysService } from 'src/services/holidays.service';

@Component({
  selector: 'app-list-holidays',
  templateUrl: './list-holidays.component.html',
  styleUrls: ['./list-holidays.component.scss']
})
export class ListHolidaysComponent implements OnInit {

  Events: any[] = [{"title":"","startDate":new Date(),"endDate":new Date(),"color":""}]
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
    events:this.Events
  };
  constructor(private holidayService:HolidaysService) {}
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  ngOnInit() {
    setTimeout(() => {
     this.holidayService.GetAllHolidays().then((data)=>{
       console.log(data);
       this.Events.push({"title":data.name,"startDate":data.startDate,"endDate":data.endDate,"color":"#FF0000"});
       console.log(this.Events);
      
      });
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events,
      };
    }, 2500);
  }


}
