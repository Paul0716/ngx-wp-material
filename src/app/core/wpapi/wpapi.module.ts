import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WpapiService } from './wpapi.service';
import { WpuserService } from './wpuser.service';
import { WpcategoriesService } from './wpcategories.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    WpapiService,
    WpuserService,
    WpcategoriesService,
  ],
  declarations: []
})
export class WpapiModule { }
