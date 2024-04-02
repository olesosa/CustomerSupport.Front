import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {StorageService} from "./storage.service";
import {UserLogin} from "../interfaces/user-login";
import {Observable} from "rxjs";
import {TokenInfo} from "../interfaces/token-info";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = `${environment.apiIdentityAddress}/Users`;

  constructor(private readonly httpClient: HttpClient,
              private readonly storageService: StorageService) { }

  public logIn(userlogin: UserLogin): Observable<TokenInfo> {
    // debugger;

    return this.httpClient.post<TokenInfo>(`${this.apiUrl}/login`, userlogin);
  }

  public refreshToken(): Observable<TokenInfo> {
    const request = {
      accessToken: this.storageService.getToken(),
      refreshToken: this.storageService.getRefreshToken()
    };

    return this.httpClient.post<TokenInfo>(`${this.apiUrl}/refresh-token`, request);
  }

  // public getCurrentUser(): Observable<CurrentUserInterface> {
  //   return this.httpClient.get<CurrentUserInterface>(`${environment.apiAddress}/me`);
  // }


}
