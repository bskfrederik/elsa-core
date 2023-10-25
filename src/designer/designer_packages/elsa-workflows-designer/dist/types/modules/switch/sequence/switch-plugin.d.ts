import 'reflect-metadata';
import { Plugin } from "../../../models";
export declare class SwitchPlugin implements Plugin {
  static readonly ActivityTypeName: string;
  constructor();
  initialize(): Promise<void>;
}
