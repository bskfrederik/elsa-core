import { FunctionalComponent } from '../../../stencil-public-runtime';
export interface InfoListProps {
  title: string;
  dictionary?: {
    [key: string]: string;
  };
  hideEmptyValues?: boolean;
}
export declare const InfoList: FunctionalComponent<InfoListProps>;
