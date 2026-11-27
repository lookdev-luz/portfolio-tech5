<?php
declare(strict_types=1);

define('PORTFOLIO_ENTRY', true);
$config = require __DIR__ . '/config/portfolio.php';
require __DIR__ . '/includes/helpers.php';

$theme = 'dark';
$canonical = https_url($config['seo']['canonical']);
$email = filter_var($config['email'], FILTER_VALIDATE_EMAIL) ? $config['email'] : '';
$mailto = $email ? 'mailto:' . str_replace('%40', '@', rawurlencode($email)) : '';
$phone = phone_number($config['phone']);
$whatsapp = phone_number($config['whatsapp']);
$github = https_url($config['github']);
if (!$github && preg_match('/^(?=.{1,39}$)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/D', $config['github_user'])) {
    $github = 'https://github.com/' . $config['github_user'];
}
$linkedin = https_url($config['linkedin']);
$photo = local_image($config['photo']);
$sections = ['sobre' => 'Sobre', 'servicos' => 'Soluções', 'projetos' => 'Projetos', 'laboratorio' => 'Laboratório'];
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; connect-src 'self'");
?>
<!doctype html>
<html lang="pt-BR" data-theme="dark" data-resolved-theme="dark" data-portfolio-model="5">
<?php require __DIR__ . '/includes/head.php'; ?>
<body id="topo">
<a href="#conteudo" class="skip">Ir para o conteúdo</a>
<?php require __DIR__ . '/includes/header.php'; ?>
<main id="conteudo">
<?php foreach (['hero','about','expertise','services','projects','preview','experience-lab','process','project-studio','contact'] as $section) {
    require __DIR__ . '/sections/' . $section . '.php';
} ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
</body>
</html>
