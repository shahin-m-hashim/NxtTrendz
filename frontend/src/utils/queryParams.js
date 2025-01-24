export function getQueryParams() {
  const params = {};
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.forEach((value, key) => (params[key] = value));
  return params;
}

export function deleteQueryParams(keys = []) {
  const params = new URLSearchParams(window.location.search);
  keys.forEach((key) => params.delete(key));
  return params;
}
