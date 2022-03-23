import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContratsComponent } from './Contrats/list-contrats/list-contrats.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListDepartementComponent } from './Departements/list-departement/list-departement.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: '', redirectTo: '/Employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'roles ', loadChildren: () => import('./Roles/role.module').then(m => m.RoleModule) },
  { path: 'contrats ', loadChildren: () => import('./Contrats/contrat.module').then(m => m.ContratModule) },
  { path: 'departements', loadChildren: () => import('./Departements/departement.module').then(m => m.DepartementModule) },
  { path: 'Employees', loadChildren: () => import('./Employees/employee.module').then(m => m.EmployeeModule) },
  { path: 'Posts', loadChildren: () => import('./Posts/post.module').then(m => m.PostModule) }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
