<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; } ?>
<section id="studio" class="section section-tinted" aria-labelledby="studio-title"><div class="shell">
    <div class="section-heading" data-reveal><p class="eyebrow">Project Studio</p><h2 id="studio-title">Configure sua ideia.</h2><p>Organize o que você precisa e leve um briefing para a primeira conversa.</p></div>
    <noscript><p>Ative o JavaScript para montar o briefing ou <a href="#contato">consulte os contatos</a>.</p></noscript>
    <div class="studio" data-mailto="<?= e($mailto) ?>" data-whatsapp="<?= e($whatsapp) ?>" hidden>
        <form class="studio-form" autocomplete="off">
            <?php foreach ($config['studio'] as $label => $options): ?>
                <?php if ($label === 'Funcionalidades'): ?>
                <fieldset><legend><?= e($label) ?></legend><div class="checkbox-group">
                    <?php foreach ($options as $option): ?><label><input type="checkbox" name="<?= e($label) ?>" value="<?= e($option) ?>"><span><?= e($option) ?></span></label><?php endforeach ?>
                </div></fieldset>
                <?php else: ?>
                <label><?= e($label) ?><select name="<?= e($label) ?>"><option value="">Selecione</option><?php foreach ($options as $option): ?><option><?= e($option) ?></option><?php endforeach ?></select></label>
                <?php endif ?>
            <?php endforeach ?>
            <details><summary>Adicionar informações opcionais</summary><div class="field-stack">
                <label>Nome <input name="Nome" maxlength="80" autocomplete="off"></label>
                <label>Descrição <textarea name="Descrição" maxlength="600" rows="3"></textarea></label>
                <label>Observações <textarea name="Observações" maxlength="400" rows="2"></textarea></label>
            </div></details>
            <div class="actions"><button class="button button-primary" type="submit">Ver briefing <?= icon('arrow', 17) ?></button><button type="reset" class="button button-outline">Reiniciar</button></div>
        </form>
        <div class="studio-aside">
            <div class="concept"><p class="eyebrow">Prévia conceitual</p><div class="concept-window" data-concept>
                <div class="concept-nav"><i></i><span></span><span></span></div>
                <div class="concept-body"><h3 data-concept-title>Seu projeto</h3><p data-concept-goal>Escolha as opções para começar.</p><div class="tags" data-concept-features></div><div class="concept-shapes"><i></i><i></i><i></i></div></div>
            </div></div>
            <div class="briefing" hidden><h3 tabindex="-1">Resumo do projeto</h3><pre data-brief></pre><div class="actions">
                <button type="button" class="button button-primary button-small" data-copy-brief>Copiar resumo</button>
                <button type="button" class="button button-outline button-small" data-edit-brief>Editar escolhas</button>
                <?php if ($whatsapp): ?><a class="button button-outline button-small" data-send="whatsapp" rel="noopener noreferrer">WhatsApp</a><?php endif ?>
                <?php if ($email): ?><a class="button button-outline button-small" data-send="email">Abrir e-mail</a><?php endif ?>
            </div></div>
            <p role="status" data-studio-feedback></p>
        </div>
    </div>
</div></section>
