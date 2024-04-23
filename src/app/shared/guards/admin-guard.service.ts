import {inject, Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthGuardService} from "./auth-guard.service";
import {UserService} from "../services/user.service";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {A} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements OnDestroy {

  private readonly destroy$ = new Subject<void>()
  private canActivateFlag: boolean = false

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return !!this.userService.GetUser()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err)),
      )
      .subscribe({
        next: user => {
          this.canActivateFlag = user?.roleName == "SuperAdmin"

          if (!this.canActivateFlag) {
            this.router.navigateByUrl('/403')
          }
        },
        error: () => {
          this.canActivateFlag = false
          this.router.navigateByUrl('/403')
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}

export const AdminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {

  return inject(AdminGuardService).canActivate(next, state)
}
