import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [
    ConfirmDialogComponent,

  ],
  imports: [
    MaterialModule,



  ],
  entryComponents: [
    ConfirmDialogComponent,

  ],
})
export class ConfirmDialogModule {
}
