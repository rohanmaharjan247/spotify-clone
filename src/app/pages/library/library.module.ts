import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { PodcastsComponent } from './components/podcasts/podcasts.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryPageRoutingModule } from './library-routing.module';

import { LibraryPage } from './library.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LibraryPageRoutingModule
  ],
  declarations: [LibraryPage, PlaylistsComponent, PodcastsComponent, ArtistsComponent, AlbumsComponent]
})
export class LibraryPageModule {}
