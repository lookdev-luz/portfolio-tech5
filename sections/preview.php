<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; }
if (!$config['previews']) return;
[$previewName, $previewLabel, $previewTitle, $previewDescription, $previewItems, $previewCatalog] = reset($config['previews']);
?>
<section id="preview" class="section shell" aria-labelledby="preview-title">
    <div class="section-heading" data-reveal><p class="eyebrow">Responsive Preview Studio</p><h2 id="preview-title">A interface muda com a tela.</h2><p>Experimente como a navegação e o conteúdo se reorganizam em cada dispositivo.</p></div>
    <ol class="responsive-story" aria-label="Como a interface se adapta">
        <li data-reveal data-story="desktop"><div class="story-art" aria-hidden="true"><i></i><i></i><i></i></div><h3>Visão ampla</h3><p>No desktop, a navegação lateral ocupa sua própria coluna e deixa os indicadores à vista.</p></li>
        <li data-reveal data-story="tablet"><div class="story-art" aria-hidden="true"><i></i><i></i><i></i></div><h3>Menu compacto</h3><p>No tablet, o menu vai para o topo para liberar espaço para a busca e os resultados.</p></li>
        <li data-reveal data-story="mobile"><div class="story-art" aria-hidden="true"><i></i><i></i><i></i></div><h3>Leitura em sequência</h3><p>No celular, os cartões passam para uma coluna e os controles acompanham a largura disponível.</p></li>
    </ol>
    <div class="preview-studio" data-reveal data-previews="<?= e(json_encode($config['previews'], JSON_INVALID_UTF8_SUBSTITUTE | JSON_UNESCAPED_UNICODE)) ?>">
        <div class="preview-toolbar" hidden>
            <div class="pill-group" role="group" aria-label="Formato da prévia">
                <?php foreach (['desktop' => 'Desktop', 'notebook' => 'Notebook', 'tablet' => 'Tablet', 'mobile' => 'Celular'] as $key => $label): ?>
                <button type="button" data-size="<?= $key ?>" aria-pressed="<?= $key === 'desktop' ? 'true' : 'false' ?>"><?= $label ?></button>
                <?php endforeach ?>
            </div>
            <label>Projeto <select id="preview-project"><?php foreach ($config['previews'] as $key => $preview): ?><option value="<?= e($key) ?>"><?= e($preview[0]) ?></option><?php endforeach ?></select></label>
        </div>
        <div class="preview-stage">
            <div class="preview-frame<?= $previewCatalog ? ' is-catalog' : '' ?>" data-size="desktop">
                <div class="preview-chrome"><span></span><span></span><span></span><small>Prévia demonstrativa</small></div>
                <div class="preview-screen">
                    <div class="preview-nav"><strong data-preview-name><?= e($previewName) ?></strong><details><summary>Navegação</summary><nav aria-label="Navegação da prévia"><a href="#preview-content">Visão geral</a><a href="#preview-form">Pesquisa</a></nav></details></div>
                    <div class="preview-content" id="preview-content"><div class="preview-intro"><p class="eyebrow" data-preview-label><?= e($previewLabel) ?></p><h3 data-preview-title><?= e($previewTitle) ?></h3><p data-preview-description><?= e($previewDescription) ?></p></div>
                    <form id="preview-form" hidden><label for="preview-query">Pesquisar na prévia</label><div class="input-row"><input id="preview-query" type="search" placeholder="Digite um termo" maxlength="60"><button class="button button-primary button-small" type="submit">Buscar</button></div></form>
                    <div class="preview-items"><?php foreach ($previewItems as [$title, $value]): ?><article><b><?= e($title) ?></b><strong><?= e($value) ?></strong></article><?php endforeach ?></div><p data-preview-feedback role="status"></p></div>
                </div>
            </div>
        </div>
    </div>
</section>
