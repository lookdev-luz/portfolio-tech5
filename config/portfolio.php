<?php

if (!defined('PORTFOLIO_ENTRY')) {
    http_response_code(404);
    exit;
}

return [
    'name' => 'Next Interface',
    'full_name' => 'Bianca Leal (demonstração)',
    'role' => 'Estudante de desenvolvimento de interfaces',
    'headline' => 'Interfaces que fazem sentido.',
    'description' => 'Estudos demonstrativos de interfaces web, componentes e experiências acessíveis.',
    'bio' => 'Estou construindo minha trajetória em desenvolvimento de software com projetos de estudo e demonstrações. Meu foco é transformar necessidades práticas em interfaces claras, fáceis de usar e manter.',
    'photo' => '',
    'approach' => 'Começo pelas tarefas que a interface precisa resolver. A partir delas, defino os fluxos, testo em telas diferentes e organizo o código para facilitar mudanças.',
    'interests' => 'Interfaces responsivas, automação de rotinas e sistemas de gestão.',
    'favorites' => ['PHP', 'JavaScript', 'CSS', 'WebGL'],
    'location' => 'Atendimento remoto',
    'available' => true,
    'email' => '',
    'phone' => '',
    'whatsapp' => '',
    'github_user' => '',
    'github' => '',
    'linkedin' => '',
    'theme' => 'light',
    'visual' => ['quality' => 1.65, 'default_device' => 'notebook'],
    'seo' => [
        'title' => 'Bianca Leal | Estudos em interfaces',
        'canonical' => '',
        'index' => false,
    ],
    'technology' => [
        'Frontend' => [
            'HTML5' => ['Estrutura semântica para conteúdo e formulários.', 'Páginas institucionais e navegação assistiva', 'Sites e landing pages'],
            'CSS3' => ['Layouts flexíveis, temas e animação com movimento reduzido.', 'Interfaces responsivas', 'Portfólios'],
            'JavaScript' => ['Interações e gerenciamento de estado no navegador.', 'Filtros, gráficos e ferramentas interativas', 'Sistemas web'],
        ],
        'Backend' => [
            'PHP' => ['Renderização no servidor e regras de negócio.', 'Páginas dinâmicas', 'Sistemas web'],
            'APIs' => ['Contratos para troca de dados entre sistemas.', 'Integração de catálogos', 'Integrações e manutenção'],
        ],
        'Banco de dados' => [
            'MySQL' => ['Armazenamento relacional para dados de operação.', 'Produtos e movimentações', 'Modelagem de dados'],
            'SQL' => ['Consultas e agregações sobre dados estruturados.', 'Relatórios e indicadores', 'Modelagem de dados'],
            'Modelagem relacional' => ['Identificação de entidades, relações e restrições.', 'Cadastro e histórico', 'Modelagem de dados'],
        ],
        'Ferramentas' => [
            'Git' => ['Histórico verificável de alterações.', 'Revisão e atualização', 'Integrações e manutenção'],
            'GitHub' => ['Colaboração e revisão de mudanças em repositórios.', 'Entrega de código', 'Integrações e manutenção'],
            'VS Code' => ['Edição e depuração de código.', 'Manutenção de interfaces', 'Sistemas web'],
        ],
        'Infraestrutura' => [
            'Linux' => ['Ambiente para executar e diagnosticar serviços web.', 'Hospedagem PHP', 'Integrações e manutenção'],
            'Nginx' => ['Servidor HTTP para estáticos e aplicações PHP-FPM.', 'Sites com HTTPS', 'Sites e landing pages'],
            'Apache' => ['Servidor HTTP comum em hospedagens compartilhadas.', 'Hospedagem convencional', 'Sites e landing pages'],
            'Hospedagem web' => ['Configuração de domínio, HTTPS e ambiente de execução.', 'Publicação de portfólios', 'Portfólios'],
        ],
    ],
    'services' => [
        ['Sites e landing pages', 'Site institucional', 'Uma presença digital que explica seu serviço e facilita o primeiro contato.', 'Informações dispersas e dificuldade para receber pedidos.', 'Apresente seu trabalho com clareza em qualquer tela.', 'Sites institucionais e páginas de campanhas.', 'HTML · CSS · JavaScript', 'layout'],
        ['Sistemas web', 'Sistema web', 'Centralize cadastros, consultas e tarefas recorrentes em uma interface.', 'Controles espalhados em planilhas.', 'Reduza a repetição de trabalho.', 'Painéis administrativos e controle de estoque.', 'PHP · SQL · JavaScript', 'grid'],
        ['Portfólios', 'Portfólio', 'Mostre seu processo, seus projetos e como contratar seu trabalho.', 'Projetos difíceis de encontrar e apresentar.', 'Organize o material que clientes precisam conhecer.', 'Portfólios profissionais e catálogos de trabalhos.', 'HTML · CSS · PHP', 'layers'],
        ['Modelagem de dados', 'Banco de dados', 'Organize informações com relações claras e regras consistentes.', 'Duplicação e divergência entre registros.', 'Facilite consultas e futuras integrações.', 'Cadastro de clientes, vendas e inventário.', 'MySQL · SQL', 'database'],
        ['Integrações e manutenção', 'Manutenção', 'Conecte ferramentas, corrija problemas e evolua seu sistema aos poucos.', 'Troca manual de dados e fluxos que deixaram de funcionar.', 'Preserve os dados e melhore os fluxos mais usados.', 'Automações, backend e ajustes de interfaces.', 'PHP · APIs · Git', 'link'],
    ],
    'projects' => [
        ['orbit', 'Orbit', 'Sistemas', 'Indicadores operacionais em um painel fácil de ler.', 'Acompanhar a operação em diferentes períodos.', 'Consultas espalhadas dificultam identificar mudanças.', ['Filtros de período', 'Indicadores', 'Resumo tabular'], 'JavaScript · SVG', 'dash', '', ''],
        ['stock', 'Forma Estoque', 'Sistemas', 'Cadastro de produtos e movimentação de estoque.', 'Conferir disponibilidade e atualizar quantidades.', 'Contagens manuais dificultam a reposição.', ['Pesquisa', 'Categorias', 'Edição de quantidades'], 'PHP · JavaScript', 'stock', '', ''],
        ['catalog', 'Linha Essencial', 'Web', 'Catálogo digital com seleção de itens.', 'Apresentar uma coleção e organizar uma seleção.', 'A comparação de produtos precisa funcionar no celular.', ['Busca', 'Categorias', 'Resumo de seleção'], 'HTML · CSS · JavaScript', 'catalog', '', ''],
        ['tasks', 'Fluxo', 'Produtividade', 'Tarefas organizadas por etapa.', 'Mostrar o que está pendente, em andamento ou concluído.', 'A lista de pendências muda conforme o trabalho avança.', ['Criação de tarefas', 'Mudança de status', 'Filtros'], 'JavaScript · CSS', 'tasks', '', ''],
    ],
    'previews' => [
        'orbit' => ['Orbit', 'Painel demonstrativo', 'Visão geral da operação', 'Consulte indicadores fictícios e encontre a informação que precisa.', [['Pedidos', '128'], ['Produtos', '34'], ['Entregas', '92']], false],
        'linha' => ['Linha Essencial', 'Catálogo demonstrativo', 'Coleção de escritório', 'Explore itens fictícios pensados para organizar sua mesa.', [['Caderno', 'Papelaria'], ['Bandeja', 'Organização'], ['Luminária', 'Iluminação']], true],
    ],
    'demos' => ['dash' => 'Dashboard', 'stock' => 'Estoque', 'tasks' => 'Tarefas', 'catalog' => 'Catálogo'],
    'process' => [
        'Descoberta' => 'Entendo seu negócio, seu público e o problema que o projeto precisa resolver.',
        'Planejamento' => 'Definimos prioridades e combinamos o que entra na primeira entrega.',
        'Design' => 'Você conhece os fluxos e o conteúdo da interface antes do desenvolvimento.',
        'Desenvolvimento' => 'A interface ganha forma com atenção ao código, ao desempenho e às diferentes telas.',
        'Validação' => 'Revisamos os fluxos juntos e corrigimos os pontos que precisam de ajuste.',
        'Entrega' => 'Você recebe o projeto, instruções de uso e orientações para manter a solução.',
    ],
    'studio' => [
        'Tipo de projeto' => ['Site institucional', 'Landing page', 'Portfólio', 'Sistema web', 'Catálogo digital', 'Banco de dados', 'Manutenção', 'Outro'],
        'Estilo desejado' => ['Minimalista', 'Corporativo', 'Moderno', 'Tecnológico', 'Criativo', 'Ainda não definido'],
        'Funcionalidades' => ['Design responsivo', 'Formulário de contato', 'Integração com WhatsApp', 'Banco de dados', 'Autenticação', 'Painel administrativo', 'Catálogo', 'Integrações externas', 'Outras funcionalidades'],
        'Objetivo' => ['Apresentar uma empresa', 'Captar clientes', 'Organizar informações', 'Automatizar processos', 'Divulgar produtos', 'Criar uma solução personalizada'],
        'Prazo desejado' => ['O mais breve possível', 'Até 30 dias', 'Entre 30 e 60 dias', 'Sem prazo definido'],
    ],
];
