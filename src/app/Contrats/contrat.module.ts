import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratService } from 'src/services/contrat.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DialogModalContratComponent } from './dialog-modal-contrat/dialog-modal-contrat.component';
import { ListContratsComponent } from './list-contrats/list-contrats.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListContratsComponent },


]


@NgModule({
  declarations: [ListContratsComponent, DialogModalContratComponent],
  entryComponents: [
    DialogModalContratComponent,

  ],
  imports: [

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ContratService]
})
export class ContratModule { }
