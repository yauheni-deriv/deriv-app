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

/***/ "./Components/trading-assessment/risk-tolerance-warning-modal.jsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"@deriv/components\");\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar RiskToleranceWarningModal = function RiskToleranceWarningModal(_ref) {\n  var show_risk_modal = _ref.show_risk_modal,\n    onClick = _ref.onClick,\n    title = _ref.title,\n    button_text = _ref.button_text,\n    body_content = _ref.body_content,\n    has_icon = _ref.has_icon;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.MobileWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.MobileDialog, {\n    portal_element_id: \"modal_root\",\n    visible: show_risk_modal,\n    title: title,\n    wrapper_classname: \"risk-acceptance\",\n    has_close_icon: false\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {\n    icon: \"IcRedWarning\",\n    size: 65\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Text, {\n    as: \"p\",\n    size: \"xs\",\n    align: \"center\",\n    line_height: \"l\"\n  }, body_content), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Button, {\n    type: \"button\",\n    large: true,\n    text: button_text || (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('OK'),\n    primary: true,\n    onClick: onClick\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.DesktopWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {\n    width: \"44rem\",\n    height: has_icon ? '44rem' : '37.4rem',\n    title: title,\n    is_open: show_risk_modal,\n    has_close_icon: false,\n    className: \"center-risk-modal\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Body, null, has_icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {\n    icon: \"IcRedWarning\",\n    size: 63\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Text, {\n    as: \"p\",\n    size: \"xs\",\n    align: \"center\",\n    line_height: \"0.24rem\",\n    className: \"risk-acceptance__text\"\n  }, body_content)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Button, {\n    type: \"button\",\n    large: true,\n    text: button_text || (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('OK'),\n    primary: true,\n    onClick: onClick\n  })))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RiskToleranceWarningModal);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3RyYWRpbmctYXNzZXNzbWVudC9yaXNrLXRvbGVyYW5jZS13YXJuaW5nLW1vZGFsLmpzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29tcG9uZW50cy90cmFkaW5nLWFzc2Vzc21lbnQvcmlzay10b2xlcmFuY2Utd2FybmluZy1tb2RhbC5qc3g/MzE1NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBEZXNrdG9wV3JhcHBlciwgSWNvbiwgTW9iaWxlRGlhbG9nLCBNb2JpbGVXcmFwcGVyLCBNb2RhbCwgVGV4dCB9IGZyb20gJ0BkZXJpdi9jb21wb25lbnRzJztcbmltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSAnQGRlcml2L3RyYW5zbGF0aW9ucyc7XG5cbmNvbnN0IFJpc2tUb2xlcmFuY2VXYXJuaW5nTW9kYWwgPSAoeyBzaG93X3Jpc2tfbW9kYWwsIG9uQ2xpY2ssIHRpdGxlLCBidXR0b25fdGV4dCwgYm9keV9jb250ZW50LCBoYXNfaWNvbiB9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgPE1vYmlsZVdyYXBwZXI+XG4gICAgICAgICAgICAgICAgPE1vYmlsZURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICBwb3J0YWxfZWxlbWVudF9pZD0nbW9kYWxfcm9vdCdcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZT17c2hvd19yaXNrX21vZGFsfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJfY2xhc3NuYW1lPSdyaXNrLWFjY2VwdGFuY2UnXG4gICAgICAgICAgICAgICAgICAgIGhhc19jbG9zZV9pY29uPXtmYWxzZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxJY29uIGljb249J0ljUmVkV2FybmluZycgc2l6ZT17NjV9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGFzPSdwJyBzaXplPSd4cycgYWxpZ249J2NlbnRlcicgbGluZV9oZWlnaHQ9J2wnPlxuICAgICAgICAgICAgICAgICAgICAgICAge2JvZHlfY29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9J2J1dHRvbicgbGFyZ2UgdGV4dD17YnV0dG9uX3RleHQgfHwgbG9jYWxpemUoJ09LJyl9IHByaW1hcnkgb25DbGljaz17b25DbGlja30gLz5cbiAgICAgICAgICAgICAgICA8L01vYmlsZURpYWxvZz5cbiAgICAgICAgICAgIDwvTW9iaWxlV3JhcHBlcj5cbiAgICAgICAgICAgIDxEZXNrdG9wV3JhcHBlcj5cbiAgICAgICAgICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9JzQ0cmVtJ1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e2hhc19pY29uID8gJzQ0cmVtJyA6ICczNy40cmVtJ31cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgICBpc19vcGVuPXtzaG93X3Jpc2tfbW9kYWx9XG4gICAgICAgICAgICAgICAgICAgIGhhc19jbG9zZV9pY29uPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdjZW50ZXItcmlzay1tb2RhbCdcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAge2hhc19pY29uICYmIDxJY29uIGljb249J0ljUmVkV2FybmluZycgc2l6ZT17NjN9IC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgYXM9J3AnIHNpemU9J3hzJyBhbGlnbj0nY2VudGVyJyBsaW5lX2hlaWdodD0nMC4yNHJlbScgY2xhc3NOYW1lPSdyaXNrLWFjY2VwdGFuY2VfX3RleHQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib2R5X2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgICAgICAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT0nYnV0dG9uJyBsYXJnZSB0ZXh0PXtidXR0b25fdGV4dCB8fCBsb2NhbGl6ZSgnT0snKX0gcHJpbWFyeSBvbkNsaWNrPXtvbkNsaWNrfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICAgPC9EZXNrdG9wV3JhcHBlcj5cbiAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmlza1RvbGVyYW5jZVdhcm5pbmdNb2RhbDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/trading-assessment/risk-tolerance-warning-modal.jsx\n");

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