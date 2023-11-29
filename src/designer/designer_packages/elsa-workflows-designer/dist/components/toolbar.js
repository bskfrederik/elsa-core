import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './dropdown-button.js';

const Toolbar = /*@__PURE__*/ proxyCustomElement(class Toolbar extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.autoLayout = createEvent(this, "autoLayout", 7);
    this.zoomToFit = undefined;
  }
  render() {
    const layoutButtons = [{
        text: 'Horizontally',
        handler: () => this.autoLayout.emit('LR')
      }, {
        text: 'Vertically',
        handler: () => this.autoLayout.emit('TB')
      }];
    return (h("div", { class: "elsa-panel-toolbar tw-flex tw-justify-center tw-absolute tw-border-b tw-border-gray-200 tw-top-0 tw-px-1 tw-pl-4 tw-pb-2 tw-text-sm tw-bg-white tw-z-10 tw-space-x-2" }, h("elsa-dropdown-button", { text: "Auto-layout", theme: "Primary", items: layoutButtons, class: "tw-mt-2" }), h("button", { onClick: this.zoomToFit, class: "elsa-btn elsa-btn-primary" }, "Zoom to fit")));
  }
}, [0, "elsa-workflow-definition-editor-toolbar", {
    "zoomToFit": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-definition-editor-toolbar", "elsa-dropdown-button"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-definition-editor-toolbar":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Toolbar);
      }
      break;
    case "elsa-dropdown-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { Toolbar as T, defineCustomElement as d };

//# sourceMappingURL=toolbar.js.map