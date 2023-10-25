import { WorkflowDefinition } from "./models/entities";
export interface WorkflowDefinitionState {
  workflowDefinition: WorkflowDefinition;
}
declare const _default: {
  Provider: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{
    state: WorkflowDefinitionState;
  }>;
  Consumer: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{}>;
  injectProps: (Cstr: any, fieldList: import("@stencil/state-tunnel/dist/types/declarations").PropList<WorkflowDefinitionState>) => void;
};
export default _default;
