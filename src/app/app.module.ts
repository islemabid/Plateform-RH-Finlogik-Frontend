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
import { TimeOffBalancesComponent } from './time-off-balances/time-off-balances.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    ContentAnimateDirective,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    TimeOffBalancesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PostModule,
    DepartementModule,
    ConfirmDialogModule,
    HttpClientModule,
    ConfirmDialogModule,
    EmployeeModule,
    RoleModule,
    ContratModule,
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
