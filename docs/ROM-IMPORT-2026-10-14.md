# ROMs adicionadas ao catálogo Pokémon

Inspeção feita em **14/10/2026** a partir de 5 arquivos ZIP fornecidos pelo proprietário do projeto.

## Resultado

| Jogo | Conteúdo do ZIP | Suporte |
|---|---|---|
| Pokémon Ultra Violet 1.22 | ROM FireRed hack `.gba` (16 MB) | Cadastrado na aba Pokémon; carregar a ROM descompactada na aba Emulador (GBA) |
| Pokémon Black — Special Palace Edition 1 (Goomba V2.2) | ROM `.gba` (1.092.512 bytes); cabeçalho Goomba | Cadastrado; carregar o arquivo GBA (não confundir com o jogo Nintendo DS) |
| Pokémon Jupiter 6.04 | **Somente patch `.ips`**, 3.904.094 bytes, IPS válido | Cadastrado; selecionar a ROM-base Pokémon Ruby `.gba` e o IPS em **Aplicar patch e jogar**, na aba Emulador |
| Pokémon Stadium (Rev 2) | O ZIP indica `.z64` de 32 MB, mas está **truncado** (12.234.752 bytes presentes; sem diretório central) | Cadastrado como N64; precisa de uma ROM `.z64`, `.n64` ou `.v64` íntegra |
| Pokémon Mystery Dungeon: Red Rescue Team | ROM `.gba` (32 MB) | Cadastrado; carregar a ROM descompactada no emulador (GBA) |

Os cinco títulos são identificados separadamente dos seis jogos Pokémon anteriores: a seção **Pokémon** passa a ter 11 jogos. O catálogo completo do portal passa a conter **43 entradas**.

## Procedimento no site

1. Abra **Pokémon** para localizar o jogo.
2. Clique em **Abrir na aba Emulador**; o jogo correspondente será selecionado.
3. Para Ultra Violet, Pokémon Black (Goomba) ou Mystery Dungeon, extraia o `.gba` de seu ZIP e selecione-o na aba Emulador. Não selecione o ZIP.
4. Para Jupiter, obtenha uma ROM-base de Pokémon Ruby que você está autorizado a usar, extraia seu arquivo IPS e selecione os dois no painel **Aplicar patch e jogar**. O patch é processado localmente.
5. Para Stadium, obtenha um arquivo íntegro de ROM N64 e selecione-o. O núcleo N64 do EmulatorJS é suportado, mas desempenho mobile não é garantido.

A ROM carregada no input de arquivo permanece no dispositivo e é utilizada para iniciar a sessão. Seu conteúdo **não é enviado ao GitHub nem hospedado pelo portal**. Não há ROM comercial embarcada em `dist/`.

### Arquivos recebidos versus execução

- Os quatro ZIPs de Ultra Violet, Pokémon Black, Jupiter e Mystery Dungeon tiveram entradas verificadas; Jupiter contém um IPS válido com registro EOF.
- **Pokémon Stadium.zip não passa na leitura como ZIP completo**, pois faltam bytes comprimidos e a estrutura final; não é possível reconstruir a ROM N64 íntegra a partir do arquivo recebido.
- Um patch IPS pode ser estruturalmente válido sem ser compatível com toda versão da ROM Ruby; não há garantia de inicialização para uma ROM-base não verificada.

### Limitações de publicação

A mudança foi commitada no GitHub como código e metadados. O projeto ChatGPT Sites publicado não é atualizado automaticamente pela operação no repositório. A distribuição de arquivos de jogos de terceiros não foi habilitada.
