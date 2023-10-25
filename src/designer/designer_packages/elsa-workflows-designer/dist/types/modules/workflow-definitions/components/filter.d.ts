import { FunctionalComponent } from '../../../stencil-public-runtime';
import { WorkflowDefinitionsOrderBy } from "../services/api";
export interface PageSizeFilterProps {
  selectedPageSize: number;
  onChange: (pageSize: number) => void;
}
export interface OrderByFilterProps {
  selectedOrderBy?: WorkflowDefinitionsOrderBy;
  onChange: (orderBy: WorkflowDefinitionsOrderBy) => void;
}
export interface LabelFilterProps {
  selectedLabels?: Array<string>;
  onSelectedLabelsChanged: (e: CustomEvent<Array<string>>) => void;
  buttonClass?: string;
  containerClass?: string;
}
export interface FilterProps extends BulkActionsProps {
  pageSizeFilter: PageSizeFilterProps;
  orderByFilter: OrderByFilterProps;
  labelFilter: LabelFilterProps;
}
export interface BulkActionsProps {
  onBulkDelete: () => void;
  onBulkPublish: () => void;
  onBulkUnpublish: () => void;
}
export declare const Filter: FunctionalComponent<FilterProps>;
