import 'reflect-metadata';
import { Activity, Port } from "../../../models";
import { PortProvider, PortProviderContext } from "../../../services";
export declare class FlowHttpRequestPortProvider implements PortProvider {
  getOutboundPorts(context: PortProviderContext): Array<Port>;
  resolvePort(portName: string, context: PortProviderContext): Activity | Array<Activity>;
  assignPort(portName: string, activity: Activity, context: PortProviderContext): any;
}
