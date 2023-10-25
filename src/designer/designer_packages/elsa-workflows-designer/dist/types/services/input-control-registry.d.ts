import { UIHint } from "../models";
export type RenderActivityPropInputControl = (InputContext: any) => any;
export declare class InputControlRegistry {
  private inputMap;
  constructor();
  add(uiHint: UIHint, control: RenderActivityPropInputControl): void;
  get(uiHint: UIHint): RenderActivityPropInputControl;
  has(uiHint: string): boolean;
}
