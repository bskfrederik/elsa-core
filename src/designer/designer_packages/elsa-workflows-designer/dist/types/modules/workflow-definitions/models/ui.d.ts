import { Activity, ActivityDescriptor, InputDescriptor, TabDefinition } from "../../../models";
import { WorkflowDefinition } from "./entities";
import { WorkflowPropertiesEditorTabs } from "./props-editor-tabs";
export declare const WorkflowEditorEventTypes: {
  WorkflowDefinition: {
    Imported: string;
  };
  Activity: {
    PropertyChanged: string;
  };
  WorkflowEditor: {
    Ready: string;
    WorkflowLoaded: string;
  };
};
export declare const WorkflowPropertiesEditorEventTypes: {
  Displaying: string;
};
export declare const ActivityPropertyPanelEvents: {
  Displaying: string;
};
export interface ActivityPropertyChangedEventArgs {
  activity: Activity;
  activityDescriptor: ActivityDescriptor;
  propertyName?: string;
  inputDescriptor?: InputDescriptor;
  workflowEditor?: HTMLElsaWorkflowDefinitionEditorElement;
}
export interface WorkflowDefinitionUpdatedArgs {
  workflowDefinition: WorkflowDefinition;
}
export interface WorkflowDefinitionPropsUpdatedArgs {
  workflowDefinition: WorkflowDefinition;
  updatedTab?: WorkflowPropertiesEditorTabs;
}
export interface WorkflowPropertiesEditorDisplayingArgs {
  workflowDefinition: WorkflowDefinition;
  model: WorkflowPropertiesEditorModel;
  notifyWorkflowDefinitionChanged: () => void;
}
export interface TabModel {
  name: string;
  tab: TabDefinition;
}
export interface Widget {
  name: string;
  content: () => any;
  order?: number;
}
export interface PropertiesTabModel extends TabModel {
  Widgets: Array<Widget>;
}
export interface WorkflowPropertiesEditorModel {
  tabModels: Array<TabModel>;
}
export interface WorkflowDefinitionImportedArgs {
  workflowDefinition: WorkflowDefinition;
}
export interface WorkflowEditorReadyArgs {
  workflowEditor: HTMLElsaWorkflowDefinitionEditorElement;
}
export interface ActivityUpdatedArgs {
  originalId?: string;
  newId?: string;
  activity: Activity;
  activityDescriptor: ActivityDescriptor;
}
export interface ActivityIdUpdatedArgs {
  activity: Activity;
  activityDescriptor: ActivityDescriptor;
  originalId: string;
  newId: string;
}
export interface DeleteActivityRequestedArgs {
  activity: Activity;
}
