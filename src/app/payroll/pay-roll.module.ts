import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PayrollComponent } from './payroll.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EmployeePayService } from 'src/services/employee-pay.service';
import { AddEmployeePayComponent } from './add-employee-pay/add-employee-pay.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: PayrollComponent },



]

@NgModule({
  declarations: [PayrollComponent,AddEmployeePayComponent],
  entryComponents: [
    AddEmployeePayComponent

  ],
  imports: [

    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [EmployeePayService]
})
export class PayRollModule { }
