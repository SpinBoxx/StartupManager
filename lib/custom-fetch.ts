export const fetchCustom = (url: string, options?: RequestInit) =>
  fetch(`/api${url}`, options);
