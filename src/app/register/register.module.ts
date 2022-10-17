import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from '../components/register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  entryComponents:[RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule
  ]
})
export class RegisterModule { 
  static entry = RegisterComponent
}
