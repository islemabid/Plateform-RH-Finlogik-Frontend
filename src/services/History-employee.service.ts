import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HistoryemployeeService {


  constructor(private httpClient: HttpClient) { }
  GetALL(): Promise<any[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/EmployeePost/all').toPromise();
  }


  GetHistoryPostsByIdEmployee(id: string): Promise<any[]> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/EmployeePost/' + id).toPromise();
  }
  GetHistoryContratsByIdEmployee(id: string): Promise<any[]> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/HistoryContrat/' + id).toPromise();
  }

}
