<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<header class="site-header">
<div class="shell header-inner">
    <a href="#topo" class="brand"><span class="brand-icon"><?= icon('brand', 19) ?></span><?= e($config['name']) ?></a>
    <button type="button" class="menu-button" aria-expanded="false" aria-controls="site-navigation" hidden>Menu</button>
    <nav id="site-navigation" aria-label="Navegação principal">
        <?php foreach ($sections as $id => $label): ?><a href="#<?= e($id) ?>"><?= e($label) ?></a><?php endforeach ?>
        <?php if ($github): ?><a href="<?= e($github) ?>" rel="noopener noreferrer">GitHub</a><?php endif ?>

    </nav>
    <div class="header-actions"><a class="button button-dark button-small" href="#contato">Contato <?= icon('external', 15) ?></a></div>
</div>
</header>
