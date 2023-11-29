import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as state } from './state.js';
import { M as ModalType } from './modal-type.js';
import { d as defineCustomElement$1 } from './modal-dialog.js';

const ModalDialogContainer = /*@__PURE__*/ proxyCustomElement(class ModalDialogContainer extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onInstanceHidden = (instance) => {
      let instances = state.instances;
      instances = instances.filter(x => x != instance);
      state.instances = instances;
    };
  }
  render() {
    const instances = state.instances;
    return (h(Host, null, instances.map(instance => {
      var _a, _b, _c;
      const options = instance.options;
      const actions = (_a = options === null || options === void 0 ? void 0 : options.actions) !== null && _a !== void 0 ? _a : [];
      const modalType = (_b = options === null || options === void 0 ? void 0 : options.modalType) !== null && _b !== void 0 ? _b : ModalType.Default;
      const size = (_c = options === null || options === void 0 ? void 0 : options.size) !== null && _c !== void 0 ? _c : 'sm:tw-max-w-6xl';
      return (h("elsa-modal-dialog", { ref: el => instance.modalDialogRef = el, type: modalType, size: size, modalDialogInstance: instance, content: instance.content, actions: actions, onActionInvoked: e => {
          const args = e.detail;
          instance.actionInvoked(args);
        }, onHidden: () => this.onInstanceHidden(instance) }));
    })));
  }
}, [0, "elsa-modal-dialog-container"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-modal-dialog-container", "elsa-modal-dialog"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-modal-dialog-container":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ModalDialogContainer);
      }
      break;
    case "elsa-modal-dialog":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { ModalDialogContainer as M, defineCustomElement as d };

//# sourceMappingURL=modal-dialog-container.js.map