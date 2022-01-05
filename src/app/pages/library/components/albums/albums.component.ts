import { takeUntil } from 'rxjs/operators';
import { AlbumsService } from './../../../../services/user/albums.service';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  private readonly toUnsubsribe$ = new Subject<void>();

  savedAlbums: any;

  constructor(private albumsService: AlbumsService) { }
  ngOnDestroy(): void {
    this.toUnsubsribe$.next();
    this.toUnsubsribe$.complete();
  }

  ngOnInit() {
    this.getSavedAlbums();
  }

  getSavedAlbums(){
    this.albumsService.getSavedAlbums().pipe(takeUntil(this.toUnsubsribe$)).subscribe((result: any) => {
      console.log(result);
      this.savedAlbums = result.items;
    })
  }

}
