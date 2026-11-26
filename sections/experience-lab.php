<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section id="laboratorio" class="section section-tinted" aria-labelledby="lab-title"><div class="shell">
    <div class="section-heading" data-reveal><p class="eyebrow">Experience Lab</p><h2 id="lab-title">Experimente na prática.</h2><p>Teste pequenas aplicações com dados fictícios. As mudanças duram apenas até recarregar a página.</p></div>
    <?php if (!$config['demos']): ?><p>Nenhuma demonstração disponível no momento.</p><?php endif ?>
    <div class="lab" hidden>
        <div class="lab-toolbar"><div class="pill-group" role="group" aria-label="Demonstração ativa">
        <?php foreach ($config['demos'] as $key => $label): ?><button type="button" data-demo="<?= e($key) ?>" aria-pressed="false"><?= e($label) ?></button><?php endforeach ?>
        </div><button class="button button-outline button-small" type="button" data-lab-reset><?= icon('rotate', 16) ?> Restaurar</button></div>
        <div class="lab-app"></div><p class="lab-feedback" role="status"></p>
    </div>
    <noscript><p>Ative o JavaScript para explorar as demonstrações de indicadores, estoque, tarefas e catálogo.</p></noscript>
</div></section>
