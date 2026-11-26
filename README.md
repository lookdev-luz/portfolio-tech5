# Next Interface

Portfólio em português brasileiro para apresentar serviços de desenvolvimento web independente. Inclui projetos fictícios identificados, demonstrações que funcionam no navegador e um configurador de briefing para a primeira conversa comercial.

O site usa PHP puro, HTML5, CSS, JavaScript nativo, SVG, Canvas 2D e WebGL 2 com GLSL ES 3.00. O servidor precisa de PHP 8.1 ou superior com a extensão Filter habilitada, padrão nas instalações convencionais. A execução dispensa banco de dados, compilação, gerenciadores de dependências e serviços externos. A interface usa fontes do sistema.

## Executar localmente

Use o servidor embutido na raiz do checkout.

```sh
php -S 127.0.0.1:8000
```

Abra `http://127.0.0.1:8000/` no navegador. O servidor embutido é destinado a desenvolvimento. Use PHP-FPM e HTTPS em produção.

## Estrutura

```text
index.php          Entrada HTTP, configuração e montagem da página
config/            Conteúdo, contatos, preferências visuais e SEO
includes/          Escape, validação, metadados, header e footer
sections/          Hero, sobre, tecnologias, serviços, projetos, prévia,
                   laboratório, processo, configurador e contato
assets/css/        Estilos base, temas, layout, componentes e responsividade
assets/js/         Comportamentos em módulos JavaScript e tema inicial
assets/js/webgl/   Matrizes, geometrias, shaders, texturas, renderizador e cena
assets/images/     Ilustração SVG alternativa e espaço para fotos de projetos
assets/icons/      Marca do site em SVG
robots.txt         Permite rastrear a página para ler a diretiva de indexação
AUDITORIA.md       Evidências, notas e limites da validação
```

## Personalização

Edite [config/portfolio.php](config/portfolio.php). As chaves existentes e os exemplos ao lado delas indicam o formato esperado. Mantenha textos em UTF-8 e execute a verificação de sintaxe após editar.

- **Identidade.** Preencha `full_name`, `name`, `role`, `headline`, `description` e `bio`. Ajuste `approach`, `interests`, `favorites`, `location` e `available` de acordo com seu trabalho. A foto é opcional. Salve a imagem em `assets/images` e indique o caminho, por exemplo `assets/images/retrato.webp`.
- **Contatos.** Preencha `email` com seu endereço profissional e `phone` e `whatsapp` com DDI, DDD e número. O PHP remove pontuação e exige de 8 a 15 dígitos, com início diferente de zero. Faça uma conferência manual dos números. Campos vazios ou inválidos deixam seus controles ocultos.
- **Perfis.** Configure `github_user` ou uma URL HTTPS em `github`. O endereço explícito, se válido, tem prioridade. Preencha `linkedin` quando houver um perfil profissional para divulgar.
- **Tecnologias.** Em `technology`, adicione uma entrada na categoria adequada com descrição, aplicação prática e serviço relacionado. Remova a entrada ou use um array vazio para desabilitá-la.
- **Serviços.** Em `services`, cada linha contém nome, opção correspondente do Project Studio, descrição, problema, benefício, exemplo, tecnologias e ícone. Use uma opção existente de `Tipo de projeto` para preenchimento ao clicar em “Solicitar orçamento”. Remova a linha para ocultar um serviço.
- **Projetos.** Em `projects`, informe identificador, nome, categoria, descrição, objetivo, problema, lista de funcionalidades, tecnologias, chave de uma demonstração e URLs opcionais de código e projeto. Pode acrescentar tipo (pessoal, acadêmico ou demonstrativo), caminho da imagem local e texto alternativo nessa ordem. Os filtros usam as categorias cadastradas. Substitua os exemplos por trabalhos que você pode publicar.
- **Prévia e laboratório.** Em `previews`, cada exemplo usa nome, identificação demonstrativa, título, descrição, lista de pares rótulo/valor e um booleano para navegação horizontal. As chaves disponíveis em `demos` são `dash`, `stock`, `tasks` e `catalog`. Ajuste os rótulos ou remova entradas. Os dados fictícios vivem em `assets/js/experience-lab.js`.
- **Processo e briefing.** Ajuste os textos em `process` e as listas de opções em `studio`. Preserve os nomes das opções de tipo e estilo usadas para definir os layouts conceituais ou ajuste o mapeamento em `assets/js/project-studio.js`.
- **Aparência.** Altere as propriedades CSS em `assets/css/themes.css`. O campo `theme` aceita `light`, `dark` ou `auto`. `visual.default_device` aceita `notebook`, `tablet` e `smartphone`. `visual.quality` controla o limite de densidade da renderização, com limites adicionais por largura de tela.
- **SEO.** Configure `seo.title`, `seo.canonical` com o endereço HTTPS definitivo e `description` para a meta description. Preencha o nome completo para emitir JSON-LD do tipo `Person`. Mantenha `seo.index` em `false` durante a personalização. Após revisar dados e domínio, altere para `true`. A diretiva `noindex` intencional reduz a nota automatizada de SEO enquanto estiver ativa. O `robots.txt` permite ler essa diretiva.

## Experiências interativas

**Device Experience.** Um único contexto WebGL 2 desenha notebook, tablet e smartphone com geometrias autorais geradas por vértices e índices. As matrizes posicionam os dispositivos e aplicam perspectiva. O vertex shader transforma a geometria. O fragment shader combina cor, iluminação, reflexo e mapa de tela. Canvas 2D desenha as interfaces usadas como texturas. Controle rotação, dispositivo e interface com os botões, mouse ou toque. A cena redesenha sob demanda, limita a resolução, para fora da área visível e recria os recursos após restauração do contexto. Se WebGL ou os shaders falharem, a área preserva a ilustração SVG.

