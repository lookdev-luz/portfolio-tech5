# Auditoria de entrega

## Resultados

- **PHP 8.4.28.** Os 16 arquivos PHP passaram em `php -l`. A página serviu conteúdo no servidor de desenvolvimento e em Nginx 1.26.3 com PHP-FPM via socket local.
- **Chromium 156 com Playwright.** Foram exercitados os fluxos de navegação, menu mobile, abertura e fechamento de diálogos, foco ao fechar, seleção de projeto, Responsive Preview Studio, quatro demonstrações, briefing e cópia. As entradas de teste incluíram acentos, marcação tratada como texto, quantidades inválidas e pesquisas sem resultados.
- **Responsividade.** O teste de largura percorreu 320, 375, 390, 768, 1024, 1440, 1920 e 2560 px nos três modos de tema. A auditoria do Nginx também verificou se o CTA do cabeçalho permanecia dentro da viewport. Houve inspeção visual em desktop e 320 px. A mudança de orientação e um gesto horizontal na cena foram exercitados com emulação de toque.
- **Acessibilidade.** axe-core executou as regras aplicáveis de WCAG 2.x A e AA em claro e escuro. Em cada tema, 29 regras passaram e nenhuma violação foi detectada. A regra de contraste exigiu revisão de três pontos sobre a cena ou junto a ícones. O texto da legenda, calculado contra a cor mais clara do fundo da cena, tem contraste aproximado de 6,75:1. O ícone de seta ao lado de “Conheça meu trabalho” é decorativo. A auditoria automatizada não certifica conformidade WCAG.
- **Gráficos.** WebGL 2 compilou e vinculou o programa e desenhou com `gl.getError()` igual a zero. Foi usada renderização por software ANGLE/SwiftShader. A cena reagiu aos controles e suspendeu as chamadas de desenho em repouso e fora da área visível. Caiu para SVG em indisponibilidade e falha de shader e voltou a desenhar após perda e restauração simuladas com `WEBGL_lose_context`.
- **HTTP.** Em Nginx, a página e os estáticos responderam com 200. `config/`, `includes/`, `sections/`, `.git`, o README e outro caminho PHP responderam com 404 nas requisições testadas. A compressão gzip e os tipos MIME dos módulos, CSS e SVG foram conferidos.
- **Privacidade e contatos.** O armazenamento local continha apenas o tema após o briefing. Uma cópia de teste com contatos fictícios validou a cópia de e-mail, a composição de links para telefone, WhatsApp e e-mail, os dados estruturados e a mudança da diretiva de indexação. A validação montou URLs sem abrir serviços externos ou enviar mensagens.

### Lighthouse

Lighthouse 13.6.0, perfil móvel, Nginx e PHP-FPM locais, com gzip. Os valores são de laboratório e podem variar entre execuções.

| Categoria | Resultado |
| --- | ---: |
| Desempenho | 98/100 |
| Acessibilidade | 100/100 |
| Boas práticas | 100/100 |
| SEO | 66/100 |

Na execução final, FCP foi de 1,05 s, LCP de 1,40 s, TBT de 156 ms e CLS de 0. O Lighthouse contabilizou 48 KiB de transferência. A auditoria de SEO apontou a diretiva `noindex,follow` como a única falha. Ela é intencional enquanto os dados forem demonstrativos. Uma cópia local configurada para indexação alcançou 100/100 em SEO.

## Avaliação por critério

As notas de projeto de 0 a 10 abaixo são estimativas fundamentadas na revisão, com observações sobre os itens abaixo de 9. O repositório começou com apenas o README. A coluna de nota anterior fica sem valor quando não houve avaliação equivalente antes do refinamento.

