import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NotFoundComponent, MaintenanceComponent],
})
export class ErrorsModule { }