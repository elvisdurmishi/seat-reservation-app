import {Routes} from "@angular/router";
import {LoginComponent} from "../components/auth/login/login.component";
import {RegisterComponent} from "../components/auth/register/register.component";
import {DashboardComponent} from "../components/dashboard/dashboard/dashboard.component";
import {AuthGuard} from "../guards/auth.guard";
import {LoggedInGuard} from "../guards/logged-in.guard";
import {BookingsComponent} from "../components/dashboard/manager-dashboard/bookings/bookings.component";
import {ManagerAuthGuardGuard} from "../guards/manager-auth-guard.guard";

export const routes: Routes = [
  {path: "", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: "register", component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: "manager-register", component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: "seat/:id/bookings", component: BookingsComponent, canActivate: [ManagerAuthGuardGuard]},
];
