import { h } from '@stencil/core';
import { DropdownButtonOrigin } from "../../../components/shared/dropdown-button/models";
import { BulkActionsIcon, OrderByIcon, PageSizeIcon } from "../../../components/icons/tooling";
import { WorkflowDefinitionsOrderBy } from "../services/api";
export const Filter = ({ pageSizeFilter, orderByFilter, onBulkDelete, onBulkPublish, onBulkUnpublish, labelFilter, bulkActionsText, bulkDeleteText, bulkPublishText, bulkUnpublishText }) => {
  return (h("div", { class: "tw-p-8 tw-flex tw-content-end tw-justify-right tw-bg-white tw-space-x-4" }, h("div", { class: "tw-flex-shrink-0" }, h(BulkActions, { onBulkDelete: onBulkDelete, onBulkPublish: onBulkPublish, onBulkUnpublish: onBulkUnpublish, bulkActionsText: bulkActionsText, bulkDeleteText: bulkDeleteText, bulkPublishText: bulkPublishText, bulkUnpublishText: bulkUnpublishText })), h("div", { class: "tw-flex-1" }, "\u00A0"), h(PageSizeFilter, Object.assign({}, pageSizeFilter)), h(OrderByFilter, Object.assign({}, orderByFilter))));
};
const BulkActions = ({ onBulkDelete, onBulkPublish, onBulkUnpublish, bulkActionsText, bulkDeleteText, bulkPublishText, bulkUnpublishText }) => {
  const bulkActions = [
    {
      text: bulkDeleteText,
      name: 'Delete',
    },
    {
      text: bulkPublishText,
      name: 'Publish',
    },
    {
      text: bulkUnpublishText,
      name: 'Unpublish',
    },
  ];
  const onBulkActionSelected = (e) => {
    const action = e.detail;
    switch (action.name) {
      case 'Delete':
        onBulkDelete();
        break;
      case 'Publish':
        onBulkPublish();
        break;
      case 'Unpublish':
        onBulkUnpublish();
        break;
      default:
        action.handler();
    }
  };
  return h("elsa-dropdown-button", { text: bulkActionsText, items: bulkActions, theme: "Secondary", icon: h(BulkActionsIcon, null), origin: DropdownButtonOrigin.TopLeft, onItemSelected: onBulkActionSelected });
};
const PageSizeFilter = ({ selectedPageSize, onChange, pageSizeText }) => {
  const selectedPageSizeText = `${pageSizeText}: ${selectedPageSize}`;
  const pageSizes = [5, 10, 15, 20, 30, 50, 100];
  const items = pageSizes.map(x => {
    const text = '' + x;
    return { text: text, isSelected: x == selectedPageSize, value: x };
  });
  const onPageSizeChanged = (e) => onChange(parseInt(e.detail.value));
  return h("elsa-dropdown-button", { text: selectedPageSizeText, items: items, theme: "Secondary", icon: h(PageSizeIcon, null), origin: DropdownButtonOrigin.TopRight, onItemSelected: onPageSizeChanged });
};
const OrderByFilter = ({ selectedOrderBy, onChange, orderByText }) => {
  const selectedOrderByText = !!selectedOrderBy ? `${orderByText}: ${selectedOrderBy}` : orderByText;
  const orderByValues = [WorkflowDefinitionsOrderBy.Name, WorkflowDefinitionsOrderBy.Created];
  const items = orderByValues.map(x => ({ text: x, value: x, isSelected: x == selectedOrderBy }));
  const onOrderByChanged = (e) => onChange(e.detail.value);
  return h("elsa-dropdown-button", { text: selectedOrderByText, items: items, theme: "Secondary", icon: h(OrderByIcon, null), origin: DropdownButtonOrigin.TopRight, onItemSelected: onOrderByChanged });
};
//# sourceMappingURL=filter.js.map
