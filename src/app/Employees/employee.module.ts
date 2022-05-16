import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { MaterialModule } from '../material.module';
import { EmployeeService } from 'src/services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModalEmployeeComponent } from './dialog-modal-employee/dialog-modal-employee.component';
import { DetailsEmployeePostsComponent } from './details-employee-posts/details-employee-posts.component';
import { UploadComponent } from '../FilesUploadOrDownload/upload/upload.component';
import { EmployeePayRoolDetailsComponent } from './employee-pay-rool-details/employee-pay-rool-details.component';






const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListEmployeeComponent },
  { path: ':id/details', pathMatch: 'full', component: DetailsEmployeePostsComponent },
  { path: ':id/PayRool', pathMatch: 'full', component: EmployeePayRoolDetailsComponent },


]

@NgModule({
  declarations: [ListEmployeeComponent, UploadComponent, DialogModalEmployeeComponent, DetailsEmployeePostsComponent,EmployeePayRoolDetailsComponent],
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
