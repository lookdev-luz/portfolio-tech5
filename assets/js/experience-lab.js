import { element, press } from './ui.js';

const demoData = {
    dash: { period: '7 dias', chart: 'Linha' },
    stock: { query: '', category: 'Todas', next: 4, items: [
        { id: 1, name: 'Caderno pontilhado', category: 'Papelaria', quantity: 24 },
        { id: 2, name: 'Bandeja modular', category: 'Organização', quantity: 12 },
        { id: 3, name: 'Luminária de mesa', category: 'Iluminação', quantity: 8 },
    ] },
    tasks: { filter: 'Todas', next: 4, items: [
        { id: 1, name: 'Revisar conteúdo da página', state: 'Pendente' },
        { id: 2, name: 'Testar navegação no celular', state: 'Em andamento' },
        { id: 3, name: 'Organizar referências', state: 'Concluída' },
    ] },
    catalog: { query: '', category: 'Todas', selection: {} },
};

const states = ['Pendente', 'Em andamento', 'Concluída'];
const categories = ['Papelaria', 'Organização', 'Iluminação'];
const catalog = [...demoData.stock.items, { id: 4, name: 'Bloco semanal', category: 'Papelaria' }];
const series = { '7 dias': [28, 35, 31, 56, 45, 68, 62], '30 dias': [52, 63, 58, 71, 85, 93, 108], '90 dias': [92, 104, 112, 138, 128, 154, 176] };
const normalize = value => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR');
const clone = value => JSON.parse(JSON.stringify(value));

function button(text, onClick, label = '') {
    const control = element('button', text, 'button button-outline button-small');
    control.type = 'button';
    if (label) control.setAttribute('aria-label', label);
    control.addEventListener('click', onClick);
    return control;
}

function input(type, value = '') {
    const control = document.createElement('input');
    control.type = type;
    control.value = value;
    return control;
}

function labeled(label, control) {
    const wrapper = element('label', label);
    wrapper.append(control);
    return wrapper;
}

function select(values, current, change) {
    const control = document.createElement('select');
    for (const value of values) control.add(new Option(value, value, false, value === current));
    if (change) control.addEventListener('change', () => change(control.value));
    return control;
}

function metrics(entries) {
    const panel = element('div', undefined, 'lab-metrics');
    for (const [label, value] of entries) {
        const card = element('article');
        card.append(element('span', label), element('strong', String(value)));
        panel.append(card);
    }
    return panel;
}

function table(caption, headings, rows) {
    const wrapper = element('div', undefined, 'lab-table-wrap');
    const node = element('table', undefined, 'lab-table');
    node.createCaption().textContent = caption;
    const row = node.createTHead().insertRow();
    for (const heading of headings) {
        const cell = element('th', heading);
        cell.scope = 'col';
        row.append(cell);
    }
    const body = node.createTBody();
    for (const values of rows) {
        const line = body.insertRow();
        for (const value of values) line.insertCell().append(value instanceof Node ? value : String(value));
    }
    wrapper.append(node);
    return wrapper;
}

function heading(title, description) {
    const header = element('header');
    header.append(element('h3', title), element('p', description));
    return header;
}

function chart(values, style) {
    const make = (name, attrs) => {
        const node = document.createElementNS('http://www.w3.org/2000/svg', name);
        for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
        return node;
    };
    const svg = make('svg', { viewBox: '0 0 630 140', class: 'lab-chart', 'aria-hidden': 'true', preserveAspectRatio: 'none' });
    const max = Math.max(...values) * 1.1;
    const points = values.map((value, index) => [42 + index * 91, 130 - value / max * 118]);
    for (const y of [30, 65, 100, 130]) svg.append(make('path', { d: `M0 ${y}H630`, stroke: 'currentColor', opacity: '.2' }));
    if (style === 'Linha') {
        svg.append(make('polyline', { points: points.map(point => point.join(',')).join(' '), fill: 'none', stroke: 'currentColor', 'stroke-width': '4' }));
        for (const [x, y] of points) svg.append(make('circle', { cx: x, cy: y, r: '4', fill: 'currentColor' }));
    } else {
        for (const [x, y] of points) svg.append(make('rect', { x: x - 19, y, width: 38, height: 130 - y, rx: 4, fill: 'currentColor' }));
    }
    return svg;
}

