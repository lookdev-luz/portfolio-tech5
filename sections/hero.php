<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section class="hero shell" aria-labelledby="hero-title">
    <div class="hero-copy">
        <?php if ($config['available']): ?><p class="availability"><span></span> Disponível para projetos</p><?php endif ?>
        <h1 id="hero-title"><?= e($config['headline']) ?></h1>
        <p class="hero-lead"><?= e($config['description']) ?></p>
        <div class="actions">
            <a class="button button-primary" href="#studio">Vamos criar seu projeto <?= icon('arrow', 18) ?></a>
            <a class="button button-outline" href="#projetos">Explorar trabalhos <?= icon('external', 16) ?></a>
            <?php if ($github): ?><a class="text-link" href="<?= e($github) ?>" rel="noopener noreferrer">GitHub <?= icon('external', 15) ?></a><?php endif ?>
        </div>
        <p class="hero-byline"><?= e($config['full_name'] ?: $config['name']) ?> <span></span> <?= e($config['role']) ?></p>
    </div>
    <figure class="device-card" id="device" data-quality="<?= e((string) $config['visual']['quality']) ?>" data-device="<?= e($config['visual']['default_device']) ?>">
        <figcaption class="device-caption"><span class="device-status"><i></i> Device Experience</span><span>Ambiente interativo</span></figcaption>
        <div class="device-stage">
            <img class="device-fallback" src="assets/images/devices.svg" width="1000" height="510" fetchpriority="high" alt="Notebook, tablet e celular exibindo interfaces demonstrativas">
            <canvas aria-hidden="true"></canvas>
        </div>
        <div class="device-footer">
        <p class="device-footer-hint" data-device-hint>Interfaces demonstrativas em notebook, tablet e celular</p>
        <div class="device-controls" hidden>
            <div class="device-buttons" role="group" aria-label="Dispositivo em destaque">
                <?php foreach (['notebook' => 'Notebook', 'smartphone' => 'Celular', 'tablet' => 'Tablet'] as $key => $label): ?>
                <button type="button" data-device-choice="<?= $key ?>" aria-pressed="false"><?= icon($key, 17) ?><span><?= $label ?></span></button>
                <?php endforeach ?>
            </div>
            <div class="device-options">
                <label class="sr-only" for="screen-choice">Interface demonstrativa</label>
                <select id="screen-choice"><option value="0">Dashboard</option><option value="1">Site</option><option value="2">Catálogo</option></select>
                <button type="button" data-rotate="-1" aria-label="Girar à esquerda">‹</button>
                <button type="button" data-rotate="1" aria-label="Girar à direita">›</button>
                <button type="button" data-device-reset aria-label="Restaurar posição inicial"><?= icon('rotate', 16) ?></button>
            </div>
        </div>
        </div>
        <p class="sr-only" role="status" data-device-feedback></p>
    </figure>
    <div class="hero-foot"><?php if ($config['previews']): ?><a href="#preview">Testar a prévia responsiva <span aria-hidden="true">↗</span></a><?php endif ?><a href="#sobre">Conheça meu trabalho <span aria-hidden="true">↓</span></a></div>
</section>
