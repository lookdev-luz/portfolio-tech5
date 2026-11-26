export function press(buttons, current) {
    for (const button of buttons) button.setAttribute('aria-pressed', String(button === current));
}

export function element(tag, content, className) {
    const node = document.createElement(tag);
    if (content !== undefined) node.textContent = content;
    if (className) node.className = className;
    return node;
}

export async function copy(text, status, label) {
    try {
        await navigator.clipboard.writeText(text);
        status.textContent = label;
    } catch {
        status.textContent = 'Cópia indisponível neste navegador. Selecione e copie o texto manualmente.';
    }
}
