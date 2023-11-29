import { h } from '@stencil/core';
import { createStore } from '@stencil/store';
const { state, onChange } = createStore({
  activeComponentFactory: () => h("elsa-blank", null),
  modalComponents: []
});
export default state;
//# sourceMappingURL=studio-component-store.js.map
