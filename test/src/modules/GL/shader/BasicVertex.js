let BasicVertext = [

    "attribute lowp vec3 aVertexPosition;",
    "attribute lowp vec4 aVertexColor;",

    "uniform mat4 uPMVMatrix;",

    "varying vec4 vLightWeighting;",

    "void main(void) {",
    "	gl_Position = uPMVMatrix * vec4(aVertexPosition, 1.0);",
    "	vLightWeighting = aVertexColor;",
    "}"

].join('');

export default BasicVertext