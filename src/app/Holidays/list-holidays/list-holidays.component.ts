
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { HolidaysService } from 'src/services/holidays.service';

@Component({
  selector: 'app-list-holidays',
  templateUrl: './list-holidays.component.html',
  styleUrls: ['./list-holidays.component.scss']
})
export class ListHolidaysComponent implements OnInit {

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
  constructor(private holidayService:HolidaysService) {}
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  getallHolidays(){
    this.holidayService.GetAllHolidays().then(data=>{
      let event=[];
      event.push(data);
      console.log(event);
    
      
    })
  }
  ngOnInit() {
      this.getallHolidays();
     
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events,
      };
    
  }


}
