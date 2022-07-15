import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../ngrx/app.state";
import {getAuth} from "../ngrx/auth/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getAuth).pipe(
      map((user) => {
        let hasUser = user.accessToken !== null && user.status !== 'initial';

        if(hasUser) {
          this.router.navigateByUrl("/");
        }

        return true;
      }),
    )
  }
}
