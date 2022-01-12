import { SpotifyWebApiService } from './../../services/spotify-web-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchService } from './../../services/search/search.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();

  searchQuery = new FormControl(null);

  genreList: string[] = [];

  searchData: any;

  constructor(
    private searchService: SearchService
  ) {}

  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit() {
  }

  searchItems() {
    if (this.searchQuery.value) {
      this.searchService
        .search(this.searchQuery.value)
        .pipe(takeUntil(this.toUnsubscribe$))
        .subscribe((result: any) => {
          console.log(result);
          this.searchData = result;
        });
    }
    else{
      this.searchData = null;
    }
  }

  playTrack(){}
}
