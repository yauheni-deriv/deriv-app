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
		module.exports = factory(require("@deriv/components"), require("@deriv/translations"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/components", "@deriv/translations", "react"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/account"] = factory(require("@deriv/components"), require("@deriv/translations"), require("react"));
	else
		root["@deriv/account"] = factory(root["@deriv/components"], root["@deriv/translations"], root["react"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__deriv_components__, __WEBPACK_EXTERNAL_MODULE__deriv_translations__, __WEBPACK_EXTERNAL_MODULE_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Components/trading-assessment/test-warning-modal.jsx":
/*!**************************************************************!*\
  !*** ./Components/trading-assessment/test-warning-modal.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @deriv/components */ \"@deriv/components\");\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deriv/translations */ \"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar TestWarningModal = function TestWarningModal(_ref) {\n  var show_risk_modal = _ref.show_risk_modal,\n    body_content = _ref.body_content,\n    footer_content = _ref.footer_content;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.MobileWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.MobileDialog, {\n    wrapper_classname: \"test-warning\",\n    portal_element_id: \"modal_root\",\n    visible: show_risk_modal,\n    title: (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('Appropriateness Test Warning'),\n    has_close_icon: false\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Body, null, body_content), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Footer, null, footer_content))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.DesktopWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {\n    width: \"44rem\",\n    has_close_icon: false,\n    title: (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('Appropriateness Test Warning'),\n    is_open: show_risk_modal\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Body, null, body_content), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Footer, null, footer_content))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TestWarningModal);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3RyYWRpbmctYXNzZXNzbWVudC90ZXN0LXdhcm5pbmctbW9kYWwuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQU1BO0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbXBvbmVudHMvdHJhZGluZy1hc3Nlc3NtZW50L3Rlc3Qtd2FybmluZy1tb2RhbC5qc3g/ZmZiZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRGVza3RvcFdyYXBwZXIsIE1vYmlsZURpYWxvZywgTW9iaWxlV3JhcHBlciwgTW9kYWwgfSBmcm9tICdAZGVyaXYvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gJ0BkZXJpdi90cmFuc2xhdGlvbnMnO1xuXG5jb25zdCBUZXN0V2FybmluZ01vZGFsID0gKHsgc2hvd19yaXNrX21vZGFsLCBib2R5X2NvbnRlbnQsIGZvb3Rlcl9jb250ZW50IH0pID0+IChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxNb2JpbGVXcmFwcGVyPlxuICAgICAgICAgICAgPE1vYmlsZURpYWxvZ1xuICAgICAgICAgICAgICAgIHdyYXBwZXJfY2xhc3NuYW1lPSd0ZXN0LXdhcm5pbmcnXG4gICAgICAgICAgICAgICAgcG9ydGFsX2VsZW1lbnRfaWQ9J21vZGFsX3Jvb3QnXG4gICAgICAgICAgICAgICAgdmlzaWJsZT17c2hvd19yaXNrX21vZGFsfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtsb2NhbGl6ZSgnQXBwcm9wcmlhdGVuZXNzIFRlc3QgV2FybmluZycpfVxuICAgICAgICAgICAgICAgIGhhc19jbG9zZV9pY29uPXtmYWxzZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TW9kYWwuQm9keT57Ym9keV9jb250ZW50fTwvTW9kYWwuQm9keT5cbiAgICAgICAgICAgICAgICA8TW9kYWwuRm9vdGVyPntmb290ZXJfY29udGVudH08L01vZGFsLkZvb3Rlcj5cbiAgICAgICAgICAgIDwvTW9iaWxlRGlhbG9nPlxuICAgICAgICA8L01vYmlsZVdyYXBwZXI+XG4gICAgICAgIDxEZXNrdG9wV3JhcHBlcj5cbiAgICAgICAgICAgIDxNb2RhbFxuICAgICAgICAgICAgICAgIHdpZHRoPSc0NHJlbSdcbiAgICAgICAgICAgICAgICBoYXNfY2xvc2VfaWNvbj17ZmFsc2V9XG4gICAgICAgICAgICAgICAgdGl0bGU9e2xvY2FsaXplKCdBcHByb3ByaWF0ZW5lc3MgVGVzdCBXYXJuaW5nJyl9XG4gICAgICAgICAgICAgICAgaXNfb3Blbj17c2hvd19yaXNrX21vZGFsfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxNb2RhbC5Cb2R5Pntib2R5X2NvbnRlbnR9PC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+e2Zvb3Rlcl9jb250ZW50fTwvTW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgPC9EZXNrdG9wV3JhcHBlcj5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgVGVzdFdhcm5pbmdNb2RhbDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/trading-assessment/test-warning-modal.jsx\n");

/***/ }),

/***/ "@deriv/components":
/*!************************************!*\
  !*** external "@deriv/components" ***!
  \************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_components__;

/***/ }),

/***/ "@deriv/translations":
/*!**************************************!*\
  !*** external "@deriv/translations" ***!
  \**************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_translations__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./Components/trading-assessment/test-warning-modal.jsx");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});