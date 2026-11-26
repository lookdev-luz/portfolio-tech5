import { element, press } from './ui.js';

export function initProjects() {
    const filters = document.querySelector('.project-filters');
    const buttons = [...filters.querySelectorAll('button')];
    const cards = [...document.querySelectorAll('.project')];
    const count = document.querySelector('[data-project-count]');
    const empty = document.querySelector('[data-project-empty]');
    filters.hidden = !cards.length;
    for (const button of buttons) button.addEventListener('click', () => {
        press(buttons, button);
        let visible = 0;
        for (const card of cards) {
            card.hidden = Boolean(button.dataset.filter && button.dataset.filter !== card.dataset.category);
            if (!card.hidden) visible++;
        }
        empty.hidden = visible > 0;
        count.textContent = `${visible} projeto(s) encontrado(s).`;
    });

    const dialog = document.querySelector('#project-dialog');
    if (typeof dialog.showModal !== 'function') return;
    let opener;
    dialog.addEventListener('close', () => {
        if (dialog.dataset.following) delete dialog.dataset.following;
        else opener?.focus();
    });
    dialog.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        dialog.close();
    });
    dialog.addEventListener('click', event => {
        if (!event.target.closest('[data-open-demo]')) return;
        dialog.dataset.following = 'true';
        dialog.close();
    });
    for (const card of cards) {
        const button = card.querySelector('[data-project-open]');
        const detail = card.querySelector('.project-info');
        detail.hidden = true;
        button.hidden = false;
        button.addEventListener('click', () => {
            opener = button;
            dialog.querySelector('h2').textContent = card.querySelector('h3').textContent;
            dialog.querySelector('[data-project-detail]').replaceChildren(detail.querySelector('.project-detail').cloneNode(true));
            dialog.showModal();
        });
    }
}

export function initPreview() {
    const studio = document.querySelector('.preview-studio');
    if (!studio) return;
    const previews = JSON.parse(studio.dataset.previews);
    const toolbar = studio.querySelector('.preview-toolbar');
    const frame = document.querySelector('.preview-frame');
    const sizes = [...toolbar.querySelectorAll('[data-size]')];
    const project = document.querySelector('#preview-project');
    const form = document.querySelector('#preview-form');
    const query = form.querySelector('input');
    const items = frame.querySelector('.preview-items');
    const status = frame.querySelector('[data-preview-feedback]');
    function render(filter = '') {
        const [name, label, title, description, entries, isCatalog] = previews[project.value];
        for (const [key, value] of Object.entries({ Name: name, Label: label, Title: title, Description: description })) {
            frame.querySelector(`[data-preview-${key.toLowerCase()}]`).textContent = value;
        }
        frame.classList.toggle('is-catalog', isCatalog);
        const shown = entries.filter(entry => entry.join(' ').toLocaleLowerCase('pt-BR').includes(filter));
        items.replaceChildren(...shown.map(([heading, value]) => {
            const article = element('article');
            article.append(element('b', heading), element('strong', value));
            return article;
        }));
        status.textContent = filter ? (shown.length ? `${shown.length} resultado(s).` : 'Nenhum resultado nesta prévia.') : '';
    }
    function updateNavigation() {
        frame.querySelector('.preview-nav details').open = frame.clientWidth > 620;
    }
    for (const button of sizes) button.addEventListener('click', () => {
        press(sizes, button);
        frame.dataset.size = button.dataset.size;
        if (!('ResizeObserver' in window)) updateNavigation();
    });
    if ('ResizeObserver' in window) new ResizeObserver(updateNavigation).observe(frame);
    project.addEventListener('change', () => { query.value = ''; render(); });
    form.addEventListener('submit', event => { event.preventDefault(); render(query.value.trim().toLocaleLowerCase('pt-BR')); });
    toolbar.hidden = false;
    form.hidden = false;
    updateNavigation();
}
