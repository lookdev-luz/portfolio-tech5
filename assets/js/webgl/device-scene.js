import { rounded } from './geometry.js';
import { multiply, perspective, rotationX, rotationY, scale, translation } from './math.js';
import { createRenderer } from './renderer.js';
import { keyboardTexture, screenTexture } from './textures.js';
import { press } from '../ui.js';

const models = [
    { name: 'tablet', width: 2.04, height: 2.70, thickness: .14, radius: .15, border: .10, x: -3.35, y: -.16, z: .22, angle: .22 },
    { name: 'notebook', width: 4.26, height: 2.57, thickness: .17, radius: .14, border: .10, x: .13, y: .17, z: -.2, angle: -.13 },
    { name: 'smartphone', width: 1.21, height: 2.39, thickness: .16, radius: .19, border: .065, x: 3.30, y: -.39, z: .65, angle: -.30 },
];
const zero = [0, 0, 0];

function createScene(gl) {
    const engine = createRenderer(gl);
    try {
        const devices = models.map(model => {
            const { width, height, thickness, radius, border } = model;
            return {
                ...model,
                body: engine.mesh(rounded(width, height, thickness, radius, .037)),
                screen: engine.mesh(rounded(width - 2 * border, height - 2 * border, 0, radius - border * .65)),
                texture: engine.texture(),
            };
        });
        const base = engine.mesh(rounded(4.63, 1.83, .13, .17, .045));
        const keyboard = engine.mesh(rounded(3.82, .70, 0, .07));
        const keys = engine.texture();
        engine.upload(keys, keyboardTexture());
        const touchpad = engine.mesh(rounded(1.15, .46, 0, .066));
        const shadow = engine.mesh(rounded(7.7, 1.65, 0, .65));
        if (gl.getError() !== gl.NO_ERROR) throw new Error('Falha ao preparar a cena.');
        return { engine, devices, base, keyboard, keys, touchpad, shadow };
    } catch (error) {
        engine.dispose();
        throw error;
    }
}

