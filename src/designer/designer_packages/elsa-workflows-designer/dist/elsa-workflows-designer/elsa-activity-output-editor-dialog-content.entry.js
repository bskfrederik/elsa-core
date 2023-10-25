import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { l as lodash } from './lodash-cadbac1e.js';
import { s as state } from './descriptors-store-02a4f91c.js';
import { F as FormEntry } from './form-entry-c5af3e68.js';
import './_commonjsHelpers-a4f66ccd.js';
import './index-4ac684d0.js';
import './hint-ef7d4b14.js';

const ActivityOutputEditorDialogContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  render() {
    var _a;
    const output = (_a = this.output) !== null && _a !== void 0 ? _a : { name: '', type: 'Object', isArray: false };
    const outputTypeName = output.type;
    const availableTypes = state.variableDescriptors;
    const groupedTypes = lodash.groupBy(availableTypes, x => x.category);
    return (h("div", null, h("form", { ref: el => this.formElement = el, class: "tw-h-full tw-flex tw-flex-col tw-bg-white", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, "Edit output definition"), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h(FormEntry, { fieldId: "outputName", label: "Name", hint: "The technical name of the output." }, h("input", { type: "text", name: "outputName", id: "outputName", value: output.name })), h(FormEntry, { fieldId: "outputTypeName", label: "Type", hint: "The type of the output." }, h("select", { id: "outputTypeName", name: "outputTypeName" }, Object.keys(groupedTypes).map(category => {
      const types = groupedTypes[category];
      return (h("optgroup", { label: category }, types.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == outputTypeName }, descriptor.displayName))));
    }))), h(FormEntry, { fieldId: "outputDisplayName", label: "Display name", hint: "The user friendly display name of the output." }, h("input", { type: "text", name: "outputDisplayName", id: "outputDisplayName", value: output.displayName })), h(FormEntry, { fieldId: "outputDescription", label: "Description", hint: "A description of the output." }, h("input", { type: "text", name: "outputDescription", id: "outputDescription", value: output.description })))))));
  }
};

export { ActivityOutputEditorDialogContent as elsa_activity_output_editor_dialog_content };

//# sourceMappingURL=elsa-activity-output-editor-dialog-content.entry.js.map