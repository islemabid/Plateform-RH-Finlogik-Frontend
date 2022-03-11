import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }


  authentication(e: any): Promise<any> {
    return this.httpClient.post<any>('https://localhost:7152/api/Account/authenticatejwt', e).toPromise();

  }
  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  logOut() {
    localStorage.removeItem("jwt");
  }
  decodejwt(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    //console.log(decodedToken);
    return decodedToken;
  }
}
