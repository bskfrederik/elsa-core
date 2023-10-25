import 'reflect-metadata';
import { Plugin } from "../../../models";
export declare class FlowSwitchPlugin implements Plugin {
  static readonly ActivityTypeName: string;
  constructor();
  initialize(): Promise<void>;
}
