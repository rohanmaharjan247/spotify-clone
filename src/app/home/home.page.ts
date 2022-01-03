import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SpotifyWebApiService } from './../services/spotify-web-api.service';
import { Router } from '@angular/router';
import { HelpersService } from './../shared/helpers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  topTracks: any;

  featuredPlaylists: any;

  newReleases: any;

  constructor(
    private helperService: HelpersService,
    private router: Router,
    private spotifyWebService: SpotifyWebApiService
  ) {}
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }
  ngOnInit(): void {
    if (!this.helperService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.getUserTopTracks();
      this.getFeaturedPlaylist();
      this.getNewReleases();
    }
  }

  getUserTopTracks() {
    this.spotifyWebService
      .getUserTopTracks(8)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((result: any) => {
        this.topTracks = result.items;
      });
  }

  getFeaturedPlaylist() {
    this.spotifyWebService
      .getFeaturedPlaylist()
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((result: any) => {
        this.featuredPlaylists = result.playlists?.items;
      });
  }

  getNewReleases() {
    this.spotifyWebService
      .getNewReleases(8)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((result: any) => {
        this.newReleases = result.albums?.items;
      });
  }

  get greetings() {
    const currentHour = new Date().getHours();

    if (currentHour > 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else if (currentHour >= 18 && currentHour < 23) {
      return 'Good Evening';
    } else {
      return 'Good Morning';
    }
  }

  get profile()
  {
    return localStorage.getItem('display_name');
  }


  artistsName(artists: any) {
    let artistName = '';
    if (artists?.length > 1) {
      artists.forEach((element, index) => {
        if(index === 0){
          artistName += `${element.name} (Feat.`
        }
        else if(index === artists.length - 1){
          artistName += `${element.name})`;
        }
        else{
          artistName += `${element.name}, `;
        }
      });
      return artistName;
    }
    return artists[0].name;
  }
}
