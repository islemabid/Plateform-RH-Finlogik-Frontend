import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from 'src/models/Employee';
import { UpdatePassword } from 'src/models/UpdatePassword';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public tab: Employees[] = [];
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };

  constructor(private httpClient: HttpClient) { }
  saveEmp(e: Employees): Promise<Employees> {

    return this.httpClient.post<Employees>('https://localhost:7152/api/Employee', e, this.header).toPromise();
  }

  getEmpById(id: string): Promise<any> {
    return this.httpClient.get<any>('https://localhost:7152/api/Employee/'+ id, this.header).toPromise();

  }
  getEmpByEmail(email: string): Promise<any> {
    return this.httpClient.get<any>('https://localhost:7152/api/Employee/forgotPassword/'+ email).toPromise();

  }
 

  RemoveEmpById(id: string): Promise<void> {
    return this.httpClient.delete<void>('https://localhost:7152/api/Employee/'+ id).toPromise();


  }


  GetALL(): Promise<Employees[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/Employee/all', this.header).toPromise();


  }
  EditEmp(e: Employees): Promise<Employees> {
    return this.httpClient.put<Employees>('https://localhost:7152/api/Employee', e, this.header).toPromise();


  }
  EditPassword(p: UpdatePassword): Promise<any> {
    return this.httpClient.put<any>('https://localhost:7152/api/Employee/UpdatePasswordEmployee', p ).toPromise();


  }
  

}
