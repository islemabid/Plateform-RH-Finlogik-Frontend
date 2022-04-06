import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { TemplateCandidatComponent } from './template-candidat/template-candidat.component';
import { ApplyOfferComponent } from './apply-offer/apply-offer.component';



const routes: Routes = [
  { path: 'candidat', pathMatch: 'full', component: TemplateCandidatComponent },
  { path: 'candidat/:id/Apply', pathMatch: 'full', component: ApplyOfferComponent },


]

@NgModule({
  declarations: [TemplateCandidatComponent, ApplyOfferComponent],
  imports: [

    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class CandidatModule { }
