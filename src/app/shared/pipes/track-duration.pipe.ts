import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackDuration'
})
export class TrackDurationPipe implements PipeTransform {

  transform(value: number): string {
    let second = Math.floor((value / 1000 % 60));
    let minute = Math.floor((value / 1000) / 60)
    return `${minute}:${second < 10 ? '0' + second : second}`
  }

}
