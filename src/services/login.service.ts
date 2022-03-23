import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }


  authentication(e: any): Promise<any> {
    return this.httpClient.post<any>('https://localhost:7152/api/Account/authenticatejwt', e).toPromise();
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    return token && !this.jwtHelper.isTokenExpired(token);
  }
  logOut() {
    localStorage.removeItem("jwt");
    this.userLogOut.emit(true);
  }

  decodejwt(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    //console.log(decodedToken);
    return decodedToken;
  }
}
