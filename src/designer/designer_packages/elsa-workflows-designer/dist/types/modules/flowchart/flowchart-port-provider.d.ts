import 'reflect-metadata';
import { PortProvider, PortProviderContext } from "../../services";
import { Activity, Port } from "../../models";
export declare class FlowchartPortProvider implements PortProvider {
  getOutboundPorts(context: PortProviderContext): Array<Port>;
  resolvePort(portName: string, context: PortProviderContext): Activity | Array<Activity>;
  assignPort(portName: string, activity: Activity, context: PortProviderContext): any;
}
