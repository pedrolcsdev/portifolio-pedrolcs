<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfólio — decisões do projeto

- Não utilize skills automaticamente. Aplique somente skills explicitamente nomeadas ou solicitadas pelo usuário. Ponytail nunca substitui decisões explícitas.
- Stack: Next.js App Router, React, TypeScript strict, Tailwind CSS v4, Lucide React, next-themes e Geist/Geist Mono locais. Sem carregamento remoto de fontes.
- shadcn/ui é obrigatório com **Radix UI** (`style: radix-nova` em `components.json`). Nunca usar Base UI, Material UI ou outra biblioteca de primitivas. Instalar apenas componentes utilizados.
- Presentation-First, conforme o `ARQUITETURA.md` fornecido: páginas enxutas em `src/app`; UI em `src/presentation`; shell estrutural em `shared/components/layout`; primitivas shadcn em `shared/components/ui`; UI exclusiva em `modules/<feature>/components`.
- Componentes genéricos usados em vários módulos ficam em `shared/components`. Dados em `src/data`, tipos em `src/types`, resolução/navegação em `src/lib/portfolio-routes.ts`. Não criar camadas ou pastas vazias.
- Arquivos em kebab-case, componentes com named exports; default exports apenas nas convenções que exigem isso (Next/config). Sem barrels por padrão, sem componentes gigantes.
- `src/app/layout.tsx` mantém o AppShell persistente com as quatro abas do client HTTP também em `/`. Usar Next Link e rotas reais `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`, incluindo acesso direto e histórico do navegador.
- GET é **simulado**: `resolvePortfolioRoute(pathname)` associa endpoint, tipo de conteúdo, dados e status 200/404. O prefixo `https://pedrolcs.dev/api/` é fixo; o trecho final pode ser editado e Send resolve apenas rotas locais, exibindo 404 para nomes desconhecidos. Nunca criar handlers `/api`, `fetch`, axios, servidor de API ou atrasos artificiais.
- Preview e JSON compartilham `src/data/portfolio.ts`. Não duplicar dados. Contatos, links, status e informações desconhecidas são opcionais; não inventar métricas, resultados ou funcionalidades.
- Preferir Server Components para previews. Client Components apenas nas fronteiras interativas. Estado derivado deve ser calculado; não sincronizá-lo com efeitos. Evitar novas dependências e otimizações especulativas.
- Estilo monocromático inspirado no client HTTP de referência: bordas finas, pequenos raios, espaço negativo, sans para UI e monospace para dados técnicos. Tokens semânticos em `globals.css`; verde discreto para GET, status e sintaxe JSON.
- Temas completos light/dark via next-themes, preferência inicial do sistema e escolha persistida. Evitar divergências de hidratação.
- Navegação superior fixa com exatamente quatro abas: Home, Projects, About e Contact; em telas pequenas, usar Sheet Radix acessível. Derivar a seleção da rota via `getActiveSection`, sem estado de abertura/fechamento. Detalhes são acessados pela lista de Projects e mantêm Projects selecionada; links diretos e histórico continuam funcionando.
- O client HTTP no desktop usa altura da janela e rolagem interna. As quatro abas dividem a largura disponível; no mobile, GET e título ficam empilhados dentro de cada aba. Não cortar nomes ou exigir arrastar o menu. JSON pode rolar internamente, sem overflow horizontal da página.
- Preservar HTML semântico, nomes acessíveis, foco visível, teclado, contraste e respeito a reduced-motion. Nenhum controle sem função; status sempre identificado como simulado.
- Escopo atual: shell persistente inspirado em cliente HTTP, Preview/JSON e previews mínimos das rotas Home, Projects, About e Contact. A Home também usa o mesmo shell com abas superiores e conteúdo simples.
- Escopo mantido nas demais rotas: client com aparência de janela, três círculos decorativos sem ações, marca, abas superiores, tema, GET fixo com caminho final editável, Send local, Preview/JSON e um único status simulado visível. FuzzyText de React Bits é usado apenas na tela de 404; não adicionar outras animações ou componentes da biblioteca nesta etapa. Sem Headers, Raw, métricas de rede ou controles sem função. Previews mínimos: título e identificação da seção, links simples para testar detalhes de projetos; não desenvolver o conteúdo das páginas. Sem layouts definitivos de case study, outras animações avançadas, 21st.dev, Motion, Lenis, API real, CMS, banco, autenticação, formulário ou deploy.
- Tooling: Tailwind/PostCSS e Webpack; o Turbopack foi substituído porque seu processo CSS foi bloqueado pelo sandbox. Manter o lockfile versionado.
- Validação: `npm run lint`, `npm run typecheck`, `npm run build`, `npm test` (Playwright, após build; desktop/mobile/tablet). Atualizar este arquivo quando decisões arquiteturais mudarem.
