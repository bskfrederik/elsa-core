import { h } from '@stencil/core';
import { debounce } from 'lodash';
export const Search = ({ onSearch, displayText }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchTerm = formData.get('searchTerm').toString();
    onSearch(searchTerm);
  };
  const onSearchDebounced = debounce(onSearch, 200);
  const onKeyUp = (e) => {
    const term = e.target.value;
    onSearchDebounced(term);
  };
  return (h("div", { class: "tw-relative tw-z-10 tw-flex-shrink-0 tw-flex tw-h-16 tw-bg-white tw-border-b tw-border-gray-200" }, h("div", { class: "tw-flex-1 tw-px-4 tw-flex tw-justify-between sm:tw-px-6 lg:tw-px-8" }, h("div", { class: "tw-flex-1 tw-flex" }, h("form", { class: "tw-w-full tw-flex md:tw-ml-0", onSubmit: onSubmit }, h("label", { htmlFor: "search_field", class: "tw-sr-only" }, displayText), h("div", { class: "tw-relative tw-w-full tw-text-gray-400 focus-within:tw-text-gray-600" }, h("div", { class: "tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pointer-events-none" }, h("svg", { class: "tw-h-5 tw-w-5", fill: "currentColor", viewBox: "0 0 20 20" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" }))), h("input", { name: "searchTerm", onKeyUp: onKeyUp, class: "tw-block tw-w-full tw-h-full tw-pl-8 tw-pr-3 tw-py-2 tw-rounded-md tw-text-gray-900 tw-placeholder-cool-gray-500 focus:tw-placeholder-cool-gray-400 sm:tw-text-sm tw-border-0 focus:tw-outline-none focus:tw-ring-0", placeholder: displayText, type: "search" })))))));
};
//# sourceMappingURL=search.js.map
