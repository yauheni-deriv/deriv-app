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
		module.exports = factory(require("@deriv/components"), require("@deriv/shared"), require("@deriv/translations"), require("mobx-react"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/components", "@deriv/shared", "@deriv/translations", "mobx-react", "react"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/account"] = factory(require("@deriv/components"), require("@deriv/shared"), require("@deriv/translations"), require("mobx-react"), require("react"));
	else
		root["@deriv/account"] = factory(root["@deriv/components"], root["@deriv/shared"], root["@deriv/translations"], root["mobx-react"], root["react"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__deriv_components__, __WEBPACK_EXTERNAL_MODULE__deriv_shared__, __WEBPACK_EXTERNAL_MODULE__deriv_translations__, __WEBPACK_EXTERNAL_MODULE_mobx_react__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Components/demo-message/demo-message.tsx":
/*!**************************************************!*\
  !*** ./Components/demo-message/demo-message.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @deriv/translations */ \"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var Components_icon_with_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Components/icon-with-message */ \"./Components/icon-with-message/index.ts\");\n\n\n\n\nvar DemoMessage = function DemoMessage(_ref) {\n  var has_demo_icon = _ref.has_demo_icon,\n      has_button = _ref.has_button;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Components_icon_with_message__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    icon: has_demo_icon ? 'IcPoaLockDemo' : 'IcPoaLock',\n    message: (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_1__.localize)('This feature is not available for demo accounts.'),\n    has_button: has_button\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DemoMessage);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL2RlbW8tbWVzc2FnZS9kZW1vLW1lc3NhZ2UudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBREE7O0FBUUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbXBvbmVudHMvZGVtby1tZXNzYWdlL2RlbW8tbWVzc2FnZS50c3g/MWFmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tICdAZGVyaXYvdHJhbnNsYXRpb25zJztcbmltcG9ydCBJY29uV2l0aE1lc3NhZ2UgZnJvbSAnQ29tcG9uZW50cy9pY29uLXdpdGgtbWVzc2FnZSc7XG5cbnR5cGUgVERlbW9NZXNzYWdlID0ge1xuICAgIGhhc19kZW1vX2ljb24/OiBib29sZWFuO1xuICAgIGhhc19idXR0b24/OiBib29sZWFuO1xufTtcblxuY29uc3QgRGVtb01lc3NhZ2UgPSAoeyBoYXNfZGVtb19pY29uLCBoYXNfYnV0dG9uIH06IFREZW1vTWVzc2FnZSkgPT4gKFxuICAgIDxJY29uV2l0aE1lc3NhZ2VcbiAgICAgICAgaWNvbj17aGFzX2RlbW9faWNvbiA/ICdJY1BvYUxvY2tEZW1vJyA6ICdJY1BvYUxvY2snfVxuICAgICAgICBtZXNzYWdlPXtsb2NhbGl6ZSgnVGhpcyBmZWF0dXJlIGlzIG5vdCBhdmFpbGFibGUgZm9yIGRlbW8gYWNjb3VudHMuJyl9XG4gICAgICAgIGhhc19idXR0b249e2hhc19idXR0b259XG4gICAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IERlbW9NZXNzYWdlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Components/demo-message/demo-message.tsx\n");

/***/ }),

/***/ "./Components/demo-message/index.ts":
/*!******************************************!*\
  !*** ./Components/demo-message/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _demo_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo-message */ \"./Components/demo-message/demo-message.tsx\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_demo_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL2RlbW8tbWVzc2FnZS9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbXBvbmVudHMvZGVtby1tZXNzYWdlL2luZGV4LnRzP2E2OWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlbW9NZXNzYWdlIGZyb20gJy4vZGVtby1tZXNzYWdlJztcblxuZXhwb3J0IGRlZmF1bHQgRGVtb01lc3NhZ2U7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Components/demo-message/index.ts\n");

/***/ }),

