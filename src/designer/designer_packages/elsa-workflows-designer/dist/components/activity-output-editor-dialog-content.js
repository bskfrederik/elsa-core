import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { s as state } from './descriptors-store.js';
import { F as FormEntry } from './form-entry.js';
import { g as getLocaleComponentStrings } from './locale.js';

const ActivityOutputEditorDialogContent = /*@__PURE__*/ proxyCustomElement(class ActivityOutputEditorDialogContent extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.outputChanged = createEvent(this, "outputChanged", 7);
    this.onSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const output = this.getOutputInternal(form);
      this.outputChanged.emit(output);
    };
    this.getOutputInternal = (form) => {
      const formData = new FormData(form);
      const name = formData.get('outputName');
      const displayName = formData.get('outputDisplayName');
      const type = formData.get('outputTypeName');
      const description = formData.get('outputDescription');
      const output = this.output;
      output.name = name;
      output.type = type;
      output.displayName = displayName;
      output.description = description;
      return output;
    };
    this.output = undefined;
  }
  async getOutput() {
    return this.getOutputInternal(this.formElement);
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }
  render() {
    var _a;
    const output = (_a = this.output) !== null && _a !== void 0 ? _a : { name: '', type: 'Object', isArray: false };
    const outputTypeName = output.type;
    const availableTypes = state.variableDescriptors;
    const groupedTypes = lodash.groupBy(availableTypes, x => x.category);
    return (h("div", null, h("form", { ref: el => this.formElement = el, class: "tw-h-full tw-flex tw-flex-col tw-bg-white", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, this.strings.editOutputDefinition), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h(FormEntry, { fieldId: "outputName", label: this.strings.outputName, hint: this.strings.outputNameHint }, h("input", { type: "text", name: "outputName", id: "outputName", value: output.name })), h(FormEntry, { fieldId: "outputTypeName", label: this.strings.outputType, hint: this.strings.outputTypeHint }, h("select", { id: "outputTypeName", name: "outputTypeName" }, Object.keys(groupedTypes).map(category => {
      const types = groupedTypes[category];
      return (h("optgroup", { label: category }, types.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == outputTypeName }, descriptor.displayName))));
    }))), h(FormEntry, { fieldId: "outputDisplayName", label: this.strings.outputDisplayName, hint: this.strings.outputDisplayNameHint }, h("input", { type: "text", name: "outputDisplayName", id: "outputDisplayName", value: output.displayName })), h(FormEntry, { fieldId: "outputDescription", label: this.strings.outputDescription, hint: this.strings.outputDescriptionHint }, h("input", { type: "text", name: "outputDescription", id: "outputDescription", value: output.description })))))));
  }
  get element() { return this; }
}, [0, "elsa-activity-output-editor-dialog-content", {
    "output": [16],
    "getOutput": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-activity-output-editor-dialog-content"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-activity-output-editor-dialog-content":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActivityOutputEditorDialogContent);
      }
      break;
  } });
}

export { ActivityOutputEditorDialogContent as A, defineCustomElement as d };

//# sourceMappingURL=activity-output-editor-dialog-content.js.map