import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {StorageService} from "./storage.service";
import {UserLogin} from "../../shared/interfaces/user-login";
import {Observable} from "rxjs";
import {TokenInfo} from "../../shared/interfaces/token-info";
import {UserSignup} from "../../shared/interfaces/user-signup";
import {User} from "../../shared/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = `${environment.apiAddress}/Users`;
  private readonly identityUrl : string = `${environment.apiIdentityAddress}/Users`;

  constructor(private readonly httpClient: HttpClient,
              private readonly storageService: StorageService) { }

  public logIn(userlogin: UserLogin): Observable<TokenInfo> {

    return this.httpClient.post<TokenInfo>(`${this.identityUrl}/LogIn`, userlogin);
  }

  public signUp(userSignup: UserSignup): Observable<User> {

    return this.httpClient.post<User>(`${this.identityUrl}/SignUp`, userSignup);
  }

  public signUpApi(): Observable<User> {

    return this.httpClient.post<User>(`${this.apiUrl}/SignUp`, {});
  }

  public refreshToken(): Observable<TokenInfo> {
    const request = {
      accessToken: this.storageService.getToken().token,
      refreshToken: this.storageService.getToken().refreshToken
    };

    return this.httpClient.post<TokenInfo>(`${this.identityUrl}/Token`, request);
  }

  public isUserExist(email: string): Observable<boolean>{

    return this.httpClient.post<boolean>(this.identityUrl, email)
  }

  public GetUser(): Observable<User>{

    return this.httpClient.get<User>(this.apiUrl);
  }

}
