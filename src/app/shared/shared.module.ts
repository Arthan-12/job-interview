import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatIconModule, MatSnackBarModule } from "@angular/material";
import { MenuComponent } from "./components/menu/menu.component";
import {MatListModule} from '@angular/material/list';
import { SnackbarComponent } from "./components/snackbar/snackbar.component";

@NgModule({
    exports: [MenuComponent, SnackbarComponent],
    declarations: [MenuComponent, SnackbarComponent],
    imports: [
        CommonModule,

        MatIconModule,
        MatListModule,
        MatSnackBarModule
    ]
})
export class SharedModule {}