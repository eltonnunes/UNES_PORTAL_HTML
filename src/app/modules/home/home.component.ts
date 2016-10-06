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
  admVideoSelectVisible: Boolean = false;
  admTagSelectVisible: Boolean = false;
  tagSelectedName: string = '';
  resultadoConsulta: Boolean = false;
  URL_HASH_VIDEO:SafeUrl;
  TITULO_VIDEO: string = '';
  TEXTO_VIDEO: string = '';
  ID_VIDEO: number = 0;
  busca: string = '';
  selectedTagId: number = 0;
  pasteHash: string = '';
  msgTimeout: number = 1000;
  newTag: string = '';
  protocol: string = '';

  ADMIN_EDIT_URL_HASH_VIDEO:SafeUrl;
  ADMIN_EDIT_TITULO_VIDEO: string = '';
  ADMIN_EDIT_TEXTO_VIDEO: string = '';
  ADMIN_EDIT_ID_VIDEO: number = 0;
  ADMIN_EDIT_TAG_NAME: string = '';
  ADMIN_EDIT_TAG_ID: number = 0;
  ADMIN_EDIT_OBJECT: any = {
      "UNV_ID_VIDEOS": 0,
      "UNV_TX_TITULO": '',
      "UNV_TX_DESCRICAO": '',
      "UNV_NR_VIEW": 0,
      "UNV_NR_LIKE": 0,
      "UNV_DT_DATA": '',
      "UNT_ID_TAG": 0,
      "UNV_TX_HASH": '',
      "UNT_TAG": {
        "UNT_ID_TAG": 0,
        "UNT_TX_NOME": '',
        "TB_UNIVERSIDADE_VIDEOS": []
      }
    };

  ADMIN_NEW_HASH_VIDEO:string = '';
  ADMIN_NEW_URL_HASH_VIDEO:SafeUrl;
  ADMIN_NEW_TITULO_VIDEO: string = '';
  ADMIN_NEW_TEXTO_VIDEO: string = '';
  ADMIN_NEW_ID_VIDEO: number = 0;
  ADMIN_NEW_TAG_NAME: string = '';
  ADMIN_NEW_TAG_ID: number = 0;
  ADMIN_NEW_OBJECT: any = {
      "UNV_ID_VIDEOS": 0,
      "UNV_TX_TITULO": '',
      "UNV_TX_DESCRICAO": '',
      "UNV_NR_VIEW": 0,
      "UNV_NR_LIKE": 0,
      "UNV_DT_DATA": '',
      "UNT_ID_TAG": 0,
      "UNV_TX_HASH": '',
      "UNT_TAG": {
        "UNT_ID_TAG": 0,
        "UNT_TX_NOME": '',
        "TB_UNIVERSIDADE_VIDEOS": []
      }
    };

  tagActiveTodos: Boolean = true;
  tagActiveVisto: Boolean = false;
  tagActiveRecente: Boolean = false;
  tagActiveTag: Boolean = false;
  findActiveTag: Boolean = false;
  admVideoActiveTag: Boolean = false;
  admTagActiveTag: Boolean = false;
  admVideoSelectedVisible: Boolean = false;
  admTagSelectedVisible: Boolean = false;

  selectClassConditionEditTag: Boolean = true;
  selectClassConditionNewTag: Boolean = false;
  isPasting: Boolean = false;
  msgSucesso: Boolean = false;
  msgErro: Boolean = false;

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

    if (localStorage.getItem('auth_token') == null)
        this.loginService.Logout();

    this.userName = sessionStorage.getItem('nome');
    this.tagSelectedName = 'Todos Videos'


    this.getTagsMenu();
    this.getVideos(1);
    this.getVideosMaisVistos(1);
    this.getVideosMaisRecentes(1);

    this.ResetShowVideo();
    this.protocol = window.location.protocol;


  }

  ngOnInit() {


    //this.load = false;
    /*console.log(this.Tags);*/
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
        let URL = this.protocol + '//www.youtube.com/embed/000';
        this.URL_HASH_VIDEO = this.sanitizer.bypassSecurityTrustResourceUrl(URL);//fb3EYYWKmQA?rel=0');
        this.TITULO_VIDEO = '';//'Quer saber quem é a SERVELOJA? o que fazemos?';
        this.TEXTO_VIDEO = '';//'A Serveloja é uma empresa amiga do Empreendedor e propõe facilitar sua vida com soluções que vão além de aceitar cartões de crédito e débito, saiba tudo sobre nós e não vai se arrepender!';
        this.ID_VIDEO = 0;
  }

  edit(){
    this.load = true;
    let alteracoes: Boolean = false;

    if( this.ADMIN_EDIT_TITULO_VIDEO != this.ADMIN_EDIT_OBJECT.UNV_TX_TITULO)
    {
      alteracoes = true;
      this.ADMIN_EDIT_OBJECT.UNV_TX_TITULO = this.ADMIN_EDIT_TITULO_VIDEO;
    }

    if( this.ADMIN_EDIT_TEXTO_VIDEO != this.ADMIN_EDIT_OBJECT.UNV_TX_DESCRICAO)
    {
      alteracoes = true;
      this.ADMIN_EDIT_OBJECT.UNV_TX_DESCRICAO = this.ADMIN_EDIT_TEXTO_VIDEO;
    }

    if( this.ADMIN_EDIT_TAG_ID != this.ADMIN_EDIT_OBJECT.UNT_ID_TAG)
    {
      alteracoes = true;
      this.ADMIN_EDIT_OBJECT.UNT_ID_TAG = this.ADMIN_EDIT_TAG_ID;
      this.ADMIN_EDIT_OBJECT.UNT_TAG = this.getTagObject(this.ADMIN_EDIT_TAG_ID);
    }

    if(alteracoes){

      this.putAlterarVideo();

      for (let i = 0; i < this.Videos.Registros.length; i++) {
          if( this.Videos.Registros[i].UNV_ID_VIDEOS == this.ADMIN_EDIT_ID_VIDEO){
            this.Videos.Registros[i] = this.ADMIN_EDIT_OBJECT;
          }
      }

    }
    else
    {
      this.load = false;
    }

  }

  salvar(){
    this.pasteHash = '';

    if(this.ADMIN_NEW_TAG_ID != 0){
      this.selectClassConditionNewTag = false;
      this.isPasting = false;
      this.load = true;
      this.pasteHash = '';

      let VideoObject: any = {
        UNV_ID_VIDEOS: -1,
        UNV_TX_TITULO: this.ADMIN_NEW_TITULO_VIDEO,
        UNV_TX_DESCRICAO: this.ADMIN_NEW_TEXTO_VIDEO,
        UNV_NR_VIEW: 0,
        UNV_NR_LIKE: 0,
        UNV_DT_DATA: new Date(),
        UNT_ID_TAG: this.ADMIN_NEW_TAG_ID,
        UNV_TX_HASH: this.ADMIN_NEW_HASH_VIDEO
      };

      //if( this.Videos.Registros != null)
        //this.ADMIN_NEW_OBJECT = this.Videos.Registros[0];

        this.ADMIN_NEW_OBJECT.UNV_TX_TITULO = this.ADMIN_NEW_TITULO_VIDEO;
        this.ADMIN_NEW_OBJECT.UNV_TX_DESCRICAO = this.ADMIN_NEW_TEXTO_VIDEO;
        this.ADMIN_NEW_OBJECT.UNV_TX_HASH = this.ADMIN_NEW_HASH_VIDEO;

        this.postAdicionaVideo(VideoObject);
    }
    else
    {
      this.selectClassConditionNewTag = true;
      this.ADMIN_NEW_TAG_ID = 0;
    }
  }

  closeModalNew(){
    this.pasteHash = '';
    this.isPasting = false;
    this.ADMIN_NEW_TAG_ID = 0;
  }


    // GETs
  getTagObject(Id_Tag):any{
    for (let i = 0; i < this.Tags.Registros.length; i++) {
        if( this.Tags.Registros[i].UntIdTag == Id_Tag)
        {
          return {
                  "UNT_ID_TAG": this.Tags.Registros[i].UntIdTag,
                  "UNT_TX_NOME": this.Tags.Registros[i].UntTxNome,
                  "TB_UNIVERSIDADE_VIDEOS": []
                  }
        }
    }
  }

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

  getAdminVideos(pg){
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

  getYoutubeDadosVideo(hashVideo){
    this.homeService.YoutubeBuscarDadosVideo(hashVideo)
                      .subscribe(
                          data => {
                            var videos = <any>data;
                            if(videos.items[0] != undefined)
                            {
                              this.load = false;
                              this.isPasting = true;

                              let url:string = this.protocol + '//i.ytimg.com/vi/' + hashVideo + '/hqdefault.jpg';
                              this.ADMIN_NEW_HASH_VIDEO = hashVideo;
                              this.ADMIN_NEW_URL_HASH_VIDEO = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                              this.ADMIN_NEW_TITULO_VIDEO = videos.items[0].snippet.title;
                              this.ADMIN_NEW_TEXTO_VIDEO = videos.items[0].snippet.description;
                              }
                            else
                            {
                              this.isPasting = false;
                              this.load = false;
                            }
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
  }

  putAlterarVideo(){
      let returnOperation: Response;

      this.homeService.AtualizaVideo(this.ADMIN_EDIT_OBJECT).subscribe(
          retorno => {
                        returnOperation = retorno;
                        this.load = false;
                        this.msgSucesso = true;
                        setTimeout(() => {
                          this.msgSucesso = false;
                        }, this.msgTimeout);
                      },
          err => {
                    console.log(err);
                    this.load = false;
                    this.msgErro = true;
                    setTimeout(() => {
                      this.msgErro = false;
                    }, this.msgTimeout);
                 });
  }

  deleteRemoverVideo(id){
    this.homeService.RemoverVideo(id).subscribe(
        retorno => {
                  this.load = false;
                  this.msgSucesso = true;
                  setTimeout(() => {
                    this.msgSucesso = false;
                  }, this.msgTimeout);
                 /*console.log(retorno)*/
               },
        err => {
                  console.log(err);
                  this.load = false;
                  this.msgErro = true;
                  setTimeout(() => {
                    this.msgErro = false;
                  }, this.msgTimeout);
               });
  }

  postAdicionaVideo(video){
    let returnOperation: number;

    this.homeService.CadastrarVideo(video).subscribe(
        retorno => {
                    returnOperation = retorno;
                    this.load = false;
                    //console.log(retorno);
                    this.ADMIN_NEW_ID_VIDEO = retorno;
                    this.ADMIN_NEW_OBJECT.UNV_ID_VIDEOS = retorno;
                    this.ADMIN_NEW_OBJECT.UNT_ID_TAG = this.ADMIN_NEW_TAG_ID;
                    this.ADMIN_NEW_OBJECT.UNT_TAG = this.getTagObject(this.ADMIN_NEW_TAG_ID);
                    this.Videos.Registros.push(this.ADMIN_NEW_OBJECT);

                    this.ADMIN_NEW_TAG_ID = 0;

                    this.msgSucesso = true;
                    setTimeout(() => {
                      this.msgSucesso = false;
                    }, this.msgTimeout);
                  },
        err => {
                  console.log(err);
                  this.msgErro = true;
                  setTimeout(() => {
                    this.msgErro = false;
                  }, this.msgTimeout);
               });
  }


  // EVENTs
  onBuscaKeyPress(event){
    if(event.keyCode == 13)
      this.find();
  }

  onCurrentUpdateAdminVideo(event){
    this.load = true;
    this.getAdminVideos(event.current);
  }

  onCurrentUpdateTodos(event){
    this.load = true;
    this.getVideos(event.current);
  }

  onCurrentUpdateMaisVistos(event){
    this.load = true;
    this.getVideosMaisVistos(event.current);
  }

  onCurrentUpdateMaisRecentes(event){
    this.load = true;
    this.getVideosMaisRecentes(event.current);
  }

  onCurrentUpdateTags(event){
    this.load = true;
    this.getVideosTags(event.current, this.tagSelectedId);
  }

  onSair(event){
    this.load = true;
    this.loginService.Logout();
  }

  onCurrentUpdateFind(event){
    this.load = true;
    this.getPesquisa(event.current, this.busca);
  }

  onVideoSelected(event){

    let returnOperation: Response;

    this.homeService.AtualizaViewVideo({ UNV_ID_VIDEOS: event.ID }).subscribe(
        retorno => { returnOperation = retorno /*console.log(retorno)*/ },
        err => { console.log(err) });

    let url:string = this.protocol + '//www.youtube.com/embed/' + event.HASH;
    this.URL_HASH_VIDEO = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.TITULO_VIDEO = event.TITULO;
    this.TEXTO_VIDEO = event.TEXTO;
    this.ID_VIDEO = event.ID;
  }

  onVideoAdminEditSelected(event){
    let url:string = this.protocol + '//i.ytimg.com/vi/' + event.HASH + '/hqdefault.jpg';
    this.ADMIN_EDIT_URL_HASH_VIDEO = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.ADMIN_EDIT_TITULO_VIDEO = event.TITULO;
    this.ADMIN_EDIT_TEXTO_VIDEO = event.TEXTO;
    this.ADMIN_EDIT_ID_VIDEO = <number>event.ID;
    this.ADMIN_EDIT_TAG_NAME = event.NAME_TAG;
    this.ADMIN_EDIT_TAG_ID = event.ID_TAG
    this.ADMIN_EDIT_OBJECT = event.OBJECT;
  }

  onChangeEditTag(event) {
        if (this.ADMIN_EDIT_TAG_ID == 0)
            this.selectClassConditionEditTag = false;
        else
            this.selectClassConditionEditTag = true;
        this.ADMIN_EDIT_TAG_ID = event;
  }

  onChangeNewTag(event) {
        if (this.ADMIN_NEW_TAG_ID == 0)
            this.selectClassConditionNewTag = false;
        else
            this.selectClassConditionNewTag = true;
        this.ADMIN_NEW_TAG_ID = event;
  }

  onTagSelected(event){
    this.onSelectedTag({IdTag: event.ID, NameTag: event.NAME});
  }

  onSelectTab(tabName){

    tabName != 'find' ? this.busca = '': this.tagSelectedName = 'Pesquisa';
    tabName != 'admVideo' ? this.admVideoSelectVisible = false : this.admVideoSelectVisible = true;
    tabName != 'admTag' ? this.admTagSelectVisible = false : this.admTagSelectVisible = true;

    tabName != 'tag' ? this.tagSelectedVisible = false : this.tagSelectedVisible = true;
    tabName != 'find' ? this.findSelectedVisible = false : this.findSelectedVisible = true;
    tabName == 'todos' ? this.tagActiveTodos = true : this.tagActiveTodos = false;
    tabName == 'visto' ? this.tagActiveVisto = true : this.tagActiveVisto = false;
    tabName == 'recente' ? this.tagActiveRecente = true : this.tagActiveRecente = false;
    tabName == 'tag' ? this.tagActiveTag = true : this.tagActiveTag = false;
    tabName == 'find' ? this.findActiveTag = true : this.findActiveTag = false;

    if(tabName == 'admVideo')
    {
      this.admVideoSelectedVisible = true;
      this.admVideoActiveTag = true;
      this.admTagSelectedVisible = false;
      this.admTagActiveTag = false;
      this.tagSelectedName = 'Administração de Vídeos'
    }
    else if(tabName == 'admTag')
    {
      this.admVideoSelectedVisible = false;
      this.admVideoActiveTag = false;
      this.admTagSelectedVisible = true;
      this.admTagActiveTag = true;
      this.tagSelectedName = 'Administração de Tags'
    }
    else
    {
      this.admVideoSelectedVisible = false;
      this.admVideoActiveTag = false;
      this.admTagSelectedVisible = false;
      this.admTagActiveTag = false;
    }

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

  onSelectTabAdmin(event){
    //console.log(event.tab);
    if(event.tab == 'admVideo')
    {
      this.resultadoConsulta = false;
      this.admVideoSelectedVisible = true;
      this.admVideoActiveTag = true;
      this.onSelectTab(event.tab);
    }
    else if(event.tab == 'admTag')
    {
      this.resultadoConsulta = false;
      this.admTagSelectedVisible = true;
      this.admTagActiveTag = true;
      this.onSelectTab(event.tab);
    }
  }

  onVideoAdminApagarSelected(event){
    this.load = true;

    this.deleteRemoverVideo(event.ID);
    let index = this.Videos.Registros.indexOf(event.OBJECT);
    this.Videos.Registros.splice(index, 1);

  }

  onPaste(hashVideo){
    this.ADMIN_NEW_TAG_ID = 0;
    this.getYoutubeDadosVideo(hashVideo);
    this.load = true;
  }
}
