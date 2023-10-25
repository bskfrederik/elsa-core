import { Plugin } from "../../../models";
export declare class CompositeActivityVersionPlugin implements Plugin {
  private readonly eventBus;
  private readonly workflowDefinitionsApi;
  constructor();
  initialize(): Promise<void>;
  private onPropertyPanelRendering;
}
