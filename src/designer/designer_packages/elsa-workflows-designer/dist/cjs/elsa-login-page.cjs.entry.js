'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');

const LoginPage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.signedIn = index.createEvent(this, "signedIn", 7);
    this.onSubmit = async (e) => {
      e.preventDefault();
      this.showError = false;
      window.requestAnimationFrame(() => {
      });
      const form = e.target;
      const formData = new FormData(form);
      const username = formData.get('username');
      const password = formData.get('password');
      const rememberMe = formData.get('remember-me') == 'true';
      const loginResponse = await this.loginApi.login(username, password);
      if (!loginResponse.isAuthenticated) {
        this.showError = true;
      }
      this.signedIn.emit();
      const accessToken = loginResponse.accessToken;
      const refreshToken = loginResponse.refreshToken;
      const authContext = utils.Container.get(utils.AuthContext);
      await authContext.signin(accessToken, refreshToken, rememberMe);
    };
    this.renderError = () => {
      if (!this.showError)
        return;
      return index.h("div", { class: "tw-rounded-md tw-bg-red-50 tw-p-4" }, index.h("div", { class: "tw-flex" }, index.h("div", { class: "tw-flex-shrink-0" }, index.h("svg", { class: "tw-h-5 tw-w-5 tw-text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, index.h("path", { "fill-rule": "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z", "clip-rule": "evenodd" }))), index.h("div", { class: "tw-ml-3" }, index.h("h3", { class: "tw-text-sm tw-font-medium tw-text-red-800" }, "Invalid credentials"), index.h("div", { class: "tw-mt-2 tw-text-sm tw-text-red-700" }, "The provided credentials were invalid. Please try again."))));
    };
    this.showError = undefined;
    this.loginApi = utils.Container.get(utils.LoginApi);
  }
  render() {
    return index.h("div", null, index.h("div", { class: "tw-flex min-tw-h-full tw-flex-col tw-pt-20 tw-bg-gray-800 tw-h-screen" }, index.h("div", { class: "tw-mt-8 sm:tw-mx-auto sm:tw-w-full sm:tw-max-w-md" }, index.h("div", { class: "tw-bg-white tw-py-8 tw-px-4 tw-shadow sm:tw-rounded-lg sm:tw-px-10" }, this.renderError(), index.h("form", { class: "tw-mt-4 tw-space-y-6", action: "#", method: "POST", onSubmit: this.onSubmit }, index.h("div", null, index.h("label", { htmlFor: "username", class: "tw-block tw-text-sm tw-font-medium tw-text-gray-700" }, "Username"), index.h("div", { class: "tw-mt-1" }, index.h("input", { id: "username", name: "username", type: "text", autocomplete: "off", required: true, class: "tw-block tw-w-full tw-appearance-none tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-placeholder-gray-400 tw-shadow-sm focus:tw-border-blue-500 focus:tw-outline-none focus:tw-ring-blue-500 sm:tw-text-sm" }))), index.h("div", null, index.h("label", { htmlFor: "password", class: "tw-block tw-text-sm tw-font-medium tw-text-gray-700" }, "Password"), index.h("div", { class: "tw-mt-1" }, index.h("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", required: true, class: "tw-block tw-w-full tw-appearance-none tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-placeholder-gray-400 tw-shadow-sm focus:tw-border-blue-500 focus:tw-outline-none focus:tw-ring-blue-500 sm:tw-text-sm" }))), index.h("div", { class: "tw-flex tw-items-center tw-justify-between" }, index.h("div", { class: "tw-flex tw-items-center" }, index.h("input", { id: "remember-me", name: "remember-me", type: "checkbox", value: "true", class: "tw-h-4 tw-w-4 tw-rounded tw-border-gray-300 tw-text-blue-600 focus:tw-ring-blue-500" }), index.h("label", { htmlFor: "remember-me", class: "tw-ml-2 tw-block tw-text-sm tw-text-gray-900" }, "Remember me"))), index.h("div", null, index.h("button", { type: "submit", class: "tw-flex tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-transparent tw-bg-blue-600 tw-py-2 tw-px-4 tw-text-sm tw-font-medium tw-text-white tw-shadow-sm hover:tw-bg-blue-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2" }, "Sign in")))))));
  }
};

exports.elsa_login_page = LoginPage;

//# sourceMappingURL=elsa-login-page.cjs.entry.js.map