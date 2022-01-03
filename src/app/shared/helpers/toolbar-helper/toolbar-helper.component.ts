import { SpotifyWebApiService } from './../../../services/spotify-web-api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar-helper',
  templateUrl: './toolbar-helper.component.html',
  styleUrls: ['./toolbar-helper.component.scss'],
})
export class ToolbarHelperComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();
  profile: any;

  constructor(  private spotifyWebService: SpotifyWebApiService) { }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit() {
    this.getCurrentUserProfile();
  }

  getCurrentUserProfile() {
    this.spotifyWebService
      .getCurrentUserProfile()
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((result: any) => {
        this.profile = result;
        localStorage.setItem('display_name', result.display_name);
      });
  }

}
