import { h } from '@stencil/core';
import { Container } from "typedi";
import { EventBus } from "../../../../services";
import { WorkflowDefinitionsApi } from "../../services/api";
import { DeleteIcon, RevertIcon, PublishedIcon } from "../../../../components/icons/tooling";
import moment from "moment";
import { ModalDialogService, DefaultModalActions, DefaultContents, ModalType } from "../../../../components/shared/modal-dialog";
import { getLocaleComponentStrings } from '../../../../utils/locale';
export class WorkflowDefinitionVersionHistory {
  constructor() {
    this.onViewVersionClick = (e, version) => {
      e.preventDefault();
      this.versionSelected.emit(version);
    };
    this.onDeleteVersionClick = async (e, version) => {
      e.preventDefault();
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to delete this version?"), {
        modalType: ModalType.Confirmation,
        actions: [DefaultModalActions.Delete(() => this.deleteVersionClicked.emit(version)), DefaultModalActions.Cancel()]
      });
    };
    this.onRevertVersionClick = (e, version) => {
      e.preventDefault();
      this.revertVersionClicked.emit(version);
    };
    this.selectedVersion = undefined;
    this.workflowVersions = undefined;
    this.serverUrl = undefined;
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionApi = Container.get(WorkflowDefinitionsApi);
    this.modalDialogService = Container.get(ModalDialogService);
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }
  render() {
    return (h("div", null, h("table", null, h("thead", null, h("tr", null, h("th", null), h("th", null, this.strings.version), h("th", null, this.strings.created), h("th", null), h("th", null))), h("tbody", null, this.workflowVersions.map(v => {
      let menuItems = [];
      menuItems.push({ text: this.strings.delete, handler: e => this.onDeleteVersionClick(e, v), icon: h(DeleteIcon, null) });
      if (!v.isLatest)
        menuItems.push({ text: this.strings.revert, handler: e => this.onRevertVersionClick(e, v), icon: h(RevertIcon, null) });
      return (h("tr", null, h("td", null, v.isPublished ? h(PublishedIcon, null) : ""), h("td", null, v.version), h("td", null, moment(v.createdAt).format('DD-MM-YYYY HH:mm:ss')), h("td", null, h("button", { onClick: e => this.onViewVersionClick(e, v), type: "button", disabled: this.selectedVersion.version == v.version, class: this.selectedVersion.version == v.version ? "elsa-btn elsa-btn-primary" : "elsa-btn elsa-btn-secondary" }, this.strings.view)), h("td", null, v.isPublished || v.isPublished ? undefined : h("elsa-context-menu", { menuItems: menuItems }))));
    })))));
  }
  static get is() { return "elsa-workflow-definition-version-history"; }
  static get properties() {
    return {
      "selectedVersion": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
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
      "workflowVersions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<WorkflowDefinition>",
          "resolved": "WorkflowDefinition[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
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
      "serverUrl": {
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
        "attribute": "server-url",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "versionSelected",
        "name": "versionSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }, {
        "method": "deleteVersionClicked",
        "name": "deleteVersionClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }, {
        "method": "revertVersionClicked",
        "name": "revertVersionClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
//# sourceMappingURL=version-history.js.map
