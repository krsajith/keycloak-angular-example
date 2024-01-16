import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  keycloak!: Keycloak;

  title = 'keycloak-angular-example';

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
      const authenticated = await this.keycloak.init({});




      console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    } catch (error) {
      console.error('Failed to initialize adapter:', error);
    }
  }

  async login() {

    const result = await this.keycloak.login({
      scope: 'openid',
      redirectUri: 'http://localhost:4200'
    })

    console.log(result);

  }

  async logout() {
    const result = this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
    console.log(result);

  }
}