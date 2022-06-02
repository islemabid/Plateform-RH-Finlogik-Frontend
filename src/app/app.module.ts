import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from './confirm-dialog.module';
import { MaterialModule } from './material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeeModule } from './Employees/employee.module';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostModule } from './Posts/post.module';
import { RoleModule } from './Roles/role.module';
import { ContratModule } from './Contrats/contrat.module';
import { DepartementModule } from './Departements/departement.module';
import { LayoutComponent } from './layout/layout.component';
import { ProfilModule } from './employee-Profil/profil.module';
import { OfferModule } from './Offers/offer.module';
import { TemplateCandidatComponent } from './Candidats/template-candidat/template-candidat.component';
import { ApplyOfferComponent } from './Candidats/apply-offer/apply-offer.component';
import { FiltersComponent } from './Candidats/template-candidat/filters/filters.component';
import { CardOfferComponent } from './Candidats/template-candidat/card-offer/card-offer.component';
import { ListCandidatsComponent } from './Candidats/list-candidats/list-candidats.component';
import { DownloadComponent } from './FilesUploadOrDownload/download/download.component';
import { UploadCvComponent } from './FilesUploadOrDownload/upload-cv/upload-cv.component';
import { AlertNotificationComponent } from './alert-notification/alert-notification.component';
import { TemplateEmployeeComponent } from './Employees/template-employee/template-employee.component';
import { TimeoffbalancesModule } from './time-off-balances/timeoffbalances.module';
import { PayRollModule } from './payroll/pay-roll.module';
import { HolidaysModule } from './Holidays/holidays.module';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { WorkingHoursFiltersComponent } from './working-hours/working-hours-filters/working-hours-filters.component';
import { WorkingHoursOffemployeeComponent } from './working-hours/working-hours-offemployee/working-hours-offemployee.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './forgot-password/update-password/update-password.component';
import { FullCalendarModule } from '@fullcalendar/angular';












export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    ContentAnimateDirective,
    LoginComponent,
    HomeComponent,
    ApplyOfferComponent,
    TemplateCandidatComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    FiltersComponent,
    CardOfferComponent,
    ListCandidatsComponent,
    DownloadComponent,
    UploadCvComponent,
    AlertNotificationComponent,
    TemplateEmployeeComponent,
    WorkingHoursComponent,
    WorkingHoursFiltersComponent,
    WorkingHoursOffemployeeComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,

   
   
 
   
  


  ],
  imports: [
    OfferModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ProfilModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PostModule,
    DepartementModule,
    TimeoffbalancesModule,
    ConfirmDialogModule,
    HttpClientModule,
    ConfirmDialogModule,
    PayRollModule,
    EmployeeModule,
    RoleModule,
    ContratModule,
    HolidaysModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:7152"],
        blacklistedRoutes: []
      }
    }),
  ],

  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
