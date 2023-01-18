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

/***/ "./Components/sent-email-modal/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ Components_sent_email_modal)\n});\n\n// EXTERNAL MODULE: external \"react\"\nvar external_react_ = __webpack_require__(\"react\");\nvar external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);\n// EXTERNAL MODULE: external \"@deriv/translations\"\nvar translations_ = __webpack_require__(\"@deriv/translations\");\n// EXTERNAL MODULE: external \"@deriv/components\"\nvar components_ = __webpack_require__(\"@deriv/components\");\n// EXTERNAL MODULE: external \"@deriv/shared\"\nvar shared_ = __webpack_require__(\"@deriv/shared\");\n;// CONCATENATED MODULE: ./Components/sent-email-modal/sent-email-modal.tsx\n\n\n\n\n\nvar getNoEmailContentStrings = function getNoEmailContentStrings() {\n  return [{\n    key: 'email_spam',\n    icon: 'IcEmailSpam',\n    content: (0,translations_.localize)('The email is in your spam folder (Sometimes things get lost there).')\n  }, {\n    key: 'wrong_email',\n    icon: 'IcEmail',\n    content: (0,translations_.localize)('You accidentally gave us another email address (Usually a work or a personal one instead of the one you meant).')\n  }, {\n    key: 'wrong_typo',\n    icon: 'IcEmailTypo',\n    content: (0,translations_.localize)('The email address you entered had a mistake or typo (happens to the best of us).')\n  }, {\n    key: 'email_firewall',\n    icon: 'IcEmailFirewall',\n    content: (0,translations_.localize)('We can’t deliver the email to this address (Usually because of firewalls or filtering).')\n  }];\n};\n\nvar SentEmailModal = function SentEmailModal(_ref) {\n  var identifier_title = _ref.identifier_title,\n      _ref$is_modal_when_mo = _ref.is_modal_when_mobile,\n      is_modal_when_mobile = _ref$is_modal_when_mo === void 0 ? false : _ref$is_modal_when_mo,\n      is_open = _ref.is_open,\n      _ref$has_live_chat = _ref.has_live_chat,\n      has_live_chat = _ref$has_live_chat === void 0 ? false : _ref$has_live_chat,\n      onClickSendEmail = _ref.onClickSendEmail,\n      onClose = _ref.onClose;\n\n  var getSubtitle = function getSubtitle() {\n    var subtitle = '';\n\n    switch (identifier_title) {\n      case shared_.CFD_PLATFORMS.DXTRADE:\n        subtitle = /*#__PURE__*/external_react_default().createElement(translations_.Localize, {\n          i18n_default_text: \"Please click on the link in the email to change your <0>{{platform_name_dxtrade}}</0> password.\",\n          components: [/*#__PURE__*/external_react_default().createElement(\"span\", {\n            className: \"send-email-template__subtitle-platform\",\n            key: 0\n          })],\n          values: {\n            platform_name_dxtrade: (0,shared_.getPlatformSettings)('dxtrade').name\n          }\n        });\n        break;\n\n      case shared_.CFD_PLATFORMS.MT5:\n        subtitle = (0,translations_.localize)('Please click on the link in the email to change your Deriv MT5 password.');\n        break;\n\n      case 'Google':\n      case 'Facebook':\n        subtitle = (0,translations_.localize)('Check your {{ identifier_title }} account email and click the link in the email to proceed.', {\n          identifier_title: identifier_title\n        });\n        break;\n\n      case 'Change_Email':\n        subtitle = (0,translations_.localize)('Check your email and click the link in the email to proceed.');\n        break;\n\n      default:\n        subtitle = (0,translations_.localize)('Please click on the link in the email to reset your password.');\n        break;\n    }\n\n    return subtitle;\n  };\n\n  var onLiveChatClick = function onLiveChatClick() {\n    var _LiveChatWidget;\n\n    onClose(); // TODO fix types after implementing TS for livechat in core\n\n    (_LiveChatWidget = window.LiveChatWidget) === null || _LiveChatWidget === void 0 ? void 0 : _LiveChatWidget.call('maximize');\n  };\n\n  var live_chat = has_live_chat ? /*#__PURE__*/external_react_default().createElement(translations_.Localize, {\n    i18n_default_text: \"Still didn't get the email? Please contact us via <0>live chat.</0>\",\n    components: [/*#__PURE__*/external_react_default().createElement(\"span\", {\n      className: \"send-email-template__footer-live-chat\",\n      key: 0,\n      onClick: onLiveChatClick\n    }, /*#__PURE__*/external_react_default().createElement(components_.Popover, {\n      className: \"send-email-template__footer-live-chat__link\",\n      classNameBubble: \"help-centre__tooltip\",\n      alignment: \"top\",\n      message: (0,translations_.localize)('Live chat'),\n      zIndex: \"9999\"\n    }))]\n  }) : null;\n  var sent_email_template = /*#__PURE__*/external_react_default().createElement(components_.SendEmailTemplate, {\n    className: \"sent-email\",\n    subtitle: getSubtitle(),\n    title: (0,translations_.localize)('We’ve sent you an email'),\n    lbl_no_receive: (0,translations_.localize)(\"Didn't receive the email?\"),\n    txt_resend: (0,translations_.localize)('Resend email'),\n    txt_resend_in: (0,translations_.localize)('Resend email in'),\n    onClickSendEmail: onClickSendEmail,\n    live_chat: live_chat\n  }, getNoEmailContentStrings().map(function (item) {\n    return /*#__PURE__*/external_react_default().createElement(\"div\", {\n      className: \"sent-email__content\",\n      key: item.key\n    }, /*#__PURE__*/external_react_default().createElement(components_.Icon, {\n      icon: item.icon,\n      size: 32\n    }), /*#__PURE__*/external_react_default().createElement(components_.Text, {\n      size: \"xxs\",\n      as: \"p\"\n    }, item.content));\n  }));\n\n  if ((0,shared_.isMobile)() && !is_modal_when_mobile) {\n    return /*#__PURE__*/external_react_default().createElement(components_.MobileDialog, {\n      portal_element_id: \"modal_root\",\n      title: (0,translations_.localize)('We’ve sent you an email'),\n      wrapper_classname: \"mt5-email-sent\",\n      visible: is_open,\n      onClose: onClose,\n      has_content_scroll: true\n    }, sent_email_template);\n  }\n\n  return /*#__PURE__*/external_react_default().createElement(components_.Modal, {\n    className: 'sent-email__modal',\n    is_open: is_open,\n    has_close_icon: true,\n    should_header_stick_body: true,\n    title: \"\",\n    toggleModal: onClose,\n    width: \"440px\"\n  }, /*#__PURE__*/external_react_default().createElement(components_.Div100vhContainer, {\n    className: \"account__scrollbars_container-wrapper\",\n    is_disabled: (0,shared_.isDesktop)(),\n    height_offset: \"80px\"\n  }, /*#__PURE__*/external_react_default().createElement(components_.Modal.Body, null, /*#__PURE__*/external_react_default().createElement(\"div\", {\n    onClick: onClose,\n    className: \"send-email-template__close\",\n    \"data-testid\": \"dt_send_email_template_close\"\n  }, /*#__PURE__*/external_react_default().createElement(components_.Icon, {\n    icon: \"IcCross\"\n  })), sent_email_template)));\n};\n\n/* harmony default export */ const sent_email_modal = (SentEmailModal);\n;// CONCATENATED MODULE: ./Components/sent-email-modal/index.ts\n\n/* harmony default export */ const Components_sent_email_modal = (sent_email_modal);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3NlbnQtZW1haWwtbW9kYWwvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQW9CQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQVFBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBSEE7QUFRQTs7QUFFQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFNQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUF6QkE7O0FBMkJBO0FBQ0E7O0FBRUE7QUFBQTs7QUFDQTs7QUFHQTtBQUNBOztBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBSkE7QUFnQkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUhBOztBQVdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVdBOztBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBO0FBQ0E7QUFDQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBT0E7O0FBRUE7O0FDdkxBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbXBvbmVudHMvc2VudC1lbWFpbC1tb2RhbC9zZW50LWVtYWlsLW1vZGFsLnRzeD8yNDk0Iiwid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29tcG9uZW50cy9zZW50LWVtYWlsLW1vZGFsL2luZGV4LnRzP2Y4MjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGxvY2FsaXplLCBMb2NhbGl6ZSB9IGZyb20gJ0BkZXJpdi90cmFuc2xhdGlvbnMnO1xuaW1wb3J0IHsgRGl2MTAwdmhDb250YWluZXIsIEljb24sIE1vYmlsZURpYWxvZywgTW9kYWwsIFNlbmRFbWFpbFRlbXBsYXRlLCBUZXh0LCBQb3BvdmVyIH0gZnJvbSAnQGRlcml2L2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgZ2V0UGxhdGZvcm1TZXR0aW5ncywgQ0ZEX1BMQVRGT1JNUywgaXNNb2JpbGUsIGlzRGVza3RvcCB9IGZyb20gJ0BkZXJpdi9zaGFyZWQnO1xuXG50eXBlIFRTZW50RW1haWxNb2RhbCA9IHtcbiAgICBpZGVudGlmaWVyX3RpdGxlOiBzdHJpbmc7XG4gICAgaXNfbW9kYWxfd2hlbl9tb2JpbGU/OiBib29sZWFuO1xuICAgIGlzX29wZW46IGJvb2xlYW47XG4gICAgaGFzX2xpdmVfY2hhdD86IGJvb2xlYW47XG4gICAgb25DbGlja1NlbmRFbWFpbDogKCkgPT4gdm9pZDtcbiAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xufTtcblxudHlwZSBUTm9FbWFpbENvbnRlbnRJdGVtID0ge1xuICAgIGtleTogc3RyaW5nO1xuICAgIGljb246IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmcgfCBSZWFjdC5SZWFjdEVsZW1lbnQ7XG59O1xuXG4vLyBUT0RPIHJlcGxhY2UgdGhlc2UgdHlwZXMgdG8gcmVhbCBhZnRlciBpbXBsZW1lbnRpbmcgVFMgZm9yIGxpdmVjaGF0IGluIGNvcmVcbnR5cGUgVFdpbmRvd0xpdmVDaGF0V2lkZ2V0ID0gV2luZG93ICYgdHlwZW9mIGdsb2JhbFRoaXMgJiB7IExpdmVDaGF0V2lkZ2V0PzogeyBjYWxsOiAocGFyYW06IHN0cmluZykgPT4gdm9pZCB9IH07XG5cbmNvbnN0IGdldE5vRW1haWxDb250ZW50U3RyaW5ncyA9ICgpOiBUTm9FbWFpbENvbnRlbnRJdGVtW10gPT4ge1xuICAgIHJldHVybiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtleTogJ2VtYWlsX3NwYW0nLFxuICAgICAgICAgICAgaWNvbjogJ0ljRW1haWxTcGFtJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGxvY2FsaXplKCdUaGUgZW1haWwgaXMgaW4geW91ciBzcGFtIGZvbGRlciAoU29tZXRpbWVzIHRoaW5ncyBnZXQgbG9zdCB0aGVyZSkuJyksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtleTogJ3dyb25nX2VtYWlsJyxcbiAgICAgICAgICAgIGljb246ICdJY0VtYWlsJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGxvY2FsaXplKFxuICAgICAgICAgICAgICAgICdZb3UgYWNjaWRlbnRhbGx5IGdhdmUgdXMgYW5vdGhlciBlbWFpbCBhZGRyZXNzIChVc3VhbGx5IGEgd29yayBvciBhIHBlcnNvbmFsIG9uZSBpbnN0ZWFkIG9mIHRoZSBvbmUgeW91IG1lYW50KS4nXG4gICAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBrZXk6ICd3cm9uZ190eXBvJyxcbiAgICAgICAgICAgIGljb246ICdJY0VtYWlsVHlwbycsXG4gICAgICAgICAgICBjb250ZW50OiBsb2NhbGl6ZSgnVGhlIGVtYWlsIGFkZHJlc3MgeW91IGVudGVyZWQgaGFkIGEgbWlzdGFrZSBvciB0eXBvIChoYXBwZW5zIHRvIHRoZSBiZXN0IG9mIHVzKS4nKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAga2V5OiAnZW1haWxfZmlyZXdhbGwnLFxuICAgICAgICAgICAgaWNvbjogJ0ljRW1haWxGaXJld2FsbCcsXG4gICAgICAgICAgICBjb250ZW50OiBsb2NhbGl6ZShcbiAgICAgICAgICAgICAgICAnV2UgY2Fu4oCZdCBkZWxpdmVyIHRoZSBlbWFpbCB0byB0aGlzIGFkZHJlc3MgKFVzdWFsbHkgYmVjYXVzZSBvZiBmaXJld2FsbHMgb3IgZmlsdGVyaW5nKS4nXG4gICAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgIF07XG59O1xuXG5jb25zdCBTZW50RW1haWxNb2RhbCA9ICh7XG4gICAgaWRlbnRpZmllcl90aXRsZSxcbiAgICBpc19tb2RhbF93aGVuX21vYmlsZSA9IGZhbHNlLFxuICAgIGlzX29wZW4sXG4gICAgaGFzX2xpdmVfY2hhdCA9IGZhbHNlLFxuICAgIG9uQ2xpY2tTZW5kRW1haWwsXG4gICAgb25DbG9zZSxcbn06IFRTZW50RW1haWxNb2RhbCkgPT4ge1xuICAgIGNvbnN0IGdldFN1YnRpdGxlID0gKCkgPT4ge1xuICAgICAgICBsZXQgc3VidGl0bGU6IHN0cmluZyB8IFJlYWN0LlJlYWN0RWxlbWVudCA9ICcnO1xuICAgICAgICBzd2l0Y2ggKGlkZW50aWZpZXJfdGl0bGUpIHtcbiAgICAgICAgICAgIGNhc2UgQ0ZEX1BMQVRGT1JNUy5EWFRSQURFOlxuICAgICAgICAgICAgICAgIHN1YnRpdGxlID0gKFxuICAgICAgICAgICAgICAgICAgICA8TG9jYWxpemVcbiAgICAgICAgICAgICAgICAgICAgICAgIGkxOG5fZGVmYXVsdF90ZXh0PSdQbGVhc2UgY2xpY2sgb24gdGhlIGxpbmsgaW4gdGhlIGVtYWlsIHRvIGNoYW5nZSB5b3VyIDwwPnt7cGxhdGZvcm1fbmFtZV9keHRyYWRlfX08LzA+IHBhc3N3b3JkLidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM9e1s8c3BhbiBjbGFzc05hbWU9J3NlbmQtZW1haWwtdGVtcGxhdGVfX3N1YnRpdGxlLXBsYXRmb3JtJyBrZXk9ezB9IC8+XX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcz17eyBwbGF0Zm9ybV9uYW1lX2R4dHJhZGU6IGdldFBsYXRmb3JtU2V0dGluZ3MoJ2R4dHJhZGUnKS5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ0ZEX1BMQVRGT1JNUy5NVDU6XG4gICAgICAgICAgICAgICAgc3VidGl0bGUgPSBsb2NhbGl6ZSgnUGxlYXNlIGNsaWNrIG9uIHRoZSBsaW5rIGluIHRoZSBlbWFpbCB0byBjaGFuZ2UgeW91ciBEZXJpdiBNVDUgcGFzc3dvcmQuJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdHb29nbGUnOlxuICAgICAgICAgICAgY2FzZSAnRmFjZWJvb2snOlxuICAgICAgICAgICAgICAgIHN1YnRpdGxlID0gbG9jYWxpemUoXG4gICAgICAgICAgICAgICAgICAgICdDaGVjayB5b3VyIHt7IGlkZW50aWZpZXJfdGl0bGUgfX0gYWNjb3VudCBlbWFpbCBhbmQgY2xpY2sgdGhlIGxpbmsgaW4gdGhlIGVtYWlsIHRvIHByb2NlZWQuJyxcbiAgICAgICAgICAgICAgICAgICAgeyBpZGVudGlmaWVyX3RpdGxlIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQ2hhbmdlX0VtYWlsJzpcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZSA9IGxvY2FsaXplKCdDaGVjayB5b3VyIGVtYWlsIGFuZCBjbGljayB0aGUgbGluayBpbiB0aGUgZW1haWwgdG8gcHJvY2VlZC4nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc3VidGl0bGUgPSBsb2NhbGl6ZSgnUGxlYXNlIGNsaWNrIG9uIHRoZSBsaW5rIGluIHRoZSBlbWFpbCB0byByZXNldCB5b3VyIHBhc3N3b3JkLicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJ0aXRsZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25MaXZlQ2hhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG5cbiAgICAgICAgLy8gVE9ETyBmaXggdHlwZXMgYWZ0ZXIgaW1wbGVtZW50aW5nIFRTIGZvciBsaXZlY2hhdCBpbiBjb3JlXG4gICAgICAgICh3aW5kb3cgYXMgVFdpbmRvd0xpdmVDaGF0V2lkZ2V0KS5MaXZlQ2hhdFdpZGdldD8uY2FsbCgnbWF4aW1pemUnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbGl2ZV9jaGF0ID0gaGFzX2xpdmVfY2hhdCA/IChcbiAgICAgICAgPExvY2FsaXplXG4gICAgICAgICAgICBpMThuX2RlZmF1bHRfdGV4dD1cIlN0aWxsIGRpZG4ndCBnZXQgdGhlIGVtYWlsPyBQbGVhc2UgY29udGFjdCB1cyB2aWEgPDA+bGl2ZSBjaGF0LjwvMD5cIlxuICAgICAgICAgICAgY29tcG9uZW50cz17W1xuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2VuZC1lbWFpbC10ZW1wbGF0ZV9fZm9vdGVyLWxpdmUtY2hhdCcga2V5PXswfSBvbkNsaWNrPXtvbkxpdmVDaGF0Q2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzZW5kLWVtYWlsLXRlbXBsYXRlX19mb290ZXItbGl2ZS1jaGF0X19saW5rJ1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lQnViYmxlPSdoZWxwLWNlbnRyZV9fdG9vbHRpcCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudD0ndG9wJ1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZT17bG9jYWxpemUoJ0xpdmUgY2hhdCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4PSc5OTk5J1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj4sXG4gICAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICkgOiBudWxsO1xuXG4gICAgY29uc3Qgc2VudF9lbWFpbF90ZW1wbGF0ZTogUmVhY3QuUmVhY3RFbGVtZW50ID0gKFxuICAgICAgICA8U2VuZEVtYWlsVGVtcGxhdGVcbiAgICAgICAgICAgIGNsYXNzTmFtZT0nc2VudC1lbWFpbCdcbiAgICAgICAgICAgIHN1YnRpdGxlPXtnZXRTdWJ0aXRsZSgpfVxuICAgICAgICAgICAgdGl0bGU9e2xvY2FsaXplKCdXZeKAmXZlIHNlbnQgeW91IGFuIGVtYWlsJyl9XG4gICAgICAgICAgICBsYmxfbm9fcmVjZWl2ZT17bG9jYWxpemUoXCJEaWRuJ3QgcmVjZWl2ZSB0aGUgZW1haWw/XCIpfVxuICAgICAgICAgICAgdHh0X3Jlc2VuZD17bG9jYWxpemUoJ1Jlc2VuZCBlbWFpbCcpfVxuICAgICAgICAgICAgdHh0X3Jlc2VuZF9pbj17bG9jYWxpemUoJ1Jlc2VuZCBlbWFpbCBpbicpfVxuICAgICAgICAgICAgb25DbGlja1NlbmRFbWFpbD17b25DbGlja1NlbmRFbWFpbH1cbiAgICAgICAgICAgIGxpdmVfY2hhdD17bGl2ZV9jaGF0fVxuICAgICAgICA+XG4gICAgICAgICAgICB7Z2V0Tm9FbWFpbENvbnRlbnRTdHJpbmdzKCkubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzZW50LWVtYWlsX19jb250ZW50JyBrZXk9e2l0ZW0ua2V5fT5cbiAgICAgICAgICAgICAgICAgICAgPEljb24gaWNvbj17aXRlbS5pY29ufSBzaXplPXszMn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgc2l6ZT0neHhzJyBhcz0ncCc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TZW5kRW1haWxUZW1wbGF0ZT5cbiAgICApO1xuXG4gICAgaWYgKGlzTW9iaWxlKCkgJiYgIWlzX21vZGFsX3doZW5fbW9iaWxlKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TW9iaWxlRGlhbG9nXG4gICAgICAgICAgICAgICAgcG9ydGFsX2VsZW1lbnRfaWQ9J21vZGFsX3Jvb3QnXG4gICAgICAgICAgICAgICAgdGl0bGU9e2xvY2FsaXplKCdXZeKAmXZlIHNlbnQgeW91IGFuIGVtYWlsJyl9XG4gICAgICAgICAgICAgICAgd3JhcHBlcl9jbGFzc25hbWU9J210NS1lbWFpbC1zZW50J1xuICAgICAgICAgICAgICAgIHZpc2libGU9e2lzX29wZW59XG4gICAgICAgICAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgICAgICAgICBoYXNfY29udGVudF9zY3JvbGxcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7c2VudF9lbWFpbF90ZW1wbGF0ZX1cbiAgICAgICAgICAgIDwvTW9iaWxlRGlhbG9nPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgICAgY2xhc3NOYW1lPXsnc2VudC1lbWFpbF9fbW9kYWwnfVxuICAgICAgICAgICAgaXNfb3Blbj17aXNfb3Blbn1cbiAgICAgICAgICAgIGhhc19jbG9zZV9pY29uXG4gICAgICAgICAgICBzaG91bGRfaGVhZGVyX3N0aWNrX2JvZHlcbiAgICAgICAgICAgIHRpdGxlPScnXG4gICAgICAgICAgICB0b2dnbGVNb2RhbD17b25DbG9zZX1cbiAgICAgICAgICAgIHdpZHRoPSc0NDBweCdcbiAgICAgICAgPlxuICAgICAgICAgICAgPERpdjEwMHZoQ29udGFpbmVyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhY2NvdW50X19zY3JvbGxiYXJzX2NvbnRhaW5lci13cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGlzX2Rpc2FibGVkPXtpc0Rlc2t0b3AoKX1cbiAgICAgICAgICAgICAgICBoZWlnaHRfb2Zmc2V0PSc4MHB4J1xuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzZW5kLWVtYWlsLXRlbXBsYXRlX19jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdGlkPSdkdF9zZW5kX2VtYWlsX3RlbXBsYXRlX2Nsb3NlJ1xuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBpY29uPSdJY0Nyb3NzJyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3NlbnRfZW1haWxfdGVtcGxhdGV9XG4gICAgICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPC9EaXYxMDB2aENvbnRhaW5lcj5cbiAgICAgICAgPC9Nb2RhbD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VudEVtYWlsTW9kYWw7XG4iLCJpbXBvcnQgU2VudEVtYWlsTW9kYWwgZnJvbSAnLi9zZW50LWVtYWlsLW1vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgU2VudEVtYWlsTW9kYWw7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Components/sent-email-modal/index.ts\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./Components/sent-email-modal/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});