function dashboard(app, state) {
    const output = element('div');
    function update() {
        const values = series[state.period];
        const total = values.reduce((sum, value) => sum + value, 0);
        output.replaceChildren(metrics([['Pedidos', total], ['Média por intervalo', Math.round(total / values.length)], ['Maior intervalo', Math.max(...values)]]),
            chart(values, state.chart), table('Pedidos por intervalo', ['Intervalo', 'Pedidos'], values.map((value, index) => [index + 1, value])));
    }
    const controls = element('div', undefined, 'lab-fields');
    controls.append(labeled('Período', select(Object.keys(series), state.period, value => { state.period = value; update(); })),
        labeled('Visualização', select(['Linha', 'Barras'], state.chart, value => { state.chart = value; update(); })));
    app.append(heading('Painel operacional', 'Compare volumes fictícios de pedidos por período.'), controls, output);
    update();
}

function searchControls(state, update) {
    const controls = element('div', undefined, 'lab-fields');
    const query = input('search', state.query);
    query.maxLength = 80;
    query.addEventListener('input', () => { state.query = query.value; update(); });
    controls.append(labeled('Pesquisar produtos', query),
        labeled('Categoria', select(['Todas', ...categories], state.category, value => { state.category = value; update(); })));
    return controls;
}

function matchesProduct(item, state) {
    return (state.category === 'Todas' || state.category === item.category) &&
        normalize(item.name).includes(normalize(state.query.trim()));
}

function quantityControl(value, label, onChange) {
    const control = input('number', value);
    control.min = '0';
    control.max = '999';
    control.step = '1';
    control.required = true;
    control.setAttribute('aria-label', label);
    control.addEventListener('change', () => {
        if (control.checkValidity() && Number.isInteger(control.valueAsNumber)) {
            value = control.valueAsNumber;
            onChange(value);
        }
        else {
            control.reportValidity();
            control.value = value;
        }
    });
    return control;
}

function inventory(app, state, notify) {
    const overview = element('div');
    const output = element('div');
    function updateTotals() {
        overview.replaceChildren(metrics([['Produtos', state.items.length], ['Unidades', state.items.reduce((sum, item) => sum + item.quantity, 0)], ['Sem estoque', state.items.filter(item => !item.quantity).length]]));
    }
    function render(focusId) {
        const shown = state.items.filter(item => matchesProduct(item, state));
        output.replaceChildren(shown.length ? table('Produtos em estoque', ['Produto', 'Categoria', 'Quantidade', 'Ações'], shown.map(item => {
            const quantity = quantityControl(item.quantity, `Quantidade de ${item.name}`, value => {
                item.quantity = value;
                updateTotals();
                notify('Quantidade atualizada.');
            });
            quantity.dataset.itemId = item.id;
            return [item.name, item.category, quantity, button('Remover', () => {
                state.items = state.items.filter(product => product.id !== item.id);
                render(shown.find(product => product.id !== item.id)?.id);
                if (!shown.some(product => product.id !== item.id)) controls.querySelector('input').focus();
                notify('Produto removido.');
            }, `Remover ${item.name}`)];
        })) : element('p', 'Nenhum produto encontrado.'));
        updateTotals();
        if (focusId) output.querySelector(`[data-item-id="${focusId}"]`)?.focus();
    }
    const controls = searchControls(state, () => render());
    const add = element('form', undefined, 'lab-fields');
    const name = input('text');
    name.required = true;
    name.maxLength = 65;
    const category = select(categories, categories[0]);
    const amount = input('number', '0');
    amount.min = '0'; amount.max = '999'; amount.required = true;
    const submit = element('button', 'Adicionar produto', 'button button-primary button-small');
    submit.type = 'submit';
    add.append(labeled('Nome do produto', name), labeled('Categoria do produto', category), labeled('Quantidade inicial', amount), submit);
    add.addEventListener('submit', event => {
        event.preventDefault();
        if (!name.value.trim()) { notify('Informe o nome do produto.'); name.focus(); return; }
        state.items.push({ id: state.next++, name: name.value.trim(), category: category.value, quantity: amount.valueAsNumber });
        add.reset();
        render();
        name.focus();
        notify('Produto adicionado.');
    });
    app.append(heading('Controle de estoque', 'Pesquise, cadastre e atualize quantidades de produtos fictícios.'), overview, controls, add, output);
    render();
}

