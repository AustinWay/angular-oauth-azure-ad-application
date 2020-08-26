import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuthService } from 'angular-oauth2-oidc'; // Importing OAuthService

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [OAuthService], // adding provider to find the OAuthService
  bootstrap: [AppComponent]
})
export class AppModule { }
