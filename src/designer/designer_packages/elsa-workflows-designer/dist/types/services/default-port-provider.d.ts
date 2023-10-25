import 'reflect-metadata';
import { PortProvider, PortProviderContext } from "./port-provider";
import { Activity, Port } from "../models";
export declare class DefaultPortProvider implements PortProvider {
  getOutboundPorts(context: PortProviderContext): Array<Port>;
  resolvePort(portName: string, context: PortProviderContext): Activity | Array<Activity>;
  assignPort(portName: string, activity: Activity, context: PortProviderContext): any;
}
