import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NotificationCountResult, NotificationResult } from 'src/models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };

  constructor(private httpClient: HttpClient) { }


  getNotificationCount():Promise<NotificationCountResult> {  
    return this.httpClient.get<NotificationCountResult>('https://localhost:7152/api/Notification/notificationcount', this.header).toPromise();
  }  
  
  getNotificationMessage():Promise<NotificationResult[]> {  
  
    return this.httpClient.get<NotificationResult[]>('https://localhost:7152/api/Notification/message', this.header).toPromise(); 
      
  } 
  UpdateNotificationStatus(notif:any) :Promise<any> {
    return this.httpClient.put<any>('https://localhost:7152/api/Notification',notif, this.header).toPromise(); 
  }
} 
