import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departements } from 'src/models/Departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  public tab: Departements[] = [];
  constructor(private httpClient: HttpClient) { }
  saveDep(e: Departements): Promise<Departements> {
    return this.httpClient.post<Departements>('https://localhost:7023/api/departement/add', e).toPromise();

  }



  getDepById(id: string): Promise<Departements> {
    return this.httpClient.get<Departements>('https://localhost:7023/api/departement/' + id).toPromise();

  }

  RemoveDepById(id: string): Promise<void> {
    return this.httpClient.delete<void>('https://localhost:7023/api/departement/' + id).toPromise();


  }


  GetALL(): Promise<Departements[]> {
    return this.httpClient.get<any[]>('https://localhost:7023/api/departement/departements').toPromise();

  }
  EditDep(id: any, e: Departements): Promise<Departements> {
    return this.httpClient.put<Departements>('https://localhost:7023/api/departement/update/' + id, e).toPromise();


  }
}
