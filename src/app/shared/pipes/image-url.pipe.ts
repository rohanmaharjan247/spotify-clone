import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(image: any, index?: number): string {
    return image?.length > 0 ? image[index ?? 0].url : 'assets/images/user.svg';
  }

}
