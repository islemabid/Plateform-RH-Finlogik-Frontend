import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratService } from 'src/services/contrat.service';
@Component({
  selector: 'app-dialog-modal-contrat',
  templateUrl: './dialog-modal-contrat.component.html',
  styleUrls: ['./dialog-modal-contrat.component.scss']
})
export class DialogModalContratComponent implements OnInit {

  public titre = "ADD New Contrat";
  form: FormGroup;
  response: any;
  matcher: any;
  contrats: any;
  action: string = "save";
  hide = true;
  invalid=false;

  constructor(
    private contratService: ContratService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<DialogModalContratComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.initform();
    console.log(this.editData);
    if (this.editData) {
      this.titre = "Update Contrat"
      this.action = "edit";
      this.form.controls["shortDescription"].setValue(this.editData.shortDescription);
      this.form.controls["longDescription"].setValue(this.editData.longDescription);


    }
    this.GetAllContrats();
  }
  GetAllContrats() {
    this.contratService.GetALL().then((data) => {
      this.contrats = data;
      console.log(this.contrats);
    }
    )
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
    if (!this.editData) {
      const saveContrat = { ...this.form.value }
      this.contratService.saveContrat(saveContrat)
        .then((data) => {
          console.log(data);
          this.form.reset();
          this.dialog.close('Save');
        }).catch(err => {
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
    const editContrat = { ...this.form.value, id }
    this.contratService.EditContrat(editContrat)
      .then((data) => {
        console.log(data);
        this.form.reset();
        this.dialog.close('Update');


      });
  }

}
