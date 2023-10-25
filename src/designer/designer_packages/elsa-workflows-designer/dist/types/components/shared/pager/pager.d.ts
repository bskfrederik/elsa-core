import { EventEmitter } from '../../../stencil-public-runtime';
export interface PagerData {
  page: number;
  pageSize: number;
  totalCount: number;
}
export declare class ElsaPager {
  page: number;
  pageSize: number;
  totalCount: number;
  paginated: EventEmitter<PagerData>;
  render(): any;
  private navigate;
  private onNavigate;
}
