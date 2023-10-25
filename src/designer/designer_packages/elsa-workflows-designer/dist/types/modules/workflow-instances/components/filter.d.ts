import { FunctionalComponent } from "../../../stencil-public-runtime";
import { WorkflowDefinitionSummary } from "../../workflow-definitions/models/entities";
import { OrderBy, WorkflowStatus, WorkflowSubStatus } from "../../../models";
export interface FilterProps extends BulkActionsProps {
  pageSizeFilter: PageSizeFilterProps;
  workflowFilter: WorkflowFilterProps;
  statusFilter: StatusFilterProps;
  subStatusFilter: SubStatusFilterProps;
  orderByFilter: OrderByFilterProps;
  resetFilter: () => void;
}
export interface BulkActionsProps {
  onBulkDelete: () => void;
  onBulkCancel: () => void;
}
export interface PageSizeFilterProps {
  selectedPageSize: number;
  onChange: (pageSize: number) => void;
}
export interface WorkflowFilterProps {
  workflows: Array<WorkflowDefinitionSummary>;
  selectedWorkflowDefinitionId?: string;
  onChange: (definitionId: string) => void;
}
export interface StatusFilterProps {
  selectedStatus?: WorkflowStatus;
  onChange: (status: WorkflowStatus) => void;
}
export interface SubStatusFilterProps {
  selectedStatus?: WorkflowSubStatus;
  onChange: (status: WorkflowSubStatus) => void;
}
export interface OrderByFilterProps {
  selectedOrderBy?: OrderBy;
  onChange: (orderBy: OrderBy) => void;
}
export declare const Filter: FunctionalComponent<FilterProps>;
