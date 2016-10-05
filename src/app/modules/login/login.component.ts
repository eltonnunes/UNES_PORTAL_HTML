import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

import { LoginService } from './login.service';
import { Retorno } from '../../models/retorno';
import { Usuarioalias } from '../../models/usuarioalias';

@Component({
  selector    : 'app-login',
  templateUrl : './login.component.html',
  styleUrls   : ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ligarPhone            : Boolean = false;
  conditionLigar        : Boolean = false;
  errorSolicitarSenha   : Boolean = false;
  errorPhone            : Boolean = false;
  errorLogin            : Boolean = false;
  login                 : Boolean = true;
  phone                 : Boolean = true;
  loggedIn              : Boolean = false;
  classCondition        : Boolean = true;
  validaConditionCnpjCpf: Boolean = true;
  classConditionCnpjCpf : Boolean = true;
  conditionCnpjCpf      : Boolean = true;
  validaConditionCodigo : Boolean = true;
  classConditionCodigo : Boolean = true;
  conditionAlteraSenha  : Boolean = true;
  txtConditionAlteraSenha  : Boolean = true;
  classConditionAlteraSenha : Boolean = true;
  classConditionEmail   : Boolean = true;
  classConditionTelefone: Boolean = true;
  username: string = '';
  @Input() telefone     : string = '';
  @Input() usuario      : string = '';
  @Input() senha        : string = '';
  @Input() codigo        : string = '';
  @Input() cpfcnpj      : string = '';
  retorno               : Retorno = new Retorno(Object[0],0,0,0);

  constructor(private loginService: LoginService, private router: Router) {
    if (localStorage.getItem('auth_token') != null)
        this.router.navigate(['/home']);
    else
    {
        this.loggedIn = false;
        this.loginService.Logout();
    }
  }

  ngOnInit() {
    console.log('OnInit');
  }



  Ligar(){
    this.errorPhone = false;
    this.conditionLigar = true;
    this.ligarPhone = false;
    this.phone = false;
    this.loginService.Ligar({ 'telefone' : this.telefone })
                      .subscribe(
                          retorno => {
                            this.retorno = retorno;
                            this.ligarPhone = true;
                          },
                          err =>
                          {
                            this.errorPhone = true;
                            this.conditionLigar = false;
                            this.phone = true;
                             console.log(err);
                          });
  }

  MaskTel(v : any){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
  }

  keyupMaskTel(){
    this.telefone = this.MaskTel(this.telefone);
  }

  eventHandlerKeyPressAutenticar(event) {
    if(event.keyCode == 13)
      this.Autenticar();
  }



  Autenticar(){
    this.login = false;
    this.loginService.Autenticar({ 'usuario' : this.usuario, 'senha' : this.senha })
                      .subscribe(
                          retorno => {
                            if( retorno.Registros != null)
                            {
                              this.retorno = retorno;
                              let dadosUser : Usuarioalias = <Usuarioalias> this.retorno.Registros[0];

                              localStorage.setItem('auth_token', this.retorno.Registros[0].UTA_TX_TOKEN);
                              localStorage.setItem('auth_validate', this.retorno.Registros[0].UTA_DT_VALIDADE);
                              sessionStorage.setItem('nome', this.retorno.Registros[0].PES_PESSOA.PES_TX_NOME);
                              sessionStorage.setItem('email', this.retorno.Registros[0].PES_PESSOA.PES_TX_EMAIL);

                              this.login = true;
                              this.loggedIn = true;

                              this.router.navigate(['/home']);
                            }
                            else{
                              this.login = true;
                              this.errorLogin  = true;
                            }
                          },
                          err => {
                             this.login = true;
                             this.errorLogin  = true;
                              console.log(err);
                          });




  }

  Logout() {
        localStorage.clear();
        sessionStorage.clear();
        this.loggedIn = false;
        //sessionStorage.setItem('loggedIn', 'false');
        //this.router.navigate(['/login']);
  };

  SolicitarSenha(){
    this.conditionAlteraSenha = false;
    this.classConditionAlteraSenha = false;
    this.txtConditionAlteraSenha = true;
    this.loginService.getAlteraSenha(this.codigo, this.RemoveMask(this.cpfcnpj))
                      .subscribe(
                          retorno => {
                            this.retorno = retorno;
                            let dadosUser : Usuarioalias = <Usuarioalias> this.retorno.Registros[0];

                            if(this.retorno.Registros.length == 1)
                            {
                              this.txtConditionAlteraSenha = false;
                              this.conditionAlteraSenha = true;
                              this.classConditionAlteraSenha = false;
                              this.username = localStorage.getItem('nameVerificado');
                            }
                            else
                            {
                              this.txtConditionAlteraSenha = true;
                              this.conditionAlteraSenha = true;
                              this.classConditionAlteraSenha = false;
                            }
                          },
                          err => {
                              console.log(err);
                              this.txtConditionAlteraSenha = true;
                              this.conditionAlteraSenha = true;
                              this.classConditionAlteraSenha = false;
                              this.errorSolicitarSenha = true;
                          });
  }

  ValidacaoEmailKeyUp() {
    let field = "";//this.email;
    let usuario = field.substring(0, field.indexOf("@"));
    let dominio = field.substring(field.indexOf("@")+ 1, field.length);
    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {

          this.classConditionEmail = true;
    }
    else{
      this.classConditionEmail = false;
    }
  }

  cnpfCnpjKeyup(){
    let tamanho = 0;
    tamanho = this.RemoveMask(this.cpfcnpj).length;

    if (tamanho >= 11) {
      this.cpfcnpj = this.FormatCpfCnpj(this.RemoveMask(this.cpfcnpj));
      if (tamanho >= 11 && tamanho < 14) {
        if(this.ValidaCPF(this.cpfcnpj))
        {
          this.validaConditionCnpjCpf = true;
          this.conditionCnpjCpf = true;
          this.classConditionCnpjCpf = true;

          this.VerificaCpfCnpj(this.RemoveMask(this.cpfcnpj));
        }
        else
        {
          this.validaConditionCnpjCpf = false;
          this.classConditionCnpjCpf = false;
          this.conditionCnpjCpf = true;
        }
      }else if (tamanho >= 14) {
        this.classConditionCnpjCpf = true;
        if(this.ValidarCNPJ(this.RemoveMask(this.cpfcnpj)))
        {
          this.validaConditionCnpjCpf = true;
          this.conditionCnpjCpf = true;
          this.classConditionCnpjCpf = true;

          this.VerificaCpfCnpj(this.RemoveMask(this.cpfcnpj));
        }
        else
        {
          this.validaConditionCnpjCpf = false;
          this.classConditionCnpjCpf = false;
          this.conditionCnpjCpf = true;
        }
      }
    }
    else
    {
      this.validaConditionCnpjCpf = true;
      this.classConditionCnpjCpf = true;
      this.conditionCnpjCpf = true;
    }
  }

  codigoKeyup(){
    let tamanho = 0;
    tamanho = this.RemoveMask(this.codigo).length;

    if (tamanho >= 7) {
      this.VerificaCodigo(this.RemoveMask(this.codigo));
    }
    else
    {
      this.validaConditionCodigo = true;
      this.classConditionCodigo = true;
    }
  }

  VerificaCpfCnpj(CpfCnpj){
    this.loginService.getValidateCpfCnpj(CpfCnpj)
                      .subscribe(
                          retorno => {
                            this.retorno = retorno;
                            let dadosUser : Usuarioalias = <Usuarioalias> this.retorno.Registros[0];
                            if(this.retorno.Registros.length == 1)
                            {
                              this.conditionCnpjCpf = true;
                              this.classConditionCnpjCpf = true;
                              localStorage.setItem('CpfCnpjVerificado', CpfCnpj);
                              localStorage.setItem('nameVerificado', this.retorno.Registros[0].PES_TX_NOME);
                            }
                            else
                            {
                              this.conditionCnpjCpf = false;
                              this.classConditionCnpjCpf = false;
                            }
                          },
                          err => {
                              console.log(err);
                          });
  }

  VerificaCodigo(Codigo){
    this.loginService.getValidateCodigo(Codigo)
                      .subscribe(
                          retorno => {
                            this.retorno = retorno;
                            let dadosUser : Usuarioalias = <Usuarioalias> this.retorno.Registros[0];

                            if(this.retorno.Registros.length == 1)
                            {
                              this.validaConditionCodigo = true;
                              this.classConditionCodigo = true;
                              localStorage.setItem('userVerificado', this.retorno.Registros[0].USU_TX_USUARIO);
                            }
                            else
                            {
                              this.validaConditionCodigo = false;
                              this.classConditionCodigo = false;
                            }
                          },
                          err => {
                              console.log(err);
                              this.validaConditionCodigo = false;
                              this.classConditionCodigo = false;
                          });
  }

  FormatCpfCnpj(v) {
    v = v.toString().replace(/\D/g, "") //Remove tudo o que não é dígito
    if (v.length <= 11) { //CPF
      v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    } else { //CNPJ
      v = v.replace(/^(\d{2})(\d)/, "$1.$2") //Coloca ponto entre o segundo e o terceiro dígitos
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2") //Coloca uma barra entre o oitavo e o nono dígitos
      v = v.replace(/(\d{4})(\d)/, "$1-$2") //Coloca um hífen depois do bloco de quatro dígitos
    }
    return v
  }

  ValidaCPF(strCPF) {
      var Soma;
      var Resto;

      strCPF = this.RemoveMask(strCPF);

      Soma = 0;
      if (strCPF.length != 11 ||
          strCPF == "00000000000" ||
          strCPF == "11111111111" ||
          strCPF == "22222222222" ||
          strCPF == "33333333333" ||
          strCPF == "44444444444" ||
          strCPF == "55555555555" ||
          strCPF == "66666666666" ||
          strCPF == "77777777777" ||
          strCPF == "88888888888" ||
          strCPF == "99999999999")
        return false;

      for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = Soma % 11;

      if ((Resto == 0) || (Resto == 1)) {
        Resto = 0;
      } else {
        Resto = 11 - Resto;
      };

      if (Resto != parseInt(strCPF.substring(9, 10)) )
        return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = Soma % 11;

      if ((Resto == 0) || (Resto == 1)) {
        Resto = 0;
      } else {
        Resto = 11 - Resto;
      };

      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
  }

  ValidarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
    	return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
    	cnpj == "11111111111111" ||
    	cnpj == "22222222222222" ||
    	cnpj == "33333333333333" ||
    	cnpj == "44444444444444" ||
    	cnpj == "55555555555555" ||
    	cnpj == "66666666666666" ||
    	cnpj == "77777777777777" ||
    	cnpj == "88888888888888" ||
    	cnpj == "99999999999999")
    	return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
    		pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
    	return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
    		pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
    	  return false;

    return true;

  }

  RemoveMask(str) {
    let strValue = str;

  	strValue = strValue.replace(".", "");
  	strValue = strValue.replace(".", "");
  	strValue = strValue.replace("-", "");
  	strValue = strValue.replace("/", "");
  	strValue = strValue.replace("/", "");

      return strValue;
  }

}
