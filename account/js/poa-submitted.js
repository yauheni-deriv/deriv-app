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
/******/ 	var __webpack_modules__ = ({

/***/ "./Components/icon-message-content/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ Components_icon_message_content)\n});\n\n// EXTERNAL MODULE: external \"react\"\nvar external_react_ = __webpack_require__(\"react\");\nvar external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);\n// EXTERNAL MODULE: ../../../node_modules/classnames/index.js\nvar classnames = __webpack_require__(\"../../../node_modules/classnames/index.js\");\nvar classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);\n// EXTERNAL MODULE: external \"@deriv/components\"\nvar components_ = __webpack_require__(\"@deriv/components\");\n// EXTERNAL MODULE: external \"@deriv/shared\"\nvar shared_ = __webpack_require__(\"@deriv/shared\");\n;// CONCATENATED MODULE: ./Components/icon-message-content/icon-message-content.tsx\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar IconMessageContent = function IconMessageContent(_ref) {\n  var children = _ref.children,\n      className = _ref.className,\n      full_width = _ref.full_width,\n      icon = _ref.icon,\n      message = _ref.message,\n      text = _ref.text;\n  return /*#__PURE__*/external_react_default().createElement(components_.Div100vhContainer, {\n    className: classnames_default()('account-management__message-wrapper', {\n      'account-management__message-wrapper-full-width': full_width\n    }),\n    is_disabled: (0,shared_.isDesktop)(),\n    height_offset: \"110px\"\n  }, /*#__PURE__*/external_react_default().createElement(\"div\", {\n    className: classnames_default()('account-management__message-content', _defineProperty({}, \"\".concat(className, \"__message-content\"), className))\n  }, icon && /*#__PURE__*/external_react_default().createElement(\"div\", {\n    className: classnames_default()('account-management__message-icon', _defineProperty({}, \"\".concat(className, \"__message-icon\"), className))\n  }, icon), /*#__PURE__*/external_react_default().createElement(components_.Text, {\n    as: \"div\",\n    color: \"general\",\n    weight: \"bold\",\n    size: \"s\",\n    align: \"center\",\n    className: classnames_default()('account-management__message', _defineProperty({}, \"\".concat(className, \"__message\"), className))\n  }, message), text && /*#__PURE__*/external_react_default().createElement(\"div\", {\n    className: \"account-management__text-container\"\n  }, /*#__PURE__*/external_react_default().createElement(components_.Text, {\n    className: classnames_default()(_defineProperty({}, \"\".concat(className, \"__text\"), className)),\n    as: \"p\",\n    size: \"xs\",\n    align: \"center\"\n  }, text)), children));\n};\n\n/* harmony default export */ const icon_message_content = (IconMessageContent);\n;// CONCATENATED MODULE: ./Components/icon-message-content/index.ts\n\n/* harmony default export */ const Components_icon_message_content = (icon_message_content);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL2ljb24tbWVzc2FnZS1jb250ZW50L2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFVQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUxBO0FBUUE7QUFEQTtBQU9BO0FBREE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQWFBO0FBQUE7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQU5BO0FBM0NBOztBQTREQTs7QUN6RUE7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29tcG9uZW50cy9pY29uLW1lc3NhZ2UtY29udGVudC9pY29uLW1lc3NhZ2UtY29udGVudC50c3g/MDBlMCIsIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbXBvbmVudHMvaWNvbi1tZXNzYWdlLWNvbnRlbnQvaW5kZXgudHM/N2ZmNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBEaXYxMDB2aENvbnRhaW5lciwgVGV4dCB9IGZyb20gJ0BkZXJpdi9jb21wb25lbnRzJztcbmltcG9ydCB7IGlzRGVza3RvcCB9IGZyb20gJ0BkZXJpdi9zaGFyZWQnO1xuXG50eXBlIFRJY29uTWVzc2FnZUNvbnRlbnQgPSB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIGZ1bGxfd2lkdGg/OiBib29sZWFuO1xuICAgIGljb246IFJlYWN0LlJlYWN0RWxlbWVudDtcbiAgICBtZXNzYWdlOiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgdGV4dD86IHN0cmluZyB8IFJlYWN0LlJlYWN0RWxlbWVudDtcbn07XG5cbmNvbnN0IEljb25NZXNzYWdlQ29udGVudCA9ICh7XG4gICAgY2hpbGRyZW4sXG4gICAgY2xhc3NOYW1lLFxuICAgIGZ1bGxfd2lkdGgsXG4gICAgaWNvbixcbiAgICBtZXNzYWdlLFxuICAgIHRleHQsXG59OiBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjxUSWNvbk1lc3NhZ2VDb250ZW50PikgPT4gKFxuICAgIDxEaXYxMDB2aENvbnRhaW5lclxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2FjY291bnQtbWFuYWdlbWVudF9fbWVzc2FnZS13cmFwcGVyJywge1xuICAgICAgICAgICAgJ2FjY291bnQtbWFuYWdlbWVudF9fbWVzc2FnZS13cmFwcGVyLWZ1bGwtd2lkdGgnOiBmdWxsX3dpZHRoLFxuICAgICAgICB9KX1cbiAgICAgICAgaXNfZGlzYWJsZWQ9e2lzRGVza3RvcCgpfVxuICAgICAgICBoZWlnaHRfb2Zmc2V0PScxMTBweCdcbiAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnYWNjb3VudC1tYW5hZ2VtZW50X19tZXNzYWdlLWNvbnRlbnQnLCB7XG4gICAgICAgICAgICAgICAgW2Ake2NsYXNzTmFtZX1fX21lc3NhZ2UtY29udGVudGBdOiBjbGFzc05hbWUsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPlxuICAgICAgICAgICAge2ljb24gJiYgKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdhY2NvdW50LW1hbmFnZW1lbnRfX21lc3NhZ2UtaWNvbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgJHtjbGFzc05hbWV9X19tZXNzYWdlLWljb25gXTogY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpY29ufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgYXM9J2RpdidcbiAgICAgICAgICAgICAgICBjb2xvcj0nZ2VuZXJhbCdcbiAgICAgICAgICAgICAgICB3ZWlnaHQ9J2JvbGQnXG4gICAgICAgICAgICAgICAgc2l6ZT0ncydcbiAgICAgICAgICAgICAgICBhbGlnbj0nY2VudGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnYWNjb3VudC1tYW5hZ2VtZW50X19tZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICBbYCR7Y2xhc3NOYW1lfV9fbWVzc2FnZWBdOiBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICB7dGV4dCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FjY291bnQtbWFuYWdlbWVudF9fdGV4dC1jb250YWluZXInPlxuICAgICAgICAgICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYCR7Y2xhc3NOYW1lfV9fdGV4dGBdOiBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFzPSdwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT0neHMnXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbj0nY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgPC9EaXYxMDB2aENvbnRhaW5lcj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEljb25NZXNzYWdlQ29udGVudDtcbiIsImltcG9ydCBJY29uTWVzc2FnZUNvbnRlbnQgZnJvbSAnLi9pY29uLW1lc3NhZ2UtY29udGVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IEljb25NZXNzYWdlQ29udGVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/icon-message-content/index.ts\n");

/***/ }),

