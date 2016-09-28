import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/*import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';*/
import { HttpModule } from '@angular/http';
/*import MaskedInput from 'angular2-text-mask'*/

import { AppComponent } from './app.component';
/*import { LoadingComponent } from './components/loading/loading.component';
import { TableGridComponent } from './components/table-grid/table-grid.component';
import { CardGridComponent } from './components/card-grid/card-grid.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MediaGridComponent } from './components/media-grid/media-grid.component';
import { KeysPipe } from './pipes/keys.pipe';

import { VideosService } from './services/videos.service';*/
//import { LoginService } from './services/login.service';

/*import { Video }           from './models/video';
import { Login }           from './models/login';
import { Retorno }         from './models/retorno';
import { TB_PESSOA }       from './models/tb_pessoa';
import { Usuarioalias }    from './models/usuarioalias';*/



//import { GlobalVariable } from './globals';
//import { LoginComponent } from './modules/login/login.component';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { routing }   from './app.routing';
//import { HomeComponent } from './modules\home/home.component';
//import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [
    AppComponent//, HomeComponent//, HomeComponent
    /*LoadingComponent,
    TableGridComponent,
    CardGridComponent,
    PaginationComponent,
    MediaGridComponent,
    KeysPipe,
    //LoginComponent,
    MaskedInput*/
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    HttpModule,
    LoginModule,
    HomeModule,
    routing

    ///RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    //VideosService//,
    //LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
