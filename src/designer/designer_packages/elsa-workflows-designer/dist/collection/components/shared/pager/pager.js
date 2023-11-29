import { h } from '@stencil/core';
import { ChevronLeft, ChevronRight, NextButton, PagerButtons, PreviousButton } from './controls';
import { getLocaleComponentStrings } from '../../../utils/locale';
export class ElsaPager {
  constructor() {
    this.navigate = (page) => this.paginated.emit({ page, pageSize: this.pageSize, totalCount: this.totalCount });
    this.onNavigate = (page) => this.navigate(page);
    this.page = undefined;
    this.pageSize = undefined;
    this.totalCount = undefined;
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }
  render() {
    const page = this.page;
    const pageSize = this.pageSize;
    const totalCount = this.totalCount;
    const from = totalCount == 0 ? 0 : page * pageSize + 1;
    const to = Math.min(from + pageSize - 1, totalCount);
    const pageCount = Math.round((totalCount - 1) / pageSize + 0.5);
    return (h("div", { class: "tw-bg-white tw-px-4 tw-py-3 tw-flex tw-items-center tw-justify-between tw-border-t tw-border-gray-200 sm:tw-px-6" }, h("div", { class: "tw-flex-1 tw-flex tw-justify-between" }, h(PreviousButton, { currentPage: page, pageCount: pageCount, onNavigate: this.onNavigate, text: this.strings.previous }), h(NextButton, { currentPage: page, pageCount: pageCount, onNavigate: this.onNavigate, text: this.strings.next })), h("div", { class: "hidden sm:tw-flex-1 sm:tw-flex sm:tw-items-center sm:tw-justify-between" }, h("div", null, h("p", { class: "tw-text-sm tw-leading-5 tw-text-gray-700 tw-space-x-0.5" }, h("span", null, this.strings.from), h("span", { class: "tw-font-medium" }, from), h("span", null, this.strings.to), h("span", { class: "tw-font-medium" }, to), h("span", null, this.strings.of), h("span", { class: "tw-font-medium" }, totalCount), h("span", null, this.strings.results))), h("div", null, h("nav", { class: "tw-relative tw-z-0 tw-inline-flex tw-shadow-sm" }, h(ChevronLeft, { currentPage: page, pageCount: pageCount, onNavigate: this.onNavigate, text: this.strings.previous }), h(PagerButtons, { currentPage: page, pageCount: pageCount, onNavigate: this.onNavigate, text: this.strings.previous }), h(ChevronRight, { currentPage: page, pageCount: pageCount, onNavigate: this.onNavigate, text: this.strings.next }))))));
  }
  static get is() { return "elsa-pager"; }
  static get properties() {
    return {
      "page": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "page",
        "reflect": false
      },
      "pageSize": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "page-size",
        "reflect": false
      },
      "totalCount": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "total-count",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "paginated",
        "name": "paginated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "PagerData",
          "resolved": "PagerData",
          "references": {
            "PagerData": {
              "location": "local",
              "path": "C:/dev/elsav3/elsa-core/src/designer/designer_packages/elsa-workflows-designer/src/components/shared/pager/pager.tsx"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
//# sourceMappingURL=pager.js.map
