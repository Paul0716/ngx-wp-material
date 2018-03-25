import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    LayoutComponent
  ],
  declarations: [
    LayoutComponent
  ]
})
export class CoreModule { }
