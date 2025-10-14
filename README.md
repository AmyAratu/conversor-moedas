
## Conversor de Moedas (React + TypeScript)

Projeto realizado como parte do processo seletivo para vaga de Software Engineer 2, para a XP Inc.

O usuário irá acessar uma tela onde irá informar um valor em
reais e selecionar a moeda para qual gostaria de converter.

As moedas disponíveis são: Euro, Dólar e Libras Esterlinas.

Também é apresentado a data e hora da cotação.

Incluso tratamento de falha em caso a requisição da API falhar, apresentando a mensagem de erro para o usuário.

Requisitos não funcionais:
Aplicação simples com React.

Estilização CSS utilizando Tailwind.

Realizados testes unitários para conversão da moeda com valores fixos no código.


### Dependências necessárias:

Node.js (node, npm, nvm) <br>
Uma IDE de sua preferência (IntelliJ, VScode, Eclipse, etc) 

### Como usar


1. Instale dependências do node:
   
   <b> npm install </b>
   
2. Inicie em modo de desenvolvimento: <br>
   <b> npm start </b>

3. Para rodar os testes: <br>
   <b>npm test</b>

### Testes
- O teste com valores fixos está mockado em `src/mockApi.test.ts`.
