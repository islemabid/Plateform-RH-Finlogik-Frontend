import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysService } from 'src/services/holidays.service';
import { CreateHolidaysComponent } from './create-holidays/create-holidays.component';
import { ListHolidaysComponent } from './list-holidays/list-holidays.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);
const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListHolidaysComponent },
]
@NgModule({
  declarations: [ListHolidaysComponent, CreateHolidaysComponent],
 
  imports: [

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild(routes)
  ],
  providers: [HolidaysService]
})
export class HolidaysModule { }
