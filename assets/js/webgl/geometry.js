// Cada anel percorre os quatro cantos em sentido anti-horário.
function ring(width, height, radius) {
    const points = [];
    const x = width / 2 - radius, y = height / 2 - radius;
    const corners = [[x,y],[-x,y],[-x,-y],[x,-y]];
    corners.forEach(([cx, cy], corner) => {
        for (let segment = 0; segment <= 5; segment++) {
            const angle = (corner + segment / 5) * Math.PI / 2;
            points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, Math.cos(angle), Math.sin(angle)]);
        }
    });
    return points;
}

export function rounded(width, height, depth, radius, bevel = 0) {
    const vertices = [], indices = [];
    const push = (x, y, z, nx, ny, nz) =>
        vertices.push(x, y, z, nx, ny, nz, x / width + .5, y / height + .5);
    const inset = Math.min(bevel, radius / 2);
    const boundary = ring(width, height, radius);
    const face = ring(width - inset * 2, height - inset * 2, radius - inset);
    const count = face.length;
    if (depth === 0) {
        push(0, 0, 0, 0, 0, 1);
        for (const [x, y] of boundary) push(x, y, 0, 0, 0, 1);
        for (let i = 0; i < count; i++) indices.push(0, i + 1, (i + 1) % count + 1);
        return { vertices, indices };
    }
    const z = depth / 2;
    const edge = Math.min(z * .7, inset);
    const layers = [[face, z, .57, .82], [boundary, z-edge, 1, 0], [boundary, -z+edge, 1, 0], [face, -z, .57, -.82]];
    for (const [points, level, side, normalZ] of layers) {
        for (const [x, y, nx, ny] of points) push(x, y, level, nx * side, ny * side, normalZ);
    }
    for (let layer = 0; layer < layers.length - 1; layer++) {
        for (let i = 0; i < count; i++) {
            const a = layer * count + i, b = layer * count + (i + 1) % count;
            indices.push(a, a + count, b, b, a + count, b + count);
        }
    }
    for (const sign of [1, -1]) {
        const center = vertices.length / 8;
        push(0, 0, sign*z, 0, 0, sign);
        for (const [x, y] of face) push(x, y, sign*z, 0, 0, sign);
        for (let i = 0; i < count; i++) {
            const a = center + 1 + i, b = center + 1 + (i + 1) % count;
            indices.push(center, sign > 0 ? a : b, sign > 0 ? b : a);
        }
    }
    return { vertices, indices };
}
