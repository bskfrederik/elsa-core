import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import './notification-service.js';
import './lodash.js';
import { c as copyTextToClipboard } from './copy.js';

const ElsaCopyButton = /*@__PURE__*/ proxyCustomElement(class ElsaCopyButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.copyToClipboard = () => {
      this.isCopied = true;
      copyTextToClipboard(this.value);
      setTimeout(() => {
        this.isCopied = false;
      }, 500);
    };
    this.isCopied = false;
    this.value = '';
  }
  render() {
    return (h("a", { href: "#", class: "tw-ml-2 tw-h-6 tw-w-6 tw-inline-block tw-text-blue-500 hover:tw-text-blue-300", title: "Copy value" }, !this.isCopied ? (h("svg", { onClick: () => this.copyToClipboard(), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("rect", { x: "8", y: "8", width: "12", height: "12", rx: "2" }), h("path", { d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" }))) : (h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), " ", h("polyline", { points: "9 11 12 14 20 6" }), " ", h("path", { d: "M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" })))));
  }
}, [0, "elsa-copy-button", {
    "value": [1],
    "isCopied": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-copy-button"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-copy-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ElsaCopyButton);
      }
      break;
  } });
}

export { ElsaCopyButton as E, defineCustomElement as d };

//# sourceMappingURL=copy-button.js.map