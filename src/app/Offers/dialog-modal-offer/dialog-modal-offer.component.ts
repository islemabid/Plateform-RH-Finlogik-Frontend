import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContratService } from 'src/services/contrat.service';
import { OfferService } from 'src/services/offer.service';

@Component({
  selector: 'app-dialog-modal-offer',
  templateUrl: './dialog-modal-offer.component.html',
  styleUrls: ['./dialog-modal-offer.component.scss']
})
export class DialogModalOfferComponent implements OnInit {

  public titre = "ADD New Offer";
  form: FormGroup;
  response: any;
  action: string = "save";
  contractTypes:any;

  constructor (
   private offerservice: OfferService,
    private formBuilder: FormBuilder,
    private contratsservice: ContratService,
    private dialog: MatDialogRef<DialogModalOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
    ) { }

  ngOnInit(): void {
    this.initform();
    this.GetAllContrats();
    if (this.editData) {
      this.titre = "Update Offer"
      this.action = "edit";
      this.form.controls["OfferName"].setValue(this.editData.offerName);
      this.form.controls["OfferDescription"].setValue(this.editData.offerDescription);
      this.form.controls["type"].setValue(this.editData.type);
      this.form.controls["OfferMinExperience"].setValue(this.editData.offerMinExperience);
      this.form.controls["ExpirationDate"].setValue(this.editData.expirationDate);
      this.form.controls["IsDeleted"].setValue(this.editData.isDeleted);
    }

  }
 

  initform(): void {
    this.form = this.formBuilder.group({
      OfferName: ["", Validators.required],
      OfferDescription: ["", Validators.required],
      type: ["", Validators.required],
      OfferMinExperience: [""],
      ExpirationDate: ["", Validators.required],
      IsDeleted:[Validators.required]
    });
    
  }
  
  GetAllContrats() {
    this.contratsservice.GetALL().then((data) => {
      this.contractTypes = data;
     
    }
    )
  }

  onsubmit() {
    if (!this.editData) {
      console.log(this.form.value);
      const saveOffer = { ...this.form.value }
      this.offerservice.saveOffer(saveOffer)
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
    const EditOffer = { ...this.form.value, id }

    this.offerservice.EditOffer(EditOffer)
      .then((data) => {
        console.log(data);
        this.form.reset();
        this.dialog.close('Update');


      });
  }
}
