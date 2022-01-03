import { Router } from '@angular/router';
import { SpotifyWebApiService } from './../../../services/spotify-web-api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  expiresIn = +localStorage.getItem('expiresIn');

  appPages = [
    {
      name: 'Home',
      url: '/home',
      icon: 'home-sharp',
    },
    {
      name: 'Search',
      url: '/search',
      icon: 'search-sharp',
    },
    {
      name: 'Your Library',
      url: '/library',
      icon: 'library-sharp',
    },
  ];

  subPages = [
    {
      name: 'Create Playlist',
      url: '/playlist',
      icon: 'add-sharp',
    },
    {
      name: 'Liked Songs',
      url: '/likes',
      icon: 'heart-sharp',
    },
  ];

  isAuthenticated = false;

  playlists: any;

  constructor(private spotifyWebApiService: SpotifyWebApiService, private router: Router) { }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit() {
    this.getCurrentUserPlaylist();

    setTimeout(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('expiresIn');
      localStorage.clear();
      this.router.navigate(['/login']);
    }, this.expiresIn * 1000);
  }

  getCurrentUserPlaylist() {
    this.spotifyWebApiService
      .getCurrentUserPlaylist()
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((result: any) => {
        this.playlists = result.items;
      });
  }

}
