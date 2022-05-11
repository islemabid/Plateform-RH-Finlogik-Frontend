import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeOffBalances } from 'src/models/TimeOffBalances';

@Injectable({
  providedIn: 'root'
})
export class TimeOffBalancesService {
  public tab: TimeOffBalances[] = [];
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };

  constructor(private httpClient: HttpClient) { }

  GetALL(): Promise<TimeOffBalances[]> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/TimeOffBalances/all').toPromise();
  }
   Validate(e: TimeOffBalances): Promise<TimeOffBalances> {
    return this.httpClient.put<TimeOffBalances>('https://localhost:7152/api/TimeOffBalances', e,this.header).toPromise();
  }

  Refuse(e: TimeOffBalances): Promise<TimeOffBalances> {
    return this.httpClient.put<TimeOffBalances>('https://localhost:7152/api/TimeOffBalances/Refuse', e,this.header).toPromise();
  }

  AddTimeoffBalances(e: TimeOffBalances): Promise<any> {
    return this.httpClient.post<any>('https://localhost:7152/api/TimeOffBalances', e,this.header).toPromise();
  }
  GetTimeOffBalancesListByEmployeeId(idEmployee:string): Promise<TimeOffBalances[]> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/TimeOffBalances/ListByEmployeeId/'+idEmployee,this.header).toPromise();
  }
  DeleteTimeOffBalances(id:string): Promise<any> {
    return this.httpClient.delete<any>('https://localhost:7152/api/TimeOffBalances/'+id).toPromise();
  }
  GetLeaveTotalByIdEmployee(idEmployee:string): Promise<any> {
    return this.httpClient.get<any>('https://localhost:7152/api/TimeOffBalances/LeaveTotalByIdEmployee/'+idEmployee).toPromise();
  }

}
