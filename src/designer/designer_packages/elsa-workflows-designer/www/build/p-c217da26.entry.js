import{h as t,r as e,c as s,H as i,a as n}from"./p-a7a3baa1.js";import{l}from"./p-e71312f9.js";import{W as o,K as a,O as c,aa as r,ab as h,a3 as w,C as d,a0 as u,Y as f,ac as x,f as g,L as p}from"./p-691e5295.js";import{D as m}from"./p-e1532f4a.js";import{B as b,P as y,O as k}from"./p-c63782c8.js";import"./p-219f806a.js";import"./p-b6964c5d.js";import{E as v,D as S}from"./p-2e503831.js";import{g as C}from"./p-e754efd8.js";import"./p-72dc819a.js";import"./p-144a434e.js";import"./p-ddecd487.js";const T=()=>t("svg",{class:"tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},t("path",{stroke:"none",d:"M0 0h24v24H0z"}),t("rect",{x:"4",y:"4",width:"6",height:"6",rx:"1"}),t("rect",{x:"14",y:"4",width:"6",height:"6",rx:"1"}),t("rect",{x:"4",y:"14",width:"6",height:"6",rx:"1"}),t("rect",{x:"14",y:"14",width:"6",height:"6",rx:"1"}));const j=()=>t("svg",{class:"tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},t("circle",{cx:"12",cy:"12",r:"10"}),t("polygon",{points:"10 8 16 12 10 16 10 8"}));const B=({onSearch:e,searchTextPlaceholder:s})=>{const i=t=>{t.preventDefault();const s=t.target;const i=new FormData(s);const n=i.get("searchTerm").toString();e(n)};const n=l.debounce(e,200);const o=t=>{const e=t.target.value;n(e)};return t("div",{class:"tw-relative tw-z-10 tw-flex-shrink-0 tw-flex tw-h-16 tw-bg-white tw-border-b tw-border-gray-200"},t("div",{class:"tw-flex-1 tw-px-4 tw-flex tw-justify-between sm:tw-px-6 lg:tw-px-8"},t("div",{class:"tw-flex-1 tw-flex"},t("form",{class:"tw-w-full tw-flex md:tw-ml-0",onSubmit:i},t("label",{htmlFor:"search_field",class:"tw-sr-only"},"Search"),t("div",{class:"tw-relative tw-w-full tw-text-gray-400 focus-within:tw-text-gray-600"},t("div",{class:"tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pointer-events-none"},t("svg",{class:"tw-h-5 tw-w-5",fill:"currentColor",viewBox:"0 0 20 20"},t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"}))),t("input",{name:"searchTerm",onKeyUp:o,class:"tw-block tw-w-full tw-h-full tw-pl-8 tw-pr-3 tw-py-2 tw-rounded-md tw-text-gray-900 tw-placeholder-cool-gray-500 focus:tw-placeholder-cool-gray-400 sm:tw-text-sm tw-border-0 focus:tw-outline-none focus:tw-ring-0",placeholder:s,type:"search"}))))))};const I=({pageSizeFilter:e,workflowFilter:s,statusFilter:i,subStatusFilter:n,orderByFilter:l,resetFilter:o,onBulkDelete:a,onBulkCancel:c,bulkText:r,bulkDeleteText:h,bulkCancelText:w,resetText:d})=>t("div",{class:"tw-p-8 tw-flex tw-content-end tw-justify-right tw-bg-white tw-space-x-4"},t("div",{class:"tw-flex-shrink-0"},t(D,{onBulkDelete:a,onBulkCancel:c,bulkText:r,bulkDeleteText:h,bulkCancelText:w})),t("div",{class:"tw-flex-1"}," "),t("button",{onClick:o,type:"button",class:"tw-text-sm tw-text-blue-600 active:tw-text-blue-700 tw-px-3 active:ring tw-ring-blue-500 tw-rounded"},d),t(F,Object.assign({},e)),t(O,Object.assign({},s)),t(z,Object.assign({},i)),t(A,Object.assign({},n)),t(P,Object.assign({},l)));const D=({onBulkDelete:e,onBulkCancel:s,bulkText:i,bulkDeleteText:n,bulkCancelText:l})=>{const o=[{text:n,name:"Delete"},{text:l,name:"Cancel"}];const a=t=>{const i=t.detail;switch(i.name){case"Delete":e();break;case"Cancel":s();break;default:i.handler()}};return t("elsa-dropdown-button",{text:i,items:o,icon:t(b,null),origin:m.TopLeft,theme:"Secondary",onItemSelected:a})};const F=({selectedPageSize:e,onChange:s,pageSizeText:i})=>{const n=`${i}: ${e}`;const l=[5,10,15,20,30,50,100];const o=l.map((t=>{const s=""+t;return{text:s,isSelected:t==e,value:t}}));const a=t=>s(parseInt(t.detail.value));return t("elsa-dropdown-button",{text:n,items:o,icon:t(y,null),origin:m.TopRight,theme:"Secondary",onItemSelected:a})};const O=({workflows:e,selectedWorkflowDefinitionId:s,onChange:i,workflowText:n})=>{const l=e.find((t=>t.definitionId==s));const o=t=>{var e;return((e=t===null||t===void 0?void 0:t.name)===null||e===void 0?void 0:e.length)>0?t.name:"Untitled"};const a=!s?n:o(l);let c=e.map((t=>({text:o(t),value:t.definitionId,isSelected:t.definitionId==s})));const r={text:n,value:null,isSelected:!s};const h=t=>i(t.detail.value);c=[r,...c];return t("elsa-dropdown-button",{text:a,items:c,icon:t(T,null),origin:m.TopRight,theme:"Secondary",onItemSelected:h})};const z=({selectedStatus:e,onChange:s})=>{const i=!!e?e:"Status";const n=[null,o.Running,o.Finished];const l=n.map((t=>({text:t!==null&&t!==void 0?t:"All",isSelected:t==e,value:t})));const a=t=>s(t.detail.value);return t("elsa-dropdown-button",{text:i,items:l,icon:t(j,null),origin:m.TopRight,theme:"Secondary",onItemSelected:a})};const A=({selectedStatus:e,onChange:s})=>{const i=!!e?e:"Sub status";const n=[null,a.Executing,a.Suspended,a.Finished,a.Faulted,a.Cancelled];const l=n.map((t=>({text:t!==null&&t!==void 0?t:"All",isSelected:t==e,value:t})));const o=t=>s(t.detail.value);return t("elsa-dropdown-button",{text:i,items:l,icon:t(j,null),origin:m.TopRight,theme:"Secondary",onItemSelected:o})};const P=({selectedOrderBy:e,onChange:s,orderByText:i})=>{const n=!!e?`${i}: ${e}`:i;const l=[c.Finished,c.Updated,c.Created];const o=l.map((t=>({text:t,value:t,isSelected:t==e})));const a=t=>s(t.detail.value);return t("elsa-dropdown-button",{text:n,items:o,icon:t(k,null),theme:"Secondary",origin:m.TopRight,onItemSelected:a})};const W="LS/wfInstanceBrowser";function $(){var t=localStorage.getItem(W);if(!t)return;return JSON.parse(t)}function _(t){localStorage.setItem(W,JSON.stringify(t))}const L={};const M={};L[o.Running]="bg-rose-600";L[o.Finished]="tw-bg-green-600";M[a.Executing]="bg-rose-600";M[a.Suspended]="tw-bg-blue-600";M[a.Finished]="tw-bg-green-600";M[a.Faulted]="tw-bg-red-600";M[a.Compensating]="bg-orange-600";M[a.Cancelled]="bg-gray-900";function U(t){var e;return(e=M[t])!==null&&e!==void 0?e:L[a.Suspended]}function E(t,e,s){const i=e.items.map((t=>t.id));return t?s.concat(i.filter((t=>!s.includes(t)))):s.filter((t=>!i.includes(t)))}const H=class{constructor(t){e(this,t);this.workflowInstanceSelected=s(this,"workflowInstanceSelected",7);this.publishedOrLatestWorkflows=[];this.onDeleteManyClick=async()=>{if(this.selectedWorkflowInstanceIds.length==0)return;this.modalDialogService.show((()=>r.Warning("Are you sure you want to delete selected workflow instances?")),{actions:[h.Delete((async()=>{await this.workflowInstancesApi.deleteMany({workflowInstanceIds:this.selectedWorkflowInstanceIds});await this.loadWorkflowInstances()})),h.Cancel()],modalType:w.Confirmation})};this.onCancelManyClick=async()=>{if(this.selectedWorkflowInstanceIds.length==0)return;this.modalDialogService.show((()=>r.Warning("Are you sure you want to cancel selected workflow instances?")),{actions:[h.Yes((async()=>{await this.workflowInstancesApi.cancelMany({workflowInstanceIds:this.selectedWorkflowInstanceIds});await this.loadWorkflowInstances()})),h.Cancel()],modalType:w.Confirmation})};this.resetPagination=()=>{this.currentPage=0;this.selectedWorkflowInstanceIds=[]};this.loadWorkflowDefinitions=async()=>{const t={allVersions:true};const e=await this.workflowDefinitionsApi.list({versionOptions:t});this.publishedOrLatestWorkflows=this.selectLatestWorkflows(e.items)};this.getSelectAllState=()=>{const{items:t}=this.workflowInstances;const e=this.selectedWorkflowInstanceIds;return t.findIndex((t=>!e.includes(t.id)))<0};this.setSelectAllIndeterminateState=()=>{if(this.selectAllCheckbox){const t=this.workflowInstances.items.filter((t=>this.selectedWorkflowInstanceIds.includes(t.id)));this.selectAllCheckbox.indeterminate=t.length!=0&&t.length!=this.workflowInstances.items.length}};this.selectLatestWorkflows=t=>{const e=l.groupBy(t,"definitionId");return l.map(e,(t=>l.first(l.orderBy(t,"version","desc"))))};this.onSearch=async t=>{this.searchTerm=t;this.resetPagination();await this.loadWorkflowInstances()};this.onPageSizeChanged=async t=>{this.currentPageSize=t;this.resetPagination();await this.loadWorkflowInstances()};this.onWorkflowChanged=async t=>{this.selectedWorkflowDefinitionId=t;this.resetPagination();await this.loadWorkflowInstances()};this.onWorkflowStatusChanged=async t=>{this.selectedStatus=t;this.resetPagination();await this.loadWorkflowInstances()};this.onWorkflowSubStatusChanged=async t=>{this.selectedSubStatus=t;this.resetPagination();await this.loadWorkflowInstances()};this.onOrderByChanged=async t=>{this.orderBy=t;await this.loadWorkflowInstances()};this.onWorkflowInstanceClick=async(t,e)=>{t.preventDefault();this.workflowInstanceSelected.emit(e)};this.onPaginated=async t=>{this.currentPage=t.detail.page;await this.loadWorkflowInstances()};this.workflowDefinition=undefined;this.workflowInstances={items:[],totalCount:0};this.workflows=[];this.selectAllChecked=undefined;this.selectedWorkflowInstanceIds=[];this.searchTerm=undefined;this.currentPage=0;this.currentPageSize=H.DEFAULT_PAGE_SIZE;this.selectedWorkflowDefinitionId=undefined;this.selectedStatus=undefined;this.selectedSubStatus=undefined;this.orderBy=undefined;this.workflowInstancesApi=d.get(u);this.workflowDefinitionsApi=d.get(f);this.modalDialogService=d.get(x)}async componentWillLoad(){this.strings=await C(this.element);var t=$();if(t){this.currentPage=t.page;this.currentPageSize=t.pageSize;this.orderBy=t.orderBy;this.selectedWorkflowDefinitionId=t.definitionId;this.selectedStatus=t.status;this.selectedSubStatus=t.subStatus}if(this.workflowDefinition!=null)this.selectedWorkflowDefinitionId=this.workflowDefinition.definitionId;await this.loadWorkflowDefinitions();await this.loadWorkflowInstances()}render(){const e=this.publishedOrLatestWorkflows;const s=this.workflowInstances;const n=s.totalCount;const l={resetText:this.strings.resetText,bulkText:this.strings.bulkText,bulkDeleteText:this.strings.bulkDeleteText,bulkCancelText:this.strings.bulkCancelText,pageSizeFilter:{selectedPageSize:this.currentPageSize,onChange:this.onPageSizeChanged,pageSizeText:this.strings.pageSizes},orderByFilter:{selectedOrderBy:this.orderBy,onChange:this.onOrderByChanged,orderByText:this.strings.orderBy},statusFilter:{selectedStatus:this.selectedStatus,onChange:this.onWorkflowStatusChanged},subStatusFilter:{selectedStatus:this.selectedSubStatus,onChange:this.onWorkflowSubStatusChanged},workflowFilter:{workflows:e,selectedWorkflowDefinitionId:this.selectedWorkflowDefinitionId,onChange:this.onWorkflowChanged,workflowText:this.strings.allWorkflows},resetFilter:async()=>{this.resetPagination();this.currentPageSize=H.DEFAULT_PAGE_SIZE;this.selectedStatus=undefined;this.selectedSubStatus=undefined;this.orderBy=undefined;this.selectedWorkflowDefinitionId=undefined;await this.loadWorkflowInstances()},onBulkDelete:this.onDeleteManyClick,onBulkCancel:this.onCancelManyClick};return t(i,{class:"tw-block"},t("div",{class:"tw-pt-4"},t("h2",{class:"tw-text-lg tw-font-medium tw-ml-4 tw-mb-2"},this.strings.name),t(B,{onSearch:this.onSearch,searchTextPlaceholder:this.strings.searchTextPlaceholder}),t(I,Object.assign({},l)),t("div",{class:"tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200"},t("table",{class:"default-table"},t("thead",null,t("tr",null,t("th",null,t("input",{type:"checkbox",value:"true",checked:this.getSelectAllState(),onChange:t=>this.onSelectAllCheckChange(t),ref:t=>this.selectAllCheckbox=t})),t("th",null,t("span",{class:"lg:tw-pl-2"},this.strings.id)),t("th",null,this.strings.correlation),t("th",null,this.strings.worfklow),t("th",{class:"tw-align-right"},this.strings.version),t("th",null,this.strings.workflowName),t("th",null,this.strings.status),t("th",null,this.strings.created),t("th",null,this.strings.finished),t("th",null))),t("tbody",{class:"tw-bg-white tw-divide-y tw-divide-gray-100"},s.items.map((s=>{const i=U(s.subStatus);const n=this.selectedWorkflowInstanceIds.findIndex((t=>t===s.id))>=0;const l=e.find((t=>t.definitionId==s.definitionId));const o=!!l?l.name||"Untitled":"(Definition not found)";return t("tr",null,t("td",null,t("input",{type:"checkbox",value:s.id,checked:n,onChange:t=>this.onWorkflowInstanceCheckChange(t,s)})),t("td",null,t("div",{class:"tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2"},t("a",{onClick:t=>this.onWorkflowInstanceClick(t,s),href:"#",class:"tw-truncate hover:tw-text-gray-600"},t("span",null,s.id)))),t("td",null,s.correlationId),t("td",null,o),t("td",{class:"tw-align-right"},s.version),t("td",null,s.name),t("td",null,t("div",{class:"tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2"},t("div",{class:`tw-flex-shrink-0 tw-w-2.5 tw-h-2.5 tw-rounded-full ${i}`}),t("span",null,s.status))),t("td",null,g(s.createdAt,"-")),t("td",null,g(s.finishedAt,"-")),t("td",{class:"tw-pr-6"},t("elsa-context-menu",{menuItems:[{text:"Edit",handler:t=>this.onWorkflowInstanceClick(t,s),icon:t(v,null)},{text:"Delete",handler:t=>this.onDeleteClick(t,s),icon:t(S,null)}]})))})))),t("elsa-pager",{page:this.currentPage,pageSize:this.currentPageSize,totalCount:n,onPaginated:this.onPaginated}))))}async loadWorkflowInstances(){const t={searchTerm:this.searchTerm,definitionId:this.selectedWorkflowDefinitionId,status:this.selectedStatus,subStatus:this.selectedSubStatus,orderBy:this.orderBy,orderDirection:p.Descending,page:this.currentPage,pageSize:this.currentPageSize};_(t);this.workflowInstances=await this.workflowInstancesApi.list(t)}async onDeleteClick(t,e){await this.workflowInstancesApi.delete(e);await this.loadWorkflowInstances()}onSelectAllCheckChange(t){const e=t.target;const s=e.checked;this.selectAllChecked=s;this.selectedWorkflowInstanceIds=E(s,this.workflowInstances,this.selectedWorkflowInstanceIds)}onWorkflowInstanceCheckChange(t,e){const s=t.target;const i=s.checked;if(i)this.selectedWorkflowInstanceIds=[...this.selectedWorkflowInstanceIds,e.id];else this.selectedWorkflowInstanceIds=this.selectedWorkflowInstanceIds.filter((t=>t!=e.id));this.setSelectAllIndeterminateState()}get element(){return n(this)}};H.DEFAULT_PAGE_SIZE=15;H.MIN_PAGE_SIZE=5;H.MAX_PAGE_SIZE=100;H.START_PAGE=0;export{H as elsa_workflow_instance_browser};
//# sourceMappingURL=p-c217da26.entry.js.map