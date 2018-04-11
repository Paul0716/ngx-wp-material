import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbroadComponent } from './dashbroad.component';
import { DashbroadRoutingModule } from './dashbroad-routing-path.module';

@NgModule({
  imports: [
    CommonModule,
    DashbroadRoutingModule
  ],
  declarations: [DashbroadComponent]
})
export class DashbroadModule { }
