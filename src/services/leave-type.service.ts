import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveType } from 'src/models/LeaveType';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
 
  constructor(private httpClient: HttpClient) { }

  GetAllLeaveType(): Promise<LeaveType[]> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/LeaveType/allLeaveType').toPromise();

  }
}
