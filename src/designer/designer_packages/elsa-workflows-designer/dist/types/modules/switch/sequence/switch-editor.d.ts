import { ActivityInputContext } from "../../../services/activity-input-driver";
export declare class SwitchEditor {
  inputContext: ActivityInputContext;
  private cases;
  private supportedSyntaxes;
  onInputContextChanged(value: ActivityInputContext): void;
  componentWillLoad(): void;
  private updateCases;
  private onAddCaseClick;
  private onDeleteCaseClick;
  private onCaseLabelChanged;
  private onCaseExpressionChanged;
  private onCaseSyntaxChanged;
  private updateActivity;
  render(): any;
}
