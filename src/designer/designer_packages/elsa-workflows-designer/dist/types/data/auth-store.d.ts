export interface AuthStore {
  accessToken: string;
  refreshToken: string;
  name: string;
  permissions: Array<string>;
  signedIn: boolean;
}
declare const state: AuthStore;
export default state;
