import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonnalComponent } from './personnal/personnal.component';
import { UpdateProfilComponent } from './update-profil/update-profil.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: PersonnalComponent },
  {path:':id/edit',pathMatch:'full',component:UpdateProfilComponent}


]
@NgModule({
  declarations: [PersonnalComponent,UpdateProfilComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfilModule { }
