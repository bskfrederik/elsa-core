import{r as t,h as e,a as s}from"./p-a7a3baa1.js";import{e as i,l as n,t as r}from"./p-3ff104be.js";import{l as a}from"./p-e71312f9.js";import{C as o}from"./p-b757f20d.js";import{T as w}from"./p-ded5f755.js";import"./p-72dc819a.js";const l=class{constructor(s){t(this,s);this.getAnchorPointClass=()=>{switch(this.anchorPoint){case o.BottomLeft:return"tw-origin-bottom-left tw-left-0";case o.BottomRight:return"tw-origin-bottom-right tw-right-0";case o.TopLeft:return"tw-origin-top-left tw-left-0";case o.TopRight:default:return"tw-origin-top-right tw-right-0"}};this.renderMenuItemGroups=t=>{if(Object.keys(t).length==0)return;return a.map(t,(t=>this.renderMenuItems(t)))};this.renderMenuItems=t=>{if(t.length==0)return;const s=t.find((t=>!!t.icon))!=null;return e("div",{class:"tw-py-1"},t.map((t=>{const i=t.anchorUrl||"#";const n=t.isToggle;const r=t.checked;return e("a",{href:i,onClick:e=>this.onMenuItemClick(e,t),class:"tw-group tw-flex tw-items-center tw-px-4 tw-py-2 tw-text-sm tw-leading-5 tw-text-gray-700 hover:tw-bg-gray-100 hover:tw-text-gray-900 focus:tw-outline-none focus:tw-bg-gray-100 focus:tw-text-gray-900",role:"menuitem"},t.icon?e("span",{class:"tw-mr-3"},t.icon):s?e("span",{class:"tw-mr-7"}):undefined,e("span",{class:"tw-flex-grow"},t.text),n&&r?e("span",{class:"tw-float-right"},e(w,null)):undefined)})))};this.renderButton=()=>{if(this.hideButton)return;return e("button",{onClick:()=>this.toggleMenu(),"aria-has-popup":"true",type:"button",class:"tw-w-8 tw-h-8 tw-inline-flex tw-items-center tw-justify-center tw-text-gray-400 tw-rounded-full tw-bg-transparent hover:tw-text-gray-500 focus:tw-outline-none focus:tw-text-gray-500 focus:tw-bg-gray-100 tw-transition tw-ease-in-out tw-duration-150"},e("svg",{class:"tw-w-5 tw-h-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},e("path",{d:"M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"})))};this.menuItems=[];this.hideButton=undefined;this.anchorPoint=undefined}async open(){this.showContextMenu()}async close(){this.closeContextMenu()}onWindowClicked(t){const e=t.target;if(!this.element.contains(e))this.closeContextMenu()}showContextMenu(){if(!!this.contextMenu)i(this.contextMenu)}closeContextMenu(){if(!!this.contextMenu)n(this.contextMenu)}toggleMenu(){r(this.contextMenu)}async onMenuItemClick(t,e){t.preventDefault();if(!!e.handler)e.handler(t);if(e.isToggle){e.checked=!e.checked;this.menuItems=[...this.menuItems]}this.closeContextMenu()}render(){const t=this.getAnchorPointClass();const s=this.menuItems;const i=a.groupBy(s,(t=>{var e;return(e=t.group)!==null&&e!==void 0?e:0}));return e("div",{class:"tw-relative tw-flex tw-justify-end tw-items-center"},this.renderButton(),e("div",{ref:t=>this.contextMenu=t,"data-transition-enter":"tw-transition tw-ease-out tw-duration-100","data-transition-enter-start":"tw-transform tw-opacity-0 tw-scale-95","data-transition-leave":"tw-transition tw-ease-in tw-duration-75","data-transition-leave-start":"tw-transform tw-opacity-100 tw-scale-100","data-transition-leave-end":"tw-transform tw-opacity-0 tw-scale-95",class:`hidden tw-z-10 tw-mx-3 tw-absolute ${t} tw-w-48 tw-mt-1 tw-rounded-md tw-shadow-lg`},e("div",{class:"tw-rounded-md tw-bg-white tw-shadow-xs tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-divide-y tw-divide-gray-100 focus:tw-outline-none",role:"menu","aria-orientation":"vertical","aria-labelledby":"project-options-menu-0"},this.renderMenuItemGroups(i))))}get element(){return s(this)}};export{l as elsa_context_menu};
//# sourceMappingURL=p-6fa1610f.entry.js.map