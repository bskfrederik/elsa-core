'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
require('./_commonjsHelpers-dcc4cf71.js');

const inputTagsCss = ".tag-input{outline:none !important;box-shadow:none !important;max-width:-moz-max-content !important;max-width:max-content !important;display:inline-block !important}";

const InputTags = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.valueChanged = index.createEvent(this, "valueChanged", 7);
    this.addItem = async (item) => {
      const values = lodash.lodash.uniq([...this.values || [], item]);
      this.values = values;
      await this.valueChanged.emit(values);
    };
    this.fieldId = undefined;
    this.placeHolder = 'Add tag';
    this.values = [];
  }
  async onInputKeyDown(e) {
    if (e.key != "Enter")
      return;
    e.preventDefault();
    const input = e.target;
    const value = input.value.trim();
    if (value.length == 0)
      return;
    await this.addItem(value);
    input.value = '';
  }
  async onInputBlur(e) {
    const input = e.target;
    const value = input.value.trim();
    if (value.length == 0)
      return;
    await this.addItem(value);
    input.value = '';
  }
  async onDeleteTagClick(e, tag) {
    e.preventDefault();
    this.values = this.values.filter(x => x !== tag);
    await this.valueChanged.emit(this.values);
  }
  render() {
    let values = this.values || [];
    if (!Array.isArray(values))
      values = [];
    return (index.h("div", { class: "tw-py-2 tw-px-3 tw-bg-white tw-shadow-sm tw-border tw-border-gray-300 tw-rounded-md" }, values.map(value => (index.h("a", { href: "#", onClick: e => this.onDeleteTagClick(e, value), class: "tw-inline-block tw-text-xs tw-bg-blue-400 tw-text-white tw-py-2 tw-px-3 tw-mr-1 tw-mb-1 tw-rounded" }, index.h("span", null, value), index.h("span", { class: "tw-text-white hover:tw-text-white tw-ml-1" }, "\u00D7")))), index.h("input", { type: "text", id: this.fieldId, onKeyDown: e => this.onInputKeyDown(e), onBlur: e => this.onInputBlur(e), class: "tag-input tw-inline-block tw-text-sm tw-outline-none focus:tw-outline-none tw-border-none tw-shadow-none focus:tw-border-none focus:tw-border-transparent focus:tw-shadow-none", placeholder: this.placeHolder })));
  }
};
InputTags.style = inputTagsCss;

exports.elsa_input_tags = InputTags;

//# sourceMappingURL=elsa-input-tags.cjs.entry.js.map