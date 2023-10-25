import 'reflect-metadata';
export declare class PluginRegistry {
  private readonly pluginTypes;
  constructor();
  add: (name: string, plugin: any) => void;
  replace: (name: string, plugin: any) => void;
  remove: (name: string) => void;
  initialize: () => Promise<void>;
}
