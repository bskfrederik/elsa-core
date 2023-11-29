import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as leave, t as toggle } from './index3.js';
import { C as Container, B as EventBus, aM as state } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { N as NotificationService } from './notification-service.js';

const WorkflowToolbarMenu = /*@__PURE__*/ proxyCustomElement(class WorkflowToolbarMenu extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.isMenuOpen = false;
    this.closeMenu = () => {
      leave(this.menu);
      this.isMenuOpen = false;
    };
    this.toggleMenu = () => {
      toggle(this.menu);
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        NotificationService.hideAllNotifications();
      }
    };
    this.onMenuItemClick = async (e, menuItem) => {
      e.preventDefault();
      await menuItem.onClick();
      this.closeMenu();
    };
    this.eventBus = Container.get(EventBus);
  }
  render() {
    const menuItems = state.items;
    return (h(Host, { class: "tw-block", ref: el => this.element = el }, h("div", { class: "elsa-toolbar-menu-wrapper tw-relative" }, h("div", null, h("button", { onClick: () => this.toggleMenu(), type: "button", class: "tw-bg-gray-800 tw-flex tw-text-sm tw-rounded-full focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-offset-1 focus:tw-ring-gray-600", "aria-expanded": "false", "aria-haspopup": "true" }, h("span", { class: "tw-sr-only" }, "Open user menu"), h("svg", { class: "tw-h-8 tw-w-8 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" })))), h("div", { ref: el => this.menu = el, "data-transition-enter": "tw-transition tw-ease-out tw-duration-100", "data-transition-enter-start": "tw-transform tw-opacity-0 tw-scale-95", "data-transition-enter-end": "tw-transform tw-opacity-100 tw-scale-100", "data-transition-leave": "tw-transition tw-ease-in tw-duration-75", "data-transition-leave-start": "tw-transform tw-opacity-100 tw-scale-100", "data-transition-leave-end": "tw-transform tw-opacity-0 tw-scale-95", class: "hidden tw-origin-top-right tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-rounded-md tw-shadow-lg tw-py-1 tw-bg-white tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "user-menu-button", tabindex: "-1" }, menuItems.map(menuItem => h("a", { onClick: e => this.onMenuItemClick(e, menuItem), href: "#", role: "menuitem", tabindex: "-1" }, menuItem.text))))));
  }
  onWindowClicked(event) {
    const target = event.target;
    if (!this.element.contains(target))
      this.closeMenu();
  }
}, [0, "elsa-workflow-toolbar-menu", undefined, [[8, "click", "onWindowClicked"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-toolbar-menu"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-toolbar-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkflowToolbarMenu);
      }
      break;
  } });
}

export { WorkflowToolbarMenu as W, defineCustomElement as d };

//# sourceMappingURL=workflow-toolbar-menu.js.map