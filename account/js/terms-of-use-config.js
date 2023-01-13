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

/***/ "./Configs/terms-of-use-config.js":
/*!****************************************!*\
  !*** ./Configs/terms-of-use-config.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @deriv/shared */ \"@deriv/shared\");\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_shared__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @deriv/translations */ \"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar terms_of_use_config = {\n  agreed_tos: {\n    supported_in: ['svg', 'iom'],\n    default_value: false\n  },\n  agreed_tnc: {\n    supported_in: ['svg', 'iom'],\n    default_value: false\n  }\n};\nvar termsOfUseConfig = function termsOfUseConfig(_ref, TermsOfUse) {\n  var real_account_signup_target = _ref.real_account_signup_target;\n  var is_appstore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var active_title = is_appstore ? (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_1__.localize)('Our terms of use') : (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_1__.localize)('Terms of use');\n  return {\n    header: {\n      active_title: (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_0__.isDesktop)() ? active_title : null,\n      title: is_appstore ? (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_1__.localize)('TERMS OF USE') : (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_1__.localize)('Terms of use')\n    },\n    body: TermsOfUse,\n    form_value: (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_0__.getDefaultFields)(real_account_signup_target, terms_of_use_config),\n    props: {\n      real_account_signup_target: real_account_signup_target\n    },\n    icon: 'IcDashboardTermsOfUse'\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (termsOfUseConfig);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db25maWdzL3Rlcm1zLW9mLXVzZS1jb25maWcuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbmZpZ3MvdGVybXMtb2YtdXNlLWNvbmZpZy5qcz8yZDhjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGVza3RvcCwgZ2V0RGVmYXVsdEZpZWxkcyB9IGZyb20gJ0BkZXJpdi9zaGFyZWQnO1xuaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tICdAZGVyaXYvdHJhbnNsYXRpb25zJztcblxuY29uc3QgdGVybXNfb2ZfdXNlX2NvbmZpZyA9IHtcbiAgICBhZ3JlZWRfdG9zOiB7XG4gICAgICAgIHN1cHBvcnRlZF9pbjogWydzdmcnLCAnaW9tJ10sXG4gICAgICAgIGRlZmF1bHRfdmFsdWU6IGZhbHNlLFxuICAgIH0sXG4gICAgYWdyZWVkX3RuYzoge1xuICAgICAgICBzdXBwb3J0ZWRfaW46IFsnc3ZnJywgJ2lvbSddLFxuICAgICAgICBkZWZhdWx0X3ZhbHVlOiBmYWxzZSxcbiAgICB9LFxufTtcblxuY29uc3QgdGVybXNPZlVzZUNvbmZpZyA9ICh7IHJlYWxfYWNjb3VudF9zaWdudXBfdGFyZ2V0IH0sIFRlcm1zT2ZVc2UsIGlzX2FwcHN0b3JlID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCBhY3RpdmVfdGl0bGUgPSBpc19hcHBzdG9yZSA/IGxvY2FsaXplKCdPdXIgdGVybXMgb2YgdXNlJykgOiBsb2NhbGl6ZSgnVGVybXMgb2YgdXNlJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBhY3RpdmVfdGl0bGU6IGlzRGVza3RvcCgpID8gYWN0aXZlX3RpdGxlIDogbnVsbCxcbiAgICAgICAgICAgIHRpdGxlOiBpc19hcHBzdG9yZSA/IGxvY2FsaXplKCdURVJNUyBPRiBVU0UnKSA6IGxvY2FsaXplKCdUZXJtcyBvZiB1c2UnKSxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogVGVybXNPZlVzZSxcbiAgICAgICAgZm9ybV92YWx1ZTogZ2V0RGVmYXVsdEZpZWxkcyhyZWFsX2FjY291bnRfc2lnbnVwX3RhcmdldCwgdGVybXNfb2ZfdXNlX2NvbmZpZyksXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICByZWFsX2FjY291bnRfc2lnbnVwX3RhcmdldCxcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogJ0ljRGFzaGJvYXJkVGVybXNPZlVzZScsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlcm1zT2ZVc2VDb25maWc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Configs/terms-of-use-config.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./Configs/terms-of-use-config.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});