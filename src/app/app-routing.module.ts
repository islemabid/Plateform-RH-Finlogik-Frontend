import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyOfferComponent } from './Candidats/apply-offer/apply-offer.component';
import { ListCandidatsComponent } from './Candidats/list-candidats/list-candidats.component';
import { TemplateCandidatComponent } from './Candidats/template-candidat/template-candidat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TimeOffBalancesComponent } from './time-off-balances/time-off-balances.component';



const routes: Routes = [
  { path: '', redirectTo: '/Employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'TimeOffBalances', component: TimeOffBalancesComponent },
  { path: 'profil', loadChildren: () => import('./employee-Profil/profil.module').then(m => m.ProfilModule) },
  { path: 'roles', loadChildren: () => import('./Roles/role.module').then(m => m.RoleModule) },
  { path: 'contrats', loadChildren: () => import('./Contrats/contrat.module').then(m => m.ContratModule) },
  { path: 'departements', loadChildren: () => import('./Departements/departement.module').then(m => m.DepartementModule) },
  { path: 'Employees', loadChildren: () => import('./Employees/employee.module').then(m => m.EmployeeModule) },
  { path: 'Posts', loadChildren: () => import('./Posts/post.module').then(m => m.PostModule) },
  { path: 'Offers', loadChildren: () => import('./Offers/offer.module').then(m => m.OfferModule) },
  { path: 'candidat', pathMatch: 'full', component: TemplateCandidatComponent },
  { path: 'candidat/:id/Apply', pathMatch: 'full', component: ApplyOfferComponent },
  { path: 'list-candidat', pathMatch: 'full', component: ListCandidatsComponent },
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
