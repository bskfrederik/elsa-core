import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { l as lodash } from './lodash-cadbac1e.js';
import { _ as SyntaxNames, m as mapSyntaxToLanguage } from './index-7d63808a.js';
import { T as TrashBinButtonIcon, P as PlusButtonIcon } from './plus-acc35ad2.js';
import './_commonjsHelpers-a4f66ccd.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

const SwitchEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.supportedSyntaxes = [SyntaxNames.JavaScript, SyntaxNames.Literal];
    this.updateActivity = () => {
      const inputContext = this.inputContext;
      const activity = this.inputContext.activity;
      const inputDescriptor = inputContext.inputDescriptor;
      const propertyName = inputDescriptor.name;
      const camelCasePropertyName = lodash.camelCase(propertyName);
      activity[camelCasePropertyName] = this.cases;
      this.inputContext.notifyInputChanged();
    };
    this.inputContext = undefined;
    this.cases = [];
  }
  onInputContextChanged(value) {
    this.updateCases();
  }
  componentWillLoad() {
    this.updateCases();
  }
  updateCases() {
    const inputContext = this.inputContext;
    const activity = this.inputContext.activity;
    const inputDescriptor = inputContext.inputDescriptor;
    const propertyName = inputDescriptor.name;
    const camelCasePropertyName = lodash.camelCase(propertyName);
    this.cases = activity[camelCasePropertyName] || [];
  }
  onAddCaseClick() {
    const caseName = `Case ${this.cases.length + 1}`;
    const newCase = { label: caseName, condition: { type: SyntaxNames.JavaScript, value: '' } };
    this.cases = [...this.cases, newCase];
    this.updateActivity();
  }
  onDeleteCaseClick(switchCase) {
    this.cases = this.cases.filter(x => x != switchCase);
    this.updateActivity();
  }
  onCaseLabelChanged(e, switchCase) {
    switchCase.label = e.currentTarget.value.trim();
    this.updateActivity();
  }
  onCaseExpressionChanged(e, switchCase) {
    switchCase.condition = { type: switchCase.condition.type, value: e.detail.value };
    this.updateActivity();
  }
  onCaseSyntaxChanged(e, switchCase) {
    const select = e.currentTarget;
    const syntax = select.value;
    switchCase.condition = Object.assign(Object.assign({}, switchCase.condition), { type: syntax });
    this.cases = [...this.cases];
    this.updateActivity();
  }
  render() {
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const displayName = inputDescriptor.displayName;
    const cases = this.cases;
    const supportedSyntaxes = this.supportedSyntaxes;
    return (h("div", null, h("div", { class: "tw-p-4" }, h("label", null, displayName)), h("table", { class: "tw-mt-1" }, h("thead", null, h("tr", null, h("th", { class: "tw-w-3/12" }, "Name"), h("th", { class: "tw-w-8/12" }, "Expression"), h("th", { class: "tw-w-1/12" }, "\u00A0"))), h("tbody", null, cases.map((switchCase, index) => {
      const condition = switchCase.condition;
      const expression = condition.value;
      const syntax = condition.type;
      const language = mapSyntaxToLanguage(condition.type);
      return (h("tr", { key: `case-${index}` }, h("td", { class: "tw-py-2 tw-pr-5" }, h("input", { type: "text", value: switchCase.label, onChange: e => this.onCaseLabelChanged(e, switchCase) })), h("td", { class: "tw-py-2 tw-pl-5" }, h("div", { class: "tw-mt-1 tw-relative tw-rounded-md tw-shadow-sm tw-h-full" }, h("elsa-monaco-editor", { key: `monaco-editor-${index}`, value: expression, language: language, singleLineMode: true, editorHeight: "2.75em", padding: "tw-pt-1.5 tw-pl-1 tw-pr-28", onValueChanged: e => this.onCaseExpressionChanged(e, switchCase) }), h("div", { class: "tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center" }, h("select", { onChange: e => this.onCaseSyntaxChanged(e, switchCase), class: "focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-h-full tw-py-0 tw-pl-2 tw-pr-7 tw-border-transparent tw-bg-transparent tw-text-gray-500 sm:tw-text-sm tw-rounded-md" }, supportedSyntaxes.map(supportedSyntax => {
        const selected = supportedSyntax == syntax;
        return h("option", { selected: selected }, supportedSyntax);
      }))))), h("td", null, h("button", { type: "button", onClick: () => this.onDeleteCaseClick(switchCase), class: "elsa-icon-button" }, h(TrashBinButtonIcon, null)))));
    }))), h("div", { class: "tw-p-4" }, h("button", { type: "button", onClick: () => this.onAddCaseClick(), class: "elsa-btn" }, h(PlusButtonIcon, null), "Add Case"))));
  }
  static get watchers() { return {
    "inputContext": ["onInputContextChanged"]
  }; }
};

export { SwitchEditor as elsa_switch_editor };

//# sourceMappingURL=elsa-switch-editor.entry.js.map