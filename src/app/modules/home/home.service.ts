import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Retorno }          from '../../models/retorno';
import { GlobalVariable }   from '../../globals'

@Injectable()
export class HomeService {

  // URL to web API
  private API_URL_TAGS: string =  GlobalVariable.BASE_API_URL + 'TbUniversidadeTag/';
  private API_URL_VIDEOS: string =  GlobalVariable.BASE_API_URL + 'TbUniversidadeVideos/';

  constructor(private http: Http) { }


  public ListaTagsMenu(){
    let urlapi: string =  this.API_URL_TAGS + localStorage.getItem('auth_token')
                                            + '/1/100/0/0/1'; //Valores fixos para /Coleção/CampoOrdenação/Ordenação/ItensPorPagina/PaginaAtual
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaVideos(pg){
    let urlapi: string =  this.API_URL_VIDEOS + localStorage.getItem('auth_token')
                                              + '/0/100/1/6/' + pg;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaVideosMaisVistos(pg){
    let urlapi: string =  this.API_URL_VIDEOS + localStorage.getItem('auth_token')
                                              + '/0/103/1/6/' + pg;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaVideosMaisRecentes(pg){
    let urlapi: string =  this.API_URL_VIDEOS + localStorage.getItem('auth_token')
                                              + '/0/105/1/6/' + pg;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaVideosTags(pg, querystring){
    let urlapi: string =  this.API_URL_VIDEOS + localStorage.getItem('auth_token')
                                              + '/0/105/1/6/' + pg + '/?106=' + querystring;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaBuscaVideos(pg, search){
    let queryString = '?102=' + search + '%&101=' + search + '%';
    let urlapi: string =  this.API_URL_VIDEOS + localStorage.getItem('auth_token')
                                              + '/0/105/1/6/' + pg + '/' + queryString;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public AtualizaViewVideo(body: any): Observable<Response> {
        let urlapi: string =  this.API_URL_VIDEOS + localStorage.getItem('auth_token');
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(urlapi, bodyString, options)
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