function tasks(app, state, notify) {
    const output = element('div', undefined, 'demo-list');
    const controls = element('div', undefined, 'lab-fields');
    const filter = select(['Todas', ...states], state.filter, value => { state.filter = value; render(); });
    controls.append(labeled('Filtrar por status', filter));
    function render(focusId) {
        const shown = state.items.filter(item => state.filter === 'Todas' || state.filter === item.state);
        output.replaceChildren(...shown.map(item => {
            const row = element('article', undefined, 'demo-row');
            const label = element('div');
            label.append(element('strong', item.name), element('small', item.state));
            const actions = element('div', undefined, 'row-actions');
            const change = value => {
                item.state = value;
                render(item.id);
                notify('Status atualizado.');
            };
            const status = select(states, item.state, change);
            status.setAttribute('aria-label', `Status de ${item.name}`);
            status.dataset.task = item.id;
            actions.append(status, button(item.state === 'Concluída' ? 'Reabrir' : 'Concluir', () => change(item.state === 'Concluída' ? 'Pendente' : 'Concluída')),
                button('Remover', () => {
                    state.items = state.items.filter(task => task.id !== item.id);
                    render(shown.find(task => task.id !== item.id)?.id);
                    if (!shown.some(task => task.id !== item.id)) filter.focus();
                    notify('Tarefa removida.');
                }, `Remover ${item.name}`));
            row.append(label, actions);
            return row;
        }));
        if (!shown.length) output.append(element('p', 'Nenhuma tarefa neste filtro.'));
        if (focusId) (output.querySelector(`[data-task="${focusId}"]`) || filter).focus();
    }
    const add = element('form', undefined, 'lab-fields');
    const task = input('text');
    task.required = true;
    task.maxLength = 100;
    const submit = element('button', 'Adicionar tarefa', 'button button-primary button-small');
    add.append(labeled('Nova tarefa', task), submit);
    add.addEventListener('submit', event => {
        event.preventDefault();
        if (!task.value.trim()) { notify('Informe a descrição da tarefa.'); task.focus(); return; }
        state.items.push({ id: state.next++, name: task.value.trim(), state: 'Pendente' });
        add.reset();
        render();
        task.focus();
        notify('Tarefa adicionada.');
    });
    app.append(heading('Quadro de tarefas', 'Organize tarefas demonstrativas por etapa.'), controls, add, output);
    render();
}

function shop(app, state, notify) {
    const output = element('div', undefined, 'catalog-grid');
    const summary = element('div');
    function updateSummary() {
        const entries = catalog.filter(item => state.selection[item.id] > 0);
        summary.replaceChildren(entries.length ? table('Resumo da seleção', ['Produto', 'Quantidade'],
            entries.map(item => [item.name, state.selection[item.id]])) : element('p', 'Seleção vazia.'));
    }
    function render() {
        const shown = catalog.filter(item => matchesProduct(item, state));
        output.replaceChildren(...shown.map(item => {
            const card = element('article');
            const quantity = quantityControl(state.selection[item.id] || 0, `Quantidade de ${item.name}`, value => {
                state.selection[item.id] = value;
                updateSummary();
                notify('Seleção atualizada.');
            });
            card.append(element('strong', item.name), element('small', item.category), labeled('Quantidade', quantity),
                button('Selecionar', () => {
                    state.selection[item.id] = Math.max(1, state.selection[item.id] || 0);
                    quantity.value = state.selection[item.id];
                    quantity.dispatchEvent(new Event('change'));
                    notify('Produto selecionado.');
                }, `Selecionar ${item.name}`));
            return card;
        }));
        if (!shown.length) output.append(element('p', 'Nenhum produto encontrado.'));
        updateSummary();
    }
    app.append(heading('Linha Essencial', 'Monte uma seleção de produtos fictícios. A seleção é apenas demonstrativa.'),
        searchControls(state, render), output, summary);
    render();
}

export function initLab() {
    const lab = document.querySelector('.lab');
    const app = lab.querySelector('.lab-app');
    const buttons = [...lab.querySelectorAll('[data-demo]')];
    const feedback = lab.querySelector('.lab-feedback');
    const renderers = { dash: dashboard, stock: inventory, tasks, catalog: shop };
    const available = buttons.filter(button => Object.hasOwn(renderers, button.dataset.demo));
    for (const control of buttons) if (!available.includes(control)) control.hidden = true;
    if (!available.length) return;
    const statesByDemo = clone(demoData);
    let active;
    const notify = message => { feedback.textContent = message; };
    function switchDemo(button) {
        active = button.dataset.demo;
        press(available, button);
        app.replaceChildren();
        renderers[active](app, statesByDemo[active], notify);
        notify('');
    }
    for (const control of available) control.addEventListener('click', () => switchDemo(control));
    lab.querySelector('[data-lab-reset]').addEventListener('click', () => {
        statesByDemo[active] = clone(demoData[active]);
        switchDemo(available.find(control => control.dataset.demo === active));
        notify('Dados iniciais restaurados.');
    });
    document.addEventListener('click', event => {
        const link = event.target.closest('[data-open-demo]');
        if (!link) return;
        const control = available.find(item => item.dataset.demo === link.dataset.openDemo);
        if (control) {
            switchDemo(control);
            control.focus({ preventScroll: true });
        }
    });
    switchDemo(available[0]);
    lab.hidden = false;
}
