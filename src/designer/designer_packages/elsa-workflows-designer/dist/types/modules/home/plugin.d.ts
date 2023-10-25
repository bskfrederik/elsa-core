import 'reflect-metadata';
import { Plugin } from "../../models";
import { AuthContext, StudioService } from "../../services";
export declare class HomePagePlugin implements Plugin {
  private studioService;
  private authContext;
  constructor(studioService: StudioService, authContext: AuthContext);
  initialize(): Promise<void>;
  private showHomePage;
  private onSignedIn;
}
