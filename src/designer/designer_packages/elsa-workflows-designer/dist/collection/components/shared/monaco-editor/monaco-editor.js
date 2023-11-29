import { h, Host } from '@stencil/core';
import { initializeMonacoWorker, EditorVariables } from "./utils";
import monacoStore from '../../../data/monaco-store';
export class ElsaMonaco {
  constructor() {
    this.editorHeight = '5em';
    this.value = undefined;
    this.language = undefined;
    this.singleLineMode = false;
    this.padding = undefined;
  }
  async languageChangeHandler(newValue) {
    if (!this.editor)
      return;
    const model = this.editor.getModel();
    const monaco = await this.getMonaco();
    monaco.editor.setModelLanguage(model, this.language);
  }
  async setValue(value) {
    if (!this.editor)
      return;
    const model = this.editor.getModel();
    model.setValue(value || '');
  }
  async addJavaScriptLib(libSource, libUri) {
    const monaco = await this.getMonaco();
    monaco.languages.typescript.javascriptDefaults.setExtraLibs([{
        filePath: "lib.es5.d.ts"
      }, {
        content: libSource,
        filePath: libUri
      }]);
    const oldModel = monaco.editor.getModel(libUri);
    if (oldModel)
      oldModel.dispose();
    const newModel = monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
    const matches = libSource.matchAll(/declare const (\w+): (string|number)/g);
    EditorVariables.splice(0, EditorVariables.length);
    for (const match of matches) {
      EditorVariables.push({ variableName: match[1], type: match[2] });
    }
  }
  async componentDidLoad() {
    const monaco = await this.getMonaco();
    const language = this.language;
    // Validation settings.
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
    // Compiler options.
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      lib: [],
      allowNonTsExtensions: true
    });
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    const defaultOptions = {
      value: this.value,
      language: language,
      fontFamily: "Roboto Mono, monospace",
      renderLineHighlight: 'none',
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      lineNumbers: "on",
      theme: "vs",
      roundedSelection: true,
      scrollBeyondLastLine: false,
      readOnly: false,
      overviewRulerLanes: 0,
      overviewRulerBorder: false,
      lineDecorationsWidth: 0,
      hideCursorInOverviewRuler: true,
      glyphMargin: false
    };
    let options = defaultOptions;
    if (this.singleLineMode) {
      options = Object.assign(Object.assign({}, defaultOptions), {
        wordWrap: 'off',
        lineNumbers: 'off',
        lineNumbersMinChars: 0,
        folding: false,
        scrollBeyondLastColumn: 0,
        scrollbar: { horizontal: 'hidden', vertical: 'hidden' },
        find: { addExtraSpaceOnTop: false, autoFindInSelection: 'never', seedSearchStringFromSelection: false },
      });
    }
    this.editor = monaco.editor.create(this.container, options);
    this.editor.onDidChangeModelContent(e => {
      const value = this.editor.getValue();
      const markers = monaco.editor.getModelMarkers({ owner: language });
      this.valueChanged.emit({ value: value, markers: markers });
    });
    if (this.singleLineMode) {
      this.editor.onKeyDown(e => {
        if (e.keyCode == monaco.KeyCode.Enter) {
          // We only prevent enter when the suggest model is not active
          if (this.editor.getContribution('editor.contrib.suggestController').model.state == 0) {
            e.preventDefault();
          }
        }
      });
      this.editor.onDidPaste(e => {
        if (e.range.endLineNumber > 1) {
          let newContent = "";
          const model = this.editor.getModel();
          let lineCount = model.getLineCount();
          for (let i = 0; i < lineCount; i++) {
            newContent += model.getLineContent(i + 1);
          }
          model.setValue(newContent);
        }
      });
    }
  }
  async getMonaco() {
    if (!!this.monaco)
      return this.monaco;
    const monacoLibPath = monacoStore.monacoLibPath;
    return this.monaco = await initializeMonacoWorker(monacoLibPath);
  }
  disconnectedCallback() {
    const editor = this.editor;
    if (!!editor)
      editor.dispose();
  }
  render() {
    const padding = this.padding || 'tw-pt-1.5 tw-pl-1';
    return (h(Host, { class: "monaco-editor-host tw-border focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-block tw-w-full tw-min-w-0 tw-rounded-md sm:tw-text-sm tw-border-gray-300 tw-p-4", style: { 'min-height': this.editorHeight } }, h("div", { ref: el => this.container = el, class: `monaco-editor-container ${padding}` })));
  }
  static get is() { return "elsa-monaco-editor"; }
  static get originalStyleUrls() {
    return {
      "$": ["monaco-editor.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["monaco-editor.css"]
    };
  }
  static get properties() {
    return {
      "editorHeight": {
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
        "attribute": "editor-height",
        "reflect": true,
        "defaultValue": "'5em'"
      },
      "value": {
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
        "attribute": "value",
        "reflect": false
      },
      "language": {
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
        "attribute": "language",
        "reflect": false
      },
      "singleLineMode": {
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
        "attribute": "single-line",
        "reflect": true,
        "defaultValue": "false"
      },
      "padding": {
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
        "attribute": "padding",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "valueChanged",
        "name": "valueChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "MonacoValueChangedArgs",
          "resolved": "MonacoValueChangedArgs",
          "references": {
            "MonacoValueChangedArgs": {
              "location": "local",
              "path": "C:/dev/elsav3/elsa-core/src/designer/designer_packages/elsa-workflows-designer/src/components/shared/monaco-editor/monaco-editor.tsx"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "setValue": {
        "complexType": {
          "signature": "(value: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "addJavaScriptLib": {
        "complexType": {
          "signature": "(libSource: string, libUri: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get watchers() {
    return [{
        "propName": "language",
        "methodName": "languageChangeHandler"
      }];
  }
}
//# sourceMappingURL=monaco-editor.js.map