export function initDevices(card) {
    const canvas = card.querySelector('canvas');
    const controls = card.querySelector('.device-controls');
    const hint = card.querySelector('[data-device-hint]');
    const caption = card.querySelector('.device-caption > :last-child');
    const feedback = card.querySelector('[data-device-feedback]');
    const select = card.querySelector('select');
    const choices = [...card.querySelectorAll('[data-device-choice]')];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const system = matchMedia('(prefers-color-scheme: dark)');
    const defaultIndex = Math.max(0, choices.findIndex(button => button.dataset.deviceChoice === card.dataset.device));
    const defaultDevice = choices[defaultIndex].dataset.deviceChoice;
    let current = defaultDevice;
    let visible = false, scene, gl, frame = 0, last = 0, texturesDirty = true;
    let yaw = 0, pitch = 0, drag = null;
    let cameraYaw = 0, cameraPitch = 0;
    const weights = Object.fromEntries(models.map(model => [model.name, Number(model.name === current)]));
    const configuredQuality = Math.max(.75, Number(card.dataset.quality) || 1.65);

    function fallback() {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        card.classList.remove('is-ready');
        controls.hidden = true;
        hint.hidden = false;
        caption.textContent = 'Ilustração';
        feedback.textContent = 'Ilustração estática dos dispositivos.';
    }

    function schedule() {
        if (scene && visible && !document.hidden && !frame) frame = requestAnimationFrame(time => {
            try {
                draw(time);
            } catch {
                scene?.engine.dispose();
                scene = null;
                fallback();
            }
        });
    }

    function draw(now) {
        frame = 0;
        if (!scene || !visible || document.hidden) { last = 0; return; }
        const { engine, devices, base, keyboard, keys, touchpad, shadow } = scene;
        const dark = document.documentElement.dataset.theme === 'dark' ||
            (document.documentElement.dataset.theme === 'auto' && system.matches);
        const targetYaw = yaw, targetPitch = pitch;
        const dt = last ? Math.min(now - last, 45) : 16;
        last = now;
        // A aproximação exponencial mantém o movimento estável em monitores com taxas diferentes.
        const blend = motion.matches ? 1 : 1 - Math.exp(-dt / 92);
        cameraYaw += (targetYaw - cameraYaw) * blend;
        cameraPitch += (targetPitch - cameraPitch) * blend;
        const quality = Math.min(devicePixelRatio || 1, configuredQuality, canvas.clientWidth < 600 ? 1.25 : 1.85);
        const width = Math.max(1, Math.round(canvas.clientWidth * quality));
        const height = Math.max(1, Math.round(canvas.clientHeight * quality));
        if (canvas.width !== width) canvas.width = width;
        if (canvas.height !== height) canvas.height = height;
        const aspect = width / height;
        const widthFactor = 11.15 + Math.max(0, Math.min(1, (1.65 - aspect) / .45)) * 1.9;
        const distance = Math.max(8.6, widthFactor / aspect);
        const camera = multiply(perspective(.60, aspect), translation(0, .04, -distance));
        const composition = multiply(rotationX(-.045 + cameraPitch), rotationY(cameraYaw));
        engine.begin(width, height, camera);
        engine.draw(shadow, multiply(composition, multiply(translation(0,-1.49,.55), rotationX(-1.48))), zero, 2);
        let moving = Math.abs(targetYaw - cameraYaw) + Math.abs(targetPitch - cameraPitch) > .001;
        for (const device of devices) {
            const target = Number(current === device.name);
            const weight = weights[device.name] += (target - weights[device.name]) * blend;
            moving ||= Math.abs(target - weight) > .002;
            const model = multiply(composition, multiply(
                translation(device.x * (1 - weight * .09), device.y + .15 * weight, device.z + .27 * weight),
                multiply(rotationY(device.angle * (1 - weight * .35)), scale(1 + .06 * weight, 1 + .06 * weight, 1))));
            const isLaptop = device.name === 'notebook';
            const selectedScreen = Number(select.value);
            if (texturesDirty) {
                const demo = current === device.name ? selectedScreen : (device.name === 'tablet' ? 1 : device.name === 'smartphone' ? 2 : 0);
                const key = demo + ':' + dark;
                if (device.textureKey !== key) {
                    engine.upload(device.texture, screenTexture(demo, !isLaptop, dark));
                    device.textureKey = key;
                }
            }
            engine.draw(device.body, model, dark ? [.23,.29,.41] : [.33,.41,.55]);
            engine.draw(device.screen, multiply(model, translation(0,0,device.thickness / 2 + .003)), zero, 1, device.texture);
            if (isLaptop) {
                const deck = multiply(model, multiply(translation(0,-1.31,.89), rotationX(-1.42)));
                engine.draw(base, deck, dark ? [.38,.45,.59] : [.51,.60,.74]);
                engine.draw(keyboard, multiply(deck, translation(0,.29,.069)), zero, 1, keys);
                engine.draw(touchpad, multiply(deck, translation(0,-.47,.069)), [.35,.42,.56]);
            }
        }
        texturesDirty = false;
        card.classList.add('is-ready');
        if (moving) schedule();
        else last = 0;
    }

    function initialize() {
        try {
            gl ||= canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' });
            if (!gl) { fallback(); return; }
            scene = createScene(gl);
            texturesDirty = true;
            controls.hidden = false;
            hint.hidden = true;
            caption.textContent = 'Ambiente interativo';
            feedback.textContent = 'Use os controles para trocar o dispositivo, a interface ou a rotação.';
            schedule();
        } catch {
            scene?.engine.dispose();
            scene = null;
            fallback();
        }
    }

    function update() {
        texturesDirty = true;
        press(choices, choices.find(button => button.dataset.deviceChoice === current));
        schedule();
    }
    for (const button of choices) button.addEventListener('click', () => {
        current = button.dataset.deviceChoice;
        feedback.textContent = `${button.textContent.trim()} em destaque.`;
        update();
    });
    select.addEventListener('change', update);
    for (const button of card.querySelectorAll('[data-rotate]')) button.addEventListener('click', () => {
        yaw = Math.max(-.49, Math.min(.49, yaw + Number(button.dataset.rotate) * .16));
        schedule();
    });
    card.querySelector('[data-device-reset]').addEventListener('click', () => {
        yaw = 0; pitch = 0; pointerYaw = 0; pointerPitch = 0;
        current = defaultDevice;
        select.value = '0';
        feedback.textContent = 'Posição inicial restaurada.';
        update();
    });
    canvas.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0) return;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw, pitch };
        canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
        if (drag?.id === event.pointerId) {
            yaw = Math.max(-.49, Math.min(.49, drag.yaw + (event.clientX - drag.x) * .004));
            if (event.pointerType === 'mouse') pitch = Math.max(-.21, Math.min(.21, drag.pitch + (event.clientY - drag.y) * .003));
        }
        schedule();
    });
    for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) canvas.addEventListener(name, () => { drag = null; });

    canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); scene = null; fallback(); });
    canvas.addEventListener('webglcontextrestored', initialize);
    document.addEventListener('portfolio-theme', update);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(frame);
            frame = 0;
            last = 0;
        } else schedule();
    });
    addEventListener('pagehide', () => {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        scene?.engine.dispose();
        scene = null;
    });
    addEventListener('pageshow', event => { if (event.persisted && gl && !gl.isContextLost()) initialize(); });
    motion.addEventListener('change', () => { schedule(); });
    if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(canvas);
    else addEventListener('resize', schedule);
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !gl) initialize();
            schedule();
        }).observe(canvas);
    } else {
        visible = true;
        initialize();
    }
    update();
}
