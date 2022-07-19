import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {routes} from "./routes/routes.main";
import {RouterModule} from "@angular/router";
import { LoginComponent } from './components/auth/login/login.component';
import { BreadcrumbComponent } from './components/common/breadcrumb/breadcrumb.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { StoreModule } from '@ngrx/store';
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {appReducers} from "./ngrx/app.reducers";
import {environment} from "../environments/environment";
import {appEffects} from "./ngrx/app.effects";
import {EffectsModule} from "@ngrx/effects";
import {ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {SmallLoaderComponent} from "./components/common/small-loader/small-loader.component";
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatepickerComponent} from "./components/common/datepicker/datepicker.component";
import { SeatModalComponent } from './components/modals/seat-modal/seat-modal.component';
import { ErrorComponent } from './components/common/error/error.component';
import {BookingsComponent} from "./components/dashboard/manager-dashboard/bookings/bookings.component";
import { BookingModalComponent } from './components/modals/booking-modal/booking-modal.component';
import { SeatsTableComponent } from './components/seats/seats-table/seats-table.component';
import { SeatsTableListComponent } from './components/seats/seats-table-list/seats-table-list.component';
import { SeatsTableElementComponent } from './components/seats/seats-table-element/seats-table-element.component';
import { SeatComponent } from './pages/seat/seat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BreadcrumbComponent,
    RegisterComponent,
    SmallLoaderComponent,
    DashboardComponent,
    DatepickerComponent,
    SeatModalComponent,
    ErrorComponent,
    BookingsComponent,
    BookingModalComponent,
    SeatsTableComponent,
    SeatsTableListComponent,
    SeatsTableElementComponent,
    SeatComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes, {}),
    HttpClientModule,
    StoreModule.forRoot(appReducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(appEffects),
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents:[
    SeatModalComponent,
    BookingModalComponent
  ],
})
export class AppModule { }