/***/ "./Components/icon-with-message/icon-with-message.tsx":
/*!************************************************************!*\
  !*** ./Components/icon-with-message/icon-with-message.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"../../../node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deriv/components */ \"@deriv/components\");\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_deriv_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deriv/shared */ \"@deriv/shared\");\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_deriv_shared__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @deriv/translations */ \"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var Stores_connect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Stores/connect */ \"./Stores/connect.js\");\n\n\n\n\n\n\n\nvar IconWithMessage = function IconWithMessage(_ref) {\n  var has_button = _ref.has_button,\n      has_real_account = _ref.has_real_account,\n      icon = _ref.icon,\n      message = _ref.message,\n      toggleAccountsDialog = _ref.toggleAccountsDialog,\n      toggleShouldShowRealAccountsList = _ref.toggleShouldShowRealAccountsList;\n\n  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(_deriv_shared__WEBPACK_IMPORTED_MODULE_3__.PlatformContext),\n      is_appstore = _React$useContext.is_appstore;\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('da-icon-with-message', {\n      'da-icon-with-message-full-width': is_appstore\n    })\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {\n    icon: icon,\n    size: 128\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_2__.Text, {\n    className: \"da-icon-with-message__text\",\n    as: \"p\",\n    color: \"general\",\n    size: (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_3__.isMobile)() ? 'xs' : 's',\n    line_height: \"m\",\n    weight: \"bold\"\n  }, message), has_button && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_2__.Button, {\n    primary: true,\n    onClick: function onClick() {\n      toggleShouldShowRealAccountsList(true);\n      toggleAccountsDialog();\n    },\n    className: \"account__demo-message-button\",\n    \"data-testid\": \"icon-with-message-button\"\n  }, has_real_account ? (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_4__.localize)('Switch to real account') : (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_4__.localize)('Add a real account')));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,Stores_connect__WEBPACK_IMPORTED_MODULE_5__.connect)(function (_ref2) {\n  var client = _ref2.client,\n      ui = _ref2.ui;\n  return {\n    has_real_account: client.has_any_real_account,\n    toggleAccountsDialog: ui.toggleAccountsDialog,\n    toggleShouldShowRealAccountsList: ui.toggleShouldShowRealAccountsList\n  };\n})(IconWithMessage));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL2ljb24td2l0aC1tZXNzYWdlL2ljb24td2l0aC1tZXNzYWdlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBYUE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBY0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db21wb25lbnRzL2ljb24td2l0aC1tZXNzYWdlL2ljb24td2l0aC1tZXNzYWdlLnRzeD9hZDM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24sIFRleHQsIEJ1dHRvbiB9IGZyb20gJ0BkZXJpdi9jb21wb25lbnRzJztcbmltcG9ydCB7IGlzTW9iaWxlLCBQbGF0Zm9ybUNvbnRleHQgfSBmcm9tICdAZGVyaXYvc2hhcmVkJztcbmltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSAnQGRlcml2L3RyYW5zbGF0aW9ucyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnU3RvcmVzL2Nvbm5lY3QnO1xuaW1wb3J0IHsgVFBsYXRmb3JtQ29udGV4dCB9IGZyb20gJ1R5cGVzJztcbmltcG9ydCBSb290U3RvcmUgZnJvbSAnU3RvcmVzL2luZGV4JztcblxudHlwZSBUSWNvbldpdGhNZXNzYWdlID0ge1xuICAgIGljb246IHN0cmluZztcbiAgICBoYXNfYnV0dG9uPzogYm9vbGVhbjtcbiAgICBoYXNfcmVhbF9hY2NvdW50PzogYm9vbGVhbjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdG9nZ2xlQWNjb3VudHNEaWFsb2c6IChzdGF0dXM/OiBib29sZWFuKSA9PiB2b2lkO1xuICAgIHRvZ2dsZVNob3VsZFNob3dSZWFsQWNjb3VudHNMaXN0OiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG59O1xuXG5jb25zdCBJY29uV2l0aE1lc3NhZ2UgPSAoe1xuICAgIGhhc19idXR0b24sXG4gICAgaGFzX3JlYWxfYWNjb3VudCxcbiAgICBpY29uLFxuICAgIG1lc3NhZ2UsXG4gICAgdG9nZ2xlQWNjb3VudHNEaWFsb2csXG4gICAgdG9nZ2xlU2hvdWxkU2hvd1JlYWxBY2NvdW50c0xpc3QsXG59OiBUSWNvbldpdGhNZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBpc19hcHBzdG9yZSB9OiBQYXJ0aWFsPFRQbGF0Zm9ybUNvbnRleHQ+ID0gUmVhY3QudXNlQ29udGV4dChQbGF0Zm9ybUNvbnRleHQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2RhLWljb24td2l0aC1tZXNzYWdlJywgeyAnZGEtaWNvbi13aXRoLW1lc3NhZ2UtZnVsbC13aWR0aCc6IGlzX2FwcHN0b3JlIH0pfT5cbiAgICAgICAgICAgIDxJY29uIGljb249e2ljb259IHNpemU9ezEyOH0gLz5cbiAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdkYS1pY29uLXdpdGgtbWVzc2FnZV9fdGV4dCdcbiAgICAgICAgICAgICAgICBhcz0ncCdcbiAgICAgICAgICAgICAgICBjb2xvcj0nZ2VuZXJhbCdcbiAgICAgICAgICAgICAgICBzaXplPXtpc01vYmlsZSgpID8gJ3hzJyA6ICdzJ31cbiAgICAgICAgICAgICAgICBsaW5lX2hlaWdodD0nbSdcbiAgICAgICAgICAgICAgICB3ZWlnaHQ9J2JvbGQnXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICB7aGFzX2J1dHRvbiAmJiAoXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVNob3VsZFNob3dSZWFsQWNjb3VudHNMaXN0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWNjb3VudHNEaWFsb2coKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhY2NvdW50X19kZW1vLW1lc3NhZ2UtYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICBkYXRhLXRlc3RpZD0naWNvbi13aXRoLW1lc3NhZ2UtYnV0dG9uJ1xuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2hhc19yZWFsX2FjY291bnQgPyBsb2NhbGl6ZSgnU3dpdGNoIHRvIHJlYWwgYWNjb3VudCcpIDogbG9jYWxpemUoJ0FkZCBhIHJlYWwgYWNjb3VudCcpfVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKHsgY2xpZW50LCB1aSB9OiBSb290U3RvcmUpID0+ICh7XG4gICAgaGFzX3JlYWxfYWNjb3VudDogY2xpZW50Lmhhc19hbnlfcmVhbF9hY2NvdW50LFxuICAgIHRvZ2dsZUFjY291bnRzRGlhbG9nOiB1aS50b2dnbGVBY2NvdW50c0RpYWxvZyxcbiAgICB0b2dnbGVTaG91bGRTaG93UmVhbEFjY291bnRzTGlzdDogdWkudG9nZ2xlU2hvdWxkU2hvd1JlYWxBY2NvdW50c0xpc3QsXG59KSkoSWNvbldpdGhNZXNzYWdlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/icon-with-message/icon-with-message.tsx\n");

