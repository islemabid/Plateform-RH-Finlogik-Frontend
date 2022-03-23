import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModalRoleComponent } from './dialog-modal-role/dialog-modal-role.component';
import { ListRoleComponent } from './list-role/list-role.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from 'src/services/role.service';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListRoleComponent },


]


@NgModule({
  declarations: [ListRoleComponent, DialogModalRoleComponent],
  entryComponents: [
    DialogModalRoleComponent,

  ],
  imports: [

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [RoleService]
})
export class RoleModule { }
