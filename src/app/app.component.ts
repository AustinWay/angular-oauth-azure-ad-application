// https://www.youtube.com/watch?v=RSqREkxe2z0

import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oauth-application';

  // creates instance of service for component to use
  constructor(private oauthService: OAuthService){

  }

  private async ConfigureAuth(): Promise<void> {
    this.oauthService.loginUrl = ''; //URL that user is redirected to at login, Azure AD login link
    this.oauthService.clientId = ''; 
    this.oauthService.resource = ''; //Web API that app accesses
    this.oauthService.logoutUrl = '';
    this.oauthService.redirectUri = window.location.origin + '/'; //URI defines redirect response from Azure AD
    this.oauthService.scope = 'openid'; // https://openid.net/connect/
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage); // store actual access token if it comes back from Azure
  }

  // configure authorization function that calls ConfigureAuth()
  async ngOnInit() {
    await this.ConfigureAuth();
    // check first if there is an active token already used. If is, dont see login screen, use existing token
    this.oauthService.tryLogin({});

    // if token does not exist, initialize implicit client
    if(!this.oauthService.getAccessToken()){
      await this.oauthService.initImplicitFlow();
    }

    console.log(this.oauthService.getAccessToken());
  }
}
