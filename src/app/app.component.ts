import { HelpersService } from './shared/helpers.service';
import { SpotifyWebApiService } from './services/spotify-web-api.service';
import { TitleCasePipe } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [TitleCasePipe],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  appPages = [
    {
      name: 'Home',
      url: '/home',
      icon: 'home-sharp',
    },
    {
      name: 'Search',
      url: '/home',
      icon: 'search-sharp',
    },
    {
      name: 'Your Library',
      url: '/home',
      icon: 'library-sharp',
    },
  ];

  subPages = [
    {
      name: 'Create Playlist',
      url: '/home',
      icon: 'add-sharp',
    },
    {
      name: 'Liked Songs',
      url: '/home',
      icon: 'heart-sharp',
    },
  ];

  isAuthenticated = false;

  constructor(
    private titleService: Title,
    private titleCase: TitleCasePipe,
    private router: Router,
    private helperService: HelpersService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setPageTitle(event.url);
        this.isAuthenticated = this.helperService.isAuthenticated();
      }
    });
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }
  ngOnInit(): void {
  }

  setPageTitle(title: string) {
    let titleName = title.split('/');
    let name = titleName[titleName.length - 1];
    //TODO: change it to a relative url instead of episode when necessary
    if (titleName.length > 2 && titleName.includes('episode')) {
      name = `${titleName[titleName.length - 2]} ${name}`;
    }
    name = name.replace('-', ' ').replace('-', ' ');
    name = this.titleCase.transform(name);
    name = name === '' ? 'Home' : name;
    this.titleService.setTitle(`${name} - Spotify Clone`);
  }
}
