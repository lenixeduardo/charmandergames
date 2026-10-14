# CharmanderGames

Portal estático de jogos clássicos. A versão publicada no ChatGPT Sites foi sincronizada para `dist/` em 14/10/2026.

- **Site:** https://charmandergames.uzinho30.chatgpt.site/
- **Distribuição executável:** `dist/index.html`, `dist/app.js`, `dist/style.css`, `dist/player.html` e `dist/assets/`.
- **Catálogo:** 43 itens: os 38 originais e 5 jogos Pokémon adicionados a partir de arquivos fornecidos pelo usuário.
- **Configuração Sites:** `.openai/hosting.json`.
- **Testes da aplicação estática:** `node check.cjs` (execute da raiz); também `node --check dist/app.js`.
- **Verificação dos perfis de compatibilidade:** `npm test`.
- **Origem do ZIP e diferenças do site publicado:** `sites-export/dist.sha256` e `sites-export/live-vs-uploaded.md`.

## Estrutura

`dist/` contém a distribuição publicada, com HTML/CSS/JS estáticos e 48 assets. **Não é um projeto React/Vite**: não há árvore original JSX/TSX. O JavaScript do catálogo em `dist/app.js` **já inclui badges de plataformas e diagnóstico** para todos os cards, por importação dinâmica de `dist/compatibility/compatibility.mjs`. O componente React continua em `src/features/gameCompatibility/` como referência.

A integração está feita no código do GitHub e foi validada com `node check.cjs` e `npm test`. **A publicação do projeto no ChatGPT Sites é uma etapa separada e permanece pendente.**

## Emulador e arquivos

O ZIP de exportação do portal e o repositório não incluem ROMs comerciais. A aba Pokémon inclui os cinco jogos adicionais: Ultra Violet, Black — Special Palace Edition, Jupiter, Stadium (N64) e Mystery Dungeon: Red Rescue Team. O emulador aceita GB/GBC/GBA/N64 descompactados; Jupiter possui ferramenta local de patch IPS. Os arquivos são selecionados no próprio dispositivo do visitante.

**Atenção:** o ZIP recebido de Pokémon Stadium está truncado e não pode ser utilizado; é necessário um arquivo N64 íntegro. Para Jupiter, o arquivo recebido contém somente o patch IPS, sendo necessária uma ROM-base autorizada de Pokémon Ruby.

Veja `docs/ROM-IMPORT-2026-10-14.md` para o relatório de verificação dos arquivos e `docs/SITES-EXPORT-README.md` para mais detalhes do emulador.

## Proveniência

O envio ao GitHub foi realizado a partir dos arquivos disponíveis publicamente no endereço Sites. O ZIP fornecido pelo proprietário foi comparado com esses arquivos: 48 de 53 tiveram SHA-256 idêntico e cinco divergiram, documentados com hashes. Para esta importação, foi priorizada a **versão publicada**.

Mais detalhes: `docs/sites-source-sync-status.md`.
