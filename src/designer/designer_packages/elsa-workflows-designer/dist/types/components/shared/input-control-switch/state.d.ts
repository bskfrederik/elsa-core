export interface InputControlSwitchContextState {
  workflowDefinitionId: string;
  activityType: string;
  propertyName: string;
}
declare const _default: {
  Provider: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{
    state: InputControlSwitchContextState;
  }>;
  Consumer: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{}>;
  injectProps: (Cstr: any, fieldList: import("@stencil/state-tunnel/dist/types/declarations").PropList<InputControlSwitchContextState>) => void;
};
export default _default;
