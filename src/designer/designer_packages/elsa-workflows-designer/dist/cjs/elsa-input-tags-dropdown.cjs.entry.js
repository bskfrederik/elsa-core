'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
require('./_commonjsHelpers-dcc4cf71.js');

const InputTagsDropdown = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.valueChanged = index.createEvent(this, "valueChanged", 7);
    this.updateCurrentValues = (newValue) => {
      const dropdownValues = this.dropdownValues || [];
      let values = [];
      if (!!newValue) {
        newValue.forEach(value => {
          const valueKey = typeof (value) == 'string' ? value : value.value;
          const tag = dropdownValues.find(x => x.value == valueKey);
          if (!!tag)
            values.push(tag);
        });
      }
      this.currentValues = values;
    };
    this.fieldName = undefined;
    this.fieldId = undefined;
    this.placeHolder = 'Add tag';
    this.values = [];
    this.dropdownValues = [];
    this.currentValues = [];
  }
  valuesChangedHandler(newValue) {
    this.updateCurrentValues(newValue);
  }
  componentWillLoad() {
    this.updateCurrentValues(this.values);
  }
  async onTagSelected(e) {
    e.preventDefault();
    const input = e.target;
    const currentTag = {
      text: input.options[input.selectedIndex].text.trim(),
      value: input.value
    };
    if (currentTag.value.length == 0)
      return;
    const values = lodash.lodash.uniq([...this.currentValues, currentTag]);
    input.value = "Add";
    await this.valueChanged.emit(values);
  }
  async onDeleteTagClick(e, currentTag) {
    e.preventDefault();
    this.currentValues = this.currentValues.filter(tag => tag.value !== currentTag.value);
    await this.valueChanged.emit(this.currentValues);
  }
  render() {
    let values = this.currentValues || [];
    let dropdownItems = this.dropdownValues.filter(x => values.findIndex(y => y.value === x.value) < 0);
    if (!Array.isArray(values))
      values = [];
    const valuesJson = JSON.stringify(values.map(tag => tag.value));
    return (index.h("div", { class: "tw-py-2 tw-px-3 tw-bg-white tw-shadow-sm tw-border tw-border-gray-300 tw-rounded-md" }, values.map(tag => (index.h("a", { href: "#", onClick: e => this.onDeleteTagClick(e, tag), class: "tw-inline-block tw-text-xs tw-bg-blue-400 tw-text-white tw-py-2 tw-px-3 tw-mr-1 tw-mb-1 tw-rounded" }, index.h("input", { type: "hidden", value: tag.value }), index.h("span", null, tag.text), index.h("span", { class: "tw-text-white hover:tw-text-white tw-ml-1" }, "\u00D7")))), index.h("select", { id: this.fieldId, class: "tw-inline-block tw-text-xs tw-py-2 tw-px-3 tw-mr-1 tw-mb-1 tw-pr-8 tw-border-gray-300 focus:tw-outline-none focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-rounded", onChange: (e) => this.onTagSelected(e) }, index.h("option", { value: "Add", disabled: true, selected: true }, this.placeHolder), dropdownItems.map(tag => index.h("option", { value: tag.value }, tag.text))), index.h("input", { type: "hidden", name: this.fieldName, value: valuesJson })));
  }
  static get watchers() { return {
    "values": ["valuesChangedHandler"]
  }; }
};

exports.elsa_input_tags_dropdown = InputTagsDropdown;

//# sourceMappingURL=elsa-input-tags-dropdown.cjs.entry.js.map