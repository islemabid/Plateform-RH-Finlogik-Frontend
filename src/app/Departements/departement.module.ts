import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartementComponent } from './list-departement/list-departement.component';
import { DialogModalDepartementComponent } from './dialog-modal-departement/dialog-modal-departement.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartementService } from 'src/services/departement.service';



const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListDepartementComponent },


]


@NgModule({
  declarations: [ListDepartementComponent, DialogModalDepartementComponent],
  entryComponents: [
    DialogModalDepartementComponent,

  ],
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
