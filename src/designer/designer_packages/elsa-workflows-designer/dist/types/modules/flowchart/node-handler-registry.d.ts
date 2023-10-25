import 'reflect-metadata';
import { ActivityNodeHandler } from "./activity-node-handler";
export type ActivityNodeHandlerFactory = () => ActivityNodeHandler;
export declare class NodeHandlerRegistry {
  private handlerMap;
  private defaultHandlerFactory;
  add(activityType: string, handlerFactory: ActivityNodeHandlerFactory): void;
  get(activityType: string): ActivityNodeHandlerFactory;
  createHandler(activityType: string): ActivityNodeHandler;
}
