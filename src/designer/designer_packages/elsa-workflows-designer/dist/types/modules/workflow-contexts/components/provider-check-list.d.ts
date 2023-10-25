import { EventEmitter } from '../../../stencil-public-runtime';
import { SelectList, Type } from "../../../models";
import { WorkflowContextProviderDescriptor } from "../services/api";
import { WorkflowDefinition } from "../../workflow-definitions/models/entities";
export declare class ProviderCheckList {
  descriptors: Array<WorkflowContextProviderDescriptor>;
  workflowDefinition: WorkflowDefinition;
  workflowDefinitionChanged: EventEmitter<WorkflowDefinition>;
  selectList: SelectList;
  selectedProviderTypes: Array<Type>;
  componentWillLoad(): Promise<void>;
  render(): any;
  private onSelectedProvidersChanged;
}
