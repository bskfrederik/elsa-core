import {Component, Element, h, Prop, } from "@stencil/core";
import {StorageDriverDescriptor, Variable, WorkflowInstance} from "../../../../models";
import descriptorsStore from "../../../../data/descriptors-store";
import {WorkflowDefinition} from "../../models/entities";
import { getLocaleComponentStrings } from "../../../../utils/locale";

@Component({
  tag: 'elsa-variables-viewer',
  shadow: false
})
export class VariablesViewer {

  @Prop() variables?: Array<Variable>;
  @Prop() workflowDefinition: WorkflowDefinition;
  @Prop() workflowInstance: WorkflowInstance;

  @Element() element: HTMLElement;
  strings!: any;

  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }


  render() {
    const variables = this.variables;
    const storageDrivers: Array<StorageDriverDescriptor> = descriptorsStore.storageDrivers;

    return (
      <div>
        <div class="tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200">
          <table class="default-table">
            <thead>
            <tr>
              <th scope="col">{this.strings.variablesTabName}</th>
              <th scope="col">{this.strings.variablesTabValue}</th>
              <th scope="col">{this.strings.variablesTabType}</th>
              <th scope="col">{this.strings.variablesTabStorage}</th>
            </tr>
            </thead>
            <tbody>
            {variables.map(variable => {
                const storage = storageDrivers.find(x => x.typeName == variable.storageDriverTypeName);
                const storageName = storage?.displayName ?? '-';
                const descriptor = descriptorsStore.variableDescriptors.find(x => x.typeName == variable.typeName);
                const typeDisplayName = descriptor?.displayName ?? variable.typeName;
                const variableValue = this.getVariableValue(variable, storage);

                return (
                  <tr>
                    <td class="tw-whitespace-nowrap">{variable.name}</td>
                    <td class="tw-whitespace-nowrap">{typeDisplayName}</td>
                    <td>{storageName}</td>
                    <td class="tw-pr-6">{variableValue}</td>
                  </tr>);
              }
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  private getVariableValue(variable: Variable, storage: StorageDriverDescriptor) : any {
    if(storage?.typeName !== 'Elsa.Workflows.Core.Implementations.WorkflowStorageDriver, Elsa.Workflows.Core')
      return null;

    const workflowInstance = this.workflowInstance;
    const persistentVariables = workflowInstance.properties.PersistentVariablesDictionary;
    const key = `${workflowInstance.id}:Workflow1:${variable.name}`;
    return persistentVariables[key];
  }
}
