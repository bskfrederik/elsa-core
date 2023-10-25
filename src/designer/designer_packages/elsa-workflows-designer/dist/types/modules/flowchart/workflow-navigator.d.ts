import { EventEmitter } from "../../stencil-public-runtime";
import { FlowchartPathItem } from "./models";
import { Activity } from "../../models";
export declare class WorkflowNavigator {
  private readonly iconRegistry;
  private readonly portProviderRegistry;
  constructor();
  items: Array<FlowchartPathItem>;
  rootActivity: Activity;
  navigate: EventEmitter<FlowchartPathItem>;
  render(): any;
  private renderPathItem;
  private onItemClick;
}
