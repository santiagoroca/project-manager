//Shaders
import BasicFragment from 'modules/GL/shader/BasicFragment';
import BasicVertex from 'modules/GL/shader/BasicVertex';

//Libs
import { mat4, vec3 } from './lib/glmatrix';

class WebGL {

    constructor (container) {

        this.isLeftClickPressed = false;
        this.isRightClickPressed = false;
        this.alpha = Math.PI / 4;
        this.theta = Math.PI / 4;
        this.firstMousex = 0;
        this.firstMousey = 0;
        this.lastMousex = 0;
        this.lastMousey = 0;
        this.offset = 5;
        this.target = [0, 0, 0];

        //Creates the canvas in which the viewer will be rendered
        this.canvas = document.createElement('canvas');

        //Attach the canvas to the container
        container.appendChild(this.canvas);

        //Configure Canvas
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;

        //Get WebGL context
        this.webgl = this.canvas.getContext("webgl");

        //Configure WebGL
        this.webgl.viewport(0, 0, container.clientWidth, container.clientHeight);
        this.webgl.enable(this.webgl.DEPTH_TEST);
        this.webgl.enable(this.webgl.BLEND);
        this.webgl.getExtension('OES_element_index_uint');
        this.webgl.getExtension('OES_standard_derivatives');

        //Configure Fragment Shader
        let fragShad = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
        this.webgl.shaderSource(fragShad, BasicFragment);
        this.webgl.compileShader(fragShad);

        if (!this.webgl.getShaderParameter(fragShad, this.webgl.COMPILE_STATUS)) {
            alert(this.webgl.getShaderInfoLog(fragShad));
            return null;
        }

        //Configure Vertext Shader
        let vertShad = this.webgl.createShader(this.webgl.VERTEX_SHADER);
        this.webgl.shaderSource(vertShad, BasicVertex);
        this.webgl.compileShader(vertShad);

        if (!this.webgl.getShaderParameter(vertShad, this.webgl.COMPILE_STATUS)) {
            alert(this.webgl.getShaderInfoLog(vertShad));
            return null;
        }

        //Configure Shader Program
        this.shaderProgram = this.webgl.createProgram();
        this.webgl.attachShader(this.shaderProgram, vertShad);
        this.webgl.attachShader(this.shaderProgram, fragShad);
        this.webgl.linkProgram(this.shaderProgram);
        this.webgl.useProgram(this.shaderProgram);

        //Configure Shader attributes
        this.shaderProgram.vertexPositionAttribute = this.webgl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        this.webgl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

        this.shaderProgram.colorVertexAttribute = this.webgl.getAttribLocation(this.shaderProgram, "aVertexColor");
        this.webgl.enableVertexAttribArray(this.shaderProgram.colorVertexAttribute);

        this.shaderProgram.pPMVatrixUniform = this.webgl.getUniformLocation(this.shaderProgram, "uPMVMatrix");

        //Clear Canvas
        this.webgl.clearColor(0.0, 0.0, 0.0, 0.0);

        //Bind Data to Buffers and Upload to WebGL
        this.verticesBuffer = this.webgl.createBuffer();
        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.verticesBuffer);
        this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array([

            // front
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,

            // back
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0,  1.0, -1.0,
            -1.0,  1.0, -1.0

        ]).buffer, this.webgl.STATIC_DRAW);

        this.colorsBuffer = this.webgl.createBuffer();
        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.colorsBuffer);
        this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array([

            // front colors
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,

            // back colors
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,

        ]).buffer, this.webgl.STATIC_DRAW);

        this.facesBuffer = this.webgl.createBuffer();
        this.webgl.bindBuffer(this.webgl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
        this.webgl.bufferData(this.webgl.ELEMENT_ARRAY_BUFFER, new Uint32Array([

            // front
            0, 1, 2,
            2, 3, 0,

            // top
            1, 5, 6,
            6, 2, 1,

            // back
            7, 6, 5,
            5, 4, 7,

            // bottom
            4, 0, 3,
            3, 7, 4,

            // left
            4, 5, 1,
            1, 0, 4,

            // right
            3, 2, 6,
            6, 7, 3

        ]).buffer, this.webgl.STATIC_DRAW);

        //Configurate projection matrix
        this.pMatrix = mat4.create();
        mat4.perspective(this.pMatrix, 45, container.clientWidth / container.clientHeight, 0.001, 1000.0);

        //Render the scene the first time
        requestAnimationFrame(this.updateMVP.bind(this));

        //DOM Events
        this.canvas.oncontextmenu = function () {
            return false;
        };

        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    render () {
        this.webgl.clear(this.webgl.DEPTH_BUFFER_BIT);
        this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);

        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.verticesBuffer);
        this.webgl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, this.webgl.FLOAT, false, 0, 0);

        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.colorsBuffer);
        this.webgl.vertexAttribPointer(this.shaderProgram.colorVertexAttribute, 4, this.webgl.FLOAT, false, 0, 0);

        this.webgl.bindBuffer(this.webgl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
        this.webgl.drawElements(this.webgl.TRIANGLES, 36, this.webgl.UNSIGNED_INT, 0);
    }

    updateMVP () {
        let _mvMatrix = mat4.identity(mat4.create());

        _mvMatrix = mat4.rotate(_mvMatrix, _mvMatrix, this.alpha, [_mvMatrix[1], _mvMatrix[5], _mvMatrix[9]]);
        _mvMatrix = mat4.rotate(_mvMatrix, _mvMatrix, this.theta, [_mvMatrix[0], _mvMatrix[4], _mvMatrix[8]]);

        _mvMatrix = mat4.translate(_mvMatrix, _mvMatrix, this.target);

        if (this.offset != 0) {
            var vec = [_mvMatrix[2], _mvMatrix[6], _mvMatrix[10]];
            var vLength = Math.sqrt(
                _mvMatrix[2] * _mvMatrix[2] +
                _mvMatrix[6] * _mvMatrix[6] +
                _mvMatrix[10] * _mvMatrix[10]
            );

            vec [0] /= vLength;
            vec [1] /= vLength;
            vec [2] /= vLength;

            vec [0] *= -this.offset;
            vec [1] *= -this.offset;
            vec [2] *= -this.offset;

            _mvMatrix = mat4.translate(_mvMatrix, _mvMatrix, vec);
        }

        var pMVPMatrixUniform = [];
        mat4.multiply (pMVPMatrixUniform, this.pMatrix, _mvMatrix);
        this.webgl.uniformMatrix4fv(this.shaderProgram.pPMVatrixUniform, false, pMVPMatrixUniform);
        this.mvMatrix = _mvMatrix;

        requestAnimationFrame(this.render.bind(this));
    }

    onMouseDown (e) {
        e.preventDefault();
        e.stopPropagation();

        this.lastMousex = e.x;
        this.lastMousey = e.y;

        this.isLeftClickPressed = e.button === 0;
        this.isRightClickPressed = e.button === 2;

        this.firstMousex = e.x;
        this.firstMousey = e.y;
    }

    onMouseMove (e) {

        //Orbit
        if (this.isLeftClickPressed) {

            this.alpha -= (this.lastMousex - e.x) * .005;
            this.theta -= (this.lastMousey - e.y) * .005;

            this.theta = Math.max(Math.min(this.theta, Math.PI / 2), -Math.PI / 2);
            this.alpha = Math.abs(this.alpha) > Math.PI * 2 ? this.alpha % Math.PI * 2 : this.alpha;

            //Pan
        } else if (this.isRightClickPressed) {

            let right = vec3.normalize([], [this.mvMatrix[0], this.mvMatrix[4], this.mvMatrix[8]]);
            right = vec3.scale(right, right, -(this.lastMousex - e.x) * .005);

            let up = vec3.normalize([], [this.mvMatrix[1], this.mvMatrix[5], this.mvMatrix[9]]);
            up = vec3.scale(up, up, -(this.lastMousey - e.y) * .005);

            this.target = vec3.add([], this.target, vec3.add([], right, up));

        }

        this.updateMVP();

        this.lastMousex = e.x;
        this.lastMousey = e.y;
    }

    onMouseUp () {
        this.isLeftClickPressed = false;
        this.isRightClickPressed = false;
    }

}

export default WebGL