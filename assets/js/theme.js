(() => {
    const root = document.documentElement;
    root.classList.add('has-js');
    const options = ['light', 'dark', 'auto'];
    const storageKey = 'next-interface-theme';
    try {
        const saved = localStorage.getItem(storageKey);
        if (options.includes(saved)) root.dataset.theme = saved;
    } catch {
        // O tema da configuração continua disponível sem armazenamento.
    }

    document.addEventListener('DOMContentLoaded', () => {
        const pickers = [...document.querySelectorAll('[data-theme-picker]')];
        const sync = () => pickers.forEach(picker => { picker.value = root.dataset.theme; });
        const notify = () => document.dispatchEvent(new Event('portfolio-theme'));
        sync();
        for (const picker of pickers) picker.addEventListener('change', () => {
            if (!options.includes(picker.value)) return;
            root.dataset.theme = picker.value;
            try { localStorage.setItem(storageKey, picker.value); } catch { /* Preferência da sessão. */ }
            sync();
            notify();
        });
        const system = matchMedia('(prefers-color-scheme: dark)');
        system.addEventListener('change', () => { if (root.dataset.theme === 'auto') notify(); });
    });
})();
