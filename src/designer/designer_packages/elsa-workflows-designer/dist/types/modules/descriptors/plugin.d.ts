import 'reflect-metadata';
import { Plugin } from "../../models";
import { AuthContext, ElsaClientProvider, EventBus } from "../../services";
export declare class DescriptorsPlugin implements Plugin {
  private eventBus;
  private elsaClientProvider;
  private authContext;
  constructor(eventBus: EventBus, elsaClientProvider: ElsaClientProvider, authContext: AuthContext);
  initialize(): Promise<void>;
  private loadDescriptors;
}
