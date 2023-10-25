import { EventEmitter } from '../../../stencil-public-runtime';
import { LayoutDirection } from "../../flowchart/models";
export declare class Toolbar {
  zoomToFit: () => Promise<void>;
  autoLayout: EventEmitter<LayoutDirection>;
  render(): any;
}
