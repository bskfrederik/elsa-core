import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { I as InfoList } from './info-list.js';
import { s as state } from './descriptors-store.js';
import { h as hooks } from './notification-service.js';
import { a3 as ActivityIconSize, C as Container, x as ActivityIconRegistry } from './utils.js';
import './toolbar-component-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$2 } from './copy-button.js';
import { d as defineCustomElement$1 } from './form-panel.js';

const ActivityProperties = /*@__PURE__*/ proxyCustomElement(class ActivityProperties extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.findActivityDescriptor = () => {
      const activity = this.activity;
      if (!activity)
        return null;
      const descriptor = state.activityDescriptors.find(x => x.typeName == activity.type && x.version == activity.version);
      return descriptor !== null && descriptor !== void 0 ? descriptor : state.activityDescriptors.sort((a, b) => b.version - a.version).find(x => x.typeName == this.activity.type);
    };
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.renderPropertiesTab = () => {
      var _a, _b, _c;
      const activity = this.activity;
      const activityDescriptor = this.findActivityDescriptor();
      const properties = activityDescriptor.inputs.filter(x => x.isBrowsable);
      const activityId = activity.id;
      const displayText = (_b = (_a = activity.metadata) === null || _a === void 0 ? void 0 : _a.displayText) !== null && _b !== void 0 ? _b : '';
      const executionLogEntry = this.activityExecutionLog;
      const activityState = (_c = executionLogEntry === null || executionLogEntry === void 0 ? void 0 : executionLogEntry.activityState) !== null && _c !== void 0 ? _c : {};
      const propertyDetails = {
        [this.strings.propertiesTabActivityId]: activityId,
        [this.strings.propertiesTabDisplayText]: displayText
      };
      for (const property of properties) {
        const loggedPropName = property.name;
        const propertyValue = activityState[loggedPropName];
        const propertyValueText = (propertyValue !== null && typeof propertyValue === 'object') ? JSON.stringify(propertyValue) : (propertyValue != null ? propertyValue.toString() : '');
        propertyDetails[property.displayName] = propertyValueText;
      }
      return h("div", null, h(InfoList, { title: this.strings.propertiesTab, dictionary: propertyDetails }));
    };
    this.renderCommonTab = () => {
      return h("div", null);
    };
    this.renderJournalTab = () => {
      var _a;
      const log = this.activityExecutionLog;
      if (log == null)
        return;
      const exception = (_a = log.payload) === null || _a === void 0 ? void 0 : _a.exception;
      const statusColor = log.eventName == "Completed" ? "tw-bg-blue-100" : log.eventName == "Faulted" ? "tw-bg-red-100" : "tw-bg-green-100";
      const icon = this.iconRegistry.getOrDefault(log.activityType)({ size: ActivityIconSize.Small });
      return (h("div", { class: "tw-border-2 tw-cursor-pointer tw-p-4 tw-rounded" }, h("div", { class: "tw-relative tw-pb-10" }, h("div", { class: "tw-relative tw-flex tw-space-x-3" }, h("div", null, h("span", { class: `tw-h-8 tw-w-8 tw-rounded tw-p-1 tw-bg-blue-500 tw-flex tw-items-center tw-justify-center tw-ring-8 tw-ring-white tw-mr-1` }, icon)), h("div", { class: "tw-min-w-0 tw-flex-1 tw-pt-1.5 tw-flex tw-justify-between tw-space-x-4" }, h("div", null, h("h3", { class: "tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-900" }, log.activityType)), h("div", null, h("span", { class: `tw-relative tw-inline-flex tw-items-center tw-rounded-full ${statusColor} tw-border tw-border-gray-300 tw-px-3 tw-py-0.5 tw-text-sm` }, h("span", { class: "tw-absolute tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center" }, h("span", { class: `tw-h-1.5 tw-w-1.5 tw-rounded-full`, "aria-hidden": "true" })), h("span", { class: "tw-font-medium tw-text-gray-900" }, log.eventName))), h("div", { class: "tw-text-right tw-text-sm tw-whitespace-nowrap tw-text-gray-500" }, h("span", null, hooks(log.timestamp).format('DD-MM-YYYY HH:mm:ss'))))), h("div", { class: "tw-ml-12 tw-mt-2" }, h("dl", { class: "sm:tw-divide-y sm:tw-divide-gray-200" }, h("div", { class: "tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-8 sm:tw-grid-cols-2" }, h("div", { class: "sm:tw-col-span-2" }, h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, h("span", null, this.strings.journalTabActivityId), h("copy-button", { value: log.activityId })), h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900 tw-mb-2" }, log.activityId)), !!exception ? ([h("div", { class: "sm:tw-col-span-2" }, h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, h("span", null, this.strings.journalTabException), h("copy-button", { value: exception.Type + '\n' + exception.Message })), h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900" }, exception.message)), h("div", { class: "sm:tw-col-span-2" }, h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, h("span", null, "Exception Details"), h("copy-button", { value: JSON.stringify(exception, null, 1) })), h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900 tw-overflow-x-auto" }, h("pre", null, JSON.stringify(exception, null, 1))))]) : undefined))))));
    };
    this.activity = undefined;
    this.activityExecutionLog = undefined;
    this.activityPropertyTabIndex = undefined;
    this.selectedTabIndex = 0;
    this.iconRegistry = Container.get(ActivityIconRegistry);
  }
  async show() {
    await this.slideOverPanel.show();
  }
  async hide() {
    await this.slideOverPanel.hide();
  }
  async updateSelectedTab(tabIndex) {
    this.selectedTabIndex = tabIndex;
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    console.log(this.strings);
    if (this.activityPropertyTabIndex != null) {
      this.selectedTabIndex = this.activityPropertyTabIndex;
    }
  }
  render() {
    const activity = this.activity;
    const activityDescriptor = this.findActivityDescriptor();
    const propertiesTab = {
      displayText: this.strings.propertiesTab,
      content: () => this.renderPropertiesTab()
    };
    const commonTab = {
      displayText: this.strings.commonTab,
      content: () => this.renderCommonTab()
    };
    const journalTab = {
      displayText: this.strings.journalTab,
      content: () => this.renderJournalTab()
    };
    const tabs = !!activityDescriptor ? [propertiesTab, commonTab, journalTab] : [];
    const mainTitle = activity.id;
    const subTitle = activityDescriptor.displayName;
    return (h("elsa-form-panel", { mainTitle: mainTitle, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  get element() { return this; }
  static get watchers() { return {
    "activity": ["componentWillLoad"]
  }; }
}, [0, "elsa-activity-properties", {
    "activity": [1040],
    "activityExecutionLog": [16],
    "activityPropertyTabIndex": [2, "activity-property-tab-index"],
    "selectedTabIndex": [32],
    "show": [64],
    "hide": [64],
    "updateSelectedTab": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-activity-properties", "elsa-copy-button", "elsa-form-panel"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-activity-properties":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActivityProperties);
      }
      break;
    case "elsa-copy-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-form-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { ActivityProperties as A, defineCustomElement as d };

//# sourceMappingURL=activity-properties.js.map