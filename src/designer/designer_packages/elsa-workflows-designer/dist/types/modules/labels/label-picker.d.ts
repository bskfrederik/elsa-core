import { EventEmitter } from "../../stencil-public-runtime";
export declare class LabelPicker {
  private element;
  private searchTextElement;
  private flyoutPanel;
  private readonly filterLabelsDebounced;
  constructor();
  selectedLabels: Array<string>;
  buttonClass?: string;
  containerClass?: string;
  selectedLabelsChanged: EventEmitter<Array<string>>;
  private selectedLabelsState;
  private searchText?;
  private filteredLabels;
  private onWindowClicked;
  render(): any;
  private renderFlyout;
  private renderLabel;
  private closeFlyoutPanel;
  private toggleFlyoutPanel;
  private filterLabels;
  private getFilteredSelectedLabels;
  private onLabelClick;
  private onSearchTextChanged;
}
