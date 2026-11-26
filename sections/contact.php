<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section id="contato" class="section shell" aria-labelledby="contact-title">
    <div class="contact-panel" data-reveal>
        <div><p class="eyebrow">Contato<?= $config['available'] ? ' · Disponível para projetos' : '' ?></p><h2 id="contact-title">Seu próximo projeto começa aqui.</h2>
        <p><?= $config['available'] ? 'Conte o que você quer construir ou qual rotina precisa simplificar.' : 'Confira as opções de contato para conversar sobre projetos futuros.' ?></p></div>
        <div class="contact-actions">
            <?php if ($whatsapp): ?><a class="button button-primary" href="https://wa.me/<?= e($whatsapp) ?>" rel="noopener noreferrer">WhatsApp <?= icon('external', 16) ?></a><?php endif ?>
            <?php if ($email): ?><a class="button button-inverse" href="<?= e($mailto) ?>">Enviar e-mail <?= icon('external', 16) ?></a><button class="button button-inverse" type="button" data-copy-email="<?= e($email) ?>" hidden>Copiar e-mail</button><?php endif ?>
            <?php if ($phone): ?><a class="button button-inverse" href="tel:+<?= e($phone) ?>">Ligar <?= icon('external', 16) ?></a><?php endif ?>
            <?php if ($github): ?><a class="button button-inverse" href="<?= e($github) ?>" rel="noopener noreferrer">GitHub <?= icon('external', 16) ?></a><?php endif ?>
            <?php if ($linkedin): ?><a class="button button-inverse" href="<?= e($linkedin) ?>" rel="noopener noreferrer">LinkedIn <?= icon('external', 16) ?></a><?php endif ?>
            <a class="button <?= $whatsapp ? 'button-inverse' : 'button-primary' ?>" href="#studio">Abrir Project Studio <?= icon('arrow', 18) ?></a>
            <?php if (!$whatsapp && !$email && !$phone && !$linkedin): ?><small>Este portfólio é demonstrativo. Você pode montar e copiar um briefing no Project Studio.</small><?php endif ?>
            <p role="status" data-contact-feedback></p>
        </div>
    </div>
</section>
