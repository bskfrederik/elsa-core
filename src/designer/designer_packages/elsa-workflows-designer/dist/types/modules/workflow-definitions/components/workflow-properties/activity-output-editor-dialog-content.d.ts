import { EventEmitter } from "../../../../stencil-public-runtime";
import { OutputDefinition } from "../../models/entities";
export declare class ActivityOutputEditorDialogContent {
  private formElement;
  output: OutputDefinition;
  outputChanged: EventEmitter<OutputDefinition>;
  getOutput(): Promise<OutputDefinition>;
  render(): any;
  private onSubmit;
  private getOutputInternal;
}
