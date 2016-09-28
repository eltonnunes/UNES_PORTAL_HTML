import { NgModule } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { GlobalVariable } from '../../globals';
import { routing } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  providers: [
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
