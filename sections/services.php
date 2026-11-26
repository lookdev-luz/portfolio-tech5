<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section id="servicos" class="section shell" aria-labelledby="services-title">
    <div class="section-heading" data-reveal><p class="eyebrow">Soluções</p><h2 id="services-title">O que podemos construir.</h2><p>Da primeira página do seu negócio à ferramenta que organiza sua operação.</p></div>
    <div class="services-grid">
    <?php foreach ($config['services'] as [$name, $type, $description, $problem, $benefit, $application, $stack, $symbol]): ?>
    <article class="service" data-reveal>
        <span class="tile-icon"><?= icon($symbol, 25) ?></span><h3><?= e($name) ?></h3><p><?= e($description) ?></p>
        <details><summary>O que a solução cobre</summary><dl><dt>Problema</dt><dd><?= e($problem) ?></dd><dt>Benefício</dt><dd><?= e($benefit) ?></dd><dt>Aplicação</dt><dd><?= e($application) ?></dd><dt>Tecnologias</dt><dd><?= e($stack) ?></dd></dl></details>
        <a class="text-link" href="#studio" data-service="<?= e($type) ?>">Solicitar orçamento <?= icon('external', 16) ?></a>
    </article>
    <?php endforeach ?>
    </div>
</section>
