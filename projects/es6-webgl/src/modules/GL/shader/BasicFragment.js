let BasicFragment = [

    "#extension GL_OES_standard_derivatives : enable\n",

    "precision highp float;",

    "varying vec4 vLightWeighting;",

    "vec3 normals(vec3 pos) {",
    "    vec3 fdx = dFdx(pos);",
    "    vec3 fdy = dFdy(pos);",
    "    return normalize(cross(fdx, fdy));",
    "}",

    "void main() {",
    "    gl_FragColor = vLightWeighting;",
    "}"

].join('');

export default BasicFragment