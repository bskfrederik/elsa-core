'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
require('./notification-service-99c155e7.js');
require('./lodash-c9901408.js');
const copy = require('./copy-f2ac5ef3.js');
const models = require('./models-e800ec20.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');

const ElsaCopyButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.copyToClipboard = () => {
      this.isCopied = true;
      copy.copyTextToClipboard(this.value);
      setTimeout(() => {
        this.isCopied = false;
      }, 500);
    };
    this.isCopied = false;
    this.value = '';
  }
  render() {
    return (index.h("a", { href: "#", class: "tw-ml-2 tw-h-6 tw-w-6 tw-inline-block tw-text-blue-500 hover:tw-text-blue-300", title: "Copy value" }, !this.isCopied ? (index.h("svg", { onClick: () => this.copyToClipboard(), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), index.h("rect", { x: "8", y: "8", width: "12", height: "12", rx: "2" }), index.h("path", { d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" }))) : (index.h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), " ", index.h("polyline", { points: "9 11 12 14 20 6" }), " ", index.h("path", { d: "M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" })))));
  }
};

const FormPanel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.submitted = index.createEvent(this, "submitted", 7);
    this.selectedTabIndexChanged = index.createEvent(this, "selectedTabIndexChanged", 7);
    this.actionInvoked = index.createEvent(this, "actionInvoked", 7);
    this.mainTitle = undefined;
    this.subTitle = undefined;
    this.isReadonly = undefined;
    this.orientation = 'Portrait';
    this.tabs = [];
    this.selectedTabIndex = undefined;
    this.actions = [];
  }
  render() {
    return this.renderPanel();
  }
  onTabClick(e, tab) {
    e.preventDefault();
    const selectedTabIndex = this.selectedTabIndex = this.tabs.findIndex(x => tab == x);
    this.selectedTabIndexChanged.emit({ selectedTabIndex: selectedTabIndex });
  }
  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    this.submitted.emit(formData);
  }
  renderPanel() {
    const tabs = this.tabs.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
    const selectedTabIndex = this.selectedTabIndex;
    const actions = this.actions;
    const mainTitle = this.mainTitle;
    const subTitle = this.subTitle;
    const orientation = this.orientation;
    const readonly = this.isReadonly;
    return (index.h("div", { class: "tw-absolute tw-inset-0 tw-overflow-hidden" }, index.h("form", { class: "tw-h-full tw-flex tw-flex-col tw-bg-white tw-shadow-xl", onSubmit: e => this.onSubmit(e), method: "post" }, index.h("div", { class: "tw-flex tw-flex-col tw-flex-1" }, orientation == 'Portrait' && (index.h("div", { class: "tw-px-4 tw-py-6 tw-bg-gray-50" }, index.h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, index.h("div", { class: "tw-space-y-1" }, index.h("h2", { class: "tw-text-lg tw-font-medium tw-text-gray-900" }, mainTitle), !utils.isNullOrWhitespace(subTitle) ? index.h("h3", { class: "tw-text-sm tw-text-gray-700" }, subTitle) : undefined)))), orientation == 'Landscape' && (index.h("div", { class: "tw-px-10 tw-py-4 tw-bg-gray-50" }, index.h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, index.h("div", { class: "tw-space-y-0" }, index.h("h2", { class: "tw-text-base tw-font-medium tw-text-gray-900" }, mainTitle), !utils.isNullOrWhitespace(subTitle) ? index.h("h3", { class: "tw-text-xs tw-text-gray-700" }, subTitle) : undefined)))), index.h("div", { class: `tw-border-b tw-border-gray-200 ${orientation == 'Landscape' ? 'tw-pl-10' : 'tw-pl-4'}` }, index.h("nav", { class: "-tw-mb-px tw-flex tw-justify-start tw-space-x-5", "aria-label": "Tabs" }, tabs.map((tab, tabIndex) => {
      const cssClass = tabIndex == selectedTabIndex ? 'tw-border-blue-500 tw-text-blue-600' : 'tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300';
      return index.h("a", { href: "#", onClick: e => this.onTabClick(e, tab), class: `${cssClass} tw-py-4 tw-px-1 tw-text-center tw-border-b-2 tw-font-medium tw-text-sm` }, tab.displayText);
    }))), index.h("div", { class: `tw-flex-1 tw-relative` }, index.h("div", { class: `tw-absolute tw-inset-0 tw-overflow-y-scroll ${orientation == 'Landscape' ? 'tw-px-6' : ''}` }, tabs.map((tab, tabIndex) => {
      const cssClass = tabIndex == selectedTabIndex ? '' : 'hidden';
      return index.h("div", { class: cssClass }, index.h("fieldset", { disabled: readonly }, tab.content()));
    })))), actions.length > 0 ? (index.h("div", { class: "tw-flex-shrink-0 tw-px-4 tw-border-t tw-border-gray-200 tw-py-5 sm:tw-px-6" }, index.h("div", { class: "tw-space-x-3 tw-flex tw-justify-end" }, actions.map(action => {
      if (action.display)
        return action.display(action);
      const cssClass = action.isPrimary
        ? 'tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 tw-border-transparent focus:tw-ring-blue-500'
        : action.isDangerous ? 'tw-text-white tw-bg-red-600 hover:tw-bg-red-700 tw-border-transparent focus:tw-ring-red-500'
          : 'tw-bg-white tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-ring-blue-500';
      const buttonType = action.type == models.PanelActionType.Submit ? 'submit' : 'button';
      const cancelHandler = () => {
      };
      const defaultHandler = (e, action) => this.actionInvoked.emit({ e, action: action });
      const clickHandler = !!action.onClick ? action.onClick : action.type == models.PanelActionType.Cancel ? cancelHandler : defaultHandler;
      return index.h("button", { type: buttonType, onClick: e => clickHandler(e, action), class: `${cssClass} tw-py-2 tw-px-4 tw-border tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2` }, action.text);
    })))) : undefined)));
  }
};

exports.elsa_copy_button = ElsaCopyButton;
exports.elsa_form_panel = FormPanel;

//# sourceMappingURL=elsa-copy-button_2.cjs.entry.js.map