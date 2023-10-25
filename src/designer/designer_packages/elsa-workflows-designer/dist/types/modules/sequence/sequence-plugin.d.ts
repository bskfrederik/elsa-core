import 'reflect-metadata';
import { Plugin } from "../../models";
export declare class SequencePlugin implements Plugin {
  static readonly ActivityTypeName: string;
  constructor();
  initialize(): Promise<void>;
}
