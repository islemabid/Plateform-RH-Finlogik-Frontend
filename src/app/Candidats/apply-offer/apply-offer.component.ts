import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicationOffer } from 'src/models/ApplicationOffer';
import { Candidat } from 'src/models/Candidat';
import { OfferService } from 'src/services/offer.service';

@Component({
  selector: 'app-apply-offer',
  templateUrl: './apply-offer.component.html',
  styleUrls: ['./apply-offer.component.scss']
})
export class ApplyOfferComponent implements OnInit {
  form: FormGroup;
  currentid:any;
  candidat:any;
  applicationOffers:any;
  candidatId:any;

  constructor(private offerservice:OfferService,private acivateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentid = this.acivateRoute.snapshot.params.id;
    this.initform();
  }
  initform(): void {
    this.form = new FormGroup({
      firstName :new FormControl("", [Validators.required]),
      lastName :new FormControl("", [Validators.required]),
      email:new FormControl("", [Validators.required]),
      phoneNumber:new FormControl("", [Validators.required]),
      gender:new FormControl("",[Validators.required]),
      adress :new FormControl("", [Validators.required]),
      schoolLevel:new FormControl("", [Validators.required]),
      establishment:new FormControl("",[Validators.required]),
      cvUrl :new FormControl("",[Validators.required]),
      coverLetter:new FormControl("",[Validators.required]),
     
    });
  }
save(){
  this.candidat={...this.form.value};
  let candidats:Candidat;
  candidats={...this.candidat,...candidats};
  console.log(candidats);
  this.offerservice.AddCandidat(candidats).then((data)=>{
    this.candidatId=data.toString();
    let applicationOffers:ApplicationOffer;
    applicationOffers={...this.candidat,...applicationOffers};
    applicationOffers.IdCandidat=this.candidatId;
    applicationOffers.IdOffer=this.currentid;
    console.log(applicationOffers);
  this.offerservice.ApplyToOffer(applicationOffers).then((data)=>{
    console.log(data);
  });
  });

  
}
}
