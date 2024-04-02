import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly token = 'token';
  private readonly tokenExpiration = 'tokenExpiration';
  private readonly refreshToken = 'refreshToken';
  private readonly currentUserRoles = 'currentUserRoles';
  private readonly initialUserRoles = 'initialUserRoles';
  private readonly currentLanguage = 'currentLanguage';
  private readonly freelancerDetailsPageUrl = 'freelancerDetailsPageUrl';

  public clear(): void {
    localStorage.clear();
  }

  public setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshToken, refreshToken);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshToken);
  }

  public removeToken(): void {
    return localStorage.removeItem(this.token);
  }

  public removeRefreshToken(): void {
    return localStorage.removeItem(this.token);
  }

  public setTokenExpiration(tokenExpiration: string): void {
    localStorage.setItem(this.tokenExpiration, tokenExpiration);
  }

  public getTokenExpiration(): string | null {
    return localStorage.getItem(this.tokenExpiration);
  }

  public save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public load<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) || '{}') as T;
  }

  public setCurrentUserRoles(roles: string[]): void {
    localStorage.setItem(this.currentUserRoles, roles.join(','));
  }

  public setInitialRolesRoles(roles: string[]): void {
    localStorage.setItem(this.initialUserRoles, JSON.stringify(roles));
  }

  public getCurrentUserRoles(): string[] | undefined {
    return localStorage.getItem(this.currentUserRoles)?.split(',');
  }

  public getInitialRoles(): string[] {
    return JSON.parse(localStorage.getItem(this.initialUserRoles)  || '{}');
  }

  public checkInitialRoles(): boolean {
    return localStorage.getItem(this.initialUserRoles) !== null;
  }

  public getCurrentLanguage(): string | null {
    return localStorage.getItem(this.currentLanguage);
  }

  public setCurrentLanguage(languageCode: string): void {
    localStorage.setItem(this.currentLanguage, languageCode);
  }

  public getFreelancerDetailsPageUrl(): string | null {
    return localStorage.getItem(this.freelancerDetailsPageUrl);
  }

  public setFreelancerDetailsPageUrl(url: string): void {
    localStorage.setItem(this.freelancerDetailsPageUrl, url);
  }

  public removeFreelancerDetailsPageUrl(): void {
    localStorage.removeItem(this.freelancerDetailsPageUrl);
  }
}