/***/ "./Components/poa/continue-trading-button/continue-trading-button.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"M\": () => (/* binding */ ContinueTradingButton)\n/* harmony export */ });\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"@deriv/components\");\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar ContinueTradingButton = function ContinueTradingButton() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_0__.ButtonLink, {\n    className: \"account-management__button\",\n    to: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_0__.Text, {\n    className: \"dc-btn__text\",\n    as: \"p\",\n    weight: \"bold\",\n    \"data-testid\": \"continue_btn_text\"\n  }, (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_1__.localize)('Continue trading')));\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3BvYS9jb250aW51ZS10cmFkaW5nLWJ1dHRvbi9jb250aW51ZS10cmFkaW5nLWJ1dHRvbi50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29tcG9uZW50cy9wb2EvY29udGludWUtdHJhZGluZy1idXR0b24vY29udGludWUtdHJhZGluZy1idXR0b24udHN4P2IzM2EiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnV0dG9uTGluaywgVGV4dCB9IGZyb20gJ0BkZXJpdi9jb21wb25lbnRzJztcbmltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSAnQGRlcml2L3RyYW5zbGF0aW9ucyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgQ29udGludWVUcmFkaW5nQnV0dG9uID0gKCkgPT4gKFxuICAgIDxCdXR0b25MaW5rIGNsYXNzTmFtZT0nYWNjb3VudC1tYW5hZ2VtZW50X19idXR0b24nIHRvPScvJz5cbiAgICAgICAgPFRleHQgY2xhc3NOYW1lPSdkYy1idG5fX3RleHQnIGFzPSdwJyB3ZWlnaHQ9J2JvbGQnIGRhdGEtdGVzdGlkPSdjb250aW51ZV9idG5fdGV4dCc+XG4gICAgICAgICAgICB7bG9jYWxpemUoJ0NvbnRpbnVlIHRyYWRpbmcnKX1cbiAgICAgICAgPC9UZXh0PlxuICAgIDwvQnV0dG9uTGluaz5cbik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Components/poa/continue-trading-button/continue-trading-button.tsx\n");

