import { h, proxyCustomElement, HTMLElement, createEvent } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { t as toggle, e as enter, l as leave } from './index3.js';
import { R as SyntaxNames, C as Container, a as ElsaClientProvider, m as mapSyntaxToLanguage } from './utils.js';
import { H as Hint } from './hint.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { I as InputControlSwitchContextState } from './state2.js';
import { d as defineCustomElement$2 } from './state-tunnel.js';
import { d as defineCustomElement$1 } from './monaco-editor.js';

const SyntaxSelectorIcon = () => h("svg", { class: "tw-h-5 tw-w-5 tw-text-gray-400", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("circle", { cx: "12", cy: "12", r: "9" }),
  h("line", { x1: "8", y1: "12", x2: "8", y2: "12.01" }),
  h("line", { x1: "12", y1: "12", x2: "12", y2: "12.01" }),
  h("line", { x1: "16", y1: "12", x2: "16", y2: "12.01" }));

const InputControlSwitch = /*@__PURE__*/ proxyCustomElement(class InputControlSwitch extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.syntaxChanged = createEvent(this, "syntaxChanged", 7);
    this.expressionChanged = createEvent(this, "expressionChanged", 7);
    this.shouldRenderMonaco = () => !!this.syntax && this.syntax != 'Literal' && !!this.supportedSyntaxes.find(x => x === this.syntax);
    this.renderContextMenuButton = () => this.shouldRenderMonaco() ? h("span", null, this.syntax) : h(SyntaxSelectorIcon, null);
    this.renderEditor = () => {
      const selectedSyntax = this.syntax;
      const monacoLanguage = mapSyntaxToLanguage(selectedSyntax);
      const value = this.expression;
      const showMonaco = !!selectedSyntax && selectedSyntax != 'Literal' && !!this.supportedSyntaxes.find(x => x === selectedSyntax);
      const expressionEditorClass = showMonaco ? 'tw-block' : 'hidden';
      const defaultEditorClass = showMonaco ? 'hidden' : 'tw-block';
      return (h("div", null, h("div", { class: expressionEditorClass }, h("elsa-monaco-editor", { value: value, language: monacoLanguage, "editor-height": this.codeEditorHeight, "single-line": this.codeEditorSingleLineMode, onValueChanged: e => this.onExpressionChangedDebounced(e.detail), ref: el => this.monacoEditor = el })), h("div", { class: defaultEditorClass }, h("slot", null)), h(Hint, { text: this.hint })));
    };
    this.workflowDefinitionId = undefined;
    this.activityType = undefined;
    this.propertyName = undefined;
    this.label = undefined;
    this.hideLabel = undefined;
    this.hint = undefined;
    this.fieldName = undefined;
    this.syntax = undefined;
    this.expression = undefined;
    this.defaultSyntax = SyntaxNames.Literal;
    this.supportedSyntaxes = ['JavaScript', 'Liquid'];
    this.isReadOnly = undefined;
    this.codeEditorHeight = '16em';
    this.codeEditorSingleLineMode = false;
    this.context = undefined;
    this.currentExpression = undefined;
    this.onExpressionChangedDebounced = lodash.debounce(this.onExpressionChanged, 10);
  }
  onWindowClicked(event) {
    const target = event.target;
    if (!this.contextMenuWidget || !this.contextMenuWidget.contains(target))
      this.closeContextMenu();
  }
  async componentWillLoad() {
    this.currentExpression = this.expression;
  }
  async componentDidLoad() {
    const elsaClient = await Container.get(ElsaClientProvider).getElsaClient();
    const workflowDefinitionId = this.workflowDefinitionId;
    const activityTypeName = this.activityType;
    const propertyName = this.propertyName;
    const typeDefinitions = await elsaClient.scripting.javaScriptApi.getTypeDefinitions({ workflowDefinitionId, activityTypeName, propertyName });
    const libUri = 'defaultLib:lib.es6.d.ts';
    await this.monacoEditor.addJavaScriptLib(typeDefinitions, libUri);
  }
  render() {
    if (this.hideLabel && !this.shouldRenderMonaco()) {
      return h("div", { class: "tw-p-4" }, h("div", { class: "tw-flex" }, h("div", { class: "tw-flex-1" }, this.renderEditor()), this.renderContextMenuWidget()));
    }
    return h("div", { class: "tw-p-4" }, h("div", { class: "tw-mb-1" }, h("div", { class: "tw-flex" }, h("div", { class: "tw-flex-1" }, this.renderLabel()), this.renderContextMenuWidget())), this.renderEditor());
  }
  renderLabel() {
    const fieldId = this.fieldName;
    const fieldLabel = this.label || fieldId;
    return h("label", { htmlFor: fieldId, class: "tw-block tw-text-sm tw-font-medium tw-text-gray-700" }, fieldLabel);
  }
  renderContextMenuWidget() {
    if (this.supportedSyntaxes.length == 0)
      return undefined;
    const selectedSyntax = this.syntax;
    const advancedButtonClass = selectedSyntax ? 'tw-text-blue-500' : 'tw-text-gray-300';
    return h("div", { class: "tw-relative", ref: el => this.contextMenuWidget = el }, h("button", { type: "button", class: `tw-border-0 focus:tw-outline-none tw-text-sm ${advancedButtonClass}`, onClick: e => this.onSettingsClick(e) }, !this.isReadOnly ? this.renderContextMenuButton() : ""), h("div", null, h("div", { ref: el => this.contextMenu = el, "data-transition-enter": "tw-transition tw-ease-out tw-duration-100", "data-transition-enter-start": "tw-transform tw-opacity-0 tw-scale-95", "data-transition-enter-end": "tw-transform tw-opacity-100 tw-scale-100", "data-transition-leave": "tw-transition tw-ease-in tw-duration-75", "data-transition-leave-start": "tw-transform tw-opacity-100 tw-scale-100", "data-transition-leave-end": "tw-transform tw-opacity-0 tw-scale-95", class: "hidden tw-origin-top-right tw-absolute tw-right-1 tw-mt-1 tw-w-56 tw-rounded-md tw-shadow-lg tw-bg-white tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-divide-y tw-divide-gray-100 focus:tw-outline-none tw-z-10", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "options-menu" }, h("div", { class: "tw-py-1", role: "none" }, h("a", { onClick: e => this.selectSyntax(e, null), href: "#", class: `tw-block tw-px-4 tw-py-2 tw-text-sm hover:tw-bg-gray-100 hover:tw-text-gray-900 ${!selectedSyntax ? 'tw-text-blue-700' : 'tw-text-gray-700'}`, role: "menuitem" }, "Default")), h("div", { class: "tw-py-1", role: "none" }, this.supportedSyntaxes.map(syntax => (h("a", { onClick: e => this.selectSyntax(e, syntax), href: "#", class: `tw-block tw-px-4 tw-py-2 tw-text-sm hover:tw-bg-gray-100 hover:tw-text-gray-900 ${selectedSyntax == syntax ? 'tw-text-blue-700' : 'tw-text-gray-700'}`, role: "menuitem" }, syntax)))))));
  }
  toggleContextMenu() {
    toggle(this.contextMenu);
  }
  openContextMenu() {
    enter(this.contextMenu);
  }
  closeContextMenu() {
    if (!!this.contextMenu)
      leave(this.contextMenu);
  }
  selectDefaultEditor(e) {
    e.preventDefault();
    this.syntax = undefined;
    this.closeContextMenu();
  }
  async selectSyntax(e, syntax) {
    e.preventDefault();
    this.syntax = syntax;
    this.syntaxChanged.emit(syntax);
    this.expressionChanged.emit({ expression: this.currentExpression, syntax });
    this.closeContextMenu();
  }
  onSettingsClick(e) {
    this.toggleContextMenu();
  }
  onExpressionChanged(e) {
    const expression = e.value;
    this.currentExpression = expression;
    this.expressionChanged.emit({ expression, syntax: this.syntax });
  }
}, [4, "elsa-input-control-switch", {
    "workflowDefinitionId": [1025, "workflow-definition-id"],
    "activityType": [1025, "activity-type"],
    "propertyName": [1025, "property-name"],
    "label": [1],
    "hideLabel": [4, "hide-label"],
    "hint": [1],
    "fieldName": [1, "field-name"],
    "syntax": [1],
    "expression": [1],
    "defaultSyntax": [1, "default-syntax"],
    "supportedSyntaxes": [16],
    "isReadOnly": [4, "is-read-only"],
    "codeEditorHeight": [1, "code-editor-height"],
    "codeEditorSingleLineMode": [4, "code-editor-single-line-mode"],
    "context": [16],
    "currentExpression": [32]
  }, [[8, "click", "onWindowClicked"]]]);
InputControlSwitchContextState.injectProps(InputControlSwitch, ['workflowDefinitionId', 'activityType', 'propertyName']);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-input-control-switch", "context-consumer", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-input-control-switch":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, InputControlSwitch);
      }
      break;
    case "context-consumer":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-monaco-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { InputControlSwitch as I, defineCustomElement as d };

//# sourceMappingURL=input-control-switch.js.map