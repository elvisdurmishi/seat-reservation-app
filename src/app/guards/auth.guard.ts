import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, tap} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../ngrx/app.state";
import {getUser} from "../ngrx/auth/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.store = store;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getUser).pipe(
      map((user) => user.accessToken !== null),
      tap((hasAccessToken) => {
        if(!hasAccessToken) {
          this.router.navigateByUrl("/login");
        }
      })
    )
  }
}
