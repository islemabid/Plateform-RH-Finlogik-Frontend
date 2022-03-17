import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeePosts } from 'src/models/EmployeePost';

@Injectable({
  providedIn: 'root'
})
export class AffectEmployeePostService {

  public tab: EmployeePosts[] = [];
  constructor(private httpClient: HttpClient) { }
  GetALL(): Promise<any[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/EmployeePost/all').toPromise();


  }
  affect(e: any): Promise<any> {

    return this.httpClient.post<any>('https://localhost:7152/api/EmployeePost', e).toPromise();
  }

  GetPostsByIdEmployee(id: string): Promise<any[]> {
    return this.httpClient.get<any[]>('https://localhost:7152/api/EmployeePost/' + id).toPromise();
  }
}
