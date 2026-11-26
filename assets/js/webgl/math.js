export function multiply(a, b) {
    const result = new Float32Array(16);
    for (let column = 0; column < 4; column++) {
        for (let row = 0; row < 4; row++) {
            result[column * 4 + row] =
                a[row] * b[column * 4] + a[4 + row] * b[column * 4 + 1] +
                a[8 + row] * b[column * 4 + 2] + a[12 + row] * b[column * 4 + 3];
        }
    }
    return result;
}

export function translation(x, y, z) {
    return [1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1];
}

export function rotationX(angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    return [1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1];
}

export function rotationY(angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    return [c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1];
}

export function perspective(fov, aspect, near = .1, far = 40) {
    const f = 1 / Math.tan(fov / 2);
    return [f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)/(near-far),-1, 0,0,2*far*near/(near-far),0];
}

export function scale(x, y, z) {
    return [x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1];
}
