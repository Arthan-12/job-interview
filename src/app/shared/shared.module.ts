import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatIconModule, MatSnackBarModule } from "@angular/material";
import { MenuComponent } from "./components/menu/menu.component";
import {MatListModule} from '@angular/material/list';
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
    exports: [MenuComponent, SnackbarComponent, AlertMessageComponent],
    declarations: [MenuComponent, SnackbarComponent, AlertMessageComponent],
    imports: [
        CommonModule,

        MatIconModule,
        MatListModule,
        MatSnackBarModule
    ]
})
export class SharedModule {}