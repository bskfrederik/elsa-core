import { Host, h } from '@stencil/core';
import { enter, leave } from 'el-transition';
import { ModalActionType } from "./models";
import { ModalType } from "./modal-type";
export class ModalDialog {
  constructor() {
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
  static get is() { return "elsa-modal-dialog"; }
  static get properties() {
    return {
      "modalDialogInstance": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ModalDialogInstance",
          "resolved": "ModalDialogInstance",
          "references": {
            "ModalDialogInstance": {
              "location": "import",
              "path": "./models"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "actions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<ModalActionDefinition>",
          "resolved": "ModalActionDefinition[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "ModalActionDefinition": {
              "location": "import",
              "path": "./models"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'tw-max-w-6xl'"
      },
      "type": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "ModalType",
          "resolved": "ModalType.Confirmation | ModalType.Default",
          "references": {
            "ModalType": {
              "location": "import",
              "path": "./modal-type"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "ModalType.Default"
      },
      "autoHide": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "auto-hide",
        "reflect": false,
        "defaultValue": "true"
      },
      "content": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "() => any",
          "resolved": "() => any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "() => <div/>"
      }
    };
  }
  static get states() {
    return {
      "isVisible": {}
    };
  }
  static get events() {
    return [{
        "method": "shown",
        "name": "shown",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "hidden",
        "name": "hidden",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "actionInvoked",
        "name": "actionInvoked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ModalActionClickArgs",
          "resolved": "ModalActionClickArgs",
          "references": {
            "ModalActionClickArgs": {
              "location": "import",
              "path": "./models"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "show": {
        "complexType": {
          "signature": "(animate?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "hide": {
        "complexType": {
          "signature": "(animate?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleKeyDown",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=modal-dialog.js.map
