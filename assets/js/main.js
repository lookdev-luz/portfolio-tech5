import { initNavigation, initStory } from './navigation.js';
import { initProjects, initPreview } from './projects.js';
import { initLab } from './experience-lab.js';
import { initStudio } from './project-studio.js';

initNavigation();
initStory();
initProjects();
initPreview();
initLab();
initStudio();

const device = document.querySelector('#device');
import('./webgl/device-scene.js').then(({ initDevices }) => initDevices(device)).catch(() => {
    device.querySelector('[data-device-feedback]').textContent = 'Ilustração de dispositivos disponível.';
});
