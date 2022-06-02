import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from 'src/models/Email';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }

 sendMail(mail:Email): Promise<any> {
   
    return this.httpClient.post<any>('https://localhost:7152/api/Mail/Send', mail).toPromise();
  }
  sendMailCandidat(mail:Email): Promise<any> {
   
    return this.httpClient.post<any>('https://localhost:7152/api/Mail/SendCandidatMail', mail).toPromise();
  }
}
