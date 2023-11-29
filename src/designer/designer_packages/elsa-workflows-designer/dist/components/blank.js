import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const Blank = /*@__PURE__*/ proxyCustomElement(class Blank extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return h("div", { class: "tw-bg-gray-800 tw-overflow-hidden tw-h-screen" });
  }
}, [0, "elsa-blank"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-blank"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-blank":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Blank);
      }
      break;
  } });
}

export { Blank as B, defineCustomElement as d };

//# sourceMappingURL=blank.js.map