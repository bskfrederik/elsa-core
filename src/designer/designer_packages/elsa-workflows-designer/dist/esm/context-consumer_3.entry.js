import { r as registerInstance, a as getElement, h, c as createEvent, H as Host } from './index-08112852.js';
import { l as lodash } from './lodash-fa7ebcea.js';
import { t as toggle, e as enter, l as leave } from './index-e3b8500f.js';
import { R as SyntaxNames, C as Container, a as ElsaClientProvider, m as mapSyntaxToLanguage, o as isNullOrWhitespace, aW as state } from './utils-972bf8be.js';
import { H as Hint } from './hint-4a493871.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import { I as InputControlSwitchContextState } from './state-61efd382.js';
import './_commonjsHelpers-7db8bc26.js';
import './index-01748867.js';
import './notification-service-c7fdb37c.js';
import './state-tunnel-464fcd1b.js';

const ContextConsumer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.context = {};
    this.renderer = () => null;
  }
  connectedCallback() {
    if (this.subscribe != null) {
      this.unsubscribe = this.subscribe(this.el, 'context');
    }
  }
  disconnectedCallback() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
    }
  }
  render() {
    return this.renderer(Object.assign({}, this.context));
  }
  get el() { return getElement(this); }
};

const SyntaxSelectorIcon = () => h("svg", { class: "tw-h-5 tw-w-5 tw-text-gray-400", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("circle", { cx: "12", cy: "12", r: "9" }),
  h("line", { x1: "8", y1: "12", x2: "8", y2: "12.01" }),
  h("line", { x1: "12", y1: "12", x2: "12", y2: "12.01" }),
  h("line", { x1: "16", y1: "12", x2: "16", y2: "12.01" }));

const InputControlSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
InputControlSwitchContextState.injectProps(InputControlSwitch, ['workflowDefinitionId', 'activityType', 'propertyName']);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var E_CANCELED = new Error('request for lock canceled');

var Semaphore = /** @class */ (function () {
    function Semaphore(_value, _cancelError) {
        if (_cancelError === void 0) { _cancelError = E_CANCELED; }
        this._value = _value;
        this._cancelError = _cancelError;
        this._weightedQueues = [];
        this._weightedWaiters = [];
    }
    Semaphore.prototype.acquire = function (weight) {
        var _this = this;
        if (weight === void 0) { weight = 1; }
        if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
        return new Promise(function (resolve, reject) {
            if (!_this._weightedQueues[weight - 1])
                _this._weightedQueues[weight - 1] = [];
            _this._weightedQueues[weight - 1].push({ resolve: resolve, reject: reject });
            _this._dispatch();
        });
    };
    Semaphore.prototype.runExclusive = function (callback, weight) {
        if (weight === void 0) { weight = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, value, release;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.acquire(weight)];
                    case 1:
                        _a = _b.sent(), value = _a[0], release = _a[1];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 4, 5]);
                        return [4 /*yield*/, callback(value)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        release();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Semaphore.prototype.waitForUnlock = function (weight) {
        var _this = this;
        if (weight === void 0) { weight = 1; }
        if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
        return new Promise(function (resolve) {
            if (!_this._weightedWaiters[weight - 1])
                _this._weightedWaiters[weight - 1] = [];
            _this._weightedWaiters[weight - 1].push(resolve);
            _this._dispatch();
        });
    };
    Semaphore.prototype.isLocked = function () {
        return this._value <= 0;
    };
    Semaphore.prototype.getValue = function () {
        return this._value;
    };
    Semaphore.prototype.setValue = function (value) {
        this._value = value;
        this._dispatch();
    };
    Semaphore.prototype.release = function (weight) {
        if (weight === void 0) { weight = 1; }
        if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
        this._value += weight;
        this._dispatch();
    };
    Semaphore.prototype.cancel = function () {
        var _this = this;
        this._weightedQueues.forEach(function (queue) { return queue.forEach(function (entry) { return entry.reject(_this._cancelError); }); });
        this._weightedQueues = [];
    };
    Semaphore.prototype._dispatch = function () {
        var _a;
        for (var weight = this._value; weight > 0; weight--) {
            var queueEntry = (_a = this._weightedQueues[weight - 1]) === null || _a === void 0 ? void 0 : _a.shift();
            if (!queueEntry)
                continue;
            var previousValue = this._value;
            var previousWeight = weight;
            this._value -= weight;
            weight = this._value + 1;
            queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
        }
        this._drainUnlockWaiters();
    };
    Semaphore.prototype._newReleaser = function (weight) {
        var _this = this;
        var called = false;
        return function () {
            if (called)
                return;
            called = true;
            _this.release(weight);
        };
    };
    Semaphore.prototype._drainUnlockWaiters = function () {
        for (var weight = this._value; weight > 0; weight--) {
            if (!this._weightedWaiters[weight - 1])
                continue;
            this._weightedWaiters[weight - 1].forEach(function (waiter) { return waiter(); });
            this._weightedWaiters[weight - 1] = [];
        }
    };
    return Semaphore;
}());

var Mutex = /** @class */ (function () {
    function Mutex(cancelError) {
        this._semaphore = new Semaphore(1, cancelError);
    }
    Mutex.prototype.acquire = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, releaser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._semaphore.acquire()];
                    case 1:
                        _a = _b.sent(), releaser = _a[1];
                        return [2 /*return*/, releaser];
                }
            });
        });
    };
    Mutex.prototype.runExclusive = function (callback) {
        return this._semaphore.runExclusive(function () { return callback(); });
    };
    Mutex.prototype.isLocked = function () {
        return this._semaphore.isLocked();
    };
    Mutex.prototype.waitForUnlock = function () {
        return this._semaphore.waitForUnlock();
    };
    Mutex.prototype.release = function () {
        if (this._semaphore.isLocked())
            this._semaphore.release();
    };
    Mutex.prototype.cancel = function () {
        return this._semaphore.cancel();
    };
    return Mutex;
}());

