<?php

if (!defined('PORTFOLIO_ENTRY')) {
    http_response_code(404);
    exit;
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function https_url(string $value): string
{
    if (!filter_var($value, FILTER_VALIDATE_URL)) {
        return '';
    }
    $parts = parse_url($value);
    return ($parts['scheme'] ?? '') === 'https' && empty($parts['user']) && empty($parts['pass']) ? $value : '';
}

function local_image(string $value): string
{
    return preg_match('~^assets/images/[A-Za-z0-9_.-]+\.(?:jpg|jpeg|png|webp|avif)$~iD', $value)
        && is_file(dirname(__DIR__) . '/' . $value) ? $value : '';
}

function phone_number(string $value): string
{
    if (!preg_match('/^\+?[0-9 ().-]+$/D', $value)) {
        return '';
    }
    $digits = preg_replace('/\D/', '', $value);
    return preg_match('/^[1-9][0-9]{7,14}$/D', $digits) ? $digits : '';
}

function icon(string $name, int $size = 20): string
{
    $paths = [
        'brand' => '<path d="M4 16V8l5-3 6 4 5-3v10l-5 3-6-4-5 3M9 5v10m6-6v10"/>',
        'arrow' => '<path d="M4 12h15m-6-6 6 6-6 6"/>',
        'up' => '<path d="M5 12l7-7 7 7m-7-7v14"/>',
        'external' => '<path d="M6 18 18 6M8 6h10v10"/>',
        'layout' => '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18m-12 0v11"/>',
        'grid' => '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
        'layers' => '<path d="m12 3 9 5-9 5-9-5 9-5zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
        'database' => '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
        'link' => '<path d="m10 14 4-4m-6 6-2 2a4 4 0 0 1-5-5l4-4a4 4 0 0 1 6 0m2 6a4 4 0 0 0 6 0l4-4a4 4 0 0 0-5-5l-2 2" transform="translate(1 1) scale(.9)"/>',
        'sun' => '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
        'notebook' => '<rect x="4" y="5" width="16" height="12" rx="2"/><path d="M2 20h20"/>',
        'smartphone' => '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 17h2"/>',
        'tablet' => '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M11 17h2"/>',
        'rotate' => '<path d="M4 11a8 8 0 1 1 2 7M4 5v6h6"/>',
        'pin' => '<path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 0 1 14 0z"/><circle cx="12" cy="10" r="2"/>',
    ];
    return '<svg aria-hidden="true" width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">' . ($paths[$name] ?? '') . '</svg>';
}

function theme_picker(string $id, string $value): void
{
    echo '<div class="theme-picker">' . icon('sun', 17) . '<label for="' . e($id) . '" class="sr-only">Tema</label><select id="' . e($id) . '" data-theme-picker>';
    foreach (['light' => 'Claro', 'dark' => 'Escuro', 'auto' => 'Automático'] as $key => $label) {
        echo '<option value="' . $key . '"' . ($value === $key ? ' selected' : '') . '>' . $label . '</option>';
    }
    echo '</select></div>';
}
