export function screenTexture(kind, tall, dark) {
    const canvas = document.createElement('canvas');
    canvas.width = tall ? 320 : 640;
    canvas.height = tall ? 520 : 390;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const bg = dark ? '#132039' : '#edf3ff';
    const panel = dark ? '#1f3150' : '#ffffff';
    const ink = dark ? '#edf4ff' : '#102344';
    const muted = dark ? '#a4b8db' : '#4d6589';
    const accent = ['#3479f8', '#6158de', '#28948c'][kind];
    const cardWidth = (w - 72) / 3;
    function box(x, y, width, height, fill, radius = 7) {
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.fill();
    }
    function text(content, x, y, size, color, weight = 600) {
        ctx.font = `${weight} ${size}px system-ui, sans-serif`;
        ctx.fillStyle = color;
        ctx.fillText(content, x, y);
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = panel;
    ctx.fillRect(0, 0, w, 54);
    box(22, 15, 23, 23, accent);
    text(['ORBIT', 'ATELIÊ NORTE', 'LINHA ESSENCIAL'][kind], 56, 31, 14, ink, 800);
    for (let i = 0; i < (tall ? 2 : 3); i++) box(w - 26 - i * 17, 24, 6, 6, muted, 3);
    text(['Visão geral', 'Feito para durar.', 'Coleção essencial'][kind], 26, 99, tall ? 27 : 34, ink, 750);
    text(['Resumo da operação', 'Objetos e espaços com intenção', 'Itens para o seu espaço'][kind], 27, 125, 13, muted);

    if (kind === 0) {
        ['Pedidos', 'Produtos', 'Entregas'].forEach((label, index) => {
            const x = 24 + index * (cardWidth + 12);
            box(x, 146, cardWidth, 76, panel);
            text(label, x + 8, 170, tall ? 10 : 13, muted);
            text(['128', '34', '92'][index], x + 8, 207, tall ? 23 : 28, ink, 750);
        });
        box(24, 238, w - 48, h - 261, panel);
        ctx.strokeStyle = dark ? '#354969' : '#d5e2f8';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
            const y = 263 + i * (h - 286) / 4;
            ctx.beginPath();
            ctx.moveTo(38, y);
            ctx.lineTo(w - 39, y);
            ctx.stroke();
        }
        const curve = [.12, .28, .22, .49, .4, .63, .56, .81, .88];
        const points = curve.map((value, index) => [39 + index * (w - 78) / 8, h - 36 - value * (h - 278)]);
        ctx.beginPath();
        points.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        ctx.strokeStyle = accent;
        ctx.lineWidth = tall ? 3 : 4;
        ctx.stroke();
    } else if (kind === 1) {
        box(24, 146, w - 48, h - 173, '#b6c8ee', 12);
        ctx.strokeStyle = '#344c83';
        ctx.globalAlpha = .75;
        ctx.lineWidth = 2;
        for (let i = 0; i < 9; i++) {
            ctx.beginPath();
            ctx.ellipse(w * .67, (h + 146) * .5, 25 + i * 8, 30 + i * 5, -.65, 0, 2 * Math.PI);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
        box(36, h - 74, 100, 30, '#263970');
        text('Ver coleção', 45, h - 54, 12, '#fff');
    } else {
        ['Papelaria', 'Organização', 'Iluminação'].forEach((label, index) => {
            const x = 24 + index * (cardWidth + 12);
            box(x, 146, cardWidth, h - 173, panel, 9);
            box(x + 6, 153, cardWidth - 12, h - 225, ['#bbd5ca', '#d9ccb4', '#c6d2e8'][index]);
            ctx.fillStyle = ['#567a6b', '#97866a', '#617aa4'][index];
            ctx.beginPath();
            ctx.ellipse(x + cardWidth / 2, (h + 84) / 2, cardWidth * .27, cardWidth * .19, -.45, 0, Math.PI * 2);
            ctx.fill();
            text(label, x + 6, h - 42, tall ? 9 : 14, ink);
        });
    }
    return canvas;
}

export function keyboardTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 116;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#25324a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#10192c';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 14; col++) {
            const x = 8 + col * 30.5;
            const y = 7 + row * 26;
            if (row === 3 && col > 4 && col < 9) continue;
            ctx.beginPath();
            ctx.roundRect(x, y, row === 3 && col === 4 ? 147 : 26, 21, 3);
            ctx.fill();
        }
    }
    return canvas;
}
