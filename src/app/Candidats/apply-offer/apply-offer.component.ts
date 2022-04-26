
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationOffer } from 'src/models/ApplicationOffer';
import { Candidat } from 'src/models/Candidat';
import { AlertNotificationService } from 'src/services/alert-notification.service';
import { CandidatsService } from 'src/services/candidats.service';
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
  response:any;
  offer:any;
  apply:boolean=false;
  
  constructor(private offerservice:OfferService,private candidatservice:CandidatsService,private alertNotification:AlertNotificationService,private acivateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentid = this.acivateRoute.snapshot.params.id;
    this.GetOfferById();
    this.initform();
  }

  

  public uploadFinished = (event: any) => {
    this.response = event.toString();
  }
  public GetOfferById(){
    this.offerservice.GetOfferById(this.currentid).then((data)=>{
      this.offer=data;
     
    })
  }
  initform(): void {
    this.form = new FormGroup({
      firstName :new FormControl("", [Validators.required]),
      lastName :new FormControl("", [Validators.required]),
      email:new FormControl("", [Validators.required]),
      phoneNumber:new FormControl("", [Validators.required]),
      cvUrl :new FormControl("",[Validators.required]),
      coverLetter:new FormControl("",[Validators.required]),
     
    });
  }
   
  save(){

   this.candidat = this.form.value as Candidat;
   this.candidatservice.AddCandidat(this.candidat).then((data)=>{
    this.candidatId = data.toString();
    const applicationOffers = {
      CoverLetter:this.candidat.coverLetter,
      IdCandidat: this.candidatId,
      IdOffer: this.currentid,
      CvUrl: this.response
    } as ApplicationOffer;
    this.candidatservice.ApplyToOffer(applicationOffers).then(()=>{
      this.alertNotification.showNotification("your application offer sent successfully !","OK");
      
      });
     

  });

}

}
