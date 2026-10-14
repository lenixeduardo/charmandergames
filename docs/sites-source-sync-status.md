# CharmanderGames — sincronização Sites → GitHub

**Atualização: 14/10/2026 — distribuição publicada importada.**

- Projeto Sites: `appgprj_6acde5f365408191851872c26a9468f9`.
- Publicação: https://charmandergames.uzinho30.chatgpt.site/
- Repositório: https://github.com/lenixeduardo/charmandergames
- Commit da importação: `25b247df74c0aa392b3b094db3435deda12151c1`.

A pasta `dist/` contém **53 arquivos da aplicação publicada**, incluindo **48 assets**, obtidos a partir do endereço público do Sites. Os testes de rotas, busca, filtros, favoritos e ROMs foram executados no GitHub Actions e passaram.

### Comparação com o ZIP fornecido

O ZIP `CharmanderGames-codigo-fonte(1).zip` foi inspecionado localmente. Os arquivos da versão pública foram comparados por SHA-256: **48 idênticos e 5 diferentes** (`dist/app.js`, `dist/index.html`, `dist/player.html`, `dist/style.css`, `dist/assets/capas/pes-6.webp`). Os hashes completos estão em `sites-export/live-vs-uploaded.md`; manifestos em `sites-export/dist.sha256` e `sites-export/live.sha256`.

A fonte de verdade para a importação solicitada é a **versão publicada no Sites**, não uma combinação potencialmente inconsistente das duas versões.

### Limitações restantes

- O ZIP disponibilizado é uma **exportação estática**, não um projeto React/Vite com JSX/TSX.
- **Atualização:** o módulo de compatibilidade agora foi integrado aos cards em `dist/app.js`, com cópia dos módulos ESM em `dist/compatibility/`. A alteração está no GitHub, mas não foi publicada no Sites.
- A versão publicada no Sites não foi alterada por este commit; somente o GitHub foi atualizado.
- Testes reais em diferentes navegadores, especialmente execução de ROMs autorizadas e verificação visual pixel-perfect, continuam pendentes.

O registro textual anterior da página está preservado em `docs/sites-current-page-text.txt`.
