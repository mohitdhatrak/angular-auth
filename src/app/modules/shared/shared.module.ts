import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [NavbarComponent, ErrorComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, ErrorComponent],
})
export class SharedModule {}
