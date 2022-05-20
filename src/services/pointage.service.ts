import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pointages } from 'src/models/Pointage';
import { WorkingHours } from 'src/models/WorkingHours';


@Injectable({
  providedIn: 'root'
})
export class PointageService {
  public tab: WorkingHours[] = [];
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };
  constructor(private httpClient: HttpClient) { }
  
  AddPointage(a:Pointages): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/Pointage', a).toPromise();
  }
  GetAllWorkingHoursByIdEmployee(id: string): Promise<any> {
    return this.httpClient.get<any>('https://localhost:7152/api/Pointage/' + id, this.header).toPromise();

  }
  GetallWorkingHoursOfAllEmployees():Promise<WorkingHours[]> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/Pointage/allWorkingHoursOfAllEmployees',this.header).toPromise();
  }
  

}
