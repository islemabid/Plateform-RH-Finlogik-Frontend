import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeePay } from 'src/models/EmployeePay';

@Injectable({
  providedIn: 'root'
})
export class EmployeePayService {
  public tab: EmployeePay[] = [];
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };
  constructor(private httpClient: HttpClient) { }
  saveEmp(e: EmployeePay): Promise<EmployeePay> {

    return this.httpClient.post<EmployeePay>('https://localhost:7152/api/EmployeePay', e, this.header).toPromise();
  }
  
  GetALL(): Promise<EmployeePay[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/EmployeePay/all', this.header).toPromise();


  }
  GetHistoryPaytsByIdEmployee(idEmployee:string): Promise<any[]>{
    return this.httpClient.get<any[]>('https://localhost:7152/api/EmployeePay/'+idEmployee, this.header).toPromise();
  }
  UpdateEmployeePay(e: EmployeePay): Promise<EmployeePay> {
    return this.httpClient.put<EmployeePay>('https://localhost:7152/api/EmployeePay', e, this.header).toPromise();

  }
}

