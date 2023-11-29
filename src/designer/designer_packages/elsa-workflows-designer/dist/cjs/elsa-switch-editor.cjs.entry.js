'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
const plus = require('./plus-e42841fc.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./notification-service-99c155e7.js');

const SwitchEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.supportedSyntaxes = [utils.SyntaxNames.JavaScript, utils.SyntaxNames.Literal];
    this.updateActivity = () => {
      const inputContext = this.inputContext;
      const activity = this.inputContext.activity;
      const inputDescriptor = inputContext.inputDescriptor;
      const propertyName = inputDescriptor.name;
      const camelCasePropertyName = lodash.lodash.camelCase(propertyName);
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
    const camelCasePropertyName = lodash.lodash.camelCase(propertyName);
    this.cases = activity[camelCasePropertyName] || [];
  }
  onAddCaseClick() {
    const caseName = `Case ${this.cases.length + 1}`;
    const newCase = { label: caseName, condition: { type: utils.SyntaxNames.JavaScript, value: '' } };
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
    return (index.h("div", null, index.h("div", { class: "tw-p-4" }, index.h("label", null, displayName)), index.h("table", { class: "tw-mt-1" }, index.h("thead", null, index.h("tr", null, index.h("th", { class: "tw-w-3/12" }, "Name"), index.h("th", { class: "tw-w-8/12" }, "Expression"), index.h("th", { class: "tw-w-1/12" }, "\u00A0"))), index.h("tbody", null, cases.map((switchCase, index$1) => {
      const condition = switchCase.condition;
      const expression = condition.value;
      const syntax = condition.type;
      const language = utils.mapSyntaxToLanguage(condition.type);
      return (index.h("tr", { key: `case-${index$1}` }, index.h("td", { class: "tw-py-2 tw-pr-5" }, index.h("input", { type: "text", value: switchCase.label, onChange: e => this.onCaseLabelChanged(e, switchCase) })), index.h("td", { class: "tw-py-2 tw-pl-5" }, index.h("div", { class: "tw-mt-1 tw-relative tw-rounded-md tw-shadow-sm tw-h-full" }, index.h("elsa-monaco-editor", { key: `monaco-editor-${index$1}`, value: expression, language: language, singleLineMode: true, editorHeight: "2.75em", padding: "tw-pt-1.5 tw-pl-1 tw-pr-28", onValueChanged: e => this.onCaseExpressionChanged(e, switchCase) }), index.h("div", { class: "tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center" }, index.h("select", { onChange: e => this.onCaseSyntaxChanged(e, switchCase), class: "focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-h-full tw-py-0 tw-pl-2 tw-pr-7 tw-border-transparent tw-bg-transparent tw-text-gray-500 sm:tw-text-sm tw-rounded-md" }, supportedSyntaxes.map(supportedSyntax => {
        const selected = supportedSyntax == syntax;
        return index.h("option", { selected: selected }, supportedSyntax);
      }))))), index.h("td", null, index.h("button", { type: "button", onClick: () => this.onDeleteCaseClick(switchCase), class: "elsa-icon-button" }, index.h(plus.TrashBinButtonIcon, null)))));
    }))), index.h("div", { class: "tw-p-4" }, index.h("button", { type: "button", onClick: () => this.onAddCaseClick(), class: "elsa-btn" }, index.h(plus.PlusButtonIcon, null), "Add Case"))));
  }
  static get watchers() { return {
    "inputContext": ["onInputContextChanged"]
  }; }
};

exports.elsa_switch_editor = SwitchEditor;

//# sourceMappingURL=elsa-switch-editor.cjs.entry.js.map