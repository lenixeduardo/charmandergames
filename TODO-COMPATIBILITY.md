# TODO — publicação da compatibilidade no CharmanderGames

- [x] Definir badges independentes de plataforma e verificação local.
- [x] Mapear 25 jogos da lista inicial, 2048, Hextris, OpenTTD e 6 Pokémon.
- [x] Implementar triagem WebAssembly, WebGL 2, WebGPU e detecção de tipo de dispositivo.
- [x] Implementar componente React, painel expansível, CSS responsivo e acessibilidade básica.
- [x] Adicionar testes unitários e workflow GitHub Actions.
- [ ] **Obter o código-fonte do site já publicado no ChatGPT Sites.** Este repositório estava vazio; a aplicação real não está aqui.
- [ ] Importar `GameCompatibilityBadges` no componente compartilhado de card e na página de detalhes do jogo (preservar imagens, favoritos, filtros e rotas atuais).
- [ ] Cruzar IDs/títulos/URLs **efetivos** do catálogo com os perfis; ampliar aliases de jogos com nomes divergentes.
- [ ] Confirmar manualmente os hosts externos assinalados como `tentative` ou `unverified`, sem converter resultados desconhecidos em 'compatível'.
- [ ] Publicar uma nova versão no Sites.
- [ ] Validar card por card e página de detalhes em Chrome/Edge/Firefox desktop, Safari iOS e Chrome Android; conferir a mensagem de recursos indisponíveis.
- [ ] Fazer E2E do layout mobile/desktop, abertura em nova aba dos ports que não permitem iframe e funcionalidades pré-existentes.

## Critério de aceite

A versão publicada deve exibir **dois badges** em todos os cards: plataformas e situação do navegador atual. O detalhamento deve listar verificações técnicas, arquivos externos e controles necessários. O botão Jogar continua acessível, mas com orientação sobre incompatibilidades. Desempenho, disponibilidade do host e autorização para usar arquivos continuam fora do alcance da checagem automática.
