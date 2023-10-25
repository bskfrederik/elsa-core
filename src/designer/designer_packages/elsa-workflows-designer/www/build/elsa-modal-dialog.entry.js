import { r as registerInstance, e as createEvent, h, k as Host, j as getElement } from './index-dc0ae4f5.js';
import { e as enter, l as leave } from './index-e3b8500f.js';
import { M as ModalActionType } from './models-09298028.js';
import { M as ModalType } from './modal-type-12f51d83.js';

const ModalDialog = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.shown = createEvent(this, "shown", 7);
    this.hidden = createEvent(this, "hidden", 7);
    this.actionInvoked = createEvent(this, "actionInvoked", 7);
    this.handleDefaultClose = async () => {
      await this.hide();
    };
    this.modalDialogInstance = undefined;
    this.actions = [];
    this.size = 'tw-max-w-6xl';
    this.type = ModalType.Default;
    this.autoHide = true;
    this.content = () => h("div", null);
    this.isVisible = true;
  }
  async show(animate = true) {
    this.showInternal(animate);
  }
  async hide(animate = true) {
    this.hideInternal(animate);
  }
  showInternal(animate) {
    this.isVisible = true;
    if (!animate) {
      this.overlay.style.opacity = '1';
      this.modal.style.opacity = '1';
    }
    enter(this.overlay);
    enter(this.modal).then(this.shown.emit);
  }
  hideInternal(animate) {
    if (!animate) {
      this.isVisible = false;
    }
    leave(this.overlay);
    leave(this.modal).then(() => {
      this.isVisible = false;
      this.hidden.emit();
    });
  }
  async handleKeyDown(e) {
    if (this.isVisible && e.key === 'Escape') {
      await this.hide(true);
    }
  }
  componentDidRender() {
    if (this.isVisible) {
      enter(this.overlay);
      enter(this.modal).then(this.shown.emit);
    }
    this.modalDialogInstance.modalDialogContentRef = this.element.querySelector('.modal-content').children[0];
  }
  render() {
    const actions = this.actions;
    const content = this.content();
    return (h(Host, { class: { 'hidden': !this.isVisible, 'tw-block': true } }, h("div", { class: "tw-fixed tw-z-50 tw-inset-0 tw-overflow-y-auto" }, h("div", { class: "tw-flex tw-items-end tw-justify-center tw-min-tw-h-screen tw-pt-4 tw-px-4 tw-pb-20 tw-text-center sm:tw-block sm:tw-p-0" }, h("div", { ref: el => this.overlay = el, onClick: () => this.hide(true), "data-transition-enter": "tw-ease-out tw-duration-300", "data-transition-enter-start": "tw-opacity-0", "data-transition-enter-end": "tw-opacity-0", "data-transition-leave": "tw-ease-in tw-duration-200", "data-transition-leave-start": "tw-opacity-0", "data-transition-leave-end": "tw-opacity-0", class: "hidden tw-fixed tw-inset-0 tw-transition-opacity", "aria-hidden": "true" }, h("div", { class: "tw-absolute tw-inset-0 tw-bg-gray-500 tw-opacity-75" })), h("span", { class: "hidden sm:tw-inline-block sm:tw-align-middle sm:tw-h-screen", "aria-hidden": "true" }), h("div", { ref: el => this.modal = el, "data-transition-enter": "tw-ease-out tw-duration-300", "data-transition-enter-start": "tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95", "data-transition-enter-end": "tw-opacity-0 tw-translate-y-0 sm:tw-scale-100", "data-transition-leave": "tw-ease-in tw-duration-200", "data-transition-leave-start": "tw-opacity-0 tw-translate-y-0 sm:tw-scale-100", "data-transition-leave-end": "tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95", class: `hidden tw-inline-block sm:tw-align-top tw-bg-white tw-rounded-lg tw-text-left tw-overflow-visible tw-shadow-xl tw-transform tw-transition-all sm:tw-my-8 sm:tw-align-top ${this.size}`, role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-headline" }, h("div", { class: "modal-content" }, content), h("div", { class: "tw-bg-gray-50 tw-px-4 tw-py-3 sm:tw-px-6 sm:tw-flex sm:tw-flex-row-reverse" }, actions.map(action => {
      if (action.display)
        return action.display(action);
      const cssClass = action.isPrimary
        ? 'tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 tw-border-transparent focus:tw-ring-blue-500'
        : action.isDangerous ? 'tw-text-white tw-bg-red-600 hover:tw-bg-red-700 tw-border-transparent focus:tw-ring-red-500'
          : 'tw-bg-white tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-ring-blue-500';
      const buttonType = action.type == ModalActionType.Submit ? 'submit' : 'button';
      const cancelHandler = () => this.hideInternal(true);
      const defaultHandler = (args) => this.actionInvoked.emit(args);
      const clickHandler = !!action.onClick ? action.onClick : action.type == ModalActionType.Cancel ? cancelHandler : defaultHandler;
      return h("button", { type: buttonType, onClick: e => {
          clickHandler({ e, action, instance: this.modalDialogInstance });
          if (this.autoHide)
            this.hideInternal(true);
        }, class: `${cssClass} tw-mt-3 tw-w-full tw-inline-flex tw-justify-center tw-rounded-md tw-border tw-shadow-sm tw-px-4 tw-py-2 tw-text-base tw-font-medium focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 sm:tw-mt-0 sm:tw-ml-3 sm:tw-w-auto sm:tw-text-sm` }, action.text);
    })))))));
  }
  get element() { return getElement(this); }
};

export { ModalDialog as elsa_modal_dialog };

//# sourceMappingURL=elsa-modal-dialog.entry.js.map