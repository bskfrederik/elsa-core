import 'reflect-metadata';
import { Node } from '@antv/x6';
import { Activity, ActivityDescriptor } from '../../models';
export declare class NodeFactory {
  private readonly handlerRegistry;
  constructor();
  createNode(activityDescriptor: ActivityDescriptor, activity: Activity, x: number, y: number): Node.Metadata;
  createPorts(activityDescriptor: ActivityDescriptor, activity: Activity): Array<any>;
}
