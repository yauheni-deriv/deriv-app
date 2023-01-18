/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@deriv/translations"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/translations"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/account"] = factory(require("@deriv/translations"));
	else
		root["@deriv/account"] = factory(root["@deriv/translations"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__deriv_translations__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Configs/proof-of-identity-config.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar proofOfIdentityConfig = function proofOfIdentityConfig(_ref, ProofOfIdentityForm) {\n  var account_settings = _ref.account_settings;\n  return {\n    header: {\n      active_title: (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Identity information'),\n      title: (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Identity information')\n    },\n    body: ProofOfIdentityForm,\n    props: {\n      citizen: account_settings.citizen || account_settings.country_code\n    },\n    passthrough: ['refreshNotifications', 'residence_list']\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proofOfIdentityConfig);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db25maWdzL3Byb29mLW9mLWlkZW50aXR5LWNvbmZpZy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQVBBO0FBU0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbmZpZ3MvcHJvb2Ytb2YtaWRlbnRpdHktY29uZmlnLmpzPzkwNWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tICdAZGVyaXYvdHJhbnNsYXRpb25zJztcblxuY29uc3QgcHJvb2ZPZklkZW50aXR5Q29uZmlnID0gKHsgYWNjb3VudF9zZXR0aW5ncyB9LCBQcm9vZk9mSWRlbnRpdHlGb3JtKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBhY3RpdmVfdGl0bGU6IGxvY2FsaXplKCdJZGVudGl0eSBpbmZvcm1hdGlvbicpLFxuICAgICAgICAgICAgdGl0bGU6IGxvY2FsaXplKCdJZGVudGl0eSBpbmZvcm1hdGlvbicpLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBQcm9vZk9mSWRlbnRpdHlGb3JtLFxuICAgICAgICBwcm9wczogeyBjaXRpemVuOiBhY2NvdW50X3NldHRpbmdzLmNpdGl6ZW4gfHwgYWNjb3VudF9zZXR0aW5ncy5jb3VudHJ5X2NvZGUgfSxcbiAgICAgICAgcGFzc3Rocm91Z2g6IFsncmVmcmVzaE5vdGlmaWNhdGlvbnMnLCAncmVzaWRlbmNlX2xpc3QnXSxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvb2ZPZklkZW50aXR5Q29uZmlnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Configs/proof-of-identity-config.js\n");

/***/ }),

/***/ "@deriv/translations":
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_translations__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Configs/proof-of-identity-config.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});