import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from 'src/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public tab: Posts[] = [];
  constructor(private httpClient: HttpClient) { }
  savePost(e: Posts): Promise<Posts> {

    return this.httpClient.post<Posts>('https://localhost:7152/api/Post', e).toPromise();
  }
  GetALL(): Promise<any[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/Post/all').toPromise();


  }
}
