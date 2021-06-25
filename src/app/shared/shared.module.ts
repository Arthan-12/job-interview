import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatIconModule, MatSnackBarModule, MatTableModule } from "@angular/material";
import { MenuComponent } from "./components/menu/menu.component";
import {MatListModule} from '@angular/material/list';
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
    exports: [MenuComponent, SnackbarComponent, AlertMessageComponent, TableComponent],
    declarations: [MenuComponent, SnackbarComponent, AlertMessageComponent, TableComponent],
    imports: [
        CommonModule,

        MatIconModule,
        MatListModule,
        MatSnackBarModule,
        MatTableModule
    ]
})
export class SharedModule {}