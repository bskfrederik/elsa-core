import { h } from "@stencil/core";
import { TinyColor } from "@ctrl/tinycolor";
import { debounce } from 'lodash';
import { leave, toggle } from 'el-transition';
import labelStore from './label-store';
import { Badge } from "../../components/shared/badge/badge";
import { ConfigIcon } from "../../components/icons/tooling/config";
import { TickIcon } from "../../components/icons/tooling/tick";
import { isNullOrWhitespace } from "../../utils";
export class LabelPicker {
  constructor() {
    this.renderFlyout = () => {
      const selectedLabels = this.selectedLabels;
      const labels = this.filteredLabels;
      const searchText = this.searchText;
      return h("div", { ref: el => this.flyoutPanel = el, class: "tw-absolute tw-z-10 tw-right-0 tw-transform tw-mt-3 tw-px-2 tw-w-screen tw-max-w-md tw-px-0 hidden", "data-transition-enter": "tw-transition tw-ease-out tw-duration-200", "data-transition-enter-start": "tw-opacity-0 tw-translate-y-1", "data-transition-enter-end": "tw-opacity-100 tw-translate-y-0", "data-transition-leave": "tw-transition tw-ease-in tw-duration-150", "data-transition-leave-start": "tw-opacity-100 tw-translate-y-0", "data-transition-leave-end": "tw-opacity-0 tw-translate-y-1" }, h("div", { class: "tw-rounded-lg tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-overflow-hidden" }, h("div", { class: "tw-mx-auto tw-max-w-3xl tw-transform tw-divide-y tw-divide-gray-100 tw-overflow-hidden tw-rounded-xl tw-bg-white tw-shadow-2xl tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-transition-all tw-opacity-100 tw-scale-100" }, h("div", { class: "tw-relative" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", class: "tw-pointer-events-none tw-absolute top-3.5 left-4 tw-h-5 tw-w-5 tw-text-gray-400" }, h("path", { "fill-rule": "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", "clip-rule": "evenodd" })), h("input", { class: "tw-h-12 tw-w-full tw-border-0 tw-bg-transparent tw-pl-11 tw-pr-4 tw-text-gray-800 tw-placeholder-gray-400 focus:tw-ring-0 sm:tw-text-sm", placeholder: "Search...", role: "combobox", type: "text", ref: el => this.searchTextElement = el, onInput: e => this.onSearchTextChanged(e), value: searchText })), h("ul", { class: "tw-max-h-96 tw-scroll-py-3 tw-overflow-y-auto tw-p-1", role: "listbox" }, labels.map(label => {
        const color = new TinyColor(label.color).lighten(40).toHexString();
        const colorStyle = { backgroundColor: color };
        const isSelected = !!selectedLabels.find(x => x == label.id);
        return (h("li", { role: "option", "tab-index": "-1" }, h("a", { class: "tw-block tw-select-none tw-rounded-xl tw-p-3 tw-bg-white hover:tw-bg-gray-100", href: "#", onClick: e => this.onLabelClick(e, label) }, h("div", { class: "tw-flex tw-justify-start tw-gap-1.5" }, h("div", { class: "tw-flex-none tw-w-8" }, isSelected ? h(TickIcon, null) : undefined), h("div", { class: "tw-flex-grow " }, h("div", { class: "tw-flex tw-gap-1.5" }, h("div", { class: "tw-flex-shrink-0 tw-flex tw-flex-col tw-justify-center " }, h("div", { class: "tw-w-4 tw-h-4 tw-rounded-full", style: colorStyle, "aria-hidden": "true" })), h("div", { class: "tw-flex-grow" }, h("p", { class: "tw-text-sm tw-font-medium tw-text-gray-900 tw-font-bold" }, label.name))), h("div", null, h("p", { class: "tw-text-sm tw-font-normal tw-text-gray-500" }, label.description)))))));
      })))));
    };
    this.renderLabel = (labelId) => {
      const label = labelStore.labels.find(x => x.id == labelId);
      return h("div", { class: "tw-mr-2" }, h(Badge, { text: label.name, color: label.color }));
    };
    this.closeFlyoutPanel = () => {
      if (!!this.flyoutPanel)
        leave(this.flyoutPanel);
    };
    this.toggleFlyoutPanel = () => {
      this.filterLabelsDebounced();
      this.searchText = null;
      toggle(this.flyoutPanel);
      if (!!this.searchTextElement)
        this.searchTextElement.value = '';
      this.searchTextElement.focus();
    };
    this.filterLabels = () => {
      const searchText = this.searchText;
      if (isNullOrWhitespace(searchText)) {
        this.filteredLabels = labelStore.labels;
        return;
      }
      const s = searchText.toLocaleLowerCase();
      this.filteredLabels = labelStore.labels.filter(x => x.name.toLocaleLowerCase().includes(s) || x.description.toLocaleLowerCase().includes(s));
    };
    this.getFilteredSelectedLabels = () => {
      const labels = labelStore.labels;
      return this.selectedLabels.filter(labelId => !!labels.find(x => x.id == labelId));
    };
    this.onLabelClick = (e, label) => {
      if (!this.selectedLabels.find(x => x == label.id))
        this.selectedLabels = [...this.selectedLabels, label.id];
      else
        this.selectedLabels = this.selectedLabels.filter(x => x != label.id);
      const selectedLabels = this.getFilteredSelectedLabels();
      this.selectedLabels = selectedLabels;
      this.selectedLabelsChanged.emit(selectedLabels);
    };
    this.onSearchTextChanged = (e) => {
      const value = e.target.value.trim();
      this.searchText = value;
      this.filterLabelsDebounced();
    };
    this.selectedLabels = [];
    this.buttonClass = 'tw-text-blue-500 hover:tw-text-blue-300';
    this.containerClass = undefined;
    this.selectedLabelsState = [];
    this.searchText = undefined;
    this.filteredLabels = undefined;
    this.filterLabelsDebounced = debounce(this.filterLabels, 200);
    this.filteredLabels = labelStore.labels;
  }
  onWindowClicked(event) {
    const target = event.target;
    if (!this.element.contains(target))
      this.closeFlyoutPanel();
  }
  render() {
    const selectedLabels = this.getFilteredSelectedLabels();
    return h("div", { class: `tw-flex ${this.containerClass}` }, h("div", { class: "tw-flex tw-flex-grow" }, selectedLabels.map(this.renderLabel)), h("div", { class: "tw-relative" }, h("button", { onClick: e => this.toggleFlyoutPanel(), class: this.buttonClass }, h(ConfigIcon, null)), this.renderFlyout()));
  }
  static get is() { return "elsa-label-picker"; }
  static get properties() {
    return {
      "selectedLabels": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<string>",
          "resolved": "string[]",
          "references": {
            "Array": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "buttonClass": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "button-class",
        "reflect": false,
        "defaultValue": "'tw-text-blue-500 hover:tw-text-blue-300'"
      },
      "containerClass": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "container-class",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "selectedLabelsState": {},
      "searchText": {},
      "filteredLabels": {}
    };
  }
  static get events() {
    return [{
        "method": "selectedLabelsChanged",
        "name": "selectedLabelsChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Array<string>",
          "resolved": "string[]",
          "references": {
            "Array": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "click",
        "method": "onWindowClicked",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=label-picker.js.map
