import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = 'https://localhost:7152/api/File';
  constructor(private http: HttpClient) { }

   public uploadCV(formData: FormData) {
    return this.http.post(`${this.url}/uploadCV`, formData,{ reportProgress: true, observe: 'events' });
   }
   
   public upload(formData: FormData) {
    return this.http.post(`${this.url}`, formData,{ reportProgress: true, observe: 'events' });
   }
 
   public download(fileUrl) {
    return this.http.get(`${this.url}/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      responseType: 'arraybuffer' as 'json'
    
    });
  }

  public getFile(response) {
    return  `https://localhost:7152/${response}`;
  }
  

}

