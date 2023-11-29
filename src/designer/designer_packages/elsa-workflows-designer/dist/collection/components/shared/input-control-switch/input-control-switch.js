import { h } from '@stencil/core';
import { debounce } from 'lodash';
import { enter, leave, toggle } from 'el-transition';
import { SyntaxNames } from "../../../models";
import { SyntaxSelectorIcon } from "../../icons/tooling/syntax-selector";
import { Hint } from "../forms/hint";
import { mapSyntaxToLanguage } from "../../../utils";
import { Container } from "typedi";
import { ElsaClientProvider } from "../../../services";
import InputControlSwitchContextState from "./state";
export class InputControlSwitch {
  constructor() {
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
    this.onExpressionChangedDebounced = debounce(this.onExpressionChanged, 10);
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
  static get is() { return "elsa-input-control-switch"; }
  static get properties() {
    return {
      "workflowDefinitionId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "workflow-definition-id",
        "reflect": false
      },
      "activityType": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "activity-type",
        "reflect": false
      },
      "propertyName": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "property-name",
        "reflect": false
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label",
        "reflect": false
      },
      "hideLabel": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "hide-label",
        "reflect": false
      },
      "hint": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "hint",
        "reflect": false
      },
      "fieldName": {
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
        "attribute": "field-name",
        "reflect": false
      },
      "syntax": {
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
        "attribute": "syntax",
        "reflect": false
      },
      "expression": {
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
        "attribute": "expression",
        "reflect": false
      },
      "defaultSyntax": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "default-syntax",
        "reflect": false,
        "defaultValue": "SyntaxNames.Literal"
      },
      "supportedSyntaxes": {
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
        "defaultValue": "['JavaScript', 'Liquid']"
      },
      "isReadOnly": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-read-only",
        "reflect": false
      },
      "codeEditorHeight": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "code-editor-height",
        "reflect": false,
        "defaultValue": "'16em'"
      },
      "codeEditorSingleLineMode": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "code-editor-single-line-mode",
        "reflect": false,
        "defaultValue": "false"
      },
      "context": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IntellisenseContext",
          "resolved": "IntellisenseContext",
          "references": {
            "IntellisenseContext": {
              "location": "import",
              "path": "../../../models"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "currentExpression": {}
    };
  }
  static get events() {
    return [{
        "method": "syntaxChanged",
        "name": "syntaxChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "expressionChanged",
        "name": "expressionChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ExpressionChangedArs",
          "resolved": "ExpressionChangedArs",
          "references": {
            "ExpressionChangedArs": {
              "location": "local",
              "path": "C:/dev/elsav3/elsa-core/src/designer/designer_packages/elsa-workflows-designer/src/components/shared/input-control-switch/input-control-switch.tsx"
            }
          }
        }
      }];
  }
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
InputControlSwitchContextState.injectProps(InputControlSwitch, ['workflowDefinitionId', 'activityType', 'propertyName']);
//# sourceMappingURL=input-control-switch.js.map
