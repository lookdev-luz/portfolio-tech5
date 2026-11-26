<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<footer class="site-footer"><div class="shell">
<div class="footer-main">
    <div><a href="#topo" class="brand"><span class="brand-icon"><?= icon('brand', 19) ?></span><?= e($config['name']) ?></a><p><?= e($config['role']) ?></p></div>
    <nav aria-label="Navegação do rodapé">
        <?php foreach ($sections as $id => $label): ?><a href="#<?= e($id) ?>"><?= e($label) ?></a><?php endforeach ?>
        <?php if ($github): ?><a href="<?= e($github) ?>" rel="noopener noreferrer">GitHub</a><?php endif ?>
        <?php if ($linkedin): ?><a href="<?= e($linkedin) ?>" rel="noopener noreferrer">LinkedIn</a><?php endif ?>
    </nav>
    <nav aria-label="Serviços"><?php foreach ($config['services'] as $service): ?><a href="#servicos"><?= e($service[0]) ?></a><?php endforeach ?></nav>
    <?php theme_picker('theme-footer', $theme) ?>
</div>
<div class="footer-bottom"><small>© <?= date('Y') ?> <?= e($config['name']) ?></small><a href="#topo">Voltar ao topo <?= icon('up', 16) ?></a></div>
</div></footer>
