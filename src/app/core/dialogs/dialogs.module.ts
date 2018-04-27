import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ngrx
import { StoreModule } from '@ngrx/store';

// component
import { CofirmComponent } from './cofirm/cofirm.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    CofirmComponent
  ],
  entryComponents: [
    CofirmComponent
  ],
})
export class DialogsModule { }
