import { Activity, WorkflowExecutionLogRecord } from '../../../models';
export declare class ActivityProperties {
  private slideOverPanel;
  private readonly iconRegistry;
  constructor();
  activity?: Activity;
  activityExecutionLog: WorkflowExecutionLogRecord;
  activityPropertyTabIndex?: number;
  private selectedTabIndex;
  show(): Promise<void>;
  hide(): Promise<void>;
  updateSelectedTab(tabIndex: number): Promise<void>;
  componentWillLoad(): Promise<void>;
  render(): any;
  private findActivityDescriptor;
  private onSelectedTabIndexChanged;
  private renderPropertiesTab;
  private renderCommonTab;
  private renderJournalTab;
}
