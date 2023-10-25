import { EventEmitter } from '../../stencil-public-runtime';
import 'reflect-metadata';
import { StudioInitializingContext } from "../../models/studio";
export declare class Studio {
  private readonly eventBus;
  private readonly workflowDefinitionManager;
  private readonly pluginRegistry;
  constructor();
  private el;
  serverUrl: string;
  monacoLibPath: string;
  enableFlexiblePorts: boolean;
  disableAuth: boolean;
  initializing: EventEmitter<StudioInitializingContext>;
  private handleServerUrl;
  private handleMonacoLibPath;
  componentWillLoad(): Promise<void>;
  render(): any;
}
