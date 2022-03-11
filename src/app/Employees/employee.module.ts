import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { MaterialModule } from '../material.module';
import { EmployeeService } from 'src/services/employee.service';
import { UploadComponent } from '../upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: 'employees', pathMatch: 'full', component: ListEmployeeComponent },
  { path: 'FormEmp', pathMatch: 'full', component: FormEmployeeComponent },
  { path: 'employees/:id/edit', pathMatch: 'full', component: FormEmployeeComponent },
]

@NgModule({
  declarations: [ListEmployeeComponent, FormEmployeeComponent, UploadComponent],
  imports: [

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