/***/ }),

/***/ "./Components/poa/status/submitted/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ submitted)\n});\n\n// EXTERNAL MODULE: external \"react\"\nvar external_react_ = __webpack_require__(\"react\");\nvar external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);\n// EXTERNAL MODULE: ../../../node_modules/classnames/index.js\nvar classnames = __webpack_require__(\"../../../node_modules/classnames/index.js\");\nvar classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);\n// EXTERNAL MODULE: external \"@deriv/components\"\nvar components_ = __webpack_require__(\"@deriv/components\");\n// EXTERNAL MODULE: external \"@deriv/translations\"\nvar translations_ = __webpack_require__(\"@deriv/translations\");\n// EXTERNAL MODULE: external \"@deriv/shared\"\nvar shared_ = __webpack_require__(\"@deriv/shared\");\n// EXTERNAL MODULE: ./Components/poa/continue-trading-button/continue-trading-button.tsx\nvar continue_trading_button = __webpack_require__(\"./Components/poa/continue-trading-button/continue-trading-button.tsx\");\n// EXTERNAL MODULE: ./Components/poi/poi-button/index.js\nvar poi_button = __webpack_require__(\"./Components/poi/poi-button/index.js\");\n// EXTERNAL MODULE: ./Components/icon-message-content/index.ts + 1 modules\nvar icon_message_content = __webpack_require__(\"./Components/icon-message-content/index.ts\");\n;// CONCATENATED MODULE: ./Components/poa/status/submitted/submitted.tsx\n\n\n\n\n\n\n\n\nvar Submitted = function Submitted(_ref) {\n  var needs_poi = _ref.needs_poi,\n      _ref$is_description_e = _ref.is_description_enabled,\n      is_description_enabled = _ref$is_description_e === void 0 ? true : _ref$is_description_e;\n\n  var _React$useContext = external_react_default().useContext(shared_.PlatformContext),\n      is_appstore = _React$useContext.is_appstore;\n\n  var message = (0,translations_.localize)('Your documents were submitted successfully');\n\n  if (needs_poi) {\n    return /*#__PURE__*/external_react_default().createElement(\"div\", {\n      className: classnames_default()('account-management__container', {\n        'account-management__container-dashboard': is_appstore\n      })\n    }, /*#__PURE__*/external_react_default().createElement(icon_message_content[\"default\"], {\n      message: message,\n      icon: /*#__PURE__*/external_react_default().createElement(components_.Icon, {\n        icon: \"IcPoaVerified\",\n        size: 128\n      }),\n      full_width: is_appstore\n    }, /*#__PURE__*/external_react_default().createElement(\"div\", {\n      className: \"account-management__text-container\"\n    }, /*#__PURE__*/external_react_default().createElement(components_.Text, {\n      align: \"center\",\n      size: \"xs\",\n      as: \"p\"\n    }, (0,translations_.localize)('We’ll review your documents and notify you of its status within 1 to 3 days.')), /*#__PURE__*/external_react_default().createElement(components_.Text, {\n      align: \"center\",\n      size: \"xs\",\n      as: \"p\"\n    }, (0,translations_.localize)('You must also submit a proof of identity.'))), /*#__PURE__*/external_react_default().createElement(poi_button/* default */.Z, null)));\n  }\n\n  return /*#__PURE__*/external_react_default().createElement(\"div\", {\n    className: classnames_default()('account-management__container', {\n      'account-management__container-dashboard': is_appstore\n    })\n  }, /*#__PURE__*/external_react_default().createElement(icon_message_content[\"default\"], {\n    message: message,\n    text: (0,translations_.localize)('We’ll review your documents and notify you of its status within 1 to 3 days.'),\n    icon: /*#__PURE__*/external_react_default().createElement(components_.Icon, {\n      icon: \"IcPoaVerified\",\n      size: 128\n    }),\n    full_width: is_appstore\n  }, !is_description_enabled && /*#__PURE__*/external_react_default().createElement(continue_trading_button/* ContinueTradingButton */.M, null)));\n};\n;// CONCATENATED MODULE: ./Components/poa/status/submitted/index.ts\n\n/* harmony default export */ const submitted = (Submitted);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3BvYS9zdGF0dXMvc3VibWl0dGVkL2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTs7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBREE7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBUUE7O0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSkE7QUFVQTs7QUN0REE7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29tcG9uZW50cy9wb2Evc3RhdHVzL3N1Ym1pdHRlZC9zdWJtaXR0ZWQudHN4P2I0NTQiLCJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db21wb25lbnRzL3BvYS9zdGF0dXMvc3VibWl0dGVkL2luZGV4LnRzPzY1NzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiwgVGV4dCB9IGZyb20gJ0BkZXJpdi9jb21wb25lbnRzJztcbmltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSAnQGRlcml2L3RyYW5zbGF0aW9ucyc7XG5pbXBvcnQgeyBQbGF0Zm9ybUNvbnRleHQgfSBmcm9tICdAZGVyaXYvc2hhcmVkJztcbmltcG9ydCB7IFRQbGF0Zm9ybUNvbnRleHQsIFRQb2FTdGF0dXNQcm9wcyB9IGZyb20gJ1R5cGVzJztcbmltcG9ydCB7IENvbnRpbnVlVHJhZGluZ0J1dHRvbiB9IGZyb20gJ0NvbXBvbmVudHMvcG9hL2NvbnRpbnVlLXRyYWRpbmctYnV0dG9uL2NvbnRpbnVlLXRyYWRpbmctYnV0dG9uJztcbmltcG9ydCBQb2lCdXR0b24gZnJvbSAnQ29tcG9uZW50cy9wb2kvcG9pLWJ1dHRvbic7XG5pbXBvcnQgSWNvbk1lc3NhZ2VDb250ZW50IGZyb20gJ0NvbXBvbmVudHMvaWNvbi1tZXNzYWdlLWNvbnRlbnQnO1xuXG5leHBvcnQgY29uc3QgU3VibWl0dGVkID0gKHsgbmVlZHNfcG9pLCBpc19kZXNjcmlwdGlvbl9lbmFibGVkID0gdHJ1ZSB9OiBUUG9hU3RhdHVzUHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGlzX2FwcHN0b3JlIH06IFRQbGF0Zm9ybUNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KFBsYXRmb3JtQ29udGV4dCk7XG4gICAgY29uc3QgbWVzc2FnZSA9IGxvY2FsaXplKCdZb3VyIGRvY3VtZW50cyB3ZXJlIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICBpZiAobmVlZHNfcG9pKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdhY2NvdW50LW1hbmFnZW1lbnRfX2NvbnRhaW5lcicsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2FjY291bnQtbWFuYWdlbWVudF9fY29udGFpbmVyLWRhc2hib2FyZCc6IGlzX2FwcHN0b3JlLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxJY29uTWVzc2FnZUNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PEljb24gaWNvbj0nSWNQb2FWZXJpZmllZCcgc2l6ZT17MTI4fSAvPn1cbiAgICAgICAgICAgICAgICAgICAgZnVsbF93aWR0aD17aXNfYXBwc3RvcmV9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYWNjb3VudC1tYW5hZ2VtZW50X190ZXh0LWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBhbGlnbj0nY2VudGVyJyBzaXplPSd4cycgYXM9J3AnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsb2NhbGl6ZSgnV2XigJlsbCByZXZpZXcgeW91ciBkb2N1bWVudHMgYW5kIG5vdGlmeSB5b3Ugb2YgaXRzIHN0YXR1cyB3aXRoaW4gMSB0byAzIGRheXMuJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBhbGlnbj0nY2VudGVyJyBzaXplPSd4cycgYXM9J3AnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsb2NhbGl6ZSgnWW91IG11c3QgYWxzbyBzdWJtaXQgYSBwcm9vZiBvZiBpZGVudGl0eS4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxQb2lCdXR0b24gLz5cbiAgICAgICAgICAgICAgICA8L0ljb25NZXNzYWdlQ29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2FjY291bnQtbWFuYWdlbWVudF9fY29udGFpbmVyJywge1xuICAgICAgICAgICAgICAgICdhY2NvdW50LW1hbmFnZW1lbnRfX2NvbnRhaW5lci1kYXNoYm9hcmQnOiBpc19hcHBzdG9yZSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICA+XG4gICAgICAgICAgICA8SWNvbk1lc3NhZ2VDb250ZW50XG4gICAgICAgICAgICAgICAgbWVzc2FnZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICB0ZXh0PXtsb2NhbGl6ZSgnV2XigJlsbCByZXZpZXcgeW91ciBkb2N1bWVudHMgYW5kIG5vdGlmeSB5b3Ugb2YgaXRzIHN0YXR1cyB3aXRoaW4gMSB0byAzIGRheXMuJyl9XG4gICAgICAgICAgICAgICAgaWNvbj17PEljb24gaWNvbj0nSWNQb2FWZXJpZmllZCcgc2l6ZT17MTI4fSAvPn1cbiAgICAgICAgICAgICAgICBmdWxsX3dpZHRoPXtpc19hcHBzdG9yZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IWlzX2Rlc2NyaXB0aW9uX2VuYWJsZWQgJiYgPENvbnRpbnVlVHJhZGluZ0J1dHRvbiAvPn1cbiAgICAgICAgICAgIDwvSWNvbk1lc3NhZ2VDb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcbiIsImltcG9ydCB7IFN1Ym1pdHRlZCBhcyBQb2FTdWJtaXR0ZWQgfSBmcm9tICcuL3N1Ym1pdHRlZCc7XG5cbmV4cG9ydCBkZWZhdWx0IFBvYVN1Ym1pdHRlZDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/poa/status/submitted/index.ts\n");

