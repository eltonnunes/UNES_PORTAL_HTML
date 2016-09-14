## Compenente Table Grid

O componente `tableGrid` utiliza o seletor `<tableGrid> </tableGrid>` que possui valores default, dados, paginação e filtros.
 Para alterar os dados default utilize os atributos.

### Seletor a ser Utilizado:
>     <pagination></pagination>




### Atributos utilizados



- `pagination`: O atributo `pagination` é do tipo `boolean` e deve conter `true / false`.
###### Exemplo de utilização
>       <pagination pagination="true">
      </pagination>

- `current` é do tipo `number`e deve conter a página atual.
###### Exemplo de utilização
>      <pagination current="4">
      </pagination>

- `totalRecords` é do tipo `number` e deve conter o total de registros contido no resultado da consulta.
###### Exemplo de utilização
>      <pagination totalRecords="50">
      </pagination>

- `recordPerPage` é do tipo `number` e deve conter o total de registros a ser exibido.
###### Exemplo de utilização
>      <pagination recordPerPage="4">
      </pagination>

- `previous` é do tipo `boolean` e deve conter `true / false`, possibilita a exibição ou não do botão voltar.
###### Exemplo de utilização
>      <pagination previous="true">
      </pagination>

- `next` é do tipo `boolean` e deve conter `true / false`, possibilita a exibição ou não do botão avançar.
###### Exemplo de utilização
>      <pagination next="false">
      </pagination>


- `totalRows` é do tipo `number` e deve conter o total de registros retornado pela consulta.
###### Exemplo de utilização
>      <pagination next="false">
      </pagination>

###### Exemplo de utilização

>      <pagination
        current       = "4",
        totalRecords  = "50",
        recordPerPage = "4",
        previous      = "true",
        next          = "false"
        pagination    = "true"
        totalRows     = "50">
      </pagination>
