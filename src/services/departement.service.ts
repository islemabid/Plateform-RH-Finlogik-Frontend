import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departements } from 'src/models/Departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  public tab: Departements[] = [];
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };

  constructor(private httpClient: HttpClient) { }

  saveDep(d: Departements): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/Departement', d, this.header).toPromise();
  }



  RemoveDepById(id: string): Promise<void> {
    return this.httpClient.delete<void>('https://localhost:7152/api/Departement/' + id).toPromise();


  }


  GetALL(): Promise<Departements[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/Departement/all', this.header).toPromise();


  }
  EditDep(d: Departements): Promise<any> {
    return this.httpClient.put<any>('https://localhost:7023/api/Departement/' + d, this.header).toPromise();


  }









}
