import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing-path.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [

  ],
})
export class LoginModule { }
