#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //Core


//Vendor


var _fs = __webpack_require__(0);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _child_process = __webpack_require__(2);

var _mustache = __webpack_require__(7);

var _mustache2 = _interopRequireDefault(_mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
    function Entity(commander) {
        _classCallCheck(this, Entity);

        this.module = '';
    }

    _createClass(Entity, [{
        key: 'execute',
        value: function execute(commander) {
            this.name = typeof commander.name != 'function' ? commander.name : this.module + '-project';

            if (_fs2.default.existsSync(this.name)) {
                console.warn('Folder ' + this.name + ' already exists. Specify a different this.name.');
                process.exit();
            }

            //Create project folder
            _fs2.default.mkdirSync('./' + this.name);

            (0, _child_process.execSync)('cp -r ' + _path2.default.resolve(__dirname) + '/projects/' + this.module + '/* ./' + this.name + '/');
            (0, _child_process.execSync)('npm install --prefix ./' + this.name + '/');

            //Create all configuration files
            this.configuration(commander);

            //Execute src creation function
            this.src(commander);

            //Print all finish output
            this.onfinish();
        }
    }, {
        key: 'template',
        value: function template(_in, _opt, _out) {
            var template = (0, _fs.readFileSync)(_path2.default.resolve(__dirname) + '/templates/' + _in + '.mustache', 'utf8');
            var file = _mustache2.default.render(template, _opt);
            (0, _fs.writeFileSync)(_out + '/' + _in, file);
        }
    }, {
        key: 'configuration',
        value: function configuration(commander) {
            //Webpack Configuration Copy
            this.template('webpack.config.js', {
                project_name: this.name,
                library: commander.library ? this.name.replace(/-/g, '_') : false
            }, './' + this.name);
        }
    }, {
        key: 'src',
        value: function src(commander) {}
    }, {
        key: 'onfinish',
        value: function onfinish() {
            console.log("");
            console.log('\x1b[32m%s\x1b[0m', '    Project ' + this.name + ' already configured');
            console.log("");
            console.log('\x1b[34m%s\x1b[0m', '        Get started with: npm start');
            console.log("");
        }
    }]);

    return Entity;
}();

exports.default = Entity;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _commander = __webpack_require__(5);

var _commander2 = _interopRequireDefault(_commander);

var _ES = __webpack_require__(6);

var _ES2 = _interopRequireDefault(_ES);

var _ES6WebGL = __webpack_require__(8);

var _ES6WebGL2 = _interopRequireDefault(_ES6WebGL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Entities


var Main = function Main() {
    _classCallCheck(this, Main);

    _commander2.default.version('').option('-n, --name [name]', 'Project Name');

    //Initialize
    var es6 = new _ES2.default(_commander2.default);
    var es6WebGL = new _ES6WebGL2.default(_commander2.default);

    _commander2.default.parse(process.argv);
};

exports.default = new Main();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(0);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _child_process = __webpack_require__(2);

var _Entity2 = __webpack_require__(3);

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Core


var ES6 = function (_Entity) {
    _inherits(ES6, _Entity);

    function ES6(commander) {
        _classCallCheck(this, ES6);

        var _this = _possibleConstructorReturn(this, (ES6.__proto__ || Object.getPrototypeOf(ES6)).call(this, commander));

        commander.command('es6').option('-l, --library', 'Compiles the project as a library').action(function (options) {
            this.execute(Object.assign(commander, options));
        }.bind(_this));

        _this.module = 'es6';
        return _this;
    }

    _createClass(ES6, [{
        key: 'src',
        value: function src(commander) {
            //If library enabled we copy the dist
            if (commander.library) {
                (0, _child_process.execSync)('mkdir -p ./' + this.name + '/dist');

                //Webpack Configuration Copy
                this.template('dist/index.html', {
                    project_name: this.name,
                    library: commander.library ? this.name.replace(/-/g, '_') : false
                }, './' + this.name);
            }

            (0, _child_process.execSync)('mkdir -p ./' + this.name + '/src');

            //Webpack Configuration Copy
            this.template('src/main.js', {
                main_body: commander.library ? 'document.body.innerHTML = "Hello World!";' : 'console.log("Hello World!");'
            }, './' + this.name);
        }
    }]);

    return ES6;
}(_Entity3.default);

exports.default = ES6;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mustache");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(0);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _child_process = __webpack_require__(2);

var _Entity2 = __webpack_require__(3);

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Core


//Base Class


var ES6WebGL = function (_Entity) {
    _inherits(ES6WebGL, _Entity);

    function ES6WebGL(commander) {
        _classCallCheck(this, ES6WebGL);

        var _this = _possibleConstructorReturn(this, (ES6WebGL.__proto__ || Object.getPrototypeOf(ES6WebGL)).call(this, commander));

        commander.command('es6-webgl').action(function (language) {
            this.execute(commander);
        }.bind(_this));

        _this.module = 'es6-webgl';
        return _this;
    }

    _createClass(ES6WebGL, [{
        key: 'src',
        value: function src(commander) {
            (0, _child_process.execSync)('mkdir -p ./' + this.name + '/dist');

            console.log(this.name.replace(/-/g, '_'));

            //Webpack Configuration Copy
            this.template('dist/index.html', {
                project_name: this.name,
                library: this.name.replace(/-/g, '_'),
                library_arguments: 'document.getElementById("viewer-container")',
                body: '<div id="viewer-container"></div>',
                head: '<style>html, body, div {width: 100%; height: 100%; margin: 0;}</style>'
            }, './' + this.name);
        }
    }, {
        key: 'configuration',
        value: function configuration(commander) {
            //Webpack Configuration Copy
            this.template('webpack.config.js', {
                project_name: this.name,
                library: this.name.replace(/-/g, '_')
            }, './' + this.name);
        }
    }]);

    return ES6WebGL;
}(_Entity3.default);

exports.default = ES6WebGL;

/***/ })
/******/ ]);