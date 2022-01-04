import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPlaylistsPageRoutingModule } from './user-playlists-routing.module';

import { UserPlaylistsPage } from './user-playlists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UserPlaylistsPageRoutingModule
  ],
  declarations: [UserPlaylistsPage]
})
export class UserPlaylistsPageModule {}
