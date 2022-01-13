import { HelpersService } from './../../../../../shared/helpers.service';
import { ArtistsService } from './../../../../../services/user/artists.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, forkJoin, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  artistId: string;

  artist: any;

  artistAlbums: any;
  artistTopTracks: any;
  relatedArtists: any;

  isDesktop = true;

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    effect: 'slide',
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    loop: false,
    pagination: true,
    navigation: true
  };

  isFollowing$ = new Observable<boolean>();

  constructor(
    private avRoute: ActivatedRoute,
    private artistsService: ArtistsService,
    private helperService: HelpersService
  ) {
    this.avRoute.paramMap
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((params) => {
        this.artistId = params.get('artistId');
      });
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit() {
    this.getArtist();

    this.getArtistsTop();

    this.checkIfFollowing();

    this.isDesktop = this.helperService.getPlatform('desktop');
  }

  getArtist() {
    if (this.artistId) {
      this.artistsService
        .getArtist(this.artistId)
        .pipe(takeUntil(this.toUnsubscribe$))
        .subscribe((result: any) => {
          console.log(result);
          this.artist = result;
        });
    }
  }

  getArtistsTop() {
    const albums$ = this.artistsService.getArtistsAlbum(this.artistId);
    const topTracks$ = this.artistsService.getArtistsTopTracks(this.artistId);
    const relatedArtists$ = this.artistsService.getRelatedArtists(
      this.artistId
    );

    forkJoin([albums$, topTracks$, relatedArtists$])
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((result: any) => {
        console.log(result);
        this.artistAlbums = result[0].items;
        this.artistTopTracks = result[1].tracks;
        this.relatedArtists = result[2].artists;
      });
  }

  playTrack(){}

  checkIfFollowing(){
    this.isFollowing$ = this.artistsService.checkIfFollowingArtists(this.artistId).pipe(map(result => result[0]), takeUntil(this.toUnsubscribe$));
  }
}