/***/ }),

/***/ "./Components/poi/poi-button/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Z\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _poi_button_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./Components/poi/poi-button/poi-button.jsx\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_poi_button_jsx__WEBPACK_IMPORTED_MODULE_0__/* .PoiButton */ .x);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3BvaS9wb2ktYnV0dG9uL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db21wb25lbnRzL3BvaS9wb2ktYnV0dG9uL2luZGV4LmpzP2UyZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9pQnV0dG9uIH0gZnJvbSAnLi9wb2ktYnV0dG9uLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IFBvaUJ1dHRvbjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/poi/poi-button/index.js\n");

/***/ }),

/***/ "./Components/poi/poi-button/poi-button.jsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"x\": () => (/* binding */ PoiButton)\n/* harmony export */ });\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"@deriv/components\");\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar PoiButton = function PoiButton() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_0__.ButtonLink, {\n    className: \"account-management__button\",\n    to: \"/account/proof-of-identity\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_0__.Text, {\n    className: \"dc-btn__text\",\n    weight: \"bold\",\n    as: \"p\"\n  }, (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_1__.localize)('Proof of identity')));\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3BvaS9wb2ktYnV0dG9uL3BvaS1idXR0b24uanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUZBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi9Db21wb25lbnRzL3BvaS9wb2ktYnV0dG9uL3BvaS1idXR0b24uanN4Pzc0ZjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnV0dG9uTGluaywgVGV4dCB9IGZyb20gJ0BkZXJpdi9jb21wb25lbnRzJztcbmltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSAnQGRlcml2L3RyYW5zbGF0aW9ucyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgUG9pQnV0dG9uID0gKCkgPT4gKFxuICAgIDxCdXR0b25MaW5rIGNsYXNzTmFtZT0nYWNjb3VudC1tYW5hZ2VtZW50X19idXR0b24nIHRvPScvYWNjb3VudC9wcm9vZi1vZi1pZGVudGl0eSc+XG4gICAgICAgIDxUZXh0IGNsYXNzTmFtZT0nZGMtYnRuX190ZXh0JyB3ZWlnaHQ9J2JvbGQnIGFzPSdwJz5cbiAgICAgICAgICAgIHtsb2NhbGl6ZSgnUHJvb2Ygb2YgaWRlbnRpdHknKX1cbiAgICAgICAgPC9UZXh0PlxuICAgIDwvQnV0dG9uTGluaz5cbik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Components/poi/poi-button/poi-button.jsx\n");

/***/ }),

/***/ "../../../node_modules/classnames/index.js":
/***/ ((module, exports) => {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!\n\tCopyright (c) 2018 Jed Watson.\n\tLicensed under the MIT License (MIT), see\n\thttp://jedwatson.github.io/classnames\n*/\n/* global define */\n\n(function () {\n\t'use strict';\n\n\tvar hasOwn = {}.hasOwnProperty;\n\tvar nativeCodeString = '[native code]';\n\n\tfunction classNames() {\n\t\tvar classes = [];\n\n\t\tfor (var i = 0; i < arguments.length; i++) {\n\t\t\tvar arg = arguments[i];\n\t\t\tif (!arg) continue;\n\n\t\t\tvar argType = typeof arg;\n\n\t\t\tif (argType === 'string' || argType === 'number') {\n\t\t\t\tclasses.push(arg);\n\t\t\t} else if (Array.isArray(arg)) {\n\t\t\t\tif (arg.length) {\n\t\t\t\t\tvar inner = classNames.apply(null, arg);\n\t\t\t\t\tif (inner) {\n\t\t\t\t\t\tclasses.push(inner);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else if (argType === 'object') {\n\t\t\t\tif (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {\n\t\t\t\t\tclasses.push(arg.toString());\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\tfor (var key in arg) {\n\t\t\t\t\tif (hasOwn.call(arg, key) && arg[key]) {\n\t\t\t\t\t\tclasses.push(key);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn classes.join(' ');\n\t}\n\n\tif ( true && module.exports) {\n\t\tclassNames.default = classNames;\n\t\tmodule.exports = classNames;\n\t} else if (true) {\n\t\t// register as 'classnames', consistent with npm package name\n\t\t!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n\t\t\treturn classNames;\n\t\t}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n}());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzPzNkY2QiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG5cdENvcHlyaWdodCAoYykgMjAxOCBKZWQgV2F0c29uLlxuXHRMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuXHRodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXHR2YXIgbmF0aXZlQ29kZVN0cmluZyA9ICdbbmF0aXZlIGNvZGVdJztcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRpZiAoYXJnLmxlbmd0aCkge1xuXHRcdFx0XHRcdHZhciBpbm5lciA9IGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdFx0XHRpZiAoaW5uZXIpIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../../node_modules/classnames/index.js\n");

/***/ }),

/***/ "@deriv/components":
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_components__;

/***/ }),

/***/ "@deriv/shared":
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_shared__;

/***/ }),

/***/ "@deriv/translations":
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_translations__;

/***/ }),

/***/ "react":
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Components/poa/status/submitted/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});