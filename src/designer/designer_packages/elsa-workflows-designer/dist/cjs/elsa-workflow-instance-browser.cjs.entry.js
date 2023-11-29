'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
const utils = require('./utils-c73bd981.js');
const models = require('./models-06a27d45.js');
const orderBy = require('./order-by-2382f0ca.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
const edit = require('./edit-8886065b.js');
const locale = require('./locale-4dbc7596.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./notification-service-99c155e7.js');

const WorkflowIcon = () => index.h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  index.h("rect", { x: "4", y: "4", width: "6", height: "6", rx: "1" }),
  index.h("rect", { x: "14", y: "4", width: "6", height: "6", rx: "1" }),
  index.h("rect", { x: "4", y: "14", width: "6", height: "6", rx: "1" }),
  index.h("rect", { x: "14", y: "14", width: "6", height: "6", rx: "1" }));

const WorkflowStatusIcon = () => index.h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  index.h("circle", { cx: "12", cy: "12", r: "10" }),
  index.h("polygon", { points: "10 8 16 12 10 16 10 8" }));

const Search = ({ onSearch, searchTextPlaceholder }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchTerm = formData.get('searchTerm').toString();
    onSearch(searchTerm);
  };
  const onSearchDebounced = lodash.lodash.debounce(onSearch, 200);
  const onKeyUp = (e) => {
    const term = e.target.value;
    onSearchDebounced(term);
  };
  return index.h("div", { class: "tw-relative tw-z-10 tw-flex-shrink-0 tw-flex tw-h-16 tw-bg-white tw-border-b tw-border-gray-200" },
    index.h("div", { class: "tw-flex-1 tw-px-4 tw-flex tw-justify-between sm:tw-px-6 lg:tw-px-8" },
      index.h("div", { class: "tw-flex-1 tw-flex" },
        index.h("form", { class: "tw-w-full tw-flex md:tw-ml-0", onSubmit: onSubmit },
          index.h("label", { htmlFor: "search_field", class: "tw-sr-only" }, "Search"),
          index.h("div", { class: "tw-relative tw-w-full tw-text-gray-400 focus-within:tw-text-gray-600" },
            index.h("div", { class: "tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pointer-events-none" },
              index.h("svg", { class: "tw-h-5 tw-w-5", fill: "currentColor", viewBox: "0 0 20 20" },
                index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" }))),
            index.h("input", { name: "searchTerm", onKeyUp: onKeyUp, class: "tw-block tw-w-full tw-h-full tw-pl-8 tw-pr-3 tw-py-2 tw-rounded-md tw-text-gray-900 tw-placeholder-cool-gray-500 focus:tw-placeholder-cool-gray-400 sm:tw-text-sm tw-border-0 focus:tw-outline-none focus:tw-ring-0", placeholder: searchTextPlaceholder, type: "search" }))))));
};

const Filter = ({ pageSizeFilter, workflowFilter, statusFilter, subStatusFilter, orderByFilter, resetFilter, onBulkDelete, onBulkCancel, bulkText, bulkDeleteText, bulkCancelText, resetText }) => {
  return index.h("div", { class: "tw-p-8 tw-flex tw-content-end tw-justify-right tw-bg-white tw-space-x-4" },
    index.h("div", { class: "tw-flex-shrink-0" },
      index.h(BulkActions, { onBulkDelete: onBulkDelete, onBulkCancel: onBulkCancel, bulkText: bulkText, bulkDeleteText: bulkDeleteText, bulkCancelText: bulkCancelText })),
    index.h("div", { class: "tw-flex-1" }, "\u00A0"),
    index.h("button", { onClick: resetFilter, type: "button", class: "tw-text-sm tw-text-blue-600 active:tw-text-blue-700 tw-px-3 active:ring tw-ring-blue-500 tw-rounded" }, resetText),
    index.h(PageSizeFilter, Object.assign({}, pageSizeFilter)),
    index.h(WorkflowFilter, Object.assign({}, workflowFilter)),
    index.h(StatusFilter, Object.assign({}, statusFilter)),
    index.h(SubStatusFilter, Object.assign({}, subStatusFilter)),
    index.h(OrderByFilter, Object.assign({}, orderByFilter)));
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
  return index.h("elsa-dropdown-button", { text: bulkText, items: bulkActions, icon: index.h(orderBy.BulkActionsIcon, null), origin: models.DropdownButtonOrigin.TopLeft, theme: "Secondary", onItemSelected: onBulkActionSelected });
};
const PageSizeFilter = ({ selectedPageSize, onChange, pageSizeText }) => {
  const selectedPageSizeText = `${pageSizeText}: ${selectedPageSize}`;
  const pageSizes = [5, 10, 15, 20, 30, 50, 100];
  const items = pageSizes.map(x => {
    const text = "" + x;
    return { text: text, isSelected: x == selectedPageSize, value: x };
  });
  const onPageSizeChanged = (e) => onChange(parseInt(e.detail.value));
  return index.h("elsa-dropdown-button", { text: selectedPageSizeText, items: items, icon: index.h(orderBy.PageSizeIcon, null), origin: models.DropdownButtonOrigin.TopRight, theme: "Secondary", onItemSelected: onPageSizeChanged });
};
const WorkflowFilter = ({ workflows, selectedWorkflowDefinitionId, onChange, workflowText }) => {
  const selectedWorkflow = workflows.find(x => x.definitionId == selectedWorkflowDefinitionId);
  const getWorkflowName = (workflow) => { var _a; return ((_a = workflow === null || workflow === void 0 ? void 0 : workflow.name) === null || _a === void 0 ? void 0 : _a.length) > 0 ? workflow.name : 'Untitled'; };
  const selectedWorkflowText = !selectedWorkflowDefinitionId ? workflowText : getWorkflowName(selectedWorkflow);
  let items = workflows.map(x => ({ text: getWorkflowName(x), value: x.definitionId, isSelected: x.definitionId == selectedWorkflowDefinitionId }));
  const allItem = { text: workflowText, value: null, isSelected: !selectedWorkflowDefinitionId };
  const onWorkflowChanged = (e) => onChange(e.detail.value);
  items = [allItem, ...items];
  return index.h("elsa-dropdown-button", { text: selectedWorkflowText, items: items, icon: index.h(WorkflowIcon, null), origin: models.DropdownButtonOrigin.TopRight, theme: "Secondary", onItemSelected: onWorkflowChanged });
};
const StatusFilter = ({ selectedStatus, onChange }) => {
  const selectedStatusText = !!selectedStatus ? selectedStatus : 'Status';
  const statuses = [null, utils.WorkflowStatus.Running, utils.WorkflowStatus.Finished];
  const statusOptions = statuses.map(x => ({ text: x !== null && x !== void 0 ? x : 'All', isSelected: x == selectedStatus, value: x }));
  const onStatusChanged = (e) => onChange(e.detail.value);
  return index.h("elsa-dropdown-button", { text: selectedStatusText, items: statusOptions, icon: index.h(WorkflowStatusIcon, null), origin: models.DropdownButtonOrigin.TopRight, theme: "Secondary", onItemSelected: onStatusChanged });
};
const SubStatusFilter = ({ selectedStatus, onChange }) => {
  const selectedSubStatusText = !!selectedStatus ? selectedStatus : 'Sub status';
  const subStatuses = [null, utils.WorkflowSubStatus.Executing, utils.WorkflowSubStatus.Suspended, utils.WorkflowSubStatus.Finished, utils.WorkflowSubStatus.Faulted, utils.WorkflowSubStatus.Cancelled];
  const subStatusOptions = subStatuses.map(x => ({ text: x !== null && x !== void 0 ? x : 'All', isSelected: x == selectedStatus, value: x }));
  const onStatusChanged = (e) => onChange(e.detail.value);
  return index.h("elsa-dropdown-button", { text: selectedSubStatusText, items: subStatusOptions, icon: index.h(WorkflowStatusIcon, null), origin: models.DropdownButtonOrigin.TopRight, theme: "Secondary", onItemSelected: onStatusChanged });
};
const OrderByFilter = ({ selectedOrderBy, onChange, orderByText }) => {
  const selectedOrderByText = !!selectedOrderBy ? `${orderByText}: ${selectedOrderBy}` : orderByText;
  const orderByValues = [utils.OrderBy.Finished, utils.OrderBy.Updated, utils.OrderBy.Created];
  const items = orderByValues.map(x => ({ text: x, value: x, isSelected: x == selectedOrderBy }));
  const onOrderByChanged = (e) => onChange(e.detail.value);
  return index.h("elsa-dropdown-button", { text: selectedOrderByText, items: items, icon: index.h(orderBy.OrderByIcon, null), theme: "Secondary", origin: models.DropdownButtonOrigin.TopRight, onItemSelected: onOrderByChanged });
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
statusColorMap[utils.WorkflowStatus.Running] = 'bg-rose-600';
statusColorMap[utils.WorkflowStatus.Finished] = 'tw-bg-green-600';
subStatusColorMap[utils.WorkflowSubStatus.Executing] = 'bg-rose-600';
subStatusColorMap[utils.WorkflowSubStatus.Suspended] = 'tw-bg-blue-600';
subStatusColorMap[utils.WorkflowSubStatus.Finished] = 'tw-bg-green-600';
subStatusColorMap[utils.WorkflowSubStatus.Faulted] = 'tw-bg-red-600';
subStatusColorMap[utils.WorkflowSubStatus.Compensating] = 'bg-orange-600';
subStatusColorMap[utils.WorkflowSubStatus.Cancelled] = 'bg-gray-900';
function getSubStatusColor(status) {
  var _a;
  return (_a = subStatusColorMap[status]) !== null && _a !== void 0 ? _a : statusColorMap[utils.WorkflowSubStatus.Suspended];
}
function updateSelectedWorkflowInstances(isChecked, workflowInstances, selectedWorkflowInstanceIds) {
  const currentItems = workflowInstances.items.map(x => x.id);
  return isChecked
    ? selectedWorkflowInstanceIds.concat(currentItems.filter(item => !selectedWorkflowInstanceIds.includes(item)))
    : selectedWorkflowInstanceIds.filter(item => !currentItems.includes(item));
}

const WorkflowInstanceBrowser = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.workflowInstanceSelected = index.createEvent(this, "workflowInstanceSelected", 7);
    this.publishedOrLatestWorkflows = [];
    this.onDeleteManyClick = async () => {
      if (this.selectedWorkflowInstanceIds.length == 0)
        return;
      this.modalDialogService.show(() => utils.DefaultContents.Warning("Are you sure you want to delete selected workflow instances?"), {
        actions: [utils.DefaultModalActions.Delete(async () => {
            await this.workflowInstancesApi.deleteMany({ workflowInstanceIds: this.selectedWorkflowInstanceIds });
            await this.loadWorkflowInstances();
          }), utils.DefaultModalActions.Cancel()],
        modalType: utils.ModalType.Confirmation
      });
    };
    this.onCancelManyClick = async () => {
      if (this.selectedWorkflowInstanceIds.length == 0)
        return;
      this.modalDialogService.show(() => utils.DefaultContents.Warning("Are you sure you want to cancel selected workflow instances?"), {
        actions: [utils.DefaultModalActions.Yes(async () => {
            await this.workflowInstancesApi.cancelMany({ workflowInstanceIds: this.selectedWorkflowInstanceIds });
            await this.loadWorkflowInstances();
          }), utils.DefaultModalActions.Cancel()],
        modalType: utils.ModalType.Confirmation
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
      const groups = lodash.lodash.groupBy(workflows, 'definitionId');
      return lodash.lodash.map(groups, x => lodash.lodash.first(lodash.lodash.orderBy(x, 'version', 'desc')));
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
    this.workflowInstancesApi = utils.Container.get(utils.WorkflowInstancesApi);
    this.workflowDefinitionsApi = utils.Container.get(utils.WorkflowDefinitionsApi);
    this.modalDialogService = utils.Container.get(utils.ModalDialogService);
  }
  async componentWillLoad() {
    this.strings = await locale.getLocaleComponentStrings(this.element);
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
    return (index.h(index.Host, { class: "tw-block" }, index.h("div", { class: "tw-pt-4" }, index.h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, this.strings.name), index.h(Search, { onSearch: this.onSearch, searchTextPlaceholder: this.strings.searchTextPlaceholder }), index.h(Filter, Object.assign({}, filterProps)), index.h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, index.h("table", { class: "default-table" }, index.h("thead", null, index.h("tr", null, index.h("th", null, index.h("input", { type: "checkbox", value: "true", checked: this.getSelectAllState(), onChange: e => this.onSelectAllCheckChange(e), ref: el => this.selectAllCheckbox = el })), index.h("th", null, index.h("span", { class: "lg:tw-pl-2" }, this.strings.id)), index.h("th", null, this.strings.correlation), index.h("th", null, this.strings.worfklow), index.h("th", { class: "tw-align-right" }, this.strings.version), index.h("th", null, this.strings.workflowName), index.h("th", null, this.strings.status), index.h("th", null, this.strings.created), index.h("th", null, this.strings.finished), index.h("th", null))), index.h("tbody", { class: "tw-bg-white tw-divide-y tw-divide-gray-100" }, workflowInstances.items.map(workflowInstance => {
      const statusColor = getSubStatusColor(workflowInstance.subStatus);
      const isSelected = this.selectedWorkflowInstanceIds.findIndex(x => x === workflowInstance.id) >= 0;
      const workflow = publishedOrLatestWorkflows.find(x => x.definitionId == workflowInstance.definitionId);
      const workflowName = !!workflow ? (workflow.name || 'Untitled') : '(Definition not found)';
      return (index.h("tr", null, index.h("td", null, index.h("input", { type: "checkbox", value: workflowInstance.id, checked: isSelected, onChange: e => this.onWorkflowInstanceCheckChange(e, workflowInstance) })), index.h("td", null, index.h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, index.h("a", { onClick: e => this.onWorkflowInstanceClick(e, workflowInstance), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, index.h("span", null, workflowInstance.id)))), index.h("td", null, workflowInstance.correlationId), index.h("td", null, workflowName), index.h("td", { class: "tw-align-right" }, workflowInstance.version), index.h("td", null, workflowInstance.name), index.h("td", null, index.h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, index.h("div", { class: `tw-flex-shrink-0 tw-w-2.5 tw-h-2.5 tw-rounded-full ${statusColor}` }), index.h("span", null, workflowInstance.status))), index.h("td", null, utils.formatTimestamp(workflowInstance.createdAt, '-')), index.h("td", null, utils.formatTimestamp(workflowInstance.finishedAt, '-')), index.h("td", { class: "tw-pr-6" }, index.h("elsa-context-menu", { menuItems: [
          { text: 'Edit', handler: e => this.onWorkflowInstanceClick(e, workflowInstance), icon: index.h(edit.EditIcon, null) },
          { text: 'Delete', handler: e => this.onDeleteClick(e, workflowInstance), icon: index.h(edit.DeleteIcon, null) }
        ] }))));
    }))), index.h("elsa-pager", { page: this.currentPage, pageSize: this.currentPageSize, totalCount: totalCount, onPaginated: this.onPaginated })))));
  }
  async loadWorkflowInstances() {
    const request = {
      searchTerm: this.searchTerm,
      definitionId: this.selectedWorkflowDefinitionId,
      status: this.selectedStatus,
      subStatus: this.selectedSubStatus,
      orderBy: this.orderBy,
      orderDirection: utils.OrderDirection.Descending,
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
  get element() { return index.getElement(this); }
};
WorkflowInstanceBrowser.DEFAULT_PAGE_SIZE = 15;
WorkflowInstanceBrowser.MIN_PAGE_SIZE = 5;
WorkflowInstanceBrowser.MAX_PAGE_SIZE = 100;
WorkflowInstanceBrowser.START_PAGE = 0;

exports.elsa_workflow_instance_browser = WorkflowInstanceBrowser;

//# sourceMappingURL=elsa-workflow-instance-browser.cjs.entry.js.map