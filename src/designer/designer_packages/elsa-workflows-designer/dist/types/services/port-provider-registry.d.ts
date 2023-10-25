import 'reflect-metadata';
import { PortProvider } from "./port-provider";
export type PortProviderFactory = () => PortProvider;
export declare class PortProviderRegistry {
  private map;
  private defaultProviderFactory;
  add(activityType: string, defaultProviderFactory: PortProviderFactory): void;
  get(activityType: string): PortProvider;
}
