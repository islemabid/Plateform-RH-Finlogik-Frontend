import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeOffBalances } from 'src/models/TimeOffBalances';

@Injectable({
  providedIn: 'root'
})
export class TimeOffBalancesService {
  public tab: TimeOffBalances[] = [];
  constructor(private httpClient: HttpClient) { }

  GetALL(): Promise<TimeOffBalances[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/TimeOffBalances/all').toPromise();


  }
}
