import { HelpersService } from './../helpers.service';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'playlistProfileImage'
})
export class PlaylistProfileImagePipe implements PipeTransform {
  constructor(private helperService: HelpersService){}

  transform(owner: any): Observable<string> {
    const profileImage = (owner.display_name === 'Spotify') ? of('assets/icon/spotify-2.svg') : this.helperService.getProfileImage().pipe(
      map((result) => result)
    );
    return profileImage;
  }

}
