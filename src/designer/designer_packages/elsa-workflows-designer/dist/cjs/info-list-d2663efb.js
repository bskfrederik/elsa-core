'use strict';

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');

const InfoList = ({ title, dictionary, hideEmptyValues }) => {
  let entries = Object.entries(dictionary);
  if (hideEmptyValues)
    entries = entries.filter(([k, v]) => !utils.isNullOrWhitespace(v));
  return (index.h("div", { class: "tw-p-4" },
    index.h("div", { class: "tw-mx-auto" },
      index.h("div", null,
        index.h("div", null,
          index.h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, title)),
        index.h("div", { class: "tw-mt-3 tw-border-t tw-border-gray-200" },
          index.h("dl", { class: "sm:tw-divide-y sm:tw-divide-gray-200" }, entries.map(([k, v]) => (index.h("div", { class: "tw-py-3 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4" },
            index.h("dt", { class: "tw-flex tw-font-medium tw-justify-between tw-items-center tw-mt-1 tw-text-sm tw-text-gray-500 sm:tw-mt-0" },
              k,
              " ",
              utils.isNullOrWhitespace(v) ? undefined : index.h("elsa-copy-button", { value: v })),
            index.h("dt", { class: "tw-text-sm  tw-text-gray-900 tw-mt-1 sm:tw-mt-0 sm:tw-col-span-2" }, v))))))))));
};

exports.InfoList = InfoList;

//# sourceMappingURL=info-list-d2663efb.js.map