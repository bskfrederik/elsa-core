import { Plugin } from "../../models";
export declare class WorkflowContextsPlugin implements Plugin {
  private apiClient;
  private providerDescriptors;
  constructor();
  initialize(): Promise<void>;
  private setupCustomInputControls;
  private setupSignIn;
  private onSignedIn;
  private setupCustomPropertyEditors;
  private onPropertyPanelRendering;
}
