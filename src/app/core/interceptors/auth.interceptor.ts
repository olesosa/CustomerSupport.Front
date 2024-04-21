import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, finalize, Observable, of, switchMap, take, throwError} from 'rxjs';
import {UserService} from "../../shared/services/user.service";
import {TokenService} from "../../shared/services/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string>('')

  constructor(private readonly userService: UserService,
              private readonly storageService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.storageService.getToken().token;
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('LogIn') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return of(error)
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next('');

      const token = this.storageService.getToken().refreshToken;

      if (token)
        return this.userService.refreshToken()
          .pipe(
            switchMap(token => {
              this.isRefreshing = false
              this.storageService.setToken(token)
              return next.handle(this.addTokenHeader(request, token.token));
            }),
            catchError((err) => {
              this.isRefreshing = false;

              this.storageService.removeToken();
              return throwError(err);
            })
          );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: any, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
