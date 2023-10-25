import { RenderActivityPropsContext } from "../models";
export declare class WorkflowDefinitionActivityVersionSettings {
  renderContext: RenderActivityPropsContext;
  private currentVersion;
  onRenderContextChanged(value: RenderActivityPropsContext): void;
  componentWillLoad(): void;
  render(): any;
  private onUpdateClick;
}
