import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPlaylistsPage } from './user-playlists.page';

const routes: Routes = [
  {
    path: '',
    component: UserPlaylistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPlaylistsPageRoutingModule {}
