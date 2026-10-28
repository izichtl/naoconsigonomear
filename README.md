# Arquivo editorial estático

Interface editorial sem servidor, framework ou dependências. A barra lateral ocupa
aproximadamente 12% da viewport e cada página é exibida em um `iframe` que
preserva a navegação.

## Segurança das chaves OpenRouter

As páginas que usam a OpenRouter, como `open-router-jev.html`,
`open-router-img.html` e `open-router-pdf.html`, não armazenam a API key em arquivos, cookies,
`localStorage`, banco de dados ou backend. A chave fica somente na memória da
página enquanto ela está aberta e é enviada diretamente do navegador para a
OpenRouter por uma requisição `fetch`.

Isso significa que:

- não existe servidor intermediário neste projeto;
- a chave não é incluída no manifesto nem nos prompts salvos;
- fechar ou recarregar a página remove a chave do estado da interface;
- o usuário deve evitar compartilhar a tela ou publicar arquivos com uma chave;
- a OpenRouter ainda recebe a chave durante a chamada, conforme necessário para
  autenticar a requisição.

Todo o código está disponível no repositório
[`./naoconsigonomear`](./), incluindo as páginas em
[`./pages`](./pages), o tema compartilhado em [`./theme.css`](./theme.css), a
shell em [`./index.html`](./index.html) e o gerador do manifesto em
[`./generate-manifest.sh`](./generate-manifest.sh).

Repositório público do projeto:
<https://github.com/izichtl/naoconsigonomear>

## Atualizar a navegação

O manifesto é descoberto automaticamente pelo Bash. Para regenerá-lo:

```bash
cd /Users/izichtl/Documents/gerador-de-html
chmod +x generate-manifest.sh   # apenas na primeira execução
./generate-manifest.sh
```

O script percorre recursivamente o diretório, encontra todos os arquivos `*.html`
(exceto o próprio `index.html`), lê o `<title>` e atualiza `manifest.js`.
Assim, basta adicionar qualquer HTML e executar o script novamente para incluí-lo
na sidebar. Não é necessário cadastrar páginas em outro arquivo.

Para visualizar localmente, abra `index.html` no navegador. O layout não exige
backend; um servidor local opcional também funciona.

## Tema visual compartilhado

Todas as páginas dentro de `pages/` carregam o [theme.css](./theme.css) depois
dos estilos próprios. Esse arquivo funciona como override visual comum: cores,
superfícies, bordas, tipografia, campos e botões são definidos em um único
local. Para mudar a aparência de todos os estudos, edite apenas as variáveis no
bloco `:root` de `theme.css`; o conteúdo e a lógica de cada HTML permanecem
independentes.

O [theme.js](./theme.js) normaliza automaticamente o topo das páginas que não
possuem um `<header>` explícito: ele organiza o primeiro título e subtítulo no
mesmo cabeçalho editorial usado pelo estudo de forma, sem duplicar ou editar o
conteúdo dos estudos.

## Sidebar redimensionável

A borda direita da sidebar pode ser arrastada para ajustar sua largura. O valor
é salvo no navegador e também pode ser ajustado com as setas esquerda/direita
quando a alça estiver focada. A largura inicial é 15% maior que a proporção
original.

## Usar o OpenRouter no Jev request builder

Abra a página **Montador de request — Jev / triagem de artigos** pela sidebar.
Na seção **Enviar para OpenRouter**:

1. informe sua chave `sk-or-...`;
2. escolha o modelo;
3. clique em **Gerar prompt JSON** e revise o payload;
4. clique em **Enviar para OpenRouter**;
5. consulte o corpo bruto retornado no campo **Retorno bruto da API**.

A chave é armazenada somente no `localStorage` do navegador para não precisar
ser digitada novamente. Ela não é incluída no prompt JSON. O envio é feito
diretamente do navegador para `https://openrouter.ai/api/v1/chat/completions`;
por isso, a disponibilidade depende de conexão, CORS e das permissões da chave.
Não publique uma cópia do projeto com uma chave preenchida.

## Usar o leitor de PDF

Abra a página **OpenRouter — Leitor de PDF** pela sidebar. Informe a chave e
um modelo compatível com entrada de arquivos, selecione um PDF e escreva o que
quer saber sobre ele. A página envia o arquivo diretamente à OpenRouter e
exibe a resposta em linguagem natural, com opções para copiar ou baixar o
texto. O PDF também permanece somente em memória enquanto a página está aberta.
