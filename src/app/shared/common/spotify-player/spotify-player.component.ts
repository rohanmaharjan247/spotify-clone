import { takeUntil } from 'rxjs/operators';
import { PlayerService } from './../../../services/user/player.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.scss'],
})
export class SpotifyPlayerComponent implements OnInit {
  private readonly toUnsubscribe$ = new Subject<void>();

  player: any;

  volume = 100;

  isPlaying = false;
  playIcon = 'play';

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getCurrentlyPlayingTrack();
  }

  getCurrentlyPlayingTrack(){
    this.playerService.getCurrentlyPlayingTrack().pipe(takeUntil(this.toUnsubscribe$)).subscribe((result: any) => {
      console.log(result);
      this.player = result;
    })
  }

  playTrack(){
    this.isPlaying = !this.isPlaying;

    this.playIcon = this.isPlaying ? 'pause' : 'play';

  }

}
