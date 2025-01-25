function updateUrl(queryParams) {
  if (queryParams.toString()) {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  } else {
    window.history.pushState(null, "", `${window.location.pathname}`);
  }
}

// Getters
export function getQueryParam(key) {
  if (!key) return null;
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(key);
}

export function getQueryParams(keys) {
  if (!Array.isArray(keys)) return {};
  const queryParams = new URLSearchParams(window.location.search);
  const params = {};
  keys.forEach((key) => {
    if (key) params[key] = queryParams.get(key);
  });
  return params;
}

export function getAllQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  const params = {};
  queryParams.forEach((value, key) => {
    if (value) params[key] = value;
  });
  return params;
}

// Setters
export function setQueryParam(key, value) {
  if (!key || value === undefined || value === null) return;

  const queryParams = new URLSearchParams(window.location.search);

  if (value === "") {
    queryParams.delete(key);
  } else {
    queryParams.set(key, value);
  }

  updateUrl(queryParams);
}

export function setQueryParams(params) {
  if (!params || typeof params !== "object") return;

  const queryParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (key && (value || value === "")) {
      if (value === "") {
        queryParams.delete(key);
      } else {
        queryParams.set(key, value);
      }
    } else {
      queryParams.delete(key);
    }
  });

  updateUrl(queryParams);
}

// Removers
export function removeQueryParam(key) {
  if (!key) return;

  const queryParams = new URLSearchParams(window.location.search);
  queryParams.delete(key);

  updateUrl(queryParams);
}

export function removeQueryParams(keys) {
  if (!Array.isArray(keys)) return;

  const queryParams = new URLSearchParams(window.location.search);
  keys.forEach((key) => {
    if (key) queryParams.delete(key);
  });

  updateUrl(queryParams);
}

export function clearQueryParams() {
  const queryParams = new URLSearchParams();
  updateUrl(queryParams);
}
