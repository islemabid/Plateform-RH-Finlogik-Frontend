import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrats } from 'src/models/Contrats';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  public tab: Contrats[] = [];
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };

  constructor(private httpClient: HttpClient) { }

  saveContrat(c: Contrats): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/Contrat', c, this.header).toPromise();
  }



  RemoveContratById(id: string): Promise<void> {
    return this.httpClient.delete<void>('https://localhost:7152/api/Contrat/' + id).toPromise();


  }


  GetALL(): Promise<Contrats[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/Contrat/all').toPromise();


  }
  EditContrat(c: Contrats): Promise<any> {
    return this.httpClient.put<any>('https://localhost:7152/api/Contrat', c, this.header).toPromise();


  }
  getContratById(id: string): Promise<Contrats> {
    return this.httpClient.get<Contrats>('https://localhost:7152/api/Contrat/' + id, this.header).toPromise();

  }

}
