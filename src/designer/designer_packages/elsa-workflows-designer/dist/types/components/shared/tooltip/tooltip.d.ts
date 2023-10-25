export declare class Tooltip {
  tooltipContent: any;
  /** Specifying `auto` will default to `bottom`, but will reposition to `top` if the tooltip height runs offscreen  */
  tooltipPosition?: 'right' | 'left' | 'top' | 'bottom' | 'auto';
  triangleClass: string;
  private element;
  private getTooltipPositionClasses;
  private onMouseOver;
  private isOutOfBounds;
  render(): any;
}
