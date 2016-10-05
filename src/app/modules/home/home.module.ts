import { NgModule } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { GlobalVariable } from '../../globals';
import { routing } from './home.routing';

import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { CardGridComponent } from '../../components/card-grid/card-grid.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { MediaGridComponent } from '../../components/media-grid/media-grid.component'

import { HomeService } from './home.service';

@NgModule({
  declarations: [
    HomeComponent,
    LoadingComponent,
    HeaderComponent,
    MenuComponent,
    CardGridComponent,
    PaginationComponent,
    MediaGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  providers: [
    HomeService
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
