import { r as registerInstance, h, a as getElement } from './index-08112852.js';
import { e as enter, l as leave, t as toggle } from './index-e3b8500f.js';
import { l as lodash } from './lodash-fa7ebcea.js';
import { C as ContextMenuAnchorPoint } from './models-107c382d.js';
import { T as TickIcon } from './tick-062a2872.js';
import './_commonjsHelpers-7db8bc26.js';

const ContextMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.getAnchorPointClass = () => {
      switch (this.anchorPoint) {
        case ContextMenuAnchorPoint.BottomLeft:
          return 'tw-origin-bottom-left tw-left-0';
        case ContextMenuAnchorPoint.BottomRight:
          return 'tw-origin-bottom-right tw-right-0';
        case ContextMenuAnchorPoint.TopLeft:
          return 'tw-origin-top-left tw-left-0';
        case ContextMenuAnchorPoint.TopRight:
        default:
          return 'tw-origin-top-right tw-right-0';
      }
    };
    this.renderMenuItemGroups = (menuItemGroups) => {
      if (Object.keys(menuItemGroups).length == 0)
        return;
      return lodash.map(menuItemGroups, group => this.renderMenuItems(group));
    };
    this.renderMenuItems = (menuItems) => {
      if (menuItems.length == 0)
        return;
      const hasAnyIcons = menuItems.find(x => !!x.icon) != null;
      return h("div", { class: "tw-py-1" }, menuItems.map(menuItem => {
        const anchorUrl = menuItem.anchorUrl || '#';
        const isToggle = menuItem.isToggle;
        const checked = menuItem.checked;
        return (h("a", { href: anchorUrl, onClick: e => this.onMenuItemClick(e, menuItem), class: "tw-group tw-flex tw-items-center tw-px-4 tw-py-2 tw-text-sm tw-leading-5 tw-text-gray-700 hover:tw-bg-gray-100 hover:tw-text-gray-900 focus:tw-outline-none focus:tw-bg-gray-100 focus:tw-text-gray-900", role: "menuitem" }, menuItem.icon ? h("span", { class: "tw-mr-3" }, menuItem.icon) : hasAnyIcons ? h("span", { class: "tw-mr-7" }) : undefined, h("span", { class: "tw-flex-grow" }, menuItem.text), isToggle && checked ? h("span", { class: "tw-float-right" }, h(TickIcon, null)) : undefined));
      }));
    };
    this.renderButton = () => {
      if (this.hideButton)
        return;
      return h("button", { onClick: () => this.toggleMenu(), "aria-has-popup": "true", type: "button", class: "tw-w-8 tw-h-8 tw-inline-flex tw-items-center tw-justify-center tw-text-gray-400 tw-rounded-full tw-bg-transparent hover:tw-text-gray-500 focus:tw-outline-none focus:tw-text-gray-500 focus:tw-bg-gray-100 tw-transition tw-ease-in-out tw-duration-150" }, h("svg", { class: "tw-w-5 tw-h-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, h("path", { d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" })));
    };
    this.menuItems = [];
    this.hideButton = undefined;
    this.anchorPoint = undefined;
  }
  async open() {
    this.showContextMenu();
  }
  async close() {
    this.closeContextMenu();
  }
  onWindowClicked(event) {
    const target = event.target;
    if (!this.element.contains(target))
      this.closeContextMenu();
  }
  showContextMenu() {
    if (!!this.contextMenu)
      enter(this.contextMenu);
  }
  closeContextMenu() {
    if (!!this.contextMenu)
      leave(this.contextMenu);
  }
  toggleMenu() {
    toggle(this.contextMenu);
  }
  async onMenuItemClick(e, menuItem) {
    e.preventDefault();
    if (!!menuItem.handler)
      menuItem.handler(e);
    if (menuItem.isToggle) {
      menuItem.checked = !menuItem.checked;
      this.menuItems = [...this.menuItems]; // Trigger a re-render.
    }
    this.closeContextMenu();
  }
  render() {
    const anchorPointClass = this.getAnchorPointClass();
    const menuItems = this.menuItems;
    const menuItemGroups = lodash.groupBy(menuItems, x => { var _a; return (_a = x.group) !== null && _a !== void 0 ? _a : 0; });
    return (h("div", { class: "tw-relative tw-flex tw-justify-end tw-items-center" }, this.renderButton(), h("div", { ref: el => this.contextMenu = el, "data-transition-enter": "tw-transition tw-ease-out tw-duration-100", "data-transition-enter-start": "tw-transform tw-opacity-0 tw-scale-95", "data-transition-leave": "tw-transition tw-ease-in tw-duration-75", "data-transition-leave-start": "tw-transform tw-opacity-100 tw-scale-100", "data-transition-leave-end": "tw-transform tw-opacity-0 tw-scale-95", class: `hidden tw-z-10 tw-mx-3 tw-absolute ${anchorPointClass} tw-w-48 tw-mt-1 tw-rounded-md tw-shadow-lg` }, h("div", { class: "tw-rounded-md tw-bg-white tw-shadow-xs tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-divide-y tw-divide-gray-100 focus:tw-outline-none", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "project-options-menu-0" }, this.renderMenuItemGroups(menuItemGroups)))));
  }
  get element() { return getElement(this); }
};

export { ContextMenu as elsa_context_menu };

//# sourceMappingURL=elsa-context-menu.entry.js.map