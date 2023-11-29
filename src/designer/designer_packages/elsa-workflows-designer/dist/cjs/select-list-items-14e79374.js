'use strict';

const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');

async function fetchRuntimeItems(options) {
  const elsaClientProvider = utils.Container.get(utils.ElsaClientProvider);
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

exports.getSelectListItems = getSelectListItems;

//# sourceMappingURL=select-list-items-14e79374.js.map