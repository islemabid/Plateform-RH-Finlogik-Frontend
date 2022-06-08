import { Component, Inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ContratService } from 'src/services/contrat.service';
import { DepartementService } from 'src/services/departement.service';
import { EmployeeService } from 'src/services/employee.service';
import { PostService } from 'src/services/post.service';
import { RoleService } from 'src/services/role.service';


@Component({
  selector: 'app-dialog-modal-employee',
  templateUrl: './dialog-modal-employee.component.html',
  styleUrls: ['./dialog-modal-employee.component.scss']
})
export class DialogModalEmployeeComponent implements OnInit {
  public titre = "ADD New Employee";
  form: FormGroup;
  idPost: any;
  idContrat: any;
  type: string;
  response:any;
  roles: any;
  posts: any;
  contrats: any;
  email:any;
  action: string = "save";
  hide = true;
  deps: any;
  invalid=false;
  verif=false;
  contrat:string;
  gender: string[] = ["Femelle", "Male"];
  constructor(
    private roleservice: RoleService,
    private postservice: PostService,
    private depservice: DepartementService,
    private contratsservice: ContratService,
    private ms: EmployeeService,
    private dialog: MatDialogRef<DialogModalEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  async ngOnInit() {

    this.initform();
    await Promise.all([
      this.GetAllRoles(),
      this.GetAllPosts(),
      this.GetAllContrats(),
      this.GetAllDepartement()
    ]);

    if (this.editData) {
      this.titre = "Update Employee"
      this.action = "edit";
      this.form.controls["firstName"].setValue(this.editData.firstName);
      this.form.controls["lastName"].setValue(this.editData.lastName);
      this.form.controls["personnelEmail"].setValue(this.editData.personnelEmail);
      this.form.controls["personnelPhone"].setValue(this.editData.personnelPhone);
      this.form.controls["adress"].setValue(this.editData.adress);
      this.form.controls["password"].setValue(this.editData.password);
      this.form.controls["diplome"].setValue(this.editData.diplome);
      this.form.controls["birthDate"].setValue(this.editData.birthDate);
      this.form.controls["gender"].setValue(this.editData.gender);
      this.form.controls["city"].setValue(this.editData.city);
      this.form.controls["region"].setValue(this.editData.region);
      this.form.controls["contry"].setValue(this.editData.contry);
      this.form.controls["postalCode"].setValue(this.editData.postalCode);
      this.form.controls["Cin"].setValue(this.editData.cin);
      this.form.controls["workEmail"].setValue(this.editData.workEmail);
      this.form.controls["workPhone"].setValue(this.editData.workPhone);
      this.form.controls["cnssNumber"].setValue(this.editData.cnssNumber);
      this.form.controls["idRole"].setValue(this.editData.idRole);
      this.form.controls["idDepartement"].setValue(this.editData.idDepartement);
      this.form.controls["idContrat"].setValue('Freelance');
      this.form.controls["idPost"].setValue(this.editData.idPost);
      if(this.editData.idContrat!=2){this.form.controls["endDate"].setValue(this.editData.endDate);}
      
    }
   
  }
  GetAllRoles() {
    this.roleservice.GetALL().then((data) => {
      this.roles = data;
    
    }
    )
  }
  GetAllDepartement() {
    this.depservice.GetALL().then((data) => {
      this.deps = data;
      
    }
    )
  }
  GetAllPosts() {
    this.postservice.GetALL().then((data) => {
      this.posts = data;
      

    })
  }


  GetAllContrats() {
    this.contratsservice.GetALL().then((data) => {
      this.contrats = data;
     
    }
    )
  }

  get AddFormControl() {
    return this.form.controls;
  }
  initform(): void {
    this.form = new FormGroup({
      firstName: new FormControl('',[ Validators.required]),
      lastName:   new FormControl('', [Validators.required]),
      personnelEmail:  new FormControl('',[Validators.required,Validators.email]),
      personnelPhone: new FormControl('',[Validators.required,Validators.maxLength(8)]),
      adress:new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      diplome: new FormControl('',[Validators.required]),
      birthDate: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      region: new FormControl('',[Validators.required]),
      contry: new FormControl('',[Validators.required]),
      postalCode: new FormControl('',[Validators.required]),
      Cin: new FormControl('',[Validators.required,Validators.maxLength(8)]),
      workEmail: new FormControl('',[Validators.required,Validators.email]),
      workPhone:new FormControl('',[Validators.required]),
      cnssNumber: new FormControl('',[Validators.required]),
      imageUrl:new FormControl(''),
      idRole: new FormControl('',[Validators.required]),
      idPost:new FormControl('',[Validators.required]),
      idContrat: new FormControl('',[Validators.required]),
      idDepartement: new FormControl('',[Validators.required]),
      endDate: new FormControl(null)


    });
   



  }
  public uploadFinished = (event: any) => {
    this.response = event.toString();
  }

  onsubmit() {
    if (!this.editData) {
      const saveEmp = { ...this.form.value }
       saveEmp.birthDate=new Date(saveEmp.birthDate.toLocaleString("en-US", {timeZone: 'Europe/Brussels'}));
      saveEmp.imageUrl = this.response
      if(this.contrat=="2"){
        saveEmp.endDate=null;
      }
      if(this.form.invalid){
        this.invalid=true;
      }
      if(this.form.valid)
      {
      this.ms.saveEmp(saveEmp)
        .then((data) => {
           this.form.reset();
           this.dialog.close('Save');
        
     }).catch(err=> {
              this.verif=true;
     
     });}
    }
    else {
      this.edit();
    }

  }
  
  edit() {
    let id = this.editData.id;
    this.contrat=this.editData.idContrat;
    const EditEmp = { ...this.form.value, id }
    EditEmp.imageUrl = this.response;
    EditEmp.birthDate=new Date(EditEmp.birthDate.toLocaleString("en-US", {timeZone: 'Europe/Brussels'}));
    this.ms.EditEmp(EditEmp)
      .then((data) => {
        this.form.reset();
        this.dialog.close('Update');
      });
  }


}


  





