import moment from 'moment';
import { v4 as uuid } from 'uuid';
import _, { camelCase } from 'lodash';
export function formatTimestamp(timestamp, defaultText) {
  return !!timestamp ? moment(timestamp).format('DD-MM-YYYY HH:mm:ss') : defaultText;
}
export function formatTime(timestamp, defaultText) {
  return !!timestamp ? moment(timestamp).format('HH:mm:ss') : defaultText;
}
export function getDuration(a, b) {
  const diff = moment(a).diff(moment(b));
  return moment.duration(diff);
}
export function getObjectOrParseJson(value) {
  return typeof value === 'string' ? parseJson(value) : value;
}
export function parseJson(json) {
  if (!json)
    return null;
  if (json.trim().length === 0)
    return null;
  try {
    return JSON.parse(json);
  }
  catch (e) {
    console.warn(`Error parsing JSON: ${e}`);
  }
  return undefined;
}
export const getVersionOptionsString = (versionOptions) => {
  if (!versionOptions)
    return '';
  return versionOptions.allVersions
    ? 'AllVersions'
    : versionOptions.isDraft
      ? 'Draft'
      : versionOptions.isLatest
        ? 'Latest'
        : versionOptions.isPublished
          ? 'Published'
          : versionOptions.isLatestOrPublished
            ? 'LatestOrPublished'
            : versionOptions.version.toString();
};
export const mapSyntaxToLanguage = (syntax) => {
  switch (syntax) {
    case 'Json':
      return 'json';
    case 'JavaScript':
      return 'javascript';
    case 'Liquid':
      return 'handlebars';
    default:
      return 'plaintext';
  }
};
export const getInputPropertyName = (inputContext) => {
  const inputProperty = inputContext.inputDescriptor;
  const propertyName = inputProperty.name;
  return camelCase(propertyName);
};
export const getInputPropertyValue = (inputContext) => {
  const propName = getInputPropertyName(inputContext);
  return inputContext.activity[propName];
};
export const getPropertyValue = (inputContext) => {
  const propName = getInputPropertyName(inputContext);
  return inputContext.activity[propName];
};
export const stripActivityNameSpace = (name) => {
  const lastDotIndex = name.lastIndexOf('.');
  return lastDotIndex < 0 ? name : name.substr(lastDotIndex + 1);
};
export const isNullOrWhitespace = (input) => !input || !input.trim();
export const serializeQueryString = (queryString) => {
  const filteredItems = _(queryString).omitBy(_.isUndefined).omitBy(_.isNull).value();
  const queryStringItems = _.map(filteredItems, (v, k) => {
    if (Array.isArray(v)) {
      return v.map(item => `${k}=${item}`).join('&');
    }
    ;
    return `${k}=${v}`;
  });
  return queryStringItems.length > 0 ? `?${queryStringItems.join('&')}` : '';
};
export function durationToString(duration) {
  return !!duration ? duration.asHours() > 1
    ? `${duration.asHours().toFixed(3)} h`
    : duration.asMinutes() > 1
      ? `${duration.asMinutes().toFixed(3)} m`
      : duration.asSeconds() > 1
        ? `${duration.asSeconds().toFixed(3)} s`
        : `${duration.asMilliseconds()} ms`
    : null;
}
export function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}
export function generateIdentity() {
  return uuid().replace(/-/g, '');
}
export function formatTextWithLineBreaks(text) {
  if (typeof (text) != 'string')
    return text;
  return text === null || text === void 0 ? void 0 : text.replace(/\n/g, '<br />');
}
//# sourceMappingURL=utils.js.map
