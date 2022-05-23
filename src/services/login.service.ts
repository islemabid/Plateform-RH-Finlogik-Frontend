import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = !!localStorage.getItem("jwt");
  token: string = localStorage.getItem("jwt");
  role: string = null;
  template: object = { rh: false, employee: false, login: true };

  // notifyOnUserLogout : EventEmitter<boolean> = new EventEmitter<boolean>();
  // notifyOnUserRoleChanges //

  userLogOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  userRole: EventEmitter<string> = new EventEmitter<string>();

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }


  async authentication(e: any): Promise<any> {
    /*try {
      const { token } = await this.httpClient.post<any>('https://localhost:7152/api/Account/authenticatejwt', e).toPromise();
      this.token = token;
      localStorage.setItem('jwt', this.token);

    } catch (err) {

    }*/
    return await this.httpClient.post<any>('https://localhost:7152/api/Account/authenticatejwt', e).toPromise();
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
    return decodedToken;
  }
}
