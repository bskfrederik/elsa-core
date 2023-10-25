import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-dc0ae4f5.js';
export { s as setNonce } from './index-dc0ae4f5.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v3.4.2 | MIT Licensed | https://stenciljs.com
 */
/**
 * Helper method for querying a `meta` tag that contains a nonce value
 * out of a DOM's head.
 *
 * @param doc The DOM containing the `head` to query against
 * @returns The content of the meta tag representing the nonce value, or `undefined` if no tag
 * exists or the tag has no content.
 */
function queryNonceMetaTagContent(doc) {
    var _a, _b, _c;
    return (_c = (_b = (_a = doc.head) === null || _a === void 0 ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content')) !== null && _c !== void 0 ? _c : undefined;
}
// TODO(STENCIL-661): Remove code related to the dynamic import shim
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    // TODO(STENCIL-659): Remove code implementing the CSS variable shim
    if (BUILD.cssVarShim) {
        // shim css vars
        // TODO(STENCIL-659): Remove code implementing the CSS variable shim
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = 
    // TODO(STENCIL-661): Remove code related to the dynamic import shim
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? (scriptElm || {})['data-opts'] || {} : {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-8de30773.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
// TODO(STENCIL-661): Remove code related to the dynamic import shim
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            var _a;
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                // Apply CSP nonce to the script tag if it exists
                const nonce = (_a = plt.$nonce$) !== null && _a !== void 0 ? _a : queryNonceMetaTagContent(doc);
                if (nonce != null) {
                    script.setAttribute('nonce', nonce);
                }
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy(JSON.parse("[[\"elsa-workflow-definition-properties-editor\",[[0,\"elsa-workflow-definition-properties-editor\",{\"workflowDefinition\":[16],\"workflowVersions\":[16],\"readonly\":[4],\"model\":[32],\"selectedTabIndex\":[32],\"show\":[64],\"hide\":[64]}]]],[\"elsa-workflow-definition-editor\",[[0,\"elsa-workflow-definition-editor\",{\"workflowDefinition\":[16],\"monacoLibPath\":[1,\"monaco-lib-path\"],\"workflowDefinitionState\":[32],\"selectedActivity\":[32],\"workflowVersions\":[32],\"getFlowchart\":[64],\"registerActivityDrivers\":[64],\"getWorkflowDefinition\":[64],\"importWorkflow\":[64],\"updateWorkflowDefinition\":[64],\"newWorkflow\":[64],\"loadWorkflowVersions\":[64],\"updateActivity\":[64]},[[9,\"resize\",\"handleResize\"],[0,\"containerSelected\",\"handleContainerSelected\"]]]]],[\"elsa-workflow-instance-viewer\",[[0,\"elsa-workflow-instance-viewer\",{\"monacoLibPath\":[1,\"monaco-lib-path\"],\"workflowDefinition\":[16],\"workflowInstance\":[16],\"mainWorkflowDefinitionState\":[32],\"targetWorkflowDefinitionState\":[32],\"workflowInstanceState\":[32],\"selectedActivity\":[32],\"selectedExecutionLogRecord\":[32],\"flowchartRootActivity\":[32],\"getCanvas\":[64],\"registerActivityDrivers\":[64],\"getWorkflow\":[64],\"importWorkflow\":[64],\"updateWorkflowDefinition\":[64]},[[9,\"resize\",\"handleResize\"],[0,\"collapsed\",\"handlePanelCollapsed\"],[0,\"containerSelected\",\"handleContainerSelected\"],[0,\"activitySelected\",\"handleActivitySelected\"],[0,\"journalItemSelected\",\"handleJournalItemSelected\"]]]]],[\"elsa-studio\",[[0,\"elsa-studio\",{\"serverUrl\":[1,\"server\"],\"monacoLibPath\":[1,\"monaco-lib-path\"],\"enableFlexiblePorts\":[4,\"enable-flexible-ports\"],\"disableAuth\":[4,\"disable-auth\"]}]]],[\"elsa-multi-text-input\",[[0,\"elsa-multi-text-input\",{\"inputContext\":[16]}]]],[\"elsa-check-list-input\",[[0,\"elsa-check-list-input\",{\"inputContext\":[16],\"selectedValues\":[32],\"selectedValue\":[32]}]]],[\"elsa-checkbox-input\",[[0,\"elsa-checkbox-input\",{\"inputContext\":[16],\"isChecked\":[32]}]]],[\"elsa-dropdown-input\",[[0,\"elsa-dropdown-input\",{\"inputContext\":[16]}]]],[\"elsa-multi-line-input\",[[0,\"elsa-multi-line-input\",{\"inputContext\":[16]}]]],[\"elsa-outcome-picker-input\",[[0,\"elsa-outcome-picker-input\",{\"inputContext\":[16]}]]],[\"elsa-output-picker-input\",[[0,\"elsa-output-picker-input\",{\"inputContext\":[16]}]]],[\"elsa-radio-list-input\",[[0,\"elsa-radio-list-input\",{\"inputContext\":[16],\"selectedValue\":[32]}]]],[\"elsa-single-line-input\",[[0,\"elsa-single-line-input\",{\"inputContext\":[16]}]]],[\"elsa-type-picker-input\",[[0,\"elsa-type-picker-input\",{\"inputContext\":[16]}]]],[\"elsa-workflow-context-provider-type-picker-input\",[[0,\"elsa-workflow-context-provider-type-picker-input\",{\"inputContext\":[16],\"descriptors\":[16],\"workflowDefinition\":[16]}]]],[\"elsa-workflow-definition-browser\",[[0,\"elsa-workflow-definition-browser\",{\"workflowDefinitions\":[32],\"publishedWorkflowDefinitions\":[32],\"selectedWorkflowDefinitionIds\":[32],\"currentPage\":[32],\"currentPageSize\":[32],\"orderBy\":[32],\"labels\":[32],\"selectAllChecked\":[32],\"searchTerm\":[32]}]]],[\"elsa-workflow-instance-browser\",[[0,\"elsa-workflow-instance-browser\",{\"workflowDefinition\":[16],\"workflowInstances\":[32],\"workflows\":[32],\"selectAllChecked\":[32],\"selectedWorkflowInstanceIds\":[32],\"searchTerm\":[32],\"currentPage\":[32],\"currentPageSize\":[32],\"selectedWorkflowDefinitionId\":[32],\"selectedStatus\":[32],\"selectedSubStatus\":[32],\"orderBy\":[32]}]]],[\"elsa-code-editor-input\",[[0,\"elsa-code-editor-input\",{\"inputContext\":[16]}]]],[\"elsa-default-activity-template\",[[0,\"elsa-default-activity-template\",{\"activityType\":[1,\"activity-type\"],\"activityTypeVersion\":[2,\"activity-type-version\"],\"displayType\":[1,\"display-type\"],\"activityId\":[1,\"activity-id\"],\"selectedPortName\":[32]},[[8,\"click\",\"onWindowClicked\"]]]]],[\"elsa-flow-switch-editor\",[[0,\"elsa-flow-switch-editor\",{\"inputContext\":[16],\"cases\":[32]}]]],[\"elsa-home-page\",[[0,\"elsa-home-page\"]]],[\"elsa-http-status-codes-editor\",[[0,\"elsa-http-status-codes-editor\",{\"inputContext\":[16]}]]],[\"elsa-switch-editor\",[[0,\"elsa-switch-editor\",{\"inputContext\":[16],\"cases\":[32]}]]],[\"elsa-variable-picker-input\",[[0,\"elsa-variable-picker-input\",{\"inputContext\":[16],\"workflowDefinition\":[16]}]]],[\"elsa-workflow-context-provider-check-list\",[[0,\"elsa-workflow-context-provider-check-list\",{\"descriptors\":[16],\"workflowDefinition\":[16],\"selectList\":[32],\"selectedProviderTypes\":[32]}]]],[\"elsa-workflow-definition-activity-version-settings\",[[0,\"elsa-workflow-definition-activity-version-settings\",{\"renderContext\":[16],\"currentVersion\":[32]}]]],[\"elsa-workflow-publish-button\",[[0,\"elsa-workflow-publish-button\",{\"publishing\":[4],\"disabled\":[4]}]]],[\"elsa-button-group\",[[0,\"elsa-button-group\",{\"buttons\":[1040]}]]],[\"elsa-input-tags-dropdown\",[[0,\"elsa-input-tags-dropdown\",{\"fieldName\":[1,\"field-name\"],\"fieldId\":[1,\"field-id\"],\"placeHolder\":[1,\"place-holder\"],\"values\":[16],\"dropdownValues\":[16],\"currentValues\":[32]}]]],[\"elsa-label-picker\",[[0,\"elsa-label-picker\",{\"selectedLabels\":[16],\"buttonClass\":[1,\"button-class\"],\"containerClass\":[1,\"container-class\"],\"selectedLabelsState\":[32],\"searchText\":[32],\"filteredLabels\":[32]},[[8,\"click\",\"onWindowClicked\"]]]]],[\"elsa-login-page\",[[0,\"elsa-login-page\",{\"showError\":[32]}]]],[\"elsa-slide-over-panel\",[[0,\"elsa-slide-over-panel\",{\"headerText\":[1,\"header-text\"],\"tabs\":[16],\"selectedTab\":[1040],\"actions\":[16],\"expand\":[4],\"isHiding\":[32],\"isShowing\":[32],\"isVisible\":[32],\"show\":[64],\"hide\":[64]}]]],[\"elsa-workflow-definition-picker-input\",[[0,\"elsa-workflow-definition-picker-input\",{\"inputContext\":[16]}]]],[\"elsa-workflow-toolbar\",[[0,\"elsa-workflow-toolbar\"]]],[\"elsa-workflow-instance-properties\",[[0,\"elsa-workflow-instance-properties\",{\"workflowDefinition\":[16],\"workflowInstance\":[16],\"model\":[32],\"selectedTabIndex\":[32],\"changeHandle\":[32],\"show\":[64],\"hide\":[64]}]]],[\"elsa-activity-properties\",[[0,\"elsa-activity-properties\",{\"activity\":[1040],\"activityExecutionLog\":[16],\"activityPropertyTabIndex\":[2,\"activity-property-tab-index\"],\"selectedTabIndex\":[32],\"show\":[64],\"hide\":[64],\"updateSelectedTab\":[64]}]]],[\"elsa-activity-properties-editor\",[[0,\"elsa-activity-properties-editor\",{\"workflowDefinitionId\":[1,\"workflow-definition-id\"],\"activity\":[16],\"variables\":[16],\"outputs\":[16],\"isReadonly\":[4,\"is-readonly\"],\"selectedTabIndex\":[32],\"show\":[64],\"hide\":[64]}]]],[\"elsa-workflow-definition-editor-toolbox\",[[0,\"elsa-workflow-definition-editor-toolbox\",{\"graph\":[16],\"isReadonly\":[4,\"is-readonly\"],\"selectedTabIndex\":[32]}]]],[\"elsa-notifications-manager\",[[0,\"elsa-notifications-manager\",{\"modalState\":[4,\"modal-state\"]}]]],[\"elsa-modal-dialog\",[[0,\"elsa-modal-dialog\",{\"modalDialogInstance\":[16],\"actions\":[16],\"size\":[1],\"type\":[2],\"autoHide\":[4,\"auto-hide\"],\"content\":[16],\"isVisible\":[32],\"show\":[64],\"hide\":[64]},[[8,\"keydown\",\"handleKeyDown\"]]]]],[\"elsa-modal-dialog-container\",[[0,\"elsa-modal-dialog-container\"]]],[\"elsa-workflow-definition-editor-toolbar\",[[0,\"elsa-workflow-definition-editor-toolbar\",{\"zoomToFit\":[16]}]]],[\"elsa-blank\",[[0,\"elsa-blank\"]]],[\"elsa-check-list\",[[0,\"elsa-check-list\",{\"selectList\":[16],\"selectedValues\":[1040],\"selectedValue\":[1026,\"selected-value\"],\"fieldName\":[1,\"field-name\"]}]]],[\"elsa-workflow-journal\",[[0,\"elsa-workflow-journal\",{\"model\":[16],\"workflowExecutionLogRecords\":[32],\"blocks\":[32],\"rootBlocks\":[32],\"expandedBlocks\":[32],\"journalActivityMap\":[32],\"refresh\":[64]}]]],[\"elsa-workflow-definition-input-output-settings\",[[0,\"elsa-workflow-definition-input-output-settings\",{\"inputs\":[16],\"outputs\":[16],\"outcomes\":[16],\"inputsState\":[32],\"outputsState\":[32]}]]],[\"elsa-flowchart\",[[0,\"elsa-flowchart\",{\"rootActivity\":[16],\"interactiveMode\":[4,\"interactive-mode\"],\"silent\":[4],\"isReadonly\":[4,\"is-readonly\"],\"activityLookup\":[32],\"activities\":[32],\"path\":[32],\"newRoot\":[64],\"updateGraph\":[64],\"getGraph\":[64],\"reset\":[64],\"updateLayout\":[64],\"zoomToFit\":[64],\"scrollToStart\":[64],\"autoLayout\":[64],\"addActivity\":[64],\"updateActivity\":[64],\"getActivity\":[64],\"renameActivity\":[64],\"export\":[64]},[[0,\"childActivitySelected\",\"handleChildActivitySelected\"],[0,\"editChildActivity\",\"editChildActivity\"]]]]],[\"elsa-toast-notification\",[[0,\"elsa-toast-notification\",{\"notification\":[16],\"showDuration\":[2,\"show-duration\"]}]]],[\"elsa-toast-manager\",[[0,\"elsa-toast-manager\"]]],[\"elsa-context-menu\",[[0,\"elsa-context-menu\",{\"menuItems\":[1040],\"hideButton\":[4,\"hide-button\"],\"anchorPoint\":[2,\"anchor-point\"],\"open\":[64],\"close\":[64]},[[8,\"click\",\"onWindowClicked\"]]]]],[\"elsa-variables-editor\",[[0,\"elsa-variables-editor\",{\"variables\":[16],\"variablesState\":[32]}]]],[\"elsa-workflow-definition-editor-toolbox-activities\",[[0,\"elsa-workflow-definition-editor-toolbox-activities\",{\"graph\":[16],\"isReadonly\":[4,\"is-readonly\"],\"expandedCategories\":[32],\"categoryModels\":[32],\"renderedActivities\":[32]}]]],[\"elsa-workflow-definition-version-history\",[[0,\"elsa-workflow-definition-version-history\",{\"selectedVersion\":[16],\"workflowVersions\":[16],\"serverUrl\":[1,\"server-url\"]}]]],[\"elsa-pager\",[[0,\"elsa-pager\",{\"page\":[2],\"pageSize\":[2,\"page-size\"],\"totalCount\":[2,\"total-count\"]}]]],[\"elsa-panel\",[[4,\"elsa-panel\",{\"position\":[2],\"isExpanded\":[32]}]]],[\"elsa-variables-viewer\",[[0,\"elsa-variables-viewer\",{\"variables\":[16],\"workflowDefinition\":[16],\"workflowInstance\":[16]}]]],[\"elsa-widgets\",[[0,\"elsa-widgets\",{\"widgets\":[16]}]]],[\"elsa-workflow-toolbar-menu\",[[0,\"elsa-workflow-toolbar-menu\",null,[[8,\"click\",\"onWindowClicked\"]]]]],[\"elsa-activity-input-editor-dialog-content\",[[0,\"elsa-activity-input-editor-dialog-content\",{\"input\":[16],\"getInput\":[64]}]]],[\"elsa-activity-output-editor-dialog-content\",[[0,\"elsa-activity-output-editor-dialog-content\",{\"output\":[16],\"getOutput\":[64]}]]],[\"elsa-tooltip\",[[4,\"elsa-tooltip\",{\"tooltipContent\":[8,\"tooltip-content\"],\"tooltipPosition\":[1,\"tooltip-position\"],\"triangleClass\":[32]}]]],[\"elsa-variable-editor-dialog-content\",[[0,\"elsa-variable-editor-dialog-content\",{\"variable\":[16],\"getVariable\":[64]}]]],[\"elsa-workflow-navigator\",[[0,\"elsa-workflow-navigator\",{\"items\":[16],\"rootActivity\":[16]}]]],[\"elsa-input-tags\",[[0,\"elsa-input-tags\",{\"fieldId\":[1,\"field-id\"],\"placeHolder\":[1,\"place-holder\"],\"values\":[1040]}]]],[\"elsa-notification-template\",[[4,\"elsa-notification-template\",{\"notification\":[16],\"time\":[32]}]]],[\"elsa-copy-button\",[[0,\"elsa-copy-button\",{\"value\":[1],\"isCopied\":[32]}]]],[\"elsa-dropdown-button\",[[0,\"elsa-dropdown-button\",{\"text\":[1],\"icon\":[8],\"handler\":[16],\"origin\":[2],\"items\":[16],\"theme\":[1],\"disabled\":[4]},[[8,\"click\",\"onWindowClicked\"]]]]],[\"elsa-form-panel\",[[0,\"elsa-form-panel\",{\"mainTitle\":[1,\"main-title\"],\"subTitle\":[1,\"sub-title\"],\"isReadonly\":[4,\"is-readonly\"],\"orientation\":[1],\"tabs\":[16],\"selectedTabIndex\":[1026,\"selected-tab-index\"],\"actions\":[16]}]]],[\"elsa-monaco-editor\",[[0,\"elsa-monaco-editor\",{\"editorHeight\":[513,\"editor-height\"],\"value\":[1],\"language\":[1],\"singleLineMode\":[516,\"single-line\"],\"padding\":[1],\"setValue\":[64],\"addJavaScriptLib\":[64]}]]],[\"context-consumer\",[[0,\"context-consumer\",{\"context\":[16],\"renderer\":[16],\"subscribe\":[16],\"unsubscribe\":[32]}]]],[\"elsa-input-control-switch\",[[4,\"elsa-input-control-switch\",{\"workflowDefinitionId\":[1025,\"workflow-definition-id\"],\"activityType\":[1025,\"activity-type\"],\"propertyName\":[1025,\"property-name\"],\"label\":[1],\"hideLabel\":[4,\"hide-label\"],\"hint\":[1],\"fieldName\":[1,\"field-name\"],\"syntax\":[1],\"expression\":[1],\"defaultSyntax\":[1,\"default-syntax\"],\"supportedSyntaxes\":[16],\"isReadOnly\":[4,\"is-read-only\"],\"codeEditorHeight\":[1,\"code-editor-height\"],\"codeEditorSingleLineMode\":[4,\"code-editor-single-line-mode\"],\"context\":[16],\"currentExpression\":[32]},[[8,\"click\",\"onWindowClicked\"]]]]]]"), options);
});

//# sourceMappingURL=elsa-workflows-designer.esm.js.map