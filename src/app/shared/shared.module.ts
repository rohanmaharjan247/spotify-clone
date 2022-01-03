import { ToolbarHelperComponent } from './helpers/toolbar-helper/toolbar-helper.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavComponent } from './common/nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const declarations = [
  NavComponent,
  ToolbarHelperComponent
]

const modules = [
  IonicModule,
  RouterModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    ...declarations
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...declarations,
    ...modules
  ]
})
export class SharedModule { }
