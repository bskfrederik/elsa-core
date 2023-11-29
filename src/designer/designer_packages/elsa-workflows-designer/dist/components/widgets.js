import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const Widgets = /*@__PURE__*/ proxyCustomElement(class Widgets extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.widgets = [];
  }
  render() {
    const widgets = this.widgets.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
    return h("div", null, widgets.map(widget => widget.content()));
  }
}, [0, "elsa-widgets", {
    "widgets": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-widgets"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-widgets":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Widgets);
      }
      break;
  } });
}

export { Widgets as W, defineCustomElement as d };

//# sourceMappingURL=widgets.js.map