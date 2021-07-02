import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './modules/home/home.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { InterviewsModule } from './modules/interviews/interviews.module';
import { LoginModule } from './modules/login/login.module';
import { DeveloperModule } from './modules/developer/developer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    CoreModule,
    SharedModule,
    ErrorsModule,
    HomeModule,
    CandidatesModule,
    InterviewsModule,
    LoginModule,
    DeveloperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
