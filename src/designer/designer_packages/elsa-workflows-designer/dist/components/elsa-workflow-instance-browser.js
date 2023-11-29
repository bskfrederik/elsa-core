import { h, proxyCustomElement, HTMLElement, createEvent, Host } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { W as WorkflowStatus, K as WorkflowSubStatus, O as OrderBy, aO as DefaultContents, C as Container, a0 as WorkflowInstancesApi, Y as WorkflowDefinitionsApi, aN as ModalDialogService, f as formatTimestamp, L as OrderDirection } from './utils.js';
import { a as DropdownButtonOrigin, d as defineCustomElement$3 } from './dropdown-button.js';
import { B as BulkActionsIcon, P as PageSizeIcon, O as OrderByIcon } from './order-by.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { D as DeleteIcon } from './delete.js';
import { E as EditIcon } from './edit.js';
import { D as DefaultModalActions, M as ModalType } from './modal-type.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$4 } from './context-menu.js';
import { d as defineCustomElement$2 } from './pager.js';

const WorkflowIcon = () => h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("rect", { x: "4", y: "4", width: "6", height: "6", rx: "1" }),
  h("rect", { x: "14", y: "4", width: "6", height: "6", rx: "1" }),
  h("rect", { x: "4", y: "14", width: "6", height: "6", rx: "1" }),
  h("rect", { x: "14", y: "14", width: "6", height: "6", rx: "1" }));

const WorkflowStatusIcon = () => h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("circle", { cx: "12", cy: "12", r: "10" }),
  h("polygon", { points: "10 8 16 12 10 16 10 8" }));

const Search = ({ onSearch, searchTextPlaceholder }) => {
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
            h("input", { name: "searchTerm", onKeyUp: onKeyUp, class: "tw-block tw-w-full tw-h-full tw-pl-8 tw-pr-3 tw-py-2 tw-rounded-md tw-text-gray-900 tw-placeholder-cool-gray-500 focus:tw-placeholder-cool-gray-400 sm:tw-text-sm tw-border-0 focus:tw-outline-none focus:tw-ring-0", placeholder: searchTextPlaceholder, type: "search" }))))));
};

