import { PagedList } from "../../../models";
import { WorkflowDefinitionSummary } from "../models/entities";
export declare function updateSelectedWorkflowDefinitions(isChecked: boolean, workflowDefinitions: PagedList<WorkflowDefinitionSummary>, selectedWorkflowDefinitionIds: Array<string>): string[];
