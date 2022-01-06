import { LoadingService } from './../shared/helpers/services/loading.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
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

  recommendations: any;

  constructor(
    private helperService: HelpersService,
    private router: Router,
    private spotifyWebService: SpotifyWebApiService,
    private loadingService: LoadingService
  ) {
    this.helperService.setTitle('Home');
  }
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
      this.getRecommendation();
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

  getRecommendation(){
    const seed_artists = this.spotifyWebService.getUsersTopArtists(2);
    const seed_tracks = this.spotifyWebService.getUserTopTracks(2);

    forkJoin([seed_artists, seed_tracks]).pipe(
      switchMap((result: any) => {
        const seedartists = result[0]?.items?.map(a => a.id).join(',');
        const seedtracks = result[1]?.items?.map(a => a.id).join(',');
        const seedgenres = result[0]?.items?.map(a => a.genres)?.[0].splice(0, 1);

        return this.spotifyWebService.getRecommendation(seedtracks, seedartists, seedgenres)
      }),
      takeUntil(this.toUnsubscribe$)
    ).subscribe((result: any) =>{
     this.recommendations = result.tracks;

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
}
