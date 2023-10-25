import { EventEmitter } from "../../../../stencil-public-runtime";
import { Variable } from "../../../../models";
export declare class VariablesEditor {
  private readonly modalDialogService;
  private readonly saveAction;
  private modalDialogInstance;
  constructor();
  variables?: Array<Variable>;
  variablesChanged: EventEmitter<Variable[]>;
  variablesState: Array<Variable>;
  onVariablesPropChanged(value: Array<Variable>): void;
  componentWillLoad(): void;
  render(): any;
  private getVariableNameExists;
  private updateVariablesState;
  private generateNewVariableName;
  private onAddVariableClick;
  private onEditClick;
  private onDeleteClick;
  private onVariableChanged;
}
