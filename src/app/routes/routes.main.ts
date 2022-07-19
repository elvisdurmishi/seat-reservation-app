import {Routes} from "@angular/router";
import {LoginComponent} from "../components/auth/login/login.component";
import {RegisterComponent} from "../components/auth/register/register.component";
import {DashboardComponent} from "../components/dashboard/dashboard/dashboard.component";
import {AuthGuard} from "../guards/auth.guard";
import {LoggedInGuard} from "../guards/logged-in.guard";
import {ManagerAuthGuardGuard} from "../guards/manager-auth-guard.guard";
import {SeatComponent} from "../pages/seat/seat.component";
import {BookingsPageComponent} from "../pages/bookings-page/bookings-page.component";

export const routes: Routes = [
  {path: "", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: "register", component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: "manager-register", component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: "seat", component: SeatComponent, canActivate: [ManagerAuthGuardGuard]},
  {path: "seat/:id/bookings", component: BookingsPageComponent, canActivate: [ManagerAuthGuardGuard]},
];
