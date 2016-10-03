import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';



import { LoginService } from '../login/login.service';
import { HomeService } from './home.service';
import { Retorno } from '../../models/retorno';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() search: string = '';
  userName: string = '';
  load: Boolean = true;
  tagSelectedId: number = 0;
  tagSelectedVisible: Boolean = false;
  findSelectedVisible: Boolean = false;
  tagSelectedName: string = '';
  resultadoConsulta: Boolean = false;
  URL_HASH_VIDEO:SafeUrl;
  TITULO_VIDEO: string = '';
  TEXTO_VIDEO: string = '';
  ID_VIDEO: number = 0;
  busca: string = '';

  tagActiveTodos: Boolean = true;
  tagActiveVisto: Boolean = false;
  tagActiveRecente: Boolean = false;
  tagActiveTag: Boolean = false;
  findActiveTag: Boolean = false;

  Tags: Retorno = new Retorno(Object[0],0,0,0);
  Videos: Retorno = new Retorno(Object[0],0,0,0);
  VideosMaisVistos: Retorno = new Retorno(Object[0],0,0,0);
  VideosMaisRecentes: Retorno = new Retorno(Object[0],0,0,0);
  VideosTags: Retorno = new Retorno(Object[0],0,0,0);
  VideosBusca: Retorno = new Retorno(Object[0],0,0,0);

  constructor(
              private loginService: LoginService,
              private router      : Router,
              private homeService : HomeService,
              private sanitizer   : DomSanitizer
            ) {

    this.ResetShowVideo();

    if (localStorage.getItem('auth_token') == null)
        this.loginService.Logout();


    this.userName = sessionStorage.getItem('nome');
    this.getTagsMenu();
    this.getVideos(1);
    this.getVideosMaisVistos(1);
    this.getVideosMaisRecentes(1);

    this.tagSelectedName = 'Todos Videos'

  }

  ngOnInit() {
    /*this.load = false;
    console.log(this.Tags);*/
  }

  // FUNCTIONs
  Sair(){
    this.loginService.Logout();
  }

  find(){
    this.VideosBusca = new Retorno(Object[0],0,0,0);
    if(this.busca != '')
    {
      this.load = true;
      this.onSelectTab('find');
      this.getPesquisa(1, this.busca);
    }
  }

  closeVideo(){
    this.ResetShowVideo();
  }

  ResetShowVideo(){
        this.URL_HASH_VIDEO = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.youtube.com/embed/000');//fb3EYYWKmQA?rel=0');
        this.TITULO_VIDEO = '';//'Quer saber quem é a SERVELOJA? o que fazemos?';
        this.TEXTO_VIDEO = '';//'A Serveloja é uma empresa amiga do Empreendedor e propõe facilitar sua vida com soluções que vão além de aceitar cartões de crédito e débito, saiba tudo sobre nós e não vai se arrepender!';
        this.ID_VIDEO = 0;
  }

  // GETs
  getTagsMenu(){
    this.homeService.ListaTagsMenu()
                      .subscribe(
                          retorno => {
                            this.Tags = retorno;
                            if(this.Tags.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
  }

  getVideos(pg){
    this.homeService.ListaVideos(pg)
                      .subscribe(
                          retorno => {
                            if(retorno.Registros[0] == undefined)
                              this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.Videos = retorno;
                            if(this.Videos.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
  }

  getVideosMaisVistos(pg){
    this.homeService.ListaVideosMaisVistos(pg)
                      .subscribe(
                          retorno => {
                            if(retorno.Registros[0] == undefined)
                              this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.VideosMaisVistos = retorno;
                            if(this.VideosMaisVistos.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
  }

  getVideosMaisRecentes(pg){
    this.homeService.ListaVideosMaisRecentes(pg)
                      .subscribe(
                          retorno => {
                            if(retorno.Registros[0] == undefined)
                              this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.VideosMaisRecentes = retorno;
                            if(this.VideosMaisRecentes.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
  }

  getVideosTags(pg, querystring){
    this.homeService.ListaVideosTags(pg, querystring)
                      .subscribe(
                          retorno => {
                            if(retorno.Registros[0] == undefined)
                              this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.VideosTags = retorno;
                            if(this.VideosTags.Registros != null)
                              this.load = false;
                            else
                              this.load = false;


                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
  }

  getPesquisa(pg, querystring){
    this.homeService.ListaBuscaVideos(pg, querystring)
                      .subscribe(
                          retorno => {
                            if(retorno.Registros[0] == undefined)
                            {
                              this.VideosBusca = new Retorno(Object[0],0,0,0);
                              this.resultadoConsulta = true;
                            }
                            else
                              this.resultadoConsulta = false;

                            this.VideosBusca = retorno;
                            if(this.VideosBusca.Registros != null)
                              this.load = false;
                            else
                              this.load = false;


                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
  }


  // EVENTs
  onBuscaKeyPress(event){
    if(event.keyCode == 13)
      this.find();
  }

  onCurrentUpdateTodos(event){
    this.getVideos(event.current);
  }

  onCurrentUpdateMaisVistos(event){
    this.getVideosMaisVistos(event.current);
  }

  onCurrentUpdateMaisRecentes(event){
    this.getVideosMaisRecentes(event.current);
  }

  onCurrentUpdateTags(event){
    this.getVideosTags(event.current, this.tagSelectedId);
  }

  onCurrentUpdateFind(event){
    this.getPesquisa(event.current, this.busca);
  }

  onVideoSelected(event){
    let returnOperation: Response;

    this.homeService.AtualizaViewVideo({ UNV_ID_VIDEOS: event.ID }).subscribe(
        retorno => { returnOperation = retorno /*console.log(retorno)*/ },
        err => { console.log(err) });

    let url:string = 'http://www.youtube.com/embed/' + event.HASH;
    this.URL_HASH_VIDEO = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.TITULO_VIDEO = event.TITULO;
    this.TEXTO_VIDEO = event.TEXTO;
    this.ID_VIDEO = event.ID;
  }

  onTagSelected(event){
    this.onSelectedTag({IdTag: event.ID, NameTag: event.NAME});
  }

  onSelectTab(tabName){
    tabName != 'find' ? this.busca = '': this.tagSelectedName = 'Pesquisa';


    tabName != 'tag' ? this.tagSelectedVisible = false : this.tagSelectedVisible = true;
    tabName != 'find' ? this.findSelectedVisible = false : this.findSelectedVisible = true;
    tabName == 'todos' ? this.tagActiveTodos = true : this.tagActiveTodos = false;
    tabName == 'visto' ? this.tagActiveVisto = true : this.tagActiveVisto = false;
    tabName == 'recente' ? this.tagActiveRecente = true : this.tagActiveRecente = false;
    tabName == 'tag' ? this.tagActiveTag = true : this.tagActiveTag = false;
    tabName == 'find' ? this.findActiveTag = true : this.findActiveTag = false;

    if(tabName == 'todos')
      this.tagSelectedName = 'Todos Videos';
    if(tabName == 'visto')
      this.tagSelectedName = 'Videos +Vistos ';
    if(tabName == 'recente')
      this.tagSelectedName = 'Videos +Vistos ';
  }

  onSelectedTag(event){
    if(event.IdTag != 0)
    {
      this.getVideosTags(1, event.IdTag);
      this.onSelectTab('tag');
      this.tagSelectedVisible = true;
      this.tagSelectedId = event.IdTag;
      this.tagSelectedName = 'Tag: ' + event.NameTag;
    }
    else
    {
      this.onSelectTab('todos');
      this.tagSelectedId = 0;
      this.tagSelectedName = '';
      this.tagSelectedVisible = false;
      this.tagSelectedName = 'Todos Videos'
    }
  }

  /*onShowVideo(HASH){
    this.URL_HASH_VIDEO = 'http://www.youtube.com/embed/' + HASH;
  }*/

}
