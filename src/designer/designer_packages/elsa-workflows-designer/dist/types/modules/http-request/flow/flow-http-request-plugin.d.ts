import 'reflect-metadata';
import { Plugin } from "../../../models";
export declare class FlowHttpRequestPlugin implements Plugin {
  static readonly ActivityTypeName: string;
  constructor();
  initialize(): Promise<void>;
}
