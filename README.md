# Updates
- Adicionei o controle de pacotes pelo [Bower](http://bower.io), portanto, o Bower � uma depend�ncia. Basta instal�-lo como NPM.

> bower install && grunt

- Adicionei uma task no grunt para relacionar as depend�ncias do bower nas configura��es do requirejs (main.js).
  Para adicionar no requireJS, basta rodar a task abaixo:

> grunt bowerRequirejs

- As depend�ncias do instaladas pelo bower n�o s�o adicionadas automaticamente no test-main.js, usado pelo karma.
  Por enquanto, deve ser feito manualmente.
  
- Adicionado suporte ao $templateCache na vers�o de distribui��o.
  Para gerar uma vers�o de distribui��o com suporte ao templateCache, 
  basta usar a flag --templateCache
  
> grunt dist --templateCache

---

Quando comecei a estudar o AngularJS e a procurar exemplos de uso e aplica��es, sempre me deparava com aplica��es simples, sem muitas implementa��es. O que � bom para pegar o conceito mas n�o ajuda muito quando � necess�rio estruturar uma aplica��o que ir� crescer significativamente.

Assim, compartilho a minha estrutura de projetos para aplica��es de larga escala, tornando modular - como deve ser - e de f�cil manuten��o.

## 1\. Introdu��o

Essa � uma ideia de estrutura de aplica��o que tem funcionado muito bem e esse � o principal motivo de eu compartilhar. Para exemplificar de uma forma mais clara, criei um projeto simples, com 2 m�dulos e 2 componentes, para que seja vis�vel a utiliza��o dessa estrutura de projeto. Podes conferir o projeto [aqui](https://github.com/dsalvagni/angular-scalable-project) e executar uma vers�o demo [aqui](http://www.dsalvagni.com.br/angular-scalable-project).

A principal aplica��o desses conceitos � no modelo Single Page Application com um arquivo _bundle_ com todos os m�dulos. Pretendo aprimorar esses modelo para usar, mesmo na SPA, um modo de carregar os m�dulos dinamicamente conforme requisitado. Usando, dessa forma, o lazy load com o RequireJS. 

Com o conceito discutido nesse post, � poss�vel configurar o compile do RequireJS no Gruntfile.js para compilar m�dulo a m�dulo, como se cada m�dulo fosse um _bundle_. Acredito que seja pouco vantajoso esse formato, porque o volume de requisi��es de arquivos continuara alto.

### 1.1 Requisitos e Depend�ncias

1.  Javascript
2.  [AngularJS](http://angularjs.org)
3.  [RequireJS](http://requirejs.org)
4.  [AMD](http://requirejs.org/docs/whyamd.html)
5.  [Grunt](http://gruntjs.com)
6.  [Bower](http://bower.io)
7.  [KarmaJS](http://karma-runner.github.io/0.12/index.html)
8.  [Protractor](https://angular.github.io/protractor/)

## 2\. Conceito

A estrutura da aplica��o � dividia em **m�dulos** e **componentes**. E, abaixo dessa, � feita a divis�o por feature. Os **m�dulos** s�o uma vis�o macro de uma funcionalidade e podem conter uma cole��o de _componentes_. Por exemplo, em uma aplica��o de rede social, o m�dulo de _perfil_ ir� conter componentes do tipo: meus amigos, minhas fotos. Dessa forma, os **componentes** representam uma vis�o micro de uma funcionalidade ou uma fun��o espec�fica redundante, que pode ser utilizada em diversos momentos.

## 3\. Estrutura

Estruturei a aplica��o da seguinte maneira:

*   **/**

    Gruntfile, karma.conf, package.json e readme.md

*   **/app**

    Cont�m todos os c�digo fontes da aplica��o.

    *   **/app.js**

        Arquivo do m�dulo principal, o qual carrega as depend�ncias e instancia os m�dulos.

    *   **/index.html**

        Inicializa��o da aplica��o

    *   **/main.js**

        Arquivo de configura��o do para utiliza��o com o RequireJS, para carregar os m�dulos e gerar, posteriormente, o bundle file.

    *   **/assets**

        Arquivos css, webfonts, imagens e arquivos de pr�processadores (less, sass, etc).

    *   **/src**

        Cont�m todos os c�digo fontes dos m�dulos e componentes, bem como configura��es gerais da aplica��o.

        *   **/components**

            Cont�m todos os c�digo fontes dos componentes.

        *   **/config**

            Cont�m as configura��es da aplica��o. Neste exemplo, somente o nome da aplica��o.

        *   **/modules**

            Cont�m todos os c�digo fontes dos m�dulos.

    *   **/vendor**

        Cont�m todas as bibliotecas e depend�ncias externas.

*   **/dist**

    Cont�m todos os arquivos gerados para a vers�o de distribui��o.

*   **/e2e-tests**

    Todos os testes end2end com o protractor.

### 3.1 Namespace

Guardo o nome da aplica��o em um arquivo e compartilho entre os m�dulos e componentes, assim todos ficam com o mesmo prefixo. Utilizo por organiza��o.

### 3.2 Estrutura de M�dulos

Conforme mencionado anteriormente, os m�dulos s�o as vis�es macros das funcionalidades da aplica��o. Podem conter seus pr�prios controllers, services, filters, etc. Os m�dulos est�o organizados da seguinte maneira:

#### /config

Guarda o arquivo de configura��o do m�dulo, module.config.js, com as informa��es de rotas bem como outras configura��es necess�rias para o funcionamento do m�dulo.

#### /controller

Cont�m todos os controllers relacionados ao m�dulo. Todos os controllers seguem o padr�o de nomeclatura: {nome}Ctrl - tanto de arquivo como do registro do controller.

#### /service

Cont�m todos os servi�os relacionados ao m�dulo. Todos os servi�os seguem o padr�o de nomeclatura: {nome}Svc - tanto de arquivo como de registro de servi�o.

#### /test

Cont�m todos os arquivos de testes unit�rios.

#### /view

Todas as views s�o organizadas em pastas relacionadas aos respectivos controllers. Caso exista um view parcial, comum a mais de um m�dulo, deve ser usada na pasta /view/partial. Caso seja uma view parcial, comum apenas a um controller, fica dentro da pasta da view do controller, com prefixo "_". Exemplo: "_sidebar.html"

#### /module.js

� o arquivo da instancia do m�dulo. Todas os arquivos do m�dulo e depend�ncias s�o carregados usando o AMD e registrados no angular para posteriormente serem relacionados no arquivo do m�dulo principal.

### 3.3 Estrutura de Componentes

Conforme mencionado anteriormente, os componentes s�o as vis�es micros das funcionalidades da aplica��o. Ainda, podem ser componentes independentes de qualquer m�dulo, com funcionalidades exclusivos. Podem conter seus pr�prios controllers, services, filters, etc. Os componentes est�o organizados da seguinte maneira, dentro da pasta /src/components:

#### /{contexto}/{componente}

O contexto agrupa os componentes. Como no exemplo mencionado acima, da rede social, o contexto dos componentes seria: perfil. Nesse projeto, temos 2 contextos: todo e contactList.

#### /{contexto}/{componente}/directives

Cont�m todas as diretivas relacionadas ao componente.

#### /{contexto}/{componente}/controllers*

Cont�m todas as controllers relacionadas ao componente. * S� recomendo o uso de controllers externos caso o c�digo seja bem extenso, que fique ruim manter no mesmo c�digo da diretiva.

#### /{contexto}/{componente}/view

Cont�m todas as views do componente. Todas as views devem conter o prefixo "_", como no exemplo: "_undone.html". � mais f�cil de identificar quando estiver depurando a aplica��o.

#### /{contexto}/{componente}/component.js

Da mesma forma que os m�dulos, os componentes possuem o arquivo de instancia do componente que carrega os arquivos com o AMD e registra no angular.

### 3.4 app.js

Arquivo principal da aplica��o, carrega todas as depend�ncias utilizando o AMD e registra em um m�dulo principal, no angular.

### 3.5 main.js

Arquivo de configura��o do RequireJS, onde carrego todas as bibliotecas de terceiros e inicio a aplica��o.

## 4\. Testes

Uma das minhas preocupa��es quando comecei a criar este modelo foi permitir que ele fosse "test�vel", e �. � poss�vel testar toda a aplica��o com testes unit�rios utilizando o KarmaJS e testes end2end utilizando o Protractor. Por conven��o, os testes end2end ficam na pasta raiz da aplica��o e os testes unit�rios devem estar na pasta **/test** dentro do seu respectivo m�dulo.

## 5\. Vers�o de Distribui��o

Para rodar a aplica��o em modo de desenvolvimento � simples, basta executar o comando abaixo na pasta raiz do projeto. A aplica��o estar� dispon�vel no endere�o: http://localhost:8000/app/ `npm start`

A vers�o de distruibui��o � gerada a partir de uma _task_ do Grunt, executada pelo comando abaixo. `grunt dist` Após executada a _task_, a aplica��o estar� dispon�vel na pata **/dist** e pode ser usado em produ��o.

## 6\. Considera��es

Esse modelo n�o � uma regra, � uma alternativa. Uma das maravilhas de trabalhar com projetos web � poder constru�-los de diversas maneiras dependendo, principalmente, do objetivo final. Por�m, quando se trabalha em empresas que mant�m diversos projetos com suas respectivas equipes, � importante manter as equipes alinhadas quanto ao padr�o de desenvolvimento de c�digo. 

Quando estruturei esse modelo, meu objetivo foi criar um padr�o para desenvolvimento de aplica��es em equipes que n�o necessariamente iniciam o projeto junto. Mas sim, equipes que s�o montadas por desenvolvedores alocados de um projeto ou de outro, o que � uma pr�tica comum. Dessa forma, todo desenvolvedor que entra no projeto, independente da fase que isso acontece, possui um modelo de aplica��o para seguir e ir� produzir, em toeria, um c�digo leg�vel por todas os desenvolvedores que participam do projeto. 

Esse modelo n�o resolve todos os problemas de padroniza��o de c�digo, mas tenho certeza de que se aplicado, ser� fundamental - seguido por pr�ticas como code review, refatoring e outras.