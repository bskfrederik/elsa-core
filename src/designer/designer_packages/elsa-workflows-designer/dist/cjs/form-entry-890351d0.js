'use strict';

const index = require('./index-2c400919.js');
const hint = require('./hint-34535b0d.js');

const FormEntry = ({ label, hint: hint$1, fieldId, key, padding }, children) => {
  padding !== null && padding !== void 0 ? padding : (padding = 'tw-p-4');
  return (index.h("div", { class: `form-entry ${padding}` },
    index.h("label", { htmlFor: fieldId }, label),
    index.h("div", { class: "tw-mt-1", key: key }, children),
    index.h(hint.Hint, { text: hint$1 })));
};
const CheckboxFormEntry = ({ label, hint: hint$1, fieldId, key, padding }, children) => {
  padding !== null && padding !== void 0 ? padding : (padding = 'tw-p-4');
  return (index.h("div", { class: padding },
    index.h("div", { class: "tw-flex tw-space-x-1" },
      children,
      index.h("label", { htmlFor: fieldId }, label)),
    index.h(hint.Hint, { text: hint$1 })));
};

exports.CheckboxFormEntry = CheckboxFormEntry;
exports.FormEntry = FormEntry;

//# sourceMappingURL=form-entry-890351d0.js.map