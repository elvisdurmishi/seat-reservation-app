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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BreadcrumbComponent,
    RegisterComponent,
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
    EffectsModule.forRoot(appEffects)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
