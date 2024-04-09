import {Injectable} from '@angular/core';
import {TokenInfo} from "../../shared/interfaces/token-info";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly token = 'token';
  private readonly refreshToken = 'refreshToken';

  public clear(): void {
    localStorage.clear();
  }

  public setToken(token: TokenInfo) {
    localStorage.setItem(this.token, token.token);
    localStorage.setItem(this.refreshToken, token.refreshToken);
  }

  public getToken(): TokenInfo {

    let token: TokenInfo = {
      token: '',
      refreshToken: ''
    };

    if (localStorage.getItem(this.token) && localStorage.getItem(this.refreshToken)) {
      token.token = localStorage.getItem(this.token)!;
      token.refreshToken = localStorage.getItem(this.refreshToken)!;
    }

    return token;

  }

  public removeToken() {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.refreshToken);
  }

}
