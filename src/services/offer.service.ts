import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationOffer } from 'src/models/ApplicationOffer';
import { Candidat } from 'src/models/Candidat';
import { Offers } from 'src/models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  public tab: Offers[] = [];


  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };

  constructor(private httpClient: HttpClient) { }

  saveOffer(o:Offers): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/Offer', o, this.header).toPromise();
  }

  RemoveOfferById(id: string): Promise<void> {
    return this.httpClient.delete<void>('https://localhost:7152/api/Offfer/' + id, this.header).toPromise();
  }

  GetALL(): Promise<Offers[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/Offer/all').toPromise();
  }

  EditOffer(o:Offers): Promise<any> {
    return this.httpClient.put<any>('https://localhost:7152/api/Offer', o, this.header).toPromise();
  }
 
  ApplyToOffer(a:ApplicationOffer): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/ApplicationOffer', a).toPromise();
  }
   
  AddCandidat(c:Candidat): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/Candidat', c).toPromise();
  }


}
