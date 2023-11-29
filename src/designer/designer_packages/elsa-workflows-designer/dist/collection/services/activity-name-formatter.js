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
var ActivityNameFormatter_1;
import { Service } from 'typedi';
import { camelCase, startCase, snakeCase, kebabCase } from 'lodash';
import { stripActivityNameSpace } from "../utils";
let ActivityNameFormatter = ActivityNameFormatter_1 = class ActivityNameFormatter {
  constructor() {
    this.strategy = ActivityNameFormatter_1.PascalCaseStrategy;
  }
  format(context) {
    return this.strategy(context);
  }
};
ActivityNameFormatter.DefaultStrategy = context => `${stripActivityNameSpace(context.activityDescriptor.typeName)}${context.count}`;
ActivityNameFormatter.UnderscoreStrategy = context => `${stripActivityNameSpace(context.activityDescriptor.typeName)}_${context.count}`;
ActivityNameFormatter.PascalCaseStrategy = context => startCase(camelCase(ActivityNameFormatter_1.DefaultStrategy(context))).replace(/ /g, '');
ActivityNameFormatter.CamelCaseStrategy = context => camelCase(ActivityNameFormatter_1.DefaultStrategy(context));
ActivityNameFormatter.SnakeCaseStrategy = context => snakeCase(ActivityNameFormatter_1.DefaultStrategy(context));
ActivityNameFormatter.KebabCaseStrategy = context => kebabCase(ActivityNameFormatter_1.DefaultStrategy(context));
ActivityNameFormatter = ActivityNameFormatter_1 = __decorate([
  Service()
], ActivityNameFormatter);
export { ActivityNameFormatter };
//# sourceMappingURL=activity-name-formatter.js.map
