<?php if (!defined('PORTFOLIO_ENTRY')) { http_response_code(404); exit; }
$person = array_filter([
    '@context' => 'https://schema.org',
    '@type' => 'Person',
    'name' => $config['full_name'] ?: '',
    'jobTitle' => $config['role'],
    'url' => $canonical,
    'sameAs' => array_values(array_filter([$github, $linkedin])),
]);
?>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($config['seo']['title']) ?></title>
<meta name="description" content="<?= e($config['description']) ?>">
<meta name="robots" content="<?= $config['seo']['index'] ? 'index,follow' : 'noindex,follow' ?>">
<?php if ($canonical): ?><link rel="canonical" href="<?= e($canonical) ?>"><?php endif ?>
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="<?= e($config['seo']['title']) ?>">
<meta property="og:description" content="<?= e($config['description']) ?>">
<?php if ($canonical): ?><meta property="og:url" content="<?= e($canonical) ?>"><?php endif ?>
<?php if (isset($person['name'])): ?>
<script type="application/ld+json"><?= json_encode($person, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE) ?></script>
<?php endif ?>
<script src="assets/js/theme-control.js"></script>
<link rel="icon" href="assets/icons/mark.svg" type="image/svg+xml">
<?php foreach (['main', 'themes', 'layout', 'components', 'responsive'] as $sheet): ?><link rel="stylesheet" href="assets/css/<?= $sheet ?>.css">
<?php endforeach ?>
<link rel="stylesheet" href="assets/css/theme-control.css">
<script type="module" src="assets/js/main.js"></script>
</head>
