import { HelpersService } from './../../helpers.service';
import { SpotifyWebApiService } from './../../../services/spotify-web-api.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar-helper',
  templateUrl: './toolbar-helper.component.html',
  styleUrls: ['./toolbar-helper.component.scss'],
})
export class ToolbarHelperComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  @Input() title = '';

  profile: any;
  isDesktop = true;

  constructor(  private spotifyWebService: SpotifyWebApiService, private helperService: HelpersService) { }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit() {
    this.getCurrentUserProfile();
    this.isDesktop = this.helperService.getPlatform('desktop');
  }

  getCurrentUserProfile() {
    this.spotifyWebService
      .getCurrentUserProfile()
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((result: any) => {
        this.profile = result;
        localStorage.setItem('display_name', result.display_name);
        this.helperService.setProfileImage(result?.images?.[0].url);
      });
  }

}
