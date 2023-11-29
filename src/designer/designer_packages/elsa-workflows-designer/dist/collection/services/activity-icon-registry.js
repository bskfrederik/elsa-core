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
import { h } from "@stencil/core";
import 'reflect-metadata';
import { Service } from "typedi";
import { DefaultIcon, DelayIcon, TimerIcon, EventIcon, FlowchartIcon, FlowDecisionIcon, FlowJoinIcon, FlowNodeIcon, ForEachIcon, IfIcon, ReadLineIcon, WriteLineIcon, RunJavaScriptIcon, HttpEndpointIcon, HttpResponseIcon, CorrelateIcon } from "../components/icons/activities";
import { ForIcon } from "../components/icons/activities/for";
import { FinishIcon } from "../components/icons/activities/finish";
import { FaultIcon } from "../components/icons/activities/fault";
import { SetNameIcon } from "../components/icons/activities/set-name";
import { SetVariableIcon } from "../components/icons/activities/set-variable";
import { StartIcon } from "../components/icons/activities/start";
import { StartAtIcon } from "../components/icons/activities/startat";
import { BreakIcon } from "../components/icons/activities/break";
import { ForkIcon } from "../components/icons/activities/fork";
import { CompleteIcon } from "../components/icons/activities/complete";
import { PublishEventIcon } from "../components/icons/activities/publish-event";
import { RunTaskIcon } from "../components/icons/activities/run-task";
import { CronIcon } from "../components/icons/activities/cron";
// A registry of activity icons.
let ActivityIconRegistry = class ActivityIconRegistry {
  constructor() {
    this.iconMap = new Map();
    this.add('Elsa.WriteLine', settings => h(WriteLineIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.ReadLine', settings => h(ReadLineIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.If', settings => h(IfIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Flowchart', settings => h(FlowchartIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Fork', settings => h(ForkIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.HttpEndpoint', settings => h(HttpEndpointIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.WriteHttpResponse', settings => h(HttpResponseIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.ForEach', settings => h(ForEachIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.For', settings => h(ForIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.While', settings => h(ForIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Break', settings => h(BreakIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Delay', settings => h(DelayIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Timer', settings => h(TimerIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Cron', settings => h(CronIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.StartAt', settings => h(StartAtIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.FlowDecision', settings => h(FlowDecisionIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Event', settings => h(EventIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.PublishEvent', settings => h(PublishEventIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.RunJavaScript', settings => h(RunJavaScriptIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.FlowJoin', settings => h(FlowJoinIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.FlowNode', settings => h(FlowNodeIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add("Elsa.Correlate", settings => h(CorrelateIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add("Elsa.Start", settings => h(StartIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add("Elsa.Finish", settings => h(FinishIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Fault', settings => h(FaultIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.Complete', settings => h(CompleteIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.SetName', settings => h(SetNameIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.SetVariable', settings => h(SetVariableIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    this.add('Elsa.RunTask', settings => h(RunTaskIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
  }
  add(activityType, icon) {
    this.iconMap.set(activityType, icon);
  }
  get(activityType) {
    return this.iconMap.get(activityType);
  }
  getOrDefault(activityType) {
    var _a;
    return (_a = this.iconMap.get(activityType)) !== null && _a !== void 0 ? _a : ((settings) => h(DefaultIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
  }
  has(activityType) {
    return this.iconMap.has(activityType);
  }
};
ActivityIconRegistry = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], ActivityIconRegistry);
export { ActivityIconRegistry };
//# sourceMappingURL=activity-icon-registry.js.map
