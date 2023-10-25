import { EventEmitter } from '../../stencil-public-runtime';
import { PanelPosition, PanelStateChangedArgs } from './models';
export declare class Panel {
  position: PanelPosition;
  expandedStateChanged: EventEmitter<PanelStateChangedArgs>;
  isExpanded: boolean;
  dragging: boolean;
  private onToggleClick;
  onBodyMouseUp: () => void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  clearJSEvents(): void;
  resize: (e: MouseEvent) => void;
  onDragBarMouseDown: (e: MouseEvent) => void;
  render(): any;
}
