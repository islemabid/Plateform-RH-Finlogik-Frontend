import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ListDepartementComponent } from './list-departement/list-departement.component';
import { FormDepartementComponent } from './form-departement/form-departement.component';
import { MaterialModule } from '../material.module';
import { DepartementService } from 'src/services/departement.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'departements', pathMatch: 'full', component: ListDepartementComponent },
  { path: 'departements/:id/edit', pathMatch: 'full', component: FormDepartementComponent },
  { path: 'FormDep', pathMatch: 'full', component: FormDepartementComponent }
]

@NgModule({
  declarations: [ListDepartementComponent, FormDepartementComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,


    RouterModule.forChild(routes)
  ],
  providers: [DepartementService]

})
export class DepartementModule { }
