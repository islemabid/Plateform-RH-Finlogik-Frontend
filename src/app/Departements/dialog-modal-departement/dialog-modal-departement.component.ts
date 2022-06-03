import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartementService } from 'src/services/departement.service';

@Component({
  selector: 'app-dialog-modal-departement',
  templateUrl: './dialog-modal-departement.component.html',
  styleUrls: ['./dialog-modal-departement.component.scss']
})
export class DialogModalDepartementComponent implements OnInit {

  public titre = "ADD New Departement";
  form: FormGroup;
  response: any;
  action: string = "save";
  invalid=false;
  submitted = false;

  constructor(

    private departementservice: DepartementService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<DialogModalDepartementComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.initform();
    if (this.editData) {
      this.titre = "Update Departement"
      this.action = "edit";
      this.form.controls["shortDescription"].setValue(this.editData.shortDescription);
      this.form.controls["longDescription"].setValue(this.editData.longDescription);
    }

  }


  initform(): void {
    this.form = this.formBuilder.group({
      shortDescription: ["", Validators.required],
      longDescription: ["", Validators.required],
    });
   
  }
  get AddFormControl() {
    return this.form.controls;
  }
  onsubmit() {
    this.submitted=true;
    if (!this.editData) {
      console.log(this.form.value);
      const saveDep = { ...this.form.value }
      this.departementservice.saveDep(saveDep)
        .then((data) => {
          this.form.reset();
          this.dialog.close('Save');
        }).catch(err=> {
          this.invalid=true;
        });
    }
    else {
      this.edit();
    }

  }
  edit() {
    let id = this.editData.id;
    console.log(id);
    const EditDep = { ...this.form.value, id }

    this.departementservice.EditDep(EditDep)
      .then((data) => {
        this.form.reset();
        this.dialog.close('Update');


      });
  }
}
