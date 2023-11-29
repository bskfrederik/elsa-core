function getComponentClosestLanguage(element: HTMLElement): string {
  let closestElement = element.closest('[lang]') as HTMLElement;
  console.log(closestElement)
  return closestElement ? closestElement.lang : 'en';
}

function getComponentClosestBasePath(element: HTMLElement): string {
  let closestElement = element.closest('[basePath]') as HTMLElement;
  console.log(closestElement.attributes['basePath'].value)
  return closestElement ? closestElement.attributes['basePath'].value : '';
}


function fetchLocaleStringsForComponent(componentName: string, locale: string, basePath: string): Promise<any> {
  return new Promise((resolve, reject): void => {
    fetch(`${basePath}${componentName}.i18n.${locale}.json`)
    .then((result) => {
      if (result.ok) resolve(result.json());
      else reject();
    }, () => reject());
  });
}


export async function getLocaleComponentStrings(element: HTMLElement): Promise<any> {
  let componentName = element.tagName.toLowerCase();
  let componentLanguage = getComponentClosestLanguage(element);
  let basePath = getComponentClosestBasePath(element);
  let strings;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage, basePath);
  } catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, 'en', basePath);
  }
  return strings;
}
