import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoleComponent } from './list-role/list-role.component';
import { FormRoleComponent } from './form-role/form-role.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'roles ', pathMatch: 'full', component: ListRoleComponent },
  { path: 'FormRole', pathMatch: 'full', component: FormRoleComponent },
  { path: 'roles/:id/edit', pathMatch: 'full', component: FormRoleComponent },
]


@NgModule({
  declarations: [ListRoleComponent, FormRoleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class RoleModule { }
