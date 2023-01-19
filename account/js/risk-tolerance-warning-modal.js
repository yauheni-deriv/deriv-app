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
})(self, function(__WEBPACK_EXTERNAL_MODULE__deriv_components__, __WEBPACK_EXTERNAL_MODULE__deriv_translations__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Components/trading-assessment/risk-tolerance-warning-modal.jsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"@deriv/components\");\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar RiskToleranceWarningModal = function RiskToleranceWarningModal(_ref) {\n  var show_risk_modal = _ref.show_risk_modal,\n      onClick = _ref.onClick,\n      title = _ref.title,\n      button_text = _ref.button_text,\n      body_content = _ref.body_content,\n      has_icon = _ref.has_icon;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.MobileWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.MobileDialog, {\n    portal_element_id: \"modal_root\",\n    visible: show_risk_modal,\n    title: title,\n    wrapper_classname: \"risk-acceptance\",\n    has_close_icon: false\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {\n    icon: \"IcRedWarning\",\n    size: 65\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Text, {\n    as: \"p\",\n    size: \"xs\",\n    align: \"center\",\n    line_height: \"l\"\n  }, body_content), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Button, {\n    type: \"button\",\n    large: true,\n    text: button_text || (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('OK'),\n    primary: true,\n    onClick: onClick\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.DesktopWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {\n    width: \"44rem\",\n    height: has_icon ? '44rem' : '37.4rem',\n    title: title,\n    is_open: show_risk_modal,\n    has_close_icon: false,\n    className: \"center-risk-modal\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Body, null, has_icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {\n    icon: \"IcRedWarning\",\n    size: 63\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Text, {\n    as: \"p\",\n    size: \"xs\",\n    align: \"center\",\n    line_height: \"0.24rem\",\n    className: \"risk-acceptance__text\"\n  }, body_content)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Button, {\n    type: \"button\",\n    large: true,\n    text: button_text || (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('OK'),\n    primary: true,\n    onClick: onClick\n  })))));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RiskToleranceWarningModal);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3RyYWRpbmctYXNzZXNzbWVudC9yaXNrLXRvbGVyYW5jZS13YXJuaW5nLW1vZGFsLmpzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db21wb25lbnRzL3RyYWRpbmctYXNzZXNzbWVudC9yaXNrLXRvbGVyYW5jZS13YXJuaW5nLW1vZGFsLmpzeD8zMTU2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24sIERlc2t0b3BXcmFwcGVyLCBJY29uLCBNb2JpbGVEaWFsb2csIE1vYmlsZVdyYXBwZXIsIE1vZGFsLCBUZXh0IH0gZnJvbSAnQGRlcml2L2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tICdAZGVyaXYvdHJhbnNsYXRpb25zJztcblxuY29uc3QgUmlza1RvbGVyYW5jZVdhcm5pbmdNb2RhbCA9ICh7IHNob3dfcmlza19tb2RhbCwgb25DbGljaywgdGl0bGUsIGJ1dHRvbl90ZXh0LCBib2R5X2NvbnRlbnQsIGhhc19pY29uIH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICA8TW9iaWxlV3JhcHBlcj5cbiAgICAgICAgICAgICAgICA8TW9iaWxlRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgIHBvcnRhbF9lbGVtZW50X2lkPSdtb2RhbF9yb290J1xuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlPXtzaG93X3Jpc2tfbW9kYWx9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlcl9jbGFzc25hbWU9J3Jpc2stYWNjZXB0YW5jZSdcbiAgICAgICAgICAgICAgICAgICAgaGFzX2Nsb3NlX2ljb249e2ZhbHNlfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEljb24gaWNvbj0nSWNSZWRXYXJuaW5nJyBzaXplPXs2NX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgYXM9J3AnIHNpemU9J3hzJyBhbGlnbj0nY2VudGVyJyBsaW5lX2hlaWdodD0nbCc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Ym9keV9jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT0nYnV0dG9uJyBsYXJnZSB0ZXh0PXtidXR0b25fdGV4dCB8fCBsb2NhbGl6ZSgnT0snKX0gcHJpbWFyeSBvbkNsaWNrPXtvbkNsaWNrfSAvPlxuICAgICAgICAgICAgICAgIDwvTW9iaWxlRGlhbG9nPlxuICAgICAgICAgICAgPC9Nb2JpbGVXcmFwcGVyPlxuICAgICAgICAgICAgPERlc2t0b3BXcmFwcGVyPlxuICAgICAgICAgICAgICAgIDxNb2RhbFxuICAgICAgICAgICAgICAgICAgICB3aWR0aD0nNDRyZW0nXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD17aGFzX2ljb24gPyAnNDRyZW0nIDogJzM3LjRyZW0nfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIGlzX29wZW49e3Nob3dfcmlza19tb2RhbH1cbiAgICAgICAgICAgICAgICAgICAgaGFzX2Nsb3NlX2ljb249e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2NlbnRlci1yaXNrLW1vZGFsJ1xuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aGFzX2ljb24gJiYgPEljb24gaWNvbj0nSWNSZWRXYXJuaW5nJyBzaXplPXs2M30gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBhcz0ncCcgc2l6ZT0neHMnIGFsaWduPSdjZW50ZXInIGxpbmVfaGVpZ2h0PScwLjI0cmVtJyBjbGFzc05hbWU9J3Jpc2stYWNjZXB0YW5jZV9fdGV4dCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2JvZHlfY29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgICAgICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPSdidXR0b24nIGxhcmdlIHRleHQ9e2J1dHRvbl90ZXh0IHx8IGxvY2FsaXplKCdPSycpfSBwcmltYXJ5IG9uQ2xpY2s9e29uQ2xpY2t9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgICAgIDwvTW9kYWw+XG4gICAgICAgICAgICA8L0Rlc2t0b3BXcmFwcGVyPlxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSaXNrVG9sZXJhbmNlV2FybmluZ01vZGFsO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Components/trading-assessment/risk-tolerance-warning-modal.jsx\n");

/***/ }),

/***/ "@deriv/components":
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_components__;

/***/ }),

/***/ "@deriv/translations":
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_translations__;

/***/ }),

/***/ "react":
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Components/trading-assessment/risk-tolerance-warning-modal.jsx");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});