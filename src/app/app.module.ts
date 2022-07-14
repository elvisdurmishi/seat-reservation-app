import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {routes} from "./routes/routes.main";
import {RouterModule} from "@angular/router";
import { LoginComponent } from './components/auth/login/login.component';
import { BreadcrumbComponent } from './components/common/breadcrumb/breadcrumb.component';
import { RegisterComponent } from './components/auth/register/register.component';

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
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
