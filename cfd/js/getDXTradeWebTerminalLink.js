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
		module.exports = factory(require("@deriv/shared"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/shared"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/cfd"] = factory(require("@deriv/shared"));
	else
		root["@deriv/cfd"] = factory(root["@deriv/shared"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__deriv_shared__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Helpers/constants.ts":
/*!**********************************!*\
  !*** ./src/Helpers/constants.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getBrokerName\": () => (/* binding */ getBrokerName),\n/* harmony export */   \"getDXTradeWebTerminalLink\": () => (/* binding */ getDXTradeWebTerminalLink),\n/* harmony export */   \"getMT5WebTerminalLink\": () => (/* binding */ getMT5WebTerminalLink),\n/* harmony export */   \"getPlatformDXTradeDownloadLink\": () => (/* binding */ getPlatformDXTradeDownloadLink),\n/* harmony export */   \"getPlatformMt5DownloadLink\": () => (/* binding */ getPlatformMt5DownloadLink),\n/* harmony export */   \"getTopUpConfig\": () => (/* binding */ getTopUpConfig)\n/* harmony export */ });\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @deriv/shared */ \"@deriv/shared\");\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_shared__WEBPACK_IMPORTED_MODULE_0__);\n\nvar REAL_DXTRADE_URL = 'https://dx.deriv.com';\nvar DEMO_DXTRADE_URL = 'https://dx-demo.deriv.com';\nvar DXTRADE_IOS_APP_URL = 'https://apps.apple.com/us/app/deriv-x/id1563337503';\nvar DXTRADE_ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.deriv.dx';\nvar DXTRADE_HUAWEI_APP_URL = 'https://appgallery.huawei.com/app/C104633219';\nvar getBrokerName = function getBrokerName() {\n  return 'Deriv Limited';\n};\nvar getTopUpConfig = function getTopUpConfig() {\n  return {\n    minimum_amount: 1000,\n    additional_amount: 10000\n  };\n};\nvar getPlatformDXTradeDownloadLink = function getPlatformDXTradeDownloadLink(platform) {\n  switch (platform) {\n    case 'ios':\n      return DXTRADE_IOS_APP_URL;\n    case 'huawei':\n      return DXTRADE_HUAWEI_APP_URL;\n    default:\n      return DXTRADE_ANDROID_APP_URL;\n  }\n};\nvar getPlatformMt5DownloadLink = function getPlatformMt5DownloadLink() {\n  var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;\n  switch (platform || (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_0__.OSDetect)()) {\n    case 'windows':\n      return 'https://download.mql5.com/cdn/web/deriv.limited/mt5/derivmt5setup.exe';\n    case 'linux':\n      return 'https://www.metatrader5.com/en/terminal/help/start_advanced/install_linux';\n    case 'macos':\n      return 'https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.dmg';\n    case 'huawei':\n      return 'https://appgallery.huawei.com/#/app/C102015329';\n    case 'android':\n      return 'https://download.mql5.com/cdn/mobile/mt5/android?server=Deriv-Demo,Deriv-Server';\n    default:\n      return getMT5WebTerminalLink({\n        category: 'real'\n      });\n    // Web\n  }\n};\n\nvar getDXTradeWebTerminalLink = function getDXTradeWebTerminalLink(category, token) {\n  var url = category === 'real' ? REAL_DXTRADE_URL : DEMO_DXTRADE_URL;\n  if (token) {\n    url += \"?token=\".concat(token);\n  }\n  return url;\n};\nvar getMT5WebTerminalLink = function getMT5WebTerminalLink(_ref) {\n  var category = _ref.category,\n    loginid = _ref.loginid,\n    _ref$server_name = _ref.server_name,\n    server_name = _ref$server_name === void 0 ? 'Deriv-Server' : _ref$server_name;\n  var is_demo = category === 'demo';\n  var server = is_demo ? 'Deriv-Demo' : server_name;\n  var login = loginid !== null && loginid !== void 0 ? loginid : '';\n  return \"https://trade.mql5.com/trade?servers=\".concat(server, \"&trade_server=\").concat(server).concat(login && \"&login=\".concat(login));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvSGVscGVycy9jb25zdGFudHMudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQVFBO0FBTkE7QUFBQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9jZmQvLi9zcmMvSGVscGVycy9jb25zdGFudHMudHM/ZGIwZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPU0RldGVjdCB9IGZyb20gJ0BkZXJpdi9zaGFyZWQnO1xuXG5jb25zdCBSRUFMX0RYVFJBREVfVVJMID0gJ2h0dHBzOi8vZHguZGVyaXYuY29tJztcbmNvbnN0IERFTU9fRFhUUkFERV9VUkwgPSAnaHR0cHM6Ly9keC1kZW1vLmRlcml2LmNvbSc7XG5cbmNvbnN0IERYVFJBREVfSU9TX0FQUF9VUkwgPSAnaHR0cHM6Ly9hcHBzLmFwcGxlLmNvbS91cy9hcHAvZGVyaXYteC9pZDE1NjMzMzc1MDMnO1xuY29uc3QgRFhUUkFERV9BTkRST0lEX0FQUF9VUkwgPSAnaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPWNvbS5kZXJpdi5keCc7XG5jb25zdCBEWFRSQURFX0hVQVdFSV9BUFBfVVJMID0gJ2h0dHBzOi8vYXBwZ2FsbGVyeS5odWF3ZWkuY29tL2FwcC9DMTA0NjMzMjE5JztcblxuY29uc3QgZ2V0QnJva2VyTmFtZSA9ICgpID0+ICdEZXJpdiBMaW1pdGVkJztcblxuY29uc3QgZ2V0VG9wVXBDb25maWcgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWluaW11bV9hbW91bnQ6IDEwMDAsXG4gICAgICAgIGFkZGl0aW9uYWxfYW1vdW50OiAxMDAwMCxcbiAgICB9O1xufTtcblxuY29uc3QgZ2V0UGxhdGZvcm1EWFRyYWRlRG93bmxvYWRMaW5rID0gKHBsYXRmb3JtOiAnaW9zJyB8ICdhbmRyb2lkJyB8ICdodWF3ZWknKSA9PiB7XG4gICAgc3dpdGNoIChwbGF0Zm9ybSkge1xuICAgICAgICBjYXNlICdpb3MnOlxuICAgICAgICAgICAgcmV0dXJuIERYVFJBREVfSU9TX0FQUF9VUkw7XG4gICAgICAgIGNhc2UgJ2h1YXdlaSc6XG4gICAgICAgICAgICByZXR1cm4gRFhUUkFERV9IVUFXRUlfQVBQX1VSTDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBEWFRSQURFX0FORFJPSURfQVBQX1VSTDtcbiAgICB9XG59O1xuXG5jb25zdCBnZXRQbGF0Zm9ybU10NURvd25sb2FkTGluayA9IChwbGF0Zm9ybTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKSA9PiB7XG4gICAgc3dpdGNoIChwbGF0Zm9ybSB8fCBPU0RldGVjdCgpKSB7XG4gICAgICAgIGNhc2UgJ3dpbmRvd3MnOlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Rvd25sb2FkLm1xbDUuY29tL2Nkbi93ZWIvZGVyaXYubGltaXRlZC9tdDUvZGVyaXZtdDVzZXR1cC5leGUnO1xuICAgICAgICBjYXNlICdsaW51eCc6XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vd3d3Lm1ldGF0cmFkZXI1LmNvbS9lbi90ZXJtaW5hbC9oZWxwL3N0YXJ0X2FkdmFuY2VkL2luc3RhbGxfbGludXgnO1xuICAgICAgICBjYXNlICdtYWNvcyc6XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vZG93bmxvYWQubXFsNS5jb20vY2RuL3dlYi9tZXRhcXVvdGVzLnNvZnR3YXJlLmNvcnAvbXQ1L01ldGFUcmFkZXI1LmRtZyc7XG4gICAgICAgIGNhc2UgJ2h1YXdlaSc6XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vYXBwZ2FsbGVyeS5odWF3ZWkuY29tLyMvYXBwL0MxMDIwMTUzMjknO1xuICAgICAgICBjYXNlICdhbmRyb2lkJzpcbiAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9kb3dubG9hZC5tcWw1LmNvbS9jZG4vbW9iaWxlL210NS9hbmRyb2lkP3NlcnZlcj1EZXJpdi1EZW1vLERlcml2LVNlcnZlcic7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TVQ1V2ViVGVybWluYWxMaW5rKHsgY2F0ZWdvcnk6ICdyZWFsJyB9KTsgLy8gV2ViXG4gICAgfVxufTtcblxuY29uc3QgZ2V0RFhUcmFkZVdlYlRlcm1pbmFsTGluayA9IChjYXRlZ29yeTogc3RyaW5nLCB0b2tlbj86IHN0cmluZykgPT4ge1xuICAgIGxldCB1cmwgPSBjYXRlZ29yeSA9PT0gJ3JlYWwnID8gUkVBTF9EWFRSQURFX1VSTCA6IERFTU9fRFhUUkFERV9VUkw7XG5cbiAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgdXJsICs9IGA/dG9rZW49JHt0b2tlbn1gO1xuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG59O1xuXG5jb25zdCBnZXRNVDVXZWJUZXJtaW5hbExpbmsgPSAoe1xuICAgIGNhdGVnb3J5LFxuICAgIGxvZ2luaWQsXG4gICAgc2VydmVyX25hbWUgPSAnRGVyaXYtU2VydmVyJyxcbn06IHtcbiAgICBjYXRlZ29yeT86IHN0cmluZztcbiAgICBsb2dpbmlkPzogc3RyaW5nO1xuICAgIHNlcnZlcl9uYW1lPzogc3RyaW5nO1xufSkgPT4ge1xuICAgIGNvbnN0IGlzX2RlbW8gPSBjYXRlZ29yeSA9PT0gJ2RlbW8nO1xuICAgIGNvbnN0IHNlcnZlciA9IGlzX2RlbW8gPyAnRGVyaXYtRGVtbycgOiBzZXJ2ZXJfbmFtZTtcbiAgICBjb25zdCBsb2dpbiA9IGxvZ2luaWQgPz8gJyc7XG5cbiAgICByZXR1cm4gYGh0dHBzOi8vdHJhZGUubXFsNS5jb20vdHJhZGU/c2VydmVycz0ke3NlcnZlcn0mdHJhZGVfc2VydmVyPSR7c2VydmVyfSR7bG9naW4gJiYgYCZsb2dpbj0ke2xvZ2lufWB9YDtcbn07XG5cbmV4cG9ydCB7XG4gICAgZ2V0QnJva2VyTmFtZSxcbiAgICBnZXRQbGF0Zm9ybURYVHJhZGVEb3dubG9hZExpbmssXG4gICAgZ2V0UGxhdGZvcm1NdDVEb3dubG9hZExpbmssXG4gICAgZ2V0RFhUcmFkZVdlYlRlcm1pbmFsTGluayxcbiAgICBnZXRNVDVXZWJUZXJtaW5hbExpbmssXG4gICAgZ2V0VG9wVXBDb25maWcsXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Helpers/constants.ts\n");

/***/ }),

/***/ "@deriv/shared":
/*!********************************!*\
  !*** external "@deriv/shared" ***!
  \********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_shared__;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Helpers/constants.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});