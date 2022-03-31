import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { MaterialModule } from '../material.module';
import { EmployeeService } from 'src/services/employee.service';
import { UploadComponent } from '../upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModalEmployeeComponent } from './dialog-modal-employee/dialog-modal-employee.component';
import { DetailsEmployeePostsComponent } from './details-employee-posts/details-employee-posts.component';





const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListEmployeeComponent },
  { path: ':id/details', pathMatch: 'full', component: DetailsEmployeePostsComponent },


]

@NgModule({
  declarations: [ListEmployeeComponent, UploadComponent, DialogModalEmployeeComponent, DetailsEmployeePostsComponent],
  entryComponents: [
    DialogModalEmployeeComponent,

  ],
  imports: [

    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
