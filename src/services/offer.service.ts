import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  GetOfferById(id:string): Promise<Offers> {

    return this.httpClient.get<any>('https://localhost:7152/api/Offer/'+id).toPromise();
  }

  EditOffer(o:Offers): Promise<any> {
    return this.httpClient.put<any>('https://localhost:7152/api/Offer', o, this.header).toPromise();
  }

  PostOfferInLinkedin( code :string, idOffer:any): Promise<any>{
    return this.httpClient.post<any>('https://localhost:7152/api/LinkedinApi?code='+code,idOffer).toPromise();
  }

  

 



}
