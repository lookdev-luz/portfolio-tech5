import { vertex, fragment } from './shaders.js';

function compile(gl, source, type) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Não foi possível criar o shader.');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    gl.deleteShader(shader);
    throw new Error('Falha ao compilar o shader.');
}

export function createRenderer(gl) {
    const program = gl.createProgram();
    if (!program) throw new Error('Não foi possível criar o programa.');
    const shaders = [];
    try {
        shaders.push(compile(gl, vertex, gl.VERTEX_SHADER));
        shaders.push(compile(gl, fragment, gl.FRAGMENT_SHADER));
        shaders.forEach(shader => gl.attachShader(program, shader));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Falha ao vincular o programa.');
    } catch (error) {
        gl.deleteProgram(program);
        throw error;
    } finally {
        shaders.forEach(shader => gl.deleteShader(shader));
    }

    const uniforms = Object.fromEntries(['projection', 'model', 'color', 'screen', 'material'].map(name => [name, gl.getUniformLocation(program, name)]));
    const meshes = [], textures = [];
    gl.useProgram(program);
    gl.uniform1i(uniforms.screen, 0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    return {
        mesh({ vertices, indices }) {
            const vao = gl.createVertexArray(), vertexBuffer = gl.createBuffer(), indexBuffer = gl.createBuffer();
            const mesh = { vao, vertexBuffer, indexBuffer, count: indices.length };
            meshes.push(mesh);
            gl.bindVertexArray(vao);
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
            [3, 3, 2].forEach((size, index) => {
                gl.enableVertexAttribArray(index);
                gl.vertexAttribPointer(index, size, gl.FLOAT, false, 32, index * 12);
            });
            return mesh;
        },
        texture() {
            const texture = gl.createTexture();
            textures.push(texture);
            return texture;
        },
        upload(texture, canvas) {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.generateMipmap(gl.TEXTURE_2D);
        },
        begin(width, height, projection) {
            gl.viewport(0, 0, width, height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.uniformMatrix4fv(uniforms.projection, false, projection);
        },
        draw(mesh, model, color, material = 0, texture = null) {
            gl.bindVertexArray(mesh.vao);
            gl.uniformMatrix4fv(uniforms.model, false, model);
            gl.uniform3fv(uniforms.color, color);
            gl.uniform1i(uniforms.material, material);
            if (texture) gl.bindTexture(gl.TEXTURE_2D, texture);
            if (material === 2) { gl.enable(gl.BLEND); gl.depthMask(false); }
            gl.drawElements(gl.TRIANGLES, mesh.count, gl.UNSIGNED_SHORT, 0);
            if (material === 2) { gl.disable(gl.BLEND); gl.depthMask(true); }
        },
        dispose() {
            for (const mesh of meshes) {
                gl.deleteVertexArray(mesh.vao);
                gl.deleteBuffer(mesh.vertexBuffer);
                gl.deleteBuffer(mesh.indexBuffer);
            }
            textures.forEach(texture => gl.deleteTexture(texture));
            gl.deleteProgram(program);
        },
    };
}
