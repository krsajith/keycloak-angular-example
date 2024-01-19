import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  keycloak!: Keycloak;

  username = 'alice';
  password = 'alice';

  title = 'keycloak-angular-example';
  authenticated = false;

  constructor() {
    this.init();
  }


  async init() {


    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'taomish',
      clientId: 'login-app'
    });

    // spring.security.oauth2.client.registration.keycloak.authorization-grant-type=authorization_code
    // spring.security.oauth2.client.registration.keycloak.scope=openid
    // spring.security.oauth2.client.provider.keycloak.issuer-uri=http://localhost:8080/realms/taomish
    // spring.security.oauth2.client.provider.keycloak.user-name-attribute=preferred_username
    // spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/taomish



    try {
      this.authenticated = await this.keycloak.init({});
      console.log(`User is ${this.authenticated ? 'authenticated' : 'not authenticated'}`);
      if (this.authenticated) {
        console.log(this.keycloak.token);
      }

    } catch (error) {
      console.error('Failed to initialize adapter:', error);
    }
  }

  //Login with default provider configured in key clock
  async ssoLogin() {

    const result = await this.keycloak.login({
      scope: 'openid',
      redirectUri: 'http://localhost:4200'
    })

    console.log(result);

  }

  async ssoLogout() {
    const result = this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
    console.log(result);
  }

  async login() {


    const url = "http://localhost:8080/realms/quickstart/protocol/openid-connect/token";


    const response = await fetch(url, {
      method: "POST",
      body: `client_id=spa&password=${this.password}&username=${this.username}&grant_type=password`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        'Access-Control-Allow-Origin': '*'
      }
    });
    if(response){
      const s = await response.text();
      console.log(s);
      
      // response.body.getReader().read().then(function (data) {
      //   var string = new TextDecoder("utf-8").decode(data.value);
      //   console.log(string);
      // });
  
    }
  }
}