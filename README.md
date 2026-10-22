# naoconsigonomear
Um agradador de html de forma facilitada. 

## Como usar no GitHub Pages

1. Abra a página `index.html`.
2. Cole um HTML no campo de texto **ou** carregue um arquivo `.html`.
3. Clique em **Adicionar item**.
4. O item aparece na lista e pode ser:
   - aberto em uma nova página funcional;
   - exibido no preview interno.

### Tecnologias usadas (HTML puro)

- `FileReader` para ler arquivo local `.html`;
- `Blob` + `URL.createObjectURL` para gerar uma página funcional;
- `localStorage` para manter a lista após recarregar;
- `iframe` (`srcdoc`) para preview rápido dentro da própria página.
