import { ActivityInputDriver, ActivityInputContext } from "../../services/activity-input-driver";
export declare class DefaultInputDriver implements ActivityInputDriver {
  private inputControlRegistry;
  constructor();
  get priority(): number;
  renderInput(context: ActivityInputContext): any;
  supportsInput(context: ActivityInputContext): boolean;
}