const win = window;
const require = win.require;
var EditorVariables = [];
let isInitialized;
const mutex = new Mutex();
async function initializeMonacoWorker(libPath) {
  return await mutex.runExclusive(async () => {
    if (isInitialized) {
      return win.monaco;
    }
    if (isNullOrWhitespace(libPath)) {
      // The lib path is not set, which means external code will be responsible for loading the Monaco editor.
      // In this case, spin while we wait for the editor to be loaded.
      // Create a promise that will resolve after the win.monaco variable exists. Do this in a tight loop, checking for win.monaco to exist on each iteration. Within the same iteration, request the next animation frame as to not tw-block the UI.
      // If we don't get win.monaco after 3 seconds, reject the promise.
      return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const timeout = 3000;
        const checkForMonaco = () => {
          if (win.monaco) {
            resolve(win.monaco);
            return;
          }
          if (Date.now() - startTime > timeout) {
            reject('Monaco editor not loaded.');
            return;
          }
          requestAnimationFrame(checkForMonaco);
        };
        checkForMonaco();
      });
    }
    const origin = document.location.origin;
    const baseUrl = libPath.startsWith('http') ? libPath : `${origin}/${libPath}`;
    require.config({ paths: { 'vs': `${baseUrl}/vs` } });
    win.MonacoEnvironment = { getWorkerUrl: () => proxy };
    let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: '${baseUrl}'
	};
	importScripts('${baseUrl}/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));
    return new Promise(resolve => {
      require(["vs/editor/editor.main"], () => {
        isInitialized = true;
        registerLiquid(win.monaco);
        registerSql(win.monaco);
        resolve(win.monaco);
      });
    });
  });
}
function registerLiquid(monaco) {
  monaco.languages.register({ id: 'liquid' });
  monaco.languages.registerCompletionItemProvider('liquid', {
    provideCompletionItems: () => {
      const autocompleteProviderItems = [];
      const keywords = ['assign', 'capture', 'endcapture', 'increment', 'decrement',
        'if', 'else', 'elsif', 'endif', 'for', 'endfor', 'break',
        'continue', 'limit', 'offset', 'range', 'reversed', 'cols',
        'case', 'endcase', 'when', 'tw-block', 'endblock', 'true', 'false',
        'in', 'unless', 'endunless', 'cycle', 'tablerow', 'endtablerow',
        'contains', 'startswith', 'endswith', 'comment', 'endcomment',
        'raw', 'endraw', 'editable', 'endentitylist', 'endentityview', 'endinclude',
        'endmarker', 'entitylist', 'entityview', 'forloop', 'image', 'include',
        'marker', 'outputcache', 'plugin', 'style', 'text', 'widget',
        'abs', 'append', 'at_least', 'at_most', 'capitalize', 'ceil', 'compact',
        'concat', 'date', 'default', 'divided_by', 'downcase', 'escape',
        'escape_once', 'first', 'floor', 'join', 'last', 'lstrip', 'map',
        'minus', 'modulo', 'newline_to_br', 'plus', 'prepend', 'remove',
        'remove_first', 'replace', 'replace_first', 'reverse', 'round',
        'rstrip', 'size', 'slice', 'sort', 'sort_natural', 'split', 'strip',
        'strip_html', 'strip_newlines', 'times', 'truncate', 'truncatewords',
        'uniq', 'upcase', 'url_decode', 'url_encode'];
      for (let i = 0; i < keywords.length; i++) {
        autocompleteProviderItems.push({ 'label': keywords[i], kind: monaco.languages.CompletionItemKind.Keyword });
      }
      return { suggestions: autocompleteProviderItems };
    }
  });
}
function registerSql(monaco) {
  monaco.languages.registerCompletionItemProvider('sql', {
    triggerCharacters: ["@"],
    provideCompletionItems: (model, position) => {
      model.getWordUntilPosition(position);
      const autocompleteProviderItems = [];
      for (const variable of EditorVariables) {
        autocompleteProviderItems.push({
          label: `${variable.variableName}: ${variable.type}`,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: variable.variableName
        });
      }
      return { suggestions: autocompleteProviderItems };
    }
  });
}

const monacoEditorCss = ".monaco-editor-host{display:block;position:relative;min-height:12em}.monaco-editor-container{position:absolute;left:0;top:0;width:100%;height:100%;max-height:100% !important;margin:0;padding:0}";

const ElsaMonaco = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
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
    monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
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
    const monacoLibPath = state.monacoLibPath;
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
  static get watchers() { return {
    "language": ["languageChangeHandler"]
  }; }
};
ElsaMonaco.style = monacoEditorCss;

export { ContextConsumer as context_consumer, InputControlSwitch as elsa_input_control_switch, ElsaMonaco as elsa_monaco_editor };

//# sourceMappingURL=context-consumer_3.entry.js.map