import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoadingService } from './../../../../shared/helpers/services/loading.service';
import { ArtistsService } from './../../../../services/user/artists.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  followedArtists: any;
  loading = false;

  constructor(private artistsService: ArtistsService, private loadingService: LoadingService) { }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit() {
    this.getFollowedArtists();
  }

  async getFollowedArtists(){
    this.loading = await this.loadingService.showLoader();

    this.artistsService.getFollowedArtists().pipe(takeUntil(this.toUnsubscribe$)).subscribe(async (result:any) => {
        console.log(result);
        this.followedArtists = result.artists.items;
        this.loading = await this.loadingService.dismiss();
    })
  }

}
