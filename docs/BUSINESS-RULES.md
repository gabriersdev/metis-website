# Regras de Negócio do Metis

## Metadados e Centralização Global (Site Config)
Todas as configurações comportamentais da aplicação devem ser centralizadas e injetadas unicamente a partir de `src/site.config.ts`.
- **Roteamento de Componentes (Feature Flags)**: O engajamento visual dos módulos de blog, portfólio e da própria landing page na barra de navegação global dependem da declaração do estado booleano do dicionário interno `features`. O mesmo mecanismo controla o registro da integração nativa do Astro Sitemap (`features.sitemap`) e mecanismo de busca de conteúdo (`features.search`).
- **Design Tokens**: A chave `theme.accentColor` deve refletir e alinhar-se perfeitamente com a cor definida no arquivo de token css primário (styles), promovendo a consistência dos metadados da aplicação (que dependem desta cor) com a renderização front-end.
- **Persistência Estrutural**: Os feeds de atualização (`rss`) assim como os diretórios de conteúdo renderizados da aplicação sempre serão submetidos ao escopo de build da compilação estática independentemente de estarem ou não sendo apresentados na barra de navegação principal.

## Regras de Camada de Conteúdo (Content Config)
Baseando-se estritamente na engrenagem estrutural das APIs de camadas do Astro 7, as tipagens são validadas na base por **Zod** (`src/content.config.ts`).
As validações impõem a conformidade total dos seguintes metadados nos cabeçalhos (`Frontmatter`) de seus respectivos diretórios:

### Regras do Módulo de Blog (`src/content/blog/`)
Arquivos textuais (`.md` / `.mdx`) da estrutura do blog DEVEM se enquadrar ao seguinte modelo:
- `title` e `description`: Textos (**obrigatórios**).
- `pubDate`: Um formato data-conversível para registrar temporalmente as publicações (**obrigatório**).
- `updatedDate`: Formato variante e de registro de retificação de matéria (opcional).
- `heroImage`: Parâmetro de capa. Deve ser apontado explicitamente de forma relativa visando o diretório de ativos internos `src/assets/` para passar pelos mecanismos de validação e otimização.
- Configurações complementares como `author` (fallback = 'Anonymous'), a tag boleana `draft` para omitir artigos de publicações públicas e flags como `featured` possuem `false` por definição nativa. As nomenclaturas `tags` necessitam obrigatoriamente ser matrizes literais em arrays de strings se declaradas.

### Regras do Módulo de Portfólio (`src/content/projects/`)
Estudos de casos elaborados em Markdown exigem o suprimento dos seguintes comportamentos:
- `title`, `summary` (chamada concisa), `tech` (matriz de strings elencando as ferramentas estruturais), `role` (Cargo ou Função exercida), bem como o referencial `year` numérico, são **estritamente obrigatórios**.
- `cover`: Imagem que funcionará como banner ilustrativo para compor grades no portfólio principal. É **obrigatória** e deve mapear seu endereço em rotas relativas focando em `src/assets/`.
- Elementos como galerias expansíveis `images`, propriedades de estado do portfólio como `featured` e parâmetros complementares com `links` e `duration` se submetem à formatação de dados opcionais sob demanda no modelo.

### Regras da Landing Page (`src/content/landing/`)
Todo escopo de informação visual exibida nas rotas de páginas orientadas a conversão (e-commerce/landing) deriva diretamente da indexação de arquivos de serialização em formatos estáticos (`.json`, `.yaml` ou `.yml`).
- A compilação resgata **sempre e exclusivamente o primeiro registro** processado desta coleção de conteúdo para injetar sobre a estrutura visual do site principal de landing.
- A configuração da árvore nodal requerida como base operacional para qualquer construto de landing é a `hero`.
- **Validadores de Hero**: Este bloco não dispensa `title`, `subtitle`, e uma `description`, acrescido mandatoriamente da parametrização do `cta.primary` para ancorar ao CTA principal da página de aterrissagem. O `cta.secondary` pode ser negligenciado.
- O mapeamento lógico contempla e apoia as coleções de seções `features`, `benefits`, `pricing`, montagem de `gallery`, lista de `testimonials` (de clientes com rating), perguntas frequentes (`faq`) e a macro região orientada a fechamento no bottom-page, definida em `finalCta`.

## Regras Globais e Acessibilidade
- **SEO & Distribuição**: Um recurso de feed baseando-se em especificações canônicas padronizadas (RSS) será dinamicamente provido pela rota `/rss.xml`. Para preservar conformidades técnicas, a tag `<language>` nativa de arquivos RSS Feed incorporará a declaração da linguística-matriz definida no metadado base em `site.config.ts`.
- **Comportamentos Motrizes e Sensoriais**: Atendendo ao rigoroso compliance da acessibilidade (WCAG AA), animações no DOM (Transições css, deslocamentos) ou variações estruturais de textura ("glass/transparency") reverenciam ativamente o perfil e a diretriz estipulada pelo dispositivo matriz, ouvindo os escopos nativos via queries `prefers-reduced-motion` e `prefers-reduced-transparency`.
- Interações visuais possuem tratamentos de foco declarados (Focus States). O site utiliza âncoras de navegação direta via leitores (`skip nav`) e marcos semânticos (`Landmarks`).
