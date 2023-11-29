import {Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch} from '@stencil/core';
import {Container} from "typedi";
import {EventBus} from "../../../../services";
import {InputDefinition, OutputDefinition, WorkflowDefinition, WorkflowOptions} from "../../models/entities";
import {PropertiesTabModel, TabModel, Widget, WorkflowDefinitionPropsUpdatedArgs, WorkflowPropertiesEditorDisplayingArgs, WorkflowPropertiesEditorEventTypes, WorkflowPropertiesEditorModel} from "../../models/ui";
import {CheckboxFormEntry, FormEntry} from "../../../../components/shared/forms/form-entry";
import {isNullOrWhitespace} from "../../../../utils";
import {InfoList} from "../../../../components/shared/forms/info-list";
import {TabChangedArgs, Variable} from "../../../../models";
import {WorkflowDefinitionsApi} from "../../services/api";
import descriptorsStore from "../../../../data/descriptors-store";
import {WorkflowPropertiesEditorTabs} from "../../models/props-editor-tabs";
import { getLocaleComponentStrings } from '../../../../utils/locale';

@Component({
  tag: 'elsa-workflow-definition-properties-editor',
})
export class WorkflowDefinitionPropertiesEditor {
  private readonly eventBus: EventBus;
  private slideOverPanel: HTMLElsaSlideOverPanelElement;
  private readonly workflowDefinitionApi: WorkflowDefinitionsApi;

  constructor() {
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionApi = Container.get(WorkflowDefinitionsApi);

    this.model = {
      tabModels: [],
    }
  }

  @Prop() workflowDefinition?: WorkflowDefinition;
  @Prop() workflowVersions: Array<WorkflowDefinition>;
  @Prop() readonly: boolean;
  @Event() workflowPropsUpdated: EventEmitter<WorkflowDefinitionPropsUpdatedArgs>;
  @Event() versionSelected: EventEmitter<WorkflowDefinition>;
  @Event() deleteVersionClicked: EventEmitter<WorkflowDefinition>;
  @Event() revertVersionClicked: EventEmitter<WorkflowDefinition>;
  @State() private model: WorkflowPropertiesEditorModel;
  @State() private selectedTabIndex: number = 0;
  @Element() element: HTMLElement;
  strings!: any;


  @Method()
  public async show(): Promise<void> {
    await this.slideOverPanel.show();
  }

  @Method()
  public async hide(): Promise<void> {
    await this.slideOverPanel.hide();
  }

  @Watch('workflowDefinition')
  async onWorkflowDefinitionChanged() {
    await this.createModel();
  }

