import { Container } from "typedi";
import { InputControlRegistry } from "../../services/input-control-registry";
// A standard input driver that determines the UI to be displayed based on the UI hint of the activity input property.
export class DefaultInputDriver {
  constructor() {
    this.inputControlRegistry = Container.get(InputControlRegistry);
  }
  get priority() {
    return -1;
  }
  renderInput(context) {
    const inputDescriptor = context.inputDescriptor;
    const uiHint = inputDescriptor.uiHint;
    const inputControl = this.inputControlRegistry.get(uiHint);
    return inputControl(context);
  }
  supportsInput(context) {
    const uiHint = context.inputDescriptor.uiHint;
    return this.inputControlRegistry.has(uiHint);
  }
}
//# sourceMappingURL=default-input-driver.js.map
