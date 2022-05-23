import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyOfferComponent } from './Candidats/apply-offer/apply-offer.component';
import { ListCandidatsComponent } from './Candidats/list-candidats/list-candidats.component';
import { TemplateCandidatComponent } from './Candidats/template-candidat/template-candidat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './forgot-password/update-password/update-password.component';
import { LoginComponent } from './login/login.component';
import { WorkingHoursOffemployeeComponent } from './working-hours/working-hours-offemployee/working-hours-offemployee.component';
import { WorkingHoursComponent } from './working-hours/working-hours.component';




const routes: Routes = [
  { path: '', redirectTo: '/Employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profil', loadChildren: () => import('./employee-Profil/profil.module').then(m => m.ProfilModule) },
  { path: 'contrats', loadChildren: () => import('./Contrats/contrat.module').then(m => m.ContratModule) },
  { path: 'PayRoll', loadChildren: () => import('./payroll/pay-roll.module').then(m => m.PayRollModule) },
  { path: 'departements', loadChildren: () => import('./Departements/departement.module').then(m => m.DepartementModule) },
  { path: 'Employees', loadChildren: () => import('./Employees/employee.module').then(m => m.EmployeeModule) },
  { path: 'leaves', loadChildren: () => import('./time-off-balances/timeoffbalances.module').then(m => m.TimeoffbalancesModule) },
  { path: 'Calendar', loadChildren: () => import('./Holidays/holidays.module').then(m => m.HolidaysModule) },
  { path: 'Posts', loadChildren: () => import('./Posts/post.module').then(m => m.PostModule) },
  { path: 'Offers', loadChildren: () => import('./Offers/offer.module').then(m => m.OfferModule) },
  { path: 'candidat', pathMatch: 'full', component: TemplateCandidatComponent },
  { path: 'candidat/:id/Apply', pathMatch: 'full', component: ApplyOfferComponent },
  { path: 'list-candidat', pathMatch: 'full', component: ListCandidatsComponent },
  { path: 'AllWorkingHours', pathMatch: 'full', component: WorkingHoursComponent },
  { path: 'AllWorkingHoursByEmployee', pathMatch: 'full', component: WorkingHoursOffemployeeComponent },
  { path: 'Forgotpasword/:email', pathMatch: 'full', component: UpdatePasswordComponent },
  { path: 'Reset', pathMatch: 'full', component: ForgotPasswordComponent },
  
  
  
  
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
