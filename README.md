# CharmanderGames — compatibilidade por jogo

Módulo pronto para integrar ao catálogo React/Vite do CharmanderGames.

> **Estado atual:** este repositório estava vazio quando o módulo foi criado. Estes arquivos **não alteram automaticamente** a versão publicada no ChatGPT Sites. Para integrar à aplicação, importe o componente no código-fonte do Sites e publique uma nova versão.

## O que entrega

- Badge separado para **plataformas**: Desktop, Desktop + Mobile, Mobile, ou Não verificado.
- Badge da **verificação local**: Requisitos detectáveis atendidos, Requer configuração, Incompatível ou Não verificado.
- Detalhamento acessível dos requisitos e eventuais limitações.
- Perfis de títulos da lista de 25 jogos, 2048, Hextris, OpenTTD e os seis Pokémon do emulador.
- Checagem real das APIs WebAssembly, WebGL 2 e WebGPU quando exigidas, respeitando a impossibilidade de assegurar FPS, RAM livre, arquivos do usuário ou funcionamento de hosts externos.
- **Sem tentativa de abrir URLs em segundo plano** e sem bloquear botões de jogar apenas por uma estimativa de hardware.

## Integração (React)

Copie a pasta `src/features/gameCompatibility` para o projeto Sites. No componente de card:

```jsx
import { GameCompatibilityBadges } from "./features/gameCompatibility/GameCompatibilityBadges.jsx";

function GameCard({ game }) {
  return (
    <article className="game-card">
      {/* capa, nome, ações existentes */}
      <GameCompatibilityBadges game={game} />
    </article>
  );
}
```

O objeto `game` deve conter `id`, `title` ou `name`. O componente reconhece aliases como `Pokemon Yellow`, `Pokémon Yellow`, `Quake 3`, etc. Para novos jogos, acrescente um perfil em `catalog.mjs`. Jogos desconhecidos **não** serão classificados como compatíveis por suposição.

Importe o componente também na página de detalhes se desejar mostrar a checagem completa.

## Semântica dos estados

- **Requisitos detectáveis atendidos:** todas as APIs obrigatórias registradas para aquele jogo foram verificadas no navegador atual; não é garantia de execução do jogo.
- **Requer configuração:** a plataforma é elegível, mas precisa de arquivos próprios ou de verificações que somente o site de destino pode realizar.
- **Incompatível:** a plataforma é explicitamente não suportada ou falta uma API obrigatória detectável.
- **Não verificado:** a versão/link não foi suficientemente documentado ou não existe perfil.

Não use requisitos do jogo nativo como se fossem requisitos de um port WebAssembly de terceiros. `crossOriginIsolated` e `SharedArrayBuffer` devem ser verificados **na origem do jogo**, não no CharmanderGames, quando aberto em outra aba.

## Verificações

`npm test` usa o test runner integrado ao Node.js, sem dependências externas. A integração visual React precisa ser testada também na aplicação Sites, que não está neste repositório.

## Fontes de referência (outubro/2026)

- BO1 Zombies: https://zombiesbrowser.com/ e https://bo1browser.com/play-guide/
- Skate 3 do endereço informado: https://skate.aaddpp.lol/ e https://skatemods.com/blog/skate-3-browser-port/
- Halo CE: https://radiantgames.org/halo-browser/ e https://github.com/damiantw/halo-ce-web-multiplayer
- Catálogo de versões web: https://radiantoptimizer.games/

As classificações dependem da **versão exata do jogo**. Revisar os perfis quando o endereço ou motor do jogo mudar.
