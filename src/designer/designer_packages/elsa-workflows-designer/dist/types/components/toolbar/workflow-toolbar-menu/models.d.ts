export interface ToolbarMenu {
  menuItems: Array<ToolbarMenuItem>;
}
export interface ToolbarMenuItem {
  text: string;
  onClick: () => void;
  order?: number;
}
export interface ToolbarDisplayingArgs {
  menu: ToolbarMenu;
}
export declare const ToolbarEventTypes: {
  Displaying: string;
};
