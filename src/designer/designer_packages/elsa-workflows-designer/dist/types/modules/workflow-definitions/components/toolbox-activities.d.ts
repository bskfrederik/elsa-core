import { Graph } from '@antv/x6';
export declare class ToolboxActivities {
  graph: Graph;
  isReadonly: boolean;
  private dnd;
  private expandedCategories;
  private categoryModels;
  private renderedActivities;
  handleGraphChanged(value: Graph): void;
  componentWillLoad(): void;
  private static onActivityStartDrag;
  private onToggleActivityCategory;
  buildModel: (searchVal?: string) => any;
  filterActivities(ev: any): void;
  render(): any;
}
