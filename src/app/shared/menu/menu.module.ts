import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatIconModule } from "@angular/material";
import { MenuComponent } from "./menu.component";
import {MatListModule} from '@angular/material/list';

@NgModule({
    exports: [MenuComponent],
    declarations: [MenuComponent],
    imports: [
        CommonModule,

        MatIconModule,
        MatListModule
    ]
})
export class MenuModule {}