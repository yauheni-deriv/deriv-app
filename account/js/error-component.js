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
		module.exports = factory(require("@deriv/components"), require("@deriv/shared"), require("@deriv/translations"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/components", "@deriv/shared", "@deriv/translations", "react"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/account"] = factory(require("@deriv/components"), require("@deriv/shared"), require("@deriv/translations"), require("react"));
	else
		root["@deriv/account"] = factory(root["@deriv/components"], root["@deriv/shared"], root["@deriv/translations"], root["react"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__deriv_components__, __WEBPACK_EXTERNAL_MODULE__deriv_shared__, __WEBPACK_EXTERNAL_MODULE__deriv_translations__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Components/error-component/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ Components_error_component)\n});\n\n// EXTERNAL MODULE: external \"react\"\nvar external_react_ = __webpack_require__(\"react\");\nvar external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);\n// EXTERNAL MODULE: external \"@deriv/components\"\nvar components_ = __webpack_require__(\"@deriv/components\");\n// EXTERNAL MODULE: external \"@deriv/translations\"\nvar translations_ = __webpack_require__(\"@deriv/translations\");\n// EXTERNAL MODULE: external \"@deriv/shared\"\nvar shared_ = __webpack_require__(\"@deriv/shared\");\n;// CONCATENATED MODULE: ./Components/error-component/error-component.tsx\n\n\n\n\n\nvar ErrorComponent = function ErrorComponent(_ref) {\n  var header = _ref.header,\n      message = _ref.message,\n      redirect_label = _ref.redirect_label,\n      redirectOnClick = _ref.redirectOnClick,\n      _ref$should_show_refr = _ref.should_show_refresh,\n      should_show_refresh = _ref$should_show_refr === void 0 ? true : _ref$should_show_refr;\n  var refresh_message = should_show_refresh ? (0,translations_.localize)('Please refresh this page to continue.') : '';\n  return /*#__PURE__*/external_react_default().createElement(components_.PageError, {\n    header: header || (0,translations_.localize)('Oops, something went wrong.'),\n    messages: message ? [message, refresh_message] : [(0,translations_.localize)('Sorry, an error occured while processing your request.'), refresh_message],\n    redirect_urls: [shared_.routes.trade],\n    redirect_labels: [redirect_label || (0,translations_.localize)('Refresh')],\n    buttonOnClick: redirectOnClick || function () {\n      return location.reload();\n    }\n  });\n};\n\n/* harmony default export */ const error_component = (ErrorComponent);\n;// CONCATENATED MODULE: ./Components/error-component/index.js\n\n/* harmony default export */ const Components_error_component = (error_component);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL2Vycm9yLWNvbXBvbmVudC9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBVUE7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFUQTtBQVlBOztBQUVBOztBQ3JDQTtBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db21wb25lbnRzL2Vycm9yLWNvbXBvbmVudC9lcnJvci1jb21wb25lbnQudHN4PzRjODkiLCJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db21wb25lbnRzL2Vycm9yLWNvbXBvbmVudC9pbmRleC5qcz8wOWE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQYWdlRXJyb3IgfSBmcm9tICdAZGVyaXYvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gJ0BkZXJpdi90cmFuc2xhdGlvbnMnO1xuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnQGRlcml2L3NoYXJlZCc7XG5cbnR5cGUgVEVycm9yQ29tcG9uZW50ID0ge1xuICAgIGhlYWRlcjogUmVhY3QuUmVhY3RFbGVtZW50O1xuICAgIG1lc3NhZ2U6IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICByZWRpcmVjdF9sYWJlbDogUmVhY3QuUmVhY3RFbGVtZW50O1xuICAgIHJlZGlyZWN0T25DbGljazogKCkgPT4gdm9pZDtcbiAgICBzaG91bGRfc2hvd19yZWZyZXNoOiBib29sZWFuO1xufTtcblxuY29uc3QgRXJyb3JDb21wb25lbnQgPSAoe1xuICAgIGhlYWRlcixcbiAgICBtZXNzYWdlLFxuICAgIHJlZGlyZWN0X2xhYmVsLFxuICAgIHJlZGlyZWN0T25DbGljayxcbiAgICBzaG91bGRfc2hvd19yZWZyZXNoID0gdHJ1ZSxcbn06IFBhcnRpYWw8VEVycm9yQ29tcG9uZW50PikgPT4ge1xuICAgIGNvbnN0IHJlZnJlc2hfbWVzc2FnZTogc3RyaW5nID0gc2hvdWxkX3Nob3dfcmVmcmVzaCA/IGxvY2FsaXplKCdQbGVhc2UgcmVmcmVzaCB0aGlzIHBhZ2UgdG8gY29udGludWUuJykgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxQYWdlRXJyb3JcbiAgICAgICAgICAgIGhlYWRlcj17aGVhZGVyIHx8IGxvY2FsaXplKCdPb3BzLCBzb21ldGhpbmcgd2VudCB3cm9uZy4nKX1cbiAgICAgICAgICAgIG1lc3NhZ2VzPXtcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgID8gW21lc3NhZ2UsIHJlZnJlc2hfbWVzc2FnZV1cbiAgICAgICAgICAgICAgICAgICAgOiBbbG9jYWxpemUoJ1NvcnJ5LCBhbiBlcnJvciBvY2N1cmVkIHdoaWxlIHByb2Nlc3NpbmcgeW91ciByZXF1ZXN0LicpLCByZWZyZXNoX21lc3NhZ2VdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWRpcmVjdF91cmxzPXtbcm91dGVzLnRyYWRlXX1cbiAgICAgICAgICAgIHJlZGlyZWN0X2xhYmVscz17W3JlZGlyZWN0X2xhYmVsIHx8IGxvY2FsaXplKCdSZWZyZXNoJyldfVxuICAgICAgICAgICAgYnV0dG9uT25DbGljaz17cmVkaXJlY3RPbkNsaWNrIHx8ICgoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKSl9XG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yQ29tcG9uZW50O1xuIiwiaW1wb3J0IEVycm9yQ29tcG9uZW50IGZyb20gJy4vZXJyb3ItY29tcG9uZW50LnRzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yQ29tcG9uZW50O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Components/error-component/index.js\n");

/***/ }),

/***/ "@deriv/components":
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_components__;

/***/ }),

/***/ "@deriv/shared":
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_shared__;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./Components/error-component/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});