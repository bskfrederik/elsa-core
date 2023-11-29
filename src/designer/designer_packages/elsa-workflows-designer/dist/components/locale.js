function getComponentClosestLanguage(element) {
  let closestElement = element.closest('[lang]');
  console.log(closestElement);
  return closestElement ? closestElement.lang : 'en';
}
function getComponentClosestBasePath(element) {
  let closestElement = element.closest('[basePath]');
  console.log(closestElement.attributes['basePath'].value);
  return closestElement ? closestElement.attributes['basePath'].value : '';
}
function fetchLocaleStringsForComponent(componentName, locale, basePath) {
  return new Promise((resolve, reject) => {
    fetch(`${basePath}${componentName}.i18n.${locale}.json`)
      .then((result) => {
      if (result.ok)
        resolve(result.json());
      else
        reject();
    }, () => reject());
  });
}
async function getLocaleComponentStrings(element) {
  let componentName = element.tagName.toLowerCase();
  let componentLanguage = getComponentClosestLanguage(element);
  let basePath = getComponentClosestBasePath(element);
  let strings;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage, basePath);
  }
  catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, 'en', basePath);
  }
  return strings;
}

export { getLocaleComponentStrings as g };

//# sourceMappingURL=locale.js.map