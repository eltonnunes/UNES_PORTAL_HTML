import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TableGridComponent } from './components/table-grid/table-grid.component';
import { CardGridComponent } from './components/card-grid/card-grid.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MediaGridComponent } from './components/media-grid/media-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    TableGridComponent,
    CardGridComponent,
    PaginationComponent,
    MediaGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
