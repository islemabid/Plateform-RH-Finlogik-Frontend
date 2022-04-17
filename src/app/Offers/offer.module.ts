import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListOffersComponent } from './list-offers/list-offers.component';
import { DialogModalOfferComponent } from './dialog-modal-offer/dialog-modal-offer.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferService } from 'src/services/offer.service';



const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListOffersComponent },
  { path: 'code=:code', pathMatch: 'full', component: ListOffersComponent },


]

@NgModule({
  declarations: [ListOffersComponent,DialogModalOfferComponent],
  entryComponents: [
    DialogModalOfferComponent,

  ],
  imports: [

    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [OfferService]
})
export class OfferModule { }
