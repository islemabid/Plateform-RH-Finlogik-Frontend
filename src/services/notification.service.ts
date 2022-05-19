import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NotificationCountResult, NotificationResult } from 'src/models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


 

  constructor(private httpClient: HttpClient) { }


  getNotificationCount():Promise<NotificationCountResult> {  
    return this.httpClient.get<NotificationCountResult>('https://localhost:7152/api/Notification/notificationcount').toPromise();
  }  
  
  getNotificationMessage():Promise<NotificationResult[]> {  
  
    return this.httpClient.get<NotificationResult[]>('https://localhost:7152/api/Notification/message').toPromise(); 
      
  } 
  UpdateNotificationStatus(notif:any) :Promise<any> {
    return this.httpClient.put<any>('https://localhost:7152/api/Notification',notif).toPromise(); 
  }
} 
