import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './shared/profil/profil.component';
import { TimeOffBalancesComponent } from './time-off-balances/time-off-balances.component';



const routes: Routes = [
  { path: '', redirectTo: '/Employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'TimeOffBalances', component: TimeOffBalancesComponent },
  { path: 'roles', loadChildren: () => import('./Roles/role.module').then(m => m.RoleModule) },
  { path: 'contrats', loadChildren: () => import('./Contrats/contrat.module').then(m => m.ContratModule) },
  { path: 'departements', loadChildren: () => import('./Departements/departement.module').then(m => m.DepartementModule) },
  { path: 'Employees', loadChildren: () => import('./Employees/employee.module').then(m => m.EmployeeModule) },
  { path: 'Posts', loadChildren: () => import('./Posts/post.module').then(m => m.PostModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
