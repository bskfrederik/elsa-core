import { EventEmitter } from '../../../stencil-public-runtime';
export interface MonacoValueChangedArgs {
  value: string;
  markers: Array<any>;
}
export declare class ElsaMonaco {
  private monaco;
  editorHeight: string;
  value: string;
  language: string;
  singleLineMode: boolean;
  padding: string;
  valueChanged: EventEmitter<MonacoValueChangedArgs>;
  container: HTMLElement;
  editor: any;
  languageChangeHandler(newValue: string): Promise<void>;
  setValue(value: string): Promise<void>;
  addJavaScriptLib(libSource: string, libUri: string): Promise<void>;
  componentDidLoad(): Promise<void>;
  private getMonaco;
  disconnectedCallback(): void;
  render(): any;
}
