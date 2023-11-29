import { h } from "@stencil/core";
const clickHandler = (e, onNavigate) => {
  e.preventDefault();
  onNavigate();
};
export const PreviousButton = ({ currentPage, pageCount, onNavigate, text }) => currentPage > 0 ?
  h("a", { href: "#", onClick: e => clickHandler(e, () => onNavigate(currentPage - 1)), class: "elsa-pager-button previous" }, text) : undefined;
export const NextButton = ({ currentPage, pageCount, onNavigate, text }) => currentPage < pageCount ?
  h("a", { href: "#", onClick: e => clickHandler(e, () => onNavigate(currentPage + 1)), class: "elsa-pager-button next" }, text) : undefined;
export const ChevronLeft = ({ currentPage, pageCount, onNavigate }) => currentPage > 0 ?
  h("a", { href: "#", onClick: e => clickHandler(e, () => onNavigate(currentPage - 1)), class: "elsa-pager-chevron left", "aria-label": "Previous" }, h("svg", { class: "tw-h-5 tw-w-5", "x-description": "Heroicon name: chevron-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, h("path", { "fill-rule": "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", "clip-rule": "evenodd" }))) : undefined;
export const ChevronRight = ({ currentPage, pageCount, onNavigate }) => currentPage < pageCount - 1 ?
  h("a", { href: "#", onClick: e => clickHandler(e, () => onNavigate(currentPage + 1)), class: "elsa-pager-chevron right", "aria-label": "Next" }, h("svg", { class: "tw-h-5 tw-w-5", "x-description": "Heroicon name: chevron-right", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, h("path", { "fill-rule": "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd" }))) : undefined;
export const PagerButtons = ({ currentPage, pageCount, onNavigate }) => {
  const buttons = [];
  const maxPageButtons = 10;
  const fromPage = Math.max(0, currentPage - maxPageButtons / 2);
  const toPage = Math.min(pageCount, fromPage + maxPageButtons);
  for (let i = fromPage; i < toPage; i++) {
    const isCurrent = currentPage == i;
    const isFirst = i == fromPage;
    const isLast = i == toPage - 1;
    const leftRoundedClass = isFirst && isCurrent ? 'tw-rounded-l-md' : '';
    const rightRoundedClass = isLast && isCurrent ? 'tw-rounded-r-md' : '';
    if (isCurrent) {
      buttons.push(h("span", { class: `-tw-ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-text-sm tw-leading-5 tw-font-medium tw-bg-blue-600 tw-text-white ${leftRoundedClass} ${rightRoundedClass}` }, i + 1));
    }
    else {
      buttons.push(h("a", { href: "#", onClick: e => clickHandler(e, () => onNavigate(i)), class: `-tw-ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-bg-white tw-text-sm tw-leading-5 tw-font-medium tw-text-gray-700 hover:tw-text-gray-500 focus:tw-z-10 focus:tw-outline-none active:tw-bg-gray-100 active:tw-text-gray-700 tw-transition tw-ease-in-out tw-duration-150 ${leftRoundedClass}` }, i + 1));
    }
  }
  return buttons;
};
//# sourceMappingURL=controls.js.map
