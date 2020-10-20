import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

/**
 * App Modules
 * All Modules of this app should be placed here
 */
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { HttpClientModule } from "@angular/common/http";
import { LoginModule } from "./login/login.module";

/**
 * App Components
 * All Components of this app should be placed here
 */
import { HeaderComponent } from "./dashboard/header/header.component";
import { SidebarComponent } from "./dashboard/sidebar/sidebar.component";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
