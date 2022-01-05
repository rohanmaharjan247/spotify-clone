import { ToolbarHelperComponent } from './helpers/toolbar-helper/toolbar-helper.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavComponent } from './common/nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackDurationPipe } from './pipes/track-duration.pipe';
import { ArtistsNamePipe } from './pipes/artists-name.pipe';
import { PlaylistProfileImagePipe } from './pipes/playlist-profile-image.pipe';

const declarations = [
  NavComponent,
  ToolbarHelperComponent
]

const modules = [
  IonicModule,
  RouterModule,
  ReactiveFormsModule
]

const pipes = [
  TrackDurationPipe,
  ArtistsNamePipe,
  PlaylistProfileImagePipe
]

@NgModule({
  declarations: [
    ...declarations,
    ...pipes,
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...declarations,
    ...modules,
    ...pipes
  ]
})
export class SharedModule { }
