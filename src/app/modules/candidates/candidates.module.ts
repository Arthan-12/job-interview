import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './pages/candidates.component';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [CandidatesComponent],
  imports: [
    CommonModule,

    MenuModule,
  ]
})
export class CandidatesModule { }
