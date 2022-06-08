import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Email } from 'src/models/Email';
import { AlertNotificationService } from 'src/services/alert-notification.service';
import { CandidatsService } from 'src/services/candidats.service';
import { LoginService } from 'src/services/login.service';
import { MailService } from 'src/services/mail.service';

@Component({
  selector: 'app-list-candidats',
  templateUrl: './list-candidats.component.html',
  styleUrls: ['./list-candidats.component.scss']
})
export class ListCandidatsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoggedIn = false;
  role: any;
  decode: any;
  rh = false;
  applicationOfferDetail:any;
  MailToCandidatAccepted:Email;
  MailToCandidatRefused:Email;



  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.candidatService.tab);
  displayedColumns: string[] = ["FirstName", "LastName","Email","PhoneNumber", "CV","CoverLetter","AssignmentDate","Offer Name","Contrat Type","Actions"];

  constructor(private candidatService:CandidatsService,private mailService:MailService,private login: LoginService,private alertNotification:AlertNotificationService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllApplicationOffers();
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
      this.decode = this.login.decodejwt(localStorage.getItem("jwt"));
      this.role = this.decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (this.role == 'Ressources Humaines') {
        this.rh = true;
      }

    }
  }
  
  GetAllApplicationOffers(){
    this.candidatService.GetAllApplicationOffers().then((data)=>{
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);

    })
  }
  async filtersChangedHandler(filters) {
    this.dataSource.data = await this.candidatService.GetAllApplicationOffers();
    const { type, Date,keywords } = filters;
    this.dataSource.data = this.dataSource.data.filter(data => {
     const typeCondition = type ? data.offer.type.includes(type) : true;
      let dateCondition = true;
      if (Date) {
       data.assignmentDate= formatDate( data.assignmentDate.toString(), 'dd-MM-yyyy','en-US');
       let date=formatDate(Date.toString(), 'dd-MM-yyyy','en-US');
       dateCondition =date.includes(data.assignmentDate);
       }
       let keywordsCondition = true;
       if (keywords) {
         const words = keywords.split(' ');
         keywordsCondition = words.some(word => data.offer.offerName.includes(word) || data.offer.offerDescription.includes(word));
       }
      return typeCondition && dateCondition && keywordsCondition;
    })
  }
 
 SendMailToAcceptCandidat(id:any){
   this.candidatService.GetApplicationOfferById(id).then((data)=>{ this.applicationOfferDetail=data;
    console.log(this.applicationOfferDetail,this.applicationOfferDetail.candidat.email);
    let Mail = {
     ToEmail: this.applicationOfferDetail.candidat.email,
      Subject: `Candidature ${this.applicationOfferDetail.offer.offerName} ${this.applicationOfferDetail.offer.type}`,
      Body: `Bonjour ${this.applicationOfferDetail.candidat.firstName},
      merci d'avoir postulé pour le poste de ${this.applicationOfferDetail.offer.offerName},
      votre profil nous interésse,
      Seriez vous disponible la semaine prochaine pour un entretien téléphonique ?
      A très bientôt,`
    } as Email;
   this.mailService.sendMailCandidat(Mail).then(()=>{
    this.alertNotification.showNotification("Email sent successfully","OK");
   });
  }); 
 }

 SendMailToRefuseCandidat(id:any){
  this.candidatService.GetApplicationOfferById(id).then((data)=>{ this.applicationOfferDetail=data;
   console.log(this.applicationOfferDetail,this.applicationOfferDetail.candidat.email);
   let Mail = {
    ToEmail: this.applicationOfferDetail.candidat.email,
     Subject: `Candidature ${this.applicationOfferDetail.offer.offerName} ${this.applicationOfferDetail.offer.type}`,
    Body: `Bonjour ${this.applicationOfferDetail.candidat.firstName},
    Nous avons étudié votre  candidature
    et nous sommes au regret de vous annoncer ne pas pouvoir y donner une suite favorable.
     Nous vous remercions pour l'intérêt que vous portez à Finlogik et vous souhaitons d'aboutir rapidement dans vos recherches.
 
    `
    } as Email;
    this.mailService.sendMailCandidat(Mail).then(()=>{
    this.alertNotification.showNotification("Email sent successfully","OK");
   
 
  });
 }); 
}

 
}
