# CharmanderGames — sincronização Sites → GitHub

Data da inspeção: **2026-10-14**.

Projeto Sites: `sites-project://appgprj_6acde5f365408191851872c26a9468f9`

Endereço publicado: https://charmandergames.uzinho30.chatgpt.site

Versão indicada pela projeção da Biblioteca: **source version 4 / projection revision 8** (não equivale a hash Git nem garante data exata da publicação).

## O que conseguimos verificar

- Representação **textual** da página atual registrada pelo Sites: ver `docs/sites-current-page-text.txt`.
- Catálogo atual de **38 jogos**, extraído dos textos de cards, sem inventar títulos: ver `data/sites-current-catalog.json`.
- Navegação: Início, Jogos Online, Pokémon, ROM Hacks & Mods, Jogos para Baixar e Emulador.
- Bloco de status das ROMs de FireRed, LeafGreen e Emerald; no momento da projeção exibiam «ROM não configurada».
- Catálogo com busca, favoritos, filtros GB/GBC/GBA/Web/PC.
- Página avisa que ROMs comerciais não são distribuídas.

## Limitação importante

**Este commit NÃO é o código-fonte da versão publicada no Sites.** O acesso disponível não expõe arquivos JSX/TSX, CSS, configuração Vite, fontes, imagens reais e as demais dependências do projeto que está no editor. O site público também não ficou acessível ao coletor web ou ao container nesta sessão. Portanto seria incorreto alegar que uma cópia exata e compilável do Sites foi sincronizada.

O GitHub contém um módulo React de badges de compatibilidade criado separadamente e um registro do catálogo real, mas **não contém** ainda a aplicação do Sites.

## Pendências para conseguir o espelho exato

1. Exportar o projeto **atual** a partir do editor Sites, como arquivo compactado com código-fonte e assets, caso o editor permita essa exportação.
2. Enviar o ZIP no chat ou disponibilizar a origem diretamente por uma integração com acesso aos arquivos do projeto.
3. Inspecionar todo o ZIP, reconciliar com `main` e preservar o módulo de compatibilidade criado no repositório.
4. Executar build e testes responsivos e, então, fazer o commit da aplicação na `main`.

**Não substituir a versão atual por um frontend recriado a partir apenas de texto e mockups.**
