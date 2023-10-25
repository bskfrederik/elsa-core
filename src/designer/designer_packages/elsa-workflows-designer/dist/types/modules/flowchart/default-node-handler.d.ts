import 'reflect-metadata';
import { Node } from "@antv/x6";
import { ActivityNodeHandler, UINodeContext, UIPortContext } from "./activity-node-handler";
export declare class DefaultNodeHandler implements ActivityNodeHandler {
  private readonly portProviderRegistry;
  constructor();
  createDesignerNode(context: UINodeContext): Node.Metadata;
  createPorts(context: UIPortContext): Array<any>;
}
