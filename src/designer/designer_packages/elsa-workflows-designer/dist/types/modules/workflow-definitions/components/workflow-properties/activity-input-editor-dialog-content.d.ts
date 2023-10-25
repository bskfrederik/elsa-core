import { EventEmitter } from "../../../../stencil-public-runtime";
import { InputDefinition } from "../../models/entities";
export declare class ActivityInputEditorDialogContent {
  private formElement;
  input: InputDefinition;
  inputChanged: EventEmitter<InputDefinition>;
  getInput(): Promise<InputDefinition>;
  render(): any;
  private onSubmit;
  private getInputInternal;
}
