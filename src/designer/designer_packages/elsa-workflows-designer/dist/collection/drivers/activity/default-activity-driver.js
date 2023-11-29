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
import 'reflect-metadata';
import { Service } from "typedi";
let DefaultActivityDriver = class DefaultActivityDriver {
  display(context) {
    const activityDescriptor = context.activityDescriptor;
    const typeName = activityDescriptor.typeName;
    const version = activityDescriptor.version;
    const activity = context.activity;
    const activityId = activity === null || activity === void 0 ? void 0 : activity.id;
    const displayType = context.displayType;
    return (`<elsa-default-activity-template activity-type="${typeName}" activity-type-version="${version}" activity-id="${activityId}" display-type="${displayType}" />`);
  }
};
DefaultActivityDriver = __decorate([
  Service()
], DefaultActivityDriver);
export { DefaultActivityDriver };
//# sourceMappingURL=default-activity-driver.js.map
