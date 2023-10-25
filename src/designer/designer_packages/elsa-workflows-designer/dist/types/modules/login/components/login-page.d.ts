import { EventEmitter } from "../../../stencil-public-runtime";
import { SignedInArgs } from "../models";
export declare class LoginPage {
  private loginApi;
  signedIn: EventEmitter<SignedInArgs>;
  showError: boolean;
  constructor();
  private onSubmit;
  private renderError;
  render(): any;
}
