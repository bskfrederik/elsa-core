import { EventEmitter } from "../../stencil-public-runtime";
import { ChildActivitySelectedArgs, EditChildActivityArgs } from "../../models";
export declare class DefaultActivityTemplate {
  private readonly iconRegistry;
  private readonly portProviderRegistry;
  private activityDescriptor;
  private icon;
  private portElements;
  constructor();
  activityType: string;
  activityTypeVersion: number;
  displayType: string;
  activityId: string;
  editChildActivity: EventEmitter<EditChildActivityArgs>;
  childActivitySelected: EventEmitter<ChildActivitySelectedArgs>;
  private selectedPortName;
  componentWillLoad(): void;
  componentWillRender(): void;
  render(): any;
  private renderIcon;
  private renderPorts;
  private renderPort;
  private get displayTypeIsPicker();
  private get displayTypeIsEmbedded();
  private onWindowClicked;
  private onEditChildActivityClick;
}
