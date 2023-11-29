import { C as Container, a as ElsaClientProvider } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';

async function fetchRuntimeItems(options) {
  const elsaClientProvider = Container.get(ElsaClientProvider);
  const elsaClient = await elsaClientProvider.getElsaClient();
  return await elsaClient.designer.runtimeSelectListApi.get(options.runtimeSelectListProviderType, options.context || {});
}
async function getSelectListItems(propertyDescriptor) {
  const options = propertyDescriptor.options;
  let selectList;
  if (!!options && options.runtimeSelectListProviderType)
    selectList = await fetchRuntimeItems(options);
  else if (Array.isArray(options))
    selectList = {
      items: options,
      isFlagsEnum: false
    };
  else
    selectList = options;
  return selectList || { items: [], isFlagsEnum: false };
}

export { getSelectListItems as g };

//# sourceMappingURL=select-list-items.js.map