const Filter = ({ pageSizeFilter, workflowFilter, statusFilter, subStatusFilter, orderByFilter, resetFilter, onBulkDelete, onBulkCancel, bulkText, bulkDeleteText, bulkCancelText, resetText }) => {
  return h("div", { class: "tw-p-8 tw-flex tw-content-end tw-justify-right tw-bg-white tw-space-x-4" },
    h("div", { class: "tw-flex-shrink-0" },
      h(BulkActions, { onBulkDelete: onBulkDelete, onBulkCancel: onBulkCancel, bulkText: bulkText, bulkDeleteText: bulkDeleteText, bulkCancelText: bulkCancelText })),
    h("div", { class: "tw-flex-1" }, "\u00A0"),
    h("button", { onClick: resetFilter, type: "button", class: "tw-text-sm tw-text-blue-600 active:tw-text-blue-700 tw-px-3 active:ring tw-ring-blue-500 tw-rounded" }, resetText),
    h(PageSizeFilter, Object.assign({}, pageSizeFilter)),
    h(WorkflowFilter, Object.assign({}, workflowFilter)),
    h(StatusFilter, Object.assign({}, statusFilter)),
    h(SubStatusFilter, Object.assign({}, subStatusFilter)),
    h(OrderByFilter, Object.assign({}, orderByFilter)));
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

const key = 'LS/wfInstanceBrowser';
function getRequest() {
  var json = localStorage.getItem(key);
  if (!json)
    return;
  return JSON.parse(json);
}
function persistRequest(request) {
  localStorage.setItem(key, JSON.stringify(request));
}

const statusColorMap = {};
const subStatusColorMap = {};
statusColorMap[WorkflowStatus.Running] = 'bg-rose-600';
statusColorMap[WorkflowStatus.Finished] = 'tw-bg-green-600';
subStatusColorMap[WorkflowSubStatus.Executing] = 'bg-rose-600';
subStatusColorMap[WorkflowSubStatus.Suspended] = 'tw-bg-blue-600';
subStatusColorMap[WorkflowSubStatus.Finished] = 'tw-bg-green-600';
subStatusColorMap[WorkflowSubStatus.Faulted] = 'tw-bg-red-600';
subStatusColorMap[WorkflowSubStatus.Compensating] = 'bg-orange-600';
subStatusColorMap[WorkflowSubStatus.Cancelled] = 'bg-gray-900';
function getSubStatusColor(status) {
  var _a;
  return (_a = subStatusColorMap[status]) !== null && _a !== void 0 ? _a : statusColorMap[WorkflowSubStatus.Suspended];
}
function updateSelectedWorkflowInstances(isChecked, workflowInstances, selectedWorkflowInstanceIds) {
  const currentItems = workflowInstances.items.map(x => x.id);
  return isChecked
    ? selectedWorkflowInstanceIds.concat(currentItems.filter(item => !selectedWorkflowInstanceIds.includes(item)))
    : selectedWorkflowInstanceIds.filter(item => !currentItems.includes(item));
}

const WorkflowInstanceBrowser = /*@__PURE__*/ proxyCustomElement(class WorkflowInstanceBrowser extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.workflowInstanceSelected = createEvent(this, "workflowInstanceSelected", 7);
    this.publishedOrLatestWorkflows = [];
    this.onDeleteManyClick = async () => {
      if (this.selectedWorkflowInstanceIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to delete selected workflow instances?"), {
        actions: [DefaultModalActions.Delete(async () => {
            await this.workflowInstancesApi.deleteMany({ workflowInstanceIds: this.selectedWorkflowInstanceIds });
            await this.loadWorkflowInstances();
          }), DefaultModalActions.Cancel()],
        modalType: ModalType.Confirmation
      });
    };
    this.onCancelManyClick = async () => {
      if (this.selectedWorkflowInstanceIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to cancel selected workflow instances?"), {
        actions: [DefaultModalActions.Yes(async () => {
            await this.workflowInstancesApi.cancelMany({ workflowInstanceIds: this.selectedWorkflowInstanceIds });
            await this.loadWorkflowInstances();
          }), DefaultModalActions.Cancel()],
        modalType: ModalType.Confirmation
      });
    };
    this.resetPagination = () => {
      this.currentPage = 0;
      this.selectedWorkflowInstanceIds = [];
    };
    this.loadWorkflowDefinitions = async () => {
      const versionOptions = { allVersions: true };
      const workflows = await this.workflowDefinitionsApi.list({ versionOptions });
      this.publishedOrLatestWorkflows = this.selectLatestWorkflows(workflows.items);
    };
    this.getSelectAllState = () => {
      const { items } = this.workflowInstances;
      const selectedWorkflowInstanceIds = this.selectedWorkflowInstanceIds;
      return items.findIndex(item => !selectedWorkflowInstanceIds.includes(item.id)) < 0;
    };
    this.setSelectAllIndeterminateState = () => {
      if (this.selectAllCheckbox) {
        const selectedItems = this.workflowInstances.items.filter(item => this.selectedWorkflowInstanceIds.includes(item.id));
        this.selectAllCheckbox.indeterminate = selectedItems.length != 0 && selectedItems.length != this.workflowInstances.items.length;
      }
    };
    this.selectLatestWorkflows = (workflows) => {
      const groups = lodash.groupBy(workflows, 'definitionId');
      return lodash.map(groups, x => lodash.first(lodash.orderBy(x, 'version', 'desc')));
    };
    this.onSearch = async (term) => {
      this.searchTerm = term;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onPageSizeChanged = async (pageSize) => {
      this.currentPageSize = pageSize;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onWorkflowChanged = async (definitionId) => {
      this.selectedWorkflowDefinitionId = definitionId;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onWorkflowStatusChanged = async (status) => {
      this.selectedStatus = status;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onWorkflowSubStatusChanged = async (status) => {
      this.selectedSubStatus = status;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onOrderByChanged = async (orderBy) => {
      this.orderBy = orderBy;
      await this.loadWorkflowInstances();
    };
    this.onWorkflowInstanceClick = async (e, workflowInstance) => {
      e.preventDefault();
      this.workflowInstanceSelected.emit(workflowInstance);
    };
    this.onPaginated = async (e) => {
      this.currentPage = e.detail.page;
      await this.loadWorkflowInstances();
    };
    this.workflowDefinition = undefined;
    this.workflowInstances = { items: [], totalCount: 0 };
    this.workflows = [];
    this.selectAllChecked = undefined;
    this.selectedWorkflowInstanceIds = [];
    this.searchTerm = undefined;
    this.currentPage = 0;
    this.currentPageSize = WorkflowInstanceBrowser.DEFAULT_PAGE_SIZE;
    this.selectedWorkflowDefinitionId = undefined;
    this.selectedStatus = undefined;
    this.selectedSubStatus = undefined;
    this.orderBy = undefined;
    this.workflowInstancesApi = Container.get(WorkflowInstancesApi);
    this.workflowDefinitionsApi = Container.get(WorkflowDefinitionsApi);
    this.modalDialogService = Container.get(ModalDialogService);
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    var persistedRequest = getRequest();
    if (persistedRequest) {
      // TODO: Persist search term, need to bind the value to the input
      //this.searchTerm = persistedRequest.searchTerm
      this.currentPage = persistedRequest.page;
      this.currentPageSize = persistedRequest.pageSize;
      this.orderBy = persistedRequest.orderBy;
      this.selectedWorkflowDefinitionId = persistedRequest.definitionId;
      this.selectedStatus = persistedRequest.status;
      this.selectedSubStatus = persistedRequest.subStatus;
    }
    if (this.workflowDefinition != null)
      this.selectedWorkflowDefinitionId = this.workflowDefinition.definitionId;
    await this.loadWorkflowDefinitions();
    await this.loadWorkflowInstances();
  }
  render() {
    const publishedOrLatestWorkflows = this.publishedOrLatestWorkflows;
    const workflowInstances = this.workflowInstances;
    const totalCount = workflowInstances.totalCount;
    const filterProps = {
      resetText: this.strings.resetText,
      bulkText: this.strings.bulkText,
      bulkDeleteText: this.strings.bulkDeleteText,
      bulkCancelText: this.strings.bulkCancelText,
      pageSizeFilter: {
        selectedPageSize: this.currentPageSize,
        onChange: this.onPageSizeChanged,
        pageSizeText: this.strings.pageSizes,
      },
      orderByFilter: {
        selectedOrderBy: this.orderBy,
        onChange: this.onOrderByChanged,
        orderByText: this.strings.orderBy,
      },
      statusFilter: {
        selectedStatus: this.selectedStatus,
        onChange: this.onWorkflowStatusChanged
      },
      subStatusFilter: {
        selectedStatus: this.selectedSubStatus,
        onChange: this.onWorkflowSubStatusChanged
      },
      workflowFilter: {
        workflows: publishedOrLatestWorkflows,
        selectedWorkflowDefinitionId: this.selectedWorkflowDefinitionId,
        onChange: this.onWorkflowChanged,
        workflowText: this.strings.allWorkflows
      },
      resetFilter: async () => {
        this.resetPagination();
        this.currentPageSize = WorkflowInstanceBrowser.DEFAULT_PAGE_SIZE;
        this.selectedStatus = undefined;
        this.selectedSubStatus = undefined;
        this.orderBy = undefined;
        this.selectedWorkflowDefinitionId = undefined;
        await this.loadWorkflowInstances();
      },
      onBulkDelete: this.onDeleteManyClick,
      onBulkCancel: this.onCancelManyClick
    };
    return (h(Host, { class: "tw-block" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, this.strings.name), h(Search, { onSearch: this.onSearch, searchTextPlaceholder: this.strings.searchTextPlaceholder }), h(Filter, Object.assign({}, filterProps)), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", null, h("input", { type: "checkbox", value: "true", checked: this.getSelectAllState(), onChange: e => this.onSelectAllCheckChange(e), ref: el => this.selectAllCheckbox = el })), h("th", null, h("span", { class: "lg:tw-pl-2" }, this.strings.id)), h("th", null, this.strings.correlation), h("th", null, this.strings.worfklow), h("th", { class: "tw-align-right" }, this.strings.version), h("th", null, this.strings.workflowName), h("th", null, this.strings.status), h("th", null, this.strings.created), h("th", null, this.strings.finished), h("th", null))), h("tbody", { class: "tw-bg-white tw-divide-y tw-divide-gray-100" }, workflowInstances.items.map(workflowInstance => {
      const statusColor = getSubStatusColor(workflowInstance.subStatus);
      const isSelected = this.selectedWorkflowInstanceIds.findIndex(x => x === workflowInstance.id) >= 0;
      const workflow = publishedOrLatestWorkflows.find(x => x.definitionId == workflowInstance.definitionId);
      const workflowName = !!workflow ? (workflow.name || 'Untitled') : '(Definition not found)';
      return (h("tr", null, h("td", null, h("input", { type: "checkbox", value: workflowInstance.id, checked: isSelected, onChange: e => this.onWorkflowInstanceCheckChange(e, workflowInstance) })), h("td", null, h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, h("a", { onClick: e => this.onWorkflowInstanceClick(e, workflowInstance), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, h("span", null, workflowInstance.id)))), h("td", null, workflowInstance.correlationId), h("td", null, workflowName), h("td", { class: "tw-align-right" }, workflowInstance.version), h("td", null, workflowInstance.name), h("td", null, h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, h("div", { class: `tw-flex-shrink-0 tw-w-2.5 tw-h-2.5 tw-rounded-full ${statusColor}` }), h("span", null, workflowInstance.status))), h("td", null, formatTimestamp(workflowInstance.createdAt, '-')), h("td", null, formatTimestamp(workflowInstance.finishedAt, '-')), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
          { text: 'Edit', handler: e => this.onWorkflowInstanceClick(e, workflowInstance), icon: h(EditIcon, null) },
          { text: 'Delete', handler: e => this.onDeleteClick(e, workflowInstance), icon: h(DeleteIcon, null) }
        ] }))));
    }))), h("elsa-pager", { page: this.currentPage, pageSize: this.currentPageSize, totalCount: totalCount, onPaginated: this.onPaginated })))));
  }
  async loadWorkflowInstances() {
    const request = {
      searchTerm: this.searchTerm,
      definitionId: this.selectedWorkflowDefinitionId,
      status: this.selectedStatus,
      subStatus: this.selectedSubStatus,
      orderBy: this.orderBy,
      orderDirection: OrderDirection.Descending,
      page: this.currentPage,
      pageSize: this.currentPageSize
    };
    persistRequest(request);
    this.workflowInstances = await this.workflowInstancesApi.list(request);
  }
  async onDeleteClick(e, workflowInstance) {
    // const result = await this.confirmDialog.show(t('DeleteConfirmationModel.Title'), t('DeleteConfirmationModel.Message'));
    //
    // if (!result)
    //   return;
    //
    await this.workflowInstancesApi.delete(workflowInstance);
    await this.loadWorkflowInstances();
  }
  onSelectAllCheckChange(e) {
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    this.selectAllChecked = isChecked;
    this.selectedWorkflowInstanceIds = updateSelectedWorkflowInstances(isChecked, this.workflowInstances, this.selectedWorkflowInstanceIds);
  }
  onWorkflowInstanceCheckChange(e, workflowInstance) {
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    if (isChecked)
      this.selectedWorkflowInstanceIds = [...this.selectedWorkflowInstanceIds, workflowInstance.id];
    else
      this.selectedWorkflowInstanceIds = this.selectedWorkflowInstanceIds.filter(x => x != workflowInstance.id);
    this.setSelectAllIndeterminateState();
  }
  get element() { return this; }
}, [0, "elsa-workflow-instance-browser", {
    "workflowDefinition": [16],
    "workflowInstances": [32],
    "workflows": [32],
    "selectAllChecked": [32],
    "selectedWorkflowInstanceIds": [32],
    "searchTerm": [32],
    "currentPage": [32],
    "currentPageSize": [32],
    "selectedWorkflowDefinitionId": [32],
    "selectedStatus": [32],
    "selectedSubStatus": [32],
    "orderBy": [32]
  }]);
WorkflowInstanceBrowser.DEFAULT_PAGE_SIZE = 15;
WorkflowInstanceBrowser.MIN_PAGE_SIZE = 5;
WorkflowInstanceBrowser.MAX_PAGE_SIZE = 100;
WorkflowInstanceBrowser.START_PAGE = 0;
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-instance-browser", "elsa-context-menu", "elsa-dropdown-button", "elsa-pager"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-instance-browser":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkflowInstanceBrowser);
      }
      break;
    case "elsa-context-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "elsa-dropdown-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "elsa-pager":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaWorkflowInstanceBrowser = WorkflowInstanceBrowser;
const defineCustomElement = defineCustomElement$1;

export { ElsaWorkflowInstanceBrowser, defineCustomElement };

//# sourceMappingURL=elsa-workflow-instance-browser.js.map