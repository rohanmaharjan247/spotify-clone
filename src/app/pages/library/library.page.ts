import { Component, OnInit } from '@angular/core';
import { LibrarySegment } from 'src/app/shared/helpers/enums/library-segments';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  librarySegment = LibrarySegment;

  selectedSegment: LibrarySegment = LibrarySegment.PLAYLISTS;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: any){
    console.log(event);
    this.selectedSegment = event.target.value;
  }

}
