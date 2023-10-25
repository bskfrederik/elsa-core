import { CellView, Graph } from '@antv/x6';
import './ports';
import { Activity } from "../../models";
export declare function createGraph(container: HTMLElement, interacting: CellView.Interacting, getAllActivities: () => Array<Activity>): Graph;