**Responsive Preview Studio.** O seletor altera a largura disponível de um layout HTML real. Consultas de contêiner reorganizam navegação, cartões e formulário. A busca atua apenas nos dados demonstrativos. Os exemplos são locais.

**Experience Lab.** O dashboard troca períodos e formas do gráfico. O estoque permite busca, cadastro, ajuste e remoção. O quadro de tarefas oferece adição, filtros, status e remoção. O catálogo monta uma seleção com quantidades. Os dados ficam em memória e podem ser restaurados no botão “Restaurar”.

**Project Studio.** O formulário atualiza uma prévia conceitual e monta um resumo copiável. Com contatos válidos, os links abrem WhatsApp ou o aplicativo de e-mail após uma ação explícita. O navegador não envia os dados do formulário ao servidor. O site não apresenta preços nem confirma prazos. Em HTTP fora de loopback, o navegador pode limitar a cópia automática, mas o resumo continua selecionável.

Com JavaScript desativado, navegação, conteúdo, projetos em elementos expansíveis, contato configurado e ilustração permanecem disponíveis. Apenas a preferência de tema pode ser guardada em `localStorage`.

## Verificação

```sh
find . -name '*.php' -print0 | xargs -0 -n 1 php -l
curl -I http://127.0.0.1:8000/
curl -I http://127.0.0.1:8000/assets/js/main.js
```

No navegador, percorra o menu por teclado, teste temas e recarregamento, filtre projetos, feche um modal com Escape, altere as dimensões da prévia e execute as quatro demonstrações. Teste valores inválidos e “Restaurar”. Gere e copie um briefing com acentos e caracteres especiais. Teste sem JavaScript e sem WebGL, além da versão mobile a partir de 320 px. Em ambiente de testes, a extensão opcional `WEBGL_lose_context` permite verificar recuperação da cena.

## Publicação

### Ubuntu com Nginx, PHP-FPM e HTTPS

Use o document root `/var/www/portfolio-tech5`. O trecho abaixo é uma referência para as localizações do virtual host. Use a versão de PHP e o socket do pool do domínio na sua instalação, inclua o arquivo de MIME do Nginx na configuração HTTP e mantenha `display_errors=Off` e `expose_php=Off` na configuração de produção.

```nginx
root /var/www/portfolio-tech5;
index index.php;

location ~ ^/(config|includes|sections)(/|$) { return 404; }
location ~ /\. { return 404; }
location ~* \.(?:md|log|bak|pem|key|zip|gz)$ { return 404; }

location = /index.php {
    try_files /index.php =404;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root/index.php;
    fastcgi_pass unix:/run/php/php8.4-fpm.sock;
}

location ~* \.php(?:/|$) { return 404; }
location /assets/ { try_files $uri =404; }
location = /robots.txt { try_files $uri =404; }
location / { try_files $uri $uri/ =404; }
```

No ambiente sob sua administração, confira a sintaxe com `nginx -t` antes de aplicar alterações. Use Certbot com o domínio já apontado e configure o redirecionamento de HTTP para HTTPS. Verifique a renovação e o cabeçalho de conteúdo dos módulos JavaScript, esperado como `application/javascript` ou `text/javascript`. Compressão gzip para HTML, CSS, JS e SVG reduz a transferência.

### HestiaCP

Adicione o domínio no painel, selecione um backend PHP compatível e publique em `/home/USUARIO/web/DOMINIO/public_html/`. Ative SSL e Let’s Encrypt no painel após conferir DNS. Em configurações com Nginx como proxy do Apache, aplique os bloqueios no frontend e no servidor que interpreta PHP. Use um template personalizado do painel quando necessário, para que uma reconstrução do domínio preserve as regras. O projeto não depende de `.htaccess` nem de endpoints adicionais.

Verifique no domínio que `/` e os estáticos retornam 200 e que `/config/portfolio.php`, `/includes/head.php`, `/sections/hero.php`, `/.git/HEAD` e PHP diferente de `index.php` retornam 403 ou 404. Não publique `.git`, backups, relatórios, configurações privadas ou arquivos de testes. Mantenha permissões de leitura para o servidor e de escrita apenas para o usuário responsável pela publicação.

### Atualizações com Git

Mantenha o checkout Git fora do document root. Registre suas personalizações em commits próprios e mantenha cópia externa do conteúdo e das imagens. Antes de atualizar o template, revise a diferença em `config/portfolio.php`, aplique a atualização em uma branch de revisão e reaplique seus campos e projetos, caso haja conflito. Valide a nova versão localmente e publique somente os arquivos necessários para execução. Não salve segredos em arquivos PHP públicos nem no histórico do repositório.

## Checklist de produção

- [ ] Revisar nome, cargo, biografia, foto, disponibilidade e áreas de interesse.
- [ ] Configurar e testar e-mail, telefone, WhatsApp, GitHub e LinkedIn, conforme aplicável.
- [ ] Revisar tecnologias e serviços. Trocar os projetos fictícios por trabalhos publicáveis ou manter sua identificação.
- [ ] Conferir Device Experience, prévia responsiva, laboratório, Project Studio e modo sem WebGL.
- [ ] Testar temas, navegação por teclado e interfaces no celular.
- [ ] Revisar título, descrição, canonical, JSON-LD e domínio.
- [ ] Testar HTTPS, redirecionamento, cabeçalhos, MIME e bloqueio a diretórios privados.
- [ ] Habilitar indexação somente após concluir a personalização.
