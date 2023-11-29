import { r as registerInstance, c as createEvent, h } from './index-08112852.js';
import { P as PanelActionType } from './models-445d64b9.js';

const SlideOverPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.collapsed = createEvent(this, "collapsed", 7);
    this.onCloseClick = async () => {
      await this.hide();
    };
    this.onOverlayClick = async (e) => {
      if (e.target != this.overlayElement)
        return;
      // Hide panel.
      await this.hide();
    };
    this.onTransitionEnd = (e) => {
      if (this.isHiding) {
        this.isVisible = false;
        this.isHiding = false;
        this.collapsed.emit();
      }
    };
    this.headerText = undefined;
    this.tabs = [];
    this.selectedTab = undefined;
    this.actions = [];
    this.expand = undefined;
    this.isHiding = false;
    this.isShowing = false;
    this.isVisible = false;
  }
  async show() {
    this.isShowing = true;
    this.isHiding = false;
    this.isVisible = true;
  }
  async hide() {
    this.isHiding = true;
    this.isShowing = false;
  }
  handleExpanded(value) {
    this.isShowing = value;
    this.isHiding = !value;
    if (value)
      this.isVisible = true;
  }
  render() {
    return this.renderPanel();
  }
  onTabClick(e, tab) {
    e.preventDefault();
    this.selectedTab = tab;
  }
  renderPanel() {
    const isVisible = this.isVisible;
    const isHiding = this.isHiding;
    const wrapperClass = isVisible ? 'tw-block' : 'hidden';
    const backdropClass = !isHiding && isVisible ? 'tw-opacity-50' : 'tw-opacity-0';
    const panelClass = !isHiding && isVisible ? 'tw-max-w-2xl w-2xl' : 'tw-max-tw-w-0 tw-w-0';
    const tabs = this.tabs;
    const selectedTab = this.selectedTab;
    const actions = this.actions;
    return (h("div", { class: `tw-fixed tw-inset-0 tw-overflow-hidden tw-z-10 ${wrapperClass}`, "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true" }, h("div", { class: "tw-absolute tw-inset-0 tw-overflow-hidden" }, h("div", { class: `tw-absolute tw-inset-0 tw-bg-gray-100 tw-ease-in-out tw-duration-200 ${backdropClass}`, onTransitionEnd: e => this.onTransitionEnd(e) }), h("div", { class: "tw-absolute tw-inset-0", "aria-hidden": "true", onClick: e => this.onOverlayClick(e), ref: el => this.overlayElement = el }, h("div", { class: "tw-fixed tw-inset-y-0 tw-right-0 tw-pl-10 tw-max-w-full tw-flex sm:tw-pl-16" }, h("div", { class: `tw-w-screen tw-ease-in-out tw-duration-200 ${panelClass}` }, h("form", { class: "tw-h-full tw-flex tw-flex-col tw-bg-white tw-shadow-xl", ref: el => this.formElement = el, method: "post" }, h("div", { class: "tw-flex tw-flex-col tw-flex-1" }, h("div", { class: "tw-px-4 tw-py-6 tw-bg-gray-50 sm:tw-px-6" }, h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, h("div", { class: "tw-space-y-1" }, h("h2", { class: "tw-text-lg tw-font-medium tw-text-gray-900", id: "slide-over-title" }, this.headerText)), h("div", { class: "tw-h-7 tw-flex tw-items-center" }, h("button", { type: "button", class: "tw-text-gray-400 hover:tw-text-gray-500", onClick: () => this.onCloseClick() }, h("span", { class: "tw-sr-only" }, "Close panel"), h("svg", { class: "tw-h-6 tw-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M6 18L18 6M6 6l12 12" })))))), h("div", { class: "tw-border-b tw-border-gray-200" }, h("nav", { class: "-tw-mb-px tw-flex", "aria-label": "Tabs" }, tabs.map(tab => {
      const cssClass = tab == selectedTab ? 'tw-border-blue-500 tw-text-blue-600' : 'tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300';
      return h("a", { href: "#", onClick: e => this.onTabClick(e, tab), class: `${cssClass} tw-py-4 tw-px-1 tw-text-center tw-border-b-2 tw-font-medium tw-text-sm tw-flex-1` }, tab.displayText);
    }))), h("div", { class: "tw-flex-1 tw-relative" }, h("div", { class: "tw-absolute tw-inset-0 tw-overflow-y-scroll" }, tabs.map(tab => {
      const cssClass = tab == selectedTab ? '' : 'hidden';
      return h("div", { class: cssClass }, tab.content());
    })))), h("div", { class: "tw-flex-shrink-0 tw-px-4 tw-border-t tw-border-gray-200 tw-py-5 sm:tw-px-6" }, h("div", { class: "tw-space-x-3 tw-flex tw-justify-end" }, actions.map(action => {
      if (action.display)
        return action.display(action);
      const cssClass = action.isPrimary ? 'tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 tw-border-transparent' : 'tw-bg-white tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50';
      const buttonType = action.type == PanelActionType.Submit ? 'submit' : 'button';
      const cancelHandler = async () => await this.hide();
      const emptyHandler = () => {
      };
      const clickHandler = !!action.onClick ? action.onClick : action.type == PanelActionType.Cancel ? cancelHandler : emptyHandler;
      return h("button", { type: buttonType, onClick: e => clickHandler({ e, action }), class: `${cssClass} tw-py-2 tw-px-4 tw-border tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-blue-500` }, action.text);
    }))))))))));
  }
  static get watchers() { return {
    "expand": ["handleExpanded"]
  }; }
};

export { SlideOverPanel as elsa_slide_over_panel };

//# sourceMappingURL=elsa-slide-over-panel.entry.js.map