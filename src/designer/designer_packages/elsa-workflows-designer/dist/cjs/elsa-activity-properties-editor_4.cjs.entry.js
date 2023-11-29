'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
const descriptorsStore = require('./descriptors-store-815ac006.js');
const formEntry = require('./form-entry-890351d0.js');
const state = require('./state-729e23b0.js');
const locale = require('./locale-4dbc7596.js');
const infoList = require('./info-list-d2663efb.js');
const propsEditorTabs = require('./props-editor-tabs-124609c0.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./notification-service-99c155e7.js');
require('./hint-34535b0d.js');
require('./state-tunnel-df062325.js');

const ActivityPropertiesEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.activityUpdated = index.createEvent(this, "activityUpdated", 7);
    this.deleteActivityRequested = index.createEvent(this, "deleteActivityRequested", 7);
    this.getSelectedTabIndex = (tabs) => {
      let selectedTabIndex = this.selectedTabIndex;
      if (selectedTabIndex >= tabs.length)
        selectedTabIndex = tabs.length - 1;
      if (selectedTabIndex < 0)
        selectedTabIndex = 0;
      return selectedTabIndex;
    };
    this.createTabs = () => {
      const activityDescriptor = this.findActivityDescriptor();
      const isTask = activityDescriptor.kind == utils.ActivityKind.Task;
      const commonTab = {
        displayText: this.strings.generalTab,
        order: 0,
        content: () => this.renderCommonTab()
      };
      const inputTab = {
        displayText: this.strings.settingsTab,
        order: 10,
        content: () => this.renderInputTab()
      };
      const tabs = !!activityDescriptor ? [inputTab, commonTab] : [];
      if (activityDescriptor.outputs.length > 0) {
        const outputTab = {
          displayText: this.strings.outputTab,
          order: 11,
          content: () => this.renderOutputTab()
        };
        tabs.push(outputTab);
      }
      if (isTask) {
        const taskTab = {
          displayText: this.strings.taskTab,
          order: 12,
          content: () => this.renderTaskTab()
        };
        tabs.push(taskTab);
      }
      return tabs;
    };
    this.createInputs = () => {
      const activity = this.activity;
      const activityId = activity.id;
      const activityDescriptor = this.findActivityDescriptor();
      const driverRegistry = this.inputDriverRegistry;
      const onInputChanged = (inputDescriptor) => this.activityUpdated.emit({
        newId: activityId,
        originalId: activityId,
        activity,
        activityDescriptor
      });
      const filteredInputs = activityDescriptor.inputs.filter(x => x.isBrowsable);
      return filteredInputs.map(inputDescriptor => {
        const renderInputContext = {
          activity: activity,
          activityDescriptor: activityDescriptor,
          inputDescriptor,
          notifyInputChanged: () => onInputChanged(),
          inputChanged: (v, s) => this.onInputPropertyEditorChanged(inputDescriptor, v, s)
        };
        const driver = driverRegistry.get(renderInputContext);
        const workflowDefinitionId = this.workflowDefinitionId;
        const activityType = activityDescriptor.typeName;
        const propertyName = inputDescriptor.name;
        const control = index.h(state.InputControlSwitchContextState.Provider, { state: { workflowDefinitionId, activityType, propertyName } }, driver === null || driver === void 0 ? void 0 : driver.renderInput(renderInputContext));
        return {
          inputContext: renderInputContext,
          inputControl: control,
        };
      });
    };
    this.findActivityDescriptor = () => !!this.activity ? descriptorsStore.state.activityDescriptors.find(x => x.typeName == this.activity.type && x.version == this.activity.version) : null;
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.onActivityIdChanged = (e) => {
      const activity = this.activity;
      const originalId = activity.id;
      const inputElement = e.target;
      const newId = inputElement.value;
      const activityDescriptor = this.findActivityDescriptor();
      activity.id = newId;
      this.activityUpdated.emit({
        newId: newId,
        originalId: originalId,
        activity,
        activityDescriptor
      });
    };
    this.onInputPropertyEditorChanged = (inputDescriptor, propertyValue, syntax) => {
      const activity = this.activity;
      const propertyName = inputDescriptor.name;
      const isWrapped = inputDescriptor.isWrapped;
      const camelCasePropertyName = lodash.lodash.camelCase(propertyName);
      console.log(propertyName, propertyValue, syntax);
      if (isWrapped) {
        let input = activity[camelCasePropertyName];
        const expression = {
          type: syntax,
          value: propertyValue // TODO: The "value" field is currently hardcoded, but we should be able to be more flexible and potentially have different fields for a given syntax.
        };
        if (!input) {
          input = {
            typeName: inputDescriptor.typeName,
            memoryReference: { id: utils.v4() },
            expression: expression
          };
        }
        input.expression = expression;
        activity[camelCasePropertyName] = input;
      }
      else {
        activity[camelCasePropertyName] = propertyValue;
      }
      this.updateActivity(propertyName);
    };
    this.onOutputPropertyEditorChanged = (outputDescriptor, outputTargetValue) => {
      const activity = this.activity;
      const propertyName = outputDescriptor.name;
      const camelCasePropertyName = lodash.lodash.camelCase(propertyName);
      const outputTargetValuePair = outputTargetValue.split('::');
      const outputTargetId = outputTargetValuePair[1];
      const property = {
        typeName: outputDescriptor.typeName,
        memoryReference: {
          id: outputTargetId
        }
      };
      activity[camelCasePropertyName] = property;
      this.updateActivity(propertyName);
    };
    this.updateActivity = (propertyName, propertyDescriptor) => {
      const activityDescriptor = this.findActivityDescriptor();
      const activity = this.activity;
      const activityId = activity.id;
      console.log(`Activity ${activityId} updated.`);
      this.activityUpdated.emit({
        newId: activityId,
        originalId: activityId,
        activity,
        activityDescriptor
      });
    };
    this.renderCommonTab = () => {
      var _a, _b, _c, _d, _e, _f, _g;
      const { activity } = this.renderContext;
      const activityId = activity.id;
      const displayText = (_b = (_a = activity.metadata) === null || _a === void 0 ? void 0 : _a.displayText) !== null && _b !== void 0 ? _b : '';
      const canStartWorkflow = (_g = (_f = (_d = (_c = activity.customProperties) === null || _c === void 0 ? void 0 : _c.canStartWorkflow) !== null && _d !== void 0 ? _d : (_e = activity === null || activity === void 0 ? void 0 : activity.customProperties) === null || _e === void 0 ? void 0 : _e.CanStartWorkflow) !== null && _f !== void 0 ? _f : activity.canStartWorkflow) !== null && _g !== void 0 ? _g : false;
      const key = `${activityId}`;
      return index.h("div", { key: key }, index.h(formEntry.FormEntry, { fieldId: "ActivityId", label: this.strings.activityId, hint: this.strings.activityHint }, index.h("input", { type: "text", name: "ActivityId", id: "ActivityId", value: activityId, onChange: e => this.onActivityIdChanged(e) })), index.h(formEntry.FormEntry, { fieldId: "ActivityDisplayText", label: this.strings.activityDisplayText, hint: this.strings.activityDisplayHint }, index.h("input", { type: "text", name: "ActivityDisplayText", id: "ActivityDisplayText", value: displayText, onChange: e => this.onActivityDisplayTextChanged(e) })), index.h(formEntry.CheckboxFormEntry, { fieldId: "CanStartWorkflow", label: this.strings.activityCanStartWorkflow, hint: this.strings.activityCanStartWorkflowHint }, index.h("input", { type: "checkbox", name: "CanStartWorkflow", id: "CanStartWorkflow", value: "true", checked: canStartWorkflow, onChange: e => this.onCanStartWorkflowChanged(e) })));
    };
    this.renderInputTab = () => {
      console.log('renderInputTab');
      const { activity, inputs } = this.renderContext;
      const activityId = activity.id;
      const key = `${activityId}`;
      return index.h("div", { key: key }, inputs.filter(x => !!x.inputControl).map(propertyContext => {
        const key = `${activity.id}-${propertyContext.inputContext.inputDescriptor.name}`;
        console.log(key);
        return index.h("div", { key: key }, propertyContext.inputControl);
      }));
    };
    this.renderOutputTab = () => {
      const { activity, activityDescriptor } = this.renderContext;
      const outputs = activityDescriptor.outputs;
      const variables = this.variables || [];
      const activityId = activity.id;
      const key = `${activityId}`;
      const outputTargetOptions = [null];
      if (variables.length > 0) {
        outputTargetOptions.push({ label: 'Variables', items: [...variables.map(x => ({ value: x.id, name: x.name }))], kind: 'variable' });
      }
      // Disable this for now until we rework the input output handling at the engine level.
      // if (outputDefinitions.length > 0)
      //   outputTargetOptions.push({label: 'Outputs', items: [...outputDefinitions.map(x => ({value: x.name, name: x.name}))], kind: 'output'});
      return index.h("div", { key: key }, outputs.map(propertyDescriptor => {
        var _a;
        const key = `${activity.id}-${propertyDescriptor.name}`;
        const displayName = utils.isNullOrWhitespace(propertyDescriptor.displayName) ? propertyDescriptor.name : propertyDescriptor.displayName;
        const propertyName = lodash.lodash.camelCase(propertyDescriptor.name);
        const propertyValue = activity[propertyName];
        const propertyType = propertyDescriptor.typeName;
        const typeDescriptor = descriptorsStore.state.variableDescriptors.find(x => x.typeName == propertyType);
        const propertyTypeName = (_a = typeDescriptor === null || typeDescriptor === void 0 ? void 0 : typeDescriptor.displayName) !== null && _a !== void 0 ? _a : propertyType;
        return index.h("div", { key: key }, index.h(formEntry.FormEntry, { fieldId: key, label: displayName, hint: propertyDescriptor.description }, index.h("div", { class: "tw-relative" }, index.h("select", { onChange: e => this.onOutputPropertyEditorChanged(propertyDescriptor, e.currentTarget.value) }, outputTargetOptions.map(outputTarget => {
          var _a;
          if (!outputTarget) {
            return index.h("option", { value: "", selected: !((_a = propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.memoryReference) === null || _a === void 0 ? void 0 : _a.id) }, "-");
          }
          const items = outputTarget.items;
          return (index.h("optgroup", { label: outputTarget.label }, items.map(item => {
            var _a;
            const isSelected = ((_a = propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.memoryReference) === null || _a === void 0 ? void 0 : _a.id) == item.value;
            return index.h("option", { value: `${outputTarget.kind}::${item.value}`, selected: isSelected }, item.name);
          })));
        })), index.h("div", { class: "tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center pr-10" }, index.h("span", { class: "tw-text-gray-500 sm:tw-text-sm" }, propertyTypeName)))));
      }));
    };
    this.renderTaskTab = () => {
      var _a, _b, _c;
      const { activity } = this.renderContext;
      const activityId = activity.id;
      const runAsynchronously = (_c = (_b = (_a = activity.customProperties) === null || _a === void 0 ? void 0 : _a.RunAsynchronously) !== null && _b !== void 0 ? _b : activity.runAsynchronously) !== null && _c !== void 0 ? _c : false;
      const key = `${activityId}:task`;
      return index.h("div", { key: key }, index.h(formEntry.CheckboxFormEntry, { fieldId: "RunAsynchronously", label: this.strings.taskExecuteAsynchronously, hint: this.strings.taskExecuteAsynchronouslyHint }, index.h("input", { type: "checkbox", name: "RunAsynchronously", id: "RunAsynchronously", value: "true", checked: runAsynchronously, onChange: e => this.onRunAsynchronouslyChanged(e) })));
    };
    this.workflowDefinitionId = undefined;
    this.activity = undefined;
    this.variables = [];
    this.outputs = [];
    this.isReadonly = undefined;
    this.selectedTabIndex = 0;
    this.inputDriverRegistry = utils.Container.get(utils.InputDriverRegistry);
    this.eventBus = utils.Container.get(utils.EventBus);
  }
  async show() {
    await this.slideOverPanel.show();
  }
  async hide() {
    await this.slideOverPanel.hide();
  }
  async componentWillRender() {
    var _a, _b;
    this.strings = await locale.getLocaleComponentStrings(this.element);
    const activity = this.activity;
    const activityDescriptor = this.findActivityDescriptor();
    const title = (_b = (_a = activityDescriptor === null || activityDescriptor === void 0 ? void 0 : activityDescriptor.displayName) !== null && _a !== void 0 ? _a : activityDescriptor === null || activityDescriptor === void 0 ? void 0 : activityDescriptor.typeName) !== null && _b !== void 0 ? _b : 'Unknown Activity';
    const inputs = this.createInputs();
    const tabs = this.createTabs();
    const onActivityChanged = () => this.activityUpdated.emit({
      activity,
      activityDescriptor
    });
    this.renderContext = {
      activity,
      activityDescriptor,
      title,
      inputs,
      tabs,
      notifyActivityChanged: () => onActivityChanged()
    };
    await this.eventBus.emit(utils.ActivityPropertyPanelEvents.Displaying, this, this.renderContext);
  }
  render() {
    const { activity, activityDescriptor, tabs } = this.renderContext;
    const actions = [];
    const mainTitle = activity.id;
    const subTitle = activityDescriptor.displayName;
    const selectedTabIndex = this.getSelectedTabIndex(tabs);
    return (index.h("elsa-form-panel", { isReadonly: this.isReadonly, mainTitle: mainTitle, subTitle: subTitle, orientation: "Landscape", tabs: tabs, selectedTabIndex: selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e), actions: actions }));
  }
  onActivityDisplayTextChanged(e) {
    const activity = this.activity;
    const inputElement = e.target;
    activity.metadata = Object.assign(Object.assign({}, activity.metadata), { displayText: inputElement.value });
    this.updateActivity();
  }
  onCanStartWorkflowChanged(e) {
    const activity = this.activity;
    const inputElement = e.target;
    activity.customProperties.canStartWorkflow = inputElement.checked;
    this.updateActivity();
  }
  onRunAsynchronouslyChanged(e) {
    const activity = this.activity;
    const inputElement = e.target;
    activity.customProperties.RunAsynchronously = inputElement.checked;
    this.updateActivity();
  }
  get element() { return index.getElement(this); }
};

