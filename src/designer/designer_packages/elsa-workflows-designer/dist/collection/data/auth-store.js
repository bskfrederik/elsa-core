import { createStore } from '@stencil/store';
const { state, onChange } = createStore({
  accessToken: null,
  refreshToken: null,
  name: null,
  permissions: [],
  signedIn: false
});
export default state;
//# sourceMappingURL=auth-store.js.map
