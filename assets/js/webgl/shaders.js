export const vertex = `#version 300 es
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
layout(location=2) in vec2 uv;
uniform mat4 projection;
uniform mat4 model;
out vec3 vNormal;
out vec2 vUV;
void main() {
    vNormal = mat3(model) * normal;
    vUV = uv;
    gl_Position = projection * model * vec4(position, 1.0);
}`;

export const fragment = `#version 300 es
precision mediump float;
in vec3 vNormal;
in vec2 vUV;
uniform vec3 color;
uniform sampler2D screen;
uniform int material;
out vec4 pixel;
void main() {
    if (material == 1) {
        vec3 displayColor = texture(screen, vUV).rgb;
        float reflection = pow(max(0.0, 1.0 - abs(vUV.x + vUV.y - 1.47)), 9.0);
        pixel = vec4(displayColor + vec3(0.10, 0.13, 0.19) * reflection, 1.0);
    } else if (material == 2) {
        float radius = length((vUV - 0.5) * 2.0);
        pixel = vec4(0.008, 0.013, 0.026, (1.0 - smoothstep(0.05, 0.99, radius)) * 0.47);
    } else {
        vec3 n = normalize(vNormal);
        vec3 light = normalize(vec3(-0.5, 0.8, 1.0));
        float diffuse = max(dot(n, light), 0.0);
        float specular = pow(max(dot(n, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0), 20.0);
        pixel = vec4(color * (0.46 + diffuse * 0.65) + vec3(0.26, 0.34, 0.52) * specular, 1.0);
    }
}`;