const Toolbar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.autoLayout = index.createEvent(this, "autoLayout", 7);
    this.zoomToFit = undefined;
  }
  render() {
    const layoutButtons = [{
        text: 'Horizontally',
        handler: () => this.autoLayout.emit('LR')
      }, {
        text: 'Vertically',
        handler: () => this.autoLayout.emit('TB')
      }];
    return (index.h("div", { class: "elsa-panel-toolbar tw-flex tw-justify-center tw-absolute tw-border-b tw-border-gray-200 tw-top-0 tw-px-1 tw-pl-4 tw-pb-2 tw-text-sm tw-bg-white tw-z-10 tw-space-x-2" }, index.h("elsa-dropdown-button", { text: "Auto-layout", theme: "Primary", items: layoutButtons, class: "tw-mt-2" }), index.h("button", { onClick: this.zoomToFit, class: "elsa-btn elsa-btn-primary" }, "Zoom to fit")));
  }
};

const Toolbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onTabSelected = (e, index) => {
      e.preventDefault();
      this.selectedTabIndex = index;
    };
    this.graph = undefined;
    this.isReadonly = undefined;
    this.selectedTabIndex = 0;
  }
  render() {
    const selectedTabIndex = this.selectedTabIndex;
    const selectedCss = 'tw-border-blue-500 tw-text-blue-600';
    const defaultCss = 'tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300';
    const activitiesTabCssClass = selectedTabIndex == 0 ? selectedCss : defaultCss;
    return (index.h("div", { class: "activity-list tw-absolute tw-inset-0 tw-overflow-hidden" }, index.h("div", { class: "tw-h-full tw-flex tw-flex-col" }, index.h("div", { class: "tw-border-b tw-border-gray-200" }, index.h("nav", { class: "-tw-mb-px tw-flex", "aria-label": "Tabs" }, index.h("a", { href: "#", onClick: e => this.onTabSelected(e, 0), class: `${activitiesTabCssClass} tw-w-1/2 tw-py-4 tw-px-1 tw-text-center tw-border-b-2 tw-font-medium tw-text-sm` }, "Activities"))), index.h("div", { class: "tw-flex-1 tw-relative" }, index.h("div", { class: "tw-absolute tw-inset-0 tw-overflow-y-scroll" }, index.h("elsa-workflow-definition-editor-toolbox-activities", { isReadonly: this.isReadonly, graph: this.graph, class: selectedTabIndex == 0 ? '' : 'hidden' }))))));
  }
};

const WorkflowDefinitionPropertiesEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.workflowPropsUpdated = index.createEvent(this, "workflowPropsUpdated", 7);
    this.versionSelected = index.createEvent(this, "versionSelected", 7);
    this.deleteVersionClicked = index.createEvent(this, "deleteVersionClicked", 7);
    this.revertVersionClicked = index.createEvent(this, "revertVersionClicked", 7);
    this.createModel = async () => {
      var _a, _b, _c;
      const model = {
        tabModels: []
      };
      const workflowDefinition = this.workflowDefinition;
      const options = workflowDefinition.options || {};
      const autoUpdateConsumingWorkflows = (_a = options.autoUpdateConsumingWorkflows) !== null && _a !== void 0 ? _a : false;
      const usableAsActivity = (_b = options.usableAsActivity) !== null && _b !== void 0 ? _b : false;
      if (!workflowDefinition) {
        this.model = model;
        return;
      }
      const propertiesTabModel = {
        name: 'properties',
        tab: null,
        Widgets: [{
            name: 'workflowName',
            content: () => {
              const workflow = this.workflowDefinition;
              return index.h(formEntry.FormEntry, { label: this.strings.propertiesWorkflowName, fieldId: "workflowName", hint: this.strings.propertiesWorkflowNameHint }, index.h("input", { type: "text", name: "workflowName", id: "workflowName", value: workflow.name, onChange: e => this.onPropertyEditorChanged(wf => wf.name = e.target.value) }));
            },
            order: 0
          }, {
            name: 'workflowDescription',
            content: () => {
              const workflow = this.workflowDefinition;
              return index.h(formEntry.FormEntry, { label: this.strings.propertiesWorkflowDescription, fieldId: "workflowDescription", hint: this.strings.propertiesWorkflowDescriptionHint }, index.h("textarea", { name: "workflowDescription", id: "workflowDescription", value: workflow.description, rows: 6, onChange: e => this.onPropertyEditorChanged(wf => wf.description = e.target.value) }));
            },
            order: 5
          }, {
            name: 'workflowInfo',
            content: () => {
              const workflow = this.workflowDefinition;
              const workflowDetails = {
                [this.strings.propertiesDefitionId]: utils.isNullOrWhitespace(workflow.definitionId) ? this.strings.propertiesNew : workflow.definitionId,
                [this.strings.propertiesVersionId]: utils.isNullOrWhitespace(workflow.id) ? this.strings.propertiesNew : workflow.id,
                [this.strings.propertiesVersion]: workflow.version.toString(),
                [this.strings.propertiesStatus]: workflow.isPublished ? this.strings.propertiesPublished : this.strings.propertiesDraft,
                [this.strings.propertiesReadOnly]: workflow.isReadonly ? this.strings.propertiesYes : this.strings.propertiesNo
              };
              return index.h(infoList.InfoList, { title: "Information", dictionary: workflowDetails });
            },
            order: 10
          }]
      };
      propertiesTabModel.tab = {
        displayText: this.strings.propertiesTab,
        order: 0,
        content: () => this.renderPropertiesTab(propertiesTabModel)
      };
      const variablesTabModel = {
        name: 'variables',
        tab: {
          displayText: this.strings.variablesTab,
          order: 5,
          content: () => this.renderVariablesTab()
        }
      };
      const strategies = descriptorsStore.state.workflowActivationStrategyDescriptors;
      const firstStrategy = strategies.length > 0 ? strategies[0] : null;
      const defaultDescription = (_c = firstStrategy === null || firstStrategy === void 0 ? void 0 : firstStrategy.description) !== null && _c !== void 0 ? _c : '';
      const settingsWidgets = [
        {
          name: 'workflowActivationValidator',
          order: 0,
          content: () => index.h(formEntry.FormEntry, { label: this.strings.settingsActivitationStrategy, fieldId: "workflowActivationStrategyType", hint: defaultDescription }, index.h("select", { name: "workflowActivationStrategyType", onChange: e => this.onPropertyEditorChanged(wf => {
              const selectElement = e.target;
              options.activationStrategyType = selectElement.value;
              wf.options = options;
              const hintElement = selectElement.closest('.form-entry').getElementsByClassName('form-field-hint')[0];
              const strategy = strategies.find(x => x.typeName == selectElement.value);
              hintElement.innerText = strategy.description;
            }) }, strategies.map(strategy => index.h("option", { value: strategy.typeName, selected: strategy.typeName == options.activationStrategyType }, strategy.displayName))))
        },
        {
          name: 'usableAsActivity',
          order: 0,
          content: () => index.h(formEntry.CheckboxFormEntry, { label: this.strings.settingsUsableAsActivity, fieldId: "UsableAsActivity", hint: this.strings.settingsUsableAsActivityHint }, index.h("input", { type: "checkbox", id: "UsableAsActivity", name: "UsableAsActivity", checked: usableAsActivity, onChange: e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target;
              wf.options.usableAsActivity = inputElement.checked;
              this.createModel();
            }) }))
        },
        {
          name: 'autoUpdateConsumingWorkflows',
          order: 0,
          content: () => index.h(formEntry.CheckboxFormEntry, { fieldId: "UpdateConsumingWorkflows", label: this.strings.settingsAutoUpdateConsumingWorkflows, hint: this.strings.settingsAutoUpdateConsumingWorkflowsHint }, index.h("input", { type: "checkbox", name: "UpdateConsumingWorkflows", id: "UpdateConsumingWorkflows", checked: autoUpdateConsumingWorkflows, onChange: e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target;
              options.autoUpdateConsumingWorkflows = inputElement.checked;
              wf.options = options;
            }) }))
        }
      ];
      const settingsTabModel = {
        name: 'settings',
        tab: {
          displayText: this.strings.settingsTab,
          order: 10,
          content: () => index.h("elsa-widgets", { widgets: settingsWidgets })
        }
      };
      const inputOutputTabModel = {
        name: 'input-output',
        tab: {
          displayText: this.strings.inputOutputTab,
          order: 15,
          content: () => this.renderInputOutputTab()
        }
      };
      const versionHistoryTabModel = {
        name: 'versionHistory',
        tab: {
          displayText: this.strings.versionHistoryTab,
          order: 20,
          content: () => this.renderVersionHistoryTab()
        }
      };
      model.tabModels = [propertiesTabModel, variablesTabModel, settingsTabModel, versionHistoryTabModel, inputOutputTabModel];
      const args = {
        workflowDefinition,
        model,
        notifyWorkflowDefinitionChanged: () => this.onWorkflowDefinitionUpdated()
      };
      await this.eventBus.emit(utils.WorkflowPropertiesEditorEventTypes.Displaying, this, args);
      this.model = model;
    };
    this.renderPropertiesTab = (tabModel) => index.h("elsa-widgets", { widgets: tabModel.Widgets });
    this.renderVariablesTab = () => {
      var _a, _b;
      const variables = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.variables) !== null && _b !== void 0 ? _b : [];
      return index.h("div", null, index.h("elsa-variables-editor", { variables: variables, onVariablesChanged: e => this.onVariablesUpdated(e) }));
    };
    this.renderInputOutputTab = () => {
      var _a, _b, _c, _d, _e, _f;
      const inputs = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.inputs) !== null && _b !== void 0 ? _b : [];
      const outputs = (_d = (_c = this.workflowDefinition) === null || _c === void 0 ? void 0 : _c.outputs) !== null && _d !== void 0 ? _d : [];
      const outcomes = (_f = (_e = this.workflowDefinition) === null || _e === void 0 ? void 0 : _e.outcomes) !== null && _f !== void 0 ? _f : [];
      return index.h("div", null, index.h("elsa-workflow-definition-input-output-settings", { inputs: inputs, outputs: outputs, outcomes: outcomes, onInputsChanged: e => this.onInputsUpdated(e), onOutputsChanged: e => this.onOutputsUpdated(e), onOutcomesChanged: e => this.onOutcomesUpdated(e) }));
    };
    this.renderVersionHistoryTab = () => {
      return index.h("div", null, index.h("elsa-workflow-definition-version-history", { selectedVersion: this.workflowDefinition, workflowVersions: this.workflowVersions }));
    };
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.onPropertyEditorChanged = (apply) => {
      const workflowDefinition = this.workflowDefinition;
      apply(workflowDefinition);
      this.workflowPropsUpdated.emit({ workflowDefinition: workflowDefinition });
    };
    this.onVariablesUpdated = async (e) => this.onPropsUpdated('variables', e.detail);
    this.onInputsUpdated = async (e) => this.onPropsUpdated('inputs', e.detail);
    this.onOutputsUpdated = async (e) => this.onPropsUpdated('outputs', e.detail);
    this.onOutcomesUpdated = async (e) => this.onPropsUpdated('outcomes', e.detail);
    this.onPropsUpdated = async (propName, propValue) => {
      const workflowDefinition = this.workflowDefinition;
      if (!workflowDefinition || !workflowDefinition.isLatest) {
        console.debug('onPropsUpdated: workflowDefinition is not latest');
        return;
      }
      workflowDefinition[propName] = propValue;
      const updatedTab = this.getPropEditorSectionByPropName(propName);
      this.workflowPropsUpdated.emit({ workflowDefinition, updatedTab });
      await this.createModel();
    };
    this.onWorkflowDefinitionUpdated = () => {
      const workflowDefinition = this.workflowDefinition;
      this.workflowPropsUpdated.emit({ workflowDefinition });
    };
    this.workflowDefinition = undefined;
    this.workflowVersions = undefined;
    this.readonly = undefined;
    this.model = undefined;
    this.selectedTabIndex = 0;
    this.eventBus = utils.Container.get(utils.EventBus);
    this.workflowDefinitionApi = utils.Container.get(utils.WorkflowDefinitionsApi);
    this.model = {
      tabModels: [],
    };
  }
  async show() {
    await this.slideOverPanel.show();
  }
  async hide() {
    await this.slideOverPanel.hide();
  }
  async onWorkflowDefinitionChanged() {
    await this.createModel();
  }
  async onWorkflowVersionsChanged() {
    await this.createModel();
  }
  async componentWillLoad() {
    this.strings = await locale.getLocaleComponentStrings(this.element);
    await this.createModel();
  }
  render() {
    var _a;
    const workflowDefinition = this.workflowDefinition;
    const title = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.name) !== null && _a !== void 0 ? _a : 'Untitled';
    const subTitle = 'Workflow Definition';
    const tabs = this.model.tabModels.map(x => x.tab);
    return (index.h("elsa-form-panel", { isReadonly: this.readonly, mainTitle: title, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  getPropEditorSectionByPropName(propName) {
    const enumKey = Object.keys(propsEditorTabs.WorkflowPropertiesEditorTabs).find(key => propsEditorTabs.WorkflowPropertiesEditorTabs[key] === propName);
    if (enumKey) {
      return propsEditorTabs.WorkflowPropertiesEditorTabs[enumKey];
    }
    return null;
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "workflowDefinition": ["onWorkflowDefinitionChanged"],
    "workflowVersions": ["onWorkflowVersionsChanged"]
  }; }
};

exports.elsa_activity_properties_editor = ActivityPropertiesEditor;
exports.elsa_workflow_definition_editor_toolbar = Toolbar;
exports.elsa_workflow_definition_editor_toolbox = Toolbox;
exports.elsa_workflow_definition_properties_editor = WorkflowDefinitionPropertiesEditor;

//# sourceMappingURL=elsa-activity-properties-editor_4.cjs.entry.js.map