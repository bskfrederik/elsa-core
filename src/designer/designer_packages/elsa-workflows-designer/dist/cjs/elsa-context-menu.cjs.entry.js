'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const index$1 = require('./index-f9ac3f14.js');
const lodash = require('./lodash-c9901408.js');
const models = require('./models-8be0747d.js');
const tick = require('./tick-ae458686.js');
require('./_commonjsHelpers-dcc4cf71.js');

const ContextMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.getAnchorPointClass = () => {
      switch (this.anchorPoint) {
        case models.ContextMenuAnchorPoint.BottomLeft:
          return 'tw-origin-bottom-left tw-left-0';
        case models.ContextMenuAnchorPoint.BottomRight:
          return 'tw-origin-bottom-right tw-right-0';
        case models.ContextMenuAnchorPoint.TopLeft:
          return 'tw-origin-top-left tw-left-0';
        case models.ContextMenuAnchorPoint.TopRight:
        default:
          return 'tw-origin-top-right tw-right-0';
      }
    };
    this.renderMenuItemGroups = (menuItemGroups) => {
      if (Object.keys(menuItemGroups).length == 0)
        return;
      return lodash.lodash.map(menuItemGroups, group => this.renderMenuItems(group));
    };
    this.renderMenuItems = (menuItems) => {
      if (menuItems.length == 0)
        return;
      const hasAnyIcons = menuItems.find(x => !!x.icon) != null;
      return index.h("div", { class: "tw-py-1" }, menuItems.map(menuItem => {
        const anchorUrl = menuItem.anchorUrl || '#';
        const isToggle = menuItem.isToggle;
        const checked = menuItem.checked;
        return (index.h("a", { href: anchorUrl, onClick: e => this.onMenuItemClick(e, menuItem), class: "tw-group tw-flex tw-items-center tw-px-4 tw-py-2 tw-text-sm tw-leading-5 tw-text-gray-700 hover:tw-bg-gray-100 hover:tw-text-gray-900 focus:tw-outline-none focus:tw-bg-gray-100 focus:tw-text-gray-900", role: "menuitem" }, menuItem.icon ? index.h("span", { class: "tw-mr-3" }, menuItem.icon) : hasAnyIcons ? index.h("span", { class: "tw-mr-7" }) : undefined, index.h("span", { class: "tw-flex-grow" }, menuItem.text), isToggle && checked ? index.h("span", { class: "tw-float-right" }, index.h(tick.TickIcon, null)) : undefined));
      }));
    };
    this.renderButton = () => {
      if (this.hideButton)
        return;
      return index.h("button", { onClick: () => this.toggleMenu(), "aria-has-popup": "true", type: "button", class: "tw-w-8 tw-h-8 tw-inline-flex tw-items-center tw-justify-center tw-text-gray-400 tw-rounded-full tw-bg-transparent hover:tw-text-gray-500 focus:tw-outline-none focus:tw-text-gray-500 focus:tw-bg-gray-100 tw-transition tw-ease-in-out tw-duration-150" }, index.h("svg", { class: "tw-w-5 tw-h-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, index.h("path", { d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" })));
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
      index$1.enter(this.contextMenu);
  }
  closeContextMenu() {
    if (!!this.contextMenu)
      index$1.leave(this.contextMenu);
  }
  toggleMenu() {
    index$1.toggle(this.contextMenu);
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
    const menuItemGroups = lodash.lodash.groupBy(menuItems, x => { var _a; return (_a = x.group) !== null && _a !== void 0 ? _a : 0; });
    return (index.h("div", { class: "tw-relative tw-flex tw-justify-end tw-items-center" }, this.renderButton(), index.h("div", { ref: el => this.contextMenu = el, "data-transition-enter": "tw-transition tw-ease-out tw-duration-100", "data-transition-enter-start": "tw-transform tw-opacity-0 tw-scale-95", "data-transition-leave": "tw-transition tw-ease-in tw-duration-75", "data-transition-leave-start": "tw-transform tw-opacity-100 tw-scale-100", "data-transition-leave-end": "tw-transform tw-opacity-0 tw-scale-95", class: `hidden tw-z-10 tw-mx-3 tw-absolute ${anchorPointClass} tw-w-48 tw-mt-1 tw-rounded-md tw-shadow-lg` }, index.h("div", { class: "tw-rounded-md tw-bg-white tw-shadow-xs tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-divide-y tw-divide-gray-100 focus:tw-outline-none", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "project-options-menu-0" }, this.renderMenuItemGroups(menuItemGroups)))));
  }
  get element() { return index.getElement(this); }
};

exports.elsa_context_menu = ContextMenu;

//# sourceMappingURL=elsa-context-menu.cjs.entry.js.map