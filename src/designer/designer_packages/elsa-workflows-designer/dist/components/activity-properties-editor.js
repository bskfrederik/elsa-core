import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { a4 as v4, o as isNullOrWhitespace, C as Container, D as InputDriverRegistry, B as EventBus, a5 as ActivityPropertyPanelEvents, N as ActivityKind } from './utils.js';
import './toolbar-component-store.js';
import { s as state } from './descriptors-store.js';
import { F as FormEntry, C as CheckboxFormEntry } from './form-entry.js';
import { I as InputControlSwitchContextState } from './state2.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$2 } from './state-tunnel.js';
import { d as defineCustomElement$1 } from './form-panel.js';

const ActivityPropertiesEditor = /*@__PURE__*/ proxyCustomElement(class ActivityPropertiesEditor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.activityUpdated = createEvent(this, "activityUpdated", 7);
    this.deleteActivityRequested = createEvent(this, "deleteActivityRequested", 7);
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
      const isTask = activityDescriptor.kind == ActivityKind.Task;
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
        const control = h(InputControlSwitchContextState.Provider, { state: { workflowDefinitionId, activityType, propertyName } }, driver === null || driver === void 0 ? void 0 : driver.renderInput(renderInputContext));
        return {
          inputContext: renderInputContext,
          inputControl: control,
        };
      });
    };
    this.findActivityDescriptor = () => !!this.activity ? state.activityDescriptors.find(x => x.typeName == this.activity.type && x.version == this.activity.version) : null;
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
      const camelCasePropertyName = lodash.camelCase(propertyName);
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
            memoryReference: { id: v4() },
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
      const camelCasePropertyName = lodash.camelCase(propertyName);
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
      return h("div", { key: key }, h(FormEntry, { fieldId: "ActivityId", label: this.strings.activityId, hint: this.strings.activityHint }, h("input", { type: "text", name: "ActivityId", id: "ActivityId", value: activityId, onChange: e => this.onActivityIdChanged(e) })), h(FormEntry, { fieldId: "ActivityDisplayText", label: this.strings.activityDisplayText, hint: this.strings.activityDisplayHint }, h("input", { type: "text", name: "ActivityDisplayText", id: "ActivityDisplayText", value: displayText, onChange: e => this.onActivityDisplayTextChanged(e) })), h(CheckboxFormEntry, { fieldId: "CanStartWorkflow", label: this.strings.activityCanStartWorkflow, hint: this.strings.activityCanStartWorkflowHint }, h("input", { type: "checkbox", name: "CanStartWorkflow", id: "CanStartWorkflow", value: "true", checked: canStartWorkflow, onChange: e => this.onCanStartWorkflowChanged(e) })));
    };
    this.renderInputTab = () => {
      console.log('renderInputTab');
      const { activity, inputs } = this.renderContext;
      const activityId = activity.id;
      const key = `${activityId}`;
      return h("div", { key: key }, inputs.filter(x => !!x.inputControl).map(propertyContext => {
        const key = `${activity.id}-${propertyContext.inputContext.inputDescriptor.name}`;
        console.log(key);
        return h("div", { key: key }, propertyContext.inputControl);
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
      return h("div", { key: key }, outputs.map(propertyDescriptor => {
        var _a;
        const key = `${activity.id}-${propertyDescriptor.name}`;
        const displayName = isNullOrWhitespace(propertyDescriptor.displayName) ? propertyDescriptor.name : propertyDescriptor.displayName;
        const propertyName = lodash.camelCase(propertyDescriptor.name);
        const propertyValue = activity[propertyName];
        const propertyType = propertyDescriptor.typeName;
        const typeDescriptor = state.variableDescriptors.find(x => x.typeName == propertyType);
        const propertyTypeName = (_a = typeDescriptor === null || typeDescriptor === void 0 ? void 0 : typeDescriptor.displayName) !== null && _a !== void 0 ? _a : propertyType;
        return h("div", { key: key }, h(FormEntry, { fieldId: key, label: displayName, hint: propertyDescriptor.description }, h("div", { class: "tw-relative" }, h("select", { onChange: e => this.onOutputPropertyEditorChanged(propertyDescriptor, e.currentTarget.value) }, outputTargetOptions.map(outputTarget => {
          var _a;
          if (!outputTarget) {
            return h("option", { value: "", selected: !((_a = propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.memoryReference) === null || _a === void 0 ? void 0 : _a.id) }, "-");
          }
          const items = outputTarget.items;
          return (h("optgroup", { label: outputTarget.label }, items.map(item => {
            var _a;
            const isSelected = ((_a = propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.memoryReference) === null || _a === void 0 ? void 0 : _a.id) == item.value;
            return h("option", { value: `${outputTarget.kind}::${item.value}`, selected: isSelected }, item.name);
          })));
        })), h("div", { class: "tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center pr-10" }, h("span", { class: "tw-text-gray-500 sm:tw-text-sm" }, propertyTypeName)))));
      }));
    };
    this.renderTaskTab = () => {
      var _a, _b, _c;
      const { activity } = this.renderContext;
      const activityId = activity.id;
      const runAsynchronously = (_c = (_b = (_a = activity.customProperties) === null || _a === void 0 ? void 0 : _a.RunAsynchronously) !== null && _b !== void 0 ? _b : activity.runAsynchronously) !== null && _c !== void 0 ? _c : false;
      const key = `${activityId}:task`;
      return h("div", { key: key }, h(CheckboxFormEntry, { fieldId: "RunAsynchronously", label: this.strings.taskExecuteAsynchronously, hint: this.strings.taskExecuteAsynchronouslyHint }, h("input", { type: "checkbox", name: "RunAsynchronously", id: "RunAsynchronously", value: "true", checked: runAsynchronously, onChange: e => this.onRunAsynchronouslyChanged(e) })));
    };
    this.workflowDefinitionId = undefined;
    this.activity = undefined;
    this.variables = [];
    this.outputs = [];
    this.isReadonly = undefined;
    this.selectedTabIndex = 0;
    this.inputDriverRegistry = Container.get(InputDriverRegistry);
    this.eventBus = Container.get(EventBus);
  }
  async show() {
    await this.slideOverPanel.show();
  }
  async hide() {
    await this.slideOverPanel.hide();
  }
  async componentWillRender() {
    var _a, _b;
    this.strings = await getLocaleComponentStrings(this.element);
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
    await this.eventBus.emit(ActivityPropertyPanelEvents.Displaying, this, this.renderContext);
  }
  render() {
    const { activity, activityDescriptor, tabs } = this.renderContext;
    const actions = [];
    const mainTitle = activity.id;
    const subTitle = activityDescriptor.displayName;
    const selectedTabIndex = this.getSelectedTabIndex(tabs);
    return (h("elsa-form-panel", { isReadonly: this.isReadonly, mainTitle: mainTitle, subTitle: subTitle, orientation: "Landscape", tabs: tabs, selectedTabIndex: selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e), actions: actions }));
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
  get element() { return this; }
}, [0, "elsa-activity-properties-editor", {
    "workflowDefinitionId": [1, "workflow-definition-id"],
    "activity": [16],
    "variables": [16],
    "outputs": [16],
    "isReadonly": [4, "is-readonly"],
    "selectedTabIndex": [32],
    "show": [64],
    "hide": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-activity-properties-editor", "context-consumer", "elsa-form-panel"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-activity-properties-editor":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActivityPropertiesEditor);
      }
      break;
    case "context-consumer":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-form-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { ActivityPropertiesEditor as A, defineCustomElement as d };

//# sourceMappingURL=activity-properties-editor.js.map