import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListLeaveRequestComponent } from './list-leave-request/list-leave-request.component';
import { RequestTimeOffComponent } from './request-time-off/request-time-off.component';
import { FilterLeavesComponent } from './filter-leaves/filter-leaves.component';
import { TimeOffBalancesComponent } from './time-off-balances.component';



const routes: Routes = [
  { path: 'NewLeaveRequest', component: RequestTimeOffComponent },
  { path: '', component: ListLeaveRequestComponent },
  { path: 'TimeOffBalances', component: TimeOffBalancesComponent },
 


]


@NgModule({
  declarations: [ListLeaveRequestComponent, RequestTimeOffComponent,FilterLeavesComponent,TimeOffBalancesComponent],

  imports: [

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe]
})
export class TimeoffbalancesModule { }
