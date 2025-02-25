import { h } from './index-dc0ae4f5.js';
import { H as Hint } from './hint-ef7d4b14.js';

const FormEntry = ({ label, hint, fieldId, key, padding }, children) => {
  padding !== null && padding !== void 0 ? padding : (padding = 'tw-p-4');
  return (h("div", { class: `form-entry ${padding}` },
    h("label", { htmlFor: fieldId }, label),
    h("div", { class: "tw-mt-1", key: key }, children),
    h(Hint, { text: hint })));
};
const CheckboxFormEntry = ({ label, hint, fieldId, key, padding }, children) => {
  padding !== null && padding !== void 0 ? padding : (padding = 'tw-p-4');
  return (h("div", { class: padding },
    h("div", { class: "tw-flex tw-space-x-1" },
      children,
      h("label", { htmlFor: fieldId }, label)),
    h(Hint, { text: hint })));
};

export { CheckboxFormEntry as C, FormEntry as F };

//# sourceMappingURL=form-entry-c5af3e68.js.map