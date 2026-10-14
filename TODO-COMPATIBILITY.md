# TODO — badges de compatibilidade no CharmanderGames

- [x] Definir indicadores de plataforma e diagnóstico local do navegador.
- [x] Mapear os 38 títulos registrados na versão pública do Sites.
- [x] Implementar módulo de triagem WebAssembly, WebGL 2 e WebGPU.
- [x] Implementar componente React de referência e testes.
- [x] **Importar os 53 arquivos da distribuição estática publicada para `main`**, preservando os módulos anteriores.
- [x] Comparar a distribuição Sites ao ZIP recebido por SHA-256 e registrar divergências.
- [x] Integrar os badges na aplicação estática em `dist/app.js`, `dist/style.css` e `dist/compatibility/*.mjs`.
- [x] Conferir os 38 títulos e associar os perfis, inclusive por nome quando o ID do card difere do registro.
- [ ] Confirmar manualmente hosts classificados como `tentative` / `unverified`.
- [ ] Testar responsividade e compatibilidade em Chrome, Edge, Firefox, Safari iOS e Chrome Android.
- [ ] Publicar uma versão do Sites com os badges integrados e efetuar testes E2E.

**Critério de aceite:** cada card da versão publicada apresenta plataformas suportadas e diagnóstico com requisitos verificáveis, sem afirmar desempenho ou disponibilidade externa não comprovados. O fluxo de jogar, ROMs, favoritos e filtros permanece funcional.
