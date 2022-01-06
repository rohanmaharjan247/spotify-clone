import { LoadingService } from './../../../../shared/helpers/services/loading.service';
import { takeUntil } from 'rxjs/operators';
import { HelpersService } from './../../../../shared/helpers.service';
import { PlaylistsService } from './../../../../services/user/playlists.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  playlists: any;

  loading = false;

  constructor(
    private playlistService: PlaylistsService,
    private helperService: HelpersService,
    private loadingService: LoadingService
  ) {
    this.helperService.setTitle('Playlists');
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit() {
    this.getUserPlaylists();
  }

  async getUserPlaylists() {
    this.loading = await this.loadingService.showLoader();
    this.playlistService
      .getUserPlaylists()
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe(async (result: any) => {
        this.playlists = result.items;
        this.loading = await this.loadingService.dismiss();
      });
  }
}
