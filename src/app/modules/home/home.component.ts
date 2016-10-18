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
import { GlobalVariable }   from '../../globals'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  version: string = GlobalVariable.VERSION;
  @Input() search: string = '';
  userName: string = '';
  load: Boolean = true;
  tagSelectedId: number = 0;
  tagSelectedVisible: Boolean = false;
  findSelectedVisible: Boolean = false;
  admVideoSelectVisible: Boolean = false;
  admTagSelectVisible: Boolean = false;
  tagSelectedName: string = '';
  Admin: Boolean = false;
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
  ADMIN_EDIT_PERFIS: any = [];

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
      },
      "PERFIS":[]
    };
  ADMIN_NEW_PERFIS: any = [];


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
  selectClassConditionNewPerfil: Boolean = false;
  selectClassConditionEditPerfil: Boolean = false;

  isPasting: Boolean = false;
  msgSucesso: Boolean = false;
  msgErro: Boolean = false;

  Tags: Retorno = new Retorno(Object[0],0,0,0, false);
  Perfis: Retorno = new Retorno(Object[0],0,0,0, false);
  Videos: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosMaisVistos: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosMaisRecentes: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosTags: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosBusca: Retorno = new Retorno(Object[0],0,0,0, false);



  constructor(
              private loginService: LoginService,
              private router      : Router,
              private homeService : HomeService,
              private sanitizer   : DomSanitizer
            ) {




    this.resultadoConsulta = false;
    this.userName = localStorage.getItem('nome');
    this.tagSelectedName = 'Todos Videos'


    this.getTagsMenu();
    this.getPerfis();
    this.getVideos(1);
    this.getVideosMaisVistos(1);
    this.getVideosMaisRecentes(1);

    this.ResetShowVideo();
    this.protocol = window.location.protocol;

    //this.resultadoConsulta = false;
    //console.log(this.resultadoConsulta);

  }

  ngOnInit() {
    this.getAdmin();
    //this.resultadoConsulta = false;
    ////console.log(this.resultadoConsulta);
    //this.load = false;
    /*console.log(this.Tags);*/
  }

  // FUNCTIONs
  Sair(){
    this.loginService.Logout();
  }

  find(){
    this.VideosBusca = new Retorno(Object[0],0,0,0, false);
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
    this.loginService.ValidateToken();

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

    if( (this.ADMIN_EDIT_PERFIS != this.ADMIN_EDIT_OBJECT.PERFIS) && (this.ADMIN_EDIT_PERFIS.length > 0) )
      alteracoes = true;
    else
      alteracoes = false;


    if(alteracoes){

      let perfis: any = [];
      for (let i = 0; i < this.Perfis.Registros.length; i++) {
        if(this.ADMIN_EDIT_PERFIS.indexOf(this.Perfis.Registros[i].UNP_ID_PERFIL) != -1)
          perfis.push( { UNV_ID_VIDEOS: -1, UNP_ID_PERFIL: this.Perfis.Registros[i].UNP_ID_PERFIL } );
      }

      this.putAlterarVideo({ VIDEOS: this.ADMIN_EDIT_OBJECT, VIDEOSPERFIL: perfis });

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


  sairEdit(){
    this.ADMIN_EDIT_URL_HASH_VIDEO = '';
    this.ADMIN_EDIT_TITULO_VIDEO = '';
    this.ADMIN_EDIT_TEXTO_VIDEO = '';
    this.ADMIN_EDIT_ID_VIDEO = 0;
    this.ADMIN_EDIT_TAG_NAME = '';
    this.ADMIN_EDIT_TAG_ID = 0;
    this.ADMIN_EDIT_OBJECT = {
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
    this.ADMIN_EDIT_PERFIS = [];
  }

  salvar(){
    this.load = true;
    this.loginService.ValidateToken();

    this.pasteHash = '';

    if( this.ADMIN_NEW_PERFIS.length == 0)
    {
      this.selectClassConditionNewPerfil = true;
      this.load = false;
    }
    else
      this.selectClassConditionNewPerfil = false;

    if( this.ADMIN_NEW_TAG_ID != 0 )
    {
      this.selectClassConditionNewTag = false;
      this.load = false;
    }
    else
      this.selectClassConditionNewTag = true;

    if(this.ADMIN_NEW_TAG_ID != 0 && this.ADMIN_NEW_PERFIS.length != 0){
      this.selectClassConditionNewTag = false;
      this.isPasting = false;
      this.load = true;
      this.pasteHash = '';

      let perfis: any = [];
      for (let i = 0; i < this.Perfis.Registros.length; i++) {
        if(this.ADMIN_NEW_PERFIS.indexOf(this.Perfis.Registros[i].UNP_ID_PERFIL) != -1)
          perfis.push( { UNV_ID_VIDEOS: -1, UNP_ID_PERFIL: this.Perfis.Registros[i].UNP_ID_PERFIL } );
      }
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

        this.ADMIN_NEW_OBJECT.UNV_TX_TITULO = this.ADMIN_NEW_TITULO_VIDEO;
        this.ADMIN_NEW_OBJECT.UNV_TX_DESCRICAO = this.ADMIN_NEW_TEXTO_VIDEO;
        this.ADMIN_NEW_OBJECT.UNV_TX_HASH = this.ADMIN_NEW_HASH_VIDEO;

        this.postAdicionaVideo({ VIDEOS: VideoObject, VIDEOSPERFIL: perfis });
    }
    else
    {
      this.selectClassConditionNewTag = true;
      this.load = false;
      //this.ADMIN_NEW_TAG_ID = 0;
    }

    if( this.ADMIN_NEW_PERFIS.length == 0)
      this.selectClassConditionNewPerfil = true;
    else
      this.selectClassConditionNewPerfil = false;

    if( this.ADMIN_NEW_TAG_ID != 0 )
      this.selectClassConditionNewTag = false;
    else
      this.selectClassConditionNewTag = true;
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
                            this.resultadoConsulta = false;
                            this.Tags = retorno;
                            this.loginService.Validate(retorno.Token);
                            if(this.Tags.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
    //console.log(this.resultadoConsulta);
  }

  getAdmin(){
      this.homeService.ListaAdmin()
                        .subscribe(
                            retorno => {
                              //this.resultadoConsulta = false;
                              //this.loginService.Validate(retorno.Token);
                              if(retorno.Registros != null)
                                this.Admin = retorno.Registros[0];
                              else
                                this.Admin = false;
                              this.load = false;
                            },
                            err => {
                                console.log(err);
                                this.Admin = false;
                                this.load = false;
                            });
                            //console.log(this.resultadoConsulta);
    }

  getPerfis(){
      this.homeService.ListaPerfis()
                        .subscribe(
                            retorno => {
                              //this.resultadoConsulta = false;
                              this.Perfis = retorno;
                              this.loginService.Validate(retorno.Token);
                              if(this.Tags.Registros != null)
                                this.load = false;
                              else
                                this.load = false;
                            },
                            err => {
                                console.log(err);
                                this.load = false;
                            });
                            //console.log(this.resultadoConsulta);
    }

  getVideos(pg){
    this.homeService.ListaVideos(pg)
                      .subscribe(
                          retorno => {
                            this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
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
                          //console.log(this.resultadoConsulta);
  }

  getAdminVideos(pg){
    this.homeService.ListaVideos(pg)
                      .subscribe(
                          retorno => {
                            this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
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
                          //console.log(this.resultadoConsulta);
  }

  getVideosMaisVistos(pg){
    this.homeService.ListaVideosMaisVistos(pg)
                      .subscribe(
                          retorno => {
                            this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
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
                          //console.log(this.resultadoConsulta);
  }

  getVideosMaisRecentes(pg){
    this.homeService.ListaVideosMaisRecentes(pg)
                      .subscribe(
                          retorno => {
                            this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
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
                          //console.log(this.resultadoConsulta);
  }

  getVideosTags(pg, querystring){
    this.homeService.ListaVideosTags(pg, querystring)
                      .subscribe(
                          retorno => {
                            this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
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
                          //console.log(this.resultadoConsulta);
  }

  getPesquisa(pg, querystring){
    this.homeService.ListaBuscaVideos(pg, querystring)
                      .subscribe(
                          retorno => {
                            this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                            {
                              this.VideosBusca = new Retorno(Object[0],0,0,0, false);
                              this.resultadoConsulta = true;
                            }
                            else if(retorno.Registros.length == 0)
                              this.resultadoConsulta = true;
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
                          //console.log(this.resultadoConsulta);
  }

  getYoutubeDadosVideo(hashVideo){
    this.homeService.YoutubeBuscarDadosVideo(hashVideo)
                      .subscribe(
                          retorno => {
                            var videos = <any>retorno;
                            if(videos.items.length != 0)
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

  putAlterarVideo(objectVideo){
      let returnOperation: Response;

      this.homeService.AtualizaVideo(objectVideo).subscribe(
          retorno => {
                        returnOperation = retorno;

                        let perfis: any = [];
                        for (let i = 0; i < this.Perfis.Registros.length; i++) {
                          if(this.ADMIN_EDIT_PERFIS.indexOf(this.Perfis.Registros[i].UNP_ID_PERFIL) != -1)
                            perfis.push( this.Perfis.Registros[i].UNP_ID_PERFIL );
                        }

                        this.ADMIN_EDIT_OBJECT.PERFIS = perfis;

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
                    this.ADMIN_NEW_ID_VIDEO = retorno;
                    this.ADMIN_NEW_OBJECT.UNV_ID_VIDEOS = retorno;
                    this.ADMIN_NEW_OBJECT.UNT_ID_TAG = this.ADMIN_NEW_TAG_ID;
                    this.ADMIN_NEW_OBJECT.UNT_TAG = this.getTagObject(this.ADMIN_NEW_TAG_ID);
                    this.ADMIN_NEW_OBJECT.PERFIS = this.ADMIN_NEW_PERFIS;
                    this.Videos.Registros.unshift(this.ADMIN_NEW_OBJECT);

                    //console.log(this.Videos.Registros[0]);
                    //console.log(this.ADMIN_NEW_OBJECT);

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

    this.homeService.AtualizaViewVideo({ VIDEOS : { UNV_ID_VIDEOS: event.ID }}).subscribe(
        retorno => { returnOperation = retorno /*console.log(retorno)*/ },
        err => { console.log(err) });

    let url:string = this.protocol + '//www.youtube.com/embed/' + event.HASH;
    this.URL_HASH_VIDEO = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.TITULO_VIDEO = event.TITULO;
    this.TEXTO_VIDEO = event.TEXTO;
    this.ID_VIDEO = event.ID;
  }

  onVideoAdminEditSelected(event){
    this.selectClassConditionEditPerfil = false;
    let url:string = this.protocol + '//i.ytimg.com/vi/' + event.HASH + '/hqdefault.jpg';
    this.ADMIN_EDIT_URL_HASH_VIDEO = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.ADMIN_EDIT_TITULO_VIDEO = event.TITULO;
    this.ADMIN_EDIT_TEXTO_VIDEO = event.TEXTO;
    this.ADMIN_EDIT_ID_VIDEO = <number>event.ID;
    this.ADMIN_EDIT_TAG_NAME = event.NAME_TAG;
    this.ADMIN_EDIT_TAG_ID = event.ID_TAG
    this.ADMIN_EDIT_OBJECT = event.OBJECT;
    for (let i = 0; i < event.OBJECT.PERFIS.length; i++) {
        this.ADMIN_EDIT_PERFIS.push( event.OBJECT.PERFIS[i] );
    }
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
    this.resultadoConsulta = false;
    this.onSelectedTag({IdTag: event.ID, NameTag: event.NAME});
  }

  onSelectTab(tabName){
    this.resultadoConsulta = false;
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

  onSelectPerfil(IDPERFIL){
    if(this.ADMIN_NEW_PERFIS.indexOf(IDPERFIL)!= -1)
      this.ADMIN_NEW_PERFIS.splice(this.ADMIN_NEW_PERFIS.indexOf(IDPERFIL), 1);
    else
      this.ADMIN_NEW_PERFIS.push(IDPERFIL);

      if( this.ADMIN_NEW_PERFIS.length == 0)
        this.selectClassConditionNewPerfil = true;
      else
        this.selectClassConditionNewPerfil = false;
  }

  onCheckPerfil(IDPERFIL){
    if(this.ADMIN_NEW_PERFIS.indexOf(IDPERFIL) != -1)
      return true;
    else
      return false;
  }

  onCheckPerfilEdit(IDPERFIL){
    if(this.ADMIN_EDIT_PERFIS.indexOf(IDPERFIL) != -1)
      return true;
    else
      return false;
  }

  onSelectPerfilEdit(IDPERFIL){
    if(this.ADMIN_EDIT_PERFIS.indexOf(IDPERFIL)!= -1)
      this.ADMIN_EDIT_PERFIS.splice(this.ADMIN_EDIT_PERFIS.indexOf(IDPERFIL), 1);
    else
      this.ADMIN_EDIT_PERFIS.push(IDPERFIL);

      if( this.ADMIN_EDIT_PERFIS.length == 0)
        this.selectClassConditionEditPerfil = true;
      else
        this.selectClassConditionEditPerfil = false;
  }


  onSelectPerfilEditTodos()
  {
    this.ADMIN_EDIT_PERFIS = [];
    for (let i = 0; i < this.Perfis.Registros.length; i++) {
        this.ADMIN_EDIT_PERFIS.push(this.Perfis.Registros[i].UNP_ID_PERFIL);
    }

    if( this.ADMIN_EDIT_PERFIS.length == 0)
      this.selectClassConditionEditPerfil = true;
    else
      this.selectClassConditionEditPerfil = false;
  }


  onSelectPerfilEditLimpar()
  {
    this.ADMIN_EDIT_PERFIS = [];

    if( this.ADMIN_EDIT_PERFIS.length == 0)
      this.selectClassConditionEditPerfil = true;
    else
      this.selectClassConditionEditPerfil = false;
  }

  onSelectPerfilTodos()
  {
    this.ADMIN_NEW_PERFIS = [];
    for (let i = 0; i < this.Perfis.Registros.length; i++) {
        this.ADMIN_NEW_PERFIS.push(this.Perfis.Registros[i].UNP_ID_PERFIL);
    }

    if( this.ADMIN_NEW_PERFIS.length == 0)
      this.selectClassConditionNewPerfil = true;
    else
      this.selectClassConditionNewPerfil = false;
  }


  onSelectPerfilLimpar()
  {
    this.ADMIN_NEW_PERFIS = [];

    if( this.ADMIN_NEW_PERFIS.length == 0)
      this.selectClassConditionNewPerfil = true;
    else
      this.selectClassConditionNewPerfil = false;
  }
}
