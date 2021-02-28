import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

import { MatIconModule, MatToolbarModule } from '@angular/material';



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
    MatIconModule
  ]
})
export class CoreModule { }
