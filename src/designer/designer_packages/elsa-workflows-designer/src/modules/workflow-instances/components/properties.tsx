import {Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch} from '@stencil/core';
import {TabChangedArgs, Variable, WorkflowInstance} from '../../../models';
import {InfoList} from "../../../components/shared/forms/info-list";
import {formatTimestamp, isNullOrWhitespace} from "../../../utils";
import {PropertiesTabModel, TabModel, WorkflowInstancePropertiesDisplayingArgs, WorkflowInstancePropertiesEventTypes, WorkflowInstancePropertiesViewerModel} from "../models";
import {Container} from "typedi";
import {EventBus} from "../../../services";
import {WorkflowDefinition} from "../../workflow-definitions/models/entities";
import { getLocaleComponentStrings } from '../../../utils/locale';

@Component({
  tag: 'elsa-workflow-instance-properties',
})
export class WorkflowDefinitionPropertiesEditor {
  private readonly eventBus: EventBus;
  private slideOverPanel: HTMLElsaSlideOverPanelElement;

  constructor() {
    this.eventBus = Container.get(EventBus);

    this.model = {
      tabModels: [],
    }
  }

  @Prop() workflowDefinition?: WorkflowDefinition;
  @Prop() workflowInstance?: WorkflowInstance;
  @State() private model: WorkflowInstancePropertiesViewerModel;
  @State() private selectedTabIndex: number = 0;
  @State() private changeHandle: object = {};

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

  @Watch('workflowInstance')
  async onWorkflowInstanceChanged() {
    await this.createModel();
  }

  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    await this.createModel();
  }

  public render() {
    const workflowDefinition = this.workflowDefinition;
    const title = !isNullOrWhitespace(workflowDefinition?.name) ? workflowDefinition.name : '-';
    const subTitle = 'Workflow Instance';
    const tabs = this.model.tabModels.map(x => x.tab);

    return (
      <elsa-form-panel
        mainTitle={title}
        subTitle={subTitle}
        tabs={tabs}
        selectedTabIndex={this.selectedTabIndex}
        onSelectedTabIndexChanged={e => this.onSelectedTabIndexChanged(e)}/>
    );
  }

  private createModel = async () => {
    const model = {
      tabModels: [],
    };

    const workflowDefinition = this.workflowDefinition;
    const workflowInstance = this.workflowInstance;

    if (!workflowDefinition || !workflowInstance) {
      this.model = model;
      return;
    }

    const propertiesTabModel: PropertiesTabModel = {
      name: 'properties',
      tab: null,
      Widgets: [{
        name: 'workflowInstanceInfo',
        content: () => {

          const identityDetails = {
            [this.strings.propertiesTabInstanceId]: isNullOrWhitespace(workflowInstance.id) ? this.strings.propertiesNew : workflowInstance.id,
            [this.strings.propertiesTabDefinitionId]: isNullOrWhitespace(workflowDefinition.definitionId) ? this.strings.propertiesNew : workflowDefinition.definitionId,
            [this.strings.propertiesTabVersion]: workflowDefinition.version.toString(),
          };

          const statusDetails = {
            [this.strings.propertiesTabStatus]: workflowInstance.status,
            [this.strings.propertiesTabSubStatus]: workflowInstance.subStatus
          };

          const timestampDetails = {
            [this.strings.propertiesTabCreated]: formatTimestamp(workflowInstance.createdAt),
            [this.strings.propertiesTabLastExecution]: formatTimestamp(workflowInstance.updatedAt),
            [this.strings.propertiesTabFinished]: formatTimestamp(workflowInstance.finishedAt),
          };

          return <div>
            <InfoList title={this.strings.propertiesTab} dictionary={identityDetails}/>
            <InfoList title={this.strings.propertiesTabStatus} dictionary={statusDetails}/>
            <InfoList title={this.strings.propertiesTabTimeStamps} dictionary={timestampDetails} hideEmptyValues={true}/>
          </div>;
        },
        order: 10
      }]
    };

    propertiesTabModel.tab = {
      displayText: this.strings.propertiesTab,
      content: () => this.renderPropertiesTab(propertiesTabModel)
    };

    const variablesTabModel: TabModel = {
      name: 'variables',
      tab: {
        displayText: this.strings.variablesTab,
        content: () => this.renderVariablesTab()
      }
    }

    model.tabModels = [propertiesTabModel, variablesTabModel];

    const args: WorkflowInstancePropertiesDisplayingArgs = {model};

    await this.eventBus.emit(WorkflowInstancePropertiesEventTypes.Displaying, this, args);

    this.model = model;
  }

  private renderPropertiesTab = (tabModel: PropertiesTabModel) => {
    const widgets = tabModel.Widgets.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);

    return <div>
      {widgets.map(widget => widget.content())}
    </div>
  };

  private renderVariablesTab = () => {
    const variables: Array<Variable> = this.workflowDefinition?.variables ?? [];

    return <div>
      <elsa-variables-viewer variables={variables} workflowDefinition={this.workflowDefinition} workflowInstance={this.workflowInstance} />
    </div>
  };

  private onSelectedTabIndexChanged = (e: CustomEvent<TabChangedArgs>) => this.selectedTabIndex = e.detail.selectedTabIndex;
}
