<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section id="sobre" class="section shell" aria-labelledby="about-title">
    <div class="section-heading" data-reveal>
        <p class="eyebrow">Sobre</p>
        <h2 id="about-title">Prazer, <?= e($config['full_name'] ?: $config['name']) ?>.</h2>
    </div>
    <div class="bento" data-reveal>
        <article class="bento-bio">
            <?php if ($photo): ?><img src="<?= e($photo) ?>" alt="<?= e($config['full_name'] ?: $config['name']) ?>" width="150" height="150" loading="lazy" decoding="async"><?php endif ?>
            <span class="tile-icon"><?= icon('brand', 25) ?></span>
            <h3><?= e($config['role']) ?></h3><p><?= e($config['bio']) ?></p>
            <?php if ($github): ?><a class="text-link" href="<?= e($github) ?>" rel="noopener noreferrer">Perfil no GitHub <?= icon('external', 16) ?></a><?php endif ?>
        </article>
        <article class="bento-note"><span class="tile-icon"><?= icon('layers', 23) ?></span><h3>Como eu trabalho</h3><p><?= e($config['approach']) ?></p></article>
        <article class="bento-location"><span class="tile-icon"><?= icon('pin', 22) ?></span><h3><?= e($config['location']) ?></h3><p><?= $config['available'] ? 'Aberto a novos projetos freelance.' : 'Agenda fechada para novos projetos no momento.' ?></p></article>
        <article class="bento-stack"><span class="tile-icon"><?= icon('grid', 21) ?></span><h3>Áreas de interesse</h3><p><?= e($config['interests']) ?></p><div class="tags"><?php foreach ($config['favorites'] as $item): ?><span><?= e($item) ?></span><?php endforeach ?></div></article>
    </div>
</section>
