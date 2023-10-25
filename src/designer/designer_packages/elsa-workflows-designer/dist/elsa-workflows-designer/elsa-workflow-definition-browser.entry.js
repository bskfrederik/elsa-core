import { h, r as registerInstance, e as createEvent, k as Host } from './index-dc0ae4f5.js';
import { B as BulkActionsIcon, P as PageSizeIcon, O as OrderByIcon, D as DefaultContents, C as Container, M as ModalDialogService, E as EditIcon, U as UnPublishIcon, a as PublishIcon, b as DeleteIcon } from './index-1637bf51.js';
import { l as lodash } from './lodash-cadbac1e.js';
import { D as DropdownButtonOrigin } from './models-81e2e763.js';
import { a4 as WorkflowDefinitionsOrderBy, a3 as WorkflowDefinitionsApi, A as ActivityDescriptorManager } from './index-7d63808a.js';
import { D as DefaultModalActions } from './models-09298028.js';
import { M as ModalType } from './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

const Search = ({ onSearch }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchTerm = formData.get('searchTerm').toString();
    onSearch(searchTerm);
  };
  const onSearchDebounced = lodash.debounce(onSearch, 200);
  const onKeyUp = (e) => {
    const term = e.target.value;
    onSearchDebounced(term);
  };
  return h("div", { class: "tw-relative tw-z-10 tw-flex-shrink-0 tw-flex tw-h-16 tw-bg-white tw-border-b tw-border-gray-200" },
    h("div", { class: "tw-flex-1 tw-px-4 tw-flex tw-justify-between sm:tw-px-6 lg:tw-px-8" },
      h("div", { class: "tw-flex-1 tw-flex" },
        h("form", { class: "tw-w-full tw-flex md:tw-ml-0", onSubmit: onSubmit },
          h("label", { htmlFor: "search_field", class: "tw-sr-only" }, "Search"),
          h("div", { class: "tw-relative tw-w-full tw-text-gray-400 focus-within:tw-text-gray-600" },
            h("div", { class: "tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pointer-events-none" },
              h("svg", { class: "tw-h-5 tw-w-5", fill: "currentColor", viewBox: "0 0 20 20" },
                h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" }))),
            h("input", { name: "searchTerm", onKeyUp: onKeyUp, class: "tw-block tw-w-full tw-h-full tw-pl-8 tw-pr-3 tw-py-2 tw-rounded-md tw-text-gray-900 tw-placeholder-cool-gray-500 focus:tw-placeholder-cool-gray-400 sm:tw-text-sm tw-border-0 focus:tw-outline-none focus:tw-ring-0", placeholder: "Search", type: "search" }))))));
};

const Filter = ({ pageSizeFilter, orderByFilter, onBulkDelete, onBulkPublish, onBulkUnpublish, labelFilter }) => {
  return (h("div", { class: "tw-p-8 tw-flex tw-content-end tw-justify-right tw-bg-white tw-space-x-4" },
    h("div", { class: "tw-flex-shrink-0" },
      h(BulkActions, { onBulkDelete: onBulkDelete, onBulkPublish: onBulkPublish, onBulkUnpublish: onBulkUnpublish })),
    h("div", { class: "tw-flex-1" }, "\u00A0"),
    h(PageSizeFilter, Object.assign({}, pageSizeFilter)),
    h(OrderByFilter, Object.assign({}, orderByFilter))));
};
const BulkActions = ({ onBulkDelete, onBulkPublish, onBulkUnpublish }) => {
  const bulkActions = [
    {
      text: 'Delete',
      name: 'Delete',
    },
    {
      text: 'Publish',
      name: 'Publish',
    },
    {
      text: 'Unpublish',
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
  return h("elsa-dropdown-button", { text: "Bulk Actions", items: bulkActions, theme: "Secondary", icon: h(BulkActionsIcon, null), origin: DropdownButtonOrigin.TopLeft, onItemSelected: onBulkActionSelected });
};
const PageSizeFilter = ({ selectedPageSize, onChange }) => {
  const selectedPageSizeText = `Page size: ${selectedPageSize}`;
  const pageSizes = [5, 10, 15, 20, 30, 50, 100];
  const items = pageSizes.map(x => {
    const text = '' + x;
    return { text: text, isSelected: x == selectedPageSize, value: x };
  });
  const onPageSizeChanged = (e) => onChange(parseInt(e.detail.value));
  return h("elsa-dropdown-button", { text: selectedPageSizeText, items: items, theme: "Secondary", icon: h(PageSizeIcon, null), origin: DropdownButtonOrigin.TopRight, onItemSelected: onPageSizeChanged });
};
const OrderByFilter = ({ selectedOrderBy, onChange }) => {
  const selectedOrderByText = !!selectedOrderBy ? `Ordered by: ${selectedOrderBy}` : 'Order by';
  const orderByValues = [WorkflowDefinitionsOrderBy.Name, WorkflowDefinitionsOrderBy.Created];
  const items = orderByValues.map(x => ({ text: x, value: x, isSelected: x == selectedOrderBy }));
  const onOrderByChanged = (e) => onChange(e.detail.value);
  return h("elsa-dropdown-button", { text: selectedOrderByText, items: items, theme: "Secondary", icon: h(OrderByIcon, null), origin: DropdownButtonOrigin.TopRight, onItemSelected: onOrderByChanged });
};

function updateSelectedWorkflowDefinitions(isChecked, workflowDefinitions, selectedWorkflowDefinitionIds) {
  const currentItems = workflowDefinitions.items.filter(item => !item.isReadonly).map(x => x.definitionId);
  return isChecked
    ? selectedWorkflowDefinitionIds.concat(currentItems.filter(item => !selectedWorkflowDefinitionIds.includes(item)))
    : selectedWorkflowDefinitionIds.filter(item => !currentItems.includes(item));
}

const key = 'LS/wfDefinitionBrowser';
function getRequest() {
  var json = localStorage.getItem(key);
  if (!json)
    return;
  return JSON.parse(json);
}
function persistRequest(request) {
  localStorage.setItem(key, JSON.stringify(request));
}

const WorkflowDefinitionBrowser = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.workflowDefinitionSelected = createEvent(this, "workflowDefinitionSelected", 7);
    this.workflowInstancesSelected = createEvent(this, "workflowInstancesSelected", 7);
    this.newWorkflowDefinitionSelected = createEvent(this, "newWorkflowDefinitionSelected", 7);
    this.onNewDefinitionClick = async () => {
      this.newWorkflowDefinitionSelected.emit();
    };
    this.onSearch = async (term) => {
      this.searchTerm = term;
      this.resetPagination();
      await this.loadWorkflowDefinitions();
    };
    this.onDeleteManyClick = async () => {
      if (this.selectedWorkflowDefinitionIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to delete selected workflow definitions?"), {
        actions: [DefaultModalActions.Delete(async () => {
            await this.api.deleteMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
            await this.activityDescriptorManager.refresh();
          }), DefaultModalActions.Cancel()],
        modalType: ModalType.Confirmation
      });
    };
    this.onPublishManyClick = async () => {
      if (this.selectedWorkflowDefinitionIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to publish selected workflow definitions?"), {
        actions: [DefaultModalActions.Publish(async () => {
            await this.api.publishMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
          }), DefaultModalActions.Cancel()],
        modalType: ModalType.Confirmation
      });
    };
    this.onUnpublishManyClick = async () => {
      if (this.selectedWorkflowDefinitionIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to unpublish selected workflow definitions?"), {
        actions: [DefaultModalActions.Unpublish(async () => {
            await this.api.unpublishMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
          }), DefaultModalActions.Cancel()],
        modalType: ModalType.Confirmation
      });
    };
    this.onWorkflowDefinitionClick = async (e, workflowDefinition) => {
      e.preventDefault();
      this.workflowDefinitionSelected.emit(workflowDefinition);
    };
    this.onWorkflowInstancesClick = async (e, workflowDefinition) => {
      e.preventDefault();
      this.workflowInstancesSelected.emit(workflowDefinition);
    };
    this.onPaginated = async (e) => {
      this.currentPage = e.detail.page;
      await this.loadWorkflowDefinitions();
    };
    this.onPageSizeChanged = async (pageSize) => {
      this.currentPageSize = pageSize;
      this.resetPagination();
      await this.loadWorkflowDefinitions();
    };
    this.onOrderByChanged = async (orderBy) => {
      this.orderBy = orderBy;
      await this.loadWorkflowDefinitions();
    };
    this.onLabelChange = async (e) => {
      this.labels = e.detail;
      await this.loadWorkflowDefinitions();
    };
    this.resetPagination = () => {
      this.currentPage = 0;
      this.selectedWorkflowDefinitionIds = [];
    };
    this.getSelectAllState = () => {
      const { items } = this.workflowDefinitions;
      const selectedWorkflowInstanceIds = this.selectedWorkflowDefinitionIds;
      return items.findIndex(item => !selectedWorkflowInstanceIds.includes(item.definitionId)) < 0;
    };
    this.setSelectAllIndeterminateState = () => {
      if (this.selectAllCheckbox) {
        const selectedItems = this.workflowDefinitions.items.filter(item => this.selectedWorkflowDefinitionIds.includes(item.definitionId));
        this.selectAllCheckbox.indeterminate = selectedItems.length != 0 && selectedItems.length != this.workflowDefinitions.items.length;
      }
    };
    this.workflowDefinitions = { items: [], totalCount: 0 };
    this.publishedWorkflowDefinitions = { items: [], totalCount: 0 };
    this.selectedWorkflowDefinitionIds = [];
    this.currentPage = 0;
    this.currentPageSize = WorkflowDefinitionBrowser.DEFAULT_PAGE_SIZE;
    this.orderBy = undefined;
    this.labels = undefined;
    this.selectAllChecked = undefined;
    this.searchTerm = undefined;
    this.api = Container.get(WorkflowDefinitionsApi);
    this.modalDialogService = Container.get(ModalDialogService);
    this.activityDescriptorManager = Container.get(ActivityDescriptorManager);
  }
  async componentWillLoad() {
    const persistedRequest = getRequest();
    if (persistedRequest) {
      this.currentPage = persistedRequest.page;
      this.currentPageSize = persistedRequest.pageSize;
      this.orderBy = persistedRequest.orderBy;
    }
    await this.loadWorkflowDefinitions();
  }
  async onPublishClick(e, workflowDefinition) {
    await this.api.publish(workflowDefinition);
    await this.loadWorkflowDefinitions();
  }
  async onUnPublishClick(e, workflowDefinition) {
    await this.api.retract(workflowDefinition);
    await this.loadWorkflowDefinitions();
  }
  async onDeleteClick(e, workflowDefinition) {
    this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to delete this workflow definition?"), {
      actions: [DefaultModalActions.Delete(async () => {
          await this.api.delete(workflowDefinition);
          await this.loadWorkflowDefinitions();
          await this.activityDescriptorManager.refresh();
        }), DefaultModalActions.Cancel()],
      modalType: ModalType.Confirmation
    });
  }
  async loadWorkflowDefinitions() {
    // TODO: Load only json-based workflow definitions for now.
    // Later, also allow CLR-based workflows to be "edited" (publish / unpublish / position activities / set variables, etc.)
    const materializerName = 'Json';
    const request = {
      searchTerm: this.searchTerm,
      materializerName,
      page: this.currentPage,
      pageSize: this.currentPageSize,
      versionOptions: { isLatest: true },
      orderBy: this.orderBy,
      label: this.labels,
    };
    persistRequest(request);
    const latestWorkflowDefinitions = await this.api.list(request);
    const unpublishedWorkflowDefinitionIds = latestWorkflowDefinitions.items.filter(x => !x.isPublished).map(x => x.definitionId);
    this.publishedWorkflowDefinitions = await this.api.list({
      materializerName,
      definitionIds: unpublishedWorkflowDefinitionIds,
      versionOptions: { isPublished: true },
    });
    this.workflowDefinitions = latestWorkflowDefinitions;
  }
  onWorkflowDefinitionCheckChange(e, workflowDefinition) {
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    if (isChecked)
      this.selectedWorkflowDefinitionIds = [...this.selectedWorkflowDefinitionIds, workflowDefinition.definitionId];
    else
      this.selectedWorkflowDefinitionIds = this.selectedWorkflowDefinitionIds.filter(x => x != workflowDefinition.definitionId);
    this.setSelectAllIndeterminateState();
  }
  onSelectAllCheckChange(e) {
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    this.selectAllChecked = isChecked;
    this.selectedWorkflowDefinitionIds = updateSelectedWorkflowDefinitions(isChecked, this.workflowDefinitions, this.selectedWorkflowDefinitionIds);
  }
  render() {
    const workflowDefinitions = this.workflowDefinitions;
    const publishedWorkflowDefinitions = this.publishedWorkflowDefinitions.items;
    const totalCount = workflowDefinitions.totalCount;
    const filterProps = {
      pageSizeFilter: {
        selectedPageSize: this.currentPageSize,
        onChange: this.onPageSizeChanged,
      },
      orderByFilter: {
        selectedOrderBy: this.orderBy,
        onChange: this.onOrderByChanged,
      },
      labelFilter: {
        selectedLabels: this.labels,
        onSelectedLabelsChanged: this.onLabelChange,
        buttonClass: 'tw-text-gray-500 hover:tw-text-gray-300',
        containerClass: 'tw-mt-1.5',
      },
      onBulkDelete: this.onDeleteManyClick,
      onBulkPublish: this.onPublishManyClick,
      onBulkUnpublish: this.onUnpublishManyClick
    };
    return (h(Host, { class: "tw-block" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, "Workflow Definitions"), h(Search, { onSearch: this.onSearch }), h(Filter, Object.assign({}, filterProps)), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", null, h("input", { type: "checkbox", value: "true", checked: this.getSelectAllState(), onChange: e => this.onSelectAllCheckChange(e), ref: el => (this.selectAllCheckbox = el) })), h("th", null, h("span", { class: "lg:tw-pl-2" }, "Name")), h("th", null, "Instances"), h("th", { class: "tw-align-right" }, "Latest Version"), h("th", { class: "tw-align-right" }, "Published Version"), h("th", null))), h("tbody", null, workflowDefinitions.items.map(workflowDefinition => {
      const latestVersionNumber = workflowDefinition.version;
      const { isPublished } = workflowDefinition;
      const publishedVersion = isPublished
        ? workflowDefinition
        : publishedWorkflowDefinitions.find(x => x.definitionId == workflowDefinition.definitionId);
      const publishedVersionNumber = !!publishedVersion ? publishedVersion.version : '-';
      const isReadonly = workflowDefinition.isReadonly;
      const isSelected = this.selectedWorkflowDefinitionIds.findIndex(x => x === workflowDefinition.definitionId) >= 0;
      let workflowDisplayName = workflowDefinition.name;
      if (!workflowDisplayName || workflowDisplayName.trim().length == 0)
        workflowDisplayName = 'Untitled';
      return (h("tr", null, h("td", null, h("input", { disabled: isReadonly, type: "checkbox", value: workflowDefinition.definitionId, checked: isSelected, onChange: e => this.onWorkflowDefinitionCheckChange(e, workflowDefinition) })), h("td", null, h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, h("a", { onClick: e => this.onWorkflowDefinitionClick(e, workflowDefinition), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, h("span", null, workflowDisplayName)))), h("td", null, h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, h("a", { onClick: e => this.onWorkflowInstancesClick(e, workflowDefinition), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, "Instances"))), h("td", { class: "tw-align-right" }, latestVersionNumber), h("td", { class: "tw-align-right" }, publishedVersionNumber), h("td", { class: "tw-pr-6" }, isReadonly ? "" :
        h("elsa-context-menu", { menuItems: [
            { text: 'Edit', handler: e => this.onWorkflowDefinitionClick(e, workflowDefinition), icon: h(EditIcon, null) },
            isPublished
              ? { text: 'Unpublish', handler: e => this.onUnPublishClick(e, workflowDefinition), icon: h(UnPublishIcon, null) }
              : {
                text: 'Publish',
                handler: e => this.onPublishClick(e, workflowDefinition),
                icon: h(PublishIcon, null),
              },
            { text: 'Delete', handler: e => this.onDeleteClick(e, workflowDefinition), icon: h(DeleteIcon, null) },
          ] }))));
    }))), h("elsa-pager", { page: this.currentPage, pageSize: this.currentPageSize, totalCount: totalCount, onPaginated: this.onPaginated })))));
  }
};
WorkflowDefinitionBrowser.DEFAULT_PAGE_SIZE = 15;
WorkflowDefinitionBrowser.MIN_PAGE_SIZE = 5;
WorkflowDefinitionBrowser.MAX_PAGE_SIZE = 100;
WorkflowDefinitionBrowser.START_PAGE = 0;

export { WorkflowDefinitionBrowser as elsa_workflow_definition_browser };

//# sourceMappingURL=elsa-workflow-definition-browser.entry.js.map