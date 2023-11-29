import { FunctionalComponent, h } from '@stencil/core';
import {DropdownButtonItem, DropdownButtonOrigin} from "../../../components/shared/dropdown-button/models";
import {BulkActionsIcon, OrderByIcon, PageSizeIcon} from "../../../components/icons/tooling";
import {WorkflowDefinitionsOrderBy} from "../services/api";

export interface PageSizeFilterProps {
  selectedPageSize: number;
  onChange: (pageSize: number) => void;
  pageSizeText: string;
}

export interface OrderByFilterProps {
  selectedOrderBy?: WorkflowDefinitionsOrderBy;
  onChange: (orderBy: WorkflowDefinitionsOrderBy) => void;
  orderByText: string;
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
  bulkActionsText: string;
  bulkDeleteText: string;
  bulkPublishText: string;
  bulkUnpublishText: string;
}

export const Filter: FunctionalComponent<FilterProps> = ({ pageSizeFilter, orderByFilter, onBulkDelete, onBulkPublish, onBulkUnpublish, labelFilter, bulkActionsText, bulkDeleteText, bulkPublishText, bulkUnpublishText }) => {
  return (
    <div class="tw-p-8 tw-flex tw-content-end tw-justify-right tw-bg-white tw-space-x-4">
      <div class="tw-flex-shrink-0">
        <BulkActions onBulkDelete={onBulkDelete} onBulkPublish={onBulkPublish} onBulkUnpublish={onBulkUnpublish} bulkActionsText={bulkActionsText} bulkDeleteText={bulkDeleteText} bulkPublishText={bulkPublishText} bulkUnpublishText={bulkUnpublishText} />
      </div>
      <div class="tw-flex-1">&nbsp;</div>

      <PageSizeFilter {...pageSizeFilter} />

      <OrderByFilter {...orderByFilter} />
    </div>
  );
};



const BulkActions: FunctionalComponent<BulkActionsProps> = ({ onBulkDelete, onBulkPublish, onBulkUnpublish,
  bulkActionsText, bulkDeleteText, bulkPublishText, bulkUnpublishText }) => {
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

  const onBulkActionSelected = (e: CustomEvent<DropdownButtonItem>) => {
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

  return <elsa-dropdown-button text={bulkActionsText}
                               items={bulkActions}
                               theme="Secondary"
                               icon={<BulkActionsIcon />}
                               origin={DropdownButtonOrigin.TopLeft}
                               onItemSelected={onBulkActionSelected} />;
};

const PageSizeFilter: FunctionalComponent<PageSizeFilterProps> = ({ selectedPageSize, onChange, pageSizeText }) => {
  const selectedPageSizeText = `${pageSizeText}: ${selectedPageSize}`;
  const pageSizes: Array<number> = [5, 10, 15, 20, 30, 50, 100];

  const items: Array<DropdownButtonItem> = pageSizes.map(x => {
    const text = '' + x;
    return { text: text, isSelected: x == selectedPageSize, value: x };
  });

  const onPageSizeChanged = (e: CustomEvent<DropdownButtonItem>) => onChange(parseInt(e.detail.value));

  return <elsa-dropdown-button text={selectedPageSizeText} items={items} theme="Secondary" icon={<PageSizeIcon />} origin={DropdownButtonOrigin.TopRight} onItemSelected={onPageSizeChanged} />;
};

const OrderByFilter: FunctionalComponent<OrderByFilterProps> = ({ selectedOrderBy, onChange, orderByText }) => {
  const selectedOrderByText = !!selectedOrderBy ? `${orderByText}: ${selectedOrderBy}` : orderByText;
  const orderByValues: Array<WorkflowDefinitionsOrderBy> = [WorkflowDefinitionsOrderBy.Name, WorkflowDefinitionsOrderBy.Created];
  const items: Array<DropdownButtonItem> = orderByValues.map(x => ({ text: x, value: x, isSelected: x == selectedOrderBy }));
  const onOrderByChanged = (e: CustomEvent<DropdownButtonItem>) => onChange(e.detail.value);

  return <elsa-dropdown-button text={selectedOrderByText} items={items} theme="Secondary" icon={<OrderByIcon />} origin={DropdownButtonOrigin.TopRight} onItemSelected={onOrderByChanged} />;
};
