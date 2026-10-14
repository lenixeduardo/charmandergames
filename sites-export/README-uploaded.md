# CharmanderGames
Site estático: `dist/index.html`, CSS e JavaScript sem etapa de build.

## ROMs
Nenhuma ROM é incluída. O usuário pode selecionar arquivos `.gb`, `.gbc`, `.gba` localmente ou cadastrar URLs HTTPS no Emulador. URLs e favoritos ficam no localStorage deste navegador. Para configuração compartilhada, preencha `dist/roms.json` com pares ID/URL: IDs `red`, `yellow`, `crystal`, `firered`, `leafgreen`, `emerald`. Use apenas arquivos autorizados. Caminhos `/roms/arquivo.gba` também são aceitos no manifesto. Ao clicar em Jogar, uma URL configurada inicia o EmulatorJS automaticamente em iframe separado. GB/GBC usam gambatte (`gb`), GBA usa mGBA (`gba`). CDN oficial stable requerido; ROMs remotas requerem CORS. Saves são gerenciados pelo EmulatorJS; recomenda-se exportar backup pelo menu.

## Componentes
Renderizadores reutilizáveis de cards, hero, navegação, sidebar e benefícios. Rotas por hash, busca por nome, filtros de plataforma, favoritos persistentes, tratamento de catálogo vazio, menu mobile e modal de emulação. Lucide e fontes Sora/Inter por CDN. Artes extraídas do mockup fornecido e SVGs do UI Kit, sem ROMs ou BIOS.
