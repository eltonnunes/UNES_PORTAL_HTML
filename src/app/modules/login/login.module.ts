import { NgModule } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { GlobalVariable } from '../../globals';
import { routing } from './login.routing';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  providers: [
    LoginService
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
