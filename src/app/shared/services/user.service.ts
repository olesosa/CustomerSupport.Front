import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TokenService} from "./token.service";
import {UserLogin} from "../interfaces/user-login";
import {Observable} from "rxjs";
import {TokenInfo} from "../interfaces/token-info";
import {UserSignup} from "../interfaces/user-signup";
import {User} from "../interfaces/user";
import {UserInfo} from "../interfaces/user-info";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = `${environment.apiAddress}/Users`;
  private readonly identityUrl : string = `${environment.apiIdentityAddress}/Users`;

  constructor(private readonly http: HttpClient,
              private readonly storageService: TokenService) { }

  public logIn(userlogin: UserLogin): Observable<TokenInfo> {

    return this.http.post<TokenInfo>(`${this.identityUrl}/LogIn`, userlogin);
  }

  public signUp(userSignup: UserSignup): Observable<User> {

    return this.http.post<User>(`${this.identityUrl}/SignUp`, userSignup);
  }

  public refreshToken(): Observable<TokenInfo> {

    return this.http.post<TokenInfo>(`${this.identityUrl}/Token`,
      this.storageService.getToken());
  }

  public GetUser(): Observable<UserInfo>{

    return this.http.get<UserInfo>(this.apiUrl);
  }

  public getAllAdmins() : Observable<User[]>{

    return this.http.get<User[]>(this.apiUrl + '/Admins')
  }

}
