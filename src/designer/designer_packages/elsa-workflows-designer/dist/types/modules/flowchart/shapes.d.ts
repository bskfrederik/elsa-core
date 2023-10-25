import { Shape } from '@antv/x6';
import { Activity, ActivityDescriptor } from '../../models';
export declare class ActivityNodeShape extends Shape.HTML {
  get text(): string;
  set text(value: string);
  get activity(): Activity;
  set activity(value: Activity);
  get activityDescriptor(): ActivityDescriptor;
  set activityDescriptor(value: ActivityDescriptor);
  init(): void;
  setup(): void;
  updateSize(): void;
  createHtml(): any;
}
