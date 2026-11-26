<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section id="tecnologias" class="section section-tinted" aria-labelledby="expertise-title">
<div class="shell">
    <div class="section-heading" data-reveal><p class="eyebrow">Expertise</p><h2 id="expertise-title">Tecnologia que se transforma em soluções.</h2><p>Explore como cada ferramenta contribui para um projeto.</p></div>
    <div class="expertise" data-reveal>
        <?php foreach ($config['technology'] as $category => $tools): if (!$tools) continue; ?>
        <div class="tech-group"><h3><?= e($category) ?></h3>
            <?php foreach ($tools as $tool => $details): if (!$details) continue; ?>
            <details name="technologies" data-exclusive><summary><?= e($tool) ?></summary><div><p><?= e($details[0]) ?></p><dl><dt>Aplicação</dt><dd><?= e($details[1]) ?></dd><dt>Serviço relacionado</dt><dd><?= e($details[2]) ?></dd></dl></div></details>
            <?php endforeach ?>
        </div>
        <?php endforeach ?>
    </div>
</div>
</section>
