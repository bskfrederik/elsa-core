import { h } from "@stencil/core";
import { Hint } from "./hint";
export const FormEntry = ({ label, hint, fieldId, key, padding }, children) => {
  padding !== null && padding !== void 0 ? padding : (padding = 'tw-p-4');
  return (h("div", { class: `form-entry ${padding}` }, h("label", { htmlFor: fieldId }, label), h("div", { class: "tw-mt-1", key: key }, children), h(Hint, { text: hint })));
};
export const CheckboxFormEntry = ({ label, hint, fieldId, key, padding }, children) => {
  padding !== null && padding !== void 0 ? padding : (padding = 'tw-p-4');
  return (h("div", { class: padding }, h("div", { class: "tw-flex tw-space-x-1" }, children, h("label", { htmlFor: fieldId }, label)), h(Hint, { text: hint })));
};
//# sourceMappingURL=form-entry.js.map
