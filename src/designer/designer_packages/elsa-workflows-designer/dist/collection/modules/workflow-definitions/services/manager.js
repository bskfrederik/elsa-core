var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
import { Container, Service } from "typedi";
import { WorkflowDefinitionsApi } from "./api";
import { downloadFromBlob } from "../../../utils";
import { ActivityDescriptorManager } from "../../../services";
let WorkflowDefinitionManager = class WorkflowDefinitionManager {
  constructor() {
    this.getWorkflow = async (definitionId, versionOptions) => {
      return await this.api.get({ definitionId, versionOptions });
    };
    this.saveWorkflow = async (definition, publish) => {
      const request = {
        model: definition,
        publish: publish
      };
      return await this.api.post(request);
    };
    this.retractWorkflow = async (definition) => {
      const request = {
        definitionId: definition.definitionId
      };
      return await this.api.retract(request);
    };
    this.exportWorkflow = async (definition) => {
      const request = {
        definitionId: definition.definitionId,
        versionOptions: { version: definition.version }
      };
      const response = await this.api.export(request);
      downloadFromBlob(response.data, { contentType: 'application/json', fileName: response.fileName });
    };
    this.importWorkflow = async (definitionId, file) => {
      try {
        const importRequest = { definitionId, file };
        const importResponse = await this.api.import(importRequest);
        await this.activityDescriptorManager.refresh();
        return importResponse.workflowDefinition;
      }
      catch (e) {
        console.error(e);
      }
    };
    this.api = Container.get(WorkflowDefinitionsApi);
    this.activityDescriptorManager = Container.get(ActivityDescriptorManager);
  }
};
WorkflowDefinitionManager = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], WorkflowDefinitionManager);
export { WorkflowDefinitionManager };
//# sourceMappingURL=manager.js.map
