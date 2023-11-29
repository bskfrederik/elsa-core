const key = 'LS/wfInstanceBrowser';
export function getRequest() {
  var json = localStorage.getItem(key);
  if (!json)
    return;
  return JSON.parse(json);
}
export function persistRequest(request) {
  localStorage.setItem(key, JSON.stringify(request));
}
//# sourceMappingURL=lookup-persistence.js.map
