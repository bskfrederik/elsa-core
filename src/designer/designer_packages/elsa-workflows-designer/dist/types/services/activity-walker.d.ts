import 'reflect-metadata';
import { Activity } from "../models";
import { Hash } from "../utils";
export interface ActivityNode {
  activity: Activity;
  parents: Array<ActivityNode>;
  children: Array<ActivityNode>;
  port?: string;
  nodeId: string;
  descendants(): Array<ActivityNode>;
  ancestors(): Array<ActivityNode>;
  siblings(): Array<ActivityNode>;
  siblingsAndCousins(): Array<ActivityNode>;
}
export interface ActivityPort {
  activity: Activity;
  port: string;
}
export declare class ActivityNodeClass implements ActivityNode {
  private _activity;
  private _parents;
  private _children;
  constructor(activity: any);
  get nodeId(): string;
  get activity(): Activity;
  set activity(value: Activity);
  get parents(): ActivityNode[];
  set parents(value: ActivityNode[]);
  get children(): ActivityNode[];
  set children(value: ActivityNode[]);
  descendants(): any[];
  ancestors(): any[];
  siblings(): ActivityNode[];
  siblingsAndCousins(): ActivityNode[];
}
export declare function createActivityLookup(nodes: Array<ActivityNode>): Hash<Activity>;
export declare function createActivityNodeMap(nodes: Array<ActivityNode>): Hash<ActivityNode>;
export declare function walkActivities(root: Activity): ActivityNode;
export declare function flatten(root: ActivityNode): Array<ActivityNode>;
export declare function flattenList(activities: Array<ActivityNode>): Array<ActivityNode>;
