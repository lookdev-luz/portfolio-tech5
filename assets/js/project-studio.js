import { copy, element } from './ui.js';

export function initStudio() {
    const studio = document.querySelector('.studio');
    const form = studio.querySelector('form');
    const concept = studio.querySelector('[data-concept]');
    const title = concept.querySelector('[data-concept-title]');
    const goal = concept.querySelector('[data-concept-goal]');
    const features = concept.querySelector('[data-concept-features]');
    const briefing = studio.querySelector('.briefing');
    const brief = studio.querySelector('[data-brief]');
    const feedback = studio.querySelector('[data-studio-feedback]');
    const type = form.elements.namedItem('Tipo de projeto');
    const email = studio.querySelector('[data-send="email"]');
    const whatsapp = studio.querySelector('[data-send="whatsapp"]');

    function update() {
        const values = new FormData(form);
        const selected = values.get('Tipo de projeto') || '';
        title.textContent = selected || 'Seu projeto';
        goal.textContent = values.get('Objetivo') || 'Escolha as opções para começar.';
        concept.dataset.layout = ['Sistema web', 'Banco de dados', 'Manutenção'].includes(selected) ? 'sistema' :
            ['Site institucional', 'Landing page', 'Portfólio'].includes(selected) ? 'site' : 'catalogo';
        concept.dataset.look = (values.get('Estilo desejado') || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
        features.replaceChildren(...values.getAll('Funcionalidades').map(value => element('span', value)));
        const lines = [...new Set(values.keys())].map(key => {
            const entries = values.getAll(key).map(value => value.trim()).filter(Boolean);
            return entries.length ? `${key}: ${entries.join(', ')}` : '';
        }).filter(Boolean);
        brief.textContent = ['Briefing · Next Interface', ...lines].join('\n');
        const body = encodeURIComponent(brief.textContent);
        if (email) email.href = `${studio.dataset.mailto}?subject=Briefing%20de%20projeto&body=${body}`;
        if (whatsapp) whatsapp.href = `https://wa.me/${studio.dataset.whatsapp}?text=${body}`;
        feedback.textContent = '';
        return lines.length > 0;
    }

    form.addEventListener('input', update);
    form.addEventListener('reset', () => queueMicrotask(() => {
        briefing.hidden = true;
        update();
        feedback.textContent = 'Escolhas restauradas.';
    }));
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!update()) {
            feedback.textContent = 'Selecione uma opção ou descreva sua ideia para montar o briefing.';
            type?.focus();
            return;
        }
        briefing.hidden = false;
        briefing.querySelector('h3').focus();
    });
    studio.querySelector('[data-copy-brief]').addEventListener('click', () => copy(brief.textContent, feedback, 'Resumo copiado.'));
    studio.querySelector('[data-edit-brief]').addEventListener('click', () => type?.focus());
    for (const link of document.querySelectorAll('[data-service]')) link.addEventListener('click', () => {
        if (!type || ![...type.options].some(option => option.value === link.dataset.service)) return;
        type.value = link.dataset.service;
        update();
    });

    const copyEmail = document.querySelector('[data-copy-email]');
    if (copyEmail) {
        const status = document.querySelector('[data-contact-feedback]');
        copyEmail.hidden = false;
        copyEmail.addEventListener('click', () => copy(copyEmail.dataset.copyEmail, status, 'E-mail copiado.'));
    }

    update();
    studio.hidden = false;
}
