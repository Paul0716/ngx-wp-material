import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WpapiService } from './wpapi.service';
import { WpuserService } from './wpuser.service';
import { WpcategoriesService } from './wpcategories.service';
import { WppostsService } from './wpposts.service';
import { WptagService } from './wptag.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    WpapiService,
    WpuserService,
    WpcategoriesService,
    WppostsService,
    WptagService,
  ],
  declarations: []
})
export class WpapiModule { }
