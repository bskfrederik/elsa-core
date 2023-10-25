import { DropdownButtonItem } from "../components/shared/dropdown-button/models";
export interface NewButtonItemStore {
  items: Array<DropdownButtonItem>;
  mainItem: DropdownButtonItem;
}
declare const state: NewButtonItemStore;
export default state;
