import { proxyCustomElement, HTMLElement } from '@stencil/core/internal/client';

const ContextConsumer = /*@__PURE__*/ proxyCustomElement(class ContextConsumer extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.context = {};
    this.renderer = () => null;
  }
  connectedCallback() {
    if (this.subscribe != null) {
      this.unsubscribe = this.subscribe(this.el, 'context');
    }
  }
  disconnectedCallback() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
    }
  }
  render() {
    return this.renderer(Object.assign({}, this.context));
  }
  get el() { return this; }
}, [0, "context-consumer", {
    "context": [16],
    "renderer": [16],
    "subscribe": [16],
    "unsubscribe": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["context-consumer"];
  components.forEach(tagName => { switch (tagName) {
    case "context-consumer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ContextConsumer);
      }
      break;
  } });
}

export { ContextConsumer as C, defineCustomElement as d };

//# sourceMappingURL=state-tunnel.js.map