  @Watch('workflowVersions')
  async onWorkflowVersionsChanged() {
    await this.createModel();
  }

  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    await this.createModel();
  }

  public render() {
    const workflowDefinition = this.workflowDefinition;
    const title = workflowDefinition?.name ?? 'Untitled';
    const subTitle = 'Workflow Definition'
    const tabs = this.model.tabModels.map(x => x.tab);

    return (
      <elsa-form-panel
        isReadonly={this.readonly}
        mainTitle={title}
        subTitle={subTitle}
        tabs={tabs}
        selectedTabIndex={this.selectedTabIndex}
        onSelectedTabIndexChanged={e => this.onSelectedTabIndexChanged(e)}/>
    );
  }

  private createModel = async () => {
    const model = {
      tabModels: []
    };

    const workflowDefinition = this.workflowDefinition;
    const options: WorkflowOptions = workflowDefinition.options || {};
    const autoUpdateConsumingWorkflows = options.autoUpdateConsumingWorkflows ?? false;
    const usableAsActivity = options.usableAsActivity ?? false;

    if (!workflowDefinition) {
      this.model = model;
      return;
    }

    const propertiesTabModel: PropertiesTabModel = {
      name: 'properties',
      tab: null,
      Widgets: [{
        name: 'workflowName',
        content: () => {
          const workflow = this.workflowDefinition;
          return <FormEntry label={this.strings.propertiesWorkflowName} fieldId="workflowName" hint={this.strings.propertiesWorkflowNameHint}>
            <input type="text" name="workflowName" id="workflowName" value={workflow.name} onChange={e => this.onPropertyEditorChanged(wf => wf.name = (e.target as HTMLInputElement).value)}/>
          </FormEntry>;
        },
        order: 0
      }, {
        name: 'workflowDescription',
        content: () => {
          const workflow = this.workflowDefinition;
          return <FormEntry label={this.strings.propertiesWorkflowDescription} fieldId="workflowDescription" hint={this.strings.propertiesWorkflowDescriptionHint}>
            <textarea name="workflowDescription" id="workflowDescription" value={workflow.description} rows={6} onChange={e => this.onPropertyEditorChanged(wf => wf.description = (e.target as HTMLTextAreaElement).value)}/>
          </FormEntry>;
        },
        order: 5
      }, {
        name: 'workflowInfo',
        content: () => {
          const workflow = this.workflowDefinition;

          const workflowDetails = {
            [this.strings.propertiesDefitionId]: isNullOrWhitespace(workflow.definitionId) ? this.strings.propertiesNew : workflow.definitionId,
            [this.strings.propertiesVersionId]: isNullOrWhitespace(workflow.id) ? this.strings.propertiesNew : workflow.id,
            [this.strings.propertiesVersion]: workflow.version.toString(),
            [this.strings.propertiesStatus]: workflow.isPublished ? this.strings.propertiesPublished : this.strings.propertiesDraft,
            [this.strings.propertiesReadOnly]: workflow.isReadonly ? this.strings.propertiesYes : this.strings.propertiesNo
          };

          return <InfoList title="Information" dictionary={workflowDetails}/>;
        },
        order: 10
      }]
    };

    propertiesTabModel.tab = {
      displayText: this.strings.propertiesTab,
      order: 0,
      content: () => this.renderPropertiesTab(propertiesTabModel)
    };

    const variablesTabModel: TabModel = {
      name: 'variables',
      tab: {
        displayText: this.strings.variablesTab,
        order: 5,
        content: () => this.renderVariablesTab()
      }
    }

    const strategies = descriptorsStore.workflowActivationStrategyDescriptors;
    const firstStrategy = strategies.length > 0 ? strategies[0] : null;
    const defaultDescription = firstStrategy?.description ?? '';

    const settingsWidgets: Array<Widget> = [
      {
        name: 'workflowActivationValidator',
        order: 0,
        content: () => <FormEntry label={this.strings.settingsActivitationStrategy} fieldId="workflowActivationStrategyType" hint={defaultDescription}>
          <select name="workflowActivationStrategyType" onChange={e => this.onPropertyEditorChanged(wf => {
            const selectElement = (e.target as HTMLSelectElement);
            options.activationStrategyType = selectElement.value;
            wf.options = options;

            const hintElement: HTMLElement = selectElement.closest('.form-entry').getElementsByClassName('form-field-hint')[0] as HTMLElement;
            const strategy = strategies.find(x => x.typeName == selectElement.value);
            hintElement.innerText = strategy.description;
          })}>
            {strategies.map(strategy => <option value={strategy.typeName} selected={strategy.typeName == options.activationStrategyType}>{strategy.displayName}</option>)}
          </select>
        </FormEntry>
      },
      {
        name: 'usableAsActivity',
        order: 0,
        content: () => <CheckboxFormEntry label={this.strings.settingsUsableAsActivity} fieldId="UsableAsActivity" hint={this.strings.settingsUsableAsActivityHint}>
          <input type="checkbox" id="UsableAsActivity" name="UsableAsActivity" checked={usableAsActivity} onChange={e => this.onPropertyEditorChanged(wf => {
            const inputElement = (e.target as HTMLInputElement);
            wf.options.usableAsActivity = inputElement.checked;
            this.createModel();
          })}/>
        </CheckboxFormEntry>
      },
      {
        name: 'autoUpdateConsumingWorkflows',
        order: 0,
        content: () =>
          <CheckboxFormEntry fieldId="UpdateConsumingWorkflows" label={this.strings.settingsAutoUpdateConsumingWorkflows} hint={this.strings.settingsAutoUpdateConsumingWorkflowsHint}>
            <input type="checkbox" name="UpdateConsumingWorkflows" id="UpdateConsumingWorkflows" checked={autoUpdateConsumingWorkflows} onChange={e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target as HTMLInputElement;
              options.autoUpdateConsumingWorkflows = inputElement.checked;
              wf.options = options;
            })}/>
          </CheckboxFormEntry>
      }
    ];

    const settingsTabModel: TabModel = {
      name: 'settings',
      tab: {
        displayText: this.strings.settingsTab,
        order: 10,
        content: () => <elsa-widgets widgets={settingsWidgets}/>
      }
    }

    const inputOutputTabModel: TabModel = {
      name: 'input-output',
      tab: {
        displayText: this.strings.inputOutputTab,
        order: 15,
        content: () => this.renderInputOutputTab()
      }
    }

    const versionHistoryTabModel: TabModel = {
      name: 'versionHistory',
      tab: {
        displayText: this.strings.versionHistoryTab,
        order: 20,
        content: () => this.renderVersionHistoryTab()
      }
    }

    model.tabModels = [propertiesTabModel, variablesTabModel, settingsTabModel, versionHistoryTabModel, inputOutputTabModel];

    const args: WorkflowPropertiesEditorDisplayingArgs = {
      workflowDefinition,
      model,
      notifyWorkflowDefinitionChanged: () => this.onWorkflowDefinitionUpdated()
    };

    await this.eventBus.emit(WorkflowPropertiesEditorEventTypes.Displaying, this, args);

    this.model = model;
  }

  private renderPropertiesTab = (tabModel: PropertiesTabModel) => <elsa-widgets widgets={tabModel.Widgets}/>;

  private renderVariablesTab = () => {
    const variables: Array<Variable> = this.workflowDefinition?.variables ?? [];

    return <div>
      <elsa-variables-editor variables={variables} onVariablesChanged={e => this.onVariablesUpdated(e)}/>
    </div>
  };

  private renderInputOutputTab = () => {
    const inputs: Array<InputDefinition> = this.workflowDefinition?.inputs ?? [];
    const outputs: Array<OutputDefinition> = this.workflowDefinition?.outputs ?? [];
    const outcomes: Array<string> = this.workflowDefinition?.outcomes ?? [];

    return <div>
      <elsa-workflow-definition-input-output-settings
        inputs={inputs}
        outputs={outputs}
        outcomes={outcomes}
        onInputsChanged={e => this.onInputsUpdated(e)}
        onOutputsChanged={e => this.onOutputsUpdated(e)}
        onOutcomesChanged={e => this.onOutcomesUpdated(e)}
      />
    </div>
  };

  private renderVersionHistoryTab = () => {
    return <div>
      <elsa-workflow-definition-version-history
        selectedVersion={this.workflowDefinition}
        workflowVersions={this.workflowVersions}
      />
    </div>
  };

  private onSelectedTabIndexChanged = (e: CustomEvent<TabChangedArgs>) => this.selectedTabIndex = e.detail.selectedTabIndex;

  private onPropertyEditorChanged = (apply: (w: WorkflowDefinition) => void) => {
    const workflowDefinition = this.workflowDefinition;
    apply(workflowDefinition);
    this.workflowPropsUpdated.emit({workflowDefinition: workflowDefinition});
  }

  private onVariablesUpdated = async (e: CustomEvent<Array<Variable>>) => this.onPropsUpdated('variables', e.detail)

  private onInputsUpdated = async (e: CustomEvent<Array<InputDefinition>>) => this.onPropsUpdated('inputs', e.detail)
  private onOutputsUpdated = async (e: CustomEvent<Array<OutputDefinition>>) => this.onPropsUpdated('outputs', e.detail)

  private onOutcomesUpdated = async (e: CustomEvent<Array<string>>) => this.onPropsUpdated('outcomes', e.detail)

  private onPropsUpdated = async (
    propName: string,
    propValue: Array<Variable> | Array<InputDefinition> | Array<OutputDefinition> | Array<string>
  ) => {
    const workflowDefinition = this.workflowDefinition;

    if (!workflowDefinition || !workflowDefinition.isLatest) {
      console.debug('onPropsUpdated: workflowDefinition is not latest');
      return;
    }

    workflowDefinition[propName] = propValue;
    const updatedTab = this.getPropEditorSectionByPropName(propName);
    this.workflowPropsUpdated.emit({workflowDefinition, updatedTab});
    await this.createModel();
  };

  private onWorkflowDefinitionUpdated = () => {
    const workflowDefinition = this.workflowDefinition;
    this.workflowPropsUpdated.emit({workflowDefinition});
  };

  private getPropEditorSectionByPropName(propName: string): WorkflowPropertiesEditorTabs {
    const enumKey = Object.keys(WorkflowPropertiesEditorTabs).find(key => WorkflowPropertiesEditorTabs[key as keyof typeof WorkflowPropertiesEditorTabs] === propName);

    if (enumKey) {
      return WorkflowPropertiesEditorTabs[enumKey as keyof typeof WorkflowPropertiesEditorTabs];
    }
    return null;
  }
}