/***/ }),

/***/ "./Components/icon-with-message/index.ts":
/*!***********************************************!*\
  !*** ./Components/icon-with-message/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _icon_with_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icon-with-message */ \"./Components/icon-with-message/icon-with-message.tsx\");\n/* harmony import */ var _icon_with_message_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon-with-message.scss */ \"./Components/icon-with-message/icon-with-message.scss\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_icon_with_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL2ljb24td2l0aC1tZXNzYWdlL2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29tcG9uZW50cy9pY29uLXdpdGgtbWVzc2FnZS9pbmRleC50cz9jNWRiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJY29uV2l0aE1lc3NhZ2UgZnJvbSAnLi9pY29uLXdpdGgtbWVzc2FnZSc7XG5pbXBvcnQgJy4vaWNvbi13aXRoLW1lc3NhZ2Uuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IEljb25XaXRoTWVzc2FnZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/icon-with-message/index.ts\n");

/***/ }),

/***/ "./Stores/connect.js":
/*!***************************!*\
  !*** ./Stores/connect.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MobxContent\": () => (/* binding */ MobxContent),\n/* harmony export */   \"MobxContentProvider\": () => (/* binding */ MobxContentProvider),\n/* harmony export */   \"connect\": () => (/* binding */ connect)\n/* harmony export */ });\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx-react */ \"mobx-react\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx_react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar isClassComponent = function isClassComponent(Component) {\n  return !!(typeof Component === 'function' && Component.prototype && Component.prototype.isReactComponent);\n};\n\nvar MobxContent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext(null);\n\nfunction injectStorePropsToComponent(propsToSelectFn, BaseComponent) {\n  var Component = function Component(own_props) {\n    var store = react__WEBPACK_IMPORTED_MODULE_1___default().useContext(MobxContent);\n    var ObservedComponent = BaseComponent;\n\n    if (isClassComponent(BaseComponent)) {\n      var FunctionalWrapperComponent = function FunctionalWrapperComponent(props) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(BaseComponent, props);\n      };\n\n      ObservedComponent = FunctionalWrapperComponent;\n    }\n\n    return (0,mobx_react__WEBPACK_IMPORTED_MODULE_0__.useObserver)(function () {\n      return ObservedComponent(_objectSpread(_objectSpread({}, own_props), propsToSelectFn(store, own_props)));\n    });\n  };\n\n  Component.displayName = BaseComponent.name;\n  return Component;\n}\n\nvar MobxContentProvider = function MobxContentProvider(_ref) {\n  var store = _ref.store,\n      children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(MobxContent.Provider, {\n    value: _objectSpread(_objectSpread({}, store), {}, {\n      mobxStores: store\n    })\n  }, children);\n};\nvar connect = function connect(propsToSelectFn) {\n  return function (Component) {\n    return injectStorePropsToComponent(propsToSelectFn, Component);\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9TdG9yZXMvY29ubmVjdC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUFBO0FBQUE7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vU3RvcmVzL2Nvbm5lY3QuanM/NDc2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VPYnNlcnZlciB9IGZyb20gJ21vYngtcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgaXNDbGFzc0NvbXBvbmVudCA9IENvbXBvbmVudCA9PlxuICAgICEhKHR5cGVvZiBDb21wb25lbnQgPT09ICdmdW5jdGlvbicgJiYgQ29tcG9uZW50LnByb3RvdHlwZSAmJiBDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQpO1xuXG5leHBvcnQgY29uc3QgTW9ieENvbnRlbnQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpO1xuXG5mdW5jdGlvbiBpbmplY3RTdG9yZVByb3BzVG9Db21wb25lbnQocHJvcHNUb1NlbGVjdEZuLCBCYXNlQ29tcG9uZW50KSB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gb3duX3Byb3BzID0+IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBSZWFjdC51c2VDb250ZXh0KE1vYnhDb250ZW50KTtcblxuICAgICAgICBsZXQgT2JzZXJ2ZWRDb21wb25lbnQgPSBCYXNlQ29tcG9uZW50O1xuXG4gICAgICAgIGlmIChpc0NsYXNzQ29tcG9uZW50KEJhc2VDb21wb25lbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBGdW5jdGlvbmFsV3JhcHBlckNvbXBvbmVudCA9IHByb3BzID0+IDxCYXNlQ29tcG9uZW50IHsuLi5wcm9wc30gLz47XG4gICAgICAgICAgICBPYnNlcnZlZENvbXBvbmVudCA9IEZ1bmN0aW9uYWxXcmFwcGVyQ29tcG9uZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVzZU9ic2VydmVyKCgpID0+IE9ic2VydmVkQ29tcG9uZW50KHsgLi4ub3duX3Byb3BzLCAuLi5wcm9wc1RvU2VsZWN0Rm4oc3RvcmUsIG93bl9wcm9wcykgfSkpO1xuICAgIH07XG5cbiAgICBDb21wb25lbnQuZGlzcGxheU5hbWUgPSBCYXNlQ29tcG9uZW50Lm5hbWU7XG4gICAgcmV0dXJuIENvbXBvbmVudDtcbn1cblxuZXhwb3J0IGNvbnN0IE1vYnhDb250ZW50UHJvdmlkZXIgPSAoeyBzdG9yZSwgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiA8TW9ieENvbnRlbnQuUHJvdmlkZXIgdmFsdWU9e3sgLi4uc3RvcmUsIG1vYnhTdG9yZXM6IHN0b3JlIH19PntjaGlsZHJlbn08L01vYnhDb250ZW50LlByb3ZpZGVyPjtcbn07XG5cbmV4cG9ydCBjb25zdCBjb25uZWN0ID0gcHJvcHNUb1NlbGVjdEZuID0+IENvbXBvbmVudCA9PiBpbmplY3RTdG9yZVByb3BzVG9Db21wb25lbnQocHJvcHNUb1NlbGVjdEZuLCBDb21wb25lbnQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Stores/connect.js\n");

