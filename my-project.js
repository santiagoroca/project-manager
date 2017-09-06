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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(4);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(5);

var _path2 = _interopRequireDefault(_path);

var _child_process = __webpack_require__(6);

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
            var name = typeof commander.name != 'function' ? commander.name : this.module + '-project';

            if (_fs2.default.existsSync(name)) {
                console.warn('Folder ' + name + ' already exists. Specify a different name.');
                process.exit();
            }

            //Create project folder
            _fs2.default.mkdirSync('./' + name);

            (0, _child_process.execSync)('cp -r ' + _path2.default.resolve(__dirname) + '/projects/' + this.module + '/* ./' + name + '/');
            (0, _child_process.execSync)('npm install --prefix ./' + name + '/');

            console.log("");
            console.log('\x1b[32m%s\x1b[0m', '    Project ' + name + ' already configured');
            console.log("");
            console.log('\x1b[34m%s\x1b[0m', '        Get started with: npm start');
            console.log("");
        }
    }]);

    return Entity;
}();

exports.default = Entity;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _commander = __webpack_require__(2);

var _commander2 = _interopRequireDefault(_commander);

var _ES = __webpack_require__(3);

var _ES2 = _interopRequireDefault(_ES);

var _ES6WebGL = __webpack_require__(7);

var _ES6WebGL2 = _interopRequireDefault(_ES6WebGL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Entities


var Main = function Main() {
    _classCallCheck(this, Main);

    _commander2.default.version('').option('-n, --name [name]', 'Project Name');

    _commander2.default.command('es6').action(function (language) {
        es6.execute(_commander2.default);
    });

    _commander2.default.command('es6-webgl').action(function (language) {
        es6WebGL.execute(_commander2.default);
    });

    //Initialize
    var es6 = new _ES2.default(_commander2.default);
    var es6WebGL = new _ES6WebGL2.default(_commander2.default);

    _commander2.default.parse(process.argv);
};

exports.default = new Main();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entity2 = __webpack_require__(0);

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ES6 = function (_Entity) {
    _inherits(ES6, _Entity);

    function ES6(commander) {
        _classCallCheck(this, ES6);

        var _this = _possibleConstructorReturn(this, (ES6.__proto__ || Object.getPrototypeOf(ES6)).call(this, commander));

        _this.module = 'es6';
        return _this;
    }

    return ES6;
}(_Entity3.default);

exports.default = ES6;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entity2 = __webpack_require__(0);

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ES6WebGL = function (_Entity) {
    _inherits(ES6WebGL, _Entity);

    function ES6WebGL(commander) {
        _classCallCheck(this, ES6WebGL);

        var _this = _possibleConstructorReturn(this, (ES6WebGL.__proto__ || Object.getPrototypeOf(ES6WebGL)).call(this, commander));

        _this.module = 'es6-webgl';
        return _this;
    }

    return ES6WebGL;
}(_Entity3.default);

exports.default = ES6WebGL;

/***/ })
/******/ ]);