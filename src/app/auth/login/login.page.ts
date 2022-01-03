import { HelpersService } from './../../shared/helpers.service';
import { Component, OnInit } from '@angular/core';
import { SpotifyAuth, Config } from '@awesome-cordova-plugins/spotify-auth/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [SpotifyAuth]
})
export class LoginPage implements OnInit {
   config: Config = {
    clientId: '1904a6671c9e4773b4c3afc5c522a6d6',
    redirectUrl: 'rohanm://callback',
    scopes: ['profile', 'email', 'streaming'],
    tokenExchangeUrl: '',
    tokenRefreshUrl: ''
  }

  expiresIn = 0;

  constructor(private spotifyAuthService: SpotifyAuth, private helperService: HelpersService, private router: Router) {
    if(window.location.hash){
      let hashString = window.location.hash.substring(1).split('=');
      localStorage.setItem('authToken', hashString[1]);
      localStorage.setItem('expiresIn', hashString[hashString.length - 1])
      this.expiresIn = +hashString[hashString.length - 1];
    }
   }

  ngOnInit() {
    if(this.helperService.isAuthenticated()){
      this.router.navigate(['/home']);
    }
  }

  login(){
    if(!this.helperService.getPlatform("desktop")){
      this.spotifyAuthService.authorize(this.config).then(({accessToken, expiresAt}) => {
        console.log(`Got the access token`, accessToken);
        console.log(`Expires at ${expiresAt}`)
      })
    }
    else{
      const loginurl = this.helperService.createAuthorizeUrl();
      window.location.href = loginurl;
    }
  }

}
