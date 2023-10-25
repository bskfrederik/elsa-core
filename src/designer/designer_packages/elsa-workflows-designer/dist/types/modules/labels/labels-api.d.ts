import { Label } from "./models";
import { ElsaClientProvider } from "../../services";
export declare class LabelsApi {
  private provider;
  constructor(provider: ElsaClientProvider);
  list(): Promise<Array<Label>>;
  create(name: string, description?: string, color?: string): Promise<Label>;
  update(id: string, name: string, description?: string, color?: string): Promise<Label>;
  delete(id: string): Promise<boolean>;
}
export declare class WorkflowDefinitionLabelsApi {
  private provider;
  constructor(provider: ElsaClientProvider);
  get(definitionVersionId: string): Promise<Array<string>>;
  update(definitionVersionId: string, labelIds: Array<string>): Promise<Array<string>>;
}
