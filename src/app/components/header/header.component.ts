import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../ngrx/app.state";
import {Store} from "@ngrx/store";
import {getUser} from "../../ngrx/auth/auth.selectors";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {logout} from "../../ngrx/auth/auth.actions";
import {NavigationStart, Router, Event as NavigationEvent} from "@angular/router";
import {map} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user$ = this.store.select(getUser);
  faArrowRightFromBracket = faArrowRightFromBracket;
  pathname: string = '';
  event$;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.event$ = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationStart) {
          this.pathname = event.url;
        }
      });
  }

  logout() {
    this.store.dispatch(logout());
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }
}
