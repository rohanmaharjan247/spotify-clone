import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artistsName'
})
export class ArtistsNamePipe implements PipeTransform {

  transform(artists: any): string {
    let artistName = '';
    if (artists?.length > 1) {
      artists.forEach((element, index) => {
        if(index === 0){
          artistName += `${element.name} (Feat.`
        }
        else if(index === artists.length - 1){
          artistName += `${element.name})`;
        }
        else{
          artistName += `${element.name}, `;
        }
      });
      return artistName;
    }
    return artists[0].name;
  }

}
