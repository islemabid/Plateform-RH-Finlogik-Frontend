import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationOffer } from 'src/models/ApplicationOffer';
import { Candidat } from 'src/models/Candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatsService {

  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };
  tab: any;
  
  constructor(private httpClient: HttpClient) { }

  ApplyToOffer(a:ApplicationOffer): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/ApplicationOffer', a).toPromise();
  }
   
  AddCandidat(c:Candidat): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/Candidat', c).toPromise();
  }
  GetAllApplicationOffers(): Promise<any> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/ApplicationOffer/all', this.header).toPromise();
  }

}
