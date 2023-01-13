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
		module.exports = factory(require("@deriv/shared"), require("@deriv/translations"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/shared", "@deriv/translations"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/account"] = factory(require("@deriv/shared"), require("@deriv/translations"));
	else
		root["@deriv/account"] = factory(root["@deriv/shared"], root["@deriv/translations"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__deriv_shared__, __WEBPACK_EXTERNAL_MODULE__deriv_translations__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Configs/currency-selector-config.js":
/*!*********************************************!*\
  !*** ./Configs/currency-selector-config.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @deriv/translations */ \"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @deriv/shared */ \"@deriv/shared\");\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_shared__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _currency_selector_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currency-selector-schema */ \"./Configs/currency-selector-schema.js\");\n\n\n\nvar currencySelectorConfig = function currencySelectorConfig(_ref, CurrencySelector) {\n  var real_account_signup_target = _ref.real_account_signup_target;\n  var is_appstore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  return {\n    header: {\n      active_title: is_appstore ? (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Select wallet currency') : (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Please choose your currency'),\n      title: is_appstore ? (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('CURRENCY') : (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Account currency')\n    },\n    body: CurrencySelector,\n    form_value: (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_1__.getDefaultFields)(real_account_signup_target, _currency_selector_schema__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n    props: {\n      validate: (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_1__.generateValidationFunction)(real_account_signup_target, _currency_selector_schema__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n    },\n    passthrough: ['legal_allowed_currencies'],\n    icon: 'IcDashboardCurrency'\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (currencySelectorConfig);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db25maWdzL2N1cnJlbmN5LXNlbGVjdG9yLWNvbmZpZy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbmZpZ3MvY3VycmVuY3ktc2VsZWN0b3ItY29uZmlnLmpzP2JhM2QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tICdAZGVyaXYvdHJhbnNsYXRpb25zJztcbmltcG9ydCB7IGdlbmVyYXRlVmFsaWRhdGlvbkZ1bmN0aW9uLCBnZXREZWZhdWx0RmllbGRzIH0gZnJvbSAnQGRlcml2L3NoYXJlZCc7XG5pbXBvcnQgY3VycmVuY3lfc2VsZWN0b3JfY29uZmlnIGZyb20gJy4vY3VycmVuY3ktc2VsZWN0b3Itc2NoZW1hJztcblxuY29uc3QgY3VycmVuY3lTZWxlY3RvckNvbmZpZyA9ICh7IHJlYWxfYWNjb3VudF9zaWdudXBfdGFyZ2V0IH0sIEN1cnJlbmN5U2VsZWN0b3IsIGlzX2FwcHN0b3JlID0gZmFsc2UpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIGFjdGl2ZV90aXRsZTogaXNfYXBwc3RvcmUgPyBsb2NhbGl6ZSgnU2VsZWN0IHdhbGxldCBjdXJyZW5jeScpIDogbG9jYWxpemUoJ1BsZWFzZSBjaG9vc2UgeW91ciBjdXJyZW5jeScpLFxuICAgICAgICAgICAgdGl0bGU6IGlzX2FwcHN0b3JlID8gbG9jYWxpemUoJ0NVUlJFTkNZJykgOiBsb2NhbGl6ZSgnQWNjb3VudCBjdXJyZW5jeScpLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBDdXJyZW5jeVNlbGVjdG9yLFxuICAgICAgICBmb3JtX3ZhbHVlOiBnZXREZWZhdWx0RmllbGRzKHJlYWxfYWNjb3VudF9zaWdudXBfdGFyZ2V0LCBjdXJyZW5jeV9zZWxlY3Rvcl9jb25maWcpLFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IGdlbmVyYXRlVmFsaWRhdGlvbkZ1bmN0aW9uKHJlYWxfYWNjb3VudF9zaWdudXBfdGFyZ2V0LCBjdXJyZW5jeV9zZWxlY3Rvcl9jb25maWcpLFxuICAgICAgICB9LFxuICAgICAgICBwYXNzdGhyb3VnaDogWydsZWdhbF9hbGxvd2VkX2N1cnJlbmNpZXMnXSxcbiAgICAgICAgaWNvbjogJ0ljRGFzaGJvYXJkQ3VycmVuY3knLFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjdXJyZW5jeVNlbGVjdG9yQ29uZmlnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Configs/currency-selector-config.js\n");

/***/ }),

/***/ "./Configs/currency-selector-schema.js":
/*!*********************************************!*\
  !*** ./Configs/currency-selector-schema.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @deriv/translations */ \"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  currency: {\n    supported_in: ['maltainvest', 'malta', 'svg', 'iom'],\n    default_value: '',\n    rules: [['req', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Select an item')]]\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db25maWdzL2N1cnJlbmN5LXNlbGVjdG9yLXNjaGVtYS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db25maWdzL2N1cnJlbmN5LXNlbGVjdG9yLXNjaGVtYS5qcz8wZGVkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSAnQGRlcml2L3RyYW5zbGF0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjdXJyZW5jeToge1xuICAgICAgICBzdXBwb3J0ZWRfaW46IFsnbWFsdGFpbnZlc3QnLCAnbWFsdGEnLCAnc3ZnJywgJ2lvbSddLFxuICAgICAgICBkZWZhdWx0X3ZhbHVlOiAnJyxcbiAgICAgICAgcnVsZXM6IFtbJ3JlcScsIGxvY2FsaXplKCdTZWxlY3QgYW4gaXRlbScpXV0sXG4gICAgfSxcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Configs/currency-selector-schema.js\n");

/***/ }),

/***/ "@deriv/shared":
/*!********************************!*\
  !*** external "@deriv/shared" ***!
  \********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_shared__;

/***/ }),

/***/ "@deriv/translations":
/*!**************************************!*\
  !*** external "@deriv/translations" ***!
  \**************************************/
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Configs/currency-selector-config.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});