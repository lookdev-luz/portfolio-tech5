<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section id="projetos" class="section section-tinted" aria-labelledby="projects-title"><div class="shell">
    <div class="section-heading" data-reveal><p class="eyebrow">Projetos</p><h2 id="projects-title">Interfaces em uso.</h2><p>Projetos demonstrativos para explorar decisões de interface e funcionalidades.</p></div>
    <div class="pill-group project-filters" role="group" aria-label="Filtrar projetos" hidden>
        <button type="button" data-filter="" aria-pressed="true">Todos</button>
        <?php foreach (array_unique(array_column($config['projects'], 2)) as $category): ?><button type="button" data-filter="<?= e($category) ?>" aria-pressed="false"><?= e($category) ?></button><?php endforeach ?>
    </div>
    <p role="status" class="sr-only" data-project-count></p>
    <p data-project-empty <?= $config['projects'] ? 'hidden' : '' ?>>Nenhum projeto nesta categoria.</p>
    <div class="projects-grid">
    <?php foreach ($config['projects'] as $project):
        [$id, $name, $category, $description, $goal, $problem, $features, $stack, $demo, $repo, $url] = $project;
        $type = $project[11] ?? 'Demonstrativo';
        $image = local_image($project[12] ?? '');
        $alt = $project[13] ?? '';
    ?>
        <article class="project" id="projeto-<?= e($id) ?>" data-category="<?= e($category) ?>" data-reveal>
            <?php if ($image): ?><img class="project-image" src="<?= e($image) ?>" alt="<?= e($alt) ?>" width="800" height="450" loading="lazy" decoding="async"><?php else: ?>
            <div class="project-art art-<?= e($demo) ?>" aria-hidden="true">
                <div class="mock-window"><div class="mock-bar"><i></i><i></i><i></i><b><?= e($name) ?></b></div><div class="mock-content"><div class="mock-side"><i></i><i></i><i></i></div><div class="mock-main"><strong><?= e($name) ?></strong><div class="mock-metrics"><i></i><i></i><i></i></div><div class="mock-visual"><?= $demo === 'dash' ? '<svg viewBox="0 0 250 70" preserveAspectRatio="none"><path d="M0 58 23 50 46 53 69 33 92 43 115 23 138 31 161 12 184 19 207 6 230 13 250 2" fill="none" stroke="currentColor" stroke-width="3"/></svg>' : '<i></i><i></i><i></i>' ?></div></div></div></div>
            </div>
            <?php endif ?>
            <div class="project-body"><p class="eyebrow"><?= e($category) ?> · <?= e($type) ?></p><h3><?= e($name) ?></h3><p><?= e($description) ?></p>
                <button class="text-link" type="button" data-project-open aria-haspopup="dialog" hidden>Ver detalhes <?= icon('external', 16) ?></button>
                <details class="project-info"><summary>Ver detalhes</summary>
                    <div class="project-detail"><p><?= e($description) ?></p><dl><dt>Objetivo</dt><dd><?= e($goal) ?></dd><dt>Problema abordado</dt><dd><?= e($problem) ?></dd><dt>Tecnologias</dt><dd><?= e($stack) ?></dd></dl>
                    <h3>Funcionalidades</h3><ul><?php foreach ($features as $feature): ?><li><?= e($feature) ?></li><?php endforeach ?></ul>
                    <div class="actions">
                        <?php if (isset($config['demos'][$demo])): ?><a class="button button-primary" href="#laboratorio" data-open-demo="<?= e($demo) ?>">Abrir demonstração</a><?php endif ?>
                        <?php if (https_url($repo)): ?><a class="text-link" href="<?= e($repo) ?>" rel="noopener noreferrer">GitHub <?= icon('external', 15) ?></a><?php endif ?>
                        <?php if (https_url($url)): ?><a class="text-link" href="<?= e($url) ?>" rel="noopener noreferrer">Site do projeto <?= icon('external', 15) ?></a><?php endif ?>
                    </div></div>
                </details>
            </div>
        </article>
    <?php endforeach ?>
    </div>
    <dialog id="project-dialog" aria-labelledby="project-dialog-title"><div class="dialog-top"><h2 id="project-dialog-title"></h2><form method="dialog"><button autofocus type="submit" class="button button-outline button-small">Fechar</button></form></div><div data-project-detail></div></dialog>
</div></section>
