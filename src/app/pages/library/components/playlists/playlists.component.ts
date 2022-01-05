import { takeUntil } from 'rxjs/operators';
import { HelpersService } from './../../../../shared/helpers.service';
import { PlaylistsService } from './../../../../services/user/playlists.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  playlists: any;

  constructor(
    private playlistService: PlaylistsService,
    private helperService: HelpersService
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

  getUserPlaylists() {
    this.playlistService
      .getUserPlaylists()
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((result: any) => {
        this.playlists = result.items;
      });
  }
}