/***/ }),

/***/ "../../../node_modules/classnames/index.js":
/*!*************************************************!*\
  !*** ../../../node_modules/classnames/index.js ***!
  \*************************************************/
/***/ ((module, exports) => {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!\n\tCopyright (c) 2018 Jed Watson.\n\tLicensed under the MIT License (MIT), see\n\thttp://jedwatson.github.io/classnames\n*/\n/* global define */\n\n(function () {\n\t'use strict';\n\n\tvar hasOwn = {}.hasOwnProperty;\n\tvar nativeCodeString = '[native code]';\n\n\tfunction classNames() {\n\t\tvar classes = [];\n\n\t\tfor (var i = 0; i < arguments.length; i++) {\n\t\t\tvar arg = arguments[i];\n\t\t\tif (!arg) continue;\n\n\t\t\tvar argType = typeof arg;\n\n\t\t\tif (argType === 'string' || argType === 'number') {\n\t\t\t\tclasses.push(arg);\n\t\t\t} else if (Array.isArray(arg)) {\n\t\t\t\tif (arg.length) {\n\t\t\t\t\tvar inner = classNames.apply(null, arg);\n\t\t\t\t\tif (inner) {\n\t\t\t\t\t\tclasses.push(inner);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else if (argType === 'object') {\n\t\t\t\tif (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {\n\t\t\t\t\tclasses.push(arg.toString());\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\tfor (var key in arg) {\n\t\t\t\t\tif (hasOwn.call(arg, key) && arg[key]) {\n\t\t\t\t\t\tclasses.push(key);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn classes.join(' ');\n\t}\n\n\tif ( true && module.exports) {\n\t\tclassNames.default = classNames;\n\t\tmodule.exports = classNames;\n\t} else if (true) {\n\t\t// register as 'classnames', consistent with npm package name\n\t\t!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n\t\t\treturn classNames;\n\t\t}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n}());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzPzNkY2QiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG5cdENvcHlyaWdodCAoYykgMjAxOCBKZWQgV2F0c29uLlxuXHRMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuXHRodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXHR2YXIgbmF0aXZlQ29kZVN0cmluZyA9ICdbbmF0aXZlIGNvZGVdJztcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRpZiAoYXJnLmxlbmd0aCkge1xuXHRcdFx0XHRcdHZhciBpbm5lciA9IGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdFx0XHRpZiAoaW5uZXIpIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../../node_modules/classnames/index.js\n");

/***/ }),

/***/ "./Components/icon-with-message/icon-with-message.scss":
/*!*************************************************************!*\
  !*** ./Components/icon-with-message/icon-with-message.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL2ljb24td2l0aC1tZXNzYWdlL2ljb24td2l0aC1tZXNzYWdlLnNjc3MuanMiLCJtYXBwaW5ncyI6IjtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db21wb25lbnRzL2ljb24td2l0aC1tZXNzYWdlL2ljb24td2l0aC1tZXNzYWdlLnNjc3M/NTMyMiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Components/icon-with-message/icon-with-message.scss\n");

/***/ }),

/***/ "@deriv/components":
/*!************************************!*\
  !*** external "@deriv/components" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_components__;

/***/ }),

/***/ "@deriv/shared":
/*!********************************!*\
  !*** external "@deriv/shared" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_shared__;

/***/ }),

/***/ "@deriv/translations":
/*!**************************************!*\
  !*** external "@deriv/translations" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_translations__;

/***/ }),

/***/ "mobx-react":
/*!*****************************!*\
  !*** external "mobx-react" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_mobx_react__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
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
/******/ 	var __webpack_exports__ = __webpack_require__("./Components/demo-message/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});