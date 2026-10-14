# CharmanderGames

Portal estático de jogos clássicos. A versão publicada no ChatGPT Sites foi sincronizada para `dist/` em 14/10/2026.

- **Site:** https://charmandergames.uzinho30.chatgpt.site/
- **Distribuição executável:** `dist/index.html`, `dist/app.js`, `dist/style.css`, `dist/player.html` e `dist/assets/`.
- **Catálogo:** 38 itens, incluindo jogos web, Pokémon para emulação, jogos de instalação nativa e projetos comunitários.
- **Configuração Sites:** `.openai/hosting.json`.
- **Testes da aplicação estática:** `node check.cjs` (execute da raiz); também `node --check dist/app.js`.
- **Verificação dos perfis de compatibilidade:** `npm test`.
- **Origem do ZIP e diferenças do site publicado:** `sites-export/dist.sha256` e `sites-export/live-vs-uploaded.md`.

## Estrutura

`dist/` contém a distribuição publicada, com HTML/CSS/JS estáticos e 48 assets. **Não é um projeto React/Vite**: não há árvore original JSX/TSX. O componente React criado anteriormente permanece em `src/features/gameCompatibility/` como implementação de referência; **ainda não foi integrado ao JavaScript estático publicado**.

Para integração, portar a triagem de `src/features/gameCompatibility/compatibility.mjs` para os cards gerados por `dist/app.js` ou refatorar o portal inteiro com aprovação separada. Não alterar silenciosamente a versão publicada.

## Emulador e arquivos

O ZIP e o repositório não incluem ROMs comerciais. As ROMs são carregadas pelo visitante, conforme instruções em `docs/SITES-EXPORT-README.md`.

## Proveniência

O envio ao GitHub foi realizado a partir dos arquivos disponíveis publicamente no endereço Sites. O ZIP fornecido pelo proprietário foi comparado com esses arquivos: 48 de 53 tiveram SHA-256 idêntico e cinco divergiram, documentados com hashes. Para esta importação, foi priorizada a **versão publicada**.

Mais detalhes: `docs/sites-source-sync-status.md`.
