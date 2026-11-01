# pedrolcs.dev

Portfólio de back-end apresentado como um cliente HTTP. A estrutura permanente usa abas de requisição no topo, barra GET e painel Response. Os previews internos são provisórios: título, identificação e links simples para testar a navegação.

## Executar

Requer Node.js 20.9+ e npm.

```sh
npm ci
npm run dev
```

Abra [localhost:3000](http://localhost:3000). Para rodar a versão de produção: `npm run build` e `npm start`.

## Estrutura

- `src/app/`: rotas, metadados e layout persistente.
- `src/presentation/shared/components/layout/`: AppShell, Header e RequestTabs.
- `src/presentation/shared/components/`: RequestBar, ResponsePanel, JsonViewer, provider e controles compartilhados.
- `src/presentation/shared/components/ui/`: Button, Tabs e Tooltip do shadcn/ui com Radix.
- `src/presentation/modules/`: previews Home, Projects, ProjectDetail, About e Contact.
- `src/data/portfolio.ts`: dados tipados, projetos e contatos opcionais.
- `src/data/interface-copy.ts`: textos da interface para edição/tradução.
- `src/lib/portfolio-routes.ts`: navegação e resolvedor local de respostas GET, incluindo 404.
- `src/types/portfolio.ts`: contratos dos dados e respostas.
- `src/app/globals.css`: tokens dos dois temas, shell e responsividade.
- `AGENTS.md`: decisões e convenções para futuras sessões.

## Funcionamento

As URLs reais são `/`, `/projects`, `/projects/sp-spaces`, `/projects/gestao-portuaria`, `/about` e `/contact`. O endpoint exibido é uma representação, como `GET https://pedrolcs.dev/api/projects`; não existe uma API HTTP.

Preview e JSON leem os mesmos dados TypeScript locais. O prefixo `https://pedrolcs.dev/api/` é fixo e o trecho final é editável. Send resolve localmente os nomes de páginas e projetos existentes; caminhos desconhecidos retornam 404 simulado. Não há fetch de conteúdo, medição de latência, carregamento artificial ou formulário de contato. O tráfego normal de navegação e recursos do Next.js continua existindo.

A navegação superior tem exatamente quatro abas permanentes: Home, Projects, About e Contact. Todas aparecem simultaneamente, inclusive no mobile, sem +, fechamento ou rolagem lateral. Os detalhes são acessados pela lista em Projects; a aba Projects continua selecionada sem criar uma aba adicional. A seleção acompanha a URL, inclusive em acesso direto, refresh e histórico. Os três círculos da janela são apenas decorativos.

Os previews são Server Components inseridos no shell interativo persistente. A aba de resposta permanece selecionada durante a navegação. O JSON tem indentação, destaque de sintaxe seguro por nós de texto, cópia e rolagem interna. Rotas inválidas exibem uma resposta simulada 404 dentro do client.

## Personalizar

Edite os dados em `src/data/portfolio.ts`. Preencha `contacts.github`, `contacts.linkedin` com URLs completas e `contacts.email` com seu endereço. Valores vazios não criam links. Os dados completos continuam disponíveis no JSON. O conteúdo visual dos módulos será desenvolvido em etapas posteriores.

A preferência de tema começa no sistema e a escolha manual persiste via next-themes. As fontes Geist são servidas localmente pelo Next.js. O `components.json` usa `radix-nova` e aponta para `src/presentation/shared/components/ui`.

Tailwind usa PostCSS e os scripts usam Webpack. Essa configuração evita a abertura de uma porta interna pelo processo CSS do Turbopack, bloqueada no ambiente em que o projeto foi criado.

## Validar

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

Playwright inicia seu próprio servidor de produção na porta 3100, sem reutilizar o servidor de desenvolvimento, e cobre desktop, mobile e tablet: resolução local, URLs diretas, refresh, navegação/histórico, persistência do shell, Preview/JSON, Send, quatro abas permanentes sempre visíveis, navegação para detalhes dentro de Projects, temas, teclado, cópia do JSON, erros de clipboard, 320 px e 404. Artefatos de falhas ficam em `test-results/` (ignorado pelo Git).

## Próximas etapas

Cada módulo pode evoluir sem alterar a estrutura do client. Layouts definitivos, imagens, diagramas e animações ficam para etapas futuras. Não foi realizado deploy.
