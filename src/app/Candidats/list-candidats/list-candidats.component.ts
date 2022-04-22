import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmailToCandidat } from 'src/models/EmailToCandidat';
import { AlertNotificationService } from 'src/services/alert-notification.service';
import { CandidatsService } from 'src/services/candidats.service';
import { FileService } from 'src/services/file.service';
import { LoginService } from 'src/services/login.service';

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
  MailToCandidatAccepted:EmailToCandidat;
  MailToCandidatRefused:EmailToCandidat;



  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.candidatService.tab);
  displayedColumns: string[] = ["FirstName", "LastName","Email","PhoneNumber", "CV","CoverLetter","AssignmentDate","Offer Name","Contrat Type","Actions"];

  constructor(private candidatService:CandidatsService,private login: LoginService,private alertNotification:AlertNotificationService) { }

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
    const { type, Date } = filters;
    this.dataSource.data = this.dataSource.data.filter(data => {
     const typeCondition = type ? data.offer.type.includes(type) : true;
      let dateCondition = true;
      if (Date) {
       data.assignmentDate= formatDate( data.assignmentDate.toString(), 'dd-MM-yyyy','en-US');
       let date=formatDate(Date.toString(), 'dd-MM-yyyy','en-US');
       dateCondition =date.includes(data.assignmentDate);
       }
      return typeCondition && dateCondition;
    })
  }
 
 SendMailToAcceptCandidat(id:any){
   this.candidatService.GetApplicationOfferById(id).then((data)=>{ this.applicationOfferDetail=data;
    console.log(this.applicationOfferDetail,this.applicationOfferDetail.candidat.email);
    let Mail = {
     ToEmail: this.applicationOfferDetail.candidat.email,
      Subject: "Candidature"+""+this.applicationOfferDetail.offer.offerName+"-"+this.applicationOfferDetail.offer.type,
      Body: "Bonjour"+"  "+this.applicationOfferDetail.candidat.firstName+","+
      "  "+"merci d'avoir postulé pour le poste de"+"     "+this.applicationOfferDetail.offer.offerName
      +" "+"notre profil nous interésse,"
      +"Seriez vous disponible la semaine prochaine pour un entretien téléphonique ?"
      + "A très bientôt,"
    } as EmailToCandidat;
   this.candidatService.ReplyToCandidat(Mail).then(()=>{
    this.alertNotification.showNotification("Email sent successfully","OK");
   });
  }); 
 }

 SendMailToRefuseCandidat(id:any){
  this.candidatService.GetApplicationOfferById(id).then((data)=>{ this.applicationOfferDetail=data;
   console.log(this.applicationOfferDetail,this.applicationOfferDetail.candidat.email);
   let Mail = {
    ToEmail: this.applicationOfferDetail.candidat.email,
     Subject: "Candidature"+""+this.applicationOfferDetail.offer.offerName+"-"+this.applicationOfferDetail.offer.type,
     Body: "Bonjour "+this.applicationOfferDetail.candidat.firstName+",Nous avons étudié votre candidature et nous sommes au regret de vous annoncer ne pas pouvoir y donner une suite favorable. Nous vous remercions pour l'intérêt que vous portez à Finlogik et vous souhaitons d'aboutir rapidement dans vos recherches.Cordialement."
    /*Body: `Bonjour ${this.applicationOfferDetail.candidat.firstName},
    Nous avons étudié votre 
    `*/
    } as EmailToCandidat;
  this.candidatService.ReplyToCandidat(Mail).then(()=>{
  console.log("mail reçue");
  });
 }); 
}

 
}
