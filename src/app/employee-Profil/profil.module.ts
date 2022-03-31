import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonnalComponent } from './personnal/personnal.component';


const routes: Routes = [
  { path: 'personal', pathMatch: 'full', component: PersonnalComponent },


]
@NgModule({
  declarations: [PersonnalComponent, ProfilComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfilModule { }
