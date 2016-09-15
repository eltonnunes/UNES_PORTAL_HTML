## Component Table Grid

O component `tableGrid` utiliza o seletor `<tableGrid> </tableGrid>` que possui valores default, dados, paginação e filtros.
 Para alterar os dados default utilize os atributos.

### Seletor a ser Utilizado:
```html
<tableGrid></tableGrid>
```



### Atributos utilizados

- `columns`: O atributo `columns` é do tipo `Object` e deve conter os keys e values a serem exibidos no header do `tableGrid`.
###### Exemplo de utilização,
```javascript
        cols = {
                      "id"          : "Id",
                      "first_name"  : "First Name",
                      "last_name"   : "Last Name",
                      "email"       : "E-mail",
                      "gender"      : "Gender",
                      "ip_address"  : "Ip Address"
                    };
```


- `rows`: O atributo `rows` é do tipo `Array[Object]` e deve conter as linhas a serem exibidas, os keys do header devem ser utilizados como key dos objects contidos no array `tableGrid`.
###### Exemplo de utilização
```javascript
     rows =
            [{
                "id": 1,
                "first_name": "Judith",
                "last_name": "Burns",
                "email": "jburns0@wsj.com",
                "gender": "Female",
                "ip_address": "254.206.27.218"
              }];
```


- `order`: O atributo `order` é do tipo `Object` e deve conter os keys `[col, asc]` com seus respectivos values.

  * O key `col` é do tipo `string`e deve conter a coluna a ser ordenada, e deve esta na coleção definida no object `columns`.
  * O key `asc` é do tipo `boolean` e deve conter `true \ false`.
###### Exemplo de utilização
```javascript
      order = { col : 'id' , asc : false };
```


- `pagination`: O atributo `pagination` é do tipo `Object` e deve conter os keys `[current, totalRecords, recordPerPage, previous, next]` com seus respectivos values.
  * `current` é do tipo `number`e deve conter a página atual.
  * `totalRecords` é do tipo `number` e deve conter o total de registros contido no resultado da consulta.
  * `recordPerPage` é do tipo `number` e deve conter o total de registros a ser exibido no `tableGrid`.
  * `previous` é do tipo `boolean` e deve conter `true / false`, possibilita a exibição ou não do botão voltar no `tableGrid`.
  * `next` é do tipo `boolean` e deve conter `true / false`, possibilita a exibição ou não do botão avançar no `tableGrid`.
###### Exemplo de utilização
```javascript
      pagination = {
                          current       : 4,
                          totalRecords  : 50,
                          recordPerPage : 4,
                          previous      : true,
                          next          : false
                        };
```




#### Exemplo de utilização
```html
<tableGrid
  [columns]="cols"
  [rows]="rows"
  [order]="order"
  [pagination]="pagination">
</tableGrid>`
```


```javascript
      // Ordenação
      order = { col : 'id' , asc : false };


     // Colunas
      cols = {
                    "id"          : "Id",
                    "first_name"  : "First Name",
                    "last_name"   : "Last Name",
                    "email"       : "E-mail",
                    "gender"      : "Gender",
                    "ip_address"  : "Ip Address"
                  };

     // Paginação
      pagination = {
                          current       : 4,
                          totalRecords  : 50,
                          recordPerPage : 4,
                          previous      : true,
                          next          : false
                        };

     // Registros
     rows = [{
                "id": 1,
                "first_name": "Judith",
                "last_name": "Burns",
                "email": "jburns0@wsj.com",
                "gender": "Female",
                "ip_address": "254.206.27.218"
              }, {
                "id": 2,
                "first_name": "Kenneth",
                "last_name": "Hawkins",
                "email": "khawkins1@artisteer.com",
                "gender": "Male",
                "ip_address": "189.55.25.49"
              }, {
                "id": 3,
                "first_name": "Walter",
                "last_name": "Jackson",
                "email": "wjackson2@istockphoto.com",
                "gender": "Male",
                "ip_address": "81.0.131.21"
              }, {
                "id": 4,
                "first_name": "Pamela",
                "last_name": "Watson",
                "email": "pwatson3@flavors.me",
                "gender": "Female",
                "ip_address": "147.175.6.242"
              }, {
                "id": 5,
                "first_name": "Andrea",
                "last_name": "Arnold",
                "email": "aarnold4@exblog.jp",
                "gender": "Female",
                "ip_address": "92.145.207.1"
              }, {
                "id": 6,
                "first_name": "Gregory",
                "last_name": "Mendoza",
                "email": "gmendoza5@noaa.gov",
                "gender": "Male",
                "ip_address": "70.242.101.119"
              }, {
                "id": 7,
                "first_name": "Kathy",
                "last_name": "Fuller",
                "email": "kfuller6@exblog.jp",
                "gender": "Female",
                "ip_address": "49.22.90.202"
              }, {
                "id": 8,
                "first_name": "Betty",
                "last_name": "Knight",
                "email": "bknight7@1und1.de",
                "gender": "Female",
                "ip_address": "70.44.193.177"
              }, {
                "id": 9,
                "first_name": "Kathleen",
                "last_name": "Lee",
                "email": "klee8@ihg.com",
                "gender": "Female",
                "ip_address": "97.237.182.70"
              }, {
                "id": 10,
                "first_name": "Annie",
                "last_name": "Burns",
                "email": "aburns9@ebay.co.uk",
                "gender": "Female",
                "ip_address": "143.31.4.52"
              }];
```


### Referências Utilizadas para o Componente
* [Bootstrap 4](http://v4-alpha.getbootstrap.com/components/utilities/)
* [FontAwesome](https://astronautweb.co/snippet/font-awesome/)
* [FontAwesome Icons](http://fontawesome.io/icons/)
* [Pipe OrdeBy](http://embed.plnkr.co/4eXHag)
* [Gerador de JSON](https://www.mockaroo.com/)
