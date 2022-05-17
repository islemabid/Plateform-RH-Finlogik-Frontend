import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holiday } from 'src/models/Holiday';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

 
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };

  constructor(private httpClient: HttpClient) { }
  
  createHoliday(a:Holiday): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/Holiday', a,this.header).toPromise();
  }
  GetAllHolidays(): Promise<any> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/Holiday/all', this.header).toPromise();
  }
}
