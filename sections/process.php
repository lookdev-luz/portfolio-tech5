<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section id="processo" class="section shell" aria-labelledby="process-title">
    <div class="section-heading" data-reveal><p class="eyebrow">Processo</p><h2 id="process-title">Da ideia à experiência.</h2><p>Você acompanha as decisões do projeto do primeiro contato à entrega.</p></div>
    <ol class="process" data-reveal><?php $step = 0; $symbols = ['pin', 'layers', 'layout', 'grid', 'rotate', 'external']; foreach ($config['process'] as $name => $description): ?>
        <li><details name="development-process" data-process <?= $step === 0 ? 'open' : '' ?>><summary><span><?= str_pad((string) ($step + 1), 2, '0', STR_PAD_LEFT) ?> <?= icon($symbols[$step++] ?? 'arrow', 14) ?></span><?= e($name) ?></summary><p><?= e($description) ?></p></details></li>
    <?php endforeach ?></ol>
</section>
