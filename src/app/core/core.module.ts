import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatIconModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,

    MatToolbarModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class CoreModule { }
