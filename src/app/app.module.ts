import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { MenuModule } from './shared/menu/menu.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './modules/home/home.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { InterviewsModule } from './modules/interviews/interviews.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    CoreModule,
    MenuModule,
    ErrorsModule,
    HomeModule,
    CandidatesModule,
    InterviewsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
