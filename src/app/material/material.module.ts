import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Button Module
import { MatButtonModule } from '@angular/material/button';

// Icon Module
import { MatIconModule } from '@angular/material/icon';

// Dialog Module
import { MatDialogModule } from '@angular/material/dialog';

// Form Field Module
import { MatFormFieldModule } from '@angular/material/form-field';

//Sidenav
import { MatSidenavModule } from '@angular/material/sidenav';

// List
import { MatListModule } from '@angular/material/list';

// Input
import { MatInputModule } from '@angular/material/input';

// Select
import { MatSelectModule } from '@angular/material/select';

// Tab
import { MatTabsModule } from '@angular/material/tabs';

// Checkbox
import { MatCheckboxModule } from '@angular/material/checkbox';

// Snack Bar
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Tool Bar
import {MatToolbarModule} from '@angular/material/toolbar';

// Array
const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatToolbarModule,
];


@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule { }
