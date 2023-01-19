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

/***/ "./Components/poi-poa-docs-submitted/poi-poa-docs-submitted.jsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"@deriv/components\");\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(\"@deriv/shared\");\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_deriv_shared__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var Components_icon_message_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(\"./Components/icon-message-content/index.ts\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\nvar PoiPoaDocsSubmitted = function PoiPoaDocsSubmitted(_ref) {\n  var account_status = _ref.account_status,\n      jurisdiction_selected_shortcode = _ref.jurisdiction_selected_shortcode,\n      onClickOK = _ref.onClickOK,\n      updateAccountStatus = _ref.updateAccountStatus,\n      has_created_account_for_selected_jurisdiction = _ref.has_created_account_for_selected_jurisdiction,\n      openPasswordModal = _ref.openPasswordModal;\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      is_loading = _React$useState2[0],\n      setIsLoading = _React$useState2[1];\n\n  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {\n    setIsLoading(true);\n    updateAccountStatus().then(function () {\n      setIsLoading(false);\n    })[\"finally\"](function () {\n      return setIsLoading(false);\n    }); //eslint-disable-next-line react-hooks/exhaustive-deps\n  }, []);\n\n  var onSubmit = function onSubmit() {\n    onClickOK();\n\n    if (!has_created_account_for_selected_jurisdiction) {\n      openPasswordModal();\n    }\n  };\n\n  var getDescription = function getDescription() {\n    var _getAuthenticationSta = (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_3__.getAuthenticationStatusInfo)(account_status),\n        manual_status = _getAuthenticationSta.manual_status,\n        poi_verified_for_vanuatu_maltainvest = _getAuthenticationSta.poi_verified_for_vanuatu_maltainvest,\n        poi_verified_for_bvi_labuan = _getAuthenticationSta.poi_verified_for_bvi_labuan,\n        poa_pending = _getAuthenticationSta.poa_pending;\n\n    var is_vanuatu_or_maltainvest_selected = jurisdiction_selected_shortcode === 'vanuatu' || jurisdiction_selected_shortcode === 'maltainvest';\n\n    if (is_vanuatu_or_maltainvest_selected && poi_verified_for_vanuatu_maltainvest && poa_pending || !is_vanuatu_or_maltainvest_selected && poi_verified_for_bvi_labuan && poa_pending || manual_status === 'pending') {\n      return (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('We’ll review your documents and notify you of its status within 1 - 3 working days.');\n    }\n\n    return (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('We’ll review your documents and notify you of its status within 5 minutes.');\n  };\n\n  return is_loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Loading, {\n    is_fullscreen: false\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Components_icon_message_content__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    message: (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('Your documents were submitted successfully'),\n    text: getDescription(),\n    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {\n      icon: \"IcDocsSubmit\",\n      size: 128\n    }),\n    className: \"poi-poa-submitted\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Button, {\n    has_effect: true,\n    text: (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_2__.localize)('Ok'),\n    onClick: onSubmit,\n    primary: true\n  }));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PoiPoaDocsSubmitted);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3BvaS1wb2EtZG9jcy1zdWJtaXR0ZWQvcG9pLXBvYS1kb2NzLXN1Ym1pdHRlZC5qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBOztBQUVBO0FBS0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSkE7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7O0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbXBvbmVudHMvcG9pLXBvYS1kb2NzLXN1Ym1pdHRlZC9wb2ktcG9hLWRvY3Mtc3VibWl0dGVkLmpzeD84YTBlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24sIEljb24sIExvYWRpbmcgfSBmcm9tICdAZGVyaXYvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gJ0BkZXJpdi90cmFuc2xhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0QXV0aGVudGljYXRpb25TdGF0dXNJbmZvIH0gZnJvbSAnQGRlcml2L3NoYXJlZCc7XG5pbXBvcnQgSWNvbk1lc3NhZ2VDb250ZW50IGZyb20gJ0NvbXBvbmVudHMvaWNvbi1tZXNzYWdlLWNvbnRlbnQnO1xuXG5jb25zdCBQb2lQb2FEb2NzU3VibWl0dGVkID0gKHtcbiAgICBhY2NvdW50X3N0YXR1cyxcbiAgICBqdXJpc2RpY3Rpb25fc2VsZWN0ZWRfc2hvcnRjb2RlLFxuICAgIG9uQ2xpY2tPSyxcbiAgICB1cGRhdGVBY2NvdW50U3RhdHVzLFxuICAgIGhhc19jcmVhdGVkX2FjY291bnRfZm9yX3NlbGVjdGVkX2p1cmlzZGljdGlvbixcbiAgICBvcGVuUGFzc3dvcmRNb2RhbCxcbn0pID0+IHtcbiAgICBjb25zdCBbaXNfbG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHVwZGF0ZUFjY291bnRTdGF0dXMoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gc2V0SXNMb2FkaW5nKGZhbHNlKSk7XG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IG9uU3VibWl0ID0gKCkgPT4ge1xuICAgICAgICBvbkNsaWNrT0soKTtcbiAgICAgICAgaWYgKCFoYXNfY3JlYXRlZF9hY2NvdW50X2Zvcl9zZWxlY3RlZF9qdXJpc2RpY3Rpb24pIHtcbiAgICAgICAgICAgIG9wZW5QYXNzd29yZE1vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbWFudWFsX3N0YXR1cywgcG9pX3ZlcmlmaWVkX2Zvcl92YW51YXR1X21hbHRhaW52ZXN0LCBwb2lfdmVyaWZpZWRfZm9yX2J2aV9sYWJ1YW4sIHBvYV9wZW5kaW5nIH0gPVxuICAgICAgICAgICAgZ2V0QXV0aGVudGljYXRpb25TdGF0dXNJbmZvKGFjY291bnRfc3RhdHVzKTtcbiAgICAgICAgY29uc3QgaXNfdmFudWF0dV9vcl9tYWx0YWludmVzdF9zZWxlY3RlZCA9XG4gICAgICAgICAgICBqdXJpc2RpY3Rpb25fc2VsZWN0ZWRfc2hvcnRjb2RlID09PSAndmFudWF0dScgfHwganVyaXNkaWN0aW9uX3NlbGVjdGVkX3Nob3J0Y29kZSA9PT0gJ21hbHRhaW52ZXN0JztcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGlzX3ZhbnVhdHVfb3JfbWFsdGFpbnZlc3Rfc2VsZWN0ZWQgJiYgcG9pX3ZlcmlmaWVkX2Zvcl92YW51YXR1X21hbHRhaW52ZXN0ICYmIHBvYV9wZW5kaW5nKSB8fFxuICAgICAgICAgICAgKCFpc192YW51YXR1X29yX21hbHRhaW52ZXN0X3NlbGVjdGVkICYmIHBvaV92ZXJpZmllZF9mb3JfYnZpX2xhYnVhbiAmJiBwb2FfcGVuZGluZykgfHxcbiAgICAgICAgICAgIG1hbnVhbF9zdGF0dXMgPT09ICdwZW5kaW5nJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGl6ZSgnV2XigJlsbCByZXZpZXcgeW91ciBkb2N1bWVudHMgYW5kIG5vdGlmeSB5b3Ugb2YgaXRzIHN0YXR1cyB3aXRoaW4gMSAtIDMgd29ya2luZyBkYXlzLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZSgnV2XigJlsbCByZXZpZXcgeW91ciBkb2N1bWVudHMgYW5kIG5vdGlmeSB5b3Ugb2YgaXRzIHN0YXR1cyB3aXRoaW4gNSBtaW51dGVzLicpO1xuICAgIH07XG4gICAgcmV0dXJuIGlzX2xvYWRpbmcgPyAoXG4gICAgICAgIDxMb2FkaW5nIGlzX2Z1bGxzY3JlZW49e2ZhbHNlfSAvPlxuICAgICkgOiAoXG4gICAgICAgIDxJY29uTWVzc2FnZUNvbnRlbnRcbiAgICAgICAgICAgIG1lc3NhZ2U9e2xvY2FsaXplKCdZb3VyIGRvY3VtZW50cyB3ZXJlIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHknKX1cbiAgICAgICAgICAgIHRleHQ9e2dldERlc2NyaXB0aW9uKCl9XG4gICAgICAgICAgICBpY29uPXs8SWNvbiBpY29uPSdJY0RvY3NTdWJtaXQnIHNpemU9ezEyOH0gLz59XG4gICAgICAgICAgICBjbGFzc05hbWU9J3BvaS1wb2Etc3VibWl0dGVkJ1xuICAgICAgICA+XG4gICAgICAgICAgICA8QnV0dG9uIGhhc19lZmZlY3QgdGV4dD17bG9jYWxpemUoJ09rJyl9IG9uQ2xpY2s9e29uU3VibWl0fSBwcmltYXJ5IC8+XG4gICAgICAgIDwvSWNvbk1lc3NhZ2VDb250ZW50PlxuICAgICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUG9pUG9hRG9jc1N1Ym1pdHRlZDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/poi-poa-docs-submitted/poi-poa-docs-submitted.jsx\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./Components/poi-poa-docs-submitted/poi-poa-docs-submitted.jsx");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});