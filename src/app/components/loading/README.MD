## Compenente Loading

O componente `Loading` utiliza o seletor `<loading> </loading>` que possui valores default, para imagem, texto e visibilidade.
 Para alterar os dados default utilize os atributos.

### Seletor a ser Utilizado:
>     <loading></loading>



### Atributos utilizados

- `visible`: O atributo `visible` é do tipo `boolean` e pode receber os valores `true \ false`.
###### Exemplo de utilização
  >     <loading [visible]="true"></loading>

- `text`: O atributo `text` é do tipo `string` sem limite de caracteres.

  ###### Exemplo de utilização
  >     <loading text="Carregando"> </loading>

- `srcImg`: O atributo `srcImg` é do tipo `string` sem limite de caracteres, e pode receber desde uma `URL`, ou uma imagem codificada em `base64`.
###### Exemplo de utilização
>     <loading srcImg="img/loading.gif">
>     </loading>
>
>     <loading srcImg="data:image/gif;base64,[IMAGEM]">
>     </loading>

#### Exemplo de utilização

>     <loading [visible]="load"
>              text="Carregando"
>              srcImg="img/loading.gif">
>     </loading>
>
