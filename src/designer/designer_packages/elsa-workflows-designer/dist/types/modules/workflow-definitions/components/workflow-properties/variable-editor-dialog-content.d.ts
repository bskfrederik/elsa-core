import { EventEmitter } from "../../../../stencil-public-runtime";
import { Variable } from "../../../../models";
export declare class VariableEditorDialogContent {
  private formElement;
  variable: Variable;
  variableChanged: EventEmitter<Variable>;
  getVariable(): Promise<Variable>;
  render(): any;
  private onSubmit;
  private getVariableInternal;
}
