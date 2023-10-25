import { FunctionalComponent } from "../../../stencil-public-runtime";
export interface PagerProps {
  currentPage: number;
  pageCount: number;
  onNavigate: (page: number) => void;
}
export declare const PreviousButton: FunctionalComponent<PagerProps>;
export declare const NextButton: FunctionalComponent<PagerProps>;
export declare const ChevronLeft: FunctionalComponent<PagerProps>;
export declare const ChevronRight: FunctionalComponent<PagerProps>;
export declare const PagerButtons: FunctionalComponent<PagerProps>;
