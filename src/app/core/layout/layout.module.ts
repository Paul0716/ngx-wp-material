import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// 元組件
import { LayoutComponent } from './layout.component';

// 模組
import { MaterialModule } from '../material/material.module';
import { LayoutRoutingModule } from './layout-routing-path.module';
import { DashbroadComponent } from '../../pages/dashbroad/dashbroad.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    LayoutRoutingModule,
  ],
  exports: [
    LayoutComponent,
  ],
  declarations: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
