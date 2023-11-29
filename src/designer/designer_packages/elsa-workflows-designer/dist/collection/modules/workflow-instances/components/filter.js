import { h } from "@stencil/core";
import { OrderBy, WorkflowStatus, WorkflowSubStatus } from "../../../models";
import { DropdownButtonOrigin } from "../../../components/shared/dropdown-button/models";
import { BulkActionsIcon, OrderByIcon, PageSizeIcon, WorkflowIcon, WorkflowStatusIcon } from "../../../components/icons/tooling";
export const Filter = ({ pageSizeFilter, workflowFilter, statusFilter, subStatusFilter, orderByFilter, resetFilter, onBulkDelete, onBulkCancel, bulkText, bulkDeleteText, bulkCancelText, resetText }) => {
  return h("div", { class: "tw-p-8 tw-flex tw-content-end tw-justify-right tw-bg-white tw-space-x-4" }, h("div", { class: "tw-flex-shrink-0" }, h(BulkActions, { onBulkDelete: onBulkDelete, onBulkCancel: onBulkCancel, bulkText: bulkText, bulkDeleteText: bulkDeleteText, bulkCancelText: bulkCancelText })), h("div", { class: "tw-flex-1" }, "\u00A0"), h("button", { onClick: resetFilter, type: "button", class: "tw-text-sm tw-text-blue-600 active:tw-text-blue-700 tw-px-3 active:ring tw-ring-blue-500 tw-rounded" }, resetText), h(PageSizeFilter, Object.assign({}, pageSizeFilter)), h(WorkflowFilter, Object.assign({}, workflowFilter)), h(StatusFilter, Object.assign({}, statusFilter)), h(SubStatusFilter, Object.assign({}, subStatusFilter)), h(OrderByFilter, Object.assign({}, orderByFilter)));
};
const BulkActions = ({ onBulkDelete, onBulkCancel, bulkText, bulkDeleteText, bulkCancelText }) => {
  const bulkActions = [{
      text: bulkDeleteText,
      name: 'Delete',
    }, {
      text: bulkCancelText,
      name: 'Cancel',
    }];
  const onBulkActionSelected = (e) => {
    const action = e.detail;
    switch (action.name) {
      case 'Delete':
        onBulkDelete();
        break;
      case 'Cancel':
        onBulkCancel();
        break;
      default:
        action.handler();
    }
  };
  return h("elsa-dropdown-button", { text: bulkText, items: bulkActions, icon: h(BulkActionsIcon, null), origin: DropdownButtonOrigin.TopLeft, theme: "Secondary", onItemSelected: onBulkActionSelected });
};
const PageSizeFilter = ({ selectedPageSize, onChange, pageSizeText }) => {
  const selectedPageSizeText = `${pageSizeText}: ${selectedPageSize}`;
  const pageSizes = [5, 10, 15, 20, 30, 50, 100];
  const items = pageSizes.map(x => {
    const text = "" + x;
    return { text: text, isSelected: x == selectedPageSize, value: x };
  });
  const onPageSizeChanged = (e) => onChange(parseInt(e.detail.value));
  return h("elsa-dropdown-button", { text: selectedPageSizeText, items: items, icon: h(PageSizeIcon, null), origin: DropdownButtonOrigin.TopRight, theme: "Secondary", onItemSelected: onPageSizeChanged });
};
const WorkflowFilter = ({ workflows, selectedWorkflowDefinitionId, onChange, workflowText }) => {
  const selectedWorkflow = workflows.find(x => x.definitionId == selectedWorkflowDefinitionId);
  const getWorkflowName = (workflow) => { var _a; return ((_a = workflow === null || workflow === void 0 ? void 0 : workflow.name) === null || _a === void 0 ? void 0 : _a.length) > 0 ? workflow.name : 'Untitled'; };
  const selectedWorkflowText = !selectedWorkflowDefinitionId ? workflowText : getWorkflowName(selectedWorkflow);
  let items = workflows.map(x => ({ text: getWorkflowName(x), value: x.definitionId, isSelected: x.definitionId == selectedWorkflowDefinitionId }));
  const allItem = { text: workflowText, value: null, isSelected: !selectedWorkflowDefinitionId };
  const onWorkflowChanged = (e) => onChange(e.detail.value);
  items = [allItem, ...items];
  return h("elsa-dropdown-button", { text: selectedWorkflowText, items: items, icon: h(WorkflowIcon, null), origin: DropdownButtonOrigin.TopRight, theme: "Secondary", onItemSelected: onWorkflowChanged });
};
const StatusFilter = ({ selectedStatus, onChange }) => {
  const selectedStatusText = !!selectedStatus ? selectedStatus : 'Status';
  const statuses = [null, WorkflowStatus.Running, WorkflowStatus.Finished];
  const statusOptions = statuses.map(x => ({ text: x !== null && x !== void 0 ? x : 'All', isSelected: x == selectedStatus, value: x }));
  const onStatusChanged = (e) => onChange(e.detail.value);
  return h("elsa-dropdown-button", { text: selectedStatusText, items: statusOptions, icon: h(WorkflowStatusIcon, null), origin: DropdownButtonOrigin.TopRight, theme: "Secondary", onItemSelected: onStatusChanged });
};
const SubStatusFilter = ({ selectedStatus, onChange }) => {
  const selectedSubStatusText = !!selectedStatus ? selectedStatus : 'Sub status';
  const subStatuses = [null, WorkflowSubStatus.Executing, WorkflowSubStatus.Suspended, WorkflowSubStatus.Finished, WorkflowSubStatus.Faulted, WorkflowSubStatus.Cancelled];
  const subStatusOptions = subStatuses.map(x => ({ text: x !== null && x !== void 0 ? x : 'All', isSelected: x == selectedStatus, value: x }));
  const onStatusChanged = (e) => onChange(e.detail.value);
  return h("elsa-dropdown-button", { text: selectedSubStatusText, items: subStatusOptions, icon: h(WorkflowStatusIcon, null), origin: DropdownButtonOrigin.TopRight, theme: "Secondary", onItemSelected: onStatusChanged });
};
const OrderByFilter = ({ selectedOrderBy, onChange, orderByText }) => {
  const selectedOrderByText = !!selectedOrderBy ? `${orderByText}: ${selectedOrderBy}` : orderByText;
  const orderByValues = [OrderBy.Finished, OrderBy.Updated, OrderBy.Created];
  const items = orderByValues.map(x => ({ text: x, value: x, isSelected: x == selectedOrderBy }));
  const onOrderByChanged = (e) => onChange(e.detail.value);
  return h("elsa-dropdown-button", { text: selectedOrderByText, items: items, icon: h(OrderByIcon, null), theme: "Secondary", origin: DropdownButtonOrigin.TopRight, onItemSelected: onOrderByChanged });
};
//# sourceMappingURL=filter.js.map
