import { h } from './index-08112852.js';
import { o as isNullOrWhitespace } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';

const InfoList = ({ title, dictionary, hideEmptyValues }) => {
  let entries = Object.entries(dictionary);
  if (hideEmptyValues)
    entries = entries.filter(([k, v]) => !isNullOrWhitespace(v));
  return (h("div", { class: "tw-p-4" },
    h("div", { class: "tw-mx-auto" },
      h("div", null,
        h("div", null,
          h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, title)),
        h("div", { class: "tw-mt-3 tw-border-t tw-border-gray-200" },
          h("dl", { class: "sm:tw-divide-y sm:tw-divide-gray-200" }, entries.map(([k, v]) => (h("div", { class: "tw-py-3 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4" },
            h("dt", { class: "tw-flex tw-font-medium tw-justify-between tw-items-center tw-mt-1 tw-text-sm tw-text-gray-500 sm:tw-mt-0" },
              k,
              " ",
              isNullOrWhitespace(v) ? undefined : h("elsa-copy-button", { value: v })),
            h("dt", { class: "tw-text-sm  tw-text-gray-900 tw-mt-1 sm:tw-mt-0 sm:tw-col-span-2" }, v))))))))));
};

export { InfoList as I };

//# sourceMappingURL=info-list-bcdc458e.js.map