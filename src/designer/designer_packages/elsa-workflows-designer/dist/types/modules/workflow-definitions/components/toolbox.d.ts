import { Graph } from '@antv/x6';
export declare class Toolbox {
  graph: Graph;
  isReadonly: boolean;
  selectedTabIndex: number;
  private onTabSelected;
  render(): any;
}
