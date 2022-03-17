import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/Helper/MyErrorStateMatcher ';
import { EmployeeService } from 'src/services/employee.service';


@Component({
  selector: 'app-dialog-modal-employee',
  templateUrl: './dialog-modal-employee.component.html',
  styleUrls: ['./dialog-modal-employee.component.scss']
})
export class DialogModalEmployeeComponent implements OnInit {
  public titre = "ADD New Employee";
  form: FormGroup;
  response: any;
  matcher: any;
  action: string = "save";
  hide = true;
  Contrats: string[] = ["FullTime", "PartTime", "Freelance"];
  gender: string[] = ["Femelle", "Male"];
  constructor(
    private ms: EmployeeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<DialogModalEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.initform();
    console.log(this.editData);
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
      this.form.controls["Cin"].setValue(this.editData.Cin);
      this.form.controls["workEmail"].setValue(this.editData.workEmail);
      this.form.controls["workPhone"].setValue(this.editData.workPhone);
      this.form.controls["cnssNumber"].setValue(this.editData.cnssNumber);
      this.form.controls["hoursPerWeek"].setValue(this.editData.hoursPerWeek);
      this.form.controls["cnssNumber"].setValue(this.editData.cnssNumber);
      this.form.controls["contratType"].setValue(this.editData.contratType);
      this.form.controls["idRole"].setValue(this.editData.idRole);
    }
  }
  initform(): void {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      personnelEmail: ["", Validators.required, Validators.email],
      personnelPhone: ["", Validators.required],
      adress: ["", Validators.required],
      password: ["", Validators.required],
      diplome: ["", Validators.required],
      birthDate: ["", Validators.required],
      gender: ["", Validators.required],
      city: ["", Validators.required],
      region: ["", Validators.required],
      contry: ["", Validators.required],
      postalCode: ["", Validators.required],
      Cin: ["", Validators.required],
      workEmail: ["", Validators.required, Validators.email],
      workPhone: ["", Validators.required],
      cnssNumber: ["", Validators.required],
      hoursPerWeek: ["", Validators.required],
      contratType: ["", Validators.required],
      imageUrl: ["", Validators.required],
      idRole: ["", Validators.required],

    });
    this.matcher = new MyErrorStateMatcher();

  }
  public uploadFinished = (event: any) => {
    this.response = event.toString();
    console.log(this.response.toString());
  }
  onsubmit() {
    if (!this.editData) {
      console.log(this.form.value);
      const saveEmp = { ...this.form.value }
      saveEmp.imageUrl = this.response
      //.then na3mlouha wa9t c'et bon il resultat fil resolve w nhebou ya3mel 7aja o5ra , 
      this.ms.saveEmp(saveEmp)
        .then((data) => {
          console.log(data);
          this.form.reset();
          this.dialog.close('Save');



        });


    }
    else {
      this.edit();
    }

  }
  edit() {
    let id = this.editData.id;
    console.log(id);
    const EditEmp = { ...this.form.value, id }
    EditEmp.imageUrl = this.response
    this.ms.EditEmp(EditEmp)
      .then((data) => {
        console.log(data);
        this.form.reset();
        this.dialog.close('Update');


      });
  }
}