| Critério | Nota anterior | Problema ou limite | Correção ou implementação | Nota final | Evidência ou método |
| --- | ---: | --- | --- | ---: | --- |
| Arquitetura | — | Conteúdo e interface precisavam de pontos de manutenção claros | Entrada única, configuração PHP e módulos por experiência | 9 | Revisão da estrutura |
| PHP | — | Acesso direto e valores opcionais | Bloqueios por entrada, escape e validação de links | 9 | Lint, requests e configuração de teste |
| HTML | — | Dependência possível de scripts para projetos | Conteúdo inicial renderizado e detalhes nativos como alternativa | 9 | Chromium com JS desativado |
| CSS | — | Descoberta em cadeia dos estilos | Folhas separadas por camadas e carregadas em paralelo | 9 | Revisão do CSS e Lighthouse |
| JavaScript | — | Estado e interfaces recriadas durante operações | Módulos por função, DOM seguro e manutenção de foco | 9 | Sintaxe e Playwright |
| Identidade visual | — | Avaliação depende de percepção visual | Marca, dispositivos e interfaces autorais | 9 | Revisão visual, avaliação subjetiva |
| Design system | — | Cores de mockups podiam divergir em modo automático | Tokens para tipos de superfície, cor, foco e movimento | 9 | Revisão dos tokens e temas |
| Tema claro | — | Contraste de texto sobre cores claras | Texto auxiliar e azul ajustados, inspeção em desktop | 9 | axe-core e Chromium |
| Tema escuro | — | Modo automático precisava atualizar a cena | Tokens escuros e atualização das texturas | 9 | axe-core, emulação do sistema e Chromium |
| Responsividade | — | CTA do cabeçalho apertado em 320 px | Controles compactados, grade ajustada e câmera adaptada | 9 | Oito larguras e inspeção visual |
| Acessibilidade | — | Cobertura parcial de tecnologias assistivas | Foco visível, rótulos, teclado, diálogos nativos e redução de movimento | 9 | axe-core e testes de foco. Leitor de tela pendente |
| Desempenho | — | CLS inicial de 0,116 e TBT variável | Espaço reservado para controles, tema antecipado e gzip em Nginx | 9 | Medições de 93 a 98 no Nginx. CLS final 0 |
| Segurança | — | Templates e arquivos de trabalho no checkout | CSP, escape, validação de caminhos de imagem e bloqueios HTTP | 9 | Revisão estática, entradas textuais e respostas locais |
| SEO | — | Diretiva de demonstração limita a medição | Metadados PHP, canonical, JSON-LD, Open Graph, favicon e controle de indexação | 8 | Lighthouse 66 com `noindex` e 100 na cópia indexável |
| Conversão comercial | — | Contato direto depende dos dados do proprietário | CTA direto quando configurado e orçamento com serviço pré-selecionado | 8 | Fluxos verificados com dados fictícios. Sem medição de conversão real |
| Manutenibilidade | — | Comportamentos e conteúdo misturados seriam difíceis de alterar | Renderização, estado, estilos e cena em arquivos específicos | 9 | Revisão de código |
| Facilidade de personalização | — | Conteúdo de prévia duplicado entre PHP e JS | Prévia, textos e opções comerciais centralizados | 9 | Configuração alternativa e README |
| WebGL | — | Perda do contexto e energia com renderização contínua | Recursos reconstruídos, limitação de resolução e renderização sob demanda | 9 | SwiftShader, perda e restauração de contexto |
| Shaders GLSL | — | Falhas de compilação poderiam bloquear o hero | Verificação de compilação e vínculo, liberação e SVG alternativo | 9 | Programa válido e compilação falha simulada |
| Device Experience | — | A cena podia encostar nas bordas em celular | Câmera adaptativa e botões HTML para operações equivalentes | 9 | Capturas, mudanças de interface e rotação via controles |
| Scroll-driven storytelling | — | Aplicação de movimento precisa ser discreta | Narrativa de três formatos com revelação contextual | 8 | Revisão de implementação e renderização. Animação progressiva curta |
| Bento Grid | — | Apresentação precisava de hierarquia | Quatro áreas com dimensões e funções distintas | 9 | Revisão visual |
| Responsive Preview Studio | — | Encolher um mockup esconderia diferenças de layout | Contêiner ajustável com layout, menu e busca reais | 9 | Seleção de formato, busca e estado vazio |
| Experience Lab | — | Persistência indevida de dados fictícios | Estado em memória e restauração por demo | 9 | Quatro fluxos no Chromium |
| Dashboard demonstrativo | — | Gráfico isolado não expõe dados textuais | Gráfico de linha ou barras, indicadores e tabela | 9 | Período, gráfico e total atualizados |
| Gerenciamento de estoque | — | Valor inválido podia voltar à quantidade antiga | Restauração da última quantidade válida | 9 | Cadastro, busca, alteração, remoção e reset |
| Gerenciador de tarefas | — | Ações poderiam depender de arrastar | Seleção de status, filtros e controles clicáveis | 9 | Cadastro, status, filtro e remoção |
| Catálogo digital | — | Escolhas precisavam ser claras após filtrar | Quantidades e resumo local preservados entre filtros | 9 | Seleção, quantidade, categoria e reset |
| Project Studio | — | Campos opcionais e envio exigem controle explícito | Prévia HTML, briefing editável, cópia e links condicionais | 9 | Fluxos principal e com contatos fictícios |
| Fallbacks | — | Conteúdo poderia sumir sem WebGL ou JavaScript | SVG, HTML inicial, detalhes nativos e preferência em sessão | 9 | Sem JS, sem WebGL, shader falho e armazenamento bloqueado |
| Compatibilidade entre navegadores | — | Validação concentrada em Chromium | APIs nativas e detecção de capacidade nos pontos necessários | 8 | Revisão estática. Firefox e Safari sem teste executado |
| Compatibilidade com Nginx | — | MIME e acesso a arquivos internos | Entrada única em PHP-FPM e regras de localização | 9 | `nginx -t` e requisições locais |
| Compatibilidade com HestiaCP | — | Topologia depende do template da hospedagem | Documentação para frontend e backend PHP | 8 | Revisão estática. Sem instância HestiaCP |
| Documentação | — | README inicial sem instruções de operação | Execução, personalização, publicação e checklist | 9 | Revisão dos comandos e caminhos |

## Limites

Os testes foram locais. HestiaCP, Certbot, HTTPS no domínio definitivo, navegadores Firefox e Safari, zoom nativo de 200%, interação física por toque e tecnologias assistivas não passaram por testes executados. A abertura de outra aba no Chromium headless manteve a página com visibilidade `visible`, por isso a suspensão em aba realmente oculta ficou verificada apenas por inspeção de código. Não foram medidos FPS em hardware, uso de GPU nem consumo de memória em dispositivos reais.

A configuração padrão omite dados pessoais e canais comerciais. Para publicação profissional, revise os campos do proprietário, teste seus canais e confirme a configuração do servidor e do domínio antes de habilitar a indexação. Nenhum deploy remoto, ajuste de VPS ou push foi executado.
