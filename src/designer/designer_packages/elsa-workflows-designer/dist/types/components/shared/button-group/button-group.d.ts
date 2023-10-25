import { Button } from "./models";
export declare class ButtonGroup {
  buttons: Array<Button>;
  element: HTMLElement;
  render(): any;
  renderButtons: () => any;
  renderButton: (button: Button, index: number) => any;
  private static onButtonClick;
}
