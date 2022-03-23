import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/Helper/MyErrorStateMatcher ';
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
  matcher: any;

  action: string = "save";

  constructor(

    private departementservice: DepartementService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<DialogModalDepartementComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.initform();
    console.log(this.editData);
    if (this.editData) {
      this.titre = "Update Departement"
      this.action = "edit";
      this.form.controls["name"].setValue(this.editData.name);
      this.form.controls["description"].setValue(this.editData.description);



    }

  }


  initform(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],




    });
    this.matcher = new MyErrorStateMatcher();

  }

  onsubmit() {
    if (!this.editData) {
      console.log(this.form.value);
      const saveDep = { ...this.form.value }

      this.departementservice.saveDep(saveDep)
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
    const EditDep = { ...this.form.value, id }

    this.departementservice.EditDep(EditDep)
      .then((data) => {
        console.log(data);
        this.form.reset();
        this.dialog.close('Update');


      });
  }
}