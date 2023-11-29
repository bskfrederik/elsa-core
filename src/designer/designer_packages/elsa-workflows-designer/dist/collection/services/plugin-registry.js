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
import 'reflect-metadata';
import { Container, Service } from "typedi";
import { SequencePlugin } from "../modules/sequence/sequence-plugin";
import { WorkflowDefinitionsPlugin } from "../modules/workflow-definitions";
import { CompositeActivityVersionPlugin } from "../modules/workflow-definitions/plugins/composite-version-plugin";
import { WorkflowInstancesPlugin } from "../modules/workflow-instances/plugin";
import { LoginPlugin } from "../modules/login/plugin";
import { HomePagePlugin } from "../modules/home/plugin";
import { FlowchartPlugin } from "../modules/flowchart/plugin";
import { SwitchPlugin } from '../modules/switch/sequence/switch-plugin';
import { FlowSwitchPlugin } from "../modules/switch/flow/flow-switch-plugin";
import { FlowHttpRequestPlugin } from "../modules/http-request/flow/flow-http-request-plugin";
import { HttpRequestPlugin } from "../modules/http-request/sequence/http-request-plugin";
import { WorkflowContextsPlugin } from "../modules/workflow-contexts/plugin";
import { DescriptorsPlugin } from "../modules/descriptors/plugin";
// A registry of plugins.
let PluginRegistry = class PluginRegistry {
  constructor() {
    this.pluginTypes = new Map();
    this.add = (name, plugin) => {
      this.pluginTypes.set(name, plugin);
    };
    this.replace = (name, plugin) => {
      this.pluginTypes.set(name, plugin);
    };
    this.remove = (name) => {
      this.pluginTypes.delete(name);
    };
    this.initialize = async () => {
      for (const pluginType of this.pluginTypes.values()) {
        if (!Container.has(pluginType))
          Container.set(pluginType, new pluginType());
        const plugin = Container.get(pluginType);
        if (!!plugin.initialize)
          await plugin.initialize();
      }
    };
    const add = this.add;
    add('descriptors', DescriptorsPlugin);
    add('flowchart', FlowchartPlugin);
    add('login', LoginPlugin);
    add('home', HomePagePlugin);
    add('workflow-definitions', WorkflowDefinitionsPlugin);
    add('workflow-instances', WorkflowInstancesPlugin);
    add('composite-activity-version', CompositeActivityVersionPlugin);
    add('sequence', SequencePlugin);
    add('switch', SwitchPlugin);
    add('flow-switch', FlowSwitchPlugin);
    add('flow-http-request', FlowHttpRequestPlugin);
    add('http-request', HttpRequestPlugin);
    add('workflow-contexts', WorkflowContextsPlugin);
  }
};
PluginRegistry = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], PluginRegistry);
export { PluginRegistry };
//# sourceMappingURL=plugin-registry.js.map
