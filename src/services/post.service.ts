import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from 'src/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public tab: Posts[] = [];
  public header = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("jwt")))}` })

  };
  constructor(private httpClient: HttpClient) { }
  savePost(e: Posts): Promise<Posts> {

    return this.httpClient.post<Posts>('https://localhost:7152/api/Post', e,this.header).toPromise();
  }
  GetALL(): Promise<any[]> {

    return this.httpClient.get<any[]>('https://localhost:7152/api/Post/all',this.header).toPromise();


  }
  RemovePostById(id: string): Promise<void> {
    return this.httpClient.delete<void>('https://localhost:7152/api/Post/' + id,this.header).toPromise();


  }
  EditPost(post: Posts): Promise<any> {
    return this.httpClient.put<any>('https://localhost:7152/api/Post', post, this.header).toPromise();


  }
}
