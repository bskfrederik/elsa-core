import { Activity } from "../../models";
import { Hash } from "../../utils";
export interface FlowchartState {
  nodeMap: Hash<Activity>;
}
declare const _default: {
  Provider: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{
    state: FlowchartState;
  }>;
  Consumer: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{}>;
  injectProps: (Cstr: any, fieldList: import("@stencil/state-tunnel/dist/types/declarations").PropList<FlowchartState>) => void;
};
export default _default;
