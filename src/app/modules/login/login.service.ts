import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Login }            from '../../models/login';
import { Retorno }          from '../../models/retorno';
import { GlobalVariable }   from '../../globals'

@Injectable()
export class LoginService {


    constructor (private http: Http, private router: Router) {}

    // URL web API Autenticação
    private API_URL: string =  GlobalVariable.BASE_API_URL + 'TbUsuarioAlias';


    // Autenticar no Servidor
    public Autenticar (body: Object): Observable<Retorno> {
      let bodyString = JSON.stringify(body);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.API_URL, body, options)
                       .map((res:Response) => res.json())
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // Valida se o CPF / CNPJ existe em nosso sistema.
    public getValidateCpfCnpj(CpfCnpj) : Observable<Retorno>{
      let urlapi: string =  GlobalVariable.BASE_API_URL + 'util/' + GlobalVariable.TOKEN
                                                        + '/0/100/1/0/0?101=' + CpfCnpj;

        return this.http.get(urlapi)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }


    // Valida se o Código Informado é válido
    public getValidateCodigo(Codigo) : Observable<Retorno>{
      let urlapi: string =  GlobalVariable.BASE_API_URL + 'util/' + GlobalVariable.TOKEN
                                                        + '/0/100/1/0/0?100=' + Codigo;

        return this.http.get(urlapi)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    // Recupera Senha
    public getAlteraSenha(Codigo, CpfCnpj) : Observable<Retorno>{
      let urlapi: string =  GlobalVariable.BASE_API_URL + 'util/' + GlobalVariable.TOKEN
                                                        + '/0/100/1/0/0?100=' + Codigo + '&101=' + CpfCnpj;

        return this.http.get(urlapi)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }


    // Ligar para ServeLoja
    public Ligar (body: Object): Observable<Retorno> {
      let bodyString = JSON.stringify(body);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post("https://sistemaserveloja.com.br/ServicosWeb/comum.asmx/AgendarCallBack", body, options)
                       .map((res:Response) => res.json())
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // Efetua Logout
    public Logout() {
            localStorage.clear();
            sessionStorage.clear();
            sessionStorage.setItem('loggedIn', 'false');
            this.router.navigate(['/login']);
    }
}
