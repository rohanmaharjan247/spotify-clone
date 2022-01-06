import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalDuration',
})
export class TotalDurationPipe implements PipeTransform {
  transform(value: any): string {
    const playlistTracks = value.map((x) => x.track);
    const durations: any[] = playlistTracks.map((x) => x.duration_ms);

    const totalDuration = durations.reduce((prev, curr) => {
      return prev + curr;
    });
    let second = Math.floor((totalDuration / 1000) % 60);
    let minute = Math.floor((totalDuration / 1000 / 60) % 60);
    let hour = Math.floor(totalDuration / 1000 / 60 / 60);

    return `${hour > 0 ? hour + ' hr' : ''} ${
      minute > 0 ? minute + ' min' : '0' + minute + ' min'
    } ${
      hour <= 0 ? (second > 9 ? second + ' sec' : '0' + second + ' sec') : ''
    }`;
  }
}
