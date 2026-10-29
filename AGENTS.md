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
- `src/app/layout.tsx` mantém o AppShell persistente. Usar Next Link e rotas reais `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`, incluindo acesso direto e histórico do navegador.
- GET é **simulado**: `resolvePortfolioRoute(pathname)` associa endpoint, tipo de conteúdo, dados e status 200/404. Nunca criar handlers `/api`, `fetch`, axios, servidor de API ou atrasos artificiais. Send reprocessa os dados locais e anuncia a conclusão.
- Preview e JSON compartilham `src/data/portfolio.ts`. Não duplicar dados. Contatos, links, status e informações desconhecidas são opcionais; não inventar métricas, resultados ou funcionalidades.
- Preferir Server Components para previews. Client Components apenas nas fronteiras interativas. Estado derivado deve ser calculado; não sincronizá-lo com efeitos. Evitar novas dependências e otimizações especulativas.
- Estilo monocromático inspirado no client HTTP de referência: bordas finas, pequenos raios, espaço negativo, sans para UI e monospace para dados técnicos. Tokens semânticos em `globals.css`; verde discreto para GET, status e sintaxe JSON.
- Temas completos light/dark via next-themes, preferência inicial do sistema e escolha persistida. Evitar divergências de hidratação.
- Desktop usa altura da janela e rolagem interna. Mobile usa Sheet Radix com navegação acessível; sem overflow horizontal da página. JSON pode rolar internamente.
- Preservar HTML semântico, nomes acessíveis, foco visível, teclado, contraste e respeito a reduced-motion. Nenhum controle sem função; status sempre identificado como simulado.
- Escopo atual: shell completo e previews simples. Sem layouts definitivos de case study, animações avançadas, React Bits, 21st.dev, Motion, GSAP, Lenis, API real, CMS, banco, autenticação, formulário ou deploy.
- Tooling: Tailwind/PostCSS e Webpack; o Turbopack foi substituído porque seu processo CSS foi bloqueado pelo sandbox. Manter o lockfile versionado.
- Validação: `npm run lint`, `npm run typecheck`, `npm run build`, `npm test` (Playwright, após build; desktop/mobile/tablet). Atualizar este arquivo quando decisões arquiteturais mudarem.
