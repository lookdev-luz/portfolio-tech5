export function initNavigation() {
    const button = document.querySelector('.menu-button');
    const nav = document.querySelector('#site-navigation');
    const mobile = matchMedia('(max-width: 760px)');
    function setOpen(open) {
        button.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('is-open', open);
    }
    function syncMenu() {
        button.hidden = !mobile.matches;
        setOpen(false);
    }
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') === 'false'));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            button.focus();
        }
    });
    mobile.addEventListener('change', syncMenu);
    syncMenu();

    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const targets = links.map(link => document.getElementById(link.hash.slice(1)));
    let queued = false;
    function update() {
        queued = false;
        const line = Math.min(innerHeight * .45, 310);
        let active = -1;
        const last = targets.at(-1);
        if (last && last.getBoundingClientRect().bottom >= 72) {
            for (const [index, target] of targets.entries()) {
                if (target.getBoundingClientRect().top <= line) active = index;
            }
        }
        links.forEach((link, index) => {
            if (index === active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    function schedule() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(update);
    }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();

    for (const attr of ['data-exclusive', 'data-process']) {
        const details = [...document.querySelectorAll(`[${attr}]`)];
        for (const current of details) current.addEventListener('toggle', () => {
            if (current.open) details.filter(item => item !== current).forEach(item => { item.open = false; });
        });
    }
}

export function initStory() {
    if (!('IntersectionObserver' in window)) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            if (motion.matches || !entry.target.animate) continue;
            const illustration = entry.target.querySelector('.story-art');
            if (illustration) illustration.animate(
                [{ opacity: .55, clipPath: 'inset(0 28% 0 0 round 10px)' }, { opacity: 1, clipPath: 'inset(0 round 10px)' }],
                { duration: 600, easing: 'cubic-bezier(.2,.65,.3,1)' },
            );
            else entry.target.animate(
                [{ opacity: .78, transform: 'translateY(11px)' }, { opacity: 1, transform: 'translateY(0)' }],
                { duration: 420, easing: 'cubic-bezier(.2,.65,.3,1)' },
            );
        }
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(item => observer.observe(item));
}
