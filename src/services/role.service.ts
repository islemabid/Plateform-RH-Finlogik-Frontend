import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from 'src/models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public tab: Roles[] = [];
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };

  constructor(private httpClient: HttpClient) { }

  saveRole(r: Roles): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/Role', r, this.header).toPromise();
  }

  getRoleById(id: string): Promise<Roles> {
    return this.httpClient.get<Roles>('https://localhost:7152/api/Role/' + id, this.header).toPromise();

  }

  RemoveRoleById(id: string): Promise<void> {
    return this.httpClient.delete<void>('https://localhost:7152/api/Role/' + id).toPromise();


  }


  GetALL(): Promise<Roles[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/Role/all', this.header).toPromise();


  }
  EditEmp(r: Roles): Promise<any> {
    return this.httpClient.put<any>('https://localhost:7023/api/Role/' + r, this.header).toPromise();


  }

}
