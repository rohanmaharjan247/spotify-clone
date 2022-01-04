import { HelpersService } from './../../shared/helpers.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PlaylistsService } from './../../services/user/playlists.service';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.page.html',
  styleUrls: ['./user-playlists.page.scss'],
})
export class UserPlaylistsPage implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();
  playlistId = null;

  profile_name = localStorage.getItem('display_name');

  playlist: any;

  constructor(private avRoute: ActivatedRoute, private playlistsService: PlaylistsService, private helperService: HelpersService) {
    this.avRoute.params
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((params) => {
        this.playlistId = params.playlistId;
      });
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit() {
    this.getPlaylist();
  }

  getPlaylist(){
    if(this.playlistId){
      this.playlistsService.getUserPlaylist(this.playlistId).pipe(takeUntil(this.toUnsubscribe$)).subscribe((result: any) => {
        console.log(result);
        this.playlist = result;
        this.helperService.setTitle(`${result?.name}`);
      })
    }

  }
}
