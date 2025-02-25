import { h, Host } from '@stencil/core';
import state from './state';
import { ModalType } from "./modal-type";
export class ModalDialogContainer {
  constructor() {
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
  static get is() { return "elsa-modal-dialog-container"; }
}
//# sourceMappingURL=modal-dialog-container.js.map
