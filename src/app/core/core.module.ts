import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { StorageModule } from './storage/storage.module';
import { Ng2Webstorage } from 'ngx-webstorage';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    StorageModule,
    Ng2Webstorage,
  ]
})
export class CoreModule { }
