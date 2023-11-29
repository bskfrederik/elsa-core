import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './tooltip.js';
import { d as defineCustomElement$1 } from './toolbox-activities.js';

const Toolbox = /*@__PURE__*/ proxyCustomElement(class Toolbox extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onTabSelected = (e, index) => {
      e.preventDefault();
      this.selectedTabIndex = index;
    };
    this.graph = undefined;
    this.isReadonly = undefined;
    this.selectedTabIndex = 0;
  }
  render() {
    const selectedTabIndex = this.selectedTabIndex;
    const selectedCss = 'tw-border-blue-500 tw-text-blue-600';
    const defaultCss = 'tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300';
    const activitiesTabCssClass = selectedTabIndex == 0 ? selectedCss : defaultCss;
    return (h("div", { class: "activity-list tw-absolute tw-inset-0 tw-overflow-hidden" }, h("div", { class: "tw-h-full tw-flex tw-flex-col" }, h("div", { class: "tw-border-b tw-border-gray-200" }, h("nav", { class: "-tw-mb-px tw-flex", "aria-label": "Tabs" }, h("a", { href: "#", onClick: e => this.onTabSelected(e, 0), class: `${activitiesTabCssClass} tw-w-1/2 tw-py-4 tw-px-1 tw-text-center tw-border-b-2 tw-font-medium tw-text-sm` }, "Activities"))), h("div", { class: "tw-flex-1 tw-relative" }, h("div", { class: "tw-absolute tw-inset-0 tw-overflow-y-scroll" }, h("elsa-workflow-definition-editor-toolbox-activities", { isReadonly: this.isReadonly, graph: this.graph, class: selectedTabIndex == 0 ? '' : 'hidden' }))))));
  }
}, [0, "elsa-workflow-definition-editor-toolbox", {
    "graph": [16],
    "isReadonly": [4, "is-readonly"],
    "selectedTabIndex": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-definition-editor-toolbox", "elsa-tooltip", "elsa-workflow-definition-editor-toolbox-activities"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-definition-editor-toolbox":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Toolbox);
      }
      break;
    case "elsa-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-workflow-definition-editor-toolbox-activities":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { Toolbox as T, defineCustomElement as d };

//# sourceMappingURL=toolbox.js.map