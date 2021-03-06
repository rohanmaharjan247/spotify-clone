import { HelpersService } from './../../../../shared/helpers.service';
import { LoadingService } from './../../../../shared/helpers/services/loading.service';
import { takeUntil } from 'rxjs/operators';
import { AlbumsService } from './../../../../services/user/albums.service';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  private readonly toUnsubsribe$ = new Subject<void>();

  savedAlbums: any;
  loading = false;

  isDesktop = true;

  constructor(private albumsService: AlbumsService, private loadingService: LoadingService, private helperService: HelpersService) { }
  ngOnDestroy(): void {
    this.toUnsubsribe$.next();
    this.toUnsubsribe$.complete();
  }

  ngOnInit() {
    this.isDesktop = this.helperService.getPlatform('desktop');
    this.getSavedAlbums();
  }

  async getSavedAlbums(){
    this.loading = await this.loadingService.showLoader();
    this.albumsService.getSavedAlbums().pipe(takeUntil(this.toUnsubsribe$)).subscribe(async (result: any) => {
      console.log(result);
      this.savedAlbums = result.items;
      this.loading = await this.loadingService.dismiss();
    })
  }

  playTrack(){}

}
