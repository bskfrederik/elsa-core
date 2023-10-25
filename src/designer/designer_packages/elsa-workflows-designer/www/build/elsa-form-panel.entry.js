import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { q as isNullOrWhitespace } from './index-7d63808a.js';
import { P as PanelActionType } from './models-b09b5843.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

const FormPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.submitted = createEvent(this, "submitted", 7);
    this.selectedTabIndexChanged = createEvent(this, "selectedTabIndexChanged", 7);
    this.actionInvoked = createEvent(this, "actionInvoked", 7);
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
    return (h("div", { class: "tw-absolute tw-inset-0 tw-overflow-hidden" }, h("form", { class: "tw-h-full tw-flex tw-flex-col tw-bg-white tw-shadow-xl", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-flex tw-flex-col tw-flex-1" }, orientation == 'Portrait' && (h("div", { class: "tw-px-4 tw-py-6 tw-bg-gray-50" }, h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, h("div", { class: "tw-space-y-1" }, h("h2", { class: "tw-text-lg tw-font-medium tw-text-gray-900" }, mainTitle), !isNullOrWhitespace(subTitle) ? h("h3", { class: "tw-text-sm tw-text-gray-700" }, subTitle) : undefined)))), orientation == 'Landscape' && (h("div", { class: "tw-px-10 tw-py-4 tw-bg-gray-50" }, h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, h("div", { class: "tw-space-y-0" }, h("h2", { class: "tw-text-base tw-font-medium tw-text-gray-900" }, mainTitle), !isNullOrWhitespace(subTitle) ? h("h3", { class: "tw-text-xs tw-text-gray-700" }, subTitle) : undefined)))), h("div", { class: `tw-border-b tw-border-gray-200 ${orientation == 'Landscape' ? 'tw-pl-10' : 'tw-pl-4'}` }, h("nav", { class: "-tw-mb-px tw-flex tw-justify-start tw-space-x-5", "aria-label": "Tabs" }, tabs.map((tab, tabIndex) => {
      const cssClass = tabIndex == selectedTabIndex ? 'tw-border-blue-500 tw-text-blue-600' : 'tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300';
      return h("a", { href: "#", onClick: e => this.onTabClick(e, tab), class: `${cssClass} tw-py-4 tw-px-1 tw-text-center tw-border-b-2 tw-font-medium tw-text-sm` }, tab.displayText);
    }))), h("div", { class: `tw-flex-1 tw-relative` }, h("div", { class: `tw-absolute tw-inset-0 tw-overflow-y-scroll ${orientation == 'Landscape' ? 'tw-px-6' : ''}` }, tabs.map((tab, tabIndex) => {
      const cssClass = tabIndex == selectedTabIndex ? '' : 'hidden';
      return h("div", { class: cssClass }, h("fieldset", { disabled: readonly }, tab.content()));
    })))), actions.length > 0 ? (h("div", { class: "tw-flex-shrink-0 tw-px-4 tw-border-t tw-border-gray-200 tw-py-5 sm:tw-px-6" }, h("div", { class: "tw-space-x-3 tw-flex tw-justify-end" }, actions.map(action => {
      if (action.display)
        return action.display(action);
      const cssClass = action.isPrimary
        ? 'tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 tw-border-transparent focus:tw-ring-blue-500'
        : action.isDangerous ? 'tw-text-white tw-bg-red-600 hover:tw-bg-red-700 tw-border-transparent focus:tw-ring-red-500'
          : 'tw-bg-white tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-ring-blue-500';
      const buttonType = action.type == PanelActionType.Submit ? 'submit' : 'button';
      const cancelHandler = () => {
      };
      const defaultHandler = (e, action) => this.actionInvoked.emit({ e, action: action });
      const clickHandler = !!action.onClick ? action.onClick : action.type == PanelActionType.Cancel ? cancelHandler : defaultHandler;
      return h("button", { type: buttonType, onClick: e => clickHandler(e, action), class: `${cssClass} tw-py-2 tw-px-4 tw-border tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2` }, action.text);
    })))) : undefined)));
  }
};

export { FormPanel as elsa_form_panel };

//# sourceMappingURL=elsa-form-panel.entry.js.map