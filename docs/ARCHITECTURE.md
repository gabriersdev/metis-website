# Arquitetura do Metis

O projeto Metis é baseado no tema `astro-haze`, utilizando o framework Astro 7. Trata-se de um projeto focado em conteúdo estático (Content-first), com um sistema de UI reutilizável fundamentado na estética de *Glassmorphism*. O sistema disponibiliza suporte completo a um blog paginado, portfólio para estudos de caso, e uma página de aterrissagem (landing page).

## Estrutura de Diretórios e Componentes

A organização segue a arquitetura canônica e o roteamento baseado em arquivos do ecossistema Astro, divididos principalmente nos seguintes diretórios dentro de `src/`:

- **`components/`**: Contém todos os componentes visuais, divididos por contexto semântico:
  - `blog/`: Componentes específicos para o blog (cards, paginação, grid de posts e índice/ToC).
  - `common/`: Componentes globais compartilhados, encarregados do cabeçalho, rodapé, tags de SEO, alternador de tema e elementos decorativos (fundo aurora).
  - `landing/`: Seções da página de destino orientadas pela configuração de dados (Hero, Features, Pricing, etc).
  - `portfolio/`: Componentes para exibição de galerias, e listagens de projetos.
  - `ui/`: Primitivas de UI compartilhadas em todo o app (GlassCard, Button, Picture, Tag, e containers estruturais).

- **`content/`**: Sistema de coleções de conteúdo gerenciado pela Content Layer API do Astro:
  - `blog/`: Base de postagens escritas em Markdown (`.md`) e MDX (`.mdx`).
  - `landing/`: Modelo de dados dinâmico da página de destino, em formatação de serialização de dados (`.json`, `.yaml` ou `.yml`).
  - `projects/`: Repositório de arquivos (Markdown/MDX) de estudo de caso para a aba de portfólio.

- **`layouts/`**: Componentes de layout base que envelopam o documento estrutural (HTML).

- **`lib/`**: Ferramentas, bibliotecas utilitárias e gerenciamento de URL.

- **`pages/`**: Engrenagem de roteamento:
  - `blog/`: Índices de navegação, mapeamento para rotas de paginação e processamento das matérias (artigos).
  - `landing/`: Rota principal de apresentação do produto/e-commerce.
  - `tags/`: Rotas para arquivamento e filtragem utilizando taxonomias cruzadas.
  - `work/`: Índice do portfólio, gerando as sub-rotas dinamicamente para os estudos de caso baseados nos conteúdos.
  - `rss.xml.ts`: Route Handler destinado à geração do XML estático do fluxo RSS.

- **`styles/`**: Elementos de estilo global que governam o comportamento estético de todo site, dispensando utilitários diretamente no HTML.

## Estilização (Tokens, Glass e Global)
Diferente de implementações modernas que utilizam frameworks utilitários intensivos (ex: Tailwind), o projeto confia inteiramente no uso de variáveis nativas da Web (CSS Custom Properties) geridas por intermédio do `src/styles/tokens.css`.
- As superfícies modulares, cards e texturas do estilo *glass* (junto a eventuais comportamentos de degradação suave - fallbacks) encontram-se definidos no arquivo `src/styles/glass.css`.
- Todos as formatações globais residem no arquivo `src/styles/global.css`.
- **Comutação de Tema (Light/Dark)**: O controle visual opera de modo sistêmico. Existe proteção embutida para a intermitência visual durante os acessos (*no-flash startup*) e a tag `theme-color` é refletida sincronizadamente com o estado do tema.

## Otimização de Ativos e Compilação
- **Media**: Imagens hospedadas localmente no diretório de recursos estritos (`src/assets/`) são otimizadas nativamente pela API de imagem do Astro (`astro:assets`) sendo entregues nos formatos AVIF e WebP. Elas são injetadas através do componente `<Picture>`, gerando regras `srcset` dinamicamente responsivas. Referências puras de URL ou ativos do diretório estático aberto (`public/`) são rendidos sem alteração do binário.
- **Resiliência de Hospedagem**: As chaves âncoras locais do sistema e hyperlinks (como imagens, caminhos de leitura, roteamento) atravessam o interceptador `withBase()` importado de `src/lib/url.ts`. Ele é desenhado para acomodar domínios não raiz. Ex: a sub-rotação no uso do recurso de deploy de repositório em plataformas como `GitHub Pages`.

## Mecanismos de Pesquisa
- A infraestrutura técnica para a busca instantânea estática é sustentada pelo pacote e integração **Pagefind** (`astro-pagefind`). 
- Em vez de realizar queries lentas ao servidor, toda a estrutura referencial é montada numa camada binária estática ao se despachar o comando final de build.
- O componente front-end consiste em um Modal de Vidro (Glass Modal) indexador, que pode ser ativado instantaneamente clicando sobre o botão global pertinente no cabeçalho (Header) ou via combinações de macro (`⌘K`).
