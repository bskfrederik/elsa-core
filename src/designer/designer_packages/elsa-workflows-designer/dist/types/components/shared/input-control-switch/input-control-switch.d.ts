import { EventEmitter } from '../../../stencil-public-runtime';
import { IntellisenseContext } from "../../../models";
export interface ExpressionChangedArs {
  expression: string;
  syntax: string;
}
export declare class InputControlSwitch {
  private contextMenu;
  private monacoEditor;
  private contextMenuWidget;
  private readonly onExpressionChangedDebounced;
  constructor();
  workflowDefinitionId: string;
  activityType: string;
  propertyName: string;
  label: string;
  hideLabel: boolean;
  hint: string;
  fieldName?: string;
  syntax?: string;
  expression?: string;
  defaultSyntax: string;
  supportedSyntaxes: Array<string>;
  isReadOnly?: boolean;
  codeEditorHeight: string;
  codeEditorSingleLineMode: boolean;
  context?: IntellisenseContext;
  syntaxChanged: EventEmitter<string>;
  expressionChanged: EventEmitter<ExpressionChangedArs>;
  currentExpression?: string;
  private onWindowClicked;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): Promise<void>;
  render(): any;
  private renderLabel;
  private renderContextMenuWidget;
  private shouldRenderMonaco;
  private renderContextMenuButton;
  private renderEditor;
  private toggleContextMenu;
  private openContextMenu;
  private closeContextMenu;
  private selectDefaultEditor;
  private selectSyntax;
  private onSettingsClick;
  private onExpressionChanged;
}
