export function getSession(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

export function setSession(key, value) {
  return sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeSession(key) {
  return sessionStorage.removeItem(key);
}

export function getStorge(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setStorge(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function remoeStorge(key) {
  return localStorage.removeItem(key);
}
