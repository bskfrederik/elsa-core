import { h } from "@stencil/core";
import studioComponentStore from "../../../data/studio-component-store";
export class WorkflowInstanceViewerInstance {
  constructor(workflowDefinition, workflowInstance) {
    this.workflowDefinition = workflowDefinition;
    this.workflowInstance = workflowInstance;
    studioComponentStore.activeComponentFactory = () => h("elsa-workflow-instance-viewer", { workflowDefinition: workflowDefinition, workflowInstance: workflowInstance, ref: el => this.workflowInstanceViewerElement = el });
  }
}
//# sourceMappingURL=viewer-instance.js.map
