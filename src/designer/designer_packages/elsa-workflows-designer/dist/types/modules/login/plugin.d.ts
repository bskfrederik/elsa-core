import 'reflect-metadata';
import { Plugin } from "../../models";
export declare class LoginPlugin implements Plugin {
  private readonly eventBus;
  private readonly studioService;
  constructor();
  initialize(): Promise<void>;
  private onHttpClientCreated;
}
