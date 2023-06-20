import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorComponent } from './error/error.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [NavbarComponent, ErrorComponent],
  imports: [CommonModule, MatSnackBarModule],
  exports: [NavbarComponent, ErrorComponent],
})
export class SharedModule {}
