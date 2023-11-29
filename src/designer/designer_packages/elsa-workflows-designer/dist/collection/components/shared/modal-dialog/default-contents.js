import { h } from '@stencil/core';
import { WarningIcon } from '../../icons/tooling';
export class DefaultContents {
}
DefaultContents.Warning = (message) => {
  return (h("div", { class: "tw-p-6 tw-text-center" }, h(WarningIcon, null), h("h3", { class: "tw-mb-5 tw-text-lg tw-font-normal tw-text-gray-500 dark:tw-text-gray-400" }, message)));
};
//# sourceMappingURL=default-contents.js